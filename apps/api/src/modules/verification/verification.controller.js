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
import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VerificationService } from './verification.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';
let VerificationController = class VerificationController {
    verificationService;
    constructor(verificationService) {
        this.verificationService = verificationService;
    }
    async verifyBankAccount(req, body) {
        const merchantId = req.user.merchantId;
        return this.verificationService.verifyBankAccount(merchantId, body);
    }
    async verifyVpa(req, body) {
        const merchantId = req.user.merchantId;
        return this.verificationService.verifyVpa(merchantId, body.vpa);
    }
    async resolveIfsc(code) {
        return this.verificationService.resolveIfsc(code);
    }
    async listVerifications(req) {
        const merchantId = req.user.merchantId;
        return this.verificationService.listVerifications(merchantId);
    }
};
__decorate([
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    Post('bank-account'),
    ApiOperation({ summary: 'Penny Drop Bank Account Verification' }),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "verifyBankAccount", null);
__decorate([
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    Post('vpa'),
    ApiOperation({ summary: 'UPI ID / VPA Verification' }),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "verifyVpa", null);
__decorate([
    Get('ifsc/:code'),
    ApiOperation({ summary: 'Lookup bank and branch info by IFSC code' }),
    __param(0, Param('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "resolveIfsc", null);
__decorate([
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    Get('history'),
    ApiOperation({ summary: 'List verification audit history' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "listVerifications", null);
VerificationController = __decorate([
    ApiTags('Verification — Penny Drop & VPA'),
    Controller({ path: 'verification', version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof VerificationService !== "undefined" && VerificationService) === "function" ? _a : Object])
], VerificationController);
export { VerificationController };
