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
exports.RiskController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_js_1 = require("../iam/guards/jwt-auth.guard.js");
let RiskController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Risk'), (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)({ path: 'risk', version: '1' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _listDecisions_decorators;
    let _listRules_decorators;
    var RiskController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _listDecisions_decorators = [(0, common_1.Get)('decisions'), (0, swagger_1.ApiOperation)({ summary: 'List risk engine evaluation decisions' })];
            _listRules_decorators = [(0, common_1.Get)('rules'), (0, swagger_1.ApiOperation)({ summary: 'List active risk rules' })];
            __esDecorate(this, null, _listDecisions_decorators, { kind: "method", name: "listDecisions", static: false, private: false, access: { has: obj => "listDecisions" in obj, get: obj => obj.listDecisions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _listRules_decorators, { kind: "method", name: "listRules", static: false, private: false, access: { has: obj => "listRules" in obj, get: obj => obj.listRules }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            RiskController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        riskService = __runInitializers(this, _instanceExtraInitializers);
        constructor(riskService) {
            this.riskService = riskService;
        }
        async listDecisions(req, cursor, limit) {
            const merchantId = req.user.merchantId;
            return this.riskService.listDecisions(merchantId, {
                cursor,
                limit: limit ? Number(limit) : undefined,
            });
        }
        async listRules() {
            return this.riskService.listRules();
        }
    };
    return RiskController = _classThis;
})();
exports.RiskController = RiskController;
//# sourceMappingURL=risk.controller.js.map