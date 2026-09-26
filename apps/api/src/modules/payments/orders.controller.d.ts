import { OrdersService } from './orders.service.js';
import type { CreateOrderInput } from '@buimbpay/validation';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(body: CreateOrderInput): Promise<Order>;
    findOne(id: string): Promise<Order>;
    findAll(cursor?: string, limit?: number): Promise<{
        items: Order[];
        nextCursor: string | null;
    }>;
}
//# sourceMappingURL=orders.controller.d.ts.map