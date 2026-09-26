import { SubscriptionsService } from './subscriptions.service.js';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    createPlan(req: any, body: any): Promise<any>;
    listPlans(req: any): Promise<any>;
    createSubscription(req: any, body: any): Promise<any>;
    findOne(req: any, id: string): Promise<any>;
    findAll(req: any, cursor?: string, limit?: number): Promise<{
        items: any;
        nextCursor: any;
    }>;
    cancel(req: any, id: string, body: {
        reason?: string;
    }): Promise<any>;
}
//# sourceMappingURL=subscriptions.controller.d.ts.map