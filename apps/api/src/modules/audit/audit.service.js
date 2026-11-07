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
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
let AuditService = class AuditService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async recordEvent(data) {
        // Append-only write
        return this.prisma.auditEvent.create({
            data: {
                actorId: data.actorId,
                actorType: data.actorType,
                merchantId: data.merchantId,
                resource: data.resource,
                resourceId: data.resourceId,
                action: data.action,
                outcome: data.outcome,
                ipAddress: data.ipAddress,
                userAgent: data.userAgent,
                metadata: data.metadata,
            },
        });
    }
    async listEvents(merchantId, query = {}) {
        const limit = Math.min(query.limit ?? 20, 100);
        const where = { merchantId };
        if (query.resource)
            where.resource = query.resource;
        const items = await this.prisma.auditEvent.findMany({
            where,
            take: limit + 1,
            ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
            orderBy: { createdAt: 'desc' },
            include: {
                actor: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        const hasMore = items.length > limit;
        const result = hasMore ? items.slice(0, limit) : items;
        const nextCursor = hasMore ? result[result.length - 1].id : null;
        return { items: result, nextCursor };
    }
};
AuditService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object])
], AuditService);
export { AuditService };
