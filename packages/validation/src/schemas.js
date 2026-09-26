"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorSchema = exports.CreateApiKeySchema = exports.CreateWebhookEndpointSchema = exports.CreateSubscriptionSchema = exports.CreateSubscriptionPlanSchema = exports.CreatePaymentLinkSchema = exports.CreateRefundSchema = exports.CapturePaymentIntentSchema = exports.ConfirmPaymentIntentSchema = exports.CreatePaymentIntentSchema = exports.CreateOrderSchema = exports.ChangePasswordSchema = exports.RegisterSchema = exports.LoginSchema = exports.PaginationSchema = exports.EnvironmentSchema = exports.MoneyAmountSchema = exports.CurrencySchema = exports.UuidSchema = void 0;
const zod_1 = require("zod");
// ─── Primitives ──────────────────────────────────────────────────────────────
exports.UuidSchema = zod_1.z.string().uuid();
/** ISO 4217 currency code */
exports.CurrencySchema = zod_1.z.string().length(3).toUpperCase();
/** Integer minor units — never allow float for money */
exports.MoneyAmountSchema = zod_1.z
    .number()
    .int('Amount must be an integer in minor units (e.g. paise)')
    .positive('Amount must be positive');
exports.EnvironmentSchema = zod_1.z.enum(['SANDBOX', 'PRODUCTION']);
exports.PaginationSchema = zod_1.z.object({
    cursor: zod_1.z.string().optional(),
    limit: zod_1.z.number().int().min(1).max(100).default(20),
});
// ─── Auth ────────────────────────────────────────────────────────────────────
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email().toLowerCase(),
    password: zod_1.z.string().min(1),
    mfaToken: zod_1.z.string().length(6).optional(),
});
exports.RegisterSchema = zod_1.z.object({
    email: zod_1.z.string().email().toLowerCase(),
    password: zod_1.z.string().min(12),
    firstName: zod_1.z.string().min(1).max(100),
    lastName: zod_1.z.string().min(1).max(100),
    phone: zod_1.z.string().regex(/^\+?[0-9]{10,15}$/).optional(),
});
exports.ChangePasswordSchema = zod_1.z.object({
    currentPassword: zod_1.z.string().min(1),
    newPassword: zod_1.z.string().min(12),
});
// ─── Orders ──────────────────────────────────────────────────────────────────
exports.CreateOrderSchema = zod_1.z.object({
    amount: exports.MoneyAmountSchema,
    currency: exports.CurrencySchema,
    description: zod_1.z.string().max(1000).optional(),
    externalOrderId: zod_1.z.string().max(255).optional(),
    receiptEmail: zod_1.z.string().email().optional(),
    customerId: exports.UuidSchema.optional(),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    notes: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional(),
});
// ─── Payment Intents ─────────────────────────────────────────────────────────
exports.CreatePaymentIntentSchema = zod_1.z.object({
    orderId: exports.UuidSchema,
    captureMethod: zod_1.z.enum(['AUTOMATIC', 'MANUAL']).default('AUTOMATIC'),
    description: zod_1.z.string().max(1000).optional(),
    statementDescriptor: zod_1.z.string().max(22).optional(),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
});
exports.ConfirmPaymentIntentSchema = zod_1.z.object({
    paymentMethodType: zod_1.z.enum(['CARD', 'UPI', 'NETBANKING', 'WALLET', 'MOCK']),
    paymentMethodData: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    returnUrl: zod_1.z.string().url().optional(),
});
exports.CapturePaymentIntentSchema = zod_1.z.object({
    captureAmount: exports.MoneyAmountSchema.optional(),
});
// ─── Refunds ─────────────────────────────────────────────────────────────────
exports.CreateRefundSchema = zod_1.z.object({
    paymentIntentId: exports.UuidSchema,
    amount: exports.MoneyAmountSchema.optional(), // omit for full refund
    reason: zod_1.z.string().max(255).optional(),
    notes: zod_1.z.string().max(1000).optional(),
    idempotencyKey: zod_1.z.string().min(8).max(255),
});
// ─── Payment Links ────────────────────────────────────────────────────────────
exports.CreatePaymentLinkSchema = zod_1.z.object({
    amount: exports.MoneyAmountSchema,
    currency: exports.CurrencySchema,
    description: zod_1.z.string().max(1000).optional(),
    customerName: zod_1.z.string().max(255).optional(),
    customerEmail: zod_1.z.string().email().optional(),
    customerPhone: zod_1.z.string().regex(/^\+?[0-9]{10,15}$/).optional(),
    expiresAt: zod_1.z.string().datetime().optional(),
    customReference: zod_1.z.string().max(255).optional(),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    allowPartial: zod_1.z.boolean().default(false),
    minAmount: exports.MoneyAmountSchema.optional(),
    idempotencyKey: zod_1.z.string().min(8).max(255),
});
// ─── Subscriptions ────────────────────────────────────────────────────────────
exports.CreateSubscriptionPlanSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255),
    description: zod_1.z.string().max(1000).optional(),
    amount: exports.MoneyAmountSchema,
    currency: exports.CurrencySchema,
    intervalType: zod_1.z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']),
    intervalCount: zod_1.z.number().int().min(1).max(36).default(1),
    trialDays: zod_1.z.number().int().min(0).max(365).default(0),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
});
exports.CreateSubscriptionSchema = zod_1.z.object({
    planId: exports.UuidSchema,
    customerId: exports.UuidSchema,
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
});
// ─── Webhook Endpoints ────────────────────────────────────────────────────────
exports.CreateWebhookEndpointSchema = zod_1.z.object({
    url: zod_1.z.string().url().max(2048),
    description: zod_1.z.string().max(255).optional(),
    events: zod_1.z.array(zod_1.z.string().max(100)).min(1),
});
// ─── API Keys ─────────────────────────────────────────────────────────────────
exports.CreateApiKeySchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    environment: exports.EnvironmentSchema,
    scopes: zod_1.z.array(zod_1.z.string()).min(1),
    expiresAt: zod_1.z.string().datetime().optional(),
});
// ─── Error response shape ─────────────────────────────────────────────────────
exports.ApiErrorSchema = zod_1.z.object({
    type: zod_1.z.string(),
    code: zod_1.z.string(),
    message: zod_1.z.string(),
    param: zod_1.z.string().optional(),
    requestId: zod_1.z.string(),
    documentationUrl: zod_1.z.string().optional(),
});
//# sourceMappingURL=schemas.js.map