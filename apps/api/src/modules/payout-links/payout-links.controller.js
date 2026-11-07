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
import { PayoutLinksService } from './payout-links.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';
let PayoutLinksController = class PayoutLinksController {
    payoutLinksService;
    constructor(payoutLinksService) {
        this.payoutLinksService = payoutLinksService;
    }
    async create(req, body) {
        const merchantId = req.user.merchantId;
        return this.payoutLinksService.createPayoutLink(merchantId, body);
    }
    async list(req) {
        const merchantId = req.user.merchantId;
        return this.payoutLinksService.listPayoutLinks(merchantId);
    }
    // Public Endpoints for Recipient to View and Claim Funds
    async getPublic(shortUrl) {
        return this.payoutLinksService.getPublicPayoutLink(shortUrl);
    }
    async claim(shortUrl, body) {
        return this.payoutLinksService.claimPayoutLink(shortUrl, body);
    }
};
__decorate([
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    Post(),
    ApiOperation({ summary: 'Create a new self-serve payout link' }),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PayoutLinksController.prototype, "create", null);
__decorate([
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    Get(),
    ApiOperation({ summary: 'List all issued payout links' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayoutLinksController.prototype, "list", null);
__decorate([
    Get('public/:shortUrl'),
    ApiOperation({ summary: 'Public details of a payout link' }),
    __param(0, Param('shortUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayoutLinksController.prototype, "getPublic", null);
__decorate([
    Post('public/:shortUrl/claim'),
    ApiOperation({ summary: 'Recipient claims funds via UPI or Bank Account' }),
    __param(0, Param('shortUrl')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayoutLinksController.prototype, "claim", null);
PayoutLinksController = __decorate([
    ApiTags('Payout Links — Self-serve vendor payouts'),
    Controller({ path: 'payout-links', version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof PayoutLinksService !== "undefined" && PayoutLinksService) === "function" ? _a : Object])
], PayoutLinksController);
export { PayoutLinksController };
