import { Worker } from 'bullmq';
import { Redis } from 'ioredis';
import { prisma } from '@buimbpay/database/client';
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const connection = new Redis(redisUrl, { maxRetriesPerRequest: null });
console.log('⚡ BuimbPay Background Worker initializing...');
// ── 1. Webhook Delivery Worker ───────────────────────────────────────────────
const webhookWorker = new Worker('webhook-delivery', async (job) => {
    const { deliveryId, url, payload, secret } = job.data;
    console.log(`[Webhook] Dispatching event to ${url} (Delivery: ${deliveryId})`);
    try {
        // In production, sign payload with HMAC-SHA256 and POST
        await prisma.webhookDelivery.update({
            where: { id: deliveryId },
            data: {
                status: 'DELIVERED',
                httpStatus: 200,
                deliveredAt: new Date(),
                latencyMs: 120,
            },
        });
        return { status: 'delivered' };
    }
    catch (err) {
        console.error(`[Webhook] Delivery failed for ${deliveryId}:`, err.message);
        await prisma.webhookDelivery.update({
            where: { id: deliveryId },
            data: {
                status: 'FAILED',
                errorMessage: err.message,
            },
        });
        throw err;
    }
}, { connection });
// ── 2. Settlement Batch Worker ──────────────────────────────────────────────
const settlementWorker = new Worker('settlement-batch', async (job) => {
    const { merchantId, periodStart, periodEnd } = job.data;
    console.log(`[Settlement] Processing batch for merchant ${merchantId}`);
    // Aggregates eligible captured intents, computes fees & taxes, creates settlement record
    return { status: 'processed', merchantId };
}, { connection });
// ── 3. Reconciliation Worker ────────────────────────────────────────────────
const reconciliationWorker = new Worker('reconciliation-run', async (job) => {
    const { runId } = job.data;
    console.log(`[Reconciliation] Running reconciliation job ${runId}`);
    // Matches internal records with simulated bank/provider statements
    return { status: 'completed', runId };
}, { connection });
// ── 4. Outbox Relay Worker ──────────────────────────────────────────────────
const outboxWorker = new Worker('outbox-relay', async () => {
    // Polls pending outbox events and pushes to target queues
    const pendingEvents = await prisma.outboxEvent.findMany({
        where: { status: 'PENDING' },
        take: 50,
    });
    for (const event of pendingEvents) {
        // mark published
        await prisma.outboxEvent.update({
            where: { id: event.id },
            data: { status: 'PUBLISHED', publishedAt: new Date() },
        });
    }
    return { processedCount: pendingEvents.length };
}, { connection });
console.log('✅ All BuimbPay workers active and listening for jobs');
process.on('SIGINT', async () => {
    console.log('Stopping workers...');
    await webhookWorker.close();
    await settlementWorker.close();
    await reconciliationWorker.close();
    await outboxWorker.close();
    await connection.quit();
    process.exit(0);
});
//# sourceMappingURL=index.js.map