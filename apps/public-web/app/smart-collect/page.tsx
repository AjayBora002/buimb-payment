'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Copy,
  Check,
  Server,
  FileSpreadsheet,
  RefreshCw,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function SmartCollectPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* ── 1. Hero Section ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pb-32 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 font-semibold">
              <Building className="w-3.5 h-3.5 text-blue-400" />
              Smart Collect · Virtual Accounts & Automated Reconciliation
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Automate B2B payments with{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Virtual Accounts
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Generate dedicated Virtual Account Numbers (VAN) and custom UPI IDs for each of your B2B customers. Automatically match NEFT, RTGS, and IMPS wire transfers directly to invoices in real-time.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/signup"
                className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
              >
                <span>Create Virtual Accounts</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/docs"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
              >
                View Smart Collect API Docs
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Automated Reconciliation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero Unallocated Wire Deposits
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant Webhooks to ERP / Tally
              </span>
            </div>
          </div>

          {/* Interactive Virtual Account Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0f1d42] border border-blue-500/30 rounded-2xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Virtual Rail Active
                  </span>
                </div>
                <span className="text-[11px] font-mono text-blue-400">Partner: ICICI Bank Nodal</span>
              </div>

              <div className="bg-[#0a142c] p-4 rounded-xl border border-slate-700/80 space-y-3 font-mono text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 font-sans uppercase">Dedicated Virtual Account</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-base font-bold text-white tracking-wider">BUIMPBORA892019</span>
                    <button
                      onClick={() => copyToClipboard('BUIMPBORA892019', 'acc')}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Copy account number"
                    >
                      {copied === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                  <div>
                    <div className="text-[10px] text-slate-400 font-sans uppercase">IFSC Code</div>
                    <div className="text-xs font-semibold text-slate-200 mt-0.5">ICIC0000104</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-sans uppercase">Account Type</div>
                    <div className="text-xs font-semibold text-slate-200 mt-0.5">Current / Nodal</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <div className="text-[10px] text-slate-400 font-sans uppercase">Virtual UPI ID</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-blue-300 font-semibold">bora.zenith@icici</span>
                    <button
                      onClick={() => copyToClipboard('bora.zenith@icici', 'upi')}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Copy UPI ID"
                    >
                      {copied === 'upi' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between text-xs text-emerald-300">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  Auto-matched to Invoice #INV-2026-088
                </span>
                <span className="font-bold">₹2,45,000.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Why Smart Collect Features ───────────────────────────── */}
      <section className="py-20 bg-[#081226] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Zero Manual Effort
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              End-to-End Automated Wire Reconciliation
            </h2>
            <p className="text-sm text-slate-400">
              Eliminate hours wasted on bank statement downloads, unallocated receipts, and manual ledger entries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0c1a38] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Programmatic API Creation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instantly generate virtual bank accounts via REST API during customer onboarding, dealer registration, or invoice generation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c1a38] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Real-Time Webhook Signals</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive instant notifications with payer name, UTR number, remitter bank, and exact timestamp the millisecond funds arrive.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c1a38] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">ERP & Tally Integrations</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seamlessly sync payment credits directly with SAP, Oracle NetSuite, Tally Prime, and Zoho Books with zero human intervention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Bottom CTA ────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Ready to eliminate manual wire reconciliation?
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Start generating virtual accounts today with BuimbPay. Setup takes less than 15 minutes.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all hover:scale-105"
          >
            Get Started Now →
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-semibold text-sm transition-all"
          >
            Talk to Enterprise Sales
          </Link>
        </div>
      </section>
    </div>
  );
}
