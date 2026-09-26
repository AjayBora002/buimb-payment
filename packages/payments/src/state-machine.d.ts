/**
 * Payment State Machine
 *
 * Defines all valid payment intent state transitions.
 * Any attempt to move to an invalid state throws a typed error.
 * This is the SINGLE source of truth for payment lifecycle transitions.
 */
import { PaymentIntentStatus } from '@prisma/client';
export declare class InvalidStateTransitionError extends Error {
    readonly currentState: PaymentIntentStatus;
    readonly targetState: PaymentIntentStatus;
    constructor(currentState: PaymentIntentStatus, targetState: PaymentIntentStatus);
}
export declare function assertValidTransition(current: PaymentIntentStatus, next: PaymentIntentStatus): void;
export declare function isTerminalState(status: PaymentIntentStatus): boolean;
export declare function canRefund(status: PaymentIntentStatus): boolean;
export declare function canCapture(status: PaymentIntentStatus): boolean;
//# sourceMappingURL=state-machine.d.ts.map