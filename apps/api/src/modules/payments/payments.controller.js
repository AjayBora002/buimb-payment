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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let PaymentsController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Payment Intents'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)({ path: 'payment-intents', version: '1' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _create_decorators;
    let _findOne_decorators;
    let _confirm_decorators;
    let _capture_decorators;
    let _cancel_decorators;
    let _findAll_decorators;
    var PaymentsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _create_decorators = [(0, common_1.Post)(), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Create a payment intent' })];
            _findOne_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({ summary: 'Retrieve a payment intent' })];
            _confirm_decorators = [(0, common_1.Post)(':id/confirm'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Confirm a payment intent' })];
            _capture_decorators = [(0, common_1.Post)(':id/capture'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Capture an authorised payment intent' })];
            _cancel_decorators = [(0, common_1.Post)(':id/cancel'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Cancel a payment intent' })];
            _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'List payment intents' })];
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _confirm_decorators, { kind: "method", name: "confirm", static: false, private: false, access: { has: obj => "confirm" in obj, get: obj => obj.confirm }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _capture_decorators, { kind: "method", name: "capture", static: false, private: false, access: { has: obj => "capture" in obj, get: obj => obj.capture }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _cancel_decorators, { kind: "method", name: "cancel", static: false, private: false, access: { has: obj => "cancel" in obj, get: obj => obj.cancel }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PaymentsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        paymentsService = __runInitializers(this, _instanceExtraInitializers);
        constructor(paymentsService) {
            this.paymentsService = paymentsService;
        }
        async create(body) {
            const merchantId = '00000000-0000-0000-0000-000000000001'; // demo
            return this.paymentsService.createPaymentIntent(merchantId, body.orderId, body);
        }
        async findOne(id) {
            const merchantId = '00000000-0000-0000-0000-000000000001';
            return this.paymentsService.findOne(merchantId, id);
        }
        async confirm(id, body) {
            const merchantId = '00000000-0000-0000-0000-000000000001';
            return this.paymentsService.confirmPaymentIntent(merchantId, id, body);
        }
        async capture(id, body) {
            const merchantId = '00000000-0000-0000-0000-000000000001';
            return this.paymentsService.capturePaymentIntent(merchantId, id, body.captureAmount);
        }
        async cancel(id, body) {
            const merchantId = '00000000-0000-0000-0000-000000000001';
            return this.paymentsService.cancelPaymentIntent(merchantId, id, body.reason);
        }
        async findAll(cursor, limit) {
            const merchantId = '00000000-0000-0000-0000-000000000001';
            return this.paymentsService.findAll(merchantId, { cursor, limit });
        }
    };
    return PaymentsController = _classThis;
})();
exports.PaymentsController = PaymentsController;
//# sourceMappingURL=payments.controller.js.map