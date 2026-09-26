'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  QrCode,
  Volume2,
  ArrowRightLeft,
  Store,
  Banknote,
  CheckCircle2,
  Zap,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  CreditCard,
  Radio,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function QrCodesMarketingPage() {
  const [demoAmount, setDemoAmount] = useState('450');
  const [demoPaid, setDemoPaid] = useState(false);

  const handleSimulateAudio = () => {
    setDemoPaid(true);
    try {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(
          `BuimbPay par ${demoAmount} rupaye prapt hue`
        );
        utterance.lang = 'hi-IN';
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className="flex flex-col gap-24 py-12 px-6 max-w-7xl mx-auto">
      {/* ── 1. Hero Section ────────────────────────────────────────────── */}
      <section className="text-center space-y-6 pt-8 pb-4 relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          PhonePe Smart QR & Merchant Exchange Infrastructure
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-[1.1]">
          Multi-Feature BharatQR with <span className="text-blue-500">Merchant Exchange</span> & Smart Soundbox.
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Accept payments from all 100+ UPI apps, announce transactions instantly with high-decibel 4G voice alerts, and offer Cash @ POS mini-ATM exchanges directly at your counter.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30"
          >
            Start Accepting Payments
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-sm transition-all"
          >
            0% Platform Fee Pricing
          </Link>
        </div>
      </section>

      {/* ── 2. Interactive PhonePe QR & Soundbox Simulator ─────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#070B16]/90 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Interactive Experience
          </span>
          <h2 className="text-3xl font-bold text-white">
            See How the Smart QR & Soundbox Operates in Real Time
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Every scan generates an NPCI-compliant payment intent. Once approved by the customer’s UPI app, the Soundbox announces the receipt within 800ms while real-time webhooks dispatch to your ERP.
          </p>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Set Dynamic Bill Amount (₹)
              </label>
              <div className="flex gap-2">
                {['150', '450', '1200', '2500'].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setDemoAmount(amt);
                      setDemoPaid(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      demoAmount === amt
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleSimulateAudio}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <Volume2 className="w-4 h-4" />
                Trigger Payment & Voice Alert (Hindi)
              </button>
              {demoPaid && (
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> ₹{demoAmount} Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* QR Visual Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-72 bg-gradient-to-b from-[#1E293B] to-[#0F172A] border-2 border-blue-500/30 rounded-3xl p-6 shadow-2xl text-center">
            <div className="inline-flex items-center gap-1.5 bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-[11px] font-semibold mb-2">
              <Store className="w-3.5 h-3.5" />
              Acme Retail Store #01
            </div>
            <h4 className="text-lg font-extrabold text-white">BuimbPay Standee</h4>
            <p className="text-[10px] text-slate-400 mb-4">Interoperable BharatQR Terminal</p>

            <div className="bg-white p-4 rounded-2xl shadow-inner relative flex flex-col items-center justify-center">
              <div className="w-44 h-44 bg-white flex items-center justify-center relative">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900" fill="currentColor">
                  <rect x="5" y="5" width="28" height="28" fill="#000" rx="3" />
                  <rect x="9" y="9" width="20" height="20" fill="#fff" rx="2" />
                  <rect x="13" y="13" width="12" height="12" fill="#2563EB" rx="1.5" />

                  <rect x="67" y="5" width="28" height="28" fill="#000" rx="3" />
                  <rect x="71" y="9" width="20" height="20" fill="#fff" rx="2" />
                  <rect x="75" y="13" width="12" height="12" fill="#2563EB" rx="1.5" />

                  <rect x="5" y="67" width="28" height="28" fill="#000" rx="3" />
                  <rect x="9" y="71" width="20" height="20" fill="#fff" rx="2" />
                  <rect x="13" y="75" width="12" height="12" fill="#2563EB" rx="1.5" />

                  <rect x="38" y="8" width="5" height="5" />
                  <rect x="48" y="8" width="5" height="5" />
                  <rect x="56" y="8" width="5" height="5" />
                  <rect x="38" y="18" width="5" height="5" />
                  <rect x="48" y="24" width="8" height="5" />
                  <rect x="58" y="18" width="5" height="5" />
                  <rect x="38" y="38" width="6" height="6" />
                  <rect x="56" y="38" width="6" height="6" />
                  <rect x="46" y="46" width="8" height="8" />
                  <rect x="68" y="38" width="5" height="5" />
                  <rect x="78" y="38" width="8" height="5" />
                  <rect x="38" y="68" width="6" height="6" />
                  <rect x="48" y="68" width="6" height="6" />
                  <rect x="68" y="68" width="6" height="6" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-lg bg-white border-2 border-blue-600 shadow-sm flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-600 fill-blue-600" />
                  </div>
                </div>

                {demoPaid && (
                  <div className="absolute inset-0 bg-emerald-600/95 rounded-xl flex flex-col items-center justify-center text-white p-2 animate-in fade-in">
                    <CheckCircle2 className="w-10 h-10 mb-1" />
                    <span className="text-base font-bold">₹{demoAmount}</span>
                    <span className="text-[10px] uppercase font-semibold">Soundbox Alerted</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-xs text-slate-400">
              <span>Bill Amount:</span>
              <span className="text-white font-bold text-sm">₹{demoAmount}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PhonePe Merchant Exchange Feature Deep Dive ────────────── */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Exclusive Capability
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            PhonePe-Style Merchant Exchange & Cash @ POS
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Turn your retail store into a financial exchange hub. With Merchant Exchange, shopkeepers can offer micro-cash withdrawals to customers and execute instant B2B vendor settlements without T+1 delays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Banknote className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Cash @ POS (PhonePe ATM)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Customers scan your QR to withdraw up to ₹2,000 in cash. Their bank account is debited, your BuimbPay nodal wallet is credited instantly, and you earn an RBI-compliant 0.5% merchant interchange bonus!
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <ArrowRightLeft className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">B2B Vendor Balance Exchange</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pay distributors and raw material suppliers directly using your in-store QR collections. No need to wait for nightly bank batch settlements—exchange digital liquidity on the fly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Dynamic Terminal Switching</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Switch receiving bank VPAs and sub-merchant accounts instantly across billing counters, express drive-thru points, or franchise branches from a single unified management console.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. Soundbox Specifications ──────────────────────────────────── */}
      <section className="bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-500/20 rounded-3xl p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Hardware Architecture
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Industrial-Grade 4G Smart Soundbox
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Engineered for busy, noisy Indian market environments. Equipped with a 3W high-decibel speaker, dual-carrier eSIM auto-switching, and 72 hours of standby battery life.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Dual eSIM (Jio & Airtel)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>95 dB High-Clarity Speaker</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>11 Regional Languages</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Type-C Fast Charging</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#070B16]/90 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white">Supported UPI & BharatQR Protocols</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-blue-400 font-semibold block">UPI AutoPay</span>
                <span className="text-slate-400 text-[11px]">Recurring In-Store Mandates</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-semibold block">RuPay Credit on UPI</span>
                <span className="text-slate-400 text-[11px]">Scan & Pay via Credit Card</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-indigo-400 font-semibold block">UPI Lite</span>
                <span className="text-slate-400 text-[11px]">Sub-₹500 Instant Pinless</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-purple-400 font-semibold block">BharatQR EMVCo</span>
                <span className="text-slate-400 text-[11px]">Visa / Mastercard QR Rails</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
