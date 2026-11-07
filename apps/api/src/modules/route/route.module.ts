import { Module } from '@nestjs/common';
import { RouteService } from './route.service.js';
import { RouteController } from './route.controller.js';
import { DatabaseModule } from '../../common/database/database.module.js';

@Module({
  imports: [DatabaseModule],
  providers: [RouteService],
  controllers: [RouteController],
  exports: [RouteService],
})
export class RouteModule {}

