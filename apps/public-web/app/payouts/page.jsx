'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Zap, ShieldCheck, CheckCircle2, Building, RefreshCw } from 'lucide-react';

export default function PayoutsPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
          <ArrowUpRight className="w-3.5 h-3.5" />
          Instant Disbursal Rails
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          24×7 Instant Automated Payouts
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Send money to any bank account, UPI ID, or debit card in India within 15 seconds. High-throughput bulk API disbursals operating 365 days a year.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="px-7 py-3.5 bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Start Disbursing Payouts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0B63E5] flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">Direct IMPS &amp; UPI Rails</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Instant settlement to vendor and employee bank accounts even on bank holidays, weekends, and national holidays.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">Smart Routing &amp; Failover</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Multi-bank liquidity routing automatically selects the fastest partner bank rail with 99.99% gateway availability.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">Automated Payroll &amp; Refunds</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Integrate with your HRMS or e-commerce refund queue to automate payouts without tedious manual OTP approvals.
          </p>
        </div>
      </section>
    </div>
  );
}
