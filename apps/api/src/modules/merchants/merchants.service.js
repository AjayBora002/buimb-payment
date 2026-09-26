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
exports.MerchantsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
let MerchantsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MerchantsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MerchantsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        prisma;
        constructor(prisma) {
            this.prisma = prisma;
        }
        async getMerchant(merchantId) {
            const merchant = await this.prisma.merchant.findUnique({
                where: { id: merchantId },
                include: {
                    bankAccounts: {
                        select: {
                            id: true,
                            accountNumberLast4: true,
                            ifsc: true,
                            bankName: true,
                            accountType: true,
                            status: true,
                            isPrimary: true,
                        },
                    },
                    documents: {
                        select: {
                            id: true,
                            documentType: true,
                            fileName: true,
                            status: true,
                            createdAt: true,
                        },
                    },
                },
            });
            if (!merchant) {
                throw new common_1.NotFoundException(`Merchant ${merchantId} not found`);
            }
            return merchant;
        }
        async updateMerchant(merchantId, data) {
            return this.prisma.merchant.update({
                where: { id: merchantId },
                data,
            });
        }
        async submitKyc(merchantId, data) {
            const merchant = await this.prisma.merchant.update({
                where: { id: merchantId },
                data: {
                    ...data,
                    kycStatus: client_1.KycStatus.UNDER_REVIEW,
                },
            });
            await this.prisma.kycCase.create({
                data: {
                    merchantId,
                    status: client_1.KycStatus.UNDER_REVIEW,
                    notes: 'KYC submitted via portal',
                },
            });
            return merchant;
        }
        async getBankAccounts(merchantId) {
            return this.prisma.bankAccount.findMany({
                where: { merchantId },
                orderBy: { createdAt: 'desc' },
            });
        }
        async addBankAccount(merchantId, data) {
            const last4 = data.accountNumber.slice(-4);
            // In production account number is encrypted with KMS
            return this.prisma.bankAccount.create({
                data: {
                    merchantId,
                    accountHolderName: data.accountHolderName,
                    accountNumber: data.accountNumber,
                    accountNumberLast4: last4,
                    ifsc: data.ifsc.toUpperCase(),
                    bankName: data.bankName,
                    accountType: data.accountType,
                    status: 'PENDING_VERIFICATION',
                },
            });
        }
        async listApiKeys(merchantId) {
            return this.prisma.apiKey.findMany({
                where: { merchantId, revokedAt: null },
                select: {
                    id: true,
                    name: true,
                    keyPrefix: true,
                    environment: true,
                    scopes: true,
                    status: true,
                    lastUsedAt: true,
                    createdAt: true,
                },
                orderBy: { createdAt: 'desc' },
            });
        }
        async createApiKey(merchantId, userId, data) {
            const prefix = data.environment === client_1.Environment.PRODUCTION ? 'bp_live_' : 'bp_test_';
            const secretRandom = (0, crypto_1.randomBytes)(24).toString('hex');
            const fullKey = `${prefix}${secretRandom}`;
            const keyHash = (0, crypto_1.createHash)('sha256').update(fullKey).digest('hex');
            const keyPrefix = `${prefix}${secretRandom.slice(0, 8)}...`;
            const apiKey = await this.prisma.apiKey.create({
                data: {
                    merchantId,
                    userId,
                    name: data.name,
                    keyHash,
                    keyPrefix,
                    environment: data.environment,
                    scopes: data.scopes || ['read', 'write'],
                    status: client_1.ApiKeyStatus.ACTIVE,
                },
            });
            // Return the secret key ONLY once here
            return {
                id: apiKey.id,
                name: apiKey.name,
                keyPrefix: apiKey.keyPrefix,
                environment: apiKey.environment,
                secretKey: fullKey,
                createdAt: apiKey.createdAt,
            };
        }
        async revokeApiKey(merchantId, keyId, userId) {
            const key = await this.prisma.apiKey.findFirst({
                where: { id: keyId, merchantId },
            });
            if (!key) {
                throw new common_1.NotFoundException('API key not found');
            }
            return this.prisma.apiKey.update({
                where: { id: keyId },
                data: {
                    status: client_1.ApiKeyStatus.REVOKED,
                    revokedAt: new Date(),
                    revokedBy: userId,
                },
            });
        }
    };
    return MerchantsService = _classThis;
})();
exports.MerchantsService = MerchantsService;
//# sourceMappingURL=merchants.service.js.map