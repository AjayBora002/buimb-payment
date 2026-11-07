/**
 * BuimbPay Bank SMS Observer Simulation CLI
 *
 * Simulates an incoming bank SMS alert (HDFC, SBI, ICICI, Axis)
 * being captured by an Android device or SMS gateway and dispatched
 * to BuimbPay's Observer ingestion endpoint (/api/v1/observers/sms).
 *
 * Usage:
 *   node scripts/simulate-bank-sms.mjs
 *   node scripts/simulate-bank-sms.mjs --amount 1299 --utr 431298765432
 */

const API_BASE = process.env.BUIMBPAY_API_URL || 'http://localhost:4000';

async function main() {
  const args = process.argv.slice(2);
  let amountStr = '1299.00';
  let utr = `4312${Math.floor(10000000 + Math.random() * 90000000)}`;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--amount' && args[i + 1]) {
      amountStr = parseFloat(args[i + 1]).toFixed(2);
      i++;
    } else if (args[i] === '--utr' && args[i + 1]) {
      utr = args[i + 1];
      i++;
    }
  }

  console.log('====================================================');
  console.log('📱 BuimbPay Sovereign Bank SMS Simulation CLI');
  console.log('====================================================');
  console.log(`• Target API:    ${API_BASE}`);
  console.log(`• Amount:        ₹${amountStr}`);
  console.log(`• Bank UTR:      ${utr}`);

  const sampleSms = `Dear Customer, Rs.${amountStr} credited to account **8901 on ${new Date().toLocaleDateString('en-GB')} by UPI: customer@okaxis. Ref no: ${utr}. - HDFC Bank`;
  console.log(`• Raw SMS Text:  "${sampleSms}"`);
  console.log('----------------------------------------------------');

  try {
    const res = await fetch(`${API_BASE}/api/v1/observers/sms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: sampleSms,
        sender: 'VM-HDFCBK',
        timestamp: new Date().toISOString(),
      }),
    });

    const data = await res.json();
    console.log('[✓] Response from BuimbPay Observer Ingestion:');
    console.log(JSON.stringify(data, null, 2));

    if (data.status === 'MATCHED') {
      console.log('\n🟢 SUCCESS: Payment session was matched and verified!');
      console.log(`• Session ID: ${data.sessionId}`);
      console.log(`• Amount:     ₹${(data.amount / 100).toFixed(2)}`);
    } else if (data.status === 'UNMATCHED') {
      console.log('\n🟡 Observation stored as UNMATCHED. No active checkout session was expecting this exact amount.');
    } else {
      console.log(`\nStatus: ${data.status}`);
    }
  } catch (err) {
    console.error(`\n❌ Could not connect to BuimbPay API at ${API_BASE}. Ensure the API is running (pnpm dev:api).`);
  }
}

main();

