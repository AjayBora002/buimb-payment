import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module.js';
import { MerchantsController } from './merchants.controller.js';
import { MerchantsService } from './merchants.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [MerchantsController],
  providers: [MerchantsService],
  exports: [MerchantsService],
})
export class MerchantsModule {}
