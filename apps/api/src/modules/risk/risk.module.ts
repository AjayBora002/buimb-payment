import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module.js';
import { RiskController } from './risk.controller.js';
import { RiskService } from './risk.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [RiskController],
  providers: [RiskService],
  exports: [RiskService],
})
export class RiskModule {}
