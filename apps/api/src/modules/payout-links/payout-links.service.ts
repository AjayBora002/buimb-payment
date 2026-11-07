import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';

@Injectable()
export class PayoutLinksService {
  constructor(private readonly prisma: PrismaService) {}

  async createPayoutLink(merchantId: string, data: {
    amountPaise: number;
    currency?: string;
    purpose?: string;
    recipientName?: string;
    recipientPhone?: string;
    recipientEmail?: string;
    expiresInDays?: number;
  }) {
    if (!data.amountPaise || data.amountPaise <= 0) {
      throw new BadRequestException('Amount must be greater than zero');
    }

    const shortId = `plink_${Math.random().toString(36).substring(2, 9)}`;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (data.expiresInDays || 7));

    const link = await this.prisma.payoutLink.create({
      data: {
        merchantId,
        amount: BigInt(data.amountPaise),
        currency: data.currency || 'INR',
        purpose: data.purpose || 'VENDOR_PAYMENT',
        recipientName: data.recipientName,
        recipientPhone: data.recipientPhone,
        recipientEmail: data.recipientEmail,
        shortUrl: shortId,
        status: 'ISSUED',
        expiresAt,
      },
    });

    return {
      ...link,
      amount: link.amount.toString(),
      claimUrl: `http://localhost:3000/payouts/${shortId}`,
    };
  }

  async listPayoutLinks(merchantId: string) {
    const links = await this.prisma.payoutLink.findMany({
      where: { merchantId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return links.map((l) => ({
      ...l,
      amount: l.amount.toString(),
      claimUrl: `http://localhost:3000/payouts/${l.shortUrl}`,
    }));
  }

  async getPublicPayoutLink(shortUrl: string) {
    const link = await this.prisma.payoutLink.findUnique({
      where: { shortUrl },
      include: {
        merchant: {
          select: { displayName: true },
        },
      },
    });

    if (!link) {
      throw new NotFoundException('Payout link not found');
    }

    return {
      id: link.id,
      shortUrl: link.shortUrl,
      amountPaise: link.amount.toString(),
      amountRupees: (Number(link.amount) / 100).toFixed(2),
      currency: link.currency,
      purpose: link.purpose,
      recipientName: link.recipientName,
      status: link.status,
      expiresAt: link.expiresAt,
      merchantName: link.merchant.displayName,
      claimedAt: link.claimedAt,
      claimedVpa: link.claimedVpa,
      utr: link.utr,
    };
  }

  async claimPayoutLink(shortUrl: string, data: {
    method: 'UPI' | 'BANK_ACCOUNT';
    vpa?: string;
    accountNumber?: string;
    ifsc?: string;
    beneficiaryName?: string;
  }) {
    const link = await this.prisma.payoutLink.findUnique({
      where: { shortUrl },
    });

    if (!link) {
      throw new NotFoundException('Payout link not found');
    }

    if (link.status === 'CLAIMED') {
      throw new BadRequestException('This payout link has already been claimed');
    }

    if (new Date() > link.expiresAt) {
      await this.prisma.payoutLink.update({
        where: { id: link.id },
        data: { status: 'EXPIRED' },
      });
      throw new BadRequestException('This payout link has expired');
    }

    const utr = `4312${Math.floor(10000000 + Math.random() * 90000000)}`;

    const updated = await this.prisma.payoutLink.update({
      where: { id: link.id },
      data: {
        status: 'CLAIMED',
        claimedMethod: data.method,
        claimedVpa: data.vpa,
        claimedAccount: data.accountNumber,
        claimedIfsc: data.ifsc,
        claimedAt: new Date(),
        utr,
      },
    });

    return {
      success: true,
      status: 'CLAIMED',
      payoutId: `pout_${Math.random().toString(36).substring(2, 10)}`,
      utr,
      amountPaid: (Number(updated.amount) / 100).toFixed(2),
      destination: data.method === 'UPI' ? data.vpa : `A/c •••• ${data.accountNumber?.slice(-4)} (${data.ifsc})`,
      message: 'Instant payout dispatched to destination account.',
    };
  }
}

