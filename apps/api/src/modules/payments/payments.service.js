"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const payments_1 = require("@buimbpay/payments");
const payments_2 = require("@buimbpay/payments");
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
let PaymentsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PaymentsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PaymentsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        prisma;
        logger = new common_1.Logger(PaymentsService.name);
        mockProvider = new payments_2.MockProvider();
        constructor(prisma) {
            this.prisma = prisma;
        }
        async createPaymentIntent(merchantId, orderId, data, environment = client_1.Environment.SANDBOX) {
            const order = await this.prisma.order.findFirst({
                where: { id: orderId, merchantId },
            });
            if (!order) {
                throw new common_1.NotFoundException(`Order ${orderId} not found`);
            }
            const clientSecret = `pi_secret_${(0, crypto_1.randomUUID)().replace(/-/g, '')}`;
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
                    status: client_1.PaymentIntentStatus.CREATED,
                    environment,
                },
            });
        }
        async confirmPaymentIntent(merchantId, paymentIntentId, data) {
            const intent = await this.findOneOrThrow(merchantId, paymentIntentId);
            // Never trust client for payment status
            if (intent.status !== client_1.PaymentIntentStatus.CREATED &&
                intent.status !== client_1.PaymentIntentStatus.REQUIRES_ACTION) {
                throw new common_1.BadRequestException(`Payment intent is in ${intent.status} state and cannot be confirmed`);
            }
            // Transition to PROCESSING
            try {
                (0, payments_1.assertValidTransition)(intent.status, client_1.PaymentIntentStatus.PROCESSING);
            }
            catch (e) {
                if (e instanceof payments_1.InvalidStateTransitionError) {
                    throw new common_1.BadRequestException(e.message);
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
            const newStatus = providerResponse.status === 'authorised'
                ? client_1.PaymentIntentStatus.CAPTURED // auto-capture flow
                : providerResponse.status === 'requires_action'
                    ? client_1.PaymentIntentStatus.REQUIRES_ACTION
                    : client_1.PaymentIntentStatus.FAILED;
            return this.prisma.$transaction(async (tx) => {
                // Record the attempt
                await tx.paymentAttempt.create({
                    data: {
                        paymentIntentId: intent.id,
                        amount: intent.amount,
                        currency: intent.currency,
                        status: newStatus === client_1.PaymentIntentStatus.CAPTURED
                            ? 'CAPTURED'
                            : newStatus === client_1.PaymentIntentStatus.FAILED
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
                        capturedAt: newStatus === client_1.PaymentIntentStatus.CAPTURED ? new Date() : undefined,
                        captureAmount: newStatus === client_1.PaymentIntentStatus.CAPTURED
                            ? intent.amount
                            : undefined,
                        version: intent.version + 1,
                    },
                });
                if (updated.count === 0) {
                    throw new common_1.ConflictException('Payment intent was modified concurrently. Please retry.');
                }
                return tx.paymentIntent.findUniqueOrThrow({ where: { id: intent.id } });
            });
        }
        async capturePaymentIntent(merchantId, paymentIntentId, captureAmount) {
            const intent = await this.findOneOrThrow(merchantId, paymentIntentId);
            try {
                (0, payments_1.assertValidTransition)(intent.status, client_1.PaymentIntentStatus.CAPTURED);
            }
            catch (e) {
                if (e instanceof payments_1.InvalidStateTransitionError) {
                    throw new common_1.BadRequestException(e.message);
                }
                throw e;
            }
            const finalAmount = captureAmount
                ? BigInt(captureAmount)
                : intent.amount;
            if (finalAmount > intent.amount) {
                throw new common_1.BadRequestException('Capture amount cannot exceed authorised amount');
            }
            return this.prisma.paymentIntent.update({
                where: { id: intent.id },
                data: {
                    status: client_1.PaymentIntentStatus.CAPTURED,
                    capturedAt: new Date(),
                    captureAmount: finalAmount,
                    version: intent.version + 1,
                },
            });
        }
        async cancelPaymentIntent(merchantId, paymentIntentId, reason) {
            const intent = await this.findOneOrThrow(merchantId, paymentIntentId);
            try {
                (0, payments_1.assertValidTransition)(intent.status, client_1.PaymentIntentStatus.CANCELLED);
            }
            catch (e) {
                if (e instanceof payments_1.InvalidStateTransitionError) {
                    throw new common_1.BadRequestException(e.message);
                }
                throw e;
            }
            return this.prisma.paymentIntent.update({
                where: { id: intent.id },
                data: {
                    status: client_1.PaymentIntentStatus.CANCELLED,
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
                throw new common_1.NotFoundException(`Payment intent ${id} not found`);
            }
            return intent;
        }
    };
    return PaymentsService = _classThis;
})();
exports.PaymentsService = PaymentsService;
//# sourceMappingURL=payments.service.js.map