import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { Database } from '@youpi/db';
import { getAdminToken } from '@youpi/common';
import { startAdminServer } from '../index.js';

describe('Merchant Admin Integration Tests', () => {
  let serverInstance;
  let baseUrl;
  let testDb;

  before(async () => {
    testDb = new Database({ inMemory: true });
    serverInstance = await startAdminServer(6101, { db: testDb });
    baseUrl = `http://localhost:${serverInstance.port}`;
  });

  after(async () => {
    await serverInstance.close();
    testDb.close();
  });

  function get(path, headers = {}) {
    return new Promise((resolve, reject) => {
      http.get(`${baseUrl}${path}`, { headers }, res => {
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
          resolve({ status: res.statusCode, headers: res.headers, text: data });
        });
      }).on('error', reject);
    });
  }

  function post(path, body = {}, headers = {}) {
    return new Promise((resolve, reject) => {
      const payload = JSON.stringify(body);
      const req = http.request(`${baseUrl}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
          ...headers
        }
      }, res => {
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
          resolve({ status: res.statusCode, headers: res.headers, text: data });
        });
      });
      req.on('error', reject);
      req.write(payload);
      req.end();
    });
  }

  test('GET /health returns UP', async () => {
    const res = await get('/health');
    assert.equal(res.status, 200);
    const json = JSON.parse(res.text);
    assert.equal(json.status, 'UP');
    assert.equal(json.service, 'merchant-admin');
  });

  test('GET / renders dashboard with queue monitor, observers, counter desk & pairing modal', async () => {
    const res = await get('/');
    assert.equal(res.status, 200);
    assert.ok(res.headers['content-type'].includes('text/html'));

    assert.ok(res.text.includes('Real-Time Receiving Account Slot Ownership'));
    assert.ok(res.text.includes('Active Slot (5-Minute Window)'));
    assert.ok(res.text.includes('Processing Slot (30s Verification Window)'));
    assert.ok(res.text.includes('Live Counter Payment Requests'));
    assert.ok(res.text.includes('Payment Observers (SMS & Gmail)'));
    assert.ok(res.text.includes('Android SMS Gateway'));
    assert.ok(res.text.includes('Gmail Direct API'));
  });

  test('GET /api/admin/tickets requires the admin token', async () => {
    const anonymous = await get('/api/admin/tickets');
    assert.equal(anonymous.status, 401);

    const res = await get('/api/admin/tickets', { Authorization: `Bearer ${getAdminToken()}` });
    assert.equal(res.status, 200);
    const json = JSON.parse(res.text);
    assert.ok(Array.isArray(json));
  });

  test('Admin Auth API: authenticates valid credentials, returns session token, validates me and logs out', async () => {
    // 1. Unauthenticated /api/admin/auth/me returns 401
    const unauth = await get('/api/admin/auth/me');
    assert.equal(unauth.status, 401);

    // 2. Invalid password returns 401
    const badLogin = await post('/api/admin/auth/login', {
      email: 'superadmin@buimbpay.com',
      password: 'WrongPassword123!'
    });
    assert.equal(badLogin.status, 401);

    // 3. Valid login returns 200, session token and sets cookie
    const goodLogin = await post('/api/admin/auth/login', {
      email: 'superadmin@buimbpay.com',
      password: 'Admin@BuimbPay2026!'
    });
    assert.equal(goodLogin.status, 200);
    const loginData = JSON.parse(goodLogin.text);
    assert.equal(loginData.success, true);
    assert.equal(loginData.user.email, 'superadmin@buimbpay.com');
    assert.equal(loginData.user.role, 'SUPER_ADMIN');
    assert.ok(loginData.sessionToken.startsWith('buimb_adm_'));
    assert.ok(goodLogin.headers['set-cookie']);

    // 4. Authenticated /api/admin/auth/me with Bearer session token
    const me = await get('/api/admin/auth/me', {
      Authorization: `Bearer ${loginData.sessionToken}`
    });
    assert.equal(me.status, 200);
    const meData = JSON.parse(me.text);
    assert.equal(meData.authenticated, true);
    assert.equal(meData.user.email, 'superadmin@buimbpay.com');
    assert.equal(meData.user.role, 'SUPER_ADMIN');

    // 5. GET /api/admin/roles returns all 7 enterprise admin tiers
    const rolesRes = await get('/api/admin/roles');
    assert.equal(rolesRes.status, 200);
    const roles = JSON.parse(rolesRes.text);
    assert.equal(roles.length, 7);
    const roleKeys = roles.map(r => r.role);
    assert.ok(roleKeys.includes('SUPER_ADMIN'));
    assert.ok(roleKeys.includes('OPERATIONS'));
    assert.ok(roleKeys.includes('RISK_FRAUD'));
    assert.ok(roleKeys.includes('FINANCE_SETTLEMENT'));
    assert.ok(roleKeys.includes('COMPLIANCE_KYC'));
    assert.ok(roleKeys.includes('SUPPORT'));
    assert.ok(roleKeys.includes('AUDITOR'));

    // 6. GET /api/admin/users lists seeded admin staff
    const usersRes = await get('/api/admin/users', {
      Authorization: `Bearer ${loginData.sessionToken}`
    });
    assert.equal(usersRes.status, 200);
    const users = JSON.parse(usersRes.text);
    assert.ok(users.length >= 7);

    // 7. POST /api/admin/auth/logout revokes session
    const logoutRes = await post('/api/admin/auth/logout', {}, {
      Authorization: `Bearer ${loginData.sessionToken}`
    });
    assert.equal(logoutRes.status, 200);

    // 8. Subsequent /api/admin/auth/me is now 401
    const postLogout = await get('/api/admin/auth/me', {
      Authorization: `Bearer ${loginData.sessionToken}`
    });
    assert.equal(postLogout.status, 401);
  });
});
