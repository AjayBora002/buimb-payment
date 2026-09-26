import { WebhooksService } from './webhooks.service.js';
export declare class WebhooksController {
    private readonly webhooksService;
    constructor(webhooksService: WebhooksService);
    createEndpoint(req: any, body: any): Promise<any>;
    listEndpoints(req: any): Promise<any>;
    deleteEndpoint(req: any, id: string): Promise<any>;
    listDeliveries(req: any, endpointId?: string, cursor?: string, limit?: number): Promise<{
        items: any;
        nextCursor: any;
    }>;
}
//# sourceMappingURL=webhooks.controller.d.ts.map