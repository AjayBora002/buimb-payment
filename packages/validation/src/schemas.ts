import { z } from 'zod';

// ─── Primitives ──────────────────────────────────────────────────────────────

export const UuidSchema = z.string().uuid();

/** ISO 4217 currency code */
export const CurrencySchema = z.string().length(3).toUpperCase();

/** Integer minor units — never allow float for money */
export const MoneyAmountSchema = z
  .number()
  .int('Amount must be an integer in minor units (e.g. paise)')
  .positive('Amount must be positive');

export const EnvironmentSchema = z.enum(['SANDBOX', 'PRODUCTION']);

export const PaginationSchema = z.object({
  cursor: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(20),
});

// ─── Auth ────────────────────────────────────────────────────────────────────

export const LoginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(1),
  mfaToken: z.string().length(6).optional(),
});

export const RegisterSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(12),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/).optional(),
});

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(12),
});

// ─── Orders ──────────────────────────────────────────────────────────────────

export const CreateOrderSchema = z.object({
  amount: MoneyAmountSchema,
  currency: CurrencySchema,
  description: z.string().max(1000).optional(),
  externalOrderId: z.string().max(255).optional(),
  receiptEmail: z.string().email().optional(),
  customerId: UuidSchema.optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  notes: z.record(z.string(), z.string()).optional(),
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;

// ─── Payment Intents ─────────────────────────────────────────────────────────

export const CreatePaymentIntentSchema = z.object({
  orderId: UuidSchema,
  captureMethod: z.enum(['AUTOMATIC', 'MANUAL']).default('AUTOMATIC'),
  description: z.string().max(1000).optional(),
  statementDescriptor: z.string().max(22).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const ConfirmPaymentIntentSchema = z.object({
  paymentMethodType: z.enum(['CARD', 'UPI', 'NETBANKING', 'WALLET', 'MOCK']),
  paymentMethodData: z.record(z.string(), z.unknown()).optional(),
  returnUrl: z.string().url().optional(),
});

export const CapturePaymentIntentSchema = z.object({
  captureAmount: MoneyAmountSchema.optional(),
});

export type CreatePaymentIntentInput = z.infer<typeof CreatePaymentIntentSchema>;
export type ConfirmPaymentIntentInput = z.infer<typeof ConfirmPaymentIntentSchema>;

// ─── Refunds ─────────────────────────────────────────────────────────────────

export const CreateRefundSchema = z.object({
  paymentIntentId: UuidSchema,
  amount: MoneyAmountSchema.optional(), // omit for full refund
  reason: z.string().max(255).optional(),
  notes: z.string().max(1000).optional(),
  idempotencyKey: z.string().min(8).max(255),
});

export type CreateRefundInput = z.infer<typeof CreateRefundSchema>;

// ─── Payment Links ────────────────────────────────────────────────────────────

export const CreatePaymentLinkSchema = z.object({
  amount: MoneyAmountSchema,
  currency: CurrencySchema,
  description: z.string().max(1000).optional(),
  customerName: z.string().max(255).optional(),
  customerEmail: z.string().email().optional(),
  customerPhone: z.string().regex(/^\+?[0-9]{10,15}$/).optional(),
  expiresAt: z.string().datetime().optional(),
  customReference: z.string().max(255).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  allowPartial: z.boolean().default(false),
  minAmount: MoneyAmountSchema.optional(),
  idempotencyKey: z.string().min(8).max(255),
});

export type CreatePaymentLinkInput = z.infer<typeof CreatePaymentLinkSchema>;

// ─── Subscriptions ────────────────────────────────────────────────────────────

export const CreateSubscriptionPlanSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  amount: MoneyAmountSchema,
  currency: CurrencySchema,
  intervalType: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']),
  intervalCount: z.number().int().min(1).max(36).default(1),
  trialDays: z.number().int().min(0).max(365).default(0),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const CreateSubscriptionSchema = z.object({
  planId: UuidSchema,
  customerId: UuidSchema,
  metadata: z.record(z.string(), z.unknown()).optional(),
});

// ─── Webhook Endpoints ────────────────────────────────────────────────────────

export const CreateWebhookEndpointSchema = z.object({
  url: z.string().url().max(2048),
  description: z.string().max(255).optional(),
  events: z.array(z.string().max(100)).min(1),
});

// ─── API Keys ─────────────────────────────────────────────────────────────────

export const CreateApiKeySchema = z.object({
  name: z.string().min(1).max(100),
  environment: EnvironmentSchema,
  scopes: z.array(z.string()).min(1),
  expiresAt: z.string().datetime().optional(),
});

// ─── Error response shape ─────────────────────────────────────────────────────

export const ApiErrorSchema = z.object({
  type: z.string(),
  code: z.string(),
  message: z.string(),
  param: z.string().optional(),
  requestId: z.string(),
  documentationUrl: z.string().optional(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;
