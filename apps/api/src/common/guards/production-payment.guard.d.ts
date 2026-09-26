/**
 * PRODUCTION PAYMENT GUARD
 *
 * This guard MUST be applied to every endpoint that touches live payment
 * processing, payouts, live API key creation, or live settlement.
 *
 * It will throw a 503 unless:
 *   1. NODE_ENV === 'production'
 *   2. PAYMENT_PRODUCTION_ENABLED === 'true'
 *
 * Removing or bypassing this guard requires multi-person operator approval
 * after all regulatory, banking, PCI, and security sign-offs are complete.
 */
import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class ProductionPaymentGuard implements CanActivate {
    canActivate(_context: ExecutionContext): boolean;
}
//# sourceMappingURL=production-payment.guard.d.ts.map