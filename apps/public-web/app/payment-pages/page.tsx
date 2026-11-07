'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  CreditCard,
  Palette,
  ShieldCheck,
  Zap,
  Globe,
  Sliders,
} from 'lucide-react';

export default function PaymentPagesPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* ── 1. Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pb-32 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-10 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-semibold">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              BuimbPay Payment Pages · No-Code Online Storefronts
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Accept payments with{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                zero code
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Create beautiful, branded storefronts in under 5 minutes without writing a single line of code. Perfect for event ticket sales, digital downloads, donations, fee collection, and services.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/signup"
                className="px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
              >
                <span>Create a Payment Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
              >
                View Transparent Pricing
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% No-Code Setup
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant Branded Receipts
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Mobile-Optimized Checkout
              </span>
            </div>
          </div>

          {/* Interactive Storefront Preview Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#101b3b] border border-indigo-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Live Hosted Storefront
                </span>
                <span className="text-[11px] text-slate-400 font-mono">pay.buimbpay.com/p/summit2026</span>
              </div>

              <div className="bg-[#0b132b] p-5 rounded-xl border border-slate-700/80 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 uppercase">
                    Early Bird Pass
                  </span>
                  <h3 className="text-base font-bold text-white">Global Fintech Summit 2026</h3>
                  <p className="text-xs text-slate-400">
                    Full 2-day conference pass including networking dinner, workshop tracks, and recording access.
                  </p>
                </div>

                <div className="flex items-baseline justify-between pt-2 border-t border-slate-800">
                  <span className="text-xs text-slate-400">Ticket Price:</span>
                  <span className="text-xl font-black text-white font-mono">₹2,999.00</span>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-[11px] text-slate-400">Custom Attendee Details</div>
                  <input
                    type="text"
                    disabled
                    value="Priya Sharma (priya@fintech.io)"
                    className="w-full h-8 bg-slate-900 border border-slate-700 rounded px-2.5 text-xs text-slate-300"
                  />
                </div>

                <button
                  type="button"
                  className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Pay ₹2,999.00 via UPI / Cards</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>PCI-DSS Level 1 · 256-Bit SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Why Use Payment Pages ────────────────────────────────── */}
      <section className="py-20 bg-[#081226] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Built for Conversion
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Everything you need to sell online without a website
            </h2>
            <p className="text-sm text-slate-400">
              Launch storefronts, customize forms, and collect payments directly through social media, emails, or QR codes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0c1a38] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Custom Brand Themes</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Add your business logo, custom banner images, and primary brand colors for a cohesive and trusted customer experience.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c1a38] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Custom Form Fields</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Collect buyer names, phone numbers, shipping addresses, GST numbers, and custom dropdown choices during checkout.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c1a38] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Social Commerce Ready</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Share directly via WhatsApp, Instagram Bio, YouTube descriptions, or embed as a button on any existing webpage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Bottom CTA ────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Create your first storefront in under 5 minutes
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          No domain, no hosting, and no developer needed. Start collecting payments today.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
          >
            Start for Free →
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-semibold text-sm transition-all"
          >
            Contact Sales
          </Link>
        </div>
      </section>
    </div>
  );
}
