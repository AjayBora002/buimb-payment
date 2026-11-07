var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ObserversService_1;
var _a, _b;
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import { BankSmsParser, BankEmailParser } from '@buimbpay/payments';
import * as crypto from 'crypto';
import { CheckoutService } from '../checkout/checkout.service.js';
let ObserversService = ObserversService_1 = class ObserversService {
    prisma;
    checkoutService;
    logger = new Logger(ObserversService_1.name);
    constructor(prisma, checkoutService) {
        this.prisma = prisma;
        this.checkoutService = checkoutService;
    }
    /**
     * Generates SHA-256 fingerprint for observation deduplication.
     */
    computeFingerprint(raw, amountPaise, utr) {
        const payload = `${raw}|${amountPaise?.toString() || ''}|${utr || ''}`;
        return crypto.createHash('sha256').update(payload).digest('hex');
    }
    /**
     * Pairs a new Android APK or observer device.
     */
    async pairDevice(dto) {
        let merchantId = dto.merchantId;
        if (!merchantId) {
            const m = await this.prisma.merchant.findFirst();
            if (!m)
                throw new BadRequestException('No merchant account found');
            merchantId = m.id;
        }
        const deviceId = `DEV-${Date.now().toString(36)}-${crypto.randomBytes(3).toString('hex')}`.toUpperCase();
        const secretKey = crypto.randomBytes(24).toString('hex');
        const device = await this.prisma.observerDevice.create({
            data: {
                merchantId,
                deviceId,
                deviceName: dto.deviceName || 'Android SMS Observer',
                deviceType: dto.deviceType || 'ANDROID',
                secretKey,
                pairedAt: new Date(),
                status: 'ACTIVE',
            },
        });
        return {
            deviceId: device.deviceId,
            deviceName: device.deviceName,
            secretKey: device.secretKey,
            status: device.status,
            pairedAt: device.pairedAt?.toISOString(),
        };
    }
    /**
     * Ingests and processes incoming Bank SMS alert (from Android APK or SMS observer).
     */
    async ingestSms(dto) {
        if (!dto.text)
            throw new BadRequestException('SMS text is required');
        // Optional: verify device signature if deviceId is provided
        let verifiedMerchantId = null;
        if (dto.deviceId) {
            const device = await this.prisma.observerDevice.findUnique({
                where: { deviceId: dto.deviceId },
            });
            if (device) {
                verifiedMerchantId = device.merchantId;
                // Update device heartbeat
                await this.prisma.observerDevice.update({
                    where: { id: device.id },
                    data: { lastHeartbeat: new Date() },
                });
            }
        }
        // 1. Parse SMS using intelligent multi-bank parser
        const parsed = BankSmsParser.parse({
            text: dto.text,
            sender: dto.sender,
            timestamp: dto.timestamp,
        });
        if (!parsed) {
            this.logger.log(`[Observer] Discarded non-credit or unparseable SMS: "${dto.text.slice(0, 80)}"`);
            return {
                status: 'IGNORED',
                reason: 'Message does not represent a valid incoming credit alert',
            };
        }
        // 2. Compute deduplication fingerprint
        const fingerprint = this.computeFingerprint(dto.text, parsed.amountPaise, parsed.bankReferenceNumber);
        const existing = await this.prisma.bankObservation.findFirst({
            where: { fingerprintHash: fingerprint },
        });
        if (existing) {
            this.logger.warn(`[Observer] Dropped duplicate bank SMS (fingerprint: ${fingerprint.slice(0, 12)})`);
            return {
                status: 'DUPLICATE',
                observationId: existing.id,
            };
        }
        // 3. Persist BankObservation
        const obs = await this.prisma.bankObservation.create({
            data: {
                merchantId: verifiedMerchantId,
                channel: 'SMS',
                sender: dto.sender || 'BANK_SMS',
                rawPayload: dto.text,
                fingerprintHash: fingerprint,
                parsedAmount: parsed.amountPaise,
                utr: parsed.bankReferenceNumber,
                payerVpa: parsed.senderVpa,
                observedAt: parsed.observedAt,
                status: 'RECEIVED',
            },
        });
        // 4. Deterministic Amount Attribution
        // Match against active checkout sessions expecting this EXACT amount
        const session = await this.prisma.checkoutSession.findFirst({
            where: {
                amount: parsed.amountPaise,
                status: { in: ['ACTIVE', 'PROCESSING'] },
            },
            orderBy: { createdAt: 'asc' }, // FIFO attribution
        });
        if (session) {
            this.logger.log(`[Observer] 🎯 PAYMENT MATCHED! Session ${session.id} credited with ₹${parsed.amountRupees} (UTR: ${parsed.bankReferenceNumber || 'N/A'})`);
            // Finalize session to SUCCESS
            await this.prisma.checkoutSession.update({
                where: { id: session.id },
                data: {
                    status: 'SUCCESS',
                    matchedObservationId: obs.id,
                    utr: parsed.bankReferenceNumber || `UTR-${Date.now()}`,
                    payerVpa: parsed.senderVpa || session.payerVpa,
                },
            });
            // Mark observation as MATCHED
            await this.prisma.bankObservation.update({
                where: { id: obs.id },
                data: {
                    status: 'MATCHED',
                    matchedSessionId: session.id,
                },
            });
            // If linked to PaymentIntent, finalize to CAPTURED
            if (session.paymentIntentId) {
                try {
                    await this.prisma.paymentIntent.update({
                        where: { id: session.paymentIntentId },
                        data: {
                            status: 'CAPTURED',
                            capturedAt: new Date(),
                            captureAmount: parsed.amountPaise,
                            providerRef: parsed.bankReferenceNumber,
                        },
                    });
                }
                catch (e) {
                    this.logger.warn(`Could not update PaymentIntent: ${e.message}`);
                }
            }
            // Promote next queued customer
            if (session.vpa) {
                await this.checkoutService.advanceQueue(session.vpa);
            }
            return {
                status: 'MATCHED',
                observationId: obs.id,
                sessionId: session.id,
                amount: Number(parsed.amountPaise),
                utr: parsed.bankReferenceNumber,
            };
        }
        return {
            status: 'UNMATCHED',
            observationId: obs.id,
            amount: Number(parsed.amountPaise),
            utr: parsed.bankReferenceNumber,
            message: 'Observation saved but no matching active checkout session found for this amount.',
        };
    }
    /**
     * Ingests and processes incoming Bank Email alert (Gmail observer).
     */
    async ingestGmail(dto) {
        const parsed = BankEmailParser.parse(dto);
        if (!parsed) {
            return { status: 'IGNORED', reason: 'Email does not contain a credit alert' };
        }
        const raw = `${dto.subject || ''} ${dto.body || ''}`;
        const fingerprint = this.computeFingerprint(raw, parsed.amountPaise, parsed.bankReferenceNumber);
        const existing = await this.prisma.bankObservation.findFirst({
            where: { fingerprintHash: fingerprint },
        });
        if (existing) {
            return { status: 'DUPLICATE', observationId: existing.id };
        }
        const obs = await this.prisma.bankObservation.create({
            data: {
                channel: 'GMAIL',
                sender: dto.from || 'BANK_EMAIL',
                rawPayload: raw.slice(0, 4000),
                fingerprintHash: fingerprint,
                parsedAmount: parsed.amountPaise,
                utr: parsed.bankReferenceNumber,
                payerVpa: parsed.senderVpa,
                observedAt: parsed.observedAt,
                status: 'RECEIVED',
            },
        });
        const session = await this.prisma.checkoutSession.findFirst({
            where: {
                amount: parsed.amountPaise,
                status: { in: ['ACTIVE', 'PROCESSING'] },
            },
            orderBy: { createdAt: 'asc' },
        });
        if (session) {
            await this.prisma.checkoutSession.update({
                where: { id: session.id },
                data: {
                    status: 'SUCCESS',
                    matchedObservationId: obs.id,
                    utr: parsed.bankReferenceNumber || `UTR-${Date.now()}`,
                    payerVpa: parsed.senderVpa || session.payerVpa,
                },
            });
            await this.prisma.bankObservation.update({
                where: { id: obs.id },
                data: { status: 'MATCHED', matchedSessionId: session.id },
            });
            if (session.paymentIntentId) {
                try {
                    await this.prisma.paymentIntent.update({
                        where: { id: session.paymentIntentId },
                        data: {
                            status: 'CAPTURED',
                            capturedAt: new Date(),
                            captureAmount: parsed.amountPaise,
                            providerRef: parsed.bankReferenceNumber,
                        },
                    });
                }
                catch { }
            }
            if (session.vpa) {
                await this.checkoutService.advanceQueue(session.vpa);
            }
            return {
                status: 'MATCHED',
                observationId: obs.id,
                sessionId: session.id,
                amount: Number(parsed.amountPaise),
            };
        }
        return {
            status: 'UNMATCHED',
            observationId: obs.id,
            amount: Number(parsed.amountPaise),
        };
    }
    /**
     * List connected observer devices.
     */
    async getDevices(merchantId) {
        const where = merchantId ? { merchantId } : {};
        return this.prisma.observerDevice.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }
    /**
     * Get live observations feed.
     */
    async getLiveFeed(limit = 30) {
        return this.prisma.bankObservation.findMany({
            take: limit,
            orderBy: { createdAt: 'desc' },
        });
    }
};
ObserversService = ObserversService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object, typeof (_b = typeof CheckoutService !== "undefined" && CheckoutService) === "function" ? _b : Object])
], ObserversService);
export { ObserversService };
