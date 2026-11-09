'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Link2,
  Smartphone,
  CheckCircle2,
  Share2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  QrCode,
  Building,
} from 'lucide-react';

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:5173';

export default function PayoutLinksPage() {
  const [selectedMethod, setSelectedMethod] = useState('upi');

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0C2340] via-[#0C1938] to-[#0A142C] text-white pt-16 pb-24 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Frictionless Payouts without Bank Info</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Send instant payouts with just a <span className="text-[#3395FF]">phone number or link</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Disburse refunds, gaming winnings, influencer payouts, and customer cashbacks instantly. Send a secure Payout Link via SMS, WhatsApp, or Email—recipients enter their preferred UPI ID or Bank Account to claim funds in seconds.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noreferrer"
                className="bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:scale-[1.02] transition-all flex items-center gap-2 text-sm"
              >
                <span>Create a Payout Link</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/instant-settlement"
                className="bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all text-sm"
              >
                Explore 24×7 Instant Payouts
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-700/60 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">0</div>
                <div className="text-xs text-slate-400 mt-0.5">Bank Details Needed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">&lt; 30s</div>
                <div className="text-xs text-slate-400 mt-0.5">Time to Claim Funds</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">24×7</div>
                <div className="text-xs text-slate-400 mt-0.5">Instant IMPS / UPI Rails</div>
              </div>
            </div>
          </div>

          {/* Interactive Claim Viewport */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-slate-900 space-y-4">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-slate-500">Bora Enterprises Pvt Ltd sent you</div>
                <div className="text-3xl font-black text-slate-900">₹4,500.00</div>
                <div className="text-[11px] text-slate-400 font-mono">Ref: payout_link_99812a</div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-700 block">Choose where you want the money:</span>
                
                <button
                  onClick={() => setSelectedMethod('upi')}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                    selectedMethod === 'upi'
                      ? 'border-blue-600 bg-blue-50/60 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">UPI ID / VPA</div>
                      <div className="text-[10px] text-slate-500">Google Pay, PhonePe, Paytm, CRED</div>
                    </div>
                  </div>
                  {selectedMethod === 'upi' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </button>

                <button
                  onClick={() => setSelectedMethod('bank')}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                    selectedMethod === 'bank'
                      ? 'border-blue-600 bg-blue-50/60 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Building className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Bank Account + IFSC</div>
                      <div className="text-[10px] text-slate-500">Any Indian bank (HDFC, ICICI, SBI)</div>
                    </div>
                  </div>
                  {selectedMethod === 'bank' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </button>
              </div>

              {selectedMethod === 'upi' ? (
                <div className="space-y-1">
                  <input
                    type="text"
                    defaultValue="ajay@okaxis"
                    placeholder="Enter UPI ID (e.g. mobile@upi)"
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs font-mono focus:border-blue-500 focus:outline-none"
                  />
                  <div className="text-[10px] text-slate-400">Recipient name verified via NPCI directory.</div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <input
                    type="text"
                    placeholder="Bank Account Number"
                    defaultValue="50100412891234"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                  />
                  <input
                    type="text"
                    placeholder="IFSC Code (e.g. HDFC0001234)"
                    defaultValue="HDFC0001234"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono uppercase"
                  />
                </div>
              )}

              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center block transition-all shadow-md shadow-emerald-600/20"
              >
                Claim ₹4,500 Instantly &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">High Velocity Disbursements</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C2340]">
            The standard for customer refunds & rewards in India
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Eliminate customer support friction by letting customers choose where their money goes.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base">E-Commerce COD Refunds</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Refund cash-on-delivery returns in under 60 seconds without calling the customer to collect IFSC codes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base">Gaming & Fantasy Winnings</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instant payout links for game tournaments, trivia, and fantasy leagues with automatic TDS deduction on wins &gt; ₹10,000.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base">Insurance Claim Settlements</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Send claim payout links to policyholders. Funds land in their bank account instantly with an RBI audit log.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-base">Creator & Influencer Payouts</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Disburse brand deals, commissions, and creator fund payouts seamlessly across Instagram, YouTube, and affiliate networks.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-14 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Start sending BuimbPayX Payout Links today</h3>
            <p className="text-blue-100 text-sm mt-1">Zero integration needed. Generate links manually or via REST API.</p>
          </div>
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noreferrer"
            className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm shrink-0"
          >
            Create Payout Link &rarr;
          </a>
        </div>
      </section>
    </div>
  );
}
