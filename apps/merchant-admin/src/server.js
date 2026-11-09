import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDatabase, MerchantRepository, SupportTicketRepository, AdminUserRepository, ROLE_PERMISSIONS } from '@youpi/db';
import { getAdminToken, safeEqual, AdminRole } from '@youpi/common';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Security headers applied to every response served by the merchant admin. */
const BASE_SECURITY_HEADERS = Object.freeze({
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; frame-ancestors 'self'; base-uri 'none'; form-action 'self'; object-src 'none'"
});

/** Reads and parses JSON request body safely. */
function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1048576) {
        req.destroy();
        reject(new Error('Payload too large (max 1MB)'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', reject);
  });
}

/** Parses cookies from request header. */
function parseCookies(req) {
  const list = {};
  const rc = req.headers?.cookie;
  if (!rc) return list;
  rc.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    if (parts.length >= 2) {
      list[parts.shift().trim()] = decodeURI(parts.join('='));
    }
  });
  return list;
}

/** True when the caller presented the admin bearer token in constant time. */
function hasAdminToken(req) {
  const match = /^Bearer\s+(.+)$/i.exec(req.headers?.['authorization'] || '');
  if (!match) return false;
  return safeEqual(match[1].trim(), getAdminToken());
}

/**
 * Strips headers a browser must not be able to spoof when relaying to an internal service.
 */
function sanitizedForwardHeaders(req, targetHost) {
  const headers = { ...req.headers, host: targetHost };
  for (const name of Object.keys(headers)) {
    const lower = name.toLowerCase();
    if (lower === 'x-internal-render' || lower === 'x-internal-token') {
      delete headers[name];
    }
  }
  return headers;
}

// In production, reliably ensure environment variables from .env are loaded if not already provided
if (!process.env.BASE_PAYMENT_API_URL && typeof process.loadEnvFile === 'function') {
  try {
    const rootEnv = path.resolve(__dirname, '../../../.env');
    if (fs.existsSync(rootEnv)) {
      process.loadEnvFile(rootEnv);
    }
  } catch {}
}

export class AdminServer {
  /**
   * @param {{
   *   db?: import('@youpi/db').Database,
   *   apiBaseUrl?: string
   * }} options
   */
  constructor(options = {}) {
    this.db = options.db || getDatabase();
    this.apiBaseUrl = options.apiBaseUrl || process.env.BASE_PAYMENT_API_URL || 'http://localhost:6100';
    this.merchantRepo = new MerchantRepository(this.db);
    this.ticketRepo = new SupportTicketRepository(this.db);
    this.adminUserRepo = new AdminUserRepository(this.db);
    this.htmlTemplatePath = path.join(__dirname, 'views', 'admin.html');
    this.template = fs.readFileSync(this.htmlTemplatePath, 'utf8');
  }

  /**
   * Resolves currently authenticated admin identity via session token or system bearer token.
   * @param {http.IncomingMessage} req
   */
  resolveAdmin(req) {
    // 1. Static Supervisor / Admin Bearer Token (Root System Access)
    if (hasAdminToken(req)) {
      return {
        id: '00000000-0000-0000-0000-000000000000',
        email: 'superadmin@buimbpay.com',
        fullName: 'Super Administrator (System Root)',
        role: AdminRole.SUPER_ADMIN,
        status: 'ACTIVE',
        permissions: ROLE_PERMISSIONS[AdminRole.SUPER_ADMIN] || []
      };
    }

    // 2. Bearer Session Token
    const authHeader = req.headers?.['authorization'] || '';
    let token = null;
    const match = /^Bearer\s+(.+)$/i.exec(authHeader);
    if (match) {
      token = match[1].trim();
    }

    // 3. Cookie or Custom Header Session Token
    if (!token) {
      const cookies = parseCookies(req);
      token = cookies.buimb_admin_session || req.headers?.['x-admin-session'] || null;
    }

    if (token) {
      const validated = this.adminUserRepo.validateSession(token);
      if (validated) {
        return validated.user;
      }
    }

    return null;
  }

  /**
   * Checks if request has valid admin authentication and optional required permission.
   */
  hasAdminAccess(req, requiredPermission = null) {
    const admin = this.resolveAdmin(req);
    if (!admin) return null; // unauthenticated
    if (!requiredPermission || admin.role === AdminRole.SUPER_ADMIN) return admin;
    const permissions = admin.permissions || [];
    if (permissions.includes('*') || permissions.includes(requiredPermission)) {
      return admin;
    }
    return false; // authenticated but unauthorized for this specific permission
  }

  renderHtml() {
    try {
      this.template = fs.readFileSync(this.htmlTemplatePath, 'utf8');
    } catch {}

    let html = this.template;
    // Always use empty string '' so client fetch calls hit the merchant admin's own /api proxy!
    // This completely eliminates CORS errors, tunnel downtime 530s, and cross-origin failures.
    const clientApiBase = '';
    html = html.replaceAll('{{API_BASE_URL}}', clientApiBase);
    return html;
  }

  createServer() {
    return http.createServer(async (req, res) => {
      const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const pathname = url.pathname;

      if (req.method === 'OPTIONS') {
        res.writeHead(204, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-session, x-merchant-id'
        });
        res.end();
        return;
      }

      // Health
      if (pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'UP', service: 'merchant-admin' }));
        return;
      }

      // ─────────────────────────────────────────────────────────────────────────
      // GENUINE ADMIN AUTHENTICATION API
      // ─────────────────────────────────────────────────────────────────────────

      // POST /api/admin/auth/login
      if (req.method === 'POST' && pathname === '/api/admin/auth/login') {
        try {
          const body = await readJsonBody(req);
          const { email, password } = body;
          if (!email || !password) {
            res.writeHead(400, { 'Content-Type': 'application/json', ...BASE_SECURITY_HEADERS });
            res.end(JSON.stringify({ success: false, error: 'Email and password are required.' }));
            return;
          }

          const ipAddress = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString();
          const userAgent = req.headers['user-agent'] || '';

          const result = this.adminUserRepo.authenticate(email, password, { ipAddress, userAgent });

          // Set secure cookie
          const cookieHeader = `buimb_admin_session=${result.sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`;
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Set-Cookie': cookieHeader,
            ...BASE_SECURITY_HEADERS
          });
          res.end(JSON.stringify({
            success: true,
            user: result.user,
            sessionToken: result.sessionToken,
            expiresAt: result.expiresAt
          }));
          return;
        } catch (err) {
          res.writeHead(401, { 'Content-Type': 'application/json', ...BASE_SECURITY_HEADERS });
          res.end(JSON.stringify({ success: false, error: err.message || 'Authentication failed.' }));
          return;
        }
      }

      // POST /api/admin/auth/logout
      if (req.method === 'POST' && pathname === '/api/admin/auth/logout') {
        const cookies = parseCookies(req);
        let token = cookies.buimb_admin_session || req.headers?.['x-admin-session'] || '';
        if (!token) {
          const authHeader = req.headers?.['authorization'] || '';
          const match = /^Bearer\s+(.+)$/i.exec(authHeader);
          if (match) token = match[1].trim();
        }
        if (token) {
          this.adminUserRepo.revokeSession(token);
        }
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Set-Cookie': 'buimb_admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
          ...BASE_SECURITY_HEADERS
        });
        res.end(JSON.stringify({ success: true, message: 'Logged out successfully.' }));
        return;
      }

      // GET /api/admin/auth/me
      if (req.method === 'GET' && pathname === '/api/admin/auth/me') {
        const admin = this.resolveAdmin(req);
        if (!admin) {
          res.writeHead(401, { 'Content-Type': 'application/json', ...BASE_SECURITY_HEADERS });
          res.end(JSON.stringify({ authenticated: false, error: 'Authentication required' }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json', ...BASE_SECURITY_HEADERS });
        res.end(JSON.stringify({ authenticated: true, user: admin }));
        return;
      }

      // GET /api/admin/roles
      if (req.method === 'GET' && pathname === '/api/admin/roles') {
        const roles = [
          {
            role: AdminRole.SUPER_ADMIN,
            name: 'Super Administrator',
            title: 'Platform Owner / Root Admin',
            color: '#ef4444',
            description: 'Unrestricted master access across system services, bank accounts, security, and administrative team management.'
          },
          {
            role: AdminRole.OPERATIONS,
            name: 'Operations Administrator',
            title: 'Gateway DevOps & System Ops',
            color: '#3b82f6',
            description: 'Supervisor process controls, service restarting, Android observer gateway pairing, queue oversight, and webhooks.'
          },
          {
            role: AdminRole.RISK_FRAUD,
            name: 'Risk & Fraud Officer',
            title: 'Security, AML & Fraud Prevention',
            color: '#8b5cf6',
            description: 'Fraud detection rules, transaction velocity limits, suspicious activity reports (STR), PAN/VPA blacklists, and merchant freezing.'
          },
          {
            role: AdminRole.FINANCE_SETTLEMENT,
            name: 'Finance & Settlement Admin',
            title: 'Treasury, Settlements & Escrow',
            color: '#10b981',
            description: 'Nodal / escrow fund tracking, settlement batch computation, double-entry ledger audits, fee/MDR setup, and bank payout reconciliation.'
          },
          {
            role: AdminRole.COMPLIANCE_KYC,
            name: 'Compliance & KYC Officer',
            title: 'Legal Counsel & Onboarding Review',
            color: '#f59e0b',
            description: 'Merchant onboarding approvals, business verification (PAN, GSTIN, CIN, Bank Cheque), RBI PA/PG guideline audits.'
          },
          {
            role: AdminRole.SUPPORT,
            name: 'Support Specialist',
            title: 'Merchant Support & Dispute Resolution',
            color: '#06b6d4',
            description: 'Live support tickets, chargeback responses, merchant query resolution, and transaction tracking.'
          },
          {
            role: AdminRole.AUDITOR,
            name: 'Regulatory Auditor',
            title: 'Internal / RBI Regulatory Examiner',
            color: '#64748b',
            description: 'Immutable forensic audit log inspection, financial reporting, regulatory compliance verification (Strict Zero-Write Access).'
          }
        ];
        res.writeHead(200, { 'Content-Type': 'application/json', ...BASE_SECURITY_HEADERS });
        res.end(JSON.stringify(roles));
        return;
      }

      // GET /api/admin/users
      if (req.method === 'GET' && pathname === '/api/admin/users') {
        const admin = this.resolveAdmin(req);
        if (!admin) {
          res.writeHead(401, { 'Content-Type': 'application/json', ...BASE_SECURITY_HEADERS });
          res.end(JSON.stringify({ error: 'Unauthorized', code: 'AUTH_REQUIRED' }));
          return;
        }
        const users = this.adminUserRepo.findAll();
        res.writeHead(200, { 'Content-Type': 'application/json', ...BASE_SECURITY_HEADERS });
        res.end(JSON.stringify(users));
        return;
      }

      // POST /api/admin/users
      if (req.method === 'POST' && pathname === '/api/admin/users') {
        const admin = this.resolveAdmin(req);
        if (!admin || admin.role !== AdminRole.SUPER_ADMIN) {
          res.writeHead(403, { 'Content-Type': 'application/json', ...BASE_SECURITY_HEADERS });
          res.end(JSON.stringify({ error: 'Only Super Administrators can create new administrative staff.', code: 'FORBIDDEN' }));
          return;
        }
        try {
          const body = await readJsonBody(req);
          const created = this.adminUserRepo.create(body);
          res.writeHead(201, { 'Content-Type': 'application/json', ...BASE_SECURITY_HEADERS });
          res.end(JSON.stringify({ success: true, user: created }));
          return;
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json', ...BASE_SECURITY_HEADERS });
          res.end(JSON.stringify({ success: false, error: err.message }));
          return;
        }
      }

      // Admin Tickets API: GET /api/admin/tickets
      if (pathname === '/api/admin/tickets') {
        const admin = this.resolveAdmin(req);
        if (!admin) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Unauthorized', code: 'AUTH_REQUIRED' }));
          return;
        }
        const merchants = this.merchantRepo.findAll();
        const mId = merchants[0]?.id || '00000000-0000-0000-0000-000000000001';
        const tickets = this.ticketRepo.findTicketsByMerchant(mId);

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          ...BASE_SECURITY_HEADERS
        });
        res.end(JSON.stringify(tickets));
        return;
      }

      // Merged Control Center Supervisor Proxy: /api/services/* and /api/logs/stream -> Control Center on port 8090
      if (pathname.startsWith('/api/services') || pathname === '/api/logs/stream') {
        const admin = this.resolveAdmin(req);
        if (!admin) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Unauthorized', code: 'AUTH_REQUIRED' }));
          return;
        }

        // Enforce RBAC: Auditors & Support cannot execute process changes (POST/PUT/DELETE)
        if (req.method !== 'GET' && (admin.role === AdminRole.AUDITOR || admin.role === AdminRole.SUPPORT)) {
          res.writeHead(403, { 'Content-Type': 'application/json', ...BASE_SECURITY_HEADERS });
          res.end(JSON.stringify({ error: `Admins with role '${admin.role}' have read-only privileges and cannot mutate services.`, code: 'PERMISSION_DENIED' }));
          return;
        }

        const ccPort = Number(process.env.CONTROL_CENTER_PORT || 8090);
        const proxyReq = http.request({
          hostname: '127.0.0.1',
          port: ccPort,
          path: req.url,
          method: req.method,
          headers: sanitizedForwardHeaders(req, `localhost:${ccPort}`)
        }, (proxyRes) => {
          res.writeHead(proxyRes.statusCode, proxyRes.headers);
          proxyRes.pipe(res);
        });

        proxyReq.on('error', (err) => {
          if (!res.headersSent) {
            res.writeHead(502, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Control center supervisor unavailable', details: err.message }));
          }
        });

        req.on('data', chunk => proxyReq.write(chunk));
        req.on('end', () => proxyReq.end());
        return;
      }

      // Transparent API Proxy: /api/* -> Payment Core REST API
      if (pathname.startsWith('/api/')) {
        const targetPort = Number(process.env.PAYMENT_API_PORT || 6100);
        const defaultMerchant = this.merchantRepo.getDefault ? this.merchantRepo.getDefault() : (this.merchantRepo.findById('00000000-0000-0000-0000-000000000001') || this.merchantRepo.findAll()[0]);
        const defaultMerchantId = defaultMerchant?.id || '00000000-0000-0000-0000-000000000001';
        const admin = this.resolveAdmin(req);

        const proxyHeaders = {
          ...req.headers,
          'x-merchant-id': req.headers['x-merchant-id'] || defaultMerchantId,
          host: `localhost:${targetPort}`,
          'x-forwarded-host': req.headers.host || '',
          'x-forwarded-proto': req.headers['x-forwarded-proto'] || 'http'
        };

        if (admin) {
          proxyHeaders['authorization'] = `Bearer ${getAdminToken()}`;
          proxyHeaders['x-admin-role'] = admin.role;
          proxyHeaders['x-admin-email'] = admin.email;
          proxyHeaders['x-admin-name'] = encodeURIComponent(admin.fullName);
        }

        const proxyReq = http.request({
          hostname: '127.0.0.1',
          port: targetPort,
          path: req.url,
          method: req.method,
          headers: proxyHeaders
        }, (proxyRes) => {
          res.writeHead(proxyRes.statusCode, proxyRes.headers);
          proxyRes.pipe(res);
        });

        proxyReq.on('error', (err) => {
          if (!res.headersSent) {
            res.writeHead(502, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Gateway API unavailable', details: err.message }));
          }
        });

        req.pipe(proxyReq);
        return;
      }

      // Download Android Companion APK
      if (pathname === '/youpi-sms-gateway.apk' || pathname === '/api/v1/admin/sms-gateway/download-apk') {
        const apkCandidates = [
          path.resolve(__dirname, '../public/youpi-sms-gateway.apk'),
          path.resolve(__dirname, '../../payment-api/public/youpi-sms-gateway.apk'),
          path.resolve(__dirname, '../../android-observer-app/youpi-sms-gateway.apk')
        ];
        let apkPath = null;
        for (const p of apkCandidates) {
          if (fs.existsSync(p)) {
            apkPath = p;
            break;
          }
        }
        if (apkPath) {
          const stat = fs.statSync(apkPath);
          res.writeHead(200, {
            'Content-Type': 'application/vnd.android.package-archive',
            'Content-Disposition': 'attachment; filename="youpi-sms-gateway.apk"',
            'Content-Length': stat.size,
            'Access-Control-Allow-Origin': '*'
          });
          const stream = fs.createReadStream(apkPath);
          stream.pipe(res);
          return;
        }
      }

      // Dashboard View: GET / or GET /admin
      if (pathname === '/' || pathname === '/admin') {
        const html = this.renderHtml();
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache',
          ...BASE_SECURITY_HEADERS
        });
        res.end(html);
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Admin Route Not Found');
    });
  }
}
