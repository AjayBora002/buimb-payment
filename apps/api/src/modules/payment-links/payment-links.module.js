var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module.js';
import { PaymentLinksController } from './payment-links.controller.js';
import { PaymentLinksService } from './payment-links.service.js';
let PaymentLinksModule = class PaymentLinksModule {
};
PaymentLinksModule = __decorate([
    Module({
        imports: [DatabaseModule],
        controllers: [PaymentLinksController],
        providers: [PaymentLinksService],
        exports: [PaymentLinksService],
    })
], PaymentLinksModule);
export { PaymentLinksModule };
