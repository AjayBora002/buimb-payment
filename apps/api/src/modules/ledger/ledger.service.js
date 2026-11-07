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
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
let LedgerService = class LedgerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async recordTransaction(data, txClient) {
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
        const execute = async (tx) => {
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
    async getOrCreateAccount(code, fallback, txClient) {
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
    async listAccounts(merchantId) {
        return this.prisma.ledgerAccount.findMany({
            where: merchantId ? { merchantId } : {},
            orderBy: { code: 'asc' },
        });
    }
    async listTransactions(query = {}) {
        const limit = Math.min(query.limit ?? 20, 100);
        const where = {};
        if (query.paymentIntentId)
            where.paymentIntentId = query.paymentIntentId;
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
};
LedgerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object])
], LedgerService);
export { LedgerService };
