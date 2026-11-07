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
import { WebhooksService } from './webhooks.service.js';
import { JwtAuthGuard } from '../iam/guards/jwt-auth.guard.js';
let WebhooksController = class WebhooksController {
    webhooksService;
    constructor(webhooksService) {
        this.webhooksService = webhooksService;
    }
    async createEndpoint(req, body) {
        const merchantId = req.user.merchantId;
        return this.webhooksService.createEndpoint(merchantId, body);
    }
    async listEndpoints(req) {
        const merchantId = req.user.merchantId;
        return this.webhooksService.listEndpoints(merchantId);
    }
    async deleteEndpoint(req, id) {
        const merchantId = req.user.merchantId;
        return this.webhooksService.deleteEndpoint(merchantId, id);
    }
    async listDeliveries(req, endpointId, cursor, limit) {
        const merchantId = req.user.merchantId;
        return this.webhooksService.listDeliveries(merchantId, {
            endpointId,
            cursor,
            limit: limit ? Number(limit) : undefined,
        });
    }
};
__decorate([
    Post('endpoints'),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create webhook endpoint' }),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "createEndpoint", null);
__decorate([
    Get('endpoints'),
    ApiOperation({ summary: 'List webhook endpoints' }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "listEndpoints", null);
__decorate([
    Delete('endpoints/:id'),
    ApiOperation({ summary: 'Delete webhook endpoint' }),
    __param(0, Req()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "deleteEndpoint", null);
__decorate([
    Get('deliveries'),
    ApiOperation({ summary: 'List webhook delivery attempts and logs' }),
    __param(0, Req()),
    __param(1, Query('endpointId')),
    __param(2, Query('cursor')),
    __param(3, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Number]),
    __metadata("design:returntype", Promise)
], WebhooksController.prototype, "listDeliveries", null);
WebhooksController = __decorate([
    ApiTags('Webhooks'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    Controller({ path: 'webhooks', version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof WebhooksService !== "undefined" && WebhooksService) === "function" ? _a : Object])
], WebhooksController);
export { WebhooksController };
