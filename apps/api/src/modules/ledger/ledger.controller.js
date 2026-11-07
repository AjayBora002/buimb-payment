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
import { LedgerService } from './ledger.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';
let LedgerController = class LedgerController {
    ledgerService;
    constructor(ledgerService) {
        this.ledgerService = ledgerService;
    }
    async listAccounts(req) {
        const merchantId = req.user.merchantId;
        return this.ledgerService.listAccounts(merchantId);
    }
    async listTransactions(paymentIntentId, cursor, limit) {
        return this.ledgerService.listTransactions({
            paymentIntentId,
            cursor,
            limit: limit ? Number(limit) : undefined,
        });
    }
};
__decorate([
    Get('accounts'),
    ApiOperation({ summary: 'List ledger accounts' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LedgerController.prototype, "listAccounts", null);
__decorate([
    Get('transactions'),
    ApiOperation({ summary: 'List immutable ledger transactions' }),
    __param(0, Query('paymentIntentId')),
    __param(1, Query('cursor')),
    __param(2, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], LedgerController.prototype, "listTransactions", null);
LedgerController = __decorate([
    ApiTags('Ledger'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    Controller({ path: 'ledger', version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof LedgerService !== "undefined" && LedgerService) === "function" ? _a : Object])
], LedgerController);
export { LedgerController };
