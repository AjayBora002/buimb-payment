'use client';
import React from 'react';
import Link from 'next/link';
import { Smartphone, Zap, ArrowRight, ShieldCheck, QrCode, RefreshCw } from 'lucide-react';

export default function UpiPaymentsPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
          <Zap className="w-3.5 h-3.5" />
          The Complete UPI Stack
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          Supercharged UPI Payments for India
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Highest UPI success rate with direct PSP server connectivity, instant deep-linking, UPI AutoPay, and dynamic single-use QR codes.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="px-7 py-3.5 bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Activate UPI Stack</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0B63E5] flex items-center justify-center">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">UPI Intent Flow</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            One-tap deep linking directly opens the customer's preferred UPI app (Google Pay, PhonePe, Paytm, CRED) without copy-pasting VPAs.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">Dynamic Desktop QR</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            High-contrast dynamic QR codes refreshed per session with embedded amount and expiry timer for seamless scan-and-pay on PC.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">UPI AutoPay Recurring</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Recurring subscription billing up to ₹1,00,000 without requiring repetitive OTPs, perfect for SaaS, SIPs, and membership dues.
          </p>
        </div>
      </section>
    </div>
  );
}
