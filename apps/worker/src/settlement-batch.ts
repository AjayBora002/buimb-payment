import {
  prisma as defaultPrisma,
  PaymentIntentStatus,
  type PaymentIntent,
  type Refund,
} from '@buimbpay/database/client';
import { assertValidTransition } from '@buimbpay/payments';

export interface SettlementBatchConfig {
  feeBps: bigint;
  taxOnFeeBps: bigint;
}

/**
 * Reads settlement fee and GST rates from environment variables.
 * Fails loudly at startup if either variable is not configured.
 */
export function getSettlementConfig(): SettlementBatchConfig {
  const feeBpsStr = process.env.SETTLEMENT_FEE_BPS;
  const taxBpsStr = process.env.SETTLEMENT_TAX_ON_FEE_BPS;

  if (feeBpsStr === undefined || feeBpsStr === '') {
    throw new Error(
      '🚫 SETTLEMENT_FEE_BPS environment variable is not set. ' +
        'Settlement worker requires an explicit fee rate in basis points (e.g. 200 for 2.00%).',
    );
  }

  if (taxBpsStr === undefined || taxBpsStr === '') {
    throw new Error(
      '🚫 SETTLEMENT_TAX_ON_FEE_BPS environment variable is not set. ' +
        'Settlement worker requires an explicit tax rate on fees in basis points (e.g. 1800 for 18% GST).',
    );
  }

  return {
    feeBps: BigInt(feeBpsStr),
    taxOnFeeBps: BigInt(taxBpsStr),
  };
}

/**
 * Calculates the current running balance of a liability ledger account inside an active transaction.
 * For liability accounts, Credit increases balance and Debit decreases balance.
 * Balance = Sum(Credits) - Sum(Debits)
 */
export async function getLiabilityAccountRunningBalance(
  tx: any,
  accountId: string,
): Promise<bigint> {
  const [creditEntries, debitEntries] = await Promise.all([
    tx.ledgerEntry.findMany({
      where: { creditAccountId: accountId },
      select: { amount: true },
    }),
    tx.ledgerEntry.findMany({
      where: { debitAccountId: accountId },
      select: { amount: true },
    }),
  ]);

  let totalCredits: bigint = 0n;
  for (const e of creditEntries) {
    totalCredits += BigInt(e.amount);
  }

  let totalDebits: bigint = 0n;
  for (const e of debitEntries) {
    totalDebits += BigInt(e.amount);
  }

  return totalCredits - totalDebits;
}

async function getOrCreateAccount(
  tx: any,
  code: string,
  fallback: { name: string; type: string; currency?: string; merchantId?: string },
) {
  return tx.ledgerAccount.upsert({
    where: { code },
    update: {},
    create: {
      code,
      name: fallback.name,
      type: fallback.type,
      currency: fallback.currency || 'INR',
      merchantId: fallback.merchantId,
    },
  });
}

export interface ProcessSettlementBatchOptions {
  merchantId: string;
  periodStart: string | Date;
  periodEnd: string | Date;
  prismaClient?: any;
  config?: SettlementBatchConfig;
}

export interface SettlementBatchResult {
  status: 'settled' | 'skipped' | 'already_settled';
  settlementId?: string;
  grossAmount?: bigint;
  refundDeductions?: bigint;
  feeAmount?: bigint;
  taxAmount?: bigint;
  netAmount?: bigint;
  itemCount?: number;
  reason?: string;
}

/**
 * Processes a settlement batch for a given merchant over [periodStart, periodEnd).
 * Aggregates eligible payment intents and processed refunds, calculates fees and tax,
 * creates Settlement and SettlementItem rows, transitions PaymentIntents, and posts
 * balanced double-entry ledger entries — all inside a single database transaction.
 */
export async function processSettlementBatch(
  options: ProcessSettlementBatchOptions,
): Promise<SettlementBatchResult> {
  const { merchantId, periodStart, periodEnd } = options;
  const prismaClient = options.prismaClient || defaultPrisma;
  const config = options.config || getSettlementConfig();

  const startDate = new Date(periodStart);
  const endDate = new Date(periodEnd);

  // 1. Query settlement-eligible PaymentIntents (CAPTURED or PARTIALLY_REFUNDED with no PAYMENT SettlementItem)
  const eligibleIntents: PaymentIntent[] = await prismaClient.paymentIntent.findMany({
    where: {
      merchantId,
      status: { in: [PaymentIntentStatus.CAPTURED, PaymentIntentStatus.PARTIALLY_REFUNDED] },
      capturedAt: {
        gte: startDate,
        lt: endDate,
      },
      settlementItems: {
        none: {
          type: 'PAYMENT',
        },
      },
    },
    orderBy: { capturedAt: 'asc' },
  });

  // 2. Query Refunds processed in this window against ANY of this merchant's payments
  const eligibleRefunds: Refund[] = await prismaClient.refund.findMany({
    where: {
      merchantId,
      status: 'SUCCEEDED',
      processedAt: {
        gte: startDate,
        lt: endDate,
      },
    },
    orderBy: { processedAt: 'asc' },
  });

  if (eligibleIntents.length === 0 && eligibleRefunds.length === 0) {
    return {
      status: 'skipped',
      reason: 'No eligible payment intents or refunds found in settlement window',
    };
  }

  // 3. Compute amounts
  const grossAmount = eligibleIntents.reduce(
    (sum, pi) => sum + BigInt(pi.captureAmount || pi.amount),
    0n,
  );
  const refundDeductions = eligibleRefunds.reduce(
    (sum, r) => sum + BigInt(r.amount),
    0n,
  );
  const feeAmount = (grossAmount * config.feeBps) / 10000n;
  const taxAmount = (feeAmount * config.taxOnFeeBps) / 10000n;
  const netAmount = grossAmount - refundDeductions - feeAmount - taxAmount;

  const currency = eligibleIntents[0]?.currency || eligibleRefunds[0]?.currency || 'INR';

  // 4. Execute atomic transaction
  try {
    return await prismaClient.$transaction(async (tx: any) => {
      // 4a. Create Settlement record (status PENDING: computed, awaiting bank payout)
      const settlement = await tx.settlement.create({
        data: {
          merchantId,
          periodStart: startDate,
          periodEnd: endDate,
          status: 'PENDING',
          grossAmount,
          feeAmount,
          taxAmount,
          adjustmentAmount: 0n,
          refundDeductions,
          netAmount,
          currency,
        },
      });

      // 4b. Create SettlementItem rows
      const itemsToCreate: any[] = [];

      for (const intent of eligibleIntents) {
        itemsToCreate.push({
          settlementId: settlement.id,
          paymentIntentId: intent.id,
          type: 'PAYMENT',
          amount: BigInt(intent.captureAmount || intent.amount),
          currency: intent.currency,
          description: `Payment intent ${intent.id}`,
        });
      }

      for (const refund of eligibleRefunds) {
        itemsToCreate.push({
          settlementId: settlement.id,
          paymentIntentId: refund.paymentIntentId,
          type: 'REFUND',
          amount: BigInt(refund.amount),
          currency: refund.currency,
          description: `Refund ${refund.id} on intent ${refund.paymentIntentId}`,
        });
      }

      if (feeAmount > 0n) {
        itemsToCreate.push({
          settlementId: settlement.id,
          type: 'FEE',
          amount: feeAmount,
          currency,
          description: `Platform fee (${config.feeBps} bps)`,
        });
      }

      if (taxAmount > 0n) {
        itemsToCreate.push({
          settlementId: settlement.id,
          type: 'TAX',
          amount: taxAmount,
          currency,
          description: `GST on platform fee (${config.taxOnFeeBps} bps)`,
        });
      }

      await tx.settlementItem.createMany({
        data: itemsToCreate,
      });

      // 4c. Transition PaymentIntents to SETTLED with optimistic concurrency version check
      for (const intent of eligibleIntents) {
        assertValidTransition(intent.status, PaymentIntentStatus.SETTLED);

        const updated = await tx.paymentIntent.updateMany({
          where: { id: intent.id, version: intent.version },
          data: {
            status: PaymentIntentStatus.SETTLED,
            version: intent.version + 1,
          },
        });

        if (updated.count === 0) {
          throw new Error(
            `PaymentIntent ${intent.id} was concurrently modified during settlement. Aborting transaction.`,
          );
        }
      }

      // 4d. Ensure ledger accounts exist
      const [
        escrowAccount,
        revenueAccount,
        gstPayableAccount,
        merchantPayableAccount,
        merchantReceivableAccount,
      ] = await Promise.all([
        getOrCreateAccount(tx, 'PLATFORM_ESCROW', {
          name: 'Merchant Escrow Payable',
          type: 'LIABILITY',
          currency,
        }),
        getOrCreateAccount(tx, 'PLATFORM_REVENUE', {
          name: 'Platform Revenue',
          type: 'REVENUE',
          currency,
        }),
        getOrCreateAccount(tx, 'PLATFORM_GST_PAYABLE', {
          name: 'Platform GST Payable (Tax Liability)',
          type: 'LIABILITY',
          currency,
        }),
        getOrCreateAccount(tx, `MERCHANT_${merchantId}_PAYABLE`, {
          name: 'Merchant Settlement Payable',
          type: 'LIABILITY',
          merchantId,
          currency,
        }),
        getOrCreateAccount(tx, `MERCHANT_${merchantId}_RECEIVABLE`, {
          name: 'Merchant Receivable (Deficit)',
          type: 'ASSET',
          merchantId,
          currency,
        }),
      ]);

      // 4e. Query current running balance of MERCHANT_<id>_PAYABLE inside this transaction
      const currentPayableBalance = await getLiabilityAccountRunningBalance(
        tx,
        merchantPayableAccount.id,
      );

      // Projected cumulative balance after applying this period's net amount
      const projectedCumulativeBalance = currentPayableBalance + netAmount;

      // 4f. Construct balanced double-entry ledger transfers
      const entries: Array<{
        debitAccountId: string;
        creditAccountId: string;
        amount: bigint;
        currency: string;
        description: string;
      }> = [];

      // Entry 1: Gross Sales ($G) - Move from Escrow to Merchant Settlement Payable
      if (grossAmount > 0n) {
        entries.push({
          debitAccountId: escrowAccount.id,
          creditAccountId: merchantPayableAccount.id,
          amount: grossAmount,
          currency,
          description: `Gross settlement batch allocation for ${settlement.id}`,
        });
      }

      // Entry 2: Platform Fee ($F) - Deduct from Merchant Payable into Platform Revenue
      if (feeAmount > 0n) {
        entries.push({
          debitAccountId: merchantPayableAccount.id,
          creditAccountId: revenueAccount.id,
          amount: feeAmount,
          currency,
          description: `Platform MDR fee for settlement ${settlement.id}`,
        });
      }

      // Entry 3: GST on Fee ($T) - Deduct from Merchant Payable into GST Tax Liability
      if (taxAmount > 0n) {
        entries.push({
          debitAccountId: merchantPayableAccount.id,
          creditAccountId: gstPayableAccount.id,
          amount: taxAmount,
          currency,
          description: `GST on fee for settlement ${settlement.id}`,
        });
      }

      // Entry 4: Processed Refunds ($R) - Deduct from Merchant Payable back to Escrow
      if (refundDeductions > 0n) {
        entries.push({
          debitAccountId: merchantPayableAccount.id,
          creditAccountId: escrowAccount.id,
          amount: refundDeductions,
          currency,
          description: `Refund deductions for settlement ${settlement.id}`,
        });
      }

      // Entry 5: Deficit Conversion (Only when cumulative running balance becomes negative)
      // If a merchant had an accumulated balance of ₹5,000 and period net is -₹300,
      // projected balance is +₹4,700, so no receivable is created.
      // If projected balance drops below 0 (e.g. -₹200), that exact deficit is converted
      // to a receivable, bringing the payable balance back to 0.
      if (projectedCumulativeBalance < 0n) {
        const deficitAmount = -projectedCumulativeBalance;
        entries.push({
          debitAccountId: merchantReceivableAccount.id,
          creditAccountId: merchantPayableAccount.id,
          amount: deficitAmount,
          currency,
          description: `Negative settlement balance deficit reclassification for ${settlement.id}`,
        });
      }

      // 4g. Persist LedgerTransaction and LedgerEntry rows
      if (entries.length > 0) {
        const transaction = await tx.ledgerTransaction.create({
          data: {
            type: 'SETTLEMENT',
            description: `Settlement batch for period ${startDate.toISOString()} to ${endDate.toISOString()}`,
            referenceId: settlement.id,
          },
        });

        await tx.ledgerEntry.createMany({
          data: entries.map((e) => ({
            ledgerTransactionId: transaction.id,
            debitAccountId: e.debitAccountId,
            creditAccountId: e.creditAccountId,
            amount: e.amount,
            currency: e.currency.toUpperCase(),
            description: e.description,
          })),
        });
      }

      return {
        status: 'settled',
        settlementId: settlement.id,
        grossAmount,
        refundDeductions,
        feeAmount,
        taxAmount,
        netAmount,
        itemCount: itemsToCreate.length,
      };
    });
  } catch (err: any) {
    // 5. Handle duplicate settlement attempts via explicit named unique constraint
    const isP2002 = err.code === 'P2002';
    const target = String(err.meta?.target || err.meta?.constraint || '');
    if (
      isP2002 &&
      (target.includes('settlement_period_unique') ||
        target.includes('periodStart') ||
        err.meta?.modelName === 'Settlement')
    ) {
      console.warn(
        `[Settlement] Period ${startDate.toISOString()} - ${endDate.toISOString()} for merchant ${merchantId} is already settled. Skipping duplicate execution.`,
      );
      return {
        status: 'already_settled',
        reason: 'Settlement already exists for this merchant and period window',
      };
    }

    throw err;
  }
}
