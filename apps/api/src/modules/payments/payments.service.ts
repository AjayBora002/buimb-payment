import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import {
  assertValidTransition,
  InvalidStateTransitionError,
  canRefund,
} from '@buimbpay/payments';
import { MockProvider } from '@buimbpay/payments';
import {
  PaymentIntentStatus,
  Environment,
  type PaymentIntent,
} from '@prisma/client';
import { LedgerService } from '../ledger/ledger.service.js';
import { randomUUID } from 'crypto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly mockProvider = new MockProvider();

  constructor(
    private readonly prisma: PrismaService,
    private readonly ledgerService: LedgerService,
  ) {}

  private async recordCaptureLedgerEntry(
    intentId: string,
    amount: bigint,
    currency: string,
    tx: any,
  ) {
    const [cashAccount, escrowAccount] = await Promise.all([
      this.ledgerService.getOrCreateAccount(
        'PLATFORM_CASH',
        { name: 'Platform Cash', type: 'ASSET' },
        tx,
      ),
      this.ledgerService.getOrCreateAccount(
        'PLATFORM_ESCROW',
        { name: 'Merchant Escrow Payable', type: 'LIABILITY' },
        tx,
      ),
    ]);

    await this.ledgerService.recordTransaction(
      {
        type: 'PAYMENT_CAPTURE',
        description: `Capture payment intent ${intentId}`,
        paymentIntentId: intentId,
        entries: [
          {
            debitAccountId: cashAccount.id,
            creditAccountId: escrowAccount.id,
            amount,
            currency,
            description: `Captured funds placed in escrow: ${intentId}`,
          },
        ],
      },
      tx,
    );
  }

  async createPaymentIntent(
    merchantId: string,
    orderId: string,
    data: {
      captureMethod?: 'AUTOMATIC' | 'MANUAL';
      description?: string;
      statementDescriptor?: string;
      metadata?: Record<string, unknown>;
    },
    environment: Environment = Environment.SANDBOX,
  ): Promise<PaymentIntent> {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, merchantId },
    });

    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }

    const clientSecret = `pi_secret_${randomUUID().replace(/-/g, '')}`;

    return this.prisma.paymentIntent.create({
      data: {
        orderId,
        merchantId,
        amount: order.amount,
        currency: order.currency,
        captureMethod: data.captureMethod ?? 'AUTOMATIC',
        description: data.description,
        statementDescriptor: data.statementDescriptor,
        metadata: data.metadata as any,
        clientSecret,
        status: PaymentIntentStatus.CREATED,
        environment,
      },
    });
  }

  async confirmPaymentIntent(
    merchantId: string,
    paymentIntentId: string,
    data: {
      paymentMethodType: string;
      paymentMethodData?: Record<string, unknown>;
      simulateOutcome?: 'success' | 'failure' | 'timeout' | 'requires_action';
    },
  ): Promise<PaymentIntent> {
    const intent = await this.findOneOrThrow(merchantId, paymentIntentId);

    // Never trust client for payment status
    if (
      intent.status !== PaymentIntentStatus.CREATED &&
      intent.status !== PaymentIntentStatus.REQUIRES_ACTION
    ) {
      throw new BadRequestException(
        `Payment intent is in ${intent.status} state and cannot be confirmed`,
      );
    }

    // Transition to PROCESSING
    try {
      assertValidTransition(intent.status, PaymentIntentStatus.PROCESSING);
    } catch (e) {
      if (e instanceof InvalidStateTransitionError) {
        throw new BadRequestException(e.message);
      }
      throw e;
    }

    // Call mock provider (sandbox only)
    const providerResponse = await this.mockProvider.createPayment({
      amount: Number(intent.amount),
      currency: intent.currency,
      paymentMethodType: data.paymentMethodType,
      simulateOutcome: data.simulateOutcome ?? 'success',
    });

    const newStatus =
      providerResponse.status === 'authorised'
        ? PaymentIntentStatus.CAPTURED   // auto-capture flow
        : providerResponse.status === 'requires_action'
          ? PaymentIntentStatus.REQUIRES_ACTION
          : PaymentIntentStatus.FAILED;

    return this.prisma.$transaction(async (tx) => {
      // Record the attempt
      await tx.paymentAttempt.create({
        data: {
          paymentIntentId: intent.id,
          amount: intent.amount,
          currency: intent.currency,
          status:
            newStatus === PaymentIntentStatus.CAPTURED
              ? 'CAPTURED'
              : newStatus === PaymentIntentStatus.FAILED
                ? 'FAILED'
                : 'PENDING',
          providerRef: providerResponse.providerRef,
          providerResponse: {
            ...providerResponse,
            // Strip any sensitive values before persisting
          },
          errorCode: providerResponse.errorCode,
          errorMessage: providerResponse.errorMessage,
        },
      });

      // Update intent state — atomic with optimistic locking
      const updated = await tx.paymentIntent.updateMany({
        where: { id: intent.id, version: intent.version },
        data: {
          status: newStatus,
          providerRef: providerResponse.providerRef,
          capturedAt:
            newStatus === PaymentIntentStatus.CAPTURED ? new Date() : undefined,
          captureAmount:
            newStatus === PaymentIntentStatus.CAPTURED
              ? intent.amount
              : undefined,
          version: intent.version + 1,
        },
      });

      if (updated.count === 0) {
        throw new ConflictException(
          'Payment intent was modified concurrently. Please retry.',
        );
      }

      if (newStatus === PaymentIntentStatus.CAPTURED) {
        await this.recordCaptureLedgerEntry(
          intent.id,
          intent.amount,
          intent.currency,
          tx,
        );
      }

      return tx.paymentIntent.findUniqueOrThrow({ where: { id: intent.id } });
    });
  }

  async capturePaymentIntent(
    merchantId: string,
    paymentIntentId: string,
    captureAmount?: number,
  ): Promise<PaymentIntent> {
    const intent = await this.findOneOrThrow(merchantId, paymentIntentId);

    try {
      assertValidTransition(intent.status, PaymentIntentStatus.CAPTURED);
    } catch (e) {
      if (e instanceof InvalidStateTransitionError) {
        throw new BadRequestException(e.message);
      }
      throw e;
    }

    const finalAmount = captureAmount
      ? BigInt(captureAmount)
      : intent.amount;

    if (finalAmount > intent.amount) {
      throw new BadRequestException(
        'Capture amount cannot exceed authorised amount',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.paymentIntent.updateMany({
        where: { id: intent.id, version: intent.version },
        data: {
          status: PaymentIntentStatus.CAPTURED,
          capturedAt: new Date(),
          captureAmount: finalAmount,
          version: intent.version + 1,
        },
      });

      if (updated.count === 0) {
        throw new ConflictException(
          'Payment intent was modified concurrently. Please retry.',
        );
      }

      await this.recordCaptureLedgerEntry(
        intent.id,
        finalAmount,
        intent.currency,
        tx,
      );

      return tx.paymentIntent.findUniqueOrThrow({ where: { id: intent.id } });
    });
  }

  async cancelPaymentIntent(
    merchantId: string,
    paymentIntentId: string,
    reason?: string,
  ): Promise<PaymentIntent> {
    const intent = await this.findOneOrThrow(merchantId, paymentIntentId);

    try {
      assertValidTransition(intent.status, PaymentIntentStatus.CANCELLED);
    } catch (e) {
      if (e instanceof InvalidStateTransitionError) {
        throw new BadRequestException(e.message);
      }
      throw e;
    }

    return this.prisma.paymentIntent.update({
      where: { id: intent.id },
      data: {
        status: PaymentIntentStatus.CANCELLED,
        cancelledAt: new Date(),
        cancelReason: reason,
        version: intent.version + 1,
      },
    });
  }

  async findOne(merchantId: string, id: string): Promise<PaymentIntent | null> {
    return this.prisma.paymentIntent.findFirst({
      where: { id, merchantId },
      include: { attempts: true, refunds: true },
    });
  }

  async findAll(
    merchantId: string,
    opts: {
      cursor?: string;
      limit?: number;
      status?: PaymentIntentStatus;
      environment?: Environment;
    },
  ) {
    const limit = Math.min(opts.limit ?? 20, 100);
    const items = await this.prisma.paymentIntent.findMany({
      where: {
        merchantId,
        ...(opts.status ? { status: opts.status } : {}),
        ...(opts.environment ? { environment: opts.environment } : {}),
        ...(opts.cursor ? { id: { lt: opts.cursor } } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: limit + 1,
    });

    const hasMore = items.length > limit;
    const data = hasMore ? items.slice(0, limit) : items;
    return {
      data,
      hasMore,
      nextCursor: hasMore ? data[data.length - 1]?.id : undefined,
    };
  }

  private async findOneOrThrow(
    merchantId: string,
    id: string,
  ): Promise<PaymentIntent> {
    const intent = await this.findOne(merchantId, id);
    if (!intent) {
      throw new NotFoundException(`Payment intent ${id} not found`);
    }
    return intent;
  }
}
