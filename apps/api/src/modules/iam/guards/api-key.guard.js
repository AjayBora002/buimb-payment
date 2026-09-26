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
exports.ApiKeyGuard = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let ApiKeyGuard = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ApiKeyGuard = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ApiKeyGuard = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        prisma;
        constructor(prisma) {
            this.prisma = prisma;
        }
        async canActivate(context) {
            const request = context.switchToHttp().getRequest();
            const apiKeyHeader = request.headers['x-api-key'] || request.headers['authorization'];
            if (!apiKeyHeader) {
                throw new common_1.UnauthorizedException('API key is missing');
            }
            const key = typeof apiKeyHeader === 'string' && apiKeyHeader.startsWith('Bearer ')
                ? apiKeyHeader.substring(7)
                : apiKeyHeader;
            if (typeof key !== 'string' || !key.startsWith('bp_live_') && !key.startsWith('bp_test_')) {
                throw new common_1.UnauthorizedException('Invalid API key format');
            }
            const keyHash = (0, crypto_1.createHash)('sha256').update(key).digest('hex');
            const apiKey = await this.prisma.apiKey.findUnique({
                where: { keyHash },
                include: { merchant: true },
            });
            if (!apiKey || apiKey.revokedAt || (apiKey.expiresAt && apiKey.expiresAt < new Date())) {
                throw new common_1.UnauthorizedException('API key is invalid, revoked, or expired');
            }
            // Update lastUsedAt asynchronously
            this.prisma.apiKey.update({
                where: { id: apiKey.id },
                data: { lastUsedAt: new Date() },
            }).catch(() => { });
            request.merchantId = apiKey.merchantId;
            request.apiKey = apiKey;
            request.environment = apiKey.environment;
            return true;
        }
    };
    return ApiKeyGuard = _classThis;
})();
exports.ApiKeyGuard = ApiKeyGuard;
//# sourceMappingURL=api-key.guard.js.map