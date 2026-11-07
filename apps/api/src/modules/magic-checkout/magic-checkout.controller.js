var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MagicCheckoutService } from './magic-checkout.service.js';
let MagicCheckoutController = class MagicCheckoutController {
    magicCheckoutService;
    constructor(magicCheckoutService) {
        this.magicCheckoutService = magicCheckoutService;
    }
    async predictRto(body) {
        return this.magicCheckoutService.predictRtoRisk(body);
    }
    async validateCoupon(body) {
        return this.magicCheckoutService.validateCoupon(body.code, body.cartAmountPaise);
    }
};
__decorate([
    Post('rto-score'),
    ApiOperation({ summary: 'Predict RTO risk probability for an order' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MagicCheckoutController.prototype, "predictRto", null);
__decorate([
    Post('coupons/validate'),
    ApiOperation({ summary: 'Validate coupon and calculate discount' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MagicCheckoutController.prototype, "validateCoupon", null);
MagicCheckoutController = __decorate([
    ApiTags('Magic Checkout — 1-Click & RTO Fraud Prevention'),
    Controller({ path: 'magic', version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof MagicCheckoutService !== "undefined" && MagicCheckoutService) === "function" ? _a : Object])
], MagicCheckoutController);
export { MagicCheckoutController };
