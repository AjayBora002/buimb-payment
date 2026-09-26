import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import { PaymentLinkStatus, Environment, type PaymentLink } from '@prisma/client';
import { randomUUID, randomBytes } from 'crypto';

@Injectable()
export class PaymentLinksService {
  constructor(private readonly prisma: PrismaService) {}

  async createPaymentLink(
    merchantId: string,
    userId: string,
    data: {
      amount: number;
      currency?: string;
      description?: string;
      customerName?: string;
      customerEmail?: string;
      customerPhone?: string;
      expiresInHours?: number;
      customReference?: string;
      idempotencyKey?: string;
    },
    environment: Environment = Environment.SANDBOX,
  ): Promise<PaymentLink> {
    const key = data.idempotencyKey || `plink_idem_${randomUUID().replace(/-/g, '')}`;

    const existing = await this.prisma.paymentLink.findUnique({
      where: { idempotencyKey: key },
    });
    if (existing) {
      return existing;
    }

    const slug = `pl_${randomBytes(6).toString('hex')}`;
    const expiresAt = data.expiresInHours
      ? new Date(Date.now() + data.expiresInHours * 3600 * 1000)
      : new Date(Date.now() + 7 * 24 * 3600 * 1000); // 7 days default

    return this.prisma.paymentLink.create({
      data: {
        merchantId,
        idempotencyKey: key,
        slug,
        amount: BigInt(data.amount),
        currency: (data.currency || 'INR').toUpperCase(),
        description: data.description,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        expiresAt,
        customReference: data.customReference,
        createdBy: userId,
        environment,
      },
    });
  }

  async getPaymentLinkBySlug(slug: string): Promise<PaymentLink> {
    const link = await this.prisma.paymentLink.findUnique({
      where: { slug },
      include: {
        merchant: {
          select: {
            id: true,
            displayName: true,
            legalName: true,
          },
        },
      },
    });

    if (!link) {
      throw new NotFoundException(`Payment link not found`);
    }

    if (link.expiresAt && link.expiresAt < new Date()) {
      await this.prisma.paymentLink.update({
        where: { id: link.id },
        data: { status: PaymentLinkStatus.EXPIRED, expiredAt: new Date() },
      });
      throw new BadRequestException('This payment link has expired');
    }

    return link;
  }

  async findPaymentLink(merchantId: string, id: string): Promise<PaymentLink> {
    const link = await this.prisma.paymentLink.findFirst({
      where: { id, merchantId },
    });

    if (!link) {
      throw new NotFoundException(`Payment link ${id} not found`);
    }

    return link;
  }

  async listPaymentLinks(
    merchantId: string,
    query: { cursor?: string; limit?: number; status?: PaymentLinkStatus } = {},
  ): Promise<{ items: PaymentLink[]; nextCursor: string | null }> {
    const limit = Math.min(query.limit ?? 20, 100);
    const where: any = { merchantId };
    if (query.status) where.status = query.status;

    const items = await this.prisma.paymentLink.findMany({
      where,
      take: limit + 1,
      ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
      orderBy: { createdAt: 'desc' },
    });

    const hasMore = items.length > limit;
    const result = hasMore ? items.slice(0, limit) : items;
    const nextCursor = hasMore ? result[result.length - 1].id : null;

    return { items: result, nextCursor };
  }

  async deactivatePaymentLink(merchantId: string, id: string): Promise<PaymentLink> {
    const link = await this.prisma.paymentLink.findFirst({
      where: { id, merchantId },
    });

    if (!link) {
      throw new NotFoundException(`Payment link ${id} not found`);
    }

    return this.prisma.paymentLink.update({
      where: { id },
      data: {
        status: PaymentLinkStatus.CANCELLED,
        cancelledAt: new Date(),
      },
    });
  }
}
