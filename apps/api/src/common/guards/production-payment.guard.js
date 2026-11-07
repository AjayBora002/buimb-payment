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
/**
 * PRODUCTION PAYMENT GUARD
 *
 * This guard MUST be applied to every endpoint that touches live payment
 * processing, payouts, live API key creation, or live settlement.
 *
 * It only blocks requests where the request environment is PRODUCTION.
 * Sandbox requests are always allowed.
 *
 * For production requests, it throws a 503 unless:
 *   PAYMENT_PRODUCTION_ENABLED === 'true'
 *
 * Removing or bypassing this guard requires multi-person operator approval
 * after all regulatory, banking, PCI, and security sign-offs are complete.
 */
import { Injectable, Optional, ServiceUnavailableException, } from '@nestjs/common';
import { Environment } from '@prisma/client';
import { PrismaService } from '../database/prisma.service.js';
let ProductionPaymentGuard = class ProductionPaymentGuard {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        let requestEnvironment = request.environment;
        // If environment wasn't set by ApiKeyGuard (e.g. public checkout endpoints),
        // resolve environment from the target order or payment intent
        if (!requestEnvironment && this.prisma) {
            try {
                const orderId = request.body?.orderId ||
                    request.params?.orderId ||
                    (request.url?.includes('orders/public') ? request.params?.id : undefined);
                const intentId = request.body?.paymentIntentId ||
                    (request.url?.includes('payment-intents/public') ? request.params?.id : undefined);
                if (orderId) {
                    const order = await this.prisma.order.findUnique({
                        where: { id: orderId },
                        select: { environment: true },
                    });
                    if (order) {
                        requestEnvironment = order.environment;
                    }
                }
                else if (intentId) {
                    const intent = await this.prisma.paymentIntent.findUnique({
                        where: { id: intentId },
                        select: { environment: true },
                    });
                    if (intent) {
                        requestEnvironment = intent.environment;
                    }
                }
            }
            catch {
                // Fall back to SANDBOX if database lookup fails
            }
        }
        // Default to SANDBOX if unassigned (sandbox mock checkout is always safe to run)
        requestEnvironment = requestEnvironment || Environment.SANDBOX;
        // Only enforce production guard for PRODUCTION environment requests
        if (requestEnvironment === Environment.PRODUCTION) {
            const productionEnabled = process.env.PAYMENT_PRODUCTION_ENABLED === 'true';
            if (!productionEnabled) {
                throw new ServiceUnavailableException({
                    type: 'production_disabled',
                    code: 'PRODUCTION_NOT_ENABLED',
                    message: 'Live payment processing is not enabled on this platform. ' +
                        'All required regulatory, banking, security, and compliance ' +
                        'approvals must be completed before production payments can be processed.',
                    documentationUrl: 'https://docs.buimbpay.in/compliance/production-readiness',
                });
            }
        }
        return true;
    }
};
ProductionPaymentGuard = __decorate([
    Injectable(),
    __param(0, Optional()),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object])
], ProductionPaymentGuard);
export { ProductionPaymentGuard };
