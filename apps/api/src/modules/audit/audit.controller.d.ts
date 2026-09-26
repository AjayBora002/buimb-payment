import { AuditService } from './audit.service.js';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    list(req: any, resource?: string, cursor?: string, limit?: number): Promise<{
        items: any;
        nextCursor: any;
    }>;
}
//# sourceMappingURL=audit.controller.d.ts.map