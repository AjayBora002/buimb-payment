var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RedisService_1;
import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
let RedisService = RedisService_1 = class RedisService {
    logger = new Logger(RedisService_1.name);
    client;
    async onModuleInit() {
        this.client = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
            maxRetriesPerRequest: 3,
            enableReadyCheck: true,
            lazyConnect: false,
        });
        this.client.on('error', (err) => {
            this.logger.error('Redis error', err.message);
        });
        this.client.on('ready', () => {
            this.logger.log('Redis connected');
        });
    }
    async onModuleDestroy() {
        await this.client.quit();
    }
    getClient() {
        return this.client;
    }
    /** Idempotency: set a key only if it doesn't exist, with TTL */
    async setNX(key, value, ttlSeconds) {
        const result = await this.client.set(key, value, 'EX', ttlSeconds, 'NX');
        return result === 'OK';
    }
    async get(key) {
        return this.client.get(key);
    }
    async del(key) {
        await this.client.del(key);
    }
    async incr(key) {
        return this.client.incr(key);
    }
    async expire(key, ttlSeconds) {
        await this.client.expire(key, ttlSeconds);
    }
};
RedisService = RedisService_1 = __decorate([
    Injectable()
], RedisService);
export { RedisService };
