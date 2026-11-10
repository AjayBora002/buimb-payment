'use client';
import React from 'react';
import Link from 'next/link';
import { UserCheck, ArrowRight, ShieldCheck, Globe, CreditCard } from 'lucide-react';

export default function FreelanceSolutionPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700">
          <UserCheck className="w-3.5 h-3.5" />
          Industry Solution · Freelancers &amp; Agencies
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          BuimbPay for Freelancers &amp; Independent Consultants
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Get paid faster by domestic and international clients. Create branded payment pages, send invoice links, and accept international USD/EUR cards with zero setup fees.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="px-7 py-3.5 bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">Branded Payment Pages</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Create a custom link like <code>buimbpay.me/yourname</code> to collect project retainers, consulting fees, and design gig payments.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">International Card Collections</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Accept payments from US, UK, and European clients in USD, GBP, and EUR with direct INR conversion and automated FIRA certificate generation.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">T+0 Instant Settlement</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            No need to wait 30 days for marketplace payouts. Get client funds credited directly into your bank savings or current account on the same day.
          </p>
        </div>
      </section>
    </div>
  );
}
