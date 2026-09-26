import { PrismaService } from '../../common/database/prisma.service.js';
import { PaymentLinkStatus, Environment, type PaymentLink } from '@prisma/client';
export declare class PaymentLinksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createPaymentLink(merchantId: string, userId: string, data: {
        amount: number;
        currency?: string;
        description?: string;
        customerName?: string;
        customerEmail?: string;
        customerPhone?: string;
        expiresInHours?: number;
        customReference?: string;
        idempotencyKey?: string;
    }, environment?: Environment): Promise<PaymentLink>;
    getPaymentLinkBySlug(slug: string): Promise<PaymentLink>;
    findPaymentLink(merchantId: string, id: string): Promise<PaymentLink>;
    listPaymentLinks(merchantId: string, query?: {
        cursor?: string;
        limit?: number;
        status?: PaymentLinkStatus;
    }): Promise<{
        items: PaymentLink[];
        nextCursor: string | null;
    }>;
    deactivatePaymentLink(merchantId: string, id: string): Promise<PaymentLink>;
}
//# sourceMappingURL=payment-links.service.d.ts.map