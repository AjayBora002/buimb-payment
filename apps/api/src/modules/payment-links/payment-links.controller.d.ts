import { PaymentLinksService } from './payment-links.service.js';
export declare class PaymentLinksController {
    private readonly paymentLinksService;
    constructor(paymentLinksService: PaymentLinksService);
    getBySlug(slug: string): Promise<PaymentLink>;
    create(req: any, body: {
        amount: number;
        currency?: string;
        description?: string;
        customerName?: string;
        customerEmail?: string;
        customerPhone?: string;
        expiresInHours?: number;
        customReference?: string;
        idempotencyKey?: string;
    }): Promise<PaymentLink>;
    findOne(req: any, id: string): Promise<PaymentLink>;
    findAll(req: any, cursor?: string, limit?: number): Promise<{
        items: PaymentLink[];
        nextCursor: string | null;
    }>;
    deactivate(req: any, id: string): Promise<PaymentLink>;
}
//# sourceMappingURL=payment-links.controller.d.ts.map