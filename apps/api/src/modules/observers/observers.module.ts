import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module.js';
import { CheckoutModule } from '../checkout/checkout.module.js';
import { ObserversController } from './observers.controller.js';
import { ObserversService } from './observers.service.js';

@Module({
  imports: [DatabaseModule, CheckoutModule],
  controllers: [ObserversController],
  providers: [ObserversService],
  exports: [ObserversService],
})
export class ObserversModule {}

