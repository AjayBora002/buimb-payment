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
exports.PaymentLinksService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
let PaymentLinksService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PaymentLinksService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PaymentLinksService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        prisma;
        constructor(prisma) {
            this.prisma = prisma;
        }
        async createPaymentLink(merchantId, userId, data, environment = client_1.Environment.SANDBOX) {
            const key = data.idempotencyKey || `plink_idem_${(0, crypto_1.randomUUID)().replace(/-/g, '')}`;
            const existing = await this.prisma.paymentLink.findUnique({
                where: { idempotencyKey: key },
            });
            if (existing) {
                return existing;
            }
            const slug = `pl_${(0, crypto_1.randomBytes)(6).toString('hex')}`;
            const expiresAt = data.expiresInHours
                ? new Date(Date.now() + data.expiresInHours * 3600 * 1000)
                : new Date(Date.now() + 7 * 24 * 3600 * 1000); // 7 days default
            return this.prisma.paymentLink.create({
                data: {
                    merchantId,
                    idempotencyKey: key,
                    slug,
                    amount: BigInt(data.amount),
                    currency: (data.currency || 'INR').toUpperCase(),
                    description: data.description,
                    customerName: data.customerName,
                    customerEmail: data.customerEmail,
                    customerPhone: data.customerPhone,
                    expiresAt,
                    customReference: data.customReference,
                    createdBy: userId,
                    environment,
                },
            });
        }
        async getPaymentLinkBySlug(slug) {
            const link = await this.prisma.paymentLink.findUnique({
                where: { slug },
                include: {
                    merchant: {
                        select: {
                            id: true,
                            displayName: true,
                            legalName: true,
                        },
                    },
                },
            });
            if (!link) {
                throw new common_1.NotFoundException(`Payment link not found`);
            }
            if (link.expiresAt && link.expiresAt < new Date()) {
                await this.prisma.paymentLink.update({
                    where: { id: link.id },
                    data: { status: client_1.PaymentLinkStatus.EXPIRED, expiredAt: new Date() },
                });
                throw new common_1.BadRequestException('This payment link has expired');
            }
            return link;
        }
        async findPaymentLink(merchantId, id) {
            const link = await this.prisma.paymentLink.findFirst({
                where: { id, merchantId },
            });
            if (!link) {
                throw new common_1.NotFoundException(`Payment link ${id} not found`);
            }
            return link;
        }
        async listPaymentLinks(merchantId, query = {}) {
            const limit = Math.min(query.limit ?? 20, 100);
            const where = { merchantId };
            if (query.status)
                where.status = query.status;
            const items = await this.prisma.paymentLink.findMany({
                where,
                take: limit + 1,
                ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
                orderBy: { createdAt: 'desc' },
            });
            const hasMore = items.length > limit;
            const result = hasMore ? items.slice(0, limit) : items;
            const nextCursor = hasMore ? result[result.length - 1].id : null;
            return { items: result, nextCursor };
        }
        async deactivatePaymentLink(merchantId, id) {
            const link = await this.prisma.paymentLink.findFirst({
                where: { id, merchantId },
            });
            if (!link) {
                throw new common_1.NotFoundException(`Payment link ${id} not found`);
            }
            return this.prisma.paymentLink.update({
                where: { id },
                data: {
                    status: client_1.PaymentLinkStatus.CANCELLED,
                    cancelledAt: new Date(),
                },
            });
        }
    };
    return PaymentLinksService = _classThis;
})();
exports.PaymentLinksService = PaymentLinksService;
//# sourceMappingURL=payment-links.service.js.map