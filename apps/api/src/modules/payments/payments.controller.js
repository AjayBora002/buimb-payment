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
import { Controller, Get, Post, Body, Param, Query, Req, UseGuards, HttpCode, HttpStatus, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { PaymentsService } from './payments.service.js';
import { ApiKeyGuard } from '../iam/guards/api-key.guard.js';
import { ProductionPaymentGuard } from '../../common/guards/production-payment.guard.js';
let PaymentsController = class PaymentsController {
    paymentsService;
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async create(req, body) {
        const merchantId = req.merchantId;
        return this.paymentsService.createPaymentIntent(merchantId, body.orderId, body);
    }
    async findOne(req, id) {
        const merchantId = req.merchantId;
        return this.paymentsService.findOne(merchantId, id);
    }
    async confirm(req, id, body) {
        const merchantId = req.merchantId;
        return this.paymentsService.confirmPaymentIntent(merchantId, id, body);
    }
    async capture(req, id, body) {
        const merchantId = req.merchantId;
        return this.paymentsService.capturePaymentIntent(merchantId, id, body.captureAmount);
    }
    async cancel(req, id, body) {
        const merchantId = req.merchantId;
        return this.paymentsService.cancelPaymentIntent(merchantId, id, body.reason);
    }
    async findAll(req, cursor, limit) {
        const merchantId = req.merchantId;
        return this.paymentsService.findAll(merchantId, { cursor, limit });
    }
};
__decorate([
    Post(),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create a payment intent' }),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "create", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Retrieve a payment intent' }),
    __param(0, Req()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "findOne", null);
__decorate([
    Post(':id/confirm'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Confirm a payment intent' }),
    __param(0, Req()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "confirm", null);
__decorate([
    Post(':id/capture'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Capture an authorised payment intent' }),
    __param(0, Req()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "capture", null);
__decorate([
    Post(':id/cancel'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Cancel a payment intent' }),
    __param(0, Req()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "cancel", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'List payment intents' }),
    __param(0, Req()),
    __param(1, Query('cursor')),
    __param(2, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "findAll", null);
PaymentsController = __decorate([
    ApiTags('Payment Intents'),
    ApiBearerAuth(),
    ApiSecurity('x-api-key'),
    UseGuards(ApiKeyGuard, ProductionPaymentGuard),
    Controller({ path: 'payment-intents', version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof PaymentsService !== "undefined" && PaymentsService) === "function" ? _a : Object])
], PaymentsController);
export { PaymentsController };
