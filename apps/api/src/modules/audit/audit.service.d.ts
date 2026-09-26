import { PrismaService } from '../../common/database/prisma.service.js';
export declare class AuditService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    recordEvent(data: {
        actorId?: string;
        actorType: 'USER' | 'SYSTEM' | 'OPERATOR' | 'API_KEY';
        merchantId?: string;
        resource: string;
        resourceId?: string;
        action: string;
        outcome: 'SUCCESS' | 'FAILURE' | 'DENIED';
        ipAddress?: string;
        userAgent?: string;
        metadata?: Record<string, unknown>;
    }): Promise<any>;
    listEvents(merchantId: string, query?: {
        resource?: string;
        cursor?: string;
        limit?: number;
    }): Promise<{
        items: any;
        nextCursor: any;
    }>;
}
//# sourceMappingURL=audit.service.d.ts.map