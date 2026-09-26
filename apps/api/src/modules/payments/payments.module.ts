import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module.js';
import { LedgerModule } from '../ledger/ledger.module.js';
import { PaymentsController } from './payments.controller.js';
import { PaymentsService } from './payments.service.js';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';
import { PublicPaymentsController } from './public-payments.controller.js';
import { PrismaService } from '../../common/database/prisma.service.js';

@Module({
  imports: [DatabaseModule, LedgerModule],
  controllers: [PaymentsController, OrdersController, PublicPaymentsController],
  providers: [PaymentsService, OrdersService, PrismaService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
