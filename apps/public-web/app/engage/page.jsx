'use client';
import React from 'react';
import Link from 'next/link';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, ShoppingCart, Percent } from 'lucide-react';

export default function EngagePage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
          <Sparkles className="w-3.5 h-3.5" />
          Buyer Conversion &amp; Retention
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          BuimbPay Engage
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Boost your store conversion rates by 25%. Recover abandoned carts via WhatsApp interactive checkout, and offer dynamic bank discounts.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="px-7 py-3.5 bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Activate Engage Suite</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">WhatsApp Cart Recovery</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Send rich WhatsApp messages with pre-filled items and 1-tap UPI payment buttons within 15 minutes of cart abandonment.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0B63E5] flex items-center justify-center">
            <Percent className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">Dynamic Bank Offers</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Run HDFC, ICICI, Axis credit card instant discounts and No-Cost EMI promotions funded co-operatively with bank partners.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0C2340]">COD to UPI Incentive</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Offer customers ₹50 instant cashback if they convert high-risk Cash on Delivery orders to instant UPI prepaid on checkout.
          </p>
        </div>
      </section>
    </div>
  );
}
