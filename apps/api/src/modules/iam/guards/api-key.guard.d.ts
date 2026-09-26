import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '../../../common/database/prisma.service.js';
export declare class ApiKeyGuard implements CanActivate {
    private readonly prisma;
    constructor(prisma: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
//# sourceMappingURL=api-key.guard.d.ts.map