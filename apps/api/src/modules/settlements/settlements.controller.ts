import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SettlementsService } from './settlements.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';

@ApiTags('Settlements')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'settlements', version: '1' })
export class SettlementsController {
  constructor(private readonly settlementsService: SettlementsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get settlement by ID' })
  async findOne(@Req() req: any, @Param('id') id: string) {
    const merchantId = req.user.merchantId;
    return this.settlementsService.getSettlement(merchantId, id);
  }

  @Get()
  @ApiOperation({ summary: 'List settlements' })
  async findAll(
    @Req() req: any,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    const merchantId = req.user.merchantId;
    return this.settlementsService.listSettlements(merchantId, {
      cursor,
      limit: limit ? Number(limit) : undefined,
    });
  }
}
