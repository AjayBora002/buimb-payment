import { PrismaService } from '../../common/database/prisma.service.js';
import { Environment, type Order } from '@prisma/client';
import type { CreateOrderInput } from '@buimbpay/validation';
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrder(merchantId: string, data: CreateOrderInput, environment?: Environment): Promise<Order>;
    findOrder(merchantId: string, id: string): Promise<Order>;
    findOrders(merchantId: string, query?: {
        cursor?: string;
        limit?: number;
        environment?: Environment;
    }): Promise<{
        items: Order[];
        nextCursor: string | null;
    }>;
}
//# sourceMappingURL=orders.service.d.ts.map