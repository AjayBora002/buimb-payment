import { prisma as defaultPrisma } from '@buimbpay/database/client';
/**
 * Fans out a domain OutboxEvent into the webhook delivery pipeline.
 * Queries active endpoints (isActive: true) subscribed to the eventType,
 * creates a WebhookEvent and WebhookDelivery rows, and enqueues to webhookQueue.
 */
export async function fanOutWebhookEvent(prismaClient, webhookQueue, event) {
    const payload = event.payload || {};
    const merchantId = payload.merchantId ||
        payload.merchant?.id ||
        event.aggregateId;
    if (!merchantId) {
        throw new Error(`Cannot fan-out event ${event.id}: unable to determine merchantId`);
    }
    // 1. Look up active endpoints subscribed to this event type
    const endpoints = await prismaClient.webhookEndpoint.findMany({
        where: {
            merchantId,
            isActive: true, // Filter isActive: true endpoints only
        },
    });
    const matchingEndpoints = endpoints.filter((ep) => {
        if (!Array.isArray(ep.events))
            return false;
        return ep.events.includes(event.eventType) || ep.events.includes('*');
    });
    if (matchingEndpoints.length === 0) {
        return { webhookEventId: null, deliveryCount: 0 };
    }
    // 2. Create the central WebhookEvent record
    const webhookEvent = await prismaClient.webhookEvent.create({
        data: {
            merchantId,
            eventType: event.eventType,
            apiVersion: payload.apiVersion || '2026-09-01',
            payload: payload,
            environment: payload.environment || 'SANDBOX',
        },
    });
    // 3. Create WebhookDelivery records and enqueue to webhookQueue
    for (const endpoint of matchingEndpoints) {
        const delivery = await prismaClient.webhookDelivery.create({
            data: {
                webhookEventId: webhookEvent.id,
                endpointId: endpoint.id,
                status: 'PENDING',
                attemptNumber: 1,
            },
        });
        await webhookQueue.add('webhook-delivery', { deliveryId: delivery.id }, { jobId: `webhook-delivery-${delivery.id}` });
    }
    return {
        webhookEventId: webhookEvent.id,
        deliveryCount: matchingEndpoints.length,
    };
}
/**
 * Optimistically claims a pending outbox event via atomic CAS to prevent duplicate
 * processing across horizontal worker instances.
 */
export async function claimOutboxEvent(prismaClient, eventId, currentStatus = 'PENDING') {
    const claim = await prismaClient.outboxEvent.updateMany({
        where: {
            id: eventId,
            status: currentStatus,
        },
        data: {
            status: 'PROCESSING',
        },
    });
    return claim.count > 0;
}
/**
 * Polls oldest pending outbox events in small batches, atomically claims them,
 * relays them through the webhook pipeline, and updates DB status accordingly.
 */
export async function processOutboxBatch(options) {
    const prismaClient = options.prismaClient || defaultPrisma;
    const { webhookQueue, batchSize = 20, staleLockThresholdMs = 5 * 60 * 1000 } = options;
    const staleThreshold = new Date(Date.now() - staleLockThresholdMs);
    // Poll candidates using status + createdAt index, oldest first
    const candidates = await prismaClient.outboxEvent.findMany({
        where: {
            OR: [
                { status: 'PENDING' },
                { status: 'PROCESSING', updatedAt: { lt: staleThreshold } },
            ],
        },
        orderBy: { createdAt: 'asc' },
        take: batchSize,
    });
    let processedCount = 0;
    let publishedCount = 0;
    let failedCount = 0;
    for (const candidate of candidates) {
        // Attempt atomic DB-level claim
        const claimed = await claimOutboxEvent(prismaClient, candidate.id, candidate.status);
        if (!claimed) {
            // Concurrently claimed by another worker instance; skip
            continue;
        }
        processedCount++;
        try {
            await fanOutWebhookEvent(prismaClient, webhookQueue, candidate);
            // On success: mark PUBLISHED, set publishedAt, increment attempts, clear lastError
            await prismaClient.outboxEvent.update({
                where: { id: candidate.id },
                data: {
                    status: 'PUBLISHED',
                    publishedAt: new Date(),
                    attempts: { increment: 1 },
                    lastError: null,
                },
            });
            publishedCount++;
        }
        catch (err) {
            failedCount++;
            const nextAttempts = candidate.attempts + 1;
            const isExhausted = nextAttempts >= 5;
            console.error(`[OutboxRelay] Failed to relay event ${candidate.id} (attempt ${nextAttempts}):`, err.message);
            // On failure: update status (PENDING for retry, or FAILED if max-attempts reached),
            // increment attempts, and store the real error message
            await prismaClient.outboxEvent.update({
                where: { id: candidate.id },
                data: {
                    status: isExhausted ? 'FAILED' : 'PENDING',
                    attempts: { increment: 1 },
                    lastError: (err.message || 'Unknown relay error').slice(0, 1000),
                },
            });
            // Do not re-throw here: process the rest of the batch without crashing
        }
    }
    return { processedCount, publishedCount, failedCount };
}
