import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module.js';
import { SubscriptionsController } from './subscriptions.controller.js';
import { SubscriptionsService } from './subscriptions.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
