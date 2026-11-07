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
var _a, _b, _c;
import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, NotFoundException, UseGuards, } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrdersService } from './orders.service.js';
import { PaymentsService } from './payments.service.js';
import { PrismaService } from '../../common/database/prisma.service.js';
import { ProductionPaymentGuard } from '../../common/guards/production-payment.guard.js';
/**
 * Public (unauthenticated) endpoints consumed by the customer-facing checkout pages.
 * These endpoints expose only the minimum data needed to display and complete a payment.
 * They deliberately do NOT expose merchant-private fields (e.g. fees, settlement data).
 */
let PublicPaymentsController = class PublicPaymentsController {
    ordersService;
    paymentsService;
    prisma;
    constructor(ordersService, paymentsService, prisma) {
        this.ordersService = ordersService;
        this.paymentsService = paymentsService;
        this.prisma = prisma;
    }
    /**
     * Fetch a minimal order summary for the customer checkout UI.
     * Returns only: id, amount, currency, status, description, receipt.
     */
    async getOrderPublic(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            select: {
                id: true,
                amount: true,
                currency: true,
                description: true,
                externalOrderId: true,
                merchantId: true,
                environment: true,
                paymentIntents: {
                    select: { status: true },
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
        });
        if (!order) {
            throw new NotFoundException(`Order ${id} not found`);
        }
        const latestStatus = order.paymentIntents[0]?.status ?? 'CREATED';
        return {
            id: order.id,
            amount: Number(order.amount),
            currency: order.currency,
            status: latestStatus,
            description: order.description,
            receipt: order.externalOrderId,
            merchantId: order.merchantId,
        };
    }
    /**
     * Create a payment intent from the public checkout (uses order's merchantId).
     */
    async createPublicIntent(body) {
        // Look up the order to get merchantId
        const order = await this.prisma.order.findUnique({
            where: { id: body.orderId },
            select: { id: true, merchantId: true },
        });
        if (!order) {
            throw new NotFoundException(`Order ${body.orderId} not found`);
        }
        const intent = await this.paymentsService.createPaymentIntent(order.merchantId, body.orderId, { description: body.description });
        return {
            id: intent.id,
            clientSecret: intent.clientSecret,
            amount: Number(intent.amount),
            currency: intent.currency,
            status: intent.status,
        };
    }
    /**
     * Confirm a payment intent from the public checkout.
     */
    async confirmPublicIntent(id, body) {
        // Fetch the intent to get merchantId for the service call
        const intent = await this.prisma.paymentIntent.findUnique({
            where: { id },
            select: { id: true, merchantId: true },
        });
        if (!intent) {
            throw new NotFoundException(`Payment intent ${id} not found`);
        }
        const confirmed = await this.paymentsService.confirmPaymentIntent(intent.merchantId, id, {
            paymentMethodType: body.paymentMethodType,
            paymentMethodData: {
                ...(body.upiId ? { upiId: body.upiId } : {}),
                ...(body.cardNumber ? { cardNumber: body.cardNumber, cardExpiry: body.cardExpiry, cardCvv: body.cardCvv, cardName: body.cardName } : {}),
                ...(body.bank ? { bank: body.bank } : {}),
            },
            simulateOutcome: body.simulateOutcome ?? 'success',
        });
        return {
            id: confirmed.id,
            status: confirmed.status,
            amount: Number(confirmed.amount),
            currency: confirmed.currency,
        };
    }
};
__decorate([
    Get('orders/public/:id'),
    ApiOperation({ summary: 'Get public order summary for checkout (no auth required)' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicPaymentsController.prototype, "getOrderPublic", null);
__decorate([
    Post('payment-intents/public'),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Create payment intent from public checkout (no auth required)' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicPaymentsController.prototype, "createPublicIntent", null);
__decorate([
    Post('payment-intents/public/:id/confirm'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Confirm payment intent from public checkout (no auth required)' }),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PublicPaymentsController.prototype, "confirmPublicIntent", null);
PublicPaymentsController = __decorate([
    ApiTags('Public Checkout'),
    UseGuards(ProductionPaymentGuard),
    Controller({ version: '1' }),
    __metadata("design:paramtypes", [typeof (_a = typeof OrdersService !== "undefined" && OrdersService) === "function" ? _a : Object, typeof (_b = typeof PaymentsService !== "undefined" && PaymentsService) === "function" ? _b : Object, typeof (_c = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _c : Object])
], PublicPaymentsController);
export { PublicPaymentsController };
