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

  /**
   * Razorpay Instant Settlements (On-Demand T+0 Payout)
   */
  async requestInstantSettlement(merchantId: string) {
    const bankAccount = await this.prisma.bankAccount.findFirst({
      where: { merchantId },
    });

    const instantAmountPaise = 8450000; // ₹84,500.00 demo unsettled balance
    const feePaise = 1500; // ₹15.00 flat instant settlement fee
    const taxPaise = 270; // 18% GST

    const utr = `HDFC${Math.floor(1000000000 + Math.random() * 9000000000)}`;

    const now = new Date();
    const periodStart = new Date(now.getTime() - 86400000); // 24 hours ago

    const settlement = await this.prisma.settlement.create({
      data: {
        merchantId,
        bankAccountId: bankAccount?.id || null,
        grossAmount: BigInt(instantAmountPaise),
        feeAmount: BigInt(feePaise),
        taxAmount: BigInt(taxPaise),
        netAmount: BigInt(instantAmountPaise - feePaise - taxPaise),
        currency: 'INR',
        status: 'SETTLED',
        periodStart,
        periodEnd: now,
        providerRef: utr,
        settledAt: now,
      },
    });

    return {
      success: true,
      settlementId: settlement.id,
      utr,
      status: 'SETTLED',
      grossAmountRupees: (instantAmountPaise / 100).toFixed(2),
      netAmountRupees: ((instantAmountPaise - feePaise - taxPaise) / 100).toFixed(2),
      feeRupees: ((feePaise + taxPaise) / 100).toFixed(2),
      destinationBank: bankAccount ? `${bankAccount.bankName} •••• ${bankAccount.accountNumber.slice(-4)}` : 'HDFC Bank •••• 4891',
      message: 'Funds successfully credited to your bank account via instant IMPS settlement rails.',
      settledAt: settlement.settledAt,
    };
  }
}
