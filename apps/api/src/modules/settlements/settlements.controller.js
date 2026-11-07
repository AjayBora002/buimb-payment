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
import { Controller, Get, Post, Param, Query, Req, UseGuards, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SettlementsService } from './settlements.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';
let SettlementsController = class SettlementsController {
    settlementsService;
    constructor(settlementsService) {
        this.settlementsService = settlementsService;
    }
    async requestInstant(req) {
        const merchantId = req.user.merchantId;
        return this.settlementsService.requestInstantSettlement(merchantId);
    }
    async findOne(req, id) {
        const merchantId = req.user.merchantId;
        return this.settlementsService.getSettlement(merchantId, id);
    }
    async findAll(req, cursor, limit) {
        const merchantId = req.user.merchantId;
        return this.settlementsService.listSettlements(merchantId, {
            cursor,
            limit: limit ? Number(limit) : undefined,
        });
    }
};
__decorate([
    Post('instant'),
    ApiOperation({ summary: 'Request on-demand instant settlement' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettlementsController.prototype, "requestInstant", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Get settlement by ID' }),
    __param(0, Req()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SettlementsController.prototype, "findOne", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'List settlements' }),
    __param(0, Req()),
    __param(1, Query('cursor')),
    __param(2, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], SettlementsController.prototype, "findAll", null);
SettlementsController = __decorate([
    ApiTags('Settlements'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    Controller({ path: 'settlements', version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof SettlementsService !== "undefined" && SettlementsService) === "function" ? _a : Object])
], SettlementsController);
export { SettlementsController };
