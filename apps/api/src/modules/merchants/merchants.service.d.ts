import { PrismaService } from '../../common/database/prisma.service.js';
import { Environment } from '@prisma/client';
export declare class MerchantsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getMerchant(merchantId: string): Promise<any>;
    updateMerchant(merchantId: string, data: {
        displayName?: string;
        supportEmail?: string;
        supportPhone?: string;
        website?: string;
        businessModel?: string;
    }): Promise<any>;
    submitKyc(merchantId: string, data: {
        pan?: string;
        gstin?: string;
        cin?: string;
        businessType?: any;
    }): Promise<any>;
    getBankAccounts(merchantId: string): Promise<any>;
    addBankAccount(merchantId: string, data: {
        accountHolderName: string;
        accountNumber: string;
        ifsc: string;
        bankName: string;
        accountType: 'CURRENT' | 'SAVINGS';
    }): Promise<any>;
    listApiKeys(merchantId: string): Promise<any>;
    createApiKey(merchantId: string, userId: string, data: {
        name: string;
        environment: Environment;
        scopes?: string[];
    }): Promise<{
        id: any;
        name: any;
        keyPrefix: any;
        environment: any;
        secretKey: string;
        createdAt: any;
    }>;
    revokeApiKey(merchantId: string, keyId: string, userId: string): Promise<any>;
}
//# sourceMappingURL=merchants.service.d.ts.map