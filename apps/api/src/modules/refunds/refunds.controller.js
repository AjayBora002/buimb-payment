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
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RefundsService } from './refunds.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';
let RefundsController = class RefundsController {
    refundsService;
    constructor(refundsService) {
        this.refundsService = refundsService;
    }
    async create(req, body) {
        const merchantId = req.user.merchantId;
        const userId = req.user.sub;
        return this.refundsService.createRefund(merchantId, userId, body);
    }
    async findOne(req, id) {
        const merchantId = req.user.merchantId;
        return this.refundsService.findRefund(merchantId, id);
    }
    async findAll(req, cursor, limit) {
        const merchantId = req.user.merchantId;
        return this.refundsService.listRefunds(merchantId, {
            cursor,
            limit: limit ? Number(limit) : undefined,
        });
    }
};
__decorate([
    Post(),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create a refund' }),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RefundsController.prototype, "create", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Retrieve a refund' }),
    __param(0, Req()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RefundsController.prototype, "findOne", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'List refunds' }),
    __param(0, Req()),
    __param(1, Query('cursor')),
    __param(2, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], RefundsController.prototype, "findAll", null);
RefundsController = __decorate([
    ApiTags('Refunds'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    Controller({ path: 'refunds', version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof RefundsService !== "undefined" && RefundsService) === "function" ? _a : Object])
], RefundsController);
export { RefundsController };
