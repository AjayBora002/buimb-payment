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
export declare class MockProvider {
    readonly name = "mock";
    readonly isSandbox = true;
    createPayment(req: MockPaymentRequest): Promise<MockPaymentResponse>;
    refundPayment(_req: MockRefundRequest): Promise<MockRefundResponse>;
    fetchPaymentStatus(providerRef: string): Promise<{
        status: 'authorised' | 'failed' | 'pending';
    }>;
    verifyWebhookSignature(_payload: string, _signature: string): boolean;
}
//# sourceMappingURL=mock-provider.d.ts.map