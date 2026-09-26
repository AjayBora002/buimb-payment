# BuimbPay System Architecture Overview

## 1. Monorepo Organization

BuimbPay is organized as a Turborepo-driven monorepo managed with `pnpm`:

```
buimb-pay/
├── apps/
│   ├── api/                    # NestJS Core Financial API (Fastify adapter)
│   ├── worker/                 # BullMQ distributed asynchronous background jobs
│   ├── merchant-dashboard/     # Vite + React 19 Merchant Portal (Dark Mode, high density)
│   └── public-web/             # Next.js 15 App Router public landing & documentation
├── packages/
│   ├── auth/                   # Custom JWT, argon2/bcrypt, TOTP MFA utilities
│   ├── database/               # Prisma ORM schema (40+ models), migrations, seed scripts
│   ├── payments/               # Deterministic 14-state machine, MockProvider, transitions
│   └── validation/             # Zod validation schemas for all inputs & API requests
└── infrastructure/
    └── docker/                 # PostgreSQL 16, Redis 7, mailhog, pgadmin
```

## 2. Security-First Architecture Principles

1. **Integer Minor Currency Units**:
   - All amounts (`amount`, `grossAmount`, `feeAmount`, `taxAmount`) are stored exclusively as `BigInt` (paise for INR). Floating-point data types are strictly prohibited in the schema.

2. **Deterministic State Machine**:
   - Every `PaymentIntent` transitions according to an explicit directed acyclic graph with 14 states.
   - Transitions are guarded by optimistic concurrency locking via an integer `version` field.

3. **Append-Only Immutable Ledger**:
   - Double-entry bookkeeping accounts balance debits and credits on every transaction event.
   - Enforced by database triggers to reject updates or deletions.

4. **Production Payment Guard**:
   - `PAYMENT_PRODUCTION_ENABLED` must be explicitly verified at startup and in every payment gateway controller.
   - Remains `false` in development and sandbox environments.
