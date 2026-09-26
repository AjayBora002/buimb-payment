import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module.js';
import { LedgerModule } from '../ledger/ledger.module.js';
import { RefundsController } from './refunds.controller.js';
import { RefundsService } from './refunds.service.js';

@Module({
  imports: [DatabaseModule, LedgerModule],
  controllers: [RefundsController],
  providers: [RefundsService],
  exports: [RefundsService],
})
export class RefundsModule {}
