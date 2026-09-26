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
import { DatabaseModule } from './common/database/database.module.js';
import { RedisModule } from './common/redis/redis.module.js';

@Module({
  imports: [
    // ── Rate limiting — defence-in-depth ──────────────────────────────────
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1000, limit: 10 },   // 10 req/s
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
  ],
})
export class AppModule {}
