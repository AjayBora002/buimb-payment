var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaymentsService_1;
var _a, _b, _c;
import { Injectable, BadRequestException, NotFoundException, ConflictException, Logger, } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import { assertValidTransition, InvalidStateTransitionError, } from '@buimbpay/payments';
import { MockProvider } from '@buimbpay/payments';
import { PaymentIntentStatus, Environment, RiskOutcome, } from '@prisma/client';
import { LedgerService } from '../ledger/ledger.service.js';
import { RiskService } from '../risk/risk.service.js';
import { randomUUID } from 'crypto';
let PaymentsService = PaymentsService_1 = class PaymentsService {
    prisma;
    ledgerService;
    riskService;
    logger = new Logger(PaymentsService_1.name);
    mockProvider = new MockProvider();
    constructor(prisma, ledgerService, riskService) {
        this.prisma = prisma;
        this.ledgerService = ledgerService;
        this.riskService = riskService;
    }
    async recordCaptureLedgerEntry(intentId, amount, currency, tx) {
        const [cashAccount, escrowAccount] = await Promise.all([
            this.ledgerService.getOrCreateAccount('PLATFORM_CASH', { name: 'Platform Cash', type: 'ASSET' }, tx),
            this.ledgerService.getOrCreateAccount('PLATFORM_ESCROW', { name: 'Merchant Escrow Payable', type: 'LIABILITY' }, tx),
        ]);
        await this.ledgerService.recordTransaction({
            type: 'PAYMENT_CAPTURE',
            description: `Capture payment intent ${intentId}`,
            paymentIntentId: intentId,
            entries: [
                {
                    debitAccountId: cashAccount.id,
                    creditAccountId: escrowAccount.id,
                    amount,
                    currency,
                    description: `Captured funds placed in escrow: ${intentId}`,
                },
            ],
        }, tx);
    }
    async createPaymentIntent(merchantId, orderId, data, environment = Environment.SANDBOX) {
        const order = await this.prisma.order.findFirst({
            where: { id: orderId, merchantId },
        });
        if (!order) {
            throw new NotFoundException(`Order ${orderId} not found`);
        }
        const clientSecret = `pi_secret_${randomUUID().replace(/-/g, '')}`;
        return this.prisma.paymentIntent.create({
            data: {
                orderId,
                merchantId,
                amount: order.amount,
                currency: order.currency,
                captureMethod: data.captureMethod ?? 'AUTOMATIC',
                description: data.description,
                statementDescriptor: data.statementDescriptor,
                metadata: data.metadata,
                clientSecret,
                status: PaymentIntentStatus.CREATED,
                environment,
            },
        });
    }
    async confirmPaymentIntent(merchantId, paymentIntentId, data) {
        const intent = await this.findOneOrThrow(merchantId, paymentIntentId);
        // Never trust client for payment status
        if (intent.status !== PaymentIntentStatus.CREATED &&
            intent.status !== PaymentIntentStatus.REQUIRES_ACTION) {
            throw new BadRequestException(`Payment intent is in ${intent.status} state and cannot be confirmed`);
        }
        // Transition to PROCESSING
        try {
            assertValidTransition(intent.status, PaymentIntentStatus.PROCESSING);
        }
        catch (e) {
            if (e instanceof InvalidStateTransitionError) {
                throw new BadRequestException(e.message);
            }
            throw e;
        }
        // Call mock provider (sandbox only)
        const providerResponse = await this.mockProvider.createPayment({
            amount: Number(intent.amount),
            currency: intent.currency,
            paymentMethodType: data.paymentMethodType,
            simulateOutcome: data.simulateOutcome ?? 'success',
        });
        // Risk evaluation: Score the payment before deciding final state
        const riskDecision = await this.riskService.evaluatePayment(merchantId, paymentIntentId, {
            amount: Number(intent.amount),
        });
        // If risk decision blocks the payment, fail it
        if (riskDecision.outcome === RiskOutcome.DECLINE) {
            this.logger.warn(`Payment ${paymentIntentId} declined by risk engine: ${riskDecision.reasonCodes.join(', ')}`);
            return this.prisma.$transaction(async (tx) => {
                await tx.paymentAttempt.create({
                    data: {
                        paymentIntentId: intent.id,
                        amount: intent.amount,
                        currency: intent.currency,
                        status: 'FAILED',
                        errorCode: 'RISK_DECLINE',
                        errorMessage: 'Payment declined by risk evaluation',
                    },
                });
                await tx.paymentIntent.update({
                    where: { id: intent.id },
                    data: {
                        status: PaymentIntentStatus.FAILED,
                        version: intent.version + 1,
                    },
                });
                return tx.paymentIntent.findUniqueOrThrow({ where: { id: intent.id } });
            });
        }
        // If risk decision requires step-up (e.g., 3D Secure), transition to REQUIRES_ACTION
        if (riskDecision.outcome === RiskOutcome.ALLOW_WITH_STEP_UP) {
            this.logger.debug(`Payment ${paymentIntentId} requires step-up due to risk: ${riskDecision.reasonCodes.join(', ')}`);
            return this.prisma.$transaction(async (tx) => {
                await tx.paymentAttempt.create({
                    data: {
                        paymentIntentId: intent.id,
                        amount: intent.amount,
                        currency: intent.currency,
                        status: 'PENDING',
                        providerRef: providerResponse.providerRef,
                    },
                });
                await tx.paymentIntent.update({
                    where: { id: intent.id },
                    data: {
                        status: PaymentIntentStatus.REQUIRES_ACTION,
                        providerRef: providerResponse.providerRef,
                        version: intent.version + 1,
                    },
                });
                return tx.paymentIntent.findUniqueOrThrow({ where: { id: intent.id } });
            });
        }
        // If risk decision requires manual review, hold the payment
        if (riskDecision.outcome === RiskOutcome.REVIEW) {
            this.logger.warn(`Payment ${paymentIntentId} flagged for manual review: ${riskDecision.reasonCodes.join(', ')}`);
            // For now, we'll still allow the payment but flag it in audit
            // In production, you might want to put this in a HOLD state or similar
        }
        // Determine next state based on provider response, respecting state machine
        let newStatus;
        let immediateCapture = false;
        if (providerResponse.status === 'authorised') {
            // Auto-capture flow: PROCESSING → AUTHORISED → CAPTURED
            if (intent.captureMethod === 'AUTOMATIC') {
                newStatus = PaymentIntentStatus.AUTHORISED;
                immediateCapture = true;
            }
            else {
                // Manual capture required
                newStatus = PaymentIntentStatus.AUTHORISED;
            }
        }
        else if (providerResponse.status === 'requires_action') {
            newStatus = PaymentIntentStatus.REQUIRES_ACTION;
        }
        else {
            newStatus = PaymentIntentStatus.FAILED;
        }
        // Validate the transition from PROCESSING to newStatus
        try {
            assertValidTransition(PaymentIntentStatus.PROCESSING, newStatus);
        }
        catch (e) {
            if (e instanceof InvalidStateTransitionError) {
                this.logger.error(`Invalid state transition after provider response: PROCESSING → ${newStatus}`, e.message);
                // Fall back to FAILED if the intended transition is invalid
                newStatus = PaymentIntentStatus.FAILED;
            }
            else {
                throw e;
            }
        }
        // For auto-capture, validate AUTHORISED → CAPTURED
        if (immediateCapture) {
            try {
                assertValidTransition(PaymentIntentStatus.AUTHORISED, PaymentIntentStatus.CAPTURED);
                newStatus = PaymentIntentStatus.CAPTURED;
            }
            catch (e) {
                if (e instanceof InvalidStateTransitionError) {
                    this.logger.error('Auto-capture transition failed: AUTHORISED → CAPTURED is invalid', e.message);
                    // Keep at AUTHORISED, let manual capture handle it
                }
                // Fall through with newStatus = AUTHORISED
            }
        }
        return this.prisma.$transaction(async (tx) => {
            // Record the attempt
            await tx.paymentAttempt.create({
                data: {
                    paymentIntentId: intent.id,
                    amount: intent.amount,
                    currency: intent.currency,
                    status: newStatus === PaymentIntentStatus.CAPTURED
                        ? 'CAPTURED'
                        : newStatus === PaymentIntentStatus.FAILED
                            ? 'FAILED'
                            : 'PENDING',
                    providerRef: providerResponse.providerRef,
                    providerResponse: {
                        ...providerResponse,
                        // Strip any sensitive values before persisting
                    },
                    errorCode: providerResponse.errorCode,
                    errorMessage: providerResponse.errorMessage,
                },
            });
            // Update intent state — atomic with optimistic locking
            const updated = await tx.paymentIntent.updateMany({
                where: { id: intent.id, version: intent.version },
                data: {
                    status: newStatus,
                    providerRef: providerResponse.providerRef,
                    capturedAt: newStatus === PaymentIntentStatus.CAPTURED ? new Date() : undefined,
                    captureAmount: newStatus === PaymentIntentStatus.CAPTURED
                        ? intent.amount
                        : undefined,
                    version: intent.version + 1,
                },
            });
            if (updated.count === 0) {
                throw new ConflictException('Payment intent was modified concurrently. Please retry.');
            }
            if (newStatus === PaymentIntentStatus.CAPTURED) {
                await this.recordCaptureLedgerEntry(intent.id, intent.amount, intent.currency, tx);
            }
            return tx.paymentIntent.findUniqueOrThrow({ where: { id: intent.id } });
        });
    }
    async capturePaymentIntent(merchantId, paymentIntentId, captureAmount) {
        const intent = await this.findOneOrThrow(merchantId, paymentIntentId);
        try {
            assertValidTransition(intent.status, PaymentIntentStatus.CAPTURED);
        }
        catch (e) {
            if (e instanceof InvalidStateTransitionError) {
                throw new BadRequestException(e.message);
            }
            throw e;
        }
        const finalAmount = captureAmount
            ? BigInt(captureAmount)
            : intent.amount;
        if (finalAmount > intent.amount) {
            throw new BadRequestException('Capture amount cannot exceed authorised amount');
        }
        return this.prisma.$transaction(async (tx) => {
            const updated = await tx.paymentIntent.updateMany({
                where: { id: intent.id, version: intent.version },
                data: {
                    status: PaymentIntentStatus.CAPTURED,
                    capturedAt: new Date(),
                    captureAmount: finalAmount,
                    version: intent.version + 1,
                },
            });
            if (updated.count === 0) {
                throw new ConflictException('Payment intent was modified concurrently. Please retry.');
            }
            await this.recordCaptureLedgerEntry(intent.id, finalAmount, intent.currency, tx);
            return tx.paymentIntent.findUniqueOrThrow({ where: { id: intent.id } });
        });
    }
    async cancelPaymentIntent(merchantId, paymentIntentId, reason) {
        const intent = await this.findOneOrThrow(merchantId, paymentIntentId);
        try {
            assertValidTransition(intent.status, PaymentIntentStatus.CANCELLED);
        }
        catch (e) {
            if (e instanceof InvalidStateTransitionError) {
                throw new BadRequestException(e.message);
            }
            throw e;
        }
        return this.prisma.paymentIntent.update({
            where: { id: intent.id },
            data: {
                status: PaymentIntentStatus.CANCELLED,
                cancelledAt: new Date(),
                cancelReason: reason,
                version: intent.version + 1,
            },
        });
    }
    async findOne(merchantId, id) {
        return this.prisma.paymentIntent.findFirst({
            where: { id, merchantId },
            include: { attempts: true, refunds: true },
        });
    }
    async findAll(merchantId, opts) {
        const limit = Math.min(opts.limit ?? 20, 100);
        const items = await this.prisma.paymentIntent.findMany({
            where: {
                merchantId,
                ...(opts.status ? { status: opts.status } : {}),
                ...(opts.environment ? { environment: opts.environment } : {}),
                ...(opts.cursor ? { id: { lt: opts.cursor } } : {}),
            },
            orderBy: { createdAt: 'desc' },
            take: limit + 1,
        });
        const hasMore = items.length > limit;
        const data = hasMore ? items.slice(0, limit) : items;
        return {
            data,
            hasMore,
            nextCursor: hasMore ? data[data.length - 1]?.id : undefined,
        };
    }
    async findOneOrThrow(merchantId, id) {
        const intent = await this.findOne(merchantId, id);
        if (!intent) {
            throw new NotFoundException(`Payment intent ${id} not found`);
        }
        return intent;
    }
};
PaymentsService = PaymentsService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object, typeof (_b = typeof LedgerService !== "undefined" && LedgerService) === "function" ? _b : Object, typeof (_c = typeof RiskService !== "undefined" && RiskService) === "function" ? _c : Object])
], PaymentsService);
export { PaymentsService };
