import { PrismaService } from '../../common/database/prisma.service.js';
import { type Refund } from '@prisma/client';
export declare class RefundsService {
    private readonly prisma;
    private readonly mockProvider;
    constructor(prisma: PrismaService);
    createRefund(merchantId: string, userId: string, data: {
        paymentIntentId: string;
        amount?: number;
        reason?: string;
        notes?: string;
        idempotencyKey?: string;
    }): Promise<Refund>;
    findRefund(merchantId: string, id: string): Promise<Refund>;
    listRefunds(merchantId: string, query?: {
        cursor?: string;
        limit?: number;
    }): Promise<{
        items: Refund[];
        nextCursor: string | null;
    }>;
}
//# sourceMappingURL=refunds.service.d.ts.map