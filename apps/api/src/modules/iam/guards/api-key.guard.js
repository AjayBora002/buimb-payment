var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { PrismaService } from '../../../common/database/prisma.service.js';
import { createHash } from 'crypto';
let ApiKeyGuard = class ApiKeyGuard {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const apiKeyHeader = request.headers['x-api-key'] || request.headers['authorization'];
        if (!apiKeyHeader) {
            throw new UnauthorizedException('API key is missing');
        }
        const key = typeof apiKeyHeader === 'string' && apiKeyHeader.startsWith('Bearer ')
            ? apiKeyHeader.substring(7)
            : apiKeyHeader;
        if (typeof key !== 'string' || !key.startsWith('bp_live_') && !key.startsWith('bp_test_')) {
            throw new UnauthorizedException('Invalid API key format');
        }
        const keyHash = createHash('sha256').update(key).digest('hex');
        const apiKey = await this.prisma.apiKey.findUnique({
            where: { keyHash },
            include: { merchant: true },
        });
        if (!apiKey || apiKey.revokedAt || (apiKey.expiresAt && apiKey.expiresAt < new Date())) {
            throw new UnauthorizedException('API key is invalid, revoked, or expired');
        }
        // Update lastUsedAt asynchronously
        this.prisma.apiKey.update({
            where: { id: apiKey.id },
            data: { lastUsedAt: new Date() },
        }).catch(() => { });
        request.merchantId = apiKey.merchantId;
        request.apiKey = apiKey;
        request.environment = apiKey.environment;
        return true;
    }
};
ApiKeyGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object])
], ApiKeyGuard);
export { ApiKeyGuard };
