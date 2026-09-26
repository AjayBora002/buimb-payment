import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';

@Injectable()
export class LedgerService {
  constructor(private readonly prisma: PrismaService) {}

  async recordTransaction(data: {
    type: string;
    description: string;
    referenceId?: string;
    paymentIntentId?: string;
    actorId?: string;
    entries: Array<{
      debitAccountId: string;
      creditAccountId: string;
      amount: bigint | number;
      currency: string;
      description?: string;
    }>;
  }, txClient?: any) {
    if (!data.entries || data.entries.length === 0) {
      throw new BadRequestException('Transaction must contain at least one ledger entry');
    }

    // Double-entry validation: each entry has matching debit and credit accounts and positive amount
    for (const entry of data.entries) {
      const amt = BigInt(entry.amount);
      if (amt <= 0n) {
        throw new BadRequestException('Ledger entry amount must be strictly positive');
      }
      if (entry.debitAccountId === entry.creditAccountId) {
        throw new BadRequestException('Debit and credit accounts must be distinct');
      }
    }

    const execute = async (tx: any) => {
      const transaction = await tx.ledgerTransaction.create({
        data: {
          type: data.type,
          description: data.description,
          referenceId: data.referenceId,
          paymentIntentId: data.paymentIntentId,
          actorId: data.actorId,
        },
      });

      const entryRecords = data.entries.map((e) => ({
        ledgerTransactionId: transaction.id,
        debitAccountId: e.debitAccountId,
        creditAccountId: e.creditAccountId,
        amount: BigInt(e.amount),
        currency: e.currency.toUpperCase(),
        description: e.description,
      }));

      await tx.ledgerEntry.createMany({
        data: entryRecords,
      });

      return transaction;
    };

    if (txClient) {
      return execute(txClient);
    }
    return this.prisma.$transaction(execute);
  }

  async getOrCreateAccount(
    code: string,
    fallback: { name: string; type: any; currency?: string; merchantId?: string },
    txClient?: any,
  ) {
    const client = txClient || this.prisma;
    return client.ledgerAccount.upsert({
      where: { code },
      update: {},
      create: {
        code,
        name: fallback.name,
        type: fallback.type,
        currency: fallback.currency || 'INR',
        merchantId: fallback.merchantId,
      },
    });
  }

  async listAccounts(merchantId?: string) {
    return this.prisma.ledgerAccount.findMany({
      where: merchantId ? { merchantId } : {},
      orderBy: { code: 'asc' },
    });
  }

  async listTransactions(query: {
    paymentIntentId?: string;
    cursor?: string;
    limit?: number;
  } = {}) {
    const limit = Math.min(query.limit ?? 20, 100);
    const where: any = {};
    if (query.paymentIntentId) where.paymentIntentId = query.paymentIntentId;

    const items = await this.prisma.ledgerTransaction.findMany({
      where,
      take: limit + 1,
      ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
      orderBy: { createdAt: 'desc' },
      include: {
        entries: {
          include: {
            debitAccount: { select: { code: true, name: true, type: true } },
            creditAccount: { select: { code: true, name: true, type: true } },
          },
        },
      },
    });

    const hasMore = items.length > limit;
    const result = hasMore ? items.slice(0, limit) : items;
    const nextCursor = hasMore ? result[result.length - 1].id : null;

    return { items: result, nextCursor };
  }
}
