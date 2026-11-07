var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '../../common/database/prisma.service.js';
import { RedisService } from '../../common/redis/redis.service.js';
let HealthController = class HealthController {
    prisma;
    redis;
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async check() {
        let dbStatus = 'down';
        let redisStatus = 'down';
        try {
            await this.prisma.$queryRaw `SELECT 1`;
            dbStatus = 'up';
        }
        catch {
            dbStatus = 'unreachable';
        }
        try {
            const pong = await this.redis.getClient().ping();
            if (pong === 'PONG')
                redisStatus = 'up';
        }
        catch {
            redisStatus = 'unreachable';
        }
        const isHealthy = dbStatus === 'up' && redisStatus === 'up';
        return {
            status: isHealthy ? 'healthy' : 'degraded',
            timestamp: new Date().toISOString(),
            checks: {
                database: dbStatus,
                redis: redisStatus,
                productionPayments: process.env.PAYMENT_PRODUCTION_ENABLED === 'true' ? 'enabled' : 'disabled (sandbox only)',
            },
            version: '0.1.0',
        };
    }
};
__decorate([
    Get(),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Liveness & readiness probe' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "check", null);
HealthController = __decorate([
    ApiTags('Health'),
    Controller('health'),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object, typeof (_b = typeof RedisService !== "undefined" && RedisService) === "function" ? _b : Object])
], HealthController);
export { HealthController };
