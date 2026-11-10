'use client';
import React from 'react';
import Link from 'next/link';
import { Sparkles, Bot, Layers, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export default function AgentStudioPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700">
          <Sparkles className="w-3.5 h-3.5" />
          No-Code & Pro-Code Agent Orchestrator
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          BuimbPay Agent Studio
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Build, fine-tune, and deploy AI Agents specialized in Payments, Dunning, Chargeback Defense, and Revenue Operations in minutes.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="px-7 py-3.5 bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Launch Agent Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0B63E5] flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">Dunning & Recovery Agent</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Automatically reaches out to delinquent subscribers with contextual WhatsApp & SMS smart recovery links, recovering 38% more failed cards.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">Chargeback Defense Agent</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Auto-compiles delivery proofs, banking UTRs, IP telemetry, and customer interactions to draft representment packages for Visa & Mastercard.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">Reconciliation Co-Pilot</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Parses unallocated bank deposits, resolves fuzzy invoice numbers, and auto-settles pending accounts payable into your ERP in real time.
          </p>
        </div>
      </section>
    </div>
  );
}
