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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let OrdersService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var OrdersService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            OrdersService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        prisma;
        constructor(prisma) {
            this.prisma = prisma;
        }
        async createOrder(merchantId, data, environment = client_1.Environment.SANDBOX) {
            return this.prisma.order.create({
                data: {
                    merchantId,
                    amount: BigInt(data.amount),
                    currency: data.currency.toUpperCase(),
                    description: data.description,
                    externalOrderId: data.externalOrderId,
                    receiptEmail: data.receiptEmail,
                    customerId: data.customerId,
                    metadata: data.metadata,
                    notes: data.notes,
                    environment,
                },
            });
        }
        async findOrder(merchantId, id) {
            const order = await this.prisma.order.findFirst({
                where: { id, merchantId },
                include: {
                    paymentIntents: {
                        select: {
                            id: true,
                            status: true,
                            amount: true,
                            currency: true,
                            createdAt: true,
                        },
                    },
                    customer: true,
                },
            });
            if (!order) {
                throw new common_1.NotFoundException(`Order ${id} not found`);
            }
            return order;
        }
        async findOrders(merchantId, query = {}) {
            const limit = Math.min(query.limit ?? 20, 100);
            const where = { merchantId };
            if (query.environment) {
                where.environment = query.environment;
            }
            const items = await this.prisma.order.findMany({
                where,
                take: limit + 1,
                ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
                orderBy: { createdAt: 'desc' },
                include: {
                    paymentIntents: {
                        select: {
                            id: true,
                            status: true,
                            amount: true,
                            createdAt: true,
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
    return OrdersService = _classThis;
})();
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map