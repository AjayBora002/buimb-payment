# Payment Intent State Machine

## Overview

The `PaymentIntent` entity models the complete lifecycle of a payment transaction. Transitions are strictly validated using `@buimbpay/payments`:

```
                    ┌──────────────────┐
                    │     CREATED      │
                    └─────────┬────────┘
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
      ┌──────────────────┐          ┌──────────────────┐
      │  REQUIRES_ACTION │          │    PROCESSING    │
      └────────┬─────────┘          └────────┬─────────┘
               │                             │
               └──────────────┬──────────────┘
                              ▼
                    ┌──────────────────┐
                    │    AUTHORISED    │
                    └─────────┬────────┘
                              ▼
                    ┌──────────────────┐
                    │     CAPTURED     │
                    └─────────┬────────┘
               ┌──────────────┴──────────────┐
               ▼                             ▼
      ┌──────────────────┐          ┌──────────────────┐
      │PARTIALLY_REFUNDED│          │     REFUNDED     │
      └──────────────────┘          └──────────────────┘
```

## Terminal States

- `CAPTURED` (unless refunded)
- `FAILED`
- `CANCELLED`
- `EXPIRED`
- `REFUNDED`

Terminal states cannot transition back to active or processing states.
Any invalid transition triggers an `InvalidStateTransitionError` and aborts the database transaction.
