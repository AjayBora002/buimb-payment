import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '../../common/database/prisma.service.js';
import { RedisService } from '../../common/redis/redis.service.js';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Liveness & readiness probe' })
  async check() {
    let dbStatus = 'down';
    let redisStatus = 'down';

    try {
      await this.prisma.$queryRaw`SELECT 1`;
      dbStatus = 'up';
    } catch {
      dbStatus = 'unreachable';
    }

    try {
      const pong = await this.redis.getClient().ping();
      if (pong === 'PONG') redisStatus = 'up';
    } catch {
      redisStatus = 'unreachable';
    }

    const isHealthy = dbStatus === 'up' && redisStatus === 'up';

    return {
      status: isHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      checks: {
        database: dbStatus,
        redis: redisStatus,
        productionPayments: process.env.PAYMENT_PRODUCTION_ENABLED === 'true' ? 'enabled' : 'disabled (sandbox only)',
      },
      version: '0.1.0',
    };
  }
}
