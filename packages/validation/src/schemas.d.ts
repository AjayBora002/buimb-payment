import { z } from 'zod';
export declare const UuidSchema: z.ZodString;
/** ISO 4217 currency code */
export declare const CurrencySchema: z.ZodString;
/** Integer minor units — never allow float for money */
export declare const MoneyAmountSchema: z.ZodNumber;
export declare const EnvironmentSchema: z.ZodEnum<["SANDBOX", "PRODUCTION"]>;
export declare const PaginationSchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    cursor?: string | undefined;
}, {
    cursor?: string | undefined;
    limit?: number | undefined;
}>;
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    mfaToken: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    mfaToken?: string | undefined;
}, {
    email: string;
    password: string;
    mfaToken?: string | undefined;
}>;
export declare const RegisterSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string | undefined;
}, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string | undefined;
}>;
export declare const ChangePasswordSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    currentPassword: string;
    newPassword: string;
}, {
    currentPassword: string;
    newPassword: string;
}>;
export declare const CreateOrderSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    externalOrderId: z.ZodOptional<z.ZodString>;
    receiptEmail: z.ZodOptional<z.ZodString>;
    customerId: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    notes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    currency: string;
    description?: string | undefined;
    externalOrderId?: string | undefined;
    receiptEmail?: string | undefined;
    customerId?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    notes?: Record<string, string> | undefined;
}, {
    amount: number;
    currency: string;
    description?: string | undefined;
    externalOrderId?: string | undefined;
    receiptEmail?: string | undefined;
    customerId?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    notes?: Record<string, string> | undefined;
}>;
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export declare const CreatePaymentIntentSchema: z.ZodObject<{
    orderId: z.ZodString;
    captureMethod: z.ZodDefault<z.ZodEnum<["AUTOMATIC", "MANUAL"]>>;
    description: z.ZodOptional<z.ZodString>;
    statementDescriptor: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    orderId: string;
    captureMethod: "AUTOMATIC" | "MANUAL";
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    statementDescriptor?: string | undefined;
}, {
    orderId: string;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    captureMethod?: "AUTOMATIC" | "MANUAL" | undefined;
    statementDescriptor?: string | undefined;
}>;
export declare const ConfirmPaymentIntentSchema: z.ZodObject<{
    paymentMethodType: z.ZodEnum<["CARD", "UPI", "NETBANKING", "WALLET", "MOCK"]>;
    paymentMethodData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    returnUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    paymentMethodType: "CARD" | "UPI" | "NETBANKING" | "WALLET" | "MOCK";
    paymentMethodData?: Record<string, unknown> | undefined;
    returnUrl?: string | undefined;
}, {
    paymentMethodType: "CARD" | "UPI" | "NETBANKING" | "WALLET" | "MOCK";
    paymentMethodData?: Record<string, unknown> | undefined;
    returnUrl?: string | undefined;
}>;
export declare const CapturePaymentIntentSchema: z.ZodObject<{
    captureAmount: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    captureAmount?: number | undefined;
}, {
    captureAmount?: number | undefined;
}>;
export type CreatePaymentIntentInput = z.infer<typeof CreatePaymentIntentSchema>;
export type ConfirmPaymentIntentInput = z.infer<typeof ConfirmPaymentIntentSchema>;
export declare const CreateRefundSchema: z.ZodObject<{
    paymentIntentId: z.ZodString;
    amount: z.ZodOptional<z.ZodNumber>;
    reason: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    idempotencyKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    paymentIntentId: string;
    idempotencyKey: string;
    amount?: number | undefined;
    notes?: string | undefined;
    reason?: string | undefined;
}, {
    paymentIntentId: string;
    idempotencyKey: string;
    amount?: number | undefined;
    notes?: string | undefined;
    reason?: string | undefined;
}>;
export type CreateRefundInput = z.infer<typeof CreateRefundSchema>;
export declare const CreatePaymentLinkSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    customerName: z.ZodOptional<z.ZodString>;
    customerEmail: z.ZodOptional<z.ZodString>;
    customerPhone: z.ZodOptional<z.ZodString>;
    expiresAt: z.ZodOptional<z.ZodString>;
    customReference: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    allowPartial: z.ZodDefault<z.ZodBoolean>;
    minAmount: z.ZodOptional<z.ZodNumber>;
    idempotencyKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    amount: number;
    currency: string;
    idempotencyKey: string;
    allowPartial: boolean;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    customerName?: string | undefined;
    customerEmail?: string | undefined;
    customerPhone?: string | undefined;
    expiresAt?: string | undefined;
    customReference?: string | undefined;
    minAmount?: number | undefined;
}, {
    amount: number;
    currency: string;
    idempotencyKey: string;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    customerName?: string | undefined;
    customerEmail?: string | undefined;
    customerPhone?: string | undefined;
    expiresAt?: string | undefined;
    customReference?: string | undefined;
    allowPartial?: boolean | undefined;
    minAmount?: number | undefined;
}>;
export type CreatePaymentLinkInput = z.infer<typeof CreatePaymentLinkSchema>;
export declare const CreateSubscriptionPlanSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    amount: z.ZodNumber;
    currency: z.ZodString;
    intervalType: z.ZodEnum<["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]>;
    intervalCount: z.ZodDefault<z.ZodNumber>;
    trialDays: z.ZodDefault<z.ZodNumber>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    currency: string;
    name: string;
    intervalType: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
    intervalCount: number;
    trialDays: number;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    amount: number;
    currency: string;
    name: string;
    intervalType: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    intervalCount?: number | undefined;
    trialDays?: number | undefined;
}>;
export declare const CreateSubscriptionSchema: z.ZodObject<{
    planId: z.ZodString;
    customerId: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    customerId: string;
    planId: string;
    metadata?: Record<string, unknown> | undefined;
}, {
    customerId: string;
    planId: string;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const CreateWebhookEndpointSchema: z.ZodObject<{
    url: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    events: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    url: string;
    events: string[];
    description?: string | undefined;
}, {
    url: string;
    events: string[];
    description?: string | undefined;
}>;
export declare const CreateApiKeySchema: z.ZodObject<{
    name: z.ZodString;
    environment: z.ZodEnum<["SANDBOX", "PRODUCTION"]>;
    scopes: z.ZodArray<z.ZodString, "many">;
    expiresAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    environment: "SANDBOX" | "PRODUCTION";
    name: string;
    scopes: string[];
    expiresAt?: string | undefined;
}, {
    environment: "SANDBOX" | "PRODUCTION";
    name: string;
    scopes: string[];
    expiresAt?: string | undefined;
}>;
export declare const ApiErrorSchema: z.ZodObject<{
    type: z.ZodString;
    code: z.ZodString;
    message: z.ZodString;
    param: z.ZodOptional<z.ZodString>;
    requestId: z.ZodString;
    documentationUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: string;
    code: string;
    message: string;
    requestId: string;
    param?: string | undefined;
    documentationUrl?: string | undefined;
}, {
    type: string;
    code: string;
    message: string;
    requestId: string;
    param?: string | undefined;
    documentationUrl?: string | undefined;
}>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
//# sourceMappingURL=schemas.d.ts.map