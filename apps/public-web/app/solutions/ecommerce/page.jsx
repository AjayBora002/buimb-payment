'use client';
import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function EcommerceSolutionPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
          <ShoppingBag className="w-3.5 h-3.5" />
          Industry Solution · E-Commerce &amp; D2C
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          BuimbPay for E-Commerce Brands
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          5x faster checkout with 50M+ pre-filled Indian addresses, COD-to-prepaid conversion incentives, and AI-powered RTO fraud reduction.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="px-7 py-3.5 bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Supercharge E-Commerce</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">1-Click Magic Checkout</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Eliminates cart drop-offs by pre-filling shopper addresses and shipping details across India's largest merchant network.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">COD Anti-Fraud Intelligence</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Machine learning model scores buyer address fidelity and past delivery acceptance, preventing expensive return-to-origin courier losses.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">Instant Customer Refunds</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Credit return refunds directly to customer UPI VPAs in 15 seconds instead of making them wait 5-7 business days for bank processing.
          </p>
        </div>
      </section>
    </div>
  );
}
