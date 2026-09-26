'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  Gift,
  ArrowRight,
  Shield,
  Zap,
  Users,
  Building2,
  Headphones,
  Check,
} from 'lucide-react';

export default function StartupPerksPage() {
  return (
    <div className="flex flex-col gap-20 py-12 px-6 max-w-7xl mx-auto">
      {/* ── 1. Hero Section (Replicating Razorpay Reference Image) ───────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            BuimbPay for Startups Program
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Backing Bold Ideas with <span className="text-blue-500">Startup Perks</span>.
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
            Now you can build more & spend less with <strong>₹1Cr* startup benefits</strong>, zero-fee payment processing, and 50L in SaaS discounts.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-sm transition-all"
            >
              Talk to Us
            </Link>
          </div>

          <div className="pt-4 flex items-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              24×7 Priority Startup Support
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Instant Sandbox Access
            </span>
          </div>
        </div>

        {/* Hero Card Graphic */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-md bg-gradient-to-br from-[#1E293B] to-[#0A0F1E] border border-blue-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Perks Package</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ₹1Cr VALUE
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-white font-semibold block">Free Domestic Processing</span>
                  <span className="text-slate-400 text-[11px]">Up to ₹30 Lakh GMV waiver</span>
                </div>
                <span className="font-mono text-emerald-400 font-bold">100% OFF</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-white font-semibold block">Magic Checkout</span>
                  <span className="text-slate-400 text-[11px]">1-click checkout conversion booster</span>
                </div>
                <span className="font-mono text-blue-400 font-bold">6 MO FREE</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-white font-semibold block">AWS & Cloud Credits</span>
                  <span className="text-slate-400 text-[11px]">Direct founder coupon pack</span>
                </div>
                <span className="font-mono text-indigo-400 font-bold">$5,000</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-white font-semibold block">BuimbPayX Current Account</span>
                  <span className="text-slate-400 text-[11px]">Zero-balance startup banking</span>
                </div>
                <span className="font-mono text-purple-400 font-bold">₹0 AMC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Benefits Table (Exact Comparison from Reference) ───────── */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white">
            ₹1Cr* FREE benefits for funded startups
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Tailored tiers designed to give your venture maximum runway from pre-seed to Series B.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Angel Funded Tier */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Early Stage</span>
              <h3 className="text-2xl font-black text-white mt-1">Angel Funded</h3>
              <p className="text-xs text-slate-400 mt-1">For bootstrapped & angel-backed founders</p>
            </div>

            <div className="divide-y divide-slate-800 text-xs space-y-3">
              <div className="pt-3 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  <strong className="text-white">₹3 Lakh* worth</strong> of FREE domestic payments
                </span>
              </div>
              <div className="pt-3 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  <strong className="text-white">₹3 Lakh* worth</strong> of FREE international payments
                </span>
              </div>
              <div className="pt-3 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Magic Checkout free for <strong className="text-white">90 days</strong>
                </span>
              </div>
              <div className="pt-3 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  With BuimbPayX zero-balance current account get an extra <strong className="text-white">₹5L GMV</strong> on Payment Gateway
                </span>
              </div>
            </div>

            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="block w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-center font-bold text-white text-xs transition-all"
            >
              Claim Angel Tier
            </a>
          </div>

          {/* VC Funded Tier */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-900 border-2 border-blue-500/50 space-y-6 relative shadow-2xl">
            <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black tracking-wider uppercase shadow-md">
              Most Popular
            </div>

            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Growth Stage</span>
              <h3 className="text-2xl font-black text-white mt-1">VC Funded</h3>
              <p className="text-xs text-slate-400 mt-1">For institutional & venture capital funded teams</p>
            </div>

            <div className="divide-y divide-slate-800 text-xs space-y-3">
              <div className="pt-3 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  <strong className="text-white">₹30 Lakh* worth</strong> of FREE domestic payments
                </span>
              </div>
              <div className="pt-3 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  <strong className="text-white">₹20 Lakh* worth</strong> of FREE international payments
                </span>
              </div>
              <div className="pt-3 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Magic Checkout free for <strong className="text-white">6 months</strong>
                </span>
              </div>
              <div className="pt-3 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  With BuimbPayX zero-balance current account get an extra <strong className="text-white">₹10L GMV</strong> on Payment Gateway
                </span>
              </div>
            </div>

            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="block w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-center font-bold text-white text-xs transition-all shadow-lg shadow-blue-600/30"
            >
              Claim VC Tier
            </a>
          </div>
        </div>
      </section>

      {/* ── 3. True Partnership Beyond the Tools (Reference Replicated) ── */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white">
            True Partnership <span className="text-blue-500">Beyond the Tools</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            We don't just provide API keys—we introduce you to future investors, design partners, and scale mentors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#070B16] border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Network with the right people</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Get exclusive invites to BuimbPay Rize mixers across Bengaluru, Mumbai, and Delhi NCR. Real conversations, zero fluff, and direct access to high-velocity founders.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#070B16] border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Access to funding & expert guidance</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              BuimbPay Ventures invests up to $500K in fintech and enterprise SaaS disruptors. Gain access to 1-on-1 consultations with payment architecture veterans.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
