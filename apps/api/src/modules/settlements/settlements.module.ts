import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module.js';
import { SettlementsController } from './settlements.controller.js';
import { SettlementsService } from './settlements.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [SettlementsController],
  providers: [SettlementsService],
  exports: [SettlementsService],
})
export class SettlementsModule {}
