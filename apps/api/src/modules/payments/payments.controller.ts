import {
  Controller, Get, Post, Body, Param, Query, Req,
  UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { PaymentsService } from './payments.service.js';
import { ApiKeyGuard } from '../iam/guards/api-key.guard.js';
import { ProductionPaymentGuard } from '../../common/guards/production-payment.guard.js';

@ApiTags('Payment Intents')
@ApiBearerAuth()
@ApiSecurity('x-api-key')
@UseGuards(ApiKeyGuard, ProductionPaymentGuard)
@Controller({ path: 'payment-intents', version: '1' })
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a payment intent' })
  async create(
    @Req() req: any,
    @Body() body: { orderId: string; captureMethod?: 'AUTOMATIC' | 'MANUAL'; description?: string },
  ) {
    const merchantId: string = req.merchantId;
    return this.paymentsService.createPaymentIntent(merchantId, body.orderId, body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a payment intent' })
  async findOne(@Req() req: any, @Param('id') id: string) {
    const merchantId: string = req.merchantId;
    return this.paymentsService.findOne(merchantId, id);
  }

  @Post(':id/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm a payment intent' })
  async confirm(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: { paymentMethodType: string; simulateOutcome?: 'success' | 'failure' },
  ) {
    const merchantId: string = req.merchantId;
    return this.paymentsService.confirmPaymentIntent(merchantId, id, body);
  }

  @Post(':id/capture')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Capture an authorised payment intent' })
  async capture(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: { captureAmount?: number },
  ) {
    const merchantId: string = req.merchantId;
    return this.paymentsService.capturePaymentIntent(merchantId, id, body.captureAmount);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel a payment intent' })
  async cancel(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: { reason?: string },
  ) {
    const merchantId: string = req.merchantId;
    return this.paymentsService.cancelPaymentIntent(merchantId, id, body.reason);
  }

  @Get()
  @ApiOperation({ summary: 'List payment intents' })
  async findAll(
    @Req() req: any,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    const merchantId: string = req.merchantId;
    return this.paymentsService.findAll(merchantId, { cursor, limit });
  }
}
