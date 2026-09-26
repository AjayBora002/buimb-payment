/**
 * Mock Provider — Sandbox use only
 *
 * Simulates payment provider behaviour without touching real money.
 * All operations are in-process with configurable outcome simulation.
 */
import { randomUUID } from 'crypto';

export interface MockPaymentRequest {
  amount: number;
  currency: string;
  paymentMethodType: string;
  simulateOutcome?: 'success' | 'failure' | 'timeout' | 'requires_action';
}

export interface MockPaymentResponse {
  providerRef: string;
  status: 'authorised' | 'failed' | 'requires_action';
  errorCode?: string;
  errorMessage?: string;
  authCode?: string;
}

export interface MockRefundRequest {
  providerRef: string;
  amount: number;
  currency: string;
}

export interface MockRefundResponse {
  providerRefundRef: string;
  status: 'succeeded' | 'failed';
}

const SIMULATED_DELAY_MS = 500;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class MockProvider {
  readonly name = 'mock';
  readonly isSandbox = true;

  async createPayment(req: MockPaymentRequest): Promise<MockPaymentResponse> {
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

  async refundPayment(_req: MockRefundRequest): Promise<MockRefundResponse> {
    await sleep(SIMULATED_DELAY_MS);
    return {
      providerRefundRef: `mock_ref_${randomUUID()}`,
      status: 'succeeded',
    };
  }

  async fetchPaymentStatus(
    providerRef: string,
  ): Promise<{ status: 'authorised' | 'failed' | 'pending' }> {
    await sleep(SIMULATED_DELAY_MS / 2);
    if (providerRef.startsWith('mock_fail_')) return { status: 'failed' };
    return { status: 'authorised' };
  }

  verifyWebhookSignature(_payload: string, _signature: string): boolean {
    // Mock provider always has valid signatures in sandbox
    return true;
  }
}
