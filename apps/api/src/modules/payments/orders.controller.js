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
import { ApiTags, ApiOperation, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { OrdersService } from './orders.service.js';
import { ApiKeyGuard } from '../iam/guards/api-key.guard.js';
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async create(req, body) {
        const merchantId = req.merchantId;
        return this.ordersService.createOrder(merchantId, body);
    }
    async findOne(req, id) {
        const merchantId = req.merchantId;
        return this.ordersService.findOrder(merchantId, id);
    }
    async findAll(req, cursor, limit) {
        const merchantId = req.merchantId;
        return this.ordersService.findOrders(merchantId, {
            cursor,
            limit: limit ? Number(limit) : undefined,
        });
    }
};
__decorate([
    Post(),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create a new order' }),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Retrieve an order by ID' }),
    __param(0, Req()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'List orders' }),
    __param(0, Req()),
    __param(1, Query('cursor')),
    __param(2, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
OrdersController = __decorate([
    ApiTags('Orders'),
    ApiBearerAuth(),
    ApiSecurity('x-api-key'),
    UseGuards(ApiKeyGuard),
    Controller({ path: 'orders', version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof OrdersService !== "undefined" && OrdersService) === "function" ? _a : Object])
], OrdersController);
export { OrdersController };
