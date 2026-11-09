const http = require('http');

async function get(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', err => reject(err));
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function runAllTests() {
  console.log('====================================================');
  console.log('🧪 BUIMBPAY PLATFORM END-TO-END VERIFICATION SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  async function check(name, testFn) {
    process.stdout.write(`• Testing ${name.padEnd(45)} `);
    try {
      const res = await testFn();
      if (res.ok) {
        console.log(`✅ [PASS] (${res.info || 'OK'})`);
        passed++;
      } else {
        console.log(`❌ [FAIL] (${res.error || 'Failed'})`);
        failed++;
      }
    } catch (err) {
      console.log(`❌ [ERROR] (${err.message})`);
      failed++;
    }
  }

  // 1. Merchant Dashboard
  await check('Dashboard HTTP entry (port 5173)', async () => {
    const res = await get('http://localhost:5173');
    return { ok: res.status === 200, info: `HTTP ${res.status}` };
  });

  await check('Dashboard Vite client script', async () => {
    const res = await get('http://localhost:5173/@vite/client');
    return { ok: res.status === 200, info: `Vite Client HTTP ${res.status}` };
  });

  await check('Dashboard main app entry script', async () => {
    const res = await get('http://localhost:5173/src/main.jsx');
    return { ok: res.status === 200, info: `main.jsx HTTP ${res.status}` };
  });

  // 2. Public Web & Checkout
  await check('Public Web homepage (port 3000)', async () => {
    const res = await get('http://localhost:3000/');
    return { ok: res.status === 200, info: `HTTP ${res.status}` };
  });

  await check('Public Web Tailwind CSS compilation', async () => {
    const home = await get('http://localhost:3000/');
    const cssMatch = home.body.match(/href="(\/_next\/static\/css\/app\/layout\.css[^"]*)"/);
    if (!cssMatch) return { ok: false, error: 'No layout.css found in HTML' };
    const css = await get('http://localhost:3000' + cssMatch[1]);
    const hasTailwind = css.body.includes('tailwindcss') || css.body.includes('--tw-');
    return { ok: css.status === 200 && hasTailwind, info: `Tailwind v3 (${(css.body.length / 1024).toFixed(1)} KB)` };
  });

  await check('Public Web Hosted Checkout route', async () => {
    const res = await get('http://localhost:3000/pay/order_Nx8Y29kLp102');
    return { ok: res.status === 200, info: `HTTP ${res.status}` };
  });

  await check('Public Web Pricing route', async () => {
    const res = await get('http://localhost:3000/pricing');
    return { ok: res.status === 200, info: `HTTP ${res.status}` };
  });

  await check('Public Web Payment Gateway page', async () => {
    const res = await get('http://localhost:3000/payment-gateway');
    return { ok: res.status === 200, info: `HTTP ${res.status}` };
  });

  await check('Public Web GST & TDS Calculator page', async () => {
    const res = await get('http://localhost:3000/tools/gst-calculator');
    return { ok: res.status === 200, info: `HTTP ${res.status}` };
  });

  // 3. Merchant Admin Console
  await check('Merchant Admin Console (port 6001)', async () => {
    const res = await get('http://localhost:6001');
    return { ok: res.status === 200, info: `HTTP ${res.status}` };
  });

  // 4. Payment Core REST API
  await check('Payment Core REST API Health (port 6100)', async () => {
    const res = await get('http://localhost:6100/health');
    return { ok: res.status === 200, info: `HTTP ${res.status}` };
  });

  // 5. Process Control Center Supervisor
  await check('Process Control Center (port 8090)', async () => {
    const res = await get('http://localhost:8090');
    return { ok: res.status === 200, info: `HTTP ${res.status}` };
  });

  // 6. E-Commerce Showcase Store
  await check('Showcase Demo Store (port 5000)', async () => {
    const res = await get('http://localhost:5000');
    return { ok: res.status === 200, info: `HTTP ${res.status}` };
  });

  console.log('\n====================================================');
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('====================================================');
  process.exit(failed > 0 ? 1 : 0);
}

runAllTests().catch(err => {
  console.error('Test suite runner crashed:', err);
  process.exit(1);
});
