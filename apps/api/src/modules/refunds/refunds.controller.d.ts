import { RefundsService } from './refunds.service.js';
export declare class RefundsController {
    private readonly refundsService;
    constructor(refundsService: RefundsService);
    create(req: any, body: {
        paymentIntentId: string;
        amount?: number;
        reason?: string;
        notes?: string;
        idempotencyKey?: string;
    }): Promise<Refund>;
    findOne(req: any, id: string): Promise<Refund>;
    findAll(req: any, cursor?: string, limit?: number): Promise<{
        items: Refund[];
        nextCursor: string | null;
    }>;
}
//# sourceMappingURL=refunds.controller.d.ts.map