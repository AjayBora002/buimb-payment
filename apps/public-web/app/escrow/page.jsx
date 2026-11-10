'use client';
import React from 'react';
import Link from 'next/link';
import { Landmark, ShieldCheck, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

export default function EscrowPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
          <Landmark className="w-3.5 h-3.5" />
          Escrow+ Account Infrastructure
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          Trust-Backed Digital Escrow
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Facilitate high-value digital transactions, B2B procurement, and multi-sided marketplace orders with milestone-based funds lock and automated releases.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="px-7 py-3.5 bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Open Escrow+ Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            1
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">Buyer Deposits Funds</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Buyer funds are safely parked into an RBI-regulated tripartite nodal escrow account managed with our scheduled partner banks.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            2
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">Seller Delivers Goods</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            The supplier completes the contractual milestone, project phase, or physical shipping with verified tracking numbers.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            3
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">Automated Disbursal</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Upon digital buyer inspection or inspection window expiration, funds are disbursed instantaneously via RTGS/NEFT/IMPS.
          </p>
        </div>
      </section>
    </div>
  );
}
