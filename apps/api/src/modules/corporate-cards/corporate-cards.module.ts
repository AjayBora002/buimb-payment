import { Module } from '@nestjs/common';
import { CorporateCardsService } from './corporate-cards.service.js';
import { CorporateCardsController } from './corporate-cards.controller.js';
import { DatabaseModule } from '../../common/database/database.module.js';

@Module({
  imports: [DatabaseModule],
  providers: [CorporateCardsService],
  controllers: [CorporateCardsController],
  exports: [CorporateCardsService],
})
export class CorporateCardsModule {}

