import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import { Environment, KycStatus, ApiKeyStatus } from '@prisma/client';
import { randomBytes, createHash } from 'crypto';

@Injectable()
export class MerchantsService {
  constructor(private readonly prisma: PrismaService) {}

  async getMerchant(merchantId: string) {
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

  async updateMerchant(
    merchantId: string,
    data: {
      displayName?: string;
      supportEmail?: string;
      supportPhone?: string;
      website?: string;
      businessModel?: string;
    },
  ) {
    return this.prisma.merchant.update({
      where: { id: merchantId },
      data,
    });
  }

  async submitKyc(
    merchantId: string,
    data: {
      pan?: string;
      gstin?: string;
      cin?: string;
      businessType?: any;
    },
  ) {
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

  async getBankAccounts(merchantId: string) {
    return this.prisma.bankAccount.findMany({
      where: { merchantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addBankAccount(
    merchantId: string,
    data: {
      accountHolderName: string;
      accountNumber: string;
      ifsc: string;
      bankName: string;
      accountType: 'CURRENT' | 'SAVINGS';
    },
  ) {
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

  async listApiKeys(merchantId: string) {
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

  async createApiKey(
    merchantId: string,
    userId: string,
    data: { name: string; environment: Environment; scopes?: string[] },
  ) {
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

  async revokeApiKey(merchantId: string, keyId: string, userId: string) {
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
}
