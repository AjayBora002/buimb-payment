import { Module } from '@nestjs/common';
import { MagicCheckoutService } from './magic-checkout.service.js';
import { MagicCheckoutController } from './magic-checkout.controller.js';

@Module({
  providers: [MagicCheckoutService],
  controllers: [MagicCheckoutController],
  exports: [MagicCheckoutService],
})
export class MagicCheckoutModule {}

