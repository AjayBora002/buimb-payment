import { PrismaService } from '../../common/database/prisma.service.js';
import { SubscriptionStatus } from '@prisma/client';
export declare class SubscriptionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createPlan(merchantId: string, data: {
        name: string;
        description?: string;
        amount: number;
        currency?: string;
        intervalType: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
        intervalCount?: number;
        trialDays?: number;
    }): Promise<any>;
    listPlans(merchantId: string): Promise<any>;
    createSubscription(merchantId: string, data: {
        customerId: string;
        planId: string;
    }): Promise<any>;
    getSubscription(merchantId: string, id: string): Promise<any>;
    listSubscriptions(merchantId: string, query?: {
        cursor?: string;
        limit?: number;
        status?: SubscriptionStatus;
    }): Promise<{
        items: any;
        nextCursor: any;
    }>;
    cancelSubscription(merchantId: string, id: string, reason?: string): Promise<any>;
}
//# sourceMappingURL=subscriptions.service.d.ts.map