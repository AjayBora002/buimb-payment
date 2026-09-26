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
exports.SubscriptionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_js_1 = require("../iam/guards/jwt-auth.guard.js");
let SubscriptionsController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Subscriptions'), (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)({ path: 'subscriptions', version: '1' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createPlan_decorators;
    let _listPlans_decorators;
    let _createSubscription_decorators;
    let _findOne_decorators;
    let _findAll_decorators;
    let _cancel_decorators;
    var SubscriptionsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _createPlan_decorators = [(0, common_1.Post)('plans'), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Create a subscription plan' })];
            _listPlans_decorators = [(0, common_1.Get)('plans'), (0, swagger_1.ApiOperation)({ summary: 'List subscription plans' })];
            _createSubscription_decorators = [(0, common_1.Post)(), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Create a subscription' })];
            _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Get subscription by ID' })];
            _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'List subscriptions' })];
            _cancel_decorators = [(0, common_1.Delete)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Cancel a subscription' })];
            __esDecorate(this, null, _createPlan_decorators, { kind: "method", name: "createPlan", static: false, private: false, access: { has: obj => "createPlan" in obj, get: obj => obj.createPlan }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _listPlans_decorators, { kind: "method", name: "listPlans", static: false, private: false, access: { has: obj => "listPlans" in obj, get: obj => obj.listPlans }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _createSubscription_decorators, { kind: "method", name: "createSubscription", static: false, private: false, access: { has: obj => "createSubscription" in obj, get: obj => obj.createSubscription }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _cancel_decorators, { kind: "method", name: "cancel", static: false, private: false, access: { has: obj => "cancel" in obj, get: obj => obj.cancel }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SubscriptionsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        subscriptionsService = __runInitializers(this, _instanceExtraInitializers);
        constructor(subscriptionsService) {
            this.subscriptionsService = subscriptionsService;
        }
        async createPlan(req, body) {
            const merchantId = req.user.merchantId;
            return this.subscriptionsService.createPlan(merchantId, body);
        }
        async listPlans(req) {
            const merchantId = req.user.merchantId;
            return this.subscriptionsService.listPlans(merchantId);
        }
        async createSubscription(req, body) {
            const merchantId = req.user.merchantId;
            return this.subscriptionsService.createSubscription(merchantId, body);
        }
        async findOne(req, id) {
            const merchantId = req.user.merchantId;
            return this.subscriptionsService.getSubscription(merchantId, id);
        }
        async findAll(req, cursor, limit) {
            const merchantId = req.user.merchantId;
            return this.subscriptionsService.listSubscriptions(merchantId, {
                cursor,
                limit: limit ? Number(limit) : undefined,
            });
        }
        async cancel(req, id, body) {
            const merchantId = req.user.merchantId;
            return this.subscriptionsService.cancelSubscription(merchantId, id, body?.reason);
        }
    };
    return SubscriptionsController = _classThis;
})();
exports.SubscriptionsController = SubscriptionsController;
//# sourceMappingURL=subscriptions.controller.js.map