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
import { Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import { SubscriptionStatus, Environment } from '@prisma/client';
let SubscriptionsService = class SubscriptionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPlan(merchantId, data) {
        return this.prisma.subscriptionPlan.create({
            data: {
                merchantId,
                name: data.name,
                description: data.description,
                amount: BigInt(data.amount),
                currency: (data.currency || 'INR').toUpperCase(),
                intervalType: data.intervalType,
                intervalCount: data.intervalCount ?? 1,
                trialDays: data.trialDays ?? 0,
            },
        });
    }
    async listPlans(merchantId) {
        return this.prisma.subscriptionPlan.findMany({
            where: { merchantId, isActive: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createSubscription(merchantId, data) {
        const plan = await this.prisma.subscriptionPlan.findFirst({
            where: { id: data.planId, merchantId },
        });
        if (!plan) {
            throw new NotFoundException('Subscription plan not found');
        }
        const now = new Date();
        const periodEnd = new Date(now);
        if (plan.intervalType === 'MONTHLY') {
            periodEnd.setMonth(periodEnd.getMonth() + plan.intervalCount);
        }
        else if (plan.intervalType === 'YEARLY') {
            periodEnd.setFullYear(periodEnd.getFullYear() + plan.intervalCount);
        }
        else {
            periodEnd.setDate(periodEnd.getDate() + 30);
        }
        return this.prisma.subscription.create({
            data: {
                merchantId,
                customerId: data.customerId,
                planId: data.planId,
                status: SubscriptionStatus.ACTIVE,
                currentPeriodStart: now,
                currentPeriodEnd: periodEnd,
                environment: Environment.SANDBOX,
            },
            include: { plan: true, customer: true },
        });
    }
    async getSubscription(merchantId, id) {
        const sub = await this.prisma.subscription.findFirst({
            where: { id, merchantId },
            include: { plan: true, customer: true, invoices: true },
        });
        if (!sub) {
            throw new NotFoundException('Subscription not found');
        }
        return sub;
    }
    async listSubscriptions(merchantId, query = {}) {
        const limit = Math.min(query.limit ?? 20, 100);
        const where = { merchantId };
        if (query.status)
            where.status = query.status;
        const items = await this.prisma.subscription.findMany({
            where,
            take: limit + 1,
            ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
            orderBy: { createdAt: 'desc' },
            include: { plan: true, customer: true },
        });
        const hasMore = items.length > limit;
        const result = hasMore ? items.slice(0, limit) : items;
        const nextCursor = hasMore ? result[result.length - 1].id : null;
        return { items: result, nextCursor };
    }
    async cancelSubscription(merchantId, id, reason) {
        const sub = await this.prisma.subscription.findFirst({
            where: { id, merchantId },
        });
        if (!sub) {
            throw new NotFoundException('Subscription not found');
        }
        return this.prisma.subscription.update({
            where: { id },
            data: {
                status: SubscriptionStatus.CANCELLED,
                cancelledAt: new Date(),
                cancelReason: reason,
            },
        });
    }
};
SubscriptionsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object])
], SubscriptionsService);
export { SubscriptionsService };
