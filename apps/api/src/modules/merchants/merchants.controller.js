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
import { Controller, Get, Put, Post, Delete, Body, Param, UseGuards, Req, HttpCode, HttpStatus, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MerchantsService } from './merchants.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';
import { Environment } from '@prisma/client';
let MerchantsController = class MerchantsController {
    merchantsService;
    constructor(merchantsService) {
        this.merchantsService = merchantsService;
    }
    async getCurrent(req) {
        const merchantId = req.user.merchantId;
        return this.merchantsService.getMerchant(merchantId);
    }
    async updateCurrent(req, body) {
        const merchantId = req.user.merchantId;
        return this.merchantsService.updateMerchant(merchantId, body);
    }
    async submitKyc(req, body) {
        const merchantId = req.user.merchantId;
        return this.merchantsService.submitKyc(merchantId, body);
    }
    async getBankAccounts(req) {
        const merchantId = req.user.merchantId;
        return this.merchantsService.getBankAccounts(merchantId);
    }
    async addBankAccount(req, body) {
        const merchantId = req.user.merchantId;
        return this.merchantsService.addBankAccount(merchantId, body);
    }
    async listApiKeys(req) {
        const merchantId = req.user.merchantId;
        return this.merchantsService.listApiKeys(merchantId);
    }
    async createApiKey(req, body) {
        const merchantId = req.user.merchantId;
        const userId = req.user.sub;
        return this.merchantsService.createApiKey(merchantId, userId, {
            name: body.name,
            environment: body.environment ?? Environment.SANDBOX,
            scopes: body.scopes,
        });
    }
    async revokeApiKey(req, keyId) {
        const merchantId = req.user.merchantId;
        const userId = req.user.sub;
        return this.merchantsService.revokeApiKey(merchantId, keyId, userId);
    }
};
__decorate([
    Get('current'),
    ApiOperation({ summary: 'Get current authenticated merchant' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "getCurrent", null);
__decorate([
    Put('current'),
    ApiOperation({ summary: 'Update merchant settings' }),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "updateCurrent", null);
__decorate([
    Post('current/kyc'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Submit KYC information' }),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "submitKyc", null);
__decorate([
    Get('current/bank-accounts'),
    ApiOperation({ summary: 'List settlement bank accounts' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "getBankAccounts", null);
__decorate([
    Post('current/bank-accounts'),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Add settlement bank account' }),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "addBankAccount", null);
__decorate([
    Get('current/api-keys'),
    ApiOperation({ summary: 'List merchant API keys' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "listApiKeys", null);
__decorate([
    Post('current/api-keys'),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create a new API key' }),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "createApiKey", null);
__decorate([
    Delete('current/api-keys/:keyId'),
    ApiOperation({ summary: 'Revoke an API key' }),
    __param(0, Req()),
    __param(1, Param('keyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "revokeApiKey", null);
MerchantsController = __decorate([
    ApiTags('Merchants'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    Controller({ path: 'merchants', version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof MerchantsService !== "undefined" && MerchantsService) === "function" ? _a : Object])
], MerchantsController);
export { MerchantsController };
