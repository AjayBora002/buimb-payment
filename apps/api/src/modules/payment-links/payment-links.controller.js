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
import { Controller, Get, Post, Delete, Body, Param, Query, Req, UseGuards, HttpCode, HttpStatus, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentLinksService } from './payment-links.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';
let PaymentLinksController = class PaymentLinksController {
    paymentLinksService;
    constructor(paymentLinksService) {
        this.paymentLinksService = paymentLinksService;
    }
    // Public endpoint for paying via slug
    async getBySlug(slug) {
        return this.paymentLinksService.getPaymentLinkBySlug(slug);
    }
    async create(req, body) {
        const merchantId = req.user.merchantId;
        const userId = req.user.sub;
        return this.paymentLinksService.createPaymentLink(merchantId, userId, body);
    }
    async findOne(req, id) {
        const merchantId = req.user.merchantId;
        return this.paymentLinksService.findPaymentLink(merchantId, id);
    }
    async findAll(req, cursor, limit) {
        const merchantId = req.user.merchantId;
        return this.paymentLinksService.listPaymentLinks(merchantId, {
            cursor,
            limit: limit ? Number(limit) : undefined,
        });
    }
    async deactivate(req, id) {
        const merchantId = req.user.merchantId;
        return this.paymentLinksService.deactivatePaymentLink(merchantId, id);
    }
};
__decorate([
    Get('public/:slug'),
    ApiOperation({ summary: 'Get payment link details by public slug' }),
    __param(0, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentLinksController.prototype, "getBySlug", null);
__decorate([
    Post(),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create a new payment link' }),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentLinksController.prototype, "create", null);
__decorate([
    Get(':id'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get payment link by ID' }),
    __param(0, Req()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentLinksController.prototype, "findOne", null);
__decorate([
    Get(),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiOperation({ summary: 'List payment links' }),
    __param(0, Req()),
    __param(1, Query('cursor')),
    __param(2, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], PaymentLinksController.prototype, "findAll", null);
__decorate([
    Delete(':id'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Deactivate / cancel a payment link' }),
    __param(0, Req()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentLinksController.prototype, "deactivate", null);
PaymentLinksController = __decorate([
    ApiTags('Payment Links'),
    Controller({ path: 'payment-links', version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof PaymentLinksService !== "undefined" && PaymentLinksService) === "function" ? _a : Object])
], PaymentLinksController);
export { PaymentLinksController };
