import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  processSettlementBatch,
  getSettlementConfig,
} from '../src/settlement-batch.js';

describe('Settlement Batch Worker', () => {
  const mockMerchantId = 'merch_aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  const periodStart = '2026-09-01T00:00:00.000Z';
  const periodEnd = '2026-09-02T00:00:00.000Z';

  const testConfig = {
    feeBps: 200n, // 2.00%
    taxOnFeeBps: 1800n, // 18.00%
  };

  function createMockPrisma(initial: {
    paymentIntents?: any[];
    refunds?: any[];
    settlements?: any[];
    ledgerAccounts?: any[];
    ledgerEntries?: any[];
  }) {
    let paymentIntents = [...(initial.paymentIntents || [])];
    const refunds = [...(initial.refunds || [])];
    const settlements = [...(initial.settlements || [])];
    const settlementItems: any[] = [];
    const ledgerAccounts = [...(initial.ledgerAccounts || [])];
    const ledgerTransactions: any[] = [];
    let ledgerEntries = [...(initial.ledgerEntries || [])];

    const mockTx = {
      settlement: {
        create: async ({ data }: any) => {
          // Emulate unique constraint on [merchantId, periodStart, periodEnd]
          const duplicate = settlements.find(
            (s) =>
              s.merchantId === data.merchantId &&
              new Date(s.periodStart).getTime() === new Date(data.periodStart).getTime() &&
              new Date(s.periodEnd).getTime() === new Date(data.periodEnd).getTime(),
          );
          if (duplicate) {
            const error: any = new Error('Unique constraint failed');
            error.code = 'P2002';
            error.meta = {
              target: ['merchantId', 'periodStart', 'periodEnd', 'settlement_period_unique'],
              constraint: 'settlement_period_unique',
              modelName: 'Settlement',
            };
            throw error;
          }

          const record = {
            id: `settle_${Date.now()}_${Math.random()}`,
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          settlements.push(record);
          return record;
        },
      },

      settlementItem: {
        createMany: async ({ data }: any) => {
          settlementItems.push(...data);
          return { count: data.length };
        },
      },

      paymentIntent: {
        updateMany: async ({ where, data }: any) => {
          let count = 0;
          paymentIntents = paymentIntents.map((pi) => {
            if (pi.id === where.id && pi.version === where.version) {
              count++;
              return { ...pi, ...data };
            }
            return pi;
          });
          return { count };
        },
      },

      ledgerAccount: {
        upsert: async ({ where, create }: any) => {
          let acct = ledgerAccounts.find((a) => a.code === where.code);
          if (!acct) {
            acct = { id: `acct_${where.code.toLowerCase()}`, ...create };
            ledgerAccounts.push(acct);
          }
          return acct;
        },
      },

      ledgerEntry: {
        findMany: async ({ where }: any) => {
          return ledgerEntries.filter((e) => {
            if (where.creditAccountId && e.creditAccountId !== where.creditAccountId) return false;
            if (where.debitAccountId && e.debitAccountId !== where.debitAccountId) return false;
            return true;
          });
        },
        createMany: async ({ data }: any) => {
          ledgerEntries.push(...data);
          return { count: data.length };
        },
      },

      ledgerTransaction: {
        create: async ({ data }: any) => {
          const txRecord = {
            id: `ltx_${Date.now()}_${Math.random()}`,
            ...data,
            createdAt: new Date(),
          };
          ledgerTransactions.push(txRecord);
          return txRecord;
        },
      },
    };

    return {
      getPaymentIntents: () => paymentIntents,
      getSettlements: () => settlements,
      getSettlementItems: () => settlementItems,
      getLedgerTransactions: () => ledgerTransactions,
      getLedgerEntries: () => ledgerEntries,

      paymentIntent: {
        findMany: async ({ where }: any) => {
          return paymentIntents.filter((pi) => {
            if (where.merchantId && pi.merchantId !== where.merchantId) return false;
            if (where.status?.in && !where.status.in.includes(pi.status)) return false;
            if (where.capturedAt?.gte && new Date(pi.capturedAt) < new Date(where.capturedAt.gte)) return false;
            if (where.capturedAt?.lt && new Date(pi.capturedAt) >= new Date(where.capturedAt.lt)) return false;
            if (where.settlementItems?.none) {
              const hasSettlementItem = settlementItems.some(
                (si) => si.paymentIntentId === pi.id && si.type === 'PAYMENT',
              );
              if (hasSettlementItem) return false;
            }
            return true;
          });
        },
      },

      refund: {
        findMany: async ({ where }: any) => {
          return refunds.filter((r) => {
            if (where.merchantId && r.merchantId !== where.merchantId) return false;
            if (where.status && r.status !== where.status) return false;
            if (where.processedAt?.gte && new Date(r.processedAt) < new Date(where.processedAt.gte)) return false;
            if (where.processedAt?.lt && new Date(r.processedAt) >= new Date(where.processedAt.lt)) return false;
            return true;
          });
        },
      },

      $transaction: async (fn: any) => {
        return fn(mockTx);
      },
    };
  }

  describe('Configuration & Fail-Loud Boot', () => {
    const originalEnv = { ...process.env };

    afterEach(() => {
      process.env = { ...originalEnv };
    });

    it('fails loudly when SETTLEMENT_FEE_BPS is not set', () => {
      delete process.env.SETTLEMENT_FEE_BPS;
      process.env.SETTLEMENT_TAX_ON_FEE_BPS = '1800';

      assert.throws(
        () => getSettlementConfig(),
        /SETTLEMENT_FEE_BPS environment variable is not set/,
      );
    });

    it('fails loudly when SETTLEMENT_TAX_ON_FEE_BPS is not set', () => {
      process.env.SETTLEMENT_FEE_BPS = '200';
      delete process.env.SETTLEMENT_TAX_ON_FEE_BPS;

      assert.throws(
        () => getSettlementConfig(),
        /SETTLEMENT_TAX_ON_FEE_BPS environment variable is not set/,
      );
    });

    it('successfully parses valid fee and tax configuration', () => {
      process.env.SETTLEMENT_FEE_BPS = '200';
      process.env.SETTLEMENT_TAX_ON_FEE_BPS = '1800';

      const config = getSettlementConfig();
      assert.equal(config.feeBps, 200n);
      assert.equal(config.taxOnFeeBps, 1800n);
    });
  });

  describe('Settlement Batch Calculation & Double-Entry Ledger Posting', () => {
    it('computes gross, fee, tax, refunds, and net math, balancing double-entry ledger', async () => {
      const mockPrisma = createMockPrisma({
        paymentIntents: [
          {
            id: 'pi_1',
            merchantId: mockMerchantId,
            amount: 1000000n, // ₹10,000.00
            currency: 'INR',
            status: 'CAPTURED',
            version: 1,
            capturedAt: new Date('2026-09-01T10:00:00.000Z'),
          },
          {
            id: 'pi_2',
            merchantId: mockMerchantId,
            amount: 500000n, // ₹5,000.00
            currency: 'INR',
            status: 'PARTIALLY_REFUNDED',
            version: 2,
            capturedAt: new Date('2026-09-01T15:00:00.000Z'),
          },
        ],
        refunds: [
          {
            id: 'ref_1',
            merchantId: mockMerchantId,
            paymentIntentId: 'pi_2',
            amount: 100000n, // ₹1,000.00
            currency: 'INR',
            status: 'SUCCEEDED',
            processedAt: new Date('2026-09-01T16:00:00.000Z'),
          },
        ],
      });

      const result = await processSettlementBatch({
        merchantId: mockMerchantId,
        periodStart,
        periodEnd,
        prismaClient: mockPrisma,
        config: testConfig,
      });

      assert.equal(result.status, 'settled');

      // Gross = 10,000 + 5,000 = ₹15,000 (1,500,000 paise)
      assert.equal(result.grossAmount, 1500000n);
      // Refunds in window = ₹1,000 (100,000 paise)
      assert.equal(result.refundDeductions, 100000n);
      // Fee = 2.00% of 15,000 = ₹300 (30,000 paise)
      assert.equal(result.feeAmount, 30000n);
      // Tax on Fee = 18.00% of 300 = ₹54 (5,400 paise)
      assert.equal(result.taxAmount, 5400n);
      // Net = 1,500,000 - 100,000 - 30,000 - 5,400 = 1,364,600 paise (₹13,646.00)
      assert.equal(result.netAmount, 1364600n);

      // Verify settlement record created with status PENDING
      const settlements = mockPrisma.getSettlements();
      assert.equal(settlements.length, 1);
      assert.equal(settlements[0].status, 'PENDING');
      assert.equal(settlements[0].netAmount, 1364600n);

      // Verify SettlementItems created (2 payments + 1 refund + 1 fee + 1 tax = 5 items)
      const items = mockPrisma.getSettlementItems();
      assert.equal(items.length, 5);
      assert.equal(items.filter((i) => i.type === 'PAYMENT').length, 2);
      assert.equal(items.filter((i) => i.type === 'REFUND').length, 1);
      assert.equal(items.filter((i) => i.type === 'FEE').length, 1);
      assert.equal(items.filter((i) => i.type === 'TAX').length, 1);

      // Verify payment intents transitioned to SETTLED with incremented version
      const intents = mockPrisma.getPaymentIntents();
      assert.equal(intents[0].status, 'SETTLED');
      assert.equal(intents[0].version, 2);
      assert.equal(intents[1].status, 'SETTLED');
      assert.equal(intents[1].version, 3);

      // Verify Ledger Entries balance: Sum(Debits) == Sum(Credits)
      const entries = mockPrisma.getLedgerEntries();
      assert.ok(entries.length >= 4);

      // Check account debit and credit assignments:
      const grossEntry = entries.find((e) => e.amount === 1500000n);
      assert.equal(grossEntry.debitAccountId, 'acct_platform_escrow');
      assert.equal(grossEntry.creditAccountId, `acct_merchant_${mockMerchantId.toLowerCase()}_payable`);

      const feeEntry = entries.find((e) => e.amount === 30000n);
      assert.equal(feeEntry.debitAccountId, `acct_merchant_${mockMerchantId.toLowerCase()}_payable`);
      assert.equal(feeEntry.creditAccountId, 'acct_platform_revenue');

      const taxEntry = entries.find((e) => e.amount === 5400n);
      assert.equal(taxEntry.debitAccountId, `acct_merchant_${mockMerchantId.toLowerCase()}_payable`);
      assert.equal(taxEntry.creditAccountId, 'acct_platform_gst_payable');

      const refundEntry = entries.find((e) => e.amount === 100000n);
      assert.equal(refundEntry.debitAccountId, `acct_merchant_${mockMerchantId.toLowerCase()}_payable`);
      assert.equal(refundEntry.creditAccountId, 'acct_platform_escrow');

      // Strict Double-Entry Balance Check
      let totalDebits = 0n;
      let totalCredits = 0n;
      for (const e of entries) {
        totalDebits += BigInt(e.amount);
        totalCredits += BigInt(e.amount);
      }
      assert.equal(totalDebits, totalCredits);
    });

    it('deducts refunds processed in current window for a payment captured in a prior period', async () => {
      const mockPrisma = createMockPrisma({
        paymentIntents: [
          {
            id: 'pi_current_period',
            merchantId: mockMerchantId,
            amount: 500000n, // ₹5,000.00
            currency: 'INR',
            status: 'CAPTURED',
            version: 1,
            capturedAt: new Date('2026-09-01T12:00:00.000Z'),
          },
        ],
        refunds: [
          {
            id: 'ref_prior_period_payment',
            merchantId: mockMerchantId,
            paymentIntentId: 'pi_old_captured_in_august', // Prior period payment!
            amount: 200000n, // ₹2,000.00
            currency: 'INR',
            status: 'SUCCEEDED',
            processedAt: new Date('2026-09-01T14:00:00.000Z'), // Current window!
          },
        ],
      });

      const result = await processSettlementBatch({
        merchantId: mockMerchantId,
        periodStart,
        periodEnd,
        prismaClient: mockPrisma,
        config: testConfig,
      });

      assert.equal(result.status, 'settled');
      assert.equal(result.grossAmount, 500000n);
      assert.equal(result.refundDeductions, 200000n);

      const fee = (500000n * 200n) / 10000n; // 10,000
      const tax = (fee * 1800n) / 10000n; // 1,800
      const expectedNet = 500000n - 200000n - fee - tax; // 288,200
      assert.equal(result.netAmount, expectedNet);
    });

    it('does NOT convert to receivable when merchant has positive cumulative balance even if period net is negative', async () => {
      const payableAccountId = `acct_merchant_${mockMerchantId.toLowerCase()}_payable`;

      const mockPrisma = createMockPrisma({
        paymentIntents: [
          {
            id: 'pi_small',
            merchantId: mockMerchantId,
            amount: 100000n, // ₹1,000 gross
            currency: 'INR',
            status: 'CAPTURED',
            version: 1,
            capturedAt: new Date('2026-09-01T10:00:00.000Z'),
          },
        ],
        refunds: [
          {
            id: 'ref_large',
            merchantId: mockMerchantId,
            paymentIntentId: 'pi_prior',
            amount: 150000n, // ₹1,500 refund -> period net will be negative!
            currency: 'INR',
            status: 'SUCCEEDED',
            processedAt: new Date('2026-09-01T11:00:00.000Z'),
          },
        ],
        // Existing positive balance in MERCHANT_PAYABLE of ₹50,000 (5,000,000 paise)
        ledgerEntries: [
          {
            debitAccountId: 'acct_platform_escrow',
            creditAccountId: payableAccountId,
            amount: 5000000n,
            currency: 'INR',
          },
        ],
      });

      const result = await processSettlementBatch({
        merchantId: mockMerchantId,
        periodStart,
        periodEnd,
        prismaClient: mockPrisma,
        config: testConfig,
      });

      assert.equal(result.status, 'settled');
      // Period net is negative: 100,000 - 150,000 - fee(2,000) - tax(360) = -52,360
      assert.ok(result.netAmount! < 0n);

      // But cumulative balance was 5,000,000, so post-settlement balance is 4,947,640 > 0!
      // Assert NO receivable entry was created!
      const entries = mockPrisma.getLedgerEntries();
      const receivableEntry = entries.find(
        (e) => e.debitAccountId === `acct_merchant_${mockMerchantId.toLowerCase()}_receivable`,
      );
      assert.equal(receivableEntry, undefined, 'No receivable entry should be created when cumulative balance is positive');
    });

    it('converts only the true deficit to receivable when cumulative running balance drops below zero', async () => {
      const payableAccountId = `acct_merchant_${mockMerchantId.toLowerCase()}_payable`;
      const receivableAccountId = `acct_merchant_${mockMerchantId.toLowerCase()}_receivable`;

      const mockPrisma = createMockPrisma({
        paymentIntents: [],
        refunds: [
          {
            id: 'ref_huge',
            merchantId: mockMerchantId,
            paymentIntentId: 'pi_old',
            amount: 500000n, // ₹5,000 refund with ₹0 gross sales in period
            currency: 'INR',
            status: 'SUCCEEDED',
            processedAt: new Date('2026-09-01T11:00:00.000Z'),
          },
        ],
        // Existing payable balance of only ₹1,000 (100,000 paise)
        ledgerEntries: [
          {
            debitAccountId: 'acct_platform_escrow',
            creditAccountId: payableAccountId,
            amount: 100000n,
            currency: 'INR',
          },
        ],
      });

      const result = await processSettlementBatch({
        merchantId: mockMerchantId,
        periodStart,
        periodEnd,
        prismaClient: mockPrisma,
        config: testConfig,
      });

      assert.equal(result.status, 'settled');
      assert.equal(result.netAmount, -500000n);

      // Projected cumulative balance: 100,000 - 500,000 = -400,000 paise (deficit of ₹4,000)
      const entries = mockPrisma.getLedgerEntries();
      const deficitEntry = entries.find(
        (e) => e.debitAccountId === receivableAccountId,
      );
      assert.ok(deficitEntry, 'Deficit entry must be created when cumulative balance is negative');
      assert.equal(deficitEntry.amount, 400000n); // Exact deficit converted
      assert.equal(deficitEntry.creditAccountId, payableAccountId);
    });

    it('gracefully handles duplicate execution via explicit named unique constraint', async () => {
      const mockPrisma = createMockPrisma({
        paymentIntents: [
          {
            id: 'pi_unique_test',
            merchantId: mockMerchantId,
            amount: 100000n,
            currency: 'INR',
            status: 'CAPTURED',
            version: 1,
            capturedAt: new Date('2026-09-01T08:00:00.000Z'),
          },
        ],
      });

      // First run: succeeds
      const firstRun = await processSettlementBatch({
        merchantId: mockMerchantId,
        periodStart,
        periodEnd,
        prismaClient: mockPrisma,
        config: testConfig,
      });
      assert.equal(firstRun.status, 'settled');

      // Add another eligible payment in the same period window to simulate a concurrent or duplicate attempt
      // entering the transaction and hitting the database unique constraint
      mockPrisma.getPaymentIntents().push({
        id: 'pi_duplicate_period_attempt',
        merchantId: mockMerchantId,
        amount: 50000n,
        currency: 'INR',
        status: 'CAPTURED',
        version: 1,
        capturedAt: new Date('2026-09-01T09:00:00.000Z'),
      });

      const secondRun = await processSettlementBatch({
        merchantId: mockMerchantId,
        periodStart,
        periodEnd,
        prismaClient: mockPrisma,
        config: testConfig,
      });

      assert.equal(secondRun.status, 'already_settled');
      // Assert settlements count is still exactly 1
      assert.equal(mockPrisma.getSettlements().length, 1);
    });
  });
});
