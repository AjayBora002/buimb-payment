import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import { MockProvider, canRefund } from '@buimbpay/payments';
import { RefundStatus, PaymentIntentStatus, type Refund } from '@prisma/client';
import { LedgerService } from '../ledger/ledger.service.js';
import { randomUUID } from 'crypto';

@Injectable()
export class RefundsService {
  private readonly mockProvider = new MockProvider();

  constructor(
    private readonly prisma: PrismaService,
    private readonly ledgerService: LedgerService,
  ) {}

  async createRefund(
    merchantId: string,
    userId: string,
    data: {
      paymentIntentId: string;
      amount?: number;
      reason?: string;
      notes?: string;
      idempotencyKey?: string;
    },
  ): Promise<Refund> {
    const key = data.idempotencyKey || `ref_idem_${randomUUID().replace(/-/g, '')}`;

    const pi = await this.prisma.paymentIntent.findFirst({
      where: { id: data.paymentIntentId, merchantId },
      include: { refunds: true },
    });

    if (!pi) {
      throw new NotFoundException(`Payment intent ${data.paymentIntentId} not found`);
    }

    if (!canRefund(pi.status as any)) {
      throw new BadRequestException(
        `Cannot refund payment intent in status ${pi.status}`,
      );
    }

    const totalRefunded = pi.refunds
      .filter((r) => r.status === RefundStatus.SUCCEEDED)
      .reduce((sum, r) => sum + r.amount, 0n);

    const refundAmount = data.amount ? BigInt(data.amount) : pi.amount - totalRefunded;

    if (refundAmount <= 0n) {
      throw new BadRequestException('Refund amount must be positive');
    }

    if (totalRefunded + refundAmount > pi.amount) {
      throw new BadRequestException(
        `Refund amount exceeds remaining captured amount (${pi.amount - totalRefunded})`,
      );
    }

    // Call provider (MockProvider in sandbox) — providerRef is the field name in MockRefundRequest
    const providerResult = await this.mockProvider.refundPayment({
      providerRef: pi.providerRef || 'sim_pay_demo',
      amount: Number(refundAmount),
      currency: pi.currency,
    });

    const refundStatus =
      providerResult.status === 'succeeded' ? RefundStatus.SUCCEEDED : RefundStatus.FAILED;

    // Use transaction with unique constraint error handling for idempotency
    try {
      return await this.prisma.$transaction(async (tx) => {
        const refund = await tx.refund.create({
          data: {
            paymentIntentId: pi.id,
            merchantId,
            idempotencyKey: key,
            amount: refundAmount,
            currency: pi.currency,
            status: refundStatus,
            reason: data.reason,
            notes: data.notes,
            providerRef: providerResult.providerRefundRef,
            initiatedBy: userId,
            processedAt: new Date(),
          },
        });

        const newTotalRefunded =
          totalRefunded + (refund.status === RefundStatus.SUCCEEDED ? refundAmount : 0n);
        const isFullyRefunded = newTotalRefunded >= pi.amount;

        await tx.paymentIntent.update({
          where: { id: pi.id },
          data: {
            status: isFullyRefunded
              ? PaymentIntentStatus.REFUNDED
              : PaymentIntentStatus.PARTIALLY_REFUNDED,
            version: { increment: 1 },
          },
        });

        if (refund.status === RefundStatus.SUCCEEDED) {
          const [cashAccount, escrowAccount] = await Promise.all([
            this.ledgerService.getOrCreateAccount(
              'PLATFORM_CASH',
              { name: 'Platform Cash', type: 'ASSET' },
              tx,
            ),
            this.ledgerService.getOrCreateAccount(
              'PLATFORM_ESCROW',
              { name: 'Merchant Escrow Payable', type: 'LIABILITY' },
              tx,
            ),
          ]);

          await this.ledgerService.recordTransaction(
            {
              type: 'REFUND',
              description: `Refund ${refund.id} for payment intent ${pi.id}`,
              paymentIntentId: pi.id,
              referenceId: refund.id,
              entries: [
                {
                  debitAccountId: escrowAccount.id,
                  creditAccountId: cashAccount.id,
                  amount: refundAmount,
                  currency: pi.currency,
                  description: `Refund debited from escrow: ${refund.id}`,
                },
              ],
            },
            tx,
          );
        }

        return refund;
      });
    } catch (err: any) {
      // If it's a unique constraint violation (idempotency key conflict), return existing refund
      if (err?.code === 'P2002' && err?.meta?.target?.includes('idempotencyKey')) {
        const existing = await this.prisma.refund.findUnique({
          where: { idempotencyKey: key },
        });
        if (existing) {
          return existing;
        }
      }
      throw err;
    }
  }

  async findRefund(merchantId: string, id: string): Promise<Refund> {
    const refund = await this.prisma.refund.findFirst({
      where: { id, merchantId },
      include: { paymentIntent: true },
    });

    if (!refund) {
      throw new NotFoundException(`Refund ${id} not found`);
    }

    return refund;
  }

  async listRefunds(
    merchantId: string,
    query: { cursor?: string; limit?: number } = {},
  ): Promise<{ items: Refund[]; nextCursor: string | null }> {
    const limit = Math.min(query.limit ?? 20, 100);

    const items = await this.prisma.refund.findMany({
      where: { merchantId },
      take: limit + 1,
      ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
      orderBy: { createdAt: 'desc' },
      include: {
        paymentIntent: {
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
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
