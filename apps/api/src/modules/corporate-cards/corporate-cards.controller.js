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
import { CorporateCardsService } from './corporate-cards.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';
let CorporateCardsController = class CorporateCardsController {
    corporateCardsService;
    constructor(corporateCardsService) {
        this.corporateCardsService = corporateCardsService;
    }
    async issueCard(req, body) {
        const merchantId = req.user.merchantId;
        return this.corporateCardsService.issueCard(merchantId, body);
    }
    async listCards(req) {
        const merchantId = req.user.merchantId;
        return this.corporateCardsService.listCards(merchantId);
    }
    async toggleCard(req, id) {
        const merchantId = req.user.merchantId;
        return this.corporateCardsService.toggleCardStatus(merchantId, id);
    }
};
__decorate([
    Post(),
    ApiOperation({ summary: 'Issue a new virtual corporate expense card' }),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CorporateCardsController.prototype, "issueCard", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'List all issued corporate cards' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CorporateCardsController.prototype, "listCards", null);
__decorate([
    Post(':id/toggle'),
    ApiOperation({ summary: 'Freeze or Unfreeze a corporate card' }),
    __param(0, Req()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CorporateCardsController.prototype, "toggleCard", null);
CorporateCardsController = __decorate([
    ApiTags('Corporate Cards — Expense Management'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    Controller({ path: 'corporate-cards', version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof CorporateCardsService !== "undefined" && CorporateCardsService) === "function" ? _a : Object])
], CorporateCardsController);
export { CorporateCardsController };
