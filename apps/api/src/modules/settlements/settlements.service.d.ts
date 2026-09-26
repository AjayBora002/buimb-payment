import { PrismaService } from '../../common/database/prisma.service.js';
import { SettlementStatus, type Settlement } from '@prisma/client';
export declare class SettlementsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listSettlements(merchantId: string, query?: {
        cursor?: string;
        limit?: number;
        status?: SettlementStatus;
    }): Promise<{
        items: Settlement[];
        nextCursor: string | null;
    }>;
    getSettlement(merchantId: string, id: string): Promise<Settlement>;
}
//# sourceMappingURL=settlements.service.d.ts.map