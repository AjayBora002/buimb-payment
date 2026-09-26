/**
 * PRODUCTION PAYMENT GUARD
 *
 * This guard MUST be applied to every endpoint that touches live payment
 * processing, payouts, live API key creation, or live settlement.
 *
 * It only blocks requests where the request environment is PRODUCTION.
 * Sandbox requests are always allowed.
 *
 * For production requests, it throws a 503 unless:
 *   PAYMENT_PRODUCTION_ENABLED === 'true'
 *
 * Removing or bypassing this guard requires multi-person operator approval
 * after all regulatory, banking, PCI, and security sign-offs are complete.
 */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Optional,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Environment } from '@prisma/client';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class ProductionPaymentGuard implements CanActivate {
  constructor(@Optional() private readonly prisma?: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    let requestEnvironment = request.environment;

    // If environment wasn't set by ApiKeyGuard (e.g. public checkout endpoints),
    // resolve environment from the target order or payment intent
    if (!requestEnvironment && this.prisma) {
      try {
        const orderId =
          request.body?.orderId ||
          request.params?.orderId ||
          (request.url?.includes('orders/public') ? request.params?.id : undefined);

        const intentId =
          request.body?.paymentIntentId ||
          (request.url?.includes('payment-intents/public') ? request.params?.id : undefined);

        if (orderId) {
          const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            select: { environment: true },
          });
          if (order) {
            requestEnvironment = order.environment;
          }
        } else if (intentId) {
          const intent = await this.prisma.paymentIntent.findUnique({
            where: { id: intentId },
            select: { environment: true },
          });
          if (intent) {
            requestEnvironment = intent.environment;
          }
        }
      } catch {
        // Fall back to SANDBOX if database lookup fails
      }
    }

    // Default to SANDBOX if unassigned (sandbox mock checkout is always safe to run)
    requestEnvironment = requestEnvironment || Environment.SANDBOX;

    // Only enforce production guard for PRODUCTION environment requests
    if (requestEnvironment === Environment.PRODUCTION) {
      const productionEnabled = process.env.PAYMENT_PRODUCTION_ENABLED === 'true';

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
    }

    return true;
  }
}

