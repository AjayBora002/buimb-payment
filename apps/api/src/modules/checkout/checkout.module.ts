import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module.js';
import { PaymentsModule } from '../payments/payments.module.js';
import { CheckoutController } from './checkout.controller.js';
import { CheckoutService } from './checkout.service.js';

@Module({
  imports: [DatabaseModule, PaymentsModule],
  controllers: [CheckoutController],
  providers: [CheckoutService],
  exports: [CheckoutService],
})
export class CheckoutModule {}

