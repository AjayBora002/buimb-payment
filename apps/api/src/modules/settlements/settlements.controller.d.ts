import { SettlementsService } from './settlements.service.js';
export declare class SettlementsController {
    private readonly settlementsService;
    constructor(settlementsService: SettlementsService);
    findOne(req: any, id: string): Promise<Settlement>;
    findAll(req: any, cursor?: string, limit?: number): Promise<{
        items: Settlement[];
        nextCursor: string | null;
    }>;
}
//# sourceMappingURL=settlements.controller.d.ts.map