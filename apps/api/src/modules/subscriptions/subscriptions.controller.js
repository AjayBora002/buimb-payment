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
import { SubscriptionsService } from './subscriptions.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';
let SubscriptionsController = class SubscriptionsController {
    subscriptionsService;
    constructor(subscriptionsService) {
        this.subscriptionsService = subscriptionsService;
    }
    async createPlan(req, body) {
        const merchantId = req.user.merchantId;
        return this.subscriptionsService.createPlan(merchantId, body);
    }
    async listPlans(req) {
        const merchantId = req.user.merchantId;
        return this.subscriptionsService.listPlans(merchantId);
    }
    async createSubscription(req, body) {
        const merchantId = req.user.merchantId;
        return this.subscriptionsService.createSubscription(merchantId, body);
    }
    async findOne(req, id) {
        const merchantId = req.user.merchantId;
        return this.subscriptionsService.getSubscription(merchantId, id);
    }
    async findAll(req, cursor, limit) {
        const merchantId = req.user.merchantId;
        return this.subscriptionsService.listSubscriptions(merchantId, {
            cursor,
            limit: limit ? Number(limit) : undefined,
        });
    }
    async cancel(req, id, body) {
        const merchantId = req.user.merchantId;
        return this.subscriptionsService.cancelSubscription(merchantId, id, body?.reason);
    }
};
__decorate([
    Post('plans'),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create a subscription plan' }),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "createPlan", null);
__decorate([
    Get('plans'),
    ApiOperation({ summary: 'List subscription plans' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "listPlans", null);
__decorate([
    Post(),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create a subscription' }),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "createSubscription", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Get subscription by ID' }),
    __param(0, Req()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "findOne", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'List subscriptions' }),
    __param(0, Req()),
    __param(1, Query('cursor')),
    __param(2, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "findAll", null);
__decorate([
    Delete(':id'),
    ApiOperation({ summary: 'Cancel a subscription' }),
    __param(0, Req()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "cancel", null);
SubscriptionsController = __decorate([
    ApiTags('Subscriptions'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    Controller({ path: 'subscriptions', version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof SubscriptionsService !== "undefined" && SubscriptionsService) === "function" ? _a : Object])
], SubscriptionsController);
export { SubscriptionsController };
