import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import { SubscriptionStatus, Environment } from '@prisma/client';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPlan(
    merchantId: string,
    data: {
      name: string;
      description?: string;
      amount: number;
      currency?: string;
      intervalType: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
      intervalCount?: number;
      trialDays?: number;
    },
  ) {
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

  async listPlans(merchantId: string) {
    return this.prisma.subscriptionPlan.findMany({
      where: { merchantId, isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createSubscription(
    merchantId: string,
    data: {
      customerId: string;
      planId: string;
    },
  ) {
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
    } else if (plan.intervalType === 'YEARLY') {
      periodEnd.setFullYear(periodEnd.getFullYear() + plan.intervalCount);
    } else {
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

  async getSubscription(merchantId: string, id: string) {
    const sub = await this.prisma.subscription.findFirst({
      where: { id, merchantId },
      include: { plan: true, customer: true, invoices: true },
    });

    if (!sub) {
      throw new NotFoundException('Subscription not found');
    }

    return sub;
  }

  async listSubscriptions(
    merchantId: string,
    query: { cursor?: string; limit?: number; status?: SubscriptionStatus } = {},
  ) {
    const limit = Math.min(query.limit ?? 20, 100);
    const where: any = { merchantId };
    if (query.status) where.status = query.status;

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

  async cancelSubscription(merchantId: string, id: string, reason?: string) {
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
}
