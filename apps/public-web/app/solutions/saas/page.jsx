'use client';
import React from 'react';
import Link from 'next/link';
import { RefreshCw, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react';

export default function SaasSolutionPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
          <RefreshCw className="w-3.5 h-3.5" />
          Industry Solution · SaaS &amp; Cloud
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          BuimbPay for SaaS Businesses
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Automate recurring recurring subscription billing, international multi-currency pricing, and automated invoice delivery with sub-300ms checkout.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="px-7 py-3.5 bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Start SaaS Billing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">UPI AutoPay &amp; e-Mandates</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Collect monthly and annual subscriptions via UPI AutoPay, RuPay debit cards, and international cards with automated retry schedules.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">GST Compliant Invoicing</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Auto-generate tax invoices with B2B GSTIN validation, HSN/SAC codes, and instant PDF email dispatch to accounting departments.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">Smart Dunning Recovery</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Recover up to 40% of involuntary churn from expired credit cards with automated pre-debit notifications and WhatsApp payment links.
          </p>
        </div>
      </section>
    </div>
  );
}
