import React from 'react';
import { Terminal, Shield, Code, ArrowRight } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12 text-xs">
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          BuimbPay API Reference (v1)
        </h1>
        <p className="text-sm text-slate-400">
          Complete REST API specification, state transition rules, and webhook implementation guides.
        </p>
      </div>

      {/* Base URLs */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h2 className="text-sm font-bold text-white">Environment Base URLs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-slate-500 font-semibold">Sandbox (Local Development)</span>
            <div className="font-mono text-emerald-400 mt-1">http://localhost:4000/v1</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-slate-500 font-semibold">Production (Pending Licensing)</span>
            <div className="font-mono text-slate-500 mt-1">https://api.buimbpay.com/v1 (Disabled)</div>
          </div>
        </div>
      </div>

      {/* Authentication */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-white">Authentication</h2>
        <p className="text-slate-400 leading-relaxed">
          All API requests must include your API secret key in an HTTP Bearer header. Test keys begin with <code className="text-blue-400 bg-slate-900 px-1 py-0.5 rounded">bp_test_</code>.
        </p>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-slate-200">
          Authorization: Bearer bp_test_89fa2104abcd...
        </div>
      </div>

      {/* Endpoints */}
      <div className="space-y-6">
        <h2 className="text-base font-bold text-white">Core Endpoints</h2>

        {/* 1. Orders */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-400 font-mono font-bold text-[11px]">
                POST
              </span>
              <span className="font-mono text-white text-sm">/v1/orders</span>
            </div>
            <span className="text-slate-400">Create Order</span>
          </div>
          <p className="text-slate-400">
            Initializes an order aggregate. Amounts must be represented as integer minor units (paise).
          </p>
          <pre className="p-3 rounded-lg bg-slate-950 font-mono text-blue-300 overflow-x-auto">
{`// Request Body
{
  "amount": 500000,          // ₹5,000.00 in paise
  "currency": "INR",
  "description": "Order #48291",
  "externalOrderId": "ord_48291"
}`}
          </pre>
        </div>

        {/* 2. Payment Intents */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-400 font-mono font-bold text-[11px]">
                POST
              </span>
              <span className="font-mono text-white text-sm">/v1/payment-intents/:id/confirm</span>
            </div>
            <span className="text-slate-400">Confirm Payment Intent</span>
          </div>
          <p className="text-slate-400">
            Executes payment collection through the provider rail. In Sandbox, passes to MockProvider to simulate instant authorization.
          </p>
          <pre className="p-3 rounded-lg bg-slate-950 font-mono text-blue-300 overflow-x-auto">
{`// Request Body
{
  "paymentMethodType": "UPI",
  "simulateOutcome": "success"  // Options: 'success' | 'failure'
}`}
          </pre>
        </div>

        {/* 3. Refunds */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-400 font-mono font-bold text-[11px]">
                POST
              </span>
              <span className="font-mono text-white text-sm">/v1/refunds</span>
            </div>
            <span className="text-slate-400">Initiate Refund</span>
          </div>
          <p className="text-slate-400">
            Issues a full or partial refund against a previously CAPTURED payment intent. Protected by idempotency keys.
          </p>
          <pre className="p-3 rounded-lg bg-slate-950 font-mono text-blue-300 overflow-x-auto">
{`// Request Body
{
  "paymentIntentId": "pi_9182a0b41c0944e8",
  "amount": 250000,
  "reason": "Customer requested cancellation",
  "idempotencyKey": "ref_idem_0921a8"
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
