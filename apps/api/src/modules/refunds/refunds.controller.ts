import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RefundsService } from './refunds.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';

@ApiTags('Refunds')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller({ path: 'refunds', version: '1' })
export class RefundsController {
  constructor(private readonly refundsService: RefundsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a refund' })
  async create(
    @Req() req: any,
    @Body()
    body: {
      paymentIntentId: string;
      amount?: number;
      reason?: string;
      notes?: string;
      idempotencyKey?: string;
    },
  ) {
    const merchantId = req.user.merchantId;
    const userId = req.user.sub;
    return this.refundsService.createRefund(merchantId, userId, body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a refund' })
  async findOne(@Req() req: any, @Param('id') id: string) {
    const merchantId = req.user.merchantId;
    return this.refundsService.findRefund(merchantId, id);
  }

  @Get()
  @ApiOperation({ summary: 'List refunds' })
  async findAll(
    @Req() req: any,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    const merchantId = req.user.merchantId;
    return this.refundsService.listRefunds(merchantId, {
      cursor,
      limit: limit ? Number(limit) : undefined,
    });
  }
}
