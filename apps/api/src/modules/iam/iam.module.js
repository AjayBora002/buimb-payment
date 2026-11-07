var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module.js';
import { IamController } from './iam.controller.js';
import { IamService } from './iam.service.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { ApiKeyGuard } from './guards/api-key.guard.js';
let IamModule = class IamModule {
};
IamModule = __decorate([
    Module({
        imports: [DatabaseModule],
        controllers: [IamController],
        providers: [IamService, JwtAuthGuard, ApiKeyGuard],
        exports: [IamService, JwtAuthGuard, ApiKeyGuard],
    })
], IamModule);
export { IamModule };
