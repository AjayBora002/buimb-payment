import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../common/database/prisma.service.js';
import { createHash } from 'crypto';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKeyHeader = request.headers['x-api-key'] || request.headers['authorization'];

    if (!apiKeyHeader) {
      throw new UnauthorizedException('API key is missing');
    }

    const key = typeof apiKeyHeader === 'string' && apiKeyHeader.startsWith('Bearer ')
      ? apiKeyHeader.substring(7)
      : apiKeyHeader;

    if (typeof key !== 'string' || !key.startsWith('bp_live_') && !key.startsWith('bp_test_')) {
      throw new UnauthorizedException('Invalid API key format');
    }

    const keyHash = createHash('sha256').update(key).digest('hex');

    const apiKey = await this.prisma.apiKey.findUnique({
      where: { keyHash },
      include: { merchant: true },
    });

    if (!apiKey || apiKey.revokedAt || (apiKey.expiresAt && apiKey.expiresAt < new Date())) {
      throw new UnauthorizedException('API key is invalid, revoked, or expired');
    }

    // Update lastUsedAt asynchronously
    this.prisma.apiKey.update({
      where: { id: apiKey.id },
      data: { lastUsedAt: new Date() },
    }).catch(() => {});

    request.merchantId = apiKey.merchantId;
    request.apiKey = apiKey;
    request.environment = apiKey.environment;

    return true;
  }
}
