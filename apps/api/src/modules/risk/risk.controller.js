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
import { Controller, Get, Query, Req, UseGuards, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RiskService } from './risk.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';
let RiskController = class RiskController {
    riskService;
    constructor(riskService) {
        this.riskService = riskService;
    }
    async listDecisions(req, cursor, limit) {
        const merchantId = req.user.merchantId;
        return this.riskService.listDecisions(merchantId, {
            cursor,
            limit: limit ? Number(limit) : undefined,
        });
    }
    async listRules() {
        return this.riskService.listRules();
    }
};
__decorate([
    Get('decisions'),
    ApiOperation({ summary: 'List risk engine evaluation decisions' }),
    __param(0, Req()),
    __param(1, Query('cursor')),
    __param(2, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], RiskController.prototype, "listDecisions", null);
__decorate([
    Get('rules'),
    ApiOperation({ summary: 'List active risk rules' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RiskController.prototype, "listRules", null);
RiskController = __decorate([
    ApiTags('Risk'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    Controller({ path: 'risk', version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof RiskService !== "undefined" && RiskService) === "function" ? _a : Object])
], RiskController);
export { RiskController };
