'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Zap,
  ShieldCheck,
  Code2,
  Lock,
  CheckCircle2,
  RefreshCw,
  Layers,
  Server,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [simStep, setSimStep] = useState<number>(3);

  return (
    <div className="w-full bg-[#F8FAFC] text-[#0F172A] overflow-hidden">

      {/* ── 1. Hero Section ─ Finora Sky Blue Atmosphere ──────────────── */}
      <section className="relative pt-12 pb-32 sm:pb-44 px-4 sm:px-6 bg-gradient-to-b from-[#649EB5] via-[#75AEC1] to-[#8EBECF] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-10 w-[400px] h-[400px] bg-blue-300/20 rounded-full blur-2xl" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-6 pt-4 sm:pt-10">
          {/* Original label badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm font-mono text-xs font-bold text-white uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            India-Focused Developer Payment Infrastructure
          </div>

          {/* Original h1 — untouched */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
            The security-first payment platform built for modern engineering teams.
          </h1>

          {/* Original subheading — untouched */}
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Accept UPI, cards, and recurring subscriptions with double-entry ledger precision. Built with strict state-machine controls and an end-to-end sandbox.
          </p>

          {/* Original CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 pb-8">
            <Link
              href="/contact"
              className="bg-[#2B59FF] hover:bg-[#1E40AF] text-white px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-[0_8px_25px_rgba(43,89,255,0.4)]"
            >
              Get Started for Free
            </Link>
            <Link
              href="/docs"
              className="bg-white/15 hover:bg-white/25 text-white border border-white/35 backdrop-blur-md px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-sm"
            >
              View API Documentation
            </Link>
          </div>

          {/* Hero Preview Card — original API response preview */}
          <div className="max-w-3xl mx-auto pt-6">
            <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-3xl p-5 text-left shadow-[0_30px_70px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-yellow-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-green-500 inline-block" />
                  <span className="ml-2 text-slate-200">POST /v1/payment-intents/pi_9182a0b/confirm</span>
                </div>
                <span className="text-emerald-400 font-semibold">200 OK · 142ms</span>
              </div>

              {/* Interactive State Machine Stepper */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] text-slate-400 font-mono">Simulate state transition:</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-center">
                  {['CREATED', 'PROCESSING', 'AUTHORISED', 'CAPTURED'].map((state, idx) => (
                    <button
                      key={state}
                      onClick={() => setSimStep(idx)}
                      className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                        simStep >= idx
                          ? 'bg-[#2B59FF] text-white shadow-sm'
                          : 'bg-white/10 text-slate-400 hover:bg-white/15'
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>

              <pre className="text-left text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
{`{
  "id": "pi_9182a0b41c0944e8",
  "status": "${['CREATED', 'PROCESSING', 'AUTHORISED', 'CAPTURED'][simStep]}",
  "amount": 450000,
  "currency": "INR",
  "customer": "priya@example.com",
  "method": "UPI",
  "stateTransitions": ["CREATED", "PROCESSING", "AUTHORISED", "CAPTURED"],
  "ledgerTransactionId": "ltx_4918f0a12",
  "environment": "SANDBOX"
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Fade transition to white */}
        <div className="absolute -bottom-1 left-0 right-0 h-20 sm:h-28 bg-gradient-to-t from-[#F8FAFC] to-transparent pointer-events-none" />
      </section>

      {/* ── 2. Payment Methods Supported ────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Universal India Payment Method Coverage
          </h2>
          <p className="text-sm text-slate-500">One unified integration for every payment preference</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#2B59FF] flex items-center justify-center font-mono font-bold text-sm border border-blue-100">
              UPI
            </div>
            <h3 className="text-base font-semibold text-slate-900">UPI & QR Codes</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Google Pay, PhonePe, Paytm, and BHIM with intent flow and dynamic QR generation.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-mono font-bold text-sm border border-amber-100">
              Cards
            </div>
            <h3 className="text-base font-semibold text-slate-900">Cards (Visa / MC / RuPay)</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Domestic credit and debit cards with RBI-compliant tokenisation and 3DS2 two-factor authentication.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center font-mono font-bold text-sm border border-slate-200">
              NetB
            </div>
            <h3 className="text-base font-semibold text-slate-900">NetBanking (50+ Banks)</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Direct banking integrations covering all Tier-1 and scheduled public and private commercial banks.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-mono font-bold text-sm border border-emerald-100">
              Auto
            </div>
            <h3 className="text-base font-semibold text-slate-900">e-Mandates & Subscriptions</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Recurring payments and automated debit schedules adhering to RBI e-mandate circulars.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Architectural Blueprint ─────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 sm:p-10 space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#2B59FF]">Architectural Rigour</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Engineered as a Financial Settlement System
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              BuimbPay rejects floating-point math, silent state mutations, and unverified callbacks. Every rupee is accounted for in integer minor units (paise).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <Layers className="w-4 h-4 text-[#2B59FF]" />
                14-State Payment Machine
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Strict deterministic state transitions with optimistic concurrency locking. Terminal states (CAPTURED, FAILED, REFUNDED) are irreversible.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <Lock className="w-4 h-4 text-emerald-600" />
                Append-Only Ledger
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Double-entry bookkeeping table enforced by PostgreSQL triggers. Transactions balance to zero down to the exact paise.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <Server className="w-4 h-4 text-slate-600" />
                Transactional Outbox & Workers
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                BullMQ and Redis distributed message relay guarantee that external webhooks, settlement batches, and alerts are never dropped.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Developer Experience & Code Playground ───────────────────── */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-[#0A1128] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#2B59FF]">Developer First</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Integrated in minutes. <br />Auditable forever.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Clean REST endpoints with typed SDK support, idempotency headers, standard HTTP status codes, and instant sandbox simulation without credentials approval.
            </p>

            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Full idempotency key support on all mutating operations
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Signed HMAC-SHA256 webhook notifications with replay protection
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Zero-trust API key hashing with prefix-only database storage
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/docs"
                className="inline-flex items-center font-semibold text-sm text-[#2B59FF] hover:underline gap-1"
              >
                Explore Full API Documentation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Original code snippet */}
          <div className="bg-[#050914] rounded-2xl border border-slate-800 p-5 sm:p-6 font-mono text-xs overflow-x-auto">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-3 mb-4 text-[11px]">
              <span className="text-slate-200">checkout.js</span>
              <span className="text-emerald-400">Node.js 18+ / ESM</span>
            </div>
            <pre className="text-slate-200 leading-relaxed">
{`import { BuimbPay } from '@buimbpay/sdk';

const buimb = new BuimbPay({
  apiKey: process.env.BUIMBPAY_SECRET_KEY,
  environment: 'sandbox'
});

// 1. Create Order
const order = await buimb.orders.create({
  amount: 250000, // 2,500.00 INR
  currency: 'INR',
  externalOrderId: 'ord_9102'
});

// 2. Initialize Payment Intent
const intent = await buimb.paymentIntents.create({
  orderId: order.id,
  captureMethod: 'AUTOMATIC'
});`}
            </pre>
          </div>
        </div>
      </section>

      {/* ── 5. Honest Compliance Statement ─────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#2B59FF] border border-blue-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Responsible Indian Financial Compliance</h3>
              <p className="text-xs text-slate-500">
                Our commitments regarding RBI Payment Aggregator regulations and PCI DSS compliance
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-semibold text-slate-900">RBI Authorisation Path</div>
              <p className="text-slate-500">
                Operating non-bank payment aggregation in India requires formal RBI authorisation under the Payment and Settlement Systems Act. BuimbPay sandbox operates exclusively with simulated funds.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-semibold text-slate-900">Escrow & Settlement Safety</div>
              <p className="text-slate-500">
                Live funds must be routed through a dedicated Escrow Account maintained with a scheduled commercial bank, ensuring zero commingling of platform and merchant capital.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-semibold text-slate-900">PCI-DSS Tokenisation</div>
              <p className="text-slate-500">
                Raw card numbers, CVVs, and magnetic stripe data are never stored in platform databases. All card operations use network tokenisation compliant with RBI mandates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Frequently Asked Questions ──────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-500">Common questions about testing, sandbox mode, and APIs</p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'Can I start testing without signing a contract?',
              a: 'Yes. The sandbox environment is completely self-serve. You can launch the dashboard, generate test API keys, simulate payment confirmations, test refunds, and trigger webhook payloads instantly.',
            },
            {
              q: 'How does the state machine handle race conditions?',
              a: 'The payment engine uses PostgreSQL row-level locks and optimistic concurrency version fields on aggregate roots. Concurrent webhook or client requests are resolved safely without double-captures or double-refunds.',
            },
            {
              q: 'Why are monetary amounts represented as integers?',
              a: 'Financial engineering best practices dictate using minor currency units (paise for INR). Storing floating-point numbers can cause rounding errors and reconciliation discrepancies.',
            },
          ].map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left p-5 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-slate-900 pr-4">{faq.q}</span>
                  {isOpen
                    ? <ChevronUp className="w-4 h-4 text-[#2B59FF] shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  }
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-500 leading-relaxed animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 7. Call To Action ──────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto pb-24">
        <div className="text-center p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-[#0A1128] via-[#0F1A3A] to-[#0A1128] border border-slate-800 shadow-xl space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to experience modern payment infrastructure?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Join leading digital enterprises accepting UPI, cards, and recurring payments with double-entry ledger precision.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-8 py-3 rounded-full bg-[#2B59FF] hover:bg-[#1E40AF] text-white font-semibold text-sm transition-all duration-300 shadow-[0_8px_25px_rgba(43,89,255,0.4)] hover:scale-105"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
