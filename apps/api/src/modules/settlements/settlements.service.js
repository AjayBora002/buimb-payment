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
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
let SettlementsService = class SettlementsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listSettlements(merchantId, query = {}) {
        const limit = Math.min(query.limit ?? 20, 100);
        const where = { merchantId };
        if (query.status)
            where.status = query.status;
        const items = await this.prisma.settlement.findMany({
            where,
            take: limit + 1,
            ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
            orderBy: { createdAt: 'desc' },
            include: {
                bankAccount: {
                    select: {
                        accountNumber: true,
                        bankName: true,
                        ifscCode: true,
                    },
                },
            },
        });
        const hasMore = items.length > limit;
        const result = hasMore ? items.slice(0, limit) : items;
        const nextCursor = hasMore ? result[result.length - 1].id : null;
        return { items: result, nextCursor };
    }
    async getSettlement(merchantId, id) {
        const settlement = await this.prisma.settlement.findFirst({
            where: { id, merchantId },
            include: {
                items: true,
                bankAccount: true,
            },
        });
        if (!settlement) {
            throw new NotFoundException(`Settlement ${id} not found`);
        }
        return settlement;
    }
    /**
     * Razorpay Instant Settlements (On-Demand T+0 Payout)
     */
    async requestInstantSettlement(merchantId) {
        const bankAccount = await this.prisma.bankAccount.findFirst({
            where: { merchantId },
        });
        const instantAmountPaise = 8450000; // ₹84,500.00 demo unsettled balance
        const feePaise = 1500; // ₹15.00 flat instant settlement fee
        const taxPaise = 270; // 18% GST
        const utr = `HDFC${Math.floor(1000000000 + Math.random() * 9000000000)}`;
        const now = new Date();
        const periodStart = new Date(now.getTime() - 86400000); // 24 hours ago
        const settlement = await this.prisma.settlement.create({
            data: {
                merchantId,
                bankAccountId: bankAccount?.id || null,
                grossAmount: BigInt(instantAmountPaise),
                feeAmount: BigInt(feePaise),
                taxAmount: BigInt(taxPaise),
                netAmount: BigInt(instantAmountPaise - feePaise - taxPaise),
                currency: 'INR',
                status: 'SETTLED',
                periodStart,
                periodEnd: now,
                providerRef: utr,
                settledAt: now,
            },
        });
        return {
            success: true,
            settlementId: settlement.id,
            utr,
            status: 'SETTLED',
            grossAmountRupees: (instantAmountPaise / 100).toFixed(2),
            netAmountRupees: ((instantAmountPaise - feePaise - taxPaise) / 100).toFixed(2),
            feeRupees: ((feePaise + taxPaise) / 100).toFixed(2),
            destinationBank: bankAccount ? `${bankAccount.bankName} •••• ${bankAccount.accountNumber.slice(-4)}` : 'HDFC Bank •••• 4891',
            message: 'Funds successfully credited to your bank account via instant IMPS settlement rails.',
            settledAt: settlement.settledAt,
        };
    }
};
SettlementsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object])
], SettlementsService);
export { SettlementsService };
