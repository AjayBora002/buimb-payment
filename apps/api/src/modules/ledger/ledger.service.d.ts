import { PrismaService } from '../../common/database/prisma.service.js';
export declare class LedgerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    recordTransaction(data: {
        type: string;
        description: string;
        referenceId?: string;
        paymentIntentId?: string;
        actorId?: string;
        entries: Array<{
            debitAccountId: string;
            creditAccountId: string;
            amount: bigint | number;
            currency: string;
            description?: string;
        }>;
    }): Promise<any>;
    listAccounts(merchantId?: string): Promise<any>;
    listTransactions(query?: {
        paymentIntentId?: string;
        cursor?: string;
        limit?: number;
    }): Promise<{
        items: any;
        nextCursor: any;
    }>;
}
//# sourceMappingURL=ledger.service.d.ts.map