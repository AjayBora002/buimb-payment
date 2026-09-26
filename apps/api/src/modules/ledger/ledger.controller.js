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
exports.LedgerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_js_1 = require("../iam/guards/jwt-auth.guard.js");
let LedgerController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Ledger'), (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)({ path: 'ledger', version: '1' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _listAccounts_decorators;
    let _listTransactions_decorators;
    var LedgerController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _listAccounts_decorators = [(0, common_1.Get)('accounts'), (0, swagger_1.ApiOperation)({ summary: 'List ledger accounts' })];
            _listTransactions_decorators = [(0, common_1.Get)('transactions'), (0, swagger_1.ApiOperation)({ summary: 'List immutable ledger transactions' })];
            __esDecorate(this, null, _listAccounts_decorators, { kind: "method", name: "listAccounts", static: false, private: false, access: { has: obj => "listAccounts" in obj, get: obj => obj.listAccounts }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _listTransactions_decorators, { kind: "method", name: "listTransactions", static: false, private: false, access: { has: obj => "listTransactions" in obj, get: obj => obj.listTransactions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LedgerController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        ledgerService = __runInitializers(this, _instanceExtraInitializers);
        constructor(ledgerService) {
            this.ledgerService = ledgerService;
        }
        async listAccounts(req) {
            const merchantId = req.user.merchantId;
            return this.ledgerService.listAccounts(merchantId);
        }
        async listTransactions(paymentIntentId, cursor, limit) {
            return this.ledgerService.listTransactions({
                paymentIntentId,
                cursor,
                limit: limit ? Number(limit) : undefined,
            });
        }
    };
    return LedgerController = _classThis;
})();
exports.LedgerController = LedgerController;
//# sourceMappingURL=ledger.controller.js.map