import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import { Environment } from '@prisma/client';
import { randomBytes } from 'crypto';
import { encryptSecret } from '@buimbpay/auth';

/**
 * SSRF Protection: Validates webhook URLs to prevent requests to internal/private networks.
 * Checks for:
 * - Localhost/loopback addresses (127.x, ::1)
 * - Private IP ranges (10.x, 172.16-31.x, 192.168.x)
 * - Link-local addresses (169.254.x, fe80::)
 * - Cloud metadata services (169.254.169.254, metadata.google.internal)
 */
function validateWebhookUrl(urlString: string): void {
  let url: URL;
  try {
    url = new URL(urlString);
  } catch {
    throw new BadRequestException('Invalid webhook URL format');
  }

  // Only allow HTTP and HTTPS
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new BadRequestException('Webhook URL must use HTTP or HTTPS');
  }

  const hostname = url.hostname.toLowerCase();

  // Block specific metadata services
  if (hostname === '169.254.169.254' || hostname === 'metadata.google.internal' || hostname === 'metadata') {
    throw new BadRequestException('Webhook URL cannot point to cloud metadata services');
  }

  // Block localhost and loopback
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
    throw new BadRequestException('Webhook URL cannot point to localhost');
  }

  // Check for IPv4 addresses (use regex to match dotted decimal)
  const ipv4Pattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const ipv4Match = hostname.match(ipv4Pattern);

  if (ipv4Match) {
    const [, oct1, oct2, oct3, oct4] = ipv4Match.map(Number);

    // Check if this is a private or reserved range
    if (
      oct1 === 0 ||                                    // 0.0.0.0/8
      oct1 === 10 ||                                  // 10.0.0.0/8
      (oct1 === 172 && oct2 >= 16 && oct2 <= 31) ||  // 172.16.0.0/12
      (oct1 === 127) ||                               // 127.0.0.0/8 (loopback)
      (oct1 === 169 && oct2 === 254) ||              // 169.254.0.0/16 (link-local)
      (oct1 === 192 && oct2 === 168) ||              // 192.168.0.0/16
      (oct1 >= 224) ||                                // 224.0.0.0/4+ (multicast + reserved)
      (oct1 === 255)                                  // 255.255.255.255
    ) {
      throw new BadRequestException('Webhook URL cannot point to private/internal IP addresses');
    }
  }

  // Check for IPv6 addresses (starts with : for compressed format or contains multiple :)
  if (hostname.includes(':')) {
    const blockedIPv6Prefixes = ['::1', 'fe80:', 'fc00:', 'fd00:', '::'];
    if (blockedIPv6Prefixes.some(p => hostname.startsWith(p))) {
      throw new BadRequestException('Webhook URL cannot point to IPv6 local or link-local addresses');
    }
  }
}

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
    // SSRF Protection: Validate URL at creation time
    validateWebhookUrl(data.url);

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
