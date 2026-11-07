var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service.js';
import { VerificationController } from './verification.controller.js';
import { DatabaseModule } from '../../common/database/database.module.js';
let VerificationModule = class VerificationModule {
};
VerificationModule = __decorate([
    Module({
        imports: [DatabaseModule],
        providers: [VerificationService],
        controllers: [VerificationController],
        exports: [VerificationService],
    })
], VerificationModule);
export { VerificationModule };
