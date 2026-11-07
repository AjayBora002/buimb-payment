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
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import { Environment } from '@prisma/client';
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(merchantId, data, environment = Environment.SANDBOX) {
        return this.prisma.order.create({
            data: {
                merchantId,
                amount: BigInt(data.amount),
                currency: data.currency.toUpperCase(),
                description: data.description,
                externalOrderId: data.externalOrderId,
                receiptEmail: data.receiptEmail,
                customerId: data.customerId,
                metadata: data.metadata,
                notes: data.notes,
                environment,
            },
        });
    }
    async findOrder(merchantId, id) {
        const order = await this.prisma.order.findFirst({
            where: { id, merchantId },
            include: {
                paymentIntents: {
                    select: {
                        id: true,
                        status: true,
                        amount: true,
                        currency: true,
                        createdAt: true,
                    },
                },
                customer: true,
            },
        });
        if (!order) {
            throw new NotFoundException(`Order ${id} not found`);
        }
        return order;
    }
    async findOrders(merchantId, query = {}) {
        const limit = Math.min(query.limit ?? 20, 100);
        const where = { merchantId };
        if (query.environment) {
            where.environment = query.environment;
        }
        const items = await this.prisma.order.findMany({
            where,
            take: limit + 1,
            ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
            orderBy: { createdAt: 'desc' },
            include: {
                paymentIntents: {
                    select: {
                        id: true,
                        status: true,
                        amount: true,
                        createdAt: true,
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
OrdersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object])
], OrdersService);
export { OrdersService };
