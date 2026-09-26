import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RiskService } from './risk.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';

@ApiTags('Risk')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'risk', version: '1' })
export class RiskController {
  constructor(private readonly riskService: RiskService) {}

  @Get('decisions')
  @ApiOperation({ summary: 'List risk engine evaluation decisions' })
  async listDecisions(
    @Req() req: any,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    const merchantId = req.user.merchantId;
    return this.riskService.listDecisions(merchantId, {
      cursor,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Get('rules')
  @ApiOperation({ summary: 'List active risk rules' })
  async listRules() {
    return this.riskService.listRules();
  }
}
