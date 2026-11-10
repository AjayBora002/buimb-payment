'use client';
import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Users, Sparkles } from 'lucide-react';

export default function EventsPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
          <Calendar className="w-3.5 h-3.5" />
          Community &amp; Summits
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          BuimbPay Events &amp; Meetups
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Join India's foremost fintech architects, founders, and developers discussing payment engineering, agentic banking, and global trade.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs text-blue-600 font-bold">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> November 28, 2026</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Bengaluru &amp; Virtual</span>
          </div>
          <h3 className="text-2xl font-black text-[#0C2340]">BuimbPay Converge 2026</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            The flagship annual conference on autonomous commerce, sovereign UPI infrastructure, and cross-border corridor expansion.
          </p>
          <button className="px-5 py-2.5 bg-[#0B63E5] hover:bg-[#0951bd] text-white text-xs font-bold rounded-lg transition-colors">
            Register for Free
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs text-emerald-600 font-bold">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Every Alternate Thursday</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> Live Discord Stage</span>
          </div>
          <h3 className="text-2xl font-black text-[#0C2340]">Developer Office Hours</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Direct 1-on-1 architecture reviews with BuimbPay core engineers to debug webhooks, state machines, and high-concurrency checkouts.
          </p>
          <button className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors">
            Join Developer Discord
          </button>
        </div>
      </section>
    </div>
  );
}
