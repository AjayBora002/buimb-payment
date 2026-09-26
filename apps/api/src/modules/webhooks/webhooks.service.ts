import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import { Environment } from '@prisma/client';
import { randomBytes } from 'crypto';
import { encryptSecret } from '@buimbpay/auth';

@Injectable()
export class WebhooksService {
  constructor(private readonly prisma: PrismaService) {}

  async createEndpoint(
    merchantId: string,
    data: {
      url: string;
      description?: string;
      events: string[];
      environment?: Environment;
    },
  ) {
    const rawSecret = `whsec_${randomBytes(24).toString('hex')}`;
    const encryptedSecret = encryptSecret(rawSecret);
    const secretHint = rawSecret.slice(-4);

    const endpoint = await this.prisma.webhookEndpoint.create({
      data: {
        merchantId,
        url: data.url,
        description: data.description,
        secret: encryptedSecret,
        secretHint,
        events: data.events,
        environment: data.environment ?? Environment.SANDBOX,
      },
    });

    return {
      ...endpoint,
      secret: rawSecret, // Returned ONLY on creation
    };
  }

  async listEndpoints(merchantId: string) {
    return this.prisma.webhookEndpoint.findMany({
      where: { merchantId },
      select: {
        id: true,
        url: true,
        description: true,
        secretHint: true,
        events: true,
        isActive: true,
        environment: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteEndpoint(merchantId: string, id: string) {
    const endpoint = await this.prisma.webhookEndpoint.findFirst({
      where: { id, merchantId },
    });

    if (!endpoint) {
      throw new NotFoundException('Webhook endpoint not found');
    }

    return this.prisma.webhookEndpoint.delete({
      where: { id },
    });
  }

  async listDeliveries(
    merchantId: string,
    query: { endpointId?: string; cursor?: string; limit?: number } = {},
  ) {
    const limit = Math.min(query.limit ?? 20, 100);
    const where: any = {
      endpoint: { merchantId },
    };
    if (query.endpointId) {
      where.endpointId = query.endpointId;
    }

    const items = await this.prisma.webhookDelivery.findMany({
      where,
      take: limit + 1,
      ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
      orderBy: { createdAt: 'desc' },
      include: {
        webhookEvent: {
          select: { eventType: true, createdAt: true },
        },
      },
    });

    const hasMore = items.length > limit;
    const result = hasMore ? items.slice(0, limit) : items;
    const nextCursor = hasMore ? result[result.length - 1].id : null;

    return { items: result, nextCursor };
  }
}
