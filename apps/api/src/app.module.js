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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const iam_module_js_1 = require("./modules/iam/iam.module.js");
const merchants_module_js_1 = require("./modules/merchants/merchants.module.js");
const payments_module_js_1 = require("./modules/payments/payments.module.js");
const refunds_module_js_1 = require("./modules/refunds/refunds.module.js");
const payment_links_module_js_1 = require("./modules/payment-links/payment-links.module.js");
const subscriptions_module_js_1 = require("./modules/subscriptions/subscriptions.module.js");
const settlements_module_js_1 = require("./modules/settlements/settlements.module.js");
const ledger_module_js_1 = require("./modules/ledger/ledger.module.js");
const webhooks_module_js_1 = require("./modules/webhooks/webhooks.module.js");
const audit_module_js_1 = require("./modules/audit/audit.module.js");
const risk_module_js_1 = require("./modules/risk/risk.module.js");
const health_module_js_1 = require("./modules/health/health.module.js");
const database_module_js_1 = require("./common/database/database.module.js");
const redis_module_js_1 = require("./common/redis/redis.module.js");
let AppModule = (() => {
    let _classDecorators = [(0, common_1.Module)({
            imports: [
                // ── Rate limiting — defence-in-depth ──────────────────────────────────
                throttler_1.ThrottlerModule.forRoot([
                    { name: 'short', ttl: 1000, limit: 10 }, // 10 req/s
                    { name: 'medium', ttl: 60000, limit: 200 }, // 200 req/min
                    { name: 'long', ttl: 3600000, limit: 1000 }, // 1000 req/hr
                ]),
                // ── Infrastructure ────────────────────────────────────────────────────
                database_module_js_1.DatabaseModule,
                redis_module_js_1.RedisModule,
                // ── Domain modules ────────────────────────────────────────────────────
                iam_module_js_1.IamModule,
                merchants_module_js_1.MerchantsModule,
                payments_module_js_1.PaymentsModule,
                refunds_module_js_1.RefundsModule,
                payment_links_module_js_1.PaymentLinksModule,
                subscriptions_module_js_1.SubscriptionsModule,
                settlements_module_js_1.SettlementsModule,
                ledger_module_js_1.LedgerModule,
                webhooks_module_js_1.WebhooksModule,
                audit_module_js_1.AuditModule,
                risk_module_js_1.RiskModule,
                health_module_js_1.HealthModule,
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppModule = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AppModule = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return AppModule = _classThis;
})();
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map