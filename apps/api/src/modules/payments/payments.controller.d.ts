import { PaymentsService } from './payments.service.js';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(body: {
        orderId: string;
        captureMethod?: 'AUTOMATIC' | 'MANUAL';
        description?: string;
    }): Promise<PaymentIntent>;
    findOne(id: string): Promise<any>;
    confirm(id: string, body: {
        paymentMethodType: string;
        simulateOutcome?: 'success' | 'failure';
    }): Promise<PaymentIntent>;
    capture(id: string, body: {
        captureAmount?: number;
    }): Promise<PaymentIntent>;
    cancel(id: string, body: {
        reason?: string;
    }): Promise<PaymentIntent>;
    findAll(cursor?: string, limit?: number): Promise<{
        data: any;
        hasMore: boolean;
        nextCursor: any;
    }>;
}
//# sourceMappingURL=payments.controller.d.ts.map