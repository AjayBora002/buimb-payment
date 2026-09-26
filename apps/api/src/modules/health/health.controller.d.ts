import { PrismaService } from '../../common/database/prisma.service.js';
import { RedisService } from '../../common/redis/redis.service.js';
export declare class HealthController {
    private readonly prisma;
    private readonly redis;
    constructor(prisma: PrismaService, redis: RedisService);
    check(): Promise<{
        status: string;
        timestamp: string;
        checks: {
            database: string;
            redis: string;
            productionPayments: string;
        };
        version: string;
    }>;
}
//# sourceMappingURL=health.controller.d.ts.map