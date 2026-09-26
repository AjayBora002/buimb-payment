import { PrismaService } from '../../common/database/prisma.service.js';
import { PaymentIntentStatus, Environment, type PaymentIntent } from '@prisma/client';
export declare class PaymentsService {
    private readonly prisma;
    private readonly logger;
    private readonly mockProvider;
    constructor(prisma: PrismaService);
    createPaymentIntent(merchantId: string, orderId: string, data: {
        captureMethod?: 'AUTOMATIC' | 'MANUAL';
        description?: string;
        statementDescriptor?: string;
        metadata?: Record<string, unknown>;
    }, environment?: Environment): Promise<PaymentIntent>;
    confirmPaymentIntent(merchantId: string, paymentIntentId: string, data: {
        paymentMethodType: string;
        paymentMethodData?: Record<string, unknown>;
        simulateOutcome?: 'success' | 'failure' | 'timeout' | 'requires_action';
    }): Promise<PaymentIntent>;
    capturePaymentIntent(merchantId: string, paymentIntentId: string, captureAmount?: number): Promise<PaymentIntent>;
    cancelPaymentIntent(merchantId: string, paymentIntentId: string, reason?: string): Promise<PaymentIntent>;
    findOne(merchantId: string, id: string): Promise<PaymentIntent | null>;
    findAll(merchantId: string, opts: {
        cursor?: string;
        limit?: number;
        status?: PaymentIntentStatus;
        environment?: Environment;
    }): Promise<{
        data: any;
        hasMore: boolean;
        nextCursor: any;
    }>;
    private findOneOrThrow;
}
//# sourceMappingURL=payments.service.d.ts.map