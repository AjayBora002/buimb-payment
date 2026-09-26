import { MerchantsService } from './merchants.service.js';
import { Environment } from '@prisma/client';
export declare class MerchantsController {
    private readonly merchantsService;
    constructor(merchantsService: MerchantsService);
    getCurrent(req: any): Promise<any>;
    updateCurrent(req: any, body: any): Promise<any>;
    submitKyc(req: any, body: any): Promise<any>;
    getBankAccounts(req: any): Promise<any>;
    addBankAccount(req: any, body: any): Promise<any>;
    listApiKeys(req: any): Promise<any>;
    createApiKey(req: any, body: {
        name: string;
        environment?: Environment;
        scopes?: string[];
    }): Promise<{
        id: any;
        name: any;
        keyPrefix: any;
        environment: any;
        secretKey: string;
        createdAt: any;
    }>;
    revokeApiKey(req: any, keyId: string): Promise<any>;
}
//# sourceMappingURL=merchants.controller.d.ts.map