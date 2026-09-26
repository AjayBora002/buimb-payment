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
exports.PaymentLinksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_js_1 = require("../iam/guards/jwt-auth.guard.js");
let PaymentLinksController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Payment Links'), (0, common_1.Controller)({ path: 'payment-links', version: '1' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getBySlug_decorators;
    let _create_decorators;
    let _findOne_decorators;
    let _findAll_decorators;
    let _deactivate_decorators;
    var PaymentLinksController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _getBySlug_decorators = [(0, common_1.Get)('public/:slug'), (0, swagger_1.ApiOperation)({ summary: 'Get payment link details by public slug' })];
            _create_decorators = [(0, common_1.Post)(), (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Create a new payment link' })];
            _findOne_decorators = [(0, common_1.Get)(':id'), (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Get payment link by ID' })];
            _findAll_decorators = [(0, common_1.Get)(), (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'List payment links' })];
            _deactivate_decorators = [(0, common_1.Delete)(':id'), (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Deactivate / cancel a payment link' })];
            __esDecorate(this, null, _getBySlug_decorators, { kind: "method", name: "getBySlug", static: false, private: false, access: { has: obj => "getBySlug" in obj, get: obj => obj.getBySlug }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _deactivate_decorators, { kind: "method", name: "deactivate", static: false, private: false, access: { has: obj => "deactivate" in obj, get: obj => obj.deactivate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PaymentLinksController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        paymentLinksService = __runInitializers(this, _instanceExtraInitializers);
        constructor(paymentLinksService) {
            this.paymentLinksService = paymentLinksService;
        }
        // Public endpoint for paying via slug
        async getBySlug(slug) {
            return this.paymentLinksService.getPaymentLinkBySlug(slug);
        }
        async create(req, body) {
            const merchantId = req.user.merchantId;
            const userId = req.user.sub;
            return this.paymentLinksService.createPaymentLink(merchantId, userId, body);
        }
        async findOne(req, id) {
            const merchantId = req.user.merchantId;
            return this.paymentLinksService.findPaymentLink(merchantId, id);
        }
        async findAll(req, cursor, limit) {
            const merchantId = req.user.merchantId;
            return this.paymentLinksService.listPaymentLinks(merchantId, {
                cursor,
                limit: limit ? Number(limit) : undefined,
            });
        }
        async deactivate(req, id) {
            const merchantId = req.user.merchantId;
            return this.paymentLinksService.deactivatePaymentLink(merchantId, id);
        }
    };
    return PaymentLinksController = _classThis;
})();
exports.PaymentLinksController = PaymentLinksController;
//# sourceMappingURL=payment-links.controller.js.map