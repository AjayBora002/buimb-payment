import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';

@Injectable()
export class RouteService {
  constructor(private readonly prisma: PrismaService) {}

  async createLinkedAccount(merchantId: string, data: {
    name: string;
    email: string;
    phone?: string;
    businessType?: string;
    accountNumber?: string;
    ifsc?: string;
    vpa?: string;
    splitSharePct?: number;
  }) {
    return this.prisma.linkedAccount.create({
      data: {
        merchantId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        businessType: data.businessType || 'INDIVIDUAL',
        accountNumber: data.accountNumber,
        ifsc: data.ifsc,
        vpa: data.vpa,
        splitSharePct: data.splitSharePct ? Number(data.splitSharePct) : 90.0,
        status: 'ACTIVE',
      },
    });
  }

  async listLinkedAccounts(merchantId: string) {
    return this.prisma.linkedAccount.findMany({
      where: { merchantId },
      include: {
        _count: {
          select: { transfers: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createTransfer(merchantId: string, data: {
    paymentIntentId: string;
    linkedAccountId: string;
    amountPaise: number;
    currency?: string;
    notes?: string;
  }) {
    const account = await this.prisma.linkedAccount.findFirst({
      where: { id: data.linkedAccountId, merchantId },
    });
    if (!account) {
      throw new NotFoundException('Linked account not found');
    }

    const payment = await this.prisma.paymentIntent.findFirst({
      where: { id: data.paymentIntentId, merchantId },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    const feePaise = Math.round(Number(data.amountPaise) * 0.02); // 2% platform fee
    const taxPaise = Math.round(feePaise * 0.18); // 18% GST

    return this.prisma.paymentTransfer.create({
      data: {
        paymentIntentId: data.paymentIntentId,
        linkedAccountId: data.linkedAccountId,
        amount: BigInt(data.amountPaise),
        currency: data.currency || 'INR',
        fee: BigInt(feePaise),
        tax: BigInt(taxPaise),
        notes: data.notes,
        status: 'PROCESSED',
      },
    });
  }

  async listTransfers(merchantId: string) {
    const transfers = await this.prisma.paymentTransfer.findMany({
      where: {
        linkedAccount: { merchantId },
      },
      include: {
        linkedAccount: true,
        paymentIntent: {
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
          },
        },
        reversals: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return transfers.map((t) => ({
      ...t,
      amount: t.amount.toString(),
      fee: t.fee.toString(),
      tax: t.tax.toString(),
      paymentIntent: t.paymentIntent ? {
        ...t.paymentIntent,
        amount: t.paymentIntent.amount.toString(),
      } : null,
    }));
  }

  async reverseTransfer(merchantId: string, transferId: string, data: { amountPaise: number; reason?: string }) {
    const transfer = await this.prisma.paymentTransfer.findFirst({
      where: {
        id: transferId,
        linkedAccount: { merchantId },
      },
    });
    if (!transfer) {
      throw new NotFoundException('Transfer not found');
    }

    if (BigInt(data.amountPaise) > transfer.amount) {
      throw new BadRequestException('Reversal amount exceeds original transfer amount');
    }

    const reversal = await this.prisma.transferReversal.create({
      data: {
        transferId,
        amount: BigInt(data.amountPaise),
        currency: transfer.currency,
        reason: data.reason || 'Merchant initiated reversal',
      },
    });

    await this.prisma.paymentTransfer.update({
      where: { id: transferId },
      data: { status: 'REVERSED' },
    });

    return {
      ...reversal,
      amount: reversal.amount.toString(),
    };
  }
}

