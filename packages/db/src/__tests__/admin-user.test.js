import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { Database, runMigrations, AdminUserRepository, ROLE_PERMISSIONS } from '../index.js';
import { AdminRole } from '@youpi/common';

describe('Admin User Repository & RBAC Invariants', () => {
  let db;
  let adminRepo;

  before(() => {
    db = new Database({ inMemory: true });
    runMigrations(db);
    adminRepo = new AdminUserRepository(db);
  });

  after(() => {
    db.close();
  });

  test('seeds all 7 standard enterprise admin tiers during migration', () => {
    const allAdmins = adminRepo.findAll();
    assert.ok(allAdmins.length >= 7);

    const rolesFound = allAdmins.map(a => a.role);
    assert.ok(rolesFound.includes(AdminRole.SUPER_ADMIN));
    assert.ok(rolesFound.includes(AdminRole.OPERATIONS));
    assert.ok(rolesFound.includes(AdminRole.RISK_FRAUD));
    assert.ok(rolesFound.includes(AdminRole.FINANCE_SETTLEMENT));
    assert.ok(rolesFound.includes(AdminRole.COMPLIANCE_KYC));
    assert.ok(rolesFound.includes(AdminRole.SUPPORT));
    assert.ok(rolesFound.includes(AdminRole.AUDITOR));
  });

  test('authenticates with valid credentials and creates active session', () => {
    const result = adminRepo.authenticate('superadmin@buimbpay.com', 'Admin@BuimbPay2026!', {
      ipAddress: '127.0.0.1',
      userAgent: 'Automated-Test-Runner'
    });

    assert.equal(result.user.email, 'superadmin@buimbpay.com');
    assert.equal(result.user.role, AdminRole.SUPER_ADMIN);
    assert.ok(result.sessionToken.startsWith('buimb_adm_'));
    assert.ok(Array.isArray(result.user.permissions));
    assert.ok(result.user.permissions.includes('platform:manage'));

    // Validate active session
    const validated = adminRepo.validateSession(result.sessionToken);
    assert.ok(validated);
    assert.equal(validated.user.email, 'superadmin@buimbpay.com');
    assert.equal(validated.user.role, AdminRole.SUPER_ADMIN);

    // Revoke session
    adminRepo.revokeSession(result.sessionToken);
    assert.equal(adminRepo.validateSession(result.sessionToken), null);
  });

  test('tracks failed login attempts and locks account on 5 consecutive failures', () => {
    const email = 'risk@buimbpay.com';

    for (let i = 1; i <= 4; i++) {
      assert.throws(() => {
        adminRepo.authenticate(email, 'WrongPassword!');
      }, /attempt\(s\) remaining/);
    }

    // 5th failure triggers lockout
    assert.throws(() => {
      adminRepo.authenticate(email, 'WrongPassword!');
    }, /Account temporarily locked/);

    // Subsequent attempt even with correct password is rejected while locked
    assert.throws(() => {
      adminRepo.authenticate(email, 'Admin@BuimbPay2026!');
    }, /Account is temporarily locked/);
  });

  test('role permissions accurately reflect segregation of duties', () => {
    const superPerms = ROLE_PERMISSIONS[AdminRole.SUPER_ADMIN];
    const auditorPerms = ROLE_PERMISSIONS[AdminRole.AUDITOR];
    const opsPerms = ROLE_PERMISSIONS[AdminRole.OPERATIONS];
    const financePerms = ROLE_PERMISSIONS[AdminRole.FINANCE_SETTLEMENT];

    // Super Admin has master authority
    assert.ok(superPerms.includes('platform:manage'));
    assert.ok(superPerms.includes('admin_users:manage'));

    // Auditor has strict read-only access (NO write or manage permissions)
    assert.ok(auditorPerms.includes('audit:read'));
    assert.ok(auditorPerms.includes('reports:export'));
    assert.ok(!auditorPerms.includes('services:control'));
    assert.ok(!auditorPerms.includes('settlements:manage'));
    assert.ok(!auditorPerms.includes('merchants:approve'));

    // Operations can manage services and observers, but not nodal settlements
    assert.ok(opsPerms.includes('services:control'));
    assert.ok(!opsPerms.includes('settlements:manage'));

    // Finance can manage settlements and run reconciliation
    assert.ok(financePerms.includes('settlements:manage'));
    assert.ok(financePerms.includes('reconciliation:run'));
  });
});
