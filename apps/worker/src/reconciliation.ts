import {
  prisma as defaultPrisma,
  PaymentIntentStatus,
  PaymentAttemptStatus,
  ReconciliationRunStatus,
  type PaymentAttempt,
  type PaymentIntent,
} from '@buimbpay/database/client';
import { MockProvider, assertValidTransition } from '@buimbpay/payments';

export interface ProcessReconciliationOptions {
  merchantId?: string;
  periodStart: string | Date;
  periodEnd: string | Date;
  type: string;
  prismaClient?: any;
  provider?: any;
}

export interface ReconciliationResult {
  runId: string;
  status: 'COMPLETED' | 'FAILED';
  type: string;
  totalAttempts: number;
  matchedCount: number;
  mismatchCount: number;
  error?: string;
}

/**
 * Exhaustively maps provider status to internal PaymentAttemptStatus.
 * Any unmapped or unexpected combination explicitly defaults to MISMATCH (false).
 */
export function isStatusMatch(
  internalStatus: PaymentAttemptStatus | string,
  providerStatus: string,
): boolean {
  const normalizedProvider = providerStatus.toUpperCase();

  switch (normalizedProvider) {
    case 'AUTHORISED':
      // Provider confirmed authorization.
      // Matches internal attempt if AUTHORISED or CAPTURED (which builds on authorization).
      return (
        internalStatus === PaymentAttemptStatus.AUTHORISED ||
        internalStatus === PaymentAttemptStatus.CAPTURED
      );

    case 'FAILED':
      // Provider confirmed failure.
      // Matches only if internal attempt is also FAILED.
      return internalStatus === PaymentAttemptStatus.FAILED;

    case 'PENDING':
      // Provider indicates pending authorization.
      // Matches internal attempt if PENDING or INITIATED.
      return (
        internalStatus === PaymentAttemptStatus.PENDING ||
        internalStatus === PaymentAttemptStatus.INITIATED
      );

    default:
      // Explicit default: Any unknown or unlisted combination is a mismatch
      return false;
  }
}

const ELIGIBLE_RECONCILIATION_REQUIRED_STATUSES: PaymentIntentStatus[] = [
  PaymentIntentStatus.SETTLED,
  PaymentIntentStatus.PARTIALLY_REFUNDED,
  PaymentIntentStatus.DISPUTED,
];

/**
 * Processes a reconciliation run for a given period and type.
 *
 * Scope: Currently implements type 'PROVIDER' against MockProvider in SANDBOX.
 * Non-PROVIDER types ('SETTLEMENT', 'BANK') fail loudly and record a FAILED run.
 */
export async function processReconciliationRun(
  options: ProcessReconciliationOptions,
): Promise<ReconciliationResult> {
  const { merchantId, periodStart, periodEnd, type } = options;
  const prismaClient = options.prismaClient || defaultPrisma;
  const provider = options.provider || new MockProvider();

  const startDate = new Date(periodStart);
  const endDate = new Date(periodEnd);

  // 1. Guard against unimplemented or unsupported reconciliation types
  if (type === 'SETTLEMENT' || type === 'BANK') {
    const errorMsg =
      `🚫 Reconciliation type '${type}' is not yet implemented. ` +
      `No external bank payout confirmation or statement ingestion pipeline exists yet.`;
    console.error(`[Reconciliation] ${errorMsg}`);

    const failedRun = await prismaClient.reconciliationRun.create({
      data: {
        merchantId: merchantId || null,
        type,
        periodStart: startDate,
        periodEnd: endDate,
        status: ReconciliationRunStatus.FAILED,
        startedAt: new Date(),
        completedAt: new Date(),
        error: errorMsg,
      },
    });

    throw new Error(errorMsg);
  }

  if (type !== 'PROVIDER') {
    const errorMsg = `🚫 Unsupported reconciliation type '${type}'. Only 'PROVIDER' is currently supported.`;
    console.error(`[Reconciliation] ${errorMsg}`);

    await prismaClient.reconciliationRun.create({
      data: {
        merchantId: merchantId || null,
        type,
        periodStart: startDate,
        periodEnd: endDate,
        status: ReconciliationRunStatus.FAILED,
        startedAt: new Date(),
        completedAt: new Date(),
        error: errorMsg,
      },
    });

    throw new Error(errorMsg);
  }

  // 2. Create ReconciliationRun up front in RUNNING status to track active execution
  const run = await prismaClient.reconciliationRun.create({
    data: {
      merchantId: merchantId || null,
      type: 'PROVIDER',
      periodStart: startDate,
      periodEnd: endDate,
      status: ReconciliationRunStatus.RUNNING,
      startedAt: new Date(),
    },
  });

  try {
    // 3. Query PaymentAttempts in [periodStart, periodEnd) with providerRef != null
    // Filter through paymentIntent relation for environment == SANDBOX and optional merchantId
    const attempts: Array<PaymentAttempt & { paymentIntent: PaymentIntent }> =
      await prismaClient.paymentAttempt.findMany({
        where: {
          providerRef: { not: null },
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
          paymentIntent: {
            environment: 'SANDBOX',
            ...(merchantId ? { merchantId } : {}),
          },
        },
        include: {
          paymentIntent: true,
        },
        orderBy: { createdAt: 'asc' },
      });

    let matchedCount = 0;
    let mismatchCount = 0;

    // 4. Compare each attempt against MockProvider
    for (const attempt of attempts) {
      if (!attempt.providerRef) continue;

      const providerResult = await provider.fetchPaymentStatus(attempt.providerRef);
      const isMatch = isStatusMatch(attempt.status, providerResult.status);

      if (isMatch) {
        matchedCount++;
      } else {
        mismatchCount++;
      }

      // 4a. Create ReconciliationItem for every evaluated attempt
      // internalRef stores attempt.id and providerRef stores attempt.providerRef for exact traceability
      await prismaClient.reconciliationItem.create({
        data: {
          runId: run.id,
          internalRef: attempt.id,
          providerRef: attempt.providerRef,
          internalAmount: BigInt(attempt.amount),
          providerAmount: null, // MockProvider does not return amounts; never fabricate
          currency: attempt.currency,
          status: isMatch ? 'MATCHED' : 'MISMATCH',
          matchedAt: isMatch ? new Date() : null,
        },
      });

      // 4b. On MISMATCH, record ReconciliationException and flag eligible payment intents
      if (!isMatch) {
        await prismaClient.reconciliationException.create({
          data: {
            runId: run.id,
            type: 'STATUS_MISMATCH',
            description:
              `Status mismatch for attempt ${attempt.id} (paymentIntent ${attempt.paymentIntentId}): ` +
              `internal=${attempt.status}, provider=${providerResult.status}`,
            internalRef: attempt.id,
            providerRef: attempt.providerRef,
            amount: BigInt(attempt.amount),
            currency: attempt.currency,
          },
        });

        const intent = attempt.paymentIntent;

        // If intent is already in RECONCILIATION_REQUIRED, skip transition (re-run safe)
        if (intent.status === PaymentIntentStatus.RECONCILIATION_REQUIRED) {
          continue;
        }

        // Only transition if the intent is in SETTLED, PARTIALLY_REFUNDED, or DISPUTED
        // Intents in CAPTURED or earlier cannot transition to RECONCILIATION_REQUIRED yet
        if (ELIGIBLE_RECONCILIATION_REQUIRED_STATUSES.includes(intent.status)) {
          assertValidTransition(intent.status, PaymentIntentStatus.RECONCILIATION_REQUIRED);

          await prismaClient.paymentIntent.updateMany({
            where: {
              id: intent.id,
              version: intent.version,
            },
            data: {
              status: PaymentIntentStatus.RECONCILIATION_REQUIRED,
              version: intent.version + 1,
            },
          });
        }
      }
    }

    // 5. Mark ReconciliationRun as COMPLETED with populated summary
    const summary = {
      totalAttempts: attempts.length,
      matchedCount,
      mismatchCount,
    };

    await prismaClient.reconciliationRun.update({
      where: { id: run.id },
      data: {
        status: ReconciliationRunStatus.COMPLETED,
        completedAt: new Date(),
        summary,
      },
    });

    console.log(
      `[Reconciliation] Run ${run.id} COMPLETED: ${attempts.length} evaluated, ` +
        `${matchedCount} matched, ${mismatchCount} mismatched.`,
    );

    return {
      runId: run.id,
      status: 'COMPLETED',
      type: 'PROVIDER',
      totalAttempts: attempts.length,
      matchedCount,
      mismatchCount,
    };
  } catch (err: any) {
    // 6. On unexpected failure, update run to FAILED so it does not remain stuck in RUNNING
    console.error(`[Reconciliation] Run ${run.id} failed:`, err.message);

    await prismaClient.reconciliationRun.update({
      where: { id: run.id },
      data: {
        status: ReconciliationRunStatus.FAILED,
        completedAt: new Date(),
        error: err.message || 'Unexpected reconciliation failure',
      },
    });

    throw err;
  }
}
