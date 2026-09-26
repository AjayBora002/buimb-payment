import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  processReconciliationRun,
  isStatusMatch,
} from '../src/reconciliation.js';
import {
  PaymentIntentStatus,
  PaymentAttemptStatus,
  ReconciliationRunStatus,
} from '@buimbpay/database/client';

describe('Reconciliation Worker', () => {
  const mockMerchantId = 'merch_bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
  const periodStart = '2026-09-01T00:00:00.000Z';
  const periodEnd = '2026-09-02T00:00:00.000Z';

  function createMockPrisma(initial: {
    paymentIntents?: any[];
    paymentAttempts?: any[];
    reconciliationRuns?: any[];
  }) {
    let paymentIntents = [...(initial.paymentIntents || [])];
    const paymentAttempts = [...(initial.paymentAttempts || [])];
    const reconciliationRuns = [...(initial.reconciliationRuns || [])];
    const reconciliationItems: any[] = [];
    const reconciliationExceptions: any[] = [];

    return {
      getPaymentIntents: () => paymentIntents,
      getPaymentAttempts: () => paymentAttempts,
      getReconciliationRuns: () => reconciliationRuns,
      getReconciliationItems: () => reconciliationItems,
      getReconciliationExceptions: () => reconciliationExceptions,

      reconciliationRun: {
        create: async ({ data }: any) => {
          const record = {
            id: `run_${Date.now()}_${Math.random()}`,
            ...data,
            createdAt: new Date(),
          };
          reconciliationRuns.push(record);
          return record;
        },
        update: async ({ where, data }: any) => {
          const run = reconciliationRuns.find((r) => r.id === where.id);
          if (!run) throw new Error(`ReconciliationRun not found: ${where.id}`);
          Object.assign(run, data);
          return run;
        },
      },

      reconciliationItem: {
        create: async ({ data }: any) => {
          const record = {
            id: `item_${Date.now()}_${Math.random()}`,
            ...data,
            createdAt: new Date(),
          };
          reconciliationItems.push(record);
          return record;
        },
      },

      reconciliationException: {
        create: async ({ data }: any) => {
          const record = {
            id: `exc_${Date.now()}_${Math.random()}`,
            ...data,
            createdAt: new Date(),
          };
          reconciliationExceptions.push(record);
          return record;
        },
      },

      paymentAttempt: {
        findMany: async ({ where, include }: any) => {
          return paymentAttempts
            .filter((att) => {
              if (where.providerRef?.not === null && !att.providerRef) return false;
              if (where.createdAt?.gte && new Date(att.createdAt) < new Date(where.createdAt.gte)) {
                return false;
              }
              if (where.createdAt?.lt && new Date(att.createdAt) >= new Date(where.createdAt.lt)) {
                return false;
              }
              if (where.paymentIntent) {
                const intent = paymentIntents.find((pi) => pi.id === att.paymentIntentId);
                if (!intent) return false;
                if (
                  where.paymentIntent.environment &&
                  intent.environment !== where.paymentIntent.environment
                ) {
                  return false;
                }
                if (
                  where.paymentIntent.merchantId &&
                  intent.merchantId !== where.paymentIntent.merchantId
                ) {
                  return false;
                }
              }
              return true;
            })
            .map((att) => {
              if (include?.paymentIntent) {
                const intent = paymentIntents.find((pi) => pi.id === att.paymentIntentId);
                return { ...att, paymentIntent: { ...intent } };
              }
              return { ...att };
            });
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
    };
  }

  describe('Status Mapping Exhaustiveness', () => {
    it('correctly maps AUTHORISED, FAILED, and PENDING and defaults unlisted to MISMATCH', () => {
      // AUTHORISED matches CAPTURED or AUTHORISED
      assert.equal(isStatusMatch(PaymentAttemptStatus.AUTHORISED, 'authorised'), true);
      assert.equal(isStatusMatch(PaymentAttemptStatus.CAPTURED, 'AUTHORISED'), true);
      assert.equal(isStatusMatch(PaymentAttemptStatus.FAILED, 'authorised'), false);
      assert.equal(isStatusMatch(PaymentAttemptStatus.CANCELLED, 'authorised'), false);

      // FAILED matches FAILED only
      assert.equal(isStatusMatch(PaymentAttemptStatus.FAILED, 'failed'), true);
      assert.equal(isStatusMatch(PaymentAttemptStatus.CAPTURED, 'FAILED'), false);
      assert.equal(isStatusMatch(PaymentAttemptStatus.AUTHORISED, 'failed'), false);

      // PENDING matches PENDING or INITIATED
      assert.equal(isStatusMatch(PaymentAttemptStatus.PENDING, 'pending'), true);
      assert.equal(isStatusMatch(PaymentAttemptStatus.INITIATED, 'PENDING'), true);
      assert.equal(isStatusMatch(PaymentAttemptStatus.CAPTURED, 'pending'), false);

      // Unmapped / unknown status explicitly defaults to false (MISMATCH)
      assert.equal(isStatusMatch(PaymentAttemptStatus.CAPTURED, 'unknown_gateway_status'), false);
      assert.equal(isStatusMatch(PaymentAttemptStatus.EXPIRED, 'requires_action'), false);
    });
  });

  describe('Unimplemented Type Guardrails (SETTLEMENT / BANK)', () => {
    it('fails loudly when type is SETTLEMENT and persists run in FAILED status', async () => {
      const mockPrisma = createMockPrisma({});

      await assert.rejects(
        () =>
          processReconciliationRun({
            periodStart,
            periodEnd,
            type: 'SETTLEMENT',
            prismaClient: mockPrisma,
          }),
        /Reconciliation type 'SETTLEMENT' is not yet implemented/,
      );

      const runs = mockPrisma.getReconciliationRuns();
      assert.equal(runs.length, 1);
      assert.equal(runs[0].type, 'SETTLEMENT');
      assert.equal(runs[0].status, ReconciliationRunStatus.FAILED);
      assert.match(runs[0].error, /not yet implemented/);
      assert.ok(runs[0].completedAt);
    });

    it('fails loudly when type is BANK and persists run in FAILED status', async () => {
      const mockPrisma = createMockPrisma({});

      await assert.rejects(
        () =>
          processReconciliationRun({
            periodStart,
            periodEnd,
            type: 'BANK',
            prismaClient: mockPrisma,
          }),
        /Reconciliation type 'BANK' is not yet implemented/,
      );

      const runs = mockPrisma.getReconciliationRuns();
      assert.equal(runs.length, 1);
      assert.equal(runs[0].type, 'BANK');
      assert.equal(runs[0].status, ReconciliationRunStatus.FAILED);
      assert.match(runs[0].error, /not yet implemented/);
    });
  });

  describe('PROVIDER Reconciliation Run Execution', () => {
    it('successfully processes matched comparison without creating exceptions or mutating intent', async () => {
      const intentId = 'pi_matched_123';
      const attemptId = 'att_matched_456';
      const providerRef = 'mock_pay_success_12345'; // Returns { status: 'authorised' }

      const mockPrisma = createMockPrisma({
        paymentIntents: [
          {
            id: intentId,
            merchantId: mockMerchantId,
            amount: 500000n,
            currency: 'INR',
            status: PaymentIntentStatus.SETTLED,
            environment: 'SANDBOX',
            version: 1,
          },
        ],
        paymentAttempts: [
          {
            id: attemptId,
            paymentIntentId: intentId,
            amount: 500000n,
            currency: 'INR',
            status: PaymentAttemptStatus.CAPTURED, // CAPTURED matches 'authorised'
            providerRef,
            createdAt: new Date('2026-09-01T12:00:00.000Z'),
          },
        ],
      });

      const result = await processReconciliationRun({
        merchantId: mockMerchantId,
        periodStart,
        periodEnd,
        type: 'PROVIDER',
        prismaClient: mockPrisma,
      });

      assert.equal(result.status, 'COMPLETED');
      assert.equal(result.totalAttempts, 1);
      assert.equal(result.matchedCount, 1);
      assert.equal(result.mismatchCount, 0);

      // Verify ReconciliationRun
      const runs = mockPrisma.getReconciliationRuns();
      assert.equal(runs.length, 1);
      assert.equal(runs[0].status, ReconciliationRunStatus.COMPLETED);
      assert.equal(runs[0].summary.matchedCount, 1);
      assert.equal(runs[0].summary.mismatchCount, 0);

      // Verify ReconciliationItem created with accurate references
      const items = mockPrisma.getReconciliationItems();
      assert.equal(items.length, 1);
      assert.equal(items[0].internalRef, attemptId);
      assert.equal(items[0].providerRef, providerRef);
      assert.equal(items[0].status, 'MATCHED');
      assert.equal(items[0].internalAmount, 500000n);
      assert.equal(items[0].providerAmount, null); // Assert providerAmount is null, not fabricated
      assert.ok(items[0].matchedAt);

      // Assert no exceptions created
      assert.equal(mockPrisma.getReconciliationExceptions().length, 0);

      // Assert payment intent remains SETTLED with unchanged version
      const intents = mockPrisma.getPaymentIntents();
      assert.equal(intents[0].status, PaymentIntentStatus.SETTLED);
      assert.equal(intents[0].version, 1);
    });

    it('creates both ReconciliationItem and ReconciliationException on mismatch and transitions SETTLED intent', async () => {
      const intentId = 'pi_settled_mismatch';
      const attemptId = 'att_mismatch_789';
      // Starts with 'mock_fail_', so MockProvider.fetchPaymentStatus returns { status: 'failed' }
      const providerRef = 'mock_fail_declined_99999';

      const mockPrisma = createMockPrisma({
        paymentIntents: [
          {
            id: intentId,
            merchantId: mockMerchantId,
            amount: 250000n,
            currency: 'INR',
            status: PaymentIntentStatus.SETTLED, // In SETTLED state!
            environment: 'SANDBOX',
            version: 3,
          },
        ],
        paymentAttempts: [
          {
            id: attemptId,
            paymentIntentId: intentId,
            amount: 250000n,
            currency: 'INR',
            status: PaymentAttemptStatus.CAPTURED, // Internal record says CAPTURED, but provider says failed!
            providerRef,
            createdAt: new Date('2026-09-01T15:00:00.000Z'),
          },
        ],
      });

      const result = await processReconciliationRun({
        merchantId: mockMerchantId,
        periodStart,
        periodEnd,
        type: 'PROVIDER',
        prismaClient: mockPrisma,
      });

      assert.equal(result.status, 'COMPLETED');
      assert.equal(result.matchedCount, 0);
      assert.equal(result.mismatchCount, 1);

      // Verify ReconciliationItem
      const items = mockPrisma.getReconciliationItems();
      assert.equal(items.length, 1);
      assert.equal(items[0].internalRef, attemptId);
      assert.equal(items[0].providerRef, providerRef);
      assert.equal(items[0].status, 'MISMATCH');
      assert.equal(items[0].internalAmount, 250000n);
      assert.equal(items[0].providerAmount, null);

      // Verify ReconciliationException created with explicit traceability
      const exceptions = mockPrisma.getReconciliationExceptions();
      assert.equal(exceptions.length, 1);
      assert.equal(exceptions[0].type, 'STATUS_MISMATCH');
      assert.equal(exceptions[0].internalRef, attemptId);
      assert.equal(exceptions[0].providerRef, providerRef);
      assert.equal(exceptions[0].amount, 250000n);
      assert.match(exceptions[0].description, /internal=CAPTURED, provider=failed/);

      // Verify SETTLED payment intent was transitioned to RECONCILIATION_REQUIRED with incremented version
      const intents = mockPrisma.getPaymentIntents();
      assert.equal(intents[0].status, PaymentIntentStatus.RECONCILIATION_REQUIRED);
      assert.equal(intents[0].version, 4);
    });

    it('records mismatch exception but does NOT transition payment intent when in CAPTURED status', async () => {
      const intentId = 'pi_captured_not_settled';
      const attemptId = 'att_captured_mismatch';
      const providerRef = 'mock_fail_declined_11111'; // Provider status: failed

      const mockPrisma = createMockPrisma({
        paymentIntents: [
          {
            id: intentId,
            merchantId: mockMerchantId,
            amount: 100000n,
            currency: 'INR',
            status: PaymentIntentStatus.CAPTURED, // Still CAPTURED (not yet settled)!
            environment: 'SANDBOX',
            version: 1,
          },
        ],
        paymentAttempts: [
          {
            id: attemptId,
            paymentIntentId: intentId,
            amount: 100000n,
            currency: 'INR',
            status: PaymentAttemptStatus.CAPTURED,
            providerRef,
            createdAt: new Date('2026-09-01T18:00:00.000Z'),
          },
        ],
      });

      const result = await processReconciliationRun({
        merchantId: mockMerchantId,
        periodStart,
        periodEnd,
        type: 'PROVIDER',
        prismaClient: mockPrisma,
      });

      assert.equal(result.status, 'COMPLETED');
      assert.equal(result.mismatchCount, 1);

      // Exception was recorded
      const exceptions = mockPrisma.getReconciliationExceptions();
      assert.equal(exceptions.length, 1);
      assert.equal(exceptions[0].type, 'STATUS_MISMATCH');

      // Assert CAPTURED payment intent was NOT transitioned (remains CAPTURED, version unchanged)
      const intents = mockPrisma.getPaymentIntents();
      assert.equal(
        intents[0].status,
        PaymentIntentStatus.CAPTURED,
        'CAPTURED intent must NOT transition to RECONCILIATION_REQUIRED',
      );
      assert.equal(intents[0].version, 1);
    });

    it('supports re-running reconciliation over the same period without collision or crashing on flagged intents', async () => {
      const intentId = 'pi_rerun_test';
      const attemptId = 'att_rerun_test';
      const providerRef = 'mock_fail_declined_22222';

      const mockPrisma = createMockPrisma({
        paymentIntents: [
          {
            id: intentId,
            merchantId: mockMerchantId,
            amount: 150000n,
            currency: 'INR',
            status: PaymentIntentStatus.SETTLED,
            environment: 'SANDBOX',
            version: 1,
          },
        ],
        paymentAttempts: [
          {
            id: attemptId,
            paymentIntentId: intentId,
            amount: 150000n,
            currency: 'INR',
            status: PaymentAttemptStatus.CAPTURED,
            providerRef,
            createdAt: new Date('2026-09-01T10:00:00.000Z'),
          },
        ],
      });

      // Run 1: Detects mismatch and transitions SETTLED -> RECONCILIATION_REQUIRED
      const firstRun = await processReconciliationRun({
        merchantId: mockMerchantId,
        periodStart,
        periodEnd,
        type: 'PROVIDER',
        prismaClient: mockPrisma,
      });
      assert.equal(firstRun.status, 'COMPLETED');

      // Intent is now RECONCILIATION_REQUIRED
      assert.equal(
        mockPrisma.getPaymentIntents()[0].status,
        PaymentIntentStatus.RECONCILIATION_REQUIRED,
      );

      // Run 2: Re-running over the exact same period window succeeds cleanly
      const secondRun = await processReconciliationRun({
        merchantId: mockMerchantId,
        periodStart,
        periodEnd,
        type: 'PROVIDER',
        prismaClient: mockPrisma,
      });
      assert.equal(secondRun.status, 'COMPLETED');

      // Verifies both runs exist as distinct historical audit records
      const runs = mockPrisma.getReconciliationRuns();
      assert.equal(runs.length, 2);
      assert.equal(runs[0].status, ReconciliationRunStatus.COMPLETED);
      assert.equal(runs[1].status, ReconciliationRunStatus.COMPLETED);
    });
  });
});
