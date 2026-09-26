import { IamService } from './iam.service.js';
export declare class IamController {
    private readonly iamService;
    constructor(iamService: IamService);
    register(body: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone?: string;
        organisationName?: string;
    }): Promise<any>;
    login(body: {
        email: string;
        password: string;
    }, req: any): Promise<{
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
    refresh(body: {
        refreshToken: string;
    }): Promise<{
        accessToken: string;
    }>;
    getProfile(req: any): Promise<any>;
}
//# sourceMappingURL=iam.controller.d.ts.map