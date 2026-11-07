import { Module } from '@nestjs/common';
import { PayoutLinksService } from './payout-links.service.js';
import { PayoutLinksController } from './payout-links.controller.js';
import { DatabaseModule } from '../../common/database/database.module.js';

@Module({
  imports: [DatabaseModule],
  providers: [PayoutLinksService],
  controllers: [PayoutLinksController],
  exports: [PayoutLinksService],
})
export class PayoutLinksModule {}

