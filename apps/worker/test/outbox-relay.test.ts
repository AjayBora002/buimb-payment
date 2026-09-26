import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  claimOutboxEvent,
  fanOutWebhookEvent,
  processOutboxBatch,
} from '../src/outbox-relay.js';

describe('Outbox Relay Worker', () => {
  const mockMerchantId = 'merch_11111111-1111-1111-1111-111111111111';
  const mockEventId = 'outbox_22222222-2222-2222-2222-222222222222';

  function createMockPrisma(initialData: {
    outboxEvents?: any[];
    webhookEndpoints?: any[];
  }) {
    let outboxEvents = [...(initialData.outboxEvents || [])];
    const webhookEndpoints = [...(initialData.webhookEndpoints || [])];
    const webhookEvents: any[] = [];
    const webhookDeliveries: any[] = [];

    return {
      getOutboxEvents: () => outboxEvents,
      getWebhookEvents: () => webhookEvents,
      getWebhookDeliveries: () => webhookDeliveries,

      outboxEvent: {
        findMany: async ({ where, take }: any) => {
          let list = outboxEvents;
          if (where?.OR) {
            list = list.filter((e) => {
              return where.OR.some((cond: any) => {
                if (cond.status === 'PENDING') return e.status === 'PENDING';
                if (cond.status === 'PROCESSING') {
                  return (
                    e.status === 'PROCESSING' &&
                    cond.updatedAt?.lt &&
                    new Date(e.updatedAt) < new Date(cond.updatedAt.lt)
                  );
                }
                return false;
              });
            });
          }
          return list.slice(0, take || list.length);
        },
        updateMany: async ({ where, data }: any) => {
          let count = 0;
          outboxEvents = outboxEvents.map((e) => {
            if (e.id === where.id && e.status === where.status) {
              count++;
              return { ...e, ...data, updatedAt: new Date() };
            }
            return e;
          });
          return { count };
        },
        update: async ({ where, data }: any) => {
          const index = outboxEvents.findIndex((e) => e.id === where.id);
          if (index === -1) throw new Error(`OutboxEvent not found: ${where.id}`);
          const current = outboxEvents[index];
          const updated = {
            ...current,
            ...data,
            attempts: data.attempts?.increment
              ? current.attempts + data.attempts.increment
              : data.attempts ?? current.attempts,
            updatedAt: new Date(),
          };
          outboxEvents[index] = updated;
          return updated;
        },
      },

      webhookEndpoint: {
        findMany: async ({ where }: any) => {
          return webhookEndpoints.filter((ep) => {
            if (where.merchantId && ep.merchantId !== where.merchantId) return false;
            if (where.isActive !== undefined && ep.isActive !== where.isActive) return false;
            return true;
          });
        },
      },

      webhookEvent: {
        create: async ({ data }: any) => {
          const record = {
            id: `whevt_${Date.now()}_${Math.random()}`,
            ...data,
            createdAt: new Date(),
          };
          webhookEvents.push(record);
          return record;
        },
      },

      webhookDelivery: {
        create: async ({ data }: any) => {
          const record = {
            id: `whdel_${Date.now()}_${Math.random()}`,
            ...data,
            createdAt: new Date(),
          };
          webhookDeliveries.push(record);
          return record;
        },
      },
    };
  }

  function createMockQueue() {
    const jobs: Array<{ name: string; data: any; opts?: any }> = [];
    return {
      getJobs: () => jobs,
      add: async (name: string, data: any, opts?: any) => {
        jobs.push({ name, data, opts });
        return { id: opts?.jobId || `job_${jobs.length}` };
      },
    };
  }

  it('relays a pending outbox event, filters to active endpoints only, and marks PUBLISHED', async () => {
    const mockPrisma = createMockPrisma({
      outboxEvents: [
        {
          id: mockEventId,
          aggregateId: 'pi_test_order_123',
          eventType: 'payment_intent.captured',
          payload: {
            merchantId: mockMerchantId,
            paymentIntentId: 'pi_test_order_123',
            amount: 10000,
          },
          status: 'PENDING',
          attempts: 0,
          lastError: null,
          publishedAt: null,
          createdAt: new Date('2026-09-01T00:00:00Z'),
          updatedAt: new Date('2026-09-01T00:00:00Z'),
        },
      ],
      webhookEndpoints: [
        {
          id: 'ep_active_subscribed',
          merchantId: mockMerchantId,
          url: 'https://example.com/webhook/active',
          events: ['payment_intent.captured'],
          isActive: true,
        },
        {
          id: 'ep_inactive_subscribed',
          merchantId: mockMerchantId,
          url: 'https://example.com/webhook/inactive',
          events: ['payment_intent.captured'],
          isActive: false, // Must be filtered out!
        },
        {
          id: 'ep_active_unsubscribed',
          merchantId: mockMerchantId,
          url: 'https://example.com/webhook/other',
          events: ['refund.created'], // Different event -> ignored
          isActive: true,
        },
      ],
    });

    const mockQueue = createMockQueue();

    const result = await processOutboxBatch({
      prismaClient: mockPrisma,
      webhookQueue: mockQueue,
      batchSize: 10,
    });

    assert.equal(result.processedCount, 1);
    assert.equal(result.publishedCount, 1);
    assert.equal(result.failedCount, 0);

    // Verify OutboxEvent state
    const [event] = mockPrisma.getOutboxEvents();
    assert.equal(event.status, 'PUBLISHED');
    assert.ok(event.publishedAt instanceof Date);
    assert.equal(event.attempts, 1);
    assert.equal(event.lastError, null);

    // Verify only the active subscribed endpoint got a delivery
    const deliveries = mockPrisma.getWebhookDeliveries();
    assert.equal(deliveries.length, 1);
    assert.equal(deliveries[0].endpointId, 'ep_active_subscribed');
    assert.equal(deliveries[0].status, 'PENDING');

    // Verify queue received delivery job
    const queueJobs = mockQueue.getJobs();
    assert.equal(queueJobs.length, 1);
    assert.equal(queueJobs[0].data.deliveryId, deliveries[0].id);
  });

  it('increments attempts and sets lastError on failure without crashing the whole batch', async () => {
    const mockPrisma = createMockPrisma({
      outboxEvents: [
        {
          id: 'event_fail',
          aggregateId: 'agg_fail',
          eventType: 'payment_intent.failed',
          payload: {
            merchantId: mockMerchantId,
          },
          status: 'PENDING',
          attempts: 1,
          createdAt: new Date('2026-09-01T00:00:00Z'),
          updatedAt: new Date('2026-09-01T00:00:00Z'),
        },
        {
          id: 'event_success',
          aggregateId: 'agg_ok',
          eventType: 'payment_intent.captured',
          payload: {
            merchantId: mockMerchantId,
          },
          status: 'PENDING',
          attempts: 0,
          createdAt: new Date('2026-09-01T00:01:00Z'),
          updatedAt: new Date('2026-09-01T00:01:00Z'),
        },
      ],
      webhookEndpoints: [
        {
          id: 'ep_ok',
          merchantId: mockMerchantId,
          url: 'https://example.com/ok',
          events: ['payment_intent.failed', 'payment_intent.captured'],
          isActive: true,
        },
      ],
    });

    const mockQueue = createMockQueue();
    // Simulate failure specifically for event_fail during webhookEvent creation
    const originalCreate = mockPrisma.webhookEvent.create;
    mockPrisma.webhookEvent.create = async (args: any) => {
      if (args.data.eventType === 'payment_intent.failed') {
        throw new Error('Database connection dropped during event creation');
      }
      return originalCreate(args);
    };

    const result = await processOutboxBatch({
      prismaClient: mockPrisma,
      webhookQueue: mockQueue,
      batchSize: 10,
    });

    assert.equal(result.processedCount, 2);
    assert.equal(result.publishedCount, 1);
    assert.equal(result.failedCount, 1);

    const [failedEvent, successEvent] = mockPrisma.getOutboxEvents();

    // Event 1 was updated to retryable state with incremented attempts and error message
    assert.equal(failedEvent.status, 'PENDING');
    assert.equal(failedEvent.attempts, 2);
    assert.match(failedEvent.lastError, /Database connection dropped/);

    // Event 2 succeeded regardless of Event 1 failing
    assert.equal(successEvent.status, 'PUBLISHED');
    assert.equal(successEvent.attempts, 1);
    assert.equal(successEvent.lastError, null);
  });

  it('marks event as FAILED when max retry attempts (5) are reached', async () => {
    const mockPrisma = createMockPrisma({
      outboxEvents: [
        {
          id: 'event_exhausted',
          aggregateId: 'agg_bad',
          eventType: 'payment_intent.failed',
          payload: { merchantId: mockMerchantId },
          status: 'PENDING',
          attempts: 4, // 5th attempt will fail
          createdAt: new Date('2026-09-01T00:00:00Z'),
          updatedAt: new Date('2026-09-01T00:00:00Z'),
        },
      ],
      webhookEndpoints: [
        {
          id: 'ep_ok',
          merchantId: mockMerchantId,
          url: 'https://example.com/ok',
          events: ['*'],
          isActive: true,
        },
      ],
    });

    const mockQueue = createMockQueue();
    mockPrisma.webhookEvent.create = async () => {
      throw new Error('Persistent fatal error');
    };

    const result = await processOutboxBatch({
      prismaClient: mockPrisma,
      webhookQueue: mockQueue,
      batchSize: 10,
    });

    assert.equal(result.failedCount, 1);

    const [exhaustedEvent] = mockPrisma.getOutboxEvents();
    assert.equal(exhaustedEvent.status, 'FAILED');
    assert.equal(exhaustedEvent.attempts, 5);
    assert.match(exhaustedEvent.lastError, /Persistent fatal error/);
  });

  it('prevents two concurrent workers from both claiming the same row', async () => {
    const mockPrisma = createMockPrisma({
      outboxEvents: [
        {
          id: 'contested_event_1',
          aggregateId: 'agg_1',
          eventType: 'order.paid',
          payload: { merchantId: mockMerchantId },
          status: 'PENDING',
          attempts: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });

    // Worker 1 and Worker 2 attempt to claim the exact same event
    const worker1Claim = await claimOutboxEvent(mockPrisma, 'contested_event_1', 'PENDING');
    const worker2Claim = await claimOutboxEvent(mockPrisma, 'contested_event_1', 'PENDING');

    // Only one worker must succeed
    assert.equal(worker1Claim, true, 'Worker 1 should successfully claim the row');
    assert.equal(worker2Claim, false, 'Worker 2 must fail to claim the already claimed row');

    const [event] = mockPrisma.getOutboxEvents();
    assert.equal(event.status, 'PROCESSING');
  });
});
