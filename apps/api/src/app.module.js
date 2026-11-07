var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { IamModule } from './modules/iam/iam.module.js';
import { MerchantsModule } from './modules/merchants/merchants.module.js';
import { PaymentsModule } from './modules/payments/payments.module.js';
import { RefundsModule } from './modules/refunds/refunds.module.js';
import { PaymentLinksModule } from './modules/payment-links/payment-links.module.js';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module.js';
import { SettlementsModule } from './modules/settlements/settlements.module.js';
import { LedgerModule } from './modules/ledger/ledger.module.js';
import { WebhooksModule } from './modules/webhooks/webhooks.module.js';
import { AuditModule } from './modules/audit/audit.module.js';
import { RiskModule } from './modules/risk/risk.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { CheckoutModule } from './modules/checkout/checkout.module.js';
import { ObserversModule } from './modules/observers/observers.module.js';
import { RouteModule } from './modules/route/route.module.js';
import { VerificationModule } from './modules/verification/verification.module.js';
import { PayoutLinksModule } from './modules/payout-links/payout-links.module.js';
import { CorporateCardsModule } from './modules/corporate-cards/corporate-cards.module.js';
import { MagicCheckoutModule } from './modules/magic-checkout/magic-checkout.module.js';
import { DatabaseModule } from './common/database/database.module.js';
import { RedisModule } from './common/redis/redis.module.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            // ── Rate limiting — defence-in-depth ──────────────────────────────────
            ThrottlerModule.forRoot([
                { name: 'short', ttl: 1000, limit: 10 }, // 10 req/s
                { name: 'medium', ttl: 60000, limit: 200 }, // 200 req/min
                { name: 'long', ttl: 3600000, limit: 1000 }, // 1000 req/hr
            ]),
            // ── Infrastructure ────────────────────────────────────────────────────
            DatabaseModule,
            RedisModule,
            // ── Domain modules ────────────────────────────────────────────────────
            IamModule,
            MerchantsModule,
            PaymentsModule,
            RefundsModule,
            PaymentLinksModule,
            SubscriptionsModule,
            SettlementsModule,
            LedgerModule,
            WebhooksModule,
            AuditModule,
            RiskModule,
            HealthModule,
            CheckoutModule,
            ObserversModule,
            RouteModule,
            VerificationModule,
            PayoutLinksModule,
            CorporateCardsModule,
            MagicCheckoutModule,
        ],
    })
], AppModule);
export { AppModule };
