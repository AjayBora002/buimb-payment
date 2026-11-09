'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Code2,
  Copy,
  Check,
  Terminal,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  KeyRound,
  ShieldAlert,
} from 'lucide-react';

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:5173';

const SNIPPETS = {
  createOrder: {
    curl: `curl https://api.buimbpay.com/v1/orders \\
  -u rzp_live_98fbc18:sec_key_e49c71a \\
  -X POST \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 129900,
    "currency": "INR",
    "receipt": "rcpt_9812",
    "notes": { "tier": "Pro Annual" }
  }'`,
    node: `import BuimbPay from '@buimbpay/sdk';

const client = new BuimbPay({
  keyId: process.env.BUIMBPAY_KEY_ID,
  keySecret: process.env.BUIMBPAY_KEY_SECRET,
});

const order = await client.orders.create({
  amount: 129900, // in paise (₹1,299.00)
  currency: 'INR',
  receipt: 'rcpt_9812',
  notes: { tier: 'Pro Annual' },
});

console.log('Created Order ID:', order.id);`,
    python: `import buimbpay

client = buimbpay.Client(
    auth=("rzp_live_98fbc18", "sec_key_e49c71a")
)

order = client.order.create({
    "amount": 129900,  # in paise
    "currency": "INR",
    "receipt": "rcpt_9812",
    "notes": {"tier": "Pro Annual"}
})

print(f"Created Order: {order['id']}")`,
  },
  verifySignature: {
    node: `import crypto from 'crypto';

function verifyPaymentSignature({ orderId, paymentId, signature, secret }) {
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(\`\${orderId}|\${paymentId}\`)
    .digest('hex');

  return generatedSignature === signature;
}`,
    python: `import hmac
import hashlib

def verify_payment_signature(order_id, payment_id, signature, secret):
    msg = f"{order_id}|{payment_id}".encode()
    expected = hmac.new(secret.encode(), msg, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)`,
    curl: `# Verifies via SHA256 HMAC digest of order_id + "|" + payment_id
echo -n "order_Nx8Y29kLp102|pay_Pz9K28mQ10" | openssl dgst -sha256 -hmac "sec_key_e49c71a"`,
  },
};

export default function ApiReferencePage() {
  const [selectedLang, setSelectedLang] = useState('node');
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0C1938] text-white">
      {/* Hero Header */}
      <section className="pt-16 pb-12 px-4 sm:px-8 max-w-7xl mx-auto border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Code2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Developer API Specification v1.0</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Interactive API Reference & SDKs
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Accept payments, manage recurring mandates, trigger 24×7 instant vendor payouts, and verify cryptographic webhook signatures.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={DASHBOARD_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-[#0B63E5] hover:bg-blue-600 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
            >
              <KeyRound className="w-4 h-4" />
              <span>Generate API Keys</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Reference Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid lg:grid-cols-12 gap-8">
        {/* Navigation / Endpoints Directory (3 cols) */}
        <div className="lg:col-span-3 space-y-6 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-slate-400 uppercase tracking-wider block mb-2 text-[10px]">
              Core Payment Gateway
            </span>
            <div className="space-y-1">
              <div className="px-3 py-2 rounded-lg bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30">
                POST /v1/orders
              </div>
              <div className="px-3 py-2 rounded-lg hover:bg-slate-800/60 text-slate-400 cursor-pointer">
                GET /v1/payments/:id
              </div>
              <div className="px-3 py-2 rounded-lg hover:bg-slate-800/60 text-slate-400 cursor-pointer">
                POST /v1/payments/:id/refund
              </div>
            </div>
          </div>

          <div className="space-y-1 pt-4 border-t border-slate-800">
            <span className="font-bold text-slate-400 uppercase tracking-wider block mb-2 text-[10px]">
              BuimbPayX Instant Payouts
            </span>
            <div className="space-y-1 text-slate-400">
              <div className="px-3 py-2 rounded-lg hover:bg-slate-800/60 cursor-pointer">
                POST /v1/payouts
              </div>
              <div className="px-3 py-2 rounded-lg hover:bg-slate-800/60 cursor-pointer">
                POST /v1/payout-links
              </div>
              <div className="px-3 py-2 rounded-lg hover:bg-slate-800/60 cursor-pointer">
                POST /v1/verify/bank-account
              </div>
            </div>
          </div>

          <div className="space-y-1 pt-4 border-t border-slate-800">
            <span className="font-bold text-slate-400 uppercase tracking-wider block mb-2 text-[10px]">
              Webhooks & Security
            </span>
            <div className="space-y-1 text-slate-400">
              <div className="px-3 py-2 rounded-lg hover:bg-slate-800/60 cursor-pointer">
                Signature Verification
              </div>
              <div className="px-3 py-2 rounded-lg hover:bg-slate-800/60 cursor-pointer">
                Idempotency Guidelines
              </div>
            </div>
          </div>
        </div>

        {/* Code Snippet & Docs (9 cols) */}
        <div className="lg:col-span-9 space-y-10">
          {/* Section 1: Create Order */}
          <div className="bg-[#091228] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs">POST</span>
                  <span className="font-mono text-sm text-slate-200">https://api.buimbpay.com/v1/orders</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Initiates a payment order and generates an order_id for checkout.</p>
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                {['curl', 'node', 'python'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-3 py-1.5 rounded-lg font-mono font-bold uppercase transition-all ${
                      selectedLang === lang ? 'bg-[#0B63E5] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 relative bg-[#060D1E]">
              <button
                onClick={() => handleCopy(SNIPPETS.createOrder[selectedLang], 'order')}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5"
              >
                {copiedKey === 'order' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'order' ? 'Copied' : 'Copy'}</span>
              </button>

              <pre className="font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed pt-2">
                <code>{SNIPPETS.createOrder[selectedLang]}</code>
              </pre>
            </div>
          </div>

          {/* Section 2: Webhook Signature Verification */}
          <div className="bg-[#091228] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>Verify Webhook Signature (HMAC SHA256)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Always verify the <code className="text-amber-300 font-mono">x-buimbpay-signature</code> header before fulfilling customer orders.</p>
              </div>
            </div>

            <div className="p-6 relative bg-[#060D1E]">
              <button
                onClick={() => handleCopy(SNIPPETS.verifySignature[selectedLang] || SNIPPETS.verifySignature.node, 'sig')}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5"
              >
                {copiedKey === 'sig' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'sig' ? 'Copied' : 'Copy'}</span>
              </button>

              <pre className="font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed pt-2">
                <code>{SNIPPETS.verifySignature[selectedLang] || SNIPPETS.verifySignature.node}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

