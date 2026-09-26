import { RiskService } from './risk.service.js';
export declare class RiskController {
    private readonly riskService;
    constructor(riskService: RiskService);
    listDecisions(req: any, cursor?: string, limit?: number): Promise<{
        items: any;
        nextCursor: any;
    }>;
    listRules(): Promise<any>;
}
//# sourceMappingURL=risk.controller.d.ts.map