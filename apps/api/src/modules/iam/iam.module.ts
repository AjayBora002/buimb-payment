import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module.js';
import { IamController } from './iam.controller.js';
import { IamService } from './iam.service.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { ApiKeyGuard } from './guards/api-key.guard.js';

@Module({
  imports: [DatabaseModule],
  controllers: [IamController],
  providers: [IamService, JwtAuthGuard, ApiKeyGuard],
  exports: [IamService, JwtAuthGuard, ApiKeyGuard],
})
export class IamModule {}
