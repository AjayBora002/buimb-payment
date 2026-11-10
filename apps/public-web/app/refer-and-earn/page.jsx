'use client';
import React from 'react';
import Link from 'next/link';
import { Gift, ArrowRight, ShieldCheck, TrendingUp, Users } from 'lucide-react';

export default function ReferAndEarnPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
          <Gift className="w-3.5 h-3.5" />
          Partner Ecosystem
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          Refer Businesses &amp; Earn Up to 20% Commission
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Recommend BuimbPay to your clients, portfolio companies, and network. Earn recurring revenue share on their processing volumes for lifetime.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="px-7 py-3.5 bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Join Referral Program</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">For Web Agencies &amp; Devs</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Integrate BuimbPay on your client stores and receive monthly recurring commissions directly to your bank account with live analytics.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">For VCs &amp; Incubators</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Offer your cohort startups ₹50 Lakhs in startup credits, zero payment gateway fees for 90 days, and dedicated relationship managers.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">Real-Time Partner Portal</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Track clicks, signups, KYC status, transaction GMV, and monthly revenue disbursements from your dedicated partner console.
          </p>
        </div>
      </section>
    </div>
  );
}
