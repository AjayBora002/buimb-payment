import { PrismaService } from '../../common/database/prisma.service.js';
import { Environment } from '@prisma/client';
export declare class WebhooksService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createEndpoint(merchantId: string, data: {
        url: string;
        description?: string;
        events: string[];
        environment?: Environment;
    }): Promise<any>;
    listEndpoints(merchantId: string): Promise<any>;
    deleteEndpoint(merchantId: string, id: string): Promise<any>;
    listDeliveries(merchantId: string, query?: {
        endpointId?: string;
        cursor?: string;
        limit?: number;
    }): Promise<{
        items: any;
        nextCursor: any;
    }>;
}
//# sourceMappingURL=webhooks.service.d.ts.map