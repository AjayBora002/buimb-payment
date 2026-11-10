'use client';
import React from 'react';
import Link from 'next/link';
import { Bot, Sparkles, ArrowRight, ShieldCheck, Zap, MessageSquare, Terminal } from 'lucide-react';

export default function AgenticPaymentsPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
          <Bot className="w-3.5 h-3.5" />
          The Agentic Stack · Autonomous Commerce
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          Agentic Payments for the AI Era
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Enable autonomous AI agents to initiate, authorize, and reconcile payments safely within pre-authorized budget limits and cryptographic signatures.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="px-7 py-3.5 bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Deploy Agentic Payments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/docs"
            className="px-6 py-3.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold rounded-xl text-sm transition-all"
          >
            Agent SDK Docs
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0B63E5] flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">Multi-Turn Dialog Checkout</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Customers authorize transactions conversationally directly inside WhatsApp, ChatGPT, or proprietary LLM copilot interfaces.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">Autonomous Spend Mandates</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Configure strict spending fences, approval workflows, and tokenized UPI AutoPay caps so your AI agent never exceeds authorization.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Terminal className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">Deterministic Tool Calling</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Native function definitions for LangChain, LlamaIndex, Claude tool-use, and OpenAI functions with cryptographic proof of delivery.
          </p>
        </div>
      </section>
    </div>
  );
}
