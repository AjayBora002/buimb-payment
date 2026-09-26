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
exports.IamController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_js_1 = require("./guards/jwt-auth.guard.js");
let IamController = (() => {
    let _classDecorators = [(0, swagger_1.ApiTags)('Auth'), (0, common_1.Controller)({ path: 'auth', version: '1' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _register_decorators;
    let _login_decorators;
    let _refresh_decorators;
    let _getProfile_decorators;
    var IamController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _register_decorators = [(0, common_1.Post)('register'), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Register a new merchant user' })];
            _login_decorators = [(0, common_1.Post)('login'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Login to merchant account' })];
            _refresh_decorators = [(0, common_1.Post)('refresh'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Refresh access token' })];
            _getProfile_decorators = [(0, common_1.Get)('me'), (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Get current user profile' })];
            __esDecorate(this, null, _register_decorators, { kind: "method", name: "register", static: false, private: false, access: { has: obj => "register" in obj, get: obj => obj.register }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: obj => "login" in obj, get: obj => obj.login }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _refresh_decorators, { kind: "method", name: "refresh", static: false, private: false, access: { has: obj => "refresh" in obj, get: obj => obj.refresh }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getProfile_decorators, { kind: "method", name: "getProfile", static: false, private: false, access: { has: obj => "getProfile" in obj, get: obj => obj.getProfile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            IamController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        iamService = __runInitializers(this, _instanceExtraInitializers);
        constructor(iamService) {
            this.iamService = iamService;
        }
        async register(body) {
            return this.iamService.register(body);
        }
        async login(body, req) {
            const ipAddress = req.ip || req.headers['x-forwarded-for'];
            const userAgent = req.headers['user-agent'];
            return this.iamService.login(body.email, body.password, {
                ipAddress: typeof ipAddress === 'string' ? ipAddress : undefined,
                userAgent: typeof userAgent === 'string' ? userAgent : undefined,
            });
        }
        async refresh(body) {
            return this.iamService.refreshToken(body.refreshToken);
        }
        async getProfile(req) {
            return this.iamService.getProfile(req.user.sub);
        }
    };
    return IamController = _classThis;
})();
exports.IamController = IamController;
//# sourceMappingURL=iam.controller.js.map