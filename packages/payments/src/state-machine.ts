/**
 * Payment State Machine
 *
 * Defines all valid payment intent state transitions.
 * Any attempt to move to an invalid state throws a typed error.
 * This is the SINGLE source of truth for payment lifecycle transitions.
 */
import { PaymentIntentStatus } from '@prisma/client';

type Transitions = Partial<Record<PaymentIntentStatus, PaymentIntentStatus[]>>;

const VALID_TRANSITIONS: Transitions = {
  [PaymentIntentStatus.CREATED]: [
    PaymentIntentStatus.REQUIRES_ACTION,
    PaymentIntentStatus.PROCESSING,
    PaymentIntentStatus.CANCELLED,
    PaymentIntentStatus.EXPIRED,
  ],
  [PaymentIntentStatus.REQUIRES_ACTION]: [
    PaymentIntentStatus.PROCESSING,
    PaymentIntentStatus.FAILED,
    PaymentIntentStatus.CANCELLED,
    PaymentIntentStatus.EXPIRED,
  ],
  [PaymentIntentStatus.PROCESSING]: [
    PaymentIntentStatus.AUTHORISED,
    PaymentIntentStatus.CAPTURE_PENDING,
    PaymentIntentStatus.FAILED,
    PaymentIntentStatus.CANCELLED,
    PaymentIntentStatus.EXPIRED,
  ],
  [PaymentIntentStatus.AUTHORISED]: [
    PaymentIntentStatus.CAPTURE_PENDING,
    PaymentIntentStatus.CAPTURED,
    PaymentIntentStatus.CANCELLED,
    PaymentIntentStatus.FAILED,
  ],
  [PaymentIntentStatus.CAPTURE_PENDING]: [
    PaymentIntentStatus.CAPTURED,
    PaymentIntentStatus.FAILED,
    PaymentIntentStatus.CANCELLED,
  ],
  [PaymentIntentStatus.CAPTURED]: [
    PaymentIntentStatus.PARTIALLY_REFUNDED,
    PaymentIntentStatus.REFUNDED,
    PaymentIntentStatus.DISPUTED,
    PaymentIntentStatus.SETTLED,
  ],
  [PaymentIntentStatus.PARTIALLY_REFUNDED]: [
    PaymentIntentStatus.REFUNDED,
    PaymentIntentStatus.DISPUTED,
    PaymentIntentStatus.SETTLED,
    PaymentIntentStatus.RECONCILIATION_REQUIRED,
  ],
  [PaymentIntentStatus.SETTLED]: [
    PaymentIntentStatus.RECONCILIATION_REQUIRED,
  ],
  [PaymentIntentStatus.DISPUTED]: [
    PaymentIntentStatus.CAPTURED,   // dispute resolved in merchant favour
    PaymentIntentStatus.REFUNDED,   // dispute resolved via refund
    PaymentIntentStatus.RECONCILIATION_REQUIRED,
  ],
  // Terminal states — no further transitions
  [PaymentIntentStatus.FAILED]: [],
  [PaymentIntentStatus.CANCELLED]: [],
  [PaymentIntentStatus.EXPIRED]: [],
  [PaymentIntentStatus.REFUNDED]: [],
  [PaymentIntentStatus.RECONCILIATION_REQUIRED]: [],
};

export class InvalidStateTransitionError extends Error {
  constructor(
    public readonly currentState: PaymentIntentStatus,
    public readonly targetState: PaymentIntentStatus,
  ) {
    super(
      `Invalid payment state transition: ${currentState} → ${targetState}. ` +
        `Allowed next states: ${(VALID_TRANSITIONS[currentState] ?? []).join(', ') || 'none (terminal state)'}`,
    );
    this.name = 'InvalidStateTransitionError';
  }
}

export function assertValidTransition(
  current: PaymentIntentStatus,
  next: PaymentIntentStatus,
): void {
  const allowed = VALID_TRANSITIONS[current] ?? [];
  if (!allowed.includes(next)) {
    throw new InvalidStateTransitionError(current, next);
  }
}

export function isTerminalState(status: PaymentIntentStatus): boolean {
  const terminal: PaymentIntentStatus[] = [
    PaymentIntentStatus.FAILED,
    PaymentIntentStatus.CANCELLED,
    PaymentIntentStatus.EXPIRED,
    PaymentIntentStatus.REFUNDED,
    PaymentIntentStatus.RECONCILIATION_REQUIRED,
  ];
  return terminal.includes(status);
}

export function canRefund(status: PaymentIntentStatus): boolean {
  const refundable: ReadonlyArray<PaymentIntentStatus> = [
    PaymentIntentStatus.CAPTURED,
    PaymentIntentStatus.PARTIALLY_REFUNDED,
    PaymentIntentStatus.SETTLED,
  ];
  return refundable.includes(status);
}

export function canCapture(status: PaymentIntentStatus): boolean {
  const capturable: ReadonlyArray<PaymentIntentStatus> = [
    PaymentIntentStatus.AUTHORISED,
    PaymentIntentStatus.CAPTURE_PENDING,
  ];
  return capturable.includes(status);
}
