import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module.js';
import { PaymentLinksController } from './payment-links.controller.js';
import { PaymentLinksService } from './payment-links.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentLinksController],
  providers: [PaymentLinksService],
  exports: [PaymentLinksService],
})
export class PaymentLinksModule {}
