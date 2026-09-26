import { Worker, Queue } from 'bullmq';
import { Redis } from 'ioredis';
import { prisma } from '@buimbpay/database/client';
import { processWebhookDelivery } from './webhook-delivery.js';
import { processOutboxBatch } from './outbox-relay.js';
import { processSettlementBatch, getSettlementConfig } from './settlement-batch.js';
import { processReconciliationRun } from './reconciliation.js';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const connection = new Redis(redisUrl, { maxRetriesPerRequest: null });

console.log('⚡ BuimbPay Background Worker initializing...');

// ── Webhook Delivery Queue with Exponential Backoff ──────────────────────────
export const webhookQueue = new Queue('webhook-delivery', {
  connection,
  defaultJobOptions: {
    attempts: 5,
    backoff: {
      type: 'exponential',
      delay: 30000, // 30s initial delay (30s, 60s, 120s, 240s, 480s)
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

// ── 1. Webhook Delivery Worker ───────────────────────────────────────────────
export const webhookWorker = new Worker(
  'webhook-delivery',
  async (job) => {
    const { deliveryId } = job.data;
    console.log(`[Webhook] Processing delivery ${deliveryId} (attempt ${job.attemptsMade + 1})`);

    try {
      const result = await processWebhookDelivery(deliveryId, { prismaClient: prisma });
      console.log(`[Webhook] Delivery ${deliveryId} succeeded with HTTP ${result.httpStatus} in ${result.latencyMs}ms`);
      return result;
    } catch (err: any) {
      console.error(`[Webhook] Delivery failed for ${deliveryId}:`, err.message);
      throw err;
    }
  },
  { connection },
);

// Validate settlement fee & tax configuration at worker startup
const settlementConfig = getSettlementConfig();

// ── 2. Settlement Batch Worker ──────────────────────────────────────────────
export const settlementWorker = new Worker(
  'settlement-batch',
  async (job) => {
    const { merchantId, periodStart, periodEnd } = job.data;
    console.log(`[Settlement] Processing batch for merchant ${merchantId} (${periodStart} - ${periodEnd})`);

    const result = await processSettlementBatch({
      merchantId,
      periodStart,
      periodEnd,
      prismaClient: prisma,
      config: settlementConfig,
    });

    console.log(`[Settlement] Batch result for ${merchantId}:`, result.status);
    return result;
  },
  { connection },
);

// ── 3. Reconciliation Worker ────────────────────────────────────────────────
export const reconciliationWorker = new Worker(
  'reconciliation-run',
  async (job) => {
    const { merchantId, periodStart, periodEnd, type } = job.data;
    console.log(
      `[Reconciliation] Processing ${type} run for period ${periodStart} - ${periodEnd}` +
        (merchantId ? ` (merchant ${merchantId})` : ' (all merchants)'),
    );

    const result = await processReconciliationRun({
      merchantId,
      periodStart,
      periodEnd,
      type,
      prismaClient: prisma,
    });

    console.log(`[Reconciliation] Run ${result.runId} completed with status:`, result.status);
    return result;
  },
  { connection },
);

// ── 4. Outbox Relay Worker ──────────────────────────────────────────────────
export const outboxWorker = new Worker(
  'outbox-relay',
  async () => {
    const result = await processOutboxBatch({
      prismaClient: prisma,
      webhookQueue,
      batchSize: 50,
    });
    return result;
  },
  { connection },
);

console.log('✅ All BuimbPay workers active and listening for jobs');

process.on('SIGINT', async () => {
  console.log('Stopping workers...');
  await webhookWorker.close();
  await webhookQueue.close();
  await settlementWorker.close();
  await reconciliationWorker.close();
  await outboxWorker.close();
  await connection.quit();
  process.exit(0);
});

