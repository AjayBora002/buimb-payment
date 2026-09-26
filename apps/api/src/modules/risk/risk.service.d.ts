import { PrismaService } from '../../common/database/prisma.service.js';
import { type RiskDecision } from '@prisma/client';
export declare class RiskService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    evaluatePayment(merchantId: string, paymentIntentId: string, inputs: {
        amount: number;
        ipAddress?: string;
        email?: string;
        customerCountry?: string;
    }): Promise<RiskDecision>;
    listDecisions(merchantId: string, query?: {
        cursor?: string;
        limit?: number;
    }): Promise<{
        items: any;
        nextCursor: any;
    }>;
    listRules(): Promise<any>;
}
//# sourceMappingURL=risk.service.d.ts.map