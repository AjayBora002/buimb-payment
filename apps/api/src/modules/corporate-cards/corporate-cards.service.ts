import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';

@Injectable()
export class CorporateCardsService {
  constructor(private readonly prisma: PrismaService) {}

  async issueCard(merchantId: string, data: {
    cardholderName: string;
    spendingLimitPaise?: number;
    network?: string;
    cardType?: string;
  }) {
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

  async listCards(merchantId: string) {
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

  async toggleCardStatus(merchantId: string, cardId: string) {
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
}

