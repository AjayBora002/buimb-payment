import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import { buildUpiUri, buildUpiAppLinks, generateQrSvg } from '@buimbpay/payments';
import { PaymentsService } from '../payments/payments.service.js';

export interface CreateCheckoutSessionDto {
  merchantId?: string;
  orderId?: string;
  amount: number; // in paise or rupees (auto-normalized)
  currency?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  description?: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class CheckoutService {
  private readonly logger = new Logger(CheckoutService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentsService: PaymentsService,
  ) {}

  /**
   * Resolves or provisions a receiving VPA for the merchant.
   */
  async getOrCreateReceivingVpa(merchantId: string) {
    let receiving = await this.prisma.receivingVpa.findFirst({
      where: { merchantId, isActive: true },
      orderBy: { createdAt: 'asc' },
    });

    if (!receiving) {
      // Find merchant details
      const merchant = await this.prisma.merchant.findUnique({
        where: { id: merchantId },
        select: { displayName: true, legalName: true },
      });

      const holderName = merchant?.displayName || merchant?.legalName || 'BuimbPay Merchant';
      const defaultVpa = `buimbpay.${merchantId.slice(0, 8)}@icici`;

      receiving = await this.prisma.receivingVpa.create({
        data: {
          merchantId,
          vpa: defaultVpa,
          accountHolderName: holderName,
          bankName: 'ICICI Bank',
          isActive: true,
        },
      });
    }

    return receiving;
  }

  /**
   * Creates a sovereign UPI Checkout Session with dynamic SVG QR code and decoupled dual timers.
   */
  async createSession(dto: CreateCheckoutSessionDto) {
    // 1. Resolve merchant
    let merchantId = dto.merchantId;
    if (!merchantId) {
      const defaultMerchant = await this.prisma.merchant.findFirst();
      if (!defaultMerchant) {
        throw new BadRequestException('No merchant account configured in the system');
      }
      merchantId = defaultMerchant.id;
    }

    // Amount normalization: if amount <= 10000 and has no fractional cents, assume it could be in paise or rupees.
    // If integer < 1000, e.g. 499, treat as 49900 paise unless explicitly >= 10000.
    let amountPaise = BigInt(dto.amount);
    if (amountPaise < 10000n && dto.amount % 1 === 0) {
      // If user passed e.g. 500, treat as ₹500 = 50000 paise
      amountPaise = BigInt(Math.round(dto.amount * 100));
    }

    // 2. Resolve VPA
    const receiving = await this.getOrCreateReceivingVpa(merchantId);

    // 3. Single-Active-Slot FIFO Queue Invariant
    // Check if an existing ACTIVE or PROCESSING session is currently occupying this VPA
    const now = new Date();
    const activeOnVpa = await this.prisma.checkoutSession.findFirst({
      where: {
        vpa: receiving.vpa,
        status: { in: ['ACTIVE', 'PROCESSING'] },
        expiresAt: { gt: now },
      },
      orderBy: { createdAt: 'asc' },
    });

    let status = 'ACTIVE';
    let queuePosition = 0;
    let expiresAt: Date | null = new Date(Date.now() + 5 * 60 * 1000); // 5-minute payment window

    if (activeOnVpa) {
      // VPA is currently occupied by another paying customer.
      // Queue this customer to avoid amount collision.
      status = 'QUEUED';
      expiresAt = null; // timer starts when promoted to ACTIVE
      const queuedCount = await this.prisma.checkoutSession.count({
        where: { vpa: receiving.vpa, status: 'QUEUED' },
      });
      queuePosition = queuedCount + 1;
    }

    // 4. Construct UPI URI and Vector SVG QR
    const upiUri = buildUpiUri({
      vpa: receiving.vpa,
      payeeName: receiving.accountHolderName,
      amountPaise,
      transactionNote: dto.description || 'Order Payment',
      transactionRef: `BP${Date.now().toString().slice(-8)}`,
    });

    // 5. Create PaymentIntent if Order is provided
    let paymentIntentId: string | null = null;
    let orderId = dto.orderId;

    if (orderId) {
      try {
        const intent = await this.paymentsService.createPaymentIntent(merchantId, orderId, {
          description: dto.description,
        });
        paymentIntentId = intent.id;
      } catch (err: any) {
        this.logger.warn(`Could not create PaymentIntent for order ${orderId}: ${err.message}`);
      }
    }

    // 6. Persist CheckoutSession
    const session = await this.prisma.checkoutSession.create({
      data: {
        merchantId,
        orderId,
        paymentIntentId,
        amount: amountPaise,
        currency: dto.currency || 'INR',
        vpa: receiving.vpa,
        upiUri,
        status,
        queuePosition,
        customerName: dto.customerName,
        customerPhone: dto.customerPhone,
        customerEmail: dto.customerEmail,
        expiresAt,
        metadata: dto.metadata,
      },
    });

    const qrSvg = generateQrSvg(upiUri, 280);
    const appLinks = buildUpiAppLinks(upiUri);

    return {
      id: session.id,
      merchantId: session.merchantId,
      orderId: session.orderId,
      amount: Number(session.amount),
      amountRupees: (Number(session.amount) / 100).toFixed(2),
      currency: session.currency,
      status: session.status,
      queuePosition: session.queuePosition,
      vpa: session.vpa,
      payeeName: receiving.accountHolderName,
      upiUri: session.upiUri,
      qrSvg,
      appLinks,
      expiresAt: session.expiresAt?.toISOString() || null,
      verificationExpiresAt: session.verificationExpiresAt?.toISOString() || null,
      createdAt: session.createdAt.toISOString(),
    };
  }

  /**
   * Retrieves checkout session details and checks timer expiration.
   */
  async getSession(id: string) {
    const session = await this.prisma.checkoutSession.findUnique({
      where: { id },
      include: {
        merchant: {
          select: { displayName: true, legalName: true },
        },
      },
    });

    if (!session) {
      throw new NotFoundException(`Checkout session ${id} not found`);
    }

    const now = new Date();

    // Check expiration if session is ACTIVE or PROCESSING
    if (session.status === 'ACTIVE' && session.expiresAt && session.expiresAt < now) {
      await this.prisma.checkoutSession.update({
        where: { id },
        data: { status: 'EXPIRED' },
      });
      session.status = 'EXPIRED';
      if (session.vpa) {
        await this.advanceQueue(session.vpa);
      }
    } else if (
      session.status === 'PROCESSING' &&
      session.verificationExpiresAt &&
      session.verificationExpiresAt < now
    ) {
      // 30-second verification timer finished without credit alert
      // Revert back to ACTIVE if 5-minute payment window is still valid, else EXPIRED
      if (session.expiresAt && session.expiresAt > now) {
        await this.prisma.checkoutSession.update({
          where: { id },
          data: { status: 'ACTIVE', verificationExpiresAt: null },
        });
        session.status = 'ACTIVE';
      } else {
        await this.prisma.checkoutSession.update({
          where: { id },
          data: { status: 'EXPIRED' },
        });
        session.status = 'EXPIRED';
        if (session.vpa) {
          await this.advanceQueue(session.vpa);
        }
      }
    }

    const payeeName = session.merchant.displayName || session.merchant.legalName || 'BuimbPay Merchant';
    const upiUri = session.upiUri || '';
    const qrSvg = upiUri ? generateQrSvg(upiUri, 280) : '';
    const appLinks = upiUri ? buildUpiAppLinks(upiUri) : null;

    // Calculate remaining seconds
    let remainingPaymentSeconds = 0;
    if (session.status === 'ACTIVE' && session.expiresAt) {
      remainingPaymentSeconds = Math.max(0, Math.floor((session.expiresAt.getTime() - now.getTime()) / 1000));
    }

    let remainingVerificationSeconds = 0;
    if (session.status === 'PROCESSING' && session.verificationExpiresAt) {
      remainingVerificationSeconds = Math.max(
        0,
        Math.floor((session.verificationExpiresAt.getTime() - now.getTime()) / 1000),
      );
    }

    return {
      id: session.id,
      merchantId: session.merchantId,
      orderId: session.orderId,
      amount: Number(session.amount),
      amountRupees: (Number(session.amount) / 100).toFixed(2),
      currency: session.currency,
      status: session.status,
      queuePosition: session.queuePosition,
      vpa: session.vpa,
      payeeName,
      customerName: session.customerName,
      customerPhone: session.customerPhone,
      upiUri,
      qrSvg,
      appLinks,
      remainingPaymentSeconds,
      remainingVerificationSeconds,
      expiresAt: session.expiresAt?.toISOString() || null,
      verificationExpiresAt: session.verificationExpiresAt?.toISOString() || null,
      utr: session.utr,
      payerVpa: session.payerVpa,
    };
  }

  /**
   * Triggers the 30-second verification window (`PROCESSING`).
   */
  async triggerVerification(id: string) {
    const session = await this.prisma.checkoutSession.findUnique({ where: { id } });
    if (!session) throw new NotFoundException(`Checkout session ${id} not found`);

    if (session.status === 'SUCCESS') return session;

    const verificationExpiresAt = new Date(Date.now() + 30 * 1000); // 30 seconds

    const updated = await this.prisma.checkoutSession.update({
      where: { id },
      data: {
        status: 'PROCESSING',
        verificationExpiresAt,
      },
    });

    return updated;
  }

  /**
   * Developer Test Mode: simulate instant payment success without needing a real mobile SMS.
   */
  async simulatePayment(id: string, outcome: 'success' | 'failure' = 'success') {
    const session = await this.prisma.checkoutSession.findUnique({ where: { id } });
    if (!session) throw new NotFoundException(`Checkout session ${id} not found`);

    if (outcome === 'failure') {
      const failed = await this.prisma.checkoutSession.update({
        where: { id },
        data: { status: 'FAILED' },
      });
      if (session.vpa) await this.advanceQueue(session.vpa);
      return failed;
    }

    const utr = `SIM${Date.now().toString().slice(-10)}`;
    const payerVpa = session.customerPhone ? `${session.customerPhone}@okaxis` : 'customer@upi';

    const updated = await this.prisma.checkoutSession.update({
      where: { id },
      data: {
        status: 'SUCCESS',
        utr,
        payerVpa,
      },
    });

    // If linked to PaymentIntent, mark as CAPTURED
    if (session.paymentIntentId) {
      try {
        await this.prisma.paymentIntent.update({
          where: { id: session.paymentIntentId },
          data: {
            status: 'CAPTURED',
            capturedAt: new Date(),
            captureAmount: session.amount,
            providerRef: utr,
          },
        });
      } catch (err: any) {
        this.logger.warn(`Could not update PaymentIntent: ${err.message}`);
      }
    }

    if (session.vpa) {
      await this.advanceQueue(session.vpa);
    }

    return updated;
  }

  /**
   * Customer cancels checkout session.
   */
  async cancelSession(id: string) {
    const session = await this.prisma.checkoutSession.findUnique({ where: { id } });
    if (!session) throw new NotFoundException(`Checkout session ${id} not found`);

    const updated = await this.prisma.checkoutSession.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    if (session.vpa) {
      await this.advanceQueue(session.vpa);
    }

    return updated;
  }

  /**
   * FIFO Queue Arbiter: atomically promotes the next queued customer for a receiving VPA.
   */
  async advanceQueue(vpa: string) {
    // Check if an active session is currently running
    const active = await this.prisma.checkoutSession.findFirst({
      where: {
        vpa,
        status: { in: ['ACTIVE', 'PROCESSING'] },
        expiresAt: { gt: new Date() },
      },
    });

    if (active) return; // slot is still occupied

    // Find first queued customer
    const nextQueued = await this.prisma.checkoutSession.findFirst({
      where: { vpa, status: 'QUEUED' },
      orderBy: { createdAt: 'asc' },
    });

    if (nextQueued) {
      await this.prisma.checkoutSession.update({
        where: { id: nextQueued.id },
        data: {
          status: 'ACTIVE',
          queuePosition: 0,
          expiresAt: new Date(Date.now() + 5 * 60 * 1000), // start 5-min timer
        },
      });

      // Decrement queue position for other waiting customers
      await this.prisma.checkoutSession.updateMany({
        where: { vpa, status: 'QUEUED', queuePosition: { gt: 1 } },
        data: { queuePosition: { decrement: 1 } },
      });
    }
  }
}

