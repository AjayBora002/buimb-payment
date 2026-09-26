import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
export declare class RedisService implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    private client;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    getClient(): Redis;
    /** Idempotency: set a key only if it doesn't exist, with TTL */
    setNX(key: string, value: string, ttlSeconds: number): Promise<boolean>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<void>;
    incr(key: string): Promise<number>;
    expire(key: string, ttlSeconds: number): Promise<void>;
}
//# sourceMappingURL=redis.service.d.ts.map