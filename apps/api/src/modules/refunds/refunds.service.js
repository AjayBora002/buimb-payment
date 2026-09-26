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
exports.RefundsService = void 0;
const common_1 = require("@nestjs/common");
const payments_1 = require("@buimbpay/payments");
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
let RefundsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RefundsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            RefundsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        prisma;
        mockProvider = new payments_1.MockProvider();
        constructor(prisma) {
            this.prisma = prisma;
        }
        async createRefund(merchantId, userId, data) {
            const key = data.idempotencyKey || `ref_idem_${(0, crypto_1.randomUUID)().replace(/-/g, '')}`;
            const existing = await this.prisma.refund.findUnique({
                where: { idempotencyKey: key },
            });
            if (existing) {
                return existing;
            }
            const pi = await this.prisma.paymentIntent.findFirst({
                where: { id: data.paymentIntentId, merchantId },
                include: { refunds: true },
            });
            if (!pi) {
                throw new common_1.NotFoundException(`Payment intent ${data.paymentIntentId} not found`);
            }
            if (!(0, payments_1.canRefund)(pi.status)) {
                throw new common_1.BadRequestException(`Cannot refund payment intent in status ${pi.status}`);
            }
            const totalRefunded = pi.refunds
                .filter((r) => r.status === client_1.RefundStatus.SUCCESS)
                .reduce((sum, r) => sum + r.amount, 0n);
            const refundAmount = data.amount ? BigInt(data.amount) : pi.amount - totalRefunded;
            if (refundAmount <= 0n) {
                throw new common_1.BadRequestException('Refund amount must be positive');
            }
            if (totalRefunded + refundAmount > pi.amount) {
                throw new common_1.BadRequestException(`Refund amount exceeds remaining captured amount (${pi.amount - totalRefunded})`);
            }
            // Call provider (MockProvider in sandbox)
            const providerResult = await this.mockProvider.refundPayment({
                providerPaymentId: pi.providerRef || 'sim_pay_demo',
                amount: Number(refundAmount),
                currency: pi.currency,
                reason: data.reason,
            });
            return this.prisma.$transaction(async (tx) => {
                const refund = await tx.refund.create({
                    data: {
                        paymentIntentId: pi.id,
                        merchantId,
                        idempotencyKey: key,
                        amount: refundAmount,
                        currency: pi.currency,
                        status: providerResult.status === 'success' ? client_1.RefundStatus.SUCCESS : client_1.RefundStatus.FAILED,
                        reason: data.reason,
                        notes: data.notes,
                        providerRef: providerResult.providerRefundId,
                        providerResponse: providerResult.rawResponse,
                        initiatedBy: userId,
                        processedAt: new Date(),
                    },
                });
                const newTotalRefunded = totalRefunded + (refund.status === client_1.RefundStatus.SUCCESS ? refundAmount : 0n);
                const isFullyRefunded = newTotalRefunded >= pi.amount;
                await tx.paymentIntent.update({
                    where: { id: pi.id },
                    data: {
                        status: isFullyRefunded
                            ? client_1.PaymentIntentStatus.REFUNDED
                            : client_1.PaymentIntentStatus.PARTIALLY_REFUNDED,
                        version: { increment: 1 },
                    },
                });
                return refund;
            });
        }
        async findRefund(merchantId, id) {
            const refund = await this.prisma.refund.findFirst({
                where: { id, merchantId },
                include: { paymentIntent: true },
            });
            if (!refund) {
                throw new common_1.NotFoundException(`Refund ${id} not found`);
            }
            return refund;
        }
        async listRefunds(merchantId, query = {}) {
            const limit = Math.min(query.limit ?? 20, 100);
            const items = await this.prisma.refund.findMany({
                where: { merchantId },
                take: limit + 1,
                ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
                orderBy: { createdAt: 'desc' },
                include: {
                    paymentIntent: {
                        select: {
                            id: true,
                            amount: true,
                            currency: true,
                            status: true,
                        },
                    },
                },
            });
            const hasMore = items.length > limit;
            const result = hasMore ? items.slice(0, limit) : items;
            const nextCursor = hasMore ? result[result.length - 1].id : null;
            return { items: result, nextCursor };
        }
    };
    return RefundsService = _classThis;
})();
exports.RefundsService = RefundsService;
//# sourceMappingURL=refunds.service.js.map