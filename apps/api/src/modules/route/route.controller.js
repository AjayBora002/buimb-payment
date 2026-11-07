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
import { RouteService } from './route.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';
let RouteController = class RouteController {
    routeService;
    constructor(routeService) {
        this.routeService = routeService;
    }
    async createAccount(req, body) {
        const merchantId = req.user.merchantId;
        return this.routeService.createLinkedAccount(merchantId, body);
    }
    async listAccounts(req) {
        const merchantId = req.user.merchantId;
        return this.routeService.listLinkedAccounts(merchantId);
    }
    async createTransfer(req, body) {
        const merchantId = req.user.merchantId;
        return this.routeService.createTransfer(merchantId, body);
    }
    async listTransfers(req) {
        const merchantId = req.user.merchantId;
        return this.routeService.listTransfers(merchantId);
    }
    async reverseTransfer(req, id, body) {
        const merchantId = req.user.merchantId;
        return this.routeService.reverseTransfer(merchantId, id, body);
    }
};
__decorate([
    Post('accounts'),
    ApiOperation({ summary: 'Create a linked vendor account for split transfers' }),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "createAccount", null);
__decorate([
    Get('accounts'),
    ApiOperation({ summary: 'List all linked accounts' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "listAccounts", null);
__decorate([
    Post('transfers'),
    ApiOperation({ summary: 'Create a split transfer on a captured payment' }),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "createTransfer", null);
__decorate([
    Get('transfers'),
    ApiOperation({ summary: 'List all split transfers' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "listTransfers", null);
__decorate([
    Post('transfers/:id/reversals'),
    ApiOperation({ summary: 'Reverse a split transfer' }),
    __param(0, Req()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "reverseTransfer", null);
RouteController = __decorate([
    ApiTags('Route — Split Marketplace'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    Controller({ path: 'route', version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof RouteService !== "undefined" && RouteService) === "function" ? _a : Object])
], RouteController);
export { RouteController };
