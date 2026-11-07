var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
let RouteService = class RouteService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createLinkedAccount(merchantId, data) {
        return this.prisma.linkedAccount.create({
            data: {
                merchantId,
                name: data.name,
                email: data.email,
                phone: data.phone,
                businessType: data.businessType || 'INDIVIDUAL',
                accountNumber: data.accountNumber,
                ifsc: data.ifsc,
                vpa: data.vpa,
                splitSharePct: data.splitSharePct ? Number(data.splitSharePct) : 90.0,
                status: 'ACTIVE',
            },
        });
    }
    async listLinkedAccounts(merchantId) {
        return this.prisma.linkedAccount.findMany({
            where: { merchantId },
            include: {
                _count: {
                    select: { transfers: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createTransfer(merchantId, data) {
        const account = await this.prisma.linkedAccount.findFirst({
            where: { id: data.linkedAccountId, merchantId },
        });
        if (!account) {
            throw new NotFoundException('Linked account not found');
        }
        const payment = await this.prisma.paymentIntent.findFirst({
            where: { id: data.paymentIntentId, merchantId },
        });
        if (!payment) {
            throw new NotFoundException('Payment not found');
        }
        const feePaise = Math.round(Number(data.amountPaise) * 0.02); // 2% platform fee
        const taxPaise = Math.round(feePaise * 0.18); // 18% GST
        return this.prisma.paymentTransfer.create({
            data: {
                paymentIntentId: data.paymentIntentId,
                linkedAccountId: data.linkedAccountId,
                amount: BigInt(data.amountPaise),
                currency: data.currency || 'INR',
                fee: BigInt(feePaise),
                tax: BigInt(taxPaise),
                notes: data.notes,
                status: 'PROCESSED',
            },
        });
    }
    async listTransfers(merchantId) {
        const transfers = await this.prisma.paymentTransfer.findMany({
            where: {
                linkedAccount: { merchantId },
            },
            include: {
                linkedAccount: true,
                paymentIntent: {
                    select: {
                        id: true,
                        amount: true,
                        currency: true,
                        status: true,
                    },
                },
                reversals: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
        return transfers.map((t) => ({
            ...t,
            amount: t.amount.toString(),
            fee: t.fee.toString(),
            tax: t.tax.toString(),
            paymentIntent: t.paymentIntent ? {
                ...t.paymentIntent,
                amount: t.paymentIntent.amount.toString(),
            } : null,
        }));
    }
    async reverseTransfer(merchantId, transferId, data) {
        const transfer = await this.prisma.paymentTransfer.findFirst({
            where: {
                id: transferId,
                linkedAccount: { merchantId },
            },
        });
        if (!transfer) {
            throw new NotFoundException('Transfer not found');
        }
        if (BigInt(data.amountPaise) > transfer.amount) {
            throw new BadRequestException('Reversal amount exceeds original transfer amount');
        }
        const reversal = await this.prisma.transferReversal.create({
            data: {
                transferId,
                amount: BigInt(data.amountPaise),
                currency: transfer.currency,
                reason: data.reason || 'Merchant initiated reversal',
            },
        });
        await this.prisma.paymentTransfer.update({
            where: { id: transferId },
            data: { status: 'REVERSED' },
        });
        return {
            ...reversal,
            amount: reversal.amount.toString(),
        };
    }
};
RouteService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object])
], RouteService);
export { RouteService };
