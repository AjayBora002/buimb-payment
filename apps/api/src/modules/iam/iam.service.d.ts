import { PrismaService } from '../../common/database/prisma.service.js';
export declare class IamService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    register(data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone?: string;
        organisationName?: string;
    }): Promise<any>;
    login(email: string, passwordPlain: string, meta?: {
        ipAddress?: string;
        userAgent?: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            merchantId: any;
            role: any;
        };
    }>;
    refreshToken(token: string): Promise<{
        accessToken: string;
    }>;
    logout(sessionId: string): Promise<{
        success: boolean;
    }>;
    getProfile(userId: string): Promise<any>;
}
//# sourceMappingURL=iam.service.d.ts.map