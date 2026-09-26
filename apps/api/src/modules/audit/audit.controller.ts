import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuditService } from './audit.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';

@ApiTags('Audit')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'audit-logs', version: '1' })
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  @ApiOperation({ summary: 'List security and audit events' })
  async list(
    @Req() req: any,
    @Query('resource') resource?: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    const merchantId = req.user.merchantId;
    return this.auditService.listEvents(merchantId, {
      resource,
      cursor,
      limit: limit ? Number(limit) : undefined,
    });
  }
}
