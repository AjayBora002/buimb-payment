import crypto from 'node:crypto';
import { hashPassword, verifyPassword, generateRandomToken, normalizeEmail, isValidEmail, safeEqual, AdminRole } from '@youpi/common';

/**
 * Granular permissions mapped per Enterprise Admin Role.
 */
export const ROLE_PERMISSIONS = Object.freeze({
  [AdminRole.SUPER_ADMIN]: Object.freeze([
    'platform:manage',
    'admin_users:manage',
    'services:control',
    'merchants:approve',
    'merchants:write',
    'merchants:read',
    'payments:write',
    'payments:read',
    'settlements:manage',
    'settlements:read',
    'risk:manage',
    'risk:read',
    'disputes:manage',
    'support:manage',
    'audit:read',
    'compliance:verify'
  ]),
  [AdminRole.OPERATIONS]: Object.freeze([
    'services:control',
    'services:read',
    'merchants:read',
    'payments:read',
    'observers:manage',
    'devices:manage',
    'webhooks:retry',
    'audit:read'
  ]),
  [AdminRole.RISK_FRAUD]: Object.freeze([
    'risk:manage',
    'risk:read',
    'merchants:freeze',
    'merchants:read',
    'payments:read',
    'payments:flag',
    'security_events:read',
    'blacklist:manage',
    'audit:read'
  ]),
  [AdminRole.FINANCE_SETTLEMENT]: Object.freeze([
    'settlements:manage',
    'settlements:read',
    'ledger:read',
    'payouts:execute',
    'fees:configure',
    'reconciliation:run',
    'merchants:read',
    'payments:read',
    'audit:read'
  ]),
  [AdminRole.COMPLIANCE_KYC]: Object.freeze([
    'compliance:verify',
    'merchants:approve',
    'merchants:reject',
    'merchants:read',
    'kyc:review',
    'documents:verify',
    'audit:read'
  ]),
  [AdminRole.SUPPORT]: Object.freeze([
    'support:manage',
    'tickets:read',
    'tickets:write',
    'disputes:manage',
    'merchants:read',
    'payments:read'
  ]),
  [AdminRole.AUDITOR]: Object.freeze([
    'audit:read',
    'merchants:read',
    'payments:read',
    'settlements:read',
    'ledger:read',
    'compliance:read',
    'reports:export'
  ])
});

export class AdminUserRepository {
  /**
   * @param {import('../database.js').Database} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   * Creates an administrative user with hashed credentials and assigned role.
   * @param {{
   *   id?: string,
   *   email: string,
   *   password?: string,
   *   passwordHash?: string,
   *   fullName: string,
   *   role?: string,
   *   status?: string
   * }} data
   */
  create(data) {
    const id = data.id || crypto.randomUUID();
    const email = normalizeEmail(data.email);
    if (!email || !isValidEmail(email)) {
      throw new Error('Valid admin email is required.');
    }
    const fullName = String(data.fullName || '').trim();
    if (!fullName) {
      throw new Error('Admin full name is required.');
    }

    let passwordHash = data.passwordHash;
    if (!passwordHash) {
      if (!data.password || data.password.length < 8) {
        throw new Error('Admin password must be at least 8 characters long.');
      }
      passwordHash = hashPassword(data.password);
    }

    const role = data.role && AdminRole[data.role] ? data.role : AdminRole.OPERATIONS;
    const status = data.status || 'ACTIVE';
    const now = new Date().toISOString();

    const sql = `
      INSERT INTO admin_users (id, email, password_hash, full_name, role, status, failed_login_attempts, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)
    `;

    this.db.execute(sql, [id, email, passwordHash, fullName, role, status, now, now]);

    return {
      id,
      email,
      fullName,
      role,
      status,
      createdAt: now
    };
  }

  /**
   * Finds an admin user by email.
   * @param {string} email
   */
  findByEmail(email) {
    const normalized = normalizeEmail(email);
    if (!normalized) return null;
    return this.db.queryOne('SELECT * FROM admin_users WHERE lower(email) = lower(?)', [normalized]);
  }

  /**
   * Finds an admin user by ID without exposing password hash.
   * @param {string} id
   */
  findById(id) {
    const row = this.db.queryOne(
      'SELECT id, email, full_name, role, status, last_login_at, last_login_ip, created_at, updated_at FROM admin_users WHERE id = ?',
      [id]
    );
    if (!row) return null;
    return {
      id: row.id,
      email: row.email,
      fullName: row.full_name,
      role: row.role,
      status: row.status,
      lastLoginAt: row.last_login_at,
      lastLoginIp: row.last_login_ip,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      permissions: ROLE_PERMISSIONS[row.role] || []
    };
  }

  /**
   * Lists all admin users.
   */
  findAll() {
    const rows = this.db.query(
      'SELECT id, email, full_name, role, status, last_login_at, last_login_ip, created_at FROM admin_users ORDER BY created_at ASC'
    );
    return (rows || []).map(r => ({
      id: r.id,
      email: r.email,
      fullName: r.full_name,
      role: r.role,
      status: r.status,
      lastLoginAt: r.last_login_at,
      lastLoginIp: r.last_login_ip,
      createdAt: r.created_at,
      permissions: ROLE_PERMISSIONS[r.role] || []
    }));
  }

  /**
   * Authenticates an admin by credentials and creates an authenticated server session.
   * Enforces brute-force protection (lockout after 5 failed attempts).
   * @param {string} email
   * @param {string} password
   * @param {{ ipAddress?: string, userAgent?: string }} [options={}]
   */
  authenticate(email, password, options = {}) {
    const admin = this.findByEmail(email);
    if (!admin) {
      throw new Error('Invalid email or password.');
    }

    const now = new Date();

    // Check account status
    if (admin.status === 'SUSPENDED') {
      throw new Error('This admin account has been suspended by the platform administrator.');
    }

    if (admin.locked_until) {
      const lockDate = new Date(admin.locked_until);
      if (lockDate > now) {
        const remainingMinutes = Math.ceil((lockDate.getTime() - now.getTime()) / 60000);
        throw new Error(`Account is temporarily locked due to repeated failed attempts. Please retry in ${remainingMinutes} minute(s).`);
      } else {
        // Lock expired: reset
        this.db.execute('UPDATE admin_users SET locked_until = NULL, failed_login_attempts = 0, status = "ACTIVE" WHERE id = ?', [admin.id]);
        admin.failed_login_attempts = 0;
      }
    }

    const isValid = verifyPassword(password, admin.password_hash);
    if (!isValid) {
      const attempts = (Number(admin.failed_login_attempts) || 0) + 1;
      let lockUntil = null;
      let newStatus = admin.status;

      if (attempts >= 5) {
        lockUntil = new Date(now.getTime() + 15 * 60 * 1000).toISOString();
        newStatus = 'LOCKED';
      }

      this.db.execute(
        'UPDATE admin_users SET failed_login_attempts = ?, locked_until = ?, status = ? WHERE id = ?',
        [attempts, lockUntil, newStatus, admin.id]
      );

      if (attempts >= 5) {
        throw new Error('Account temporarily locked for 15 minutes due to 5 consecutive failed attempts.');
      }

      const remaining = 5 - attempts;
      throw new Error(`Invalid credentials. ${remaining} attempt(s) remaining before security lockout.`);
    }

    // Success: reset attempts & record login metadata
    const ip = options.ipAddress || null;
    const ua = options.userAgent || null;
    const nowIso = now.toISOString();

    this.db.execute(
      'UPDATE admin_users SET failed_login_attempts = 0, locked_until = NULL, last_login_at = ?, last_login_ip = ? WHERE id = ?',
      [nowIso, ip, admin.id]
    );

    // Issue cryptographic session token valid for 7 days
    const sessionToken = `buimb_adm_${generateRandomToken(32)}`;
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const sessionId = crypto.randomUUID();

    this.db.execute(
      `INSERT INTO admin_sessions (id, admin_user_id, session_token, ip_address, user_agent, expires_at, is_active, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 1, ?)`,
      [sessionId, admin.id, sessionToken, ip, ua, expiresAt, nowIso]
    );

    return {
      user: {
        id: admin.id,
        email: admin.email,
        fullName: admin.full_name,
        role: admin.role,
        status: 'ACTIVE',
        lastLoginAt: nowIso,
        permissions: ROLE_PERMISSIONS[admin.role] || []
      },
      sessionToken,
      expiresAt
    };
  }

  /**
   * Validates an active session token.
   * @param {string} token
   * @returns {Object|null}
   */
  validateSession(token) {
    if (!token || typeof token !== 'string') return null;

    const row = this.db.queryOne(
      `SELECT s.id as session_id, s.session_token, s.expires_at, s.is_active,
              u.id as user_id, u.email, u.full_name, u.role, u.status
       FROM admin_sessions s
       JOIN admin_users u ON u.id = s.admin_user_id
       WHERE s.session_token = ? AND s.is_active = 1`,
      [token.trim()]
    );

    if (!row) return null;

    // Check expiration
    if (new Date(row.expires_at) <= new Date()) {
      this.revokeSession(token);
      return null;
    }

    // Check account status
    if (row.status !== 'ACTIVE') {
      return null;
    }

    return {
      sessionId: row.session_id,
      user: {
        id: row.user_id,
        email: row.email,
        fullName: row.full_name,
        role: row.role,
        status: row.status,
        permissions: ROLE_PERMISSIONS[row.role] || []
      },
      expiresAt: row.expires_at
    };
  }

  /**
   * Revokes an active session token.
   * @param {string} token
   */
  revokeSession(token) {
    if (!token) return;
    this.db.execute('UPDATE admin_sessions SET is_active = 0 WHERE session_token = ?', [token.trim()]);
  }

  /**
   * Updates an admin's role.
   * @param {string} id
   * @param {string} role
   */
  updateRole(id, role) {
    if (!AdminRole[role]) {
      throw new Error(`Invalid admin role: ${role}`);
    }
    this.db.execute('UPDATE admin_users SET role = ?, updated_at = ? WHERE id = ?', [role, new Date().toISOString(), id]);
    return this.findById(id);
  }
}

