import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service.js';
import {
  hashPassword,
  verifyPassword,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  generateSessionToken,
  validatePasswordStrength,
} from '@buimbpay/auth';
import { Environment, UserStatus } from '@prisma/client';
import { createHash } from 'crypto';

@Injectable()
export class IamService {
  constructor(private readonly prisma: PrismaService) {}

  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    organisationName?: string;
  }) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const strength = validatePasswordStrength(data.password);
    if (!strength.valid) {
      throw new BadRequestException(strength.errors.join(', '));
    }

    const passwordHash = await hashPassword(data.password);

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: data.email.toLowerCase(),
          passwordHash,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          status: UserStatus.ACTIVE,
        },
      });

      const orgName = data.organisationName || `${data.firstName}'s Org`;
      const orgSlug = `${data.firstName.toLowerCase()}-${Date.now()}`.replace(/[^a-z0-9]/g, '-');

      const org = await tx.organisation.create({
        data: {
          name: orgName,
          slug: orgSlug,
          type: 'MERCHANT',
        },
      });

      const merchant = await tx.merchant.create({
        data: {
          organisationId: org.id,
          legalName: orgName,
          displayName: orgName,
          businessType: 'PRIVATE_LIMITED',
        },
      });

      const adminRole = await tx.role.findUnique({
        where: { name: 'MERCHANT_ADMIN' },
      });

      if (adminRole) {
        await tx.merchantUser.create({
          data: {
            merchantId: merchant.id,
            userId: user.id,
            roleId: adminRole.id,
          },
        });
      }

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        merchantId: merchant.id,
      };
    });
  }

  async login(
    email: string,
    passwordPlain: string,
    meta: { ipAddress?: string; userAgent?: string } = {},
  ) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        merchantUsers: {
          include: { role: true, merchant: true },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status === UserStatus.LOCKED) {
      throw new UnauthorizedException('Account is locked. Please contact support.');
    }

    const valid = await verifyPassword(passwordPlain, user.passwordHash);
    if (!valid) {
      const attempts = user.failedLoginAttempts + 1;
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: attempts,
          lockedUntil: attempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null,
          status: attempts >= 5 ? UserStatus.LOCKED : user.status,
        },
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    // Reset failed attempts on success
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lastLoginAt: new Date(),
        lastLoginIp: meta.ipAddress,
      },
    });

    const merchantUser = user.merchantUsers[0];
    const merchantId = merchantUser?.merchantId;
    const roleName = merchantUser?.role.name;

    const sessionToken = generateSessionToken();
    const sessionTokenHash = createHash('sha256').update(sessionToken).digest('hex');

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const session = await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: sessionTokenHash,
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
        expiresAt,
      },
    });

    const accessToken = signAccessToken({
      sub: user.id,
      merchantId,
      role: roleName,
      env: 'SANDBOX',
    });

    const refreshToken = signRefreshToken({
      sub: user.id,
      sessionId: session.id,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        merchantId,
        role: roleName,
      },
    };
  }

  async refreshToken(token: string) {
    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const session = await this.prisma.session.findUnique({
      where: { id: payload.sessionId },
      include: {
        user: {
          include: {
            merchantUsers: {
              include: { role: true },
            },
          },
        },
      },
    });

    if (!session || session.revokedAt || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Session expired or revoked');
    }

    const merchantUser = session.user.merchantUsers[0];
    const merchantId = merchantUser?.merchantId;
    const roleName = merchantUser?.role.name;

    const accessToken = signAccessToken({
      sub: session.user.id,
      merchantId,
      role: roleName,
      env: 'SANDBOX',
    });

    return { accessToken };
  }

  async logout(sessionId: string) {
    await this.prisma.session.updateMany({
      where: { id: sessionId },
      data: { revokedAt: new Date() },
    });
    return { success: true };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        status: true,
        mfaEnabled: true,
        createdAt: true,
        merchantUsers: {
          select: {
            merchant: {
              select: {
                id: true,
                displayName: true,
                legalName: true,
                status: true,
                kycStatus: true,
              },
            },
            role: {
              select: {
                name: true,
                description: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
