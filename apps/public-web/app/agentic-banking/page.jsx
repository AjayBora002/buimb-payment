'use client';
import React from 'react';
import Link from 'next/link';
import { Building2, MessageSquare, ArrowRight, ShieldCheck, Landmark } from 'lucide-react';

export default function AgenticBankingPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
          <MessageSquare className="w-3.5 h-3.5" />
          Conversational Connected Banking
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          Banking You Can Talk To
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Ask questions in plain English like <em>"What were my net Amazon payouts this week?"</em> or <em>"Disburse vendor invoice #9012 via IMPS"</em> with instant verification.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="px-7 py-3.5 bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Activate Connected Banking</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0B63E5] flex items-center justify-center">
            <Landmark className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">Direct Scheduled Bank Sync</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Real-time API pipes directly with ICICI, HDFC, Axis, and Yes Bank accounts for continuous balance checks and instantaneous fund movements.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">Dual-Key Human-in-the-Loop</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            High-value transfers proposed by the agent require a single biometric or 2FA tap on your phone, ensuring 100% security against unauthorized sweeps.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">Multi-Entity Treasury</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Manage subsidiary accounts, nodal accounts, and vendor escrows from a single conversational prompt without navigating 10 banking portals.
          </p>
        </div>
      </section>
    </div>
  );
}
