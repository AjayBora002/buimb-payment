'use client';
import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, ShieldCheck, Code, Globe } from 'lucide-react';

export default function LearnPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
          <BookOpen className="w-3.5 h-3.5" />
          Fintech Knowledge Academy
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          Master Modern Payments
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          In-depth guides, regulatory deep dives, and architectural references for developers, finance leaders, and product founders.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">UPI AutoPay Architecture</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Understanding recurring mandates, pre-debit notifications, execution windows, and retry scheduling under NPCI guidelines.
          </p>
          <Link href="/docs" className="text-[#0B63E5] font-bold text-xs hover:underline block">Read Guide &rarr;</Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">RBI Payment Aggregator Norms</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            What merchants need to know about nodal escrow accounts, merchant onboarding KYC standards, and data localization rules.
          </p>
          <Link href="/compliance" className="text-[#0B63E5] font-bold text-xs hover:underline block">Read Compliance Brief &rarr;</Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">Zero-Drop Webhooks</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            How to verify HMAC-SHA256 signatures over raw body bytes, handle idempotency, and eliminate double-credit bugs.
          </p>
          <Link href="/api-reference" className="text-[#0B63E5] font-bold text-xs hover:underline block">Explore Code Samples &rarr;</Link>
        </div>
      </section>
    </div>
  );
}
