import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import { SettlementStatus, type Settlement } from '@prisma/client';

@Injectable()
export class SettlementsService {
  constructor(private readonly prisma: PrismaService) {}

  async listSettlements(
    merchantId: string,
    query: { cursor?: string; limit?: number; status?: SettlementStatus } = {},
  ): Promise<{ items: Settlement[]; nextCursor: string | null }> {
    const limit = Math.min(query.limit ?? 20, 100);
    const where: any = { merchantId };
    if (query.status) where.status = query.status;

    const items = await this.prisma.settlement.findMany({
      where,
      take: limit + 1,
      ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
      orderBy: { createdAt: 'desc' },
      include: {
        bankAccount: {
          select: {
            accountNumber: true,
            bankName: true,
            ifscCode: true,
          },
        },
      },
    });

    const hasMore = items.length > limit;
    const result = hasMore ? items.slice(0, limit) : items;
    const nextCursor = hasMore ? result[result.length - 1].id : null;

    return { items: result, nextCursor };
  }

  async getSettlement(merchantId: string, id: string): Promise<Settlement> {
    const settlement = await this.prisma.settlement.findFirst({
      where: { id, merchantId },
      include: {
        items: true,
        bankAccount: true,
      },
    });

    if (!settlement) {
      throw new NotFoundException(`Settlement ${id} not found`);
    }

    return settlement;
  }
}
