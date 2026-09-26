import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrdersService } from './orders.service.js';
import { PaymentsService } from './payments.service.js';
import { PrismaService } from '../../common/database/prisma.service.js';

/**
 * Public (unauthenticated) endpoints consumed by the customer-facing checkout pages.
 * These endpoints expose only the minimum data needed to display and complete a payment.
 * They deliberately do NOT expose merchant-private fields (e.g. fees, settlement data).
 */
@ApiTags('Public Checkout')
@Controller({ version: '1' })
export class PublicPaymentsController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly paymentsService: PaymentsService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Fetch a minimal order summary for the customer checkout UI.
   * Returns only: id, amount, currency, status, description, receipt.
   */
  @Get('orders/public/:id')
  @ApiOperation({ summary: 'Get public order summary for checkout (no auth required)' })
  async getOrderPublic(@Param('id') id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      select: {
        id: true,
        amount: true,
        currency: true,
        description: true,
        externalOrderId: true,
        merchantId: true,
        environment: true,
        paymentIntents: {
          select: { status: true },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    const latestStatus = order.paymentIntents[0]?.status ?? 'CREATED';

    return {
      id: order.id,
      amount: Number(order.amount),
      currency: order.currency,
      status: latestStatus,
      description: order.description,
      receipt: order.externalOrderId,
      merchantId: order.merchantId,
    };
  }

  /**
   * Create a payment intent from the public checkout (uses order's merchantId).
   */
  @Post('payment-intents/public')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create payment intent from public checkout (no auth required)' })
  async createPublicIntent(@Body() body: { orderId: string; description?: string }) {
    // Look up the order to get merchantId
    const order = await this.prisma.order.findUnique({
      where: { id: body.orderId },
      select: { id: true, merchantId: true },
    });

    if (!order) {
      throw new NotFoundException(`Order ${body.orderId} not found`);
    }

    const intent = await this.paymentsService.createPaymentIntent(
      order.merchantId,
      body.orderId,
      { description: body.description },
    );

    return {
      id: intent.id,
      clientSecret: intent.clientSecret,
      amount: Number(intent.amount),
      currency: intent.currency,
      status: intent.status,
    };
  }

  /**
   * Confirm a payment intent from the public checkout.
   */
  @Post('payment-intents/public/:id/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm payment intent from public checkout (no auth required)' })
  async confirmPublicIntent(
    @Param('id') id: string,
    @Body() body: {
      paymentMethodType: string;
      upiId?: string;
      cardNumber?: string;
      cardExpiry?: string;
      cardCvv?: string;
      cardName?: string;
      bank?: string;
      simulateOutcome?: 'success' | 'failure';
    },
  ) {
    // Fetch the intent to get merchantId for the service call
    const intent = await this.prisma.paymentIntent.findUnique({
      where: { id },
      select: { id: true, merchantId: true },
    });

    if (!intent) {
      throw new NotFoundException(`Payment intent ${id} not found`);
    }

    const confirmed = await this.paymentsService.confirmPaymentIntent(
      intent.merchantId,
      id,
      {
        paymentMethodType: body.paymentMethodType,
        paymentMethodData: {
          ...(body.upiId ? { upiId: body.upiId } : {}),
          ...(body.cardNumber ? { cardNumber: body.cardNumber, cardExpiry: body.cardExpiry, cardCvv: body.cardCvv, cardName: body.cardName } : {}),
          ...(body.bank ? { bank: body.bank } : {}),
        },
        simulateOutcome: body.simulateOutcome ?? 'success',
      },
    );

    return {
      id: confirmed.id,
      status: confirmed.status,
      amount: Number(confirmed.amount),
      currency: confirmed.currency,
    };
  }
}
