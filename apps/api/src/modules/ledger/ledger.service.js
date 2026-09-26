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
exports.LedgerService = void 0;
const common_1 = require("@nestjs/common");
let LedgerService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LedgerService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LedgerService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        prisma;
        constructor(prisma) {
            this.prisma = prisma;
        }
        async recordTransaction(data) {
            if (!data.entries || data.entries.length === 0) {
                throw new common_1.BadRequestException('Transaction must contain at least one ledger entry');
            }
            // Double-entry validation: each entry has matching debit and credit accounts and positive amount
            for (const entry of data.entries) {
                const amt = BigInt(entry.amount);
                if (amt <= 0n) {
                    throw new common_1.BadRequestException('Ledger entry amount must be strictly positive');
                }
                if (entry.debitAccountId === entry.creditAccountId) {
                    throw new common_1.BadRequestException('Debit and credit accounts must be distinct');
                }
            }
            return this.prisma.$transaction(async (tx) => {
                const transaction = await tx.ledgerTransaction.create({
                    data: {
                        type: data.type,
                        description: data.description,
                        referenceId: data.referenceId,
                        paymentIntentId: data.paymentIntentId,
                        actorId: data.actorId,
                    },
                });
                const entryRecords = data.entries.map((e) => ({
                    ledgerTransactionId: transaction.id,
                    debitAccountId: e.debitAccountId,
                    creditAccountId: e.creditAccountId,
                    amount: BigInt(e.amount),
                    currency: e.currency.toUpperCase(),
                    description: e.description,
                }));
                await tx.ledgerEntry.createMany({
                    data: entryRecords,
                });
                return transaction;
            });
        }
        async listAccounts(merchantId) {
            return this.prisma.ledgerAccount.findMany({
                where: merchantId ? { merchantId } : {},
                orderBy: { code: 'asc' },
            });
        }
        async listTransactions(query = {}) {
            const limit = Math.min(query.limit ?? 20, 100);
            const where = {};
            if (query.paymentIntentId)
                where.paymentIntentId = query.paymentIntentId;
            const items = await this.prisma.ledgerTransaction.findMany({
                where,
                take: limit + 1,
                ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
                orderBy: { createdAt: 'desc' },
                include: {
                    entries: {
                        include: {
                            debitAccount: { select: { code: true, name: true, type: true } },
                            creditAccount: { select: { code: true, name: true, type: true } },
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
    return LedgerService = _classThis;
})();
exports.LedgerService = LedgerService;
//# sourceMappingURL=ledger.service.js.map