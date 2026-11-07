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
let CorporateCardsService = class CorporateCardsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async issueCard(merchantId, data) {
        const last4 = Math.floor(1000 + Math.random() * 9000).toString();
        const expiryMonth = (Math.floor(1 + Math.random() * 12)).toString().padStart(2, '0');
        const expiryYear = (new Date().getFullYear() + 4).toString();
        const card = await this.prisma.corporateCard.create({
            data: {
                merchantId,
                cardholderName: data.cardholderName.trim(),
                cardNumberMasked: `4242 •••• •••• ${last4}`,
                expiry: `${expiryMonth}/${expiryYear}`,
                network: data.network || 'VISA',
                cardType: data.cardType || 'VIRTUAL',
                spendingLimit: BigInt(data.spendingLimitPaise || 5000000), // default ₹50,000
                spentAmount: BigInt(0),
                status: 'ACTIVE',
            },
        });
        return {
            ...card,
            spendingLimit: card.spendingLimit.toString(),
            spentAmount: card.spentAmount.toString(),
            cvv: Math.floor(100 + Math.random() * 900).toString(),
        };
    }
    async listCards(merchantId) {
        const cards = await this.prisma.corporateCard.findMany({
            where: { merchantId },
            orderBy: { createdAt: 'desc' },
        });
        return cards.map((c) => ({
            ...c,
            spendingLimit: c.spendingLimit.toString(),
            spentAmount: c.spentAmount.toString(),
        }));
    }
    async toggleCardStatus(merchantId, cardId) {
        const card = await this.prisma.corporateCard.findFirst({
            where: { id: cardId, merchantId },
        });
        if (!card) {
            throw new NotFoundException('Corporate card not found');
        }
        const nextStatus = card.status === 'ACTIVE' ? 'FROZEN' : 'ACTIVE';
        const updated = await this.prisma.corporateCard.update({
            where: { id: cardId },
            data: { status: nextStatus },
        });
        return {
            id: updated.id,
            status: updated.status,
            message: `Card is now ${updated.status.toLowerCase()}`,
        };
    }
};
CorporateCardsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object])
], CorporateCardsService);
export { CorporateCardsService };
