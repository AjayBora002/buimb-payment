import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentLinksService } from './payment-links.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';

@ApiTags('Payment Links')
@Controller({ path: 'payment-links', version: '1' })
export class PaymentLinksController {
  constructor(private readonly paymentLinksService: PaymentLinksService) {}

  // Public endpoint for paying via slug
  @Get('public/:slug')
  @ApiOperation({ summary: 'Get payment link details by public slug' })
  async getBySlug(@Param('slug') slug: string) {
    return this.paymentLinksService.getPaymentLinkBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new payment link' })
  async create(
    @Req() req: any,
    @Body()
    body: {
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
  ) {
    const merchantId = req.user.merchantId;
    const userId = req.user.sub;
    return this.paymentLinksService.createPaymentLink(merchantId, userId, body);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get payment link by ID' })
  async findOne(@Req() req: any, @Param('id') id: string) {
    const merchantId = req.user.merchantId;
    return this.paymentLinksService.findPaymentLink(merchantId, id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List payment links' })
  async findAll(
    @Req() req: any,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    const merchantId = req.user.merchantId;
    return this.paymentLinksService.listPaymentLinks(merchantId, {
      cursor,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deactivate / cancel a payment link' })
  async deactivate(@Req() req: any, @Param('id') id: string) {
    const merchantId = req.user.merchantId;
    return this.paymentLinksService.deactivatePaymentLink(merchantId, id);
  }
}
