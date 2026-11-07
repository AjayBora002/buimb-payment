import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MagicCheckoutService } from './magic-checkout.service.js';

@ApiTags('Magic Checkout — 1-Click & RTO Fraud Prevention')
@Controller({ path: 'magic', version: '1' })
export class MagicCheckoutController {
  constructor(private readonly magicCheckoutService: MagicCheckoutService) {}

  @Post('rto-score')
  @ApiOperation({ summary: 'Predict RTO risk probability for an order' })
  async predictRto(@Body() body: any) {
    return this.magicCheckoutService.predictRtoRisk(body);
  }

  @Post('coupons/validate')
  @ApiOperation({ summary: 'Validate coupon and calculate discount' })
  async validateCoupon(@Body() body: { code: string; cartAmountPaise: number }) {
    return this.magicCheckoutService.validateCoupon(body.code, body.cartAmountPaise);
  }
}

