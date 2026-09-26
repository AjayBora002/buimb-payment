import { prisma } from '../src/client.js';
import {
  Environment,
  BusinessType,
  MerchantStatus,
  LedgerAccountType,
} from '@prisma/client';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Seeding database...');

  // ── Roles ─────────────────────────────────────────────────────────────────
  const adminRole = await prisma.role.upsert({
    where: { name: 'MERCHANT_ADMIN' },
    update: {},
    create: {
      name: 'MERCHANT_ADMIN',
      description: 'Full access to merchant account',
      isSystem: true,
    },
  });

  const devRole = await prisma.role.upsert({
    where: { name: 'MERCHANT_DEVELOPER' },
    update: {},
    create: {
      name: 'MERCHANT_DEVELOPER',
      description: 'API keys and developer tools access',
      isSystem: true,
    },
  });

  const viewerRole = await prisma.role.upsert({
    where: { name: 'MERCHANT_VIEWER' },
    update: {},
    create: {
      name: 'MERCHANT_VIEWER',
      description: 'Read-only access to merchant data',
      isSystem: true,
    },
  });

  // ── Demo merchant admin user ──────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('SandboxDemo@123', 12);

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@buimbpay.sandbox' },
    update: {},
    create: {
      email: 'demo@buimbpay.sandbox',
      passwordHash,
      firstName: 'Demo',
      lastName: 'Merchant',
      status: 'ACTIVE',
      emailVerifiedAt: new Date(),
    },
  });

  // ── Demo organisation ─────────────────────────────────────────────────────
  const demoOrg = await prisma.organisation.upsert({
    where: { slug: 'demo-merchant' },
    update: {},
    create: {
      name: 'Demo Merchant Inc.',
      slug: 'demo-merchant',
      type: 'MERCHANT',
      website: 'https://demo.buimbpay.sandbox',
    },
  });

  // ── Demo merchant ─────────────────────────────────────────────────────────
  const demoMerchant = await prisma.merchant.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      organisationId: demoOrg.id,
      legalName: 'Demo Merchant Inc.',
      displayName: 'Demo Store',
      businessType: BusinessType.PRIVATE_LIMITED,
      website: 'https://demo.buimbpay.sandbox',
      supportEmail: 'support@demo.buimbpay.sandbox',
      status: MerchantStatus.ACTIVE,
      kycStatus: 'APPROVED',
      consentAccepted: true,
      consentAt: new Date(),
      consentVersion: '1.0',
    },
  });

  await prisma.merchantUser.upsert({
    where: {
      merchantId_userId: {
        merchantId: demoMerchant.id,
        userId: demoUser.id,
      },
    },
    update: {},
    create: {
      merchantId: demoMerchant.id,
      userId: demoUser.id,
      roleId: adminRole.id,
      joinedAt: new Date(),
    },
  });

  // ── Platform ledger accounts ──────────────────────────────────────────────
  const ledgerAccounts = [
    { code: 'PLATFORM_CASH', name: 'Platform Cash', type: LedgerAccountType.ASSET },
    { code: 'PLATFORM_ESCROW', name: 'Merchant Escrow Payable', type: LedgerAccountType.LIABILITY },
    { code: 'PLATFORM_REVENUE', name: 'Platform Revenue', type: LedgerAccountType.REVENUE },
    { code: 'PLATFORM_GST_PAYABLE', name: 'Platform GST Payable (Tax Liability)', type: LedgerAccountType.LIABILITY },
    { code: 'PLATFORM_FEES', name: 'Interchange & Provider Fees', type: LedgerAccountType.EXPENSE },
    { code: `MERCHANT_${demoMerchant.id}_RECEIVABLE`, name: 'Demo Merchant Receivable', type: LedgerAccountType.ASSET, merchantId: demoMerchant.id },
    { code: `MERCHANT_${demoMerchant.id}_PAYABLE`, name: 'Demo Merchant Settlement Payable', type: LedgerAccountType.LIABILITY, merchantId: demoMerchant.id },
  ];

  for (const acct of ledgerAccounts) {
    await prisma.ledgerAccount.upsert({
      where: { code: acct.code },
      update: {},
      create: { ...acct, currency: 'INR' },
    });
  }

  // ── Mock provider account ─────────────────────────────────────────────────
  await prisma.providerAccount.upsert({
    where: { slug: 'mock' },
    update: {},
    create: {
      name: 'Mock Provider (Sandbox)',
      slug: 'mock',
      isActive: true,
      isSandbox: true,
      config: { type: 'mock', simulateDelay: 500 },
    },
  });

  console.log('✅ Seed complete');
  console.log('');
  console.log('Demo credentials:');
  console.log('  Email:    demo@buimbpay.sandbox');
  console.log('  Password: SandboxDemo@123');
  console.log('  Note:     SANDBOX environment only');
}

seed()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
