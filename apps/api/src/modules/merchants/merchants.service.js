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
import { Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import { Environment, KycStatus, ApiKeyStatus } from '@prisma/client';
import { randomBytes, createHash } from 'crypto';
let MerchantsService = class MerchantsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMerchant(merchantId) {
        const merchant = await this.prisma.merchant.findUnique({
            where: { id: merchantId },
            include: {
                bankAccounts: {
                    select: {
                        id: true,
                        accountNumber: true,
                        ifscCode: true,
                        bankName: true,
                        accountType: true,
                        isVerified: true,
                        isPrimary: true,
                        isActive: true,
                    },
                },
                documents: {
                    select: {
                        id: true,
                        documentType: true,
                        fileName: true,
                        status: true,
                        createdAt: true,
                    },
                },
            },
        });
        if (!merchant) {
            throw new NotFoundException(`Merchant ${merchantId} not found`);
        }
        return merchant;
    }
    async updateMerchant(merchantId, data) {
        return this.prisma.merchant.update({
            where: { id: merchantId },
            data,
        });
    }
    async submitKyc(merchantId, data) {
        const merchant = await this.prisma.merchant.update({
            where: { id: merchantId },
            data: {
                ...data,
                kycStatus: KycStatus.UNDER_REVIEW,
            },
        });
        await this.prisma.kycCase.create({
            data: {
                merchantId,
                status: KycStatus.UNDER_REVIEW,
                notes: 'KYC submitted via portal',
            },
        });
        return merchant;
    }
    async getBankAccounts(merchantId) {
        return this.prisma.bankAccount.findMany({
            where: { merchantId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async addBankAccount(merchantId, data) {
        // In production the accountNumber is encrypted at rest with KMS
        return this.prisma.bankAccount.create({
            data: {
                merchantId,
                accountHolderName: data.accountHolderName,
                accountNumber: data.accountNumber,
                ifscCode: data.ifsc.toUpperCase(),
                bankName: data.bankName,
                accountType: data.accountType,
            },
        });
    }
    async listApiKeys(merchantId) {
        return this.prisma.apiKey.findMany({
            where: { merchantId, revokedAt: null },
            select: {
                id: true,
                name: true,
                keyPrefix: true,
                environment: true,
                scopes: true,
                status: true,
                lastUsedAt: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createApiKey(merchantId, userId, data) {
        const prefix = data.environment === Environment.PRODUCTION ? 'bp_live_' : 'bp_test_';
        const secretRandom = randomBytes(24).toString('hex');
        const fullKey = `${prefix}${secretRandom}`;
        const keyHash = createHash('sha256').update(fullKey).digest('hex');
        const keyPrefix = `${prefix}${secretRandom.slice(0, 8)}...`;
        const apiKey = await this.prisma.apiKey.create({
            data: {
                merchantId,
                userId,
                name: data.name,
                keyHash,
                keyPrefix,
                environment: data.environment,
                scopes: data.scopes || ['read', 'write'],
                status: ApiKeyStatus.ACTIVE,
            },
        });
        // Return the secret key ONLY once here
        return {
            id: apiKey.id,
            name: apiKey.name,
            keyPrefix: apiKey.keyPrefix,
            environment: apiKey.environment,
            secretKey: fullKey,
            createdAt: apiKey.createdAt,
        };
    }
    async revokeApiKey(merchantId, keyId, userId) {
        const key = await this.prisma.apiKey.findFirst({
            where: { id: keyId, merchantId },
        });
        if (!key) {
            throw new NotFoundException('API key not found');
        }
        return this.prisma.apiKey.update({
            where: { id: keyId },
            data: {
                status: ApiKeyStatus.REVOKED,
                revokedAt: new Date(),
                revokedBy: userId,
            },
        });
    }
};
MerchantsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof PrismaService !== "undefined" && PrismaService) === "function" ? _a : Object])
], MerchantsService);
export { MerchantsService };
