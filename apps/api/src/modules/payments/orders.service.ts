import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import { Environment, type Order } from '@prisma/client';
import type { CreateOrderInput } from '@buimbpay/validation';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(
    merchantId: string,
    data: CreateOrderInput,
    environment: Environment = Environment.SANDBOX,
  ): Promise<Order> {
    return this.prisma.order.create({
      data: {
        merchantId,
        amount: BigInt(data.amount),
        currency: data.currency.toUpperCase(),
        description: data.description,
        externalOrderId: data.externalOrderId,
        receiptEmail: data.receiptEmail,
        customerId: data.customerId,
        metadata: data.metadata as any,
        notes: data.notes as any,
        environment,
      },
    });
  }

  async findOrder(merchantId: string, id: string): Promise<Order> {
    const order = await this.prisma.order.findFirst({
      where: { id, merchantId },
      include: {
        paymentIntents: {
          select: {
            id: true,
            status: true,
            amount: true,
            currency: true,
            createdAt: true,
          },
        },
        customer: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    return order;
  }

  async findOrders(
    merchantId: string,
    query: {
      cursor?: string;
      limit?: number;
      environment?: Environment;
    } = {},
  ): Promise<{ items: Order[]; nextCursor: string | null }> {
    const limit = Math.min(query.limit ?? 20, 100);
    const where: any = { merchantId };
    if (query.environment) {
      where.environment = query.environment;
    }

    const items = await this.prisma.order.findMany({
      where,
      take: limit + 1,
      ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
      orderBy: { createdAt: 'desc' },
      include: {
        paymentIntents: {
          select: {
            id: true,
            status: true,
            amount: true,
            createdAt: true,
          },
        },
      },
    });

    const hasMore = items.length > limit;
    const result = hasMore ? items.slice(0, limit) : items;
    const nextCursor = hasMore ? result[result.length - 1].id : null;

    return { items: result, nextCursor };
  }
}
