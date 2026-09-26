import { LedgerService } from './ledger.service.js';
export declare class LedgerController {
    private readonly ledgerService;
    constructor(ledgerService: LedgerService);
    listAccounts(req: any): Promise<any>;
    listTransactions(paymentIntentId?: string, cursor?: string, limit?: number): Promise<{
        items: any;
        nextCursor: any;
    }>;
}
//# sourceMappingURL=ledger.controller.d.ts.map