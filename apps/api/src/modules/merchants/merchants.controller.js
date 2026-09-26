"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_js_1 = require("../iam/guards/jwt-auth.guard.js");
const client_1 = require("@prisma/client");
let MerchantsController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Merchants'), (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)({ path: 'merchants', version: '1' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getCurrent_decorators;
    let _updateCurrent_decorators;
    let _submitKyc_decorators;
    let _getBankAccounts_decorators;
    let _addBankAccount_decorators;
    let _listApiKeys_decorators;
    let _createApiKey_decorators;
    let _revokeApiKey_decorators;
    var MerchantsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getCurrent_decorators = [(0, common_1.Get)('current'), (0, swagger_1.ApiOperation)({ summary: 'Get current authenticated merchant' })];
            _updateCurrent_decorators = [(0, common_1.Put)('current'), (0, swagger_1.ApiOperation)({ summary: 'Update merchant settings' })];
            _submitKyc_decorators = [(0, common_1.Post)('current/kyc'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Submit KYC information' })];
            _getBankAccounts_decorators = [(0, common_1.Get)('current/bank-accounts'), (0, swagger_1.ApiOperation)({ summary: 'List settlement bank accounts' })];
            _addBankAccount_decorators = [(0, common_1.Post)('current/bank-accounts'), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Add settlement bank account' })];
            _listApiKeys_decorators = [(0, common_1.Get)('current/api-keys'), (0, swagger_1.ApiOperation)({ summary: 'List merchant API keys' })];
            _createApiKey_decorators = [(0, common_1.Post)('current/api-keys'), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Create a new API key' })];
            _revokeApiKey_decorators = [(0, common_1.Delete)('current/api-keys/:keyId'), (0, swagger_1.ApiOperation)({ summary: 'Revoke an API key' })];
            __esDecorate(this, null, _getCurrent_decorators, { kind: "method", name: "getCurrent", static: false, private: false, access: { has: obj => "getCurrent" in obj, get: obj => obj.getCurrent }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _updateCurrent_decorators, { kind: "method", name: "updateCurrent", static: false, private: false, access: { has: obj => "updateCurrent" in obj, get: obj => obj.updateCurrent }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _submitKyc_decorators, { kind: "method", name: "submitKyc", static: false, private: false, access: { has: obj => "submitKyc" in obj, get: obj => obj.submitKyc }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getBankAccounts_decorators, { kind: "method", name: "getBankAccounts", static: false, private: false, access: { has: obj => "getBankAccounts" in obj, get: obj => obj.getBankAccounts }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _addBankAccount_decorators, { kind: "method", name: "addBankAccount", static: false, private: false, access: { has: obj => "addBankAccount" in obj, get: obj => obj.addBankAccount }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _listApiKeys_decorators, { kind: "method", name: "listApiKeys", static: false, private: false, access: { has: obj => "listApiKeys" in obj, get: obj => obj.listApiKeys }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _createApiKey_decorators, { kind: "method", name: "createApiKey", static: false, private: false, access: { has: obj => "createApiKey" in obj, get: obj => obj.createApiKey }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _revokeApiKey_decorators, { kind: "method", name: "revokeApiKey", static: false, private: false, access: { has: obj => "revokeApiKey" in obj, get: obj => obj.revokeApiKey }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MerchantsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        merchantsService = __runInitializers(this, _instanceExtraInitializers);
        constructor(merchantsService) {
            this.merchantsService = merchantsService;
        }
        async getCurrent(req) {
            const merchantId = req.user.merchantId;
            return this.merchantsService.getMerchant(merchantId);
        }
        async updateCurrent(req, body) {
            const merchantId = req.user.merchantId;
            return this.merchantsService.updateMerchant(merchantId, body);
        }
        async submitKyc(req, body) {
            const merchantId = req.user.merchantId;
            return this.merchantsService.submitKyc(merchantId, body);
        }
        async getBankAccounts(req) {
            const merchantId = req.user.merchantId;
            return this.merchantsService.getBankAccounts(merchantId);
        }
        async addBankAccount(req, body) {
            const merchantId = req.user.merchantId;
            return this.merchantsService.addBankAccount(merchantId, body);
        }
        async listApiKeys(req) {
            const merchantId = req.user.merchantId;
            return this.merchantsService.listApiKeys(merchantId);
        }
        async createApiKey(req, body) {
            const merchantId = req.user.merchantId;
            const userId = req.user.sub;
            return this.merchantsService.createApiKey(merchantId, userId, {
                name: body.name,
                environment: body.environment ?? client_1.Environment.SANDBOX,
                scopes: body.scopes,
            });
        }
        async revokeApiKey(req, keyId) {
            const merchantId = req.user.merchantId;
            const userId = req.user.sub;
            return this.merchantsService.revokeApiKey(merchantId, keyId, userId);
        }
    };
    return MerchantsController = _classThis;
})();
exports.MerchantsController = MerchantsController;
//# sourceMappingURL=merchants.controller.js.map