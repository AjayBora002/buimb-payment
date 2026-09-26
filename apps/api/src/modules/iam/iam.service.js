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
exports.IamService = void 0;
const common_1 = require("@nestjs/common");
const auth_1 = require("@buimbpay/auth");
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
let IamService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var IamService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            IamService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        prisma;
        constructor(prisma) {
            this.prisma = prisma;
        }
        async register(data) {
            const existing = await this.prisma.user.findUnique({
                where: { email: data.email.toLowerCase() },
            });
            if (existing) {
                throw new common_1.ConflictException('User with this email already exists');
            }
            const strength = (0, auth_1.validatePasswordStrength)(data.password);
            if (!strength.valid) {
                throw new common_1.BadRequestException(strength.errors.join(', '));
            }
            const passwordHash = await (0, auth_1.hashPassword)(data.password);
            return this.prisma.$transaction(async (tx) => {
                const user = await tx.user.create({
                    data: {
                        email: data.email.toLowerCase(),
                        passwordHash,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        phone: data.phone,
                        status: client_1.UserStatus.ACTIVE,
                    },
                });
                const orgName = data.organisationName || `${data.firstName}'s Org`;
                const orgSlug = `${data.firstName.toLowerCase()}-${Date.now()}`.replace(/[^a-z0-9]/g, '-');
                const org = await tx.organisation.create({
                    data: {
                        name: orgName,
                        slug: orgSlug,
                        type: 'MERCHANT',
                    },
                });
                const merchant = await tx.merchant.create({
                    data: {
                        organisationId: org.id,
                        legalName: orgName,
                        displayName: orgName,
                        businessType: 'PRIVATE_LIMITED',
                    },
                });
                const adminRole = await tx.role.findUnique({
                    where: { name: 'MERCHANT_ADMIN' },
                });
                if (adminRole) {
                    await tx.merchantUser.create({
                        data: {
                            merchantId: merchant.id,
                            userId: user.id,
                            roleId: adminRole.id,
                        },
                    });
                }
                return {
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                    merchantId: merchant.id,
                };
            });
        }
        async login(email, passwordPlain, meta = {}) {
            const user = await this.prisma.user.findUnique({
                where: { email: email.toLowerCase() },
                include: {
                    merchantUsers: {
                        include: { role: true, merchant: true },
                    },
                },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            if (user.status === client_1.UserStatus.LOCKED) {
                throw new common_1.UnauthorizedException('Account is locked. Please contact support.');
            }
            const valid = await (0, auth_1.verifyPassword)(passwordPlain, user.passwordHash);
            if (!valid) {
                const attempts = user.failedLoginAttempts + 1;
                await this.prisma.user.update({
                    where: { id: user.id },
                    data: {
                        failedLoginAttempts: attempts,
                        lockedUntil: attempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null,
                        status: attempts >= 5 ? client_1.UserStatus.LOCKED : user.status,
                    },
                });
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            // Reset failed attempts on success
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    failedLoginAttempts: 0,
                    lastLoginAt: new Date(),
                    lastLoginIp: meta.ipAddress,
                },
            });
            const merchantUser = user.merchantUsers[0];
            const merchantId = merchantUser?.merchantId;
            const roleName = merchantUser?.role.name;
            const sessionToken = (0, auth_1.generateSessionToken)();
            const sessionTokenHash = (0, crypto_1.createHash)('sha256').update(sessionToken).digest('hex');
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
            const session = await this.prisma.session.create({
                data: {
                    userId: user.id,
                    refreshToken: sessionTokenHash,
                    ipAddress: meta.ipAddress,
                    userAgent: meta.userAgent,
                    expiresAt,
                },
            });
            const accessToken = (0, auth_1.signAccessToken)({
                sub: user.id,
                merchantId,
                role: roleName,
                env: 'SANDBOX',
            });
            const refreshToken = (0, auth_1.signRefreshToken)({
                sub: user.id,
                sessionId: session.id,
            });
            return {
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    merchantId,
                    role: roleName,
                },
            };
        }
        async refreshToken(token) {
            let payload;
            try {
                payload = (0, auth_1.verifyRefreshToken)(token);
            }
            catch {
                throw new common_1.UnauthorizedException('Invalid or expired refresh token');
            }
            const session = await this.prisma.session.findUnique({
                where: { id: payload.sessionId },
                include: {
                    user: {
                        include: {
                            merchantUsers: {
                                include: { role: true },
                            },
                        },
                    },
                },
            });
            if (!session || session.revokedAt || session.expiresAt < new Date()) {
                throw new common_1.UnauthorizedException('Session expired or revoked');
            }
            const merchantUser = session.user.merchantUsers[0];
            const merchantId = merchantUser?.merchantId;
            const roleName = merchantUser?.role.name;
            const accessToken = (0, auth_1.signAccessToken)({
                sub: session.user.id,
                merchantId,
                role: roleName,
                env: 'SANDBOX',
            });
            return { accessToken };
        }
        async logout(sessionId) {
            await this.prisma.session.updateMany({
                where: { id: sessionId },
                data: { revokedAt: new Date() },
            });
            return { success: true };
        }
        async getProfile(userId) {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                    status: true,
                    mfaEnabled: true,
                    createdAt: true,
                    merchantUsers: {
                        select: {
                            merchant: {
                                select: {
                                    id: true,
                                    displayName: true,
                                    legalName: true,
                                    status: true,
                                    kycStatus: true,
                                },
                            },
                            role: {
                                select: {
                                    name: true,
                                    description: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return user;
        }
    };
    return IamService = _classThis;
})();
exports.IamService = IamService;
//# sourceMappingURL=iam.service.js.map