'use client';
import React from 'react';
import Link from 'next/link';
import { FileText, Download, ArrowRight, ShieldCheck } from 'lucide-react';

export default function WhitepapersPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
          <FileText className="w-3.5 h-3.5" />
          Technical Research &amp; White Papers
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          Engineering White Papers
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Comprehensive technical publications authored by BuimbPay systems architects covering banking observation, distributed idempotency, and cryptography.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">WP-2026-01</span>
          <h3 className="text-xl font-bold text-[#0C2340]">Sovereign UPI Settlement via Banking Observation</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Eliminating intermediary gateway fees through Android notification ingesters, SMS telemetry, and sub-100ms UTR reconciliation.
          </p>
          <a href="#download" className="text-[#0B63E5] font-bold text-xs hover:underline flex items-center gap-1">
            <Download className="w-3.5 h-3.5" /> Download PDF (1.8 MB)
          </a>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">WP-2026-02</span>
          <h3 className="text-xl font-bold text-[#0C2340]">Distributed Webhook Idempotency at Scale</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Solving duplicate delivery, network jitter, and out-of-order race conditions in multi-tier financial state machines.
          </p>
          <a href="#download" className="text-[#0B63E5] font-bold text-xs hover:underline flex items-center gap-1">
            <Download className="w-3.5 h-3.5" /> Download PDF (2.4 MB)
          </a>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">WP-2026-03</span>
          <h3 className="text-xl font-bold text-[#0C2340]">Zero-Knowledge Tokenization for RuPay &amp; Visa</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Card-on-file tokenization architectures compliant with RBI guidelines while maintaining sub-300ms flash checkout speeds.
          </p>
          <a href="#download" className="text-[#0B63E5] font-bold text-xs hover:underline flex items-center gap-1">
            <Download className="w-3.5 h-3.5" /> Download PDF (1.2 MB)
          </a>
        </div>
      </section>
    </div>
  );
}
