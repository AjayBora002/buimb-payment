import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module.js';
import { LedgerController } from './ledger.controller.js';
import { LedgerService } from './ledger.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [LedgerController],
  providers: [LedgerService],
  exports: [LedgerService],
})
export class LedgerModule {}
