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
import { Injectable, NotFoundException, BadRequestException, } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import { PaymentLinkStatus, Environment } from '@prisma/client';
import { randomUUID, randomBytes } from 'crypto';
let PaymentLinksService = class PaymentLinksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPaymentLink(merchantId, userId, data, environment = Environment.SANDBOX) {
        const key = data.idempotencyKey || `plink_idem_${randomUUID().replace(/-/g, '')}`;
        const existing = await this.prisma.paymentLink.findUnique({
            where: { idempotencyKey: key },
        });
        if (existing) {
            return existing;
        }
        const slug = `pl_${randomBytes(6).toString('hex')}`;
        const expiresAt = data.expiresInHours
            ? new Date(Date.now() + data.expiresInHours * 3600 * 1000)
            : new Date(Date.now() + 7 * 24 * 3600 * 1000); // 7 days default
        return this.prisma.paymentLink.create({
            data: {
                merchantId,
                idempotencyKey: key,
                slug,
                amount: BigInt(data.amount),
                currency: (data.currency || 'INR').toUpperCase(),
                description: data.description,
                customerName: data.customerName,
                customerEmail: data.customerEmail,
                customerPhone: data.customerPhone,
                expiresAt,
                customReference: data.customReference,
                createdBy: userId,
                environment,
            },
        });
    }
    async getPaymentLinkBySlug(slug) {
        const link = await this.prisma.paymentLink.findUnique({
            where: { slug },
            include: {
                merchant: {
                    select: {
                        id: true,
                        displayName: true,
                        legalName: true,
                    },
                },
            },
        });
        if (!link) {
            throw new NotFoundException(`Payment link not found`);
        }
        if (link.expiresAt && link.expiresAt < new Date()) {
            await this.prisma.paymentLink.update({
                where: { id: link.id },
                data: { status: PaymentLinkStatus.EXPIRED, expiredAt: new Date() },
            });
            throw new BadRequestException('This payment link has expired');
        }
        return link;
    }
    async findPaymentLink(merchantId, id) {
        const link = await this.prisma.paymentLink.findFirst({
            where: { id, merchantId },
        });
        if (!link) {
            throw new NotFoundException(`Payment link ${id} not found`);
        }
        return link;
    }
    async listPaymentLinks(merchantId, query = {}) {
        const limit = Math.min(query.limit ?? 20, 100);
        const where = { merchantId };
        if (query.status)
            where.status = query.status;
        const items = await this.prisma.paymentLink.findMany({
            where,
            take: limit + 1,
            ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
            orderBy: { createdAt: 'desc' },
        });
        const hasMore = items.length > limit;
        const result = hasMore ? items.slice(0, limit) : items;
        const nextCursor = hasMore ? result[result.length - 1].id : null;
        return { items: result, nextCursor };
    }
    async deactivatePaymentLink(merchantId, id) {
        const link = await this.prisma.paymentLink.findFirst({
            where: { id, merchantId },
        });
        if (!link) {
            throw new NotFoundException(`Payment link ${id} not found`);
        }
        return this.prisma.paymentLink.update({
            where: { id },
            data: {
                status: PaymentLinkStatus.CANCELLED,
                cancelledAt: new Date(),
            },
        });
    }
};
PaymentLinksService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object])
], PaymentLinksService);
export { PaymentLinksService };
