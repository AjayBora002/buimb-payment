import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async recordEvent(data: {
    actorId?: string;
    actorType: 'USER' | 'SYSTEM' | 'OPERATOR' | 'API_KEY';
    merchantId?: string;
    resource: string;
    resourceId?: string;
    action: string;
    outcome: 'SUCCESS' | 'FAILURE' | 'DENIED';
    ipAddress?: string;
    userAgent?: string;
    metadata?: Record<string, unknown>;
  }) {
    // Append-only write
    return this.prisma.auditEvent.create({
      data: {
        actorId: data.actorId,
        actorType: data.actorType,
        merchantId: data.merchantId,
        resource: data.resource,
        resourceId: data.resourceId,
        action: data.action,
        outcome: data.outcome,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        metadata: data.metadata as any,
      },
    });
  }

  async listEvents(
    merchantId: string,
    query: {
      resource?: string;
      cursor?: string;
      limit?: number;
    } = {},
  ) {
    const limit = Math.min(query.limit ?? 20, 100);
    const where: any = { merchantId };
    if (query.resource) where.resource = query.resource;

    const items = await this.prisma.auditEvent.findMany({
      where,
      take: limit + 1,
      ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
      orderBy: { createdAt: 'desc' },
      include: {
        actor: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
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
