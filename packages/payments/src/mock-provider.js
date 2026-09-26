/**
 * Mock Provider — Sandbox use only
 *
 * Simulates payment provider behaviour without touching real money.
 * All operations are in-process with configurable outcome simulation.
 */
import { randomUUID } from 'crypto';
const SIMULATED_DELAY_MS = 500;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
export class MockProvider {
    name = 'mock';
    isSandbox = true;
    async createPayment(req) {
        await sleep(SIMULATED_DELAY_MS);
        const outcome = req.simulateOutcome ?? 'success';
        if (outcome === 'timeout') {
            throw new Error('MockProvider: simulated timeout');
        }
        if (outcome === 'failure') {
            return {
                providerRef: `mock_fail_${randomUUID()}`,
                status: 'failed',
                errorCode: 'CARD_DECLINED',
                errorMessage: 'Simulated card decline',
            };
        }
        if (outcome === 'requires_action') {
            return {
                providerRef: `mock_3ds_${randomUUID()}`,
                status: 'requires_action',
            };
        }
        return {
            providerRef: `mock_pay_${randomUUID()}`,
            status: 'authorised',
            authCode: `AUTH_${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
        };
    }
    async refundPayment(_req) {
        await sleep(SIMULATED_DELAY_MS);
        return {
            providerRefundRef: `mock_ref_${randomUUID()}`,
            status: 'succeeded',
        };
    }
    async fetchPaymentStatus(providerRef) {
        await sleep(SIMULATED_DELAY_MS / 2);
        if (providerRef.startsWith('mock_fail_'))
            return { status: 'failed' };
        return { status: 'authorised' };
    }
    verifyWebhookSignature(_payload, _signature) {
        // Mock provider always has valid signatures in sandbox
        return true;
    }
}
//# sourceMappingURL=mock-provider.js.map