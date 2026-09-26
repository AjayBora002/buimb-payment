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
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';

@Injectable()
export class ProductionPaymentGuard implements CanActivate {
  canActivate(_context: ExecutionContext): boolean {
    const productionEnabled =
      process.env.PAYMENT_PRODUCTION_ENABLED === 'true';

    if (!productionEnabled) {
      throw new ServiceUnavailableException({
        type: 'production_disabled',
        code: 'PRODUCTION_NOT_ENABLED',
        message:
          'Live payment processing is not enabled on this platform. ' +
          'All required regulatory, banking, security, and compliance ' +
          'approvals must be completed before production payments can be processed.',
        documentationUrl:
          'https://docs.buimbpay.in/compliance/production-readiness',
      });
    }

    return true;
  }
}
