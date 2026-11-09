'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  ShieldCheck,
  Zap,
  TrendingUp,
  Sliders,
  Smartphone,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  FileSpreadsheet,
} from 'lucide-react';

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:5173';

export default function CorporateCardsPage() {
  const [cardLimit, setCardLimit] = useState(250000);
  const [cardType, setCardType] = useState('virtual');

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0C2340] via-[#0C1938] to-[#0A142C] text-white pt-16 pb-24 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>BuimbPayX Corporate Credit Suite</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Corporate cards engineered for <span className="text-[#3395FF]">high-growth teams</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Issue collateral-free physical & virtual corporate cards in seconds. Set granular category spend limits, eliminate employee reimbursement delays, and auto-sync receipts to your ERP with zero forex markup.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noreferrer"
                className="bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:scale-[1.02] transition-all flex items-center gap-2 text-sm"
              >
                <span>Apply for Corporate Cards</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/pricing"
                className="bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all text-sm"
              >
                View Credit Terms & Limits
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-700/60 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">₹0</div>
                <div className="text-xs text-slate-400 mt-0.5">Annual Card Fee</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">45 Days</div>
                <div className="text-xs text-slate-400 mt-0.5">Interest-Free Credit</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">0%</div>
                <div className="text-xs text-slate-400 mt-0.5">Forex Mark-up on SaaS</div>
              </div>
            </div>
          </div>

          {/* Interactive Card Visualizer */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative">
              <div className="relative h-56 rounded-2xl bg-gradient-to-tr from-[#0F172A] via-[#1E293B] to-[#0B63E5] p-6 text-white shadow-2xl flex flex-col justify-between overflow-hidden border border-white/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
                <div className="flex items-center justify-between relative z-10">
                  <span className="font-mono text-xs tracking-widest text-slate-400 uppercase">BuimbPayX Corporate</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                    {cardType}
                  </span>
                </div>

                <div className="space-y-1 relative z-10">
                  <div className="font-mono text-lg sm:text-xl tracking-widest">
                    4242 •••• •••• 9842
                  </div>
                  <div className="text-[11px] text-slate-400">EXP 12/29 · CVV •••</div>
                </div>

                <div className="flex items-center justify-between relative z-10 pt-2 border-t border-white/10">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Cardholder</div>
                    <div className="text-xs font-bold tracking-wide">BORA ENTERPRISES PVT LTD</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Credit Limit</div>
                    <div className="text-sm font-black text-emerald-400">₹{(cardLimit).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>

              {/* Limit Slider Controls */}
              <div className="mt-6 space-y-4 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-semibold">Simulate Credit Limit:</span>
                  <span className="font-mono font-bold text-blue-400">₹{cardLimit.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="2000000"
                  step="25000"
                  value={cardLimit}
                  onChange={(e) => setCardLimit(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setCardType('virtual')}
                    className={`flex-1 py-2 rounded-lg font-bold transition-all text-xs ${
                      cardType === 'virtual'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    Virtual Card (Instant)
                  </button>
                  <button
                    onClick={() => setCardType('physical')}
                    className={`flex-1 py-2 rounded-lg font-bold transition-all text-xs ${
                      cardType === 'physical'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    Physical Metal Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Complete Spend Control</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C2340]">
            Everything your finance team needs to manage expenses
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Replace manual expense reports, lost paper receipts, and delayed reimbursements with automated corporate cards.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B63E5] flex items-center justify-center">
              <Sliders className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Dynamic Card Controls</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Lock cards to specific merchant categories like Cloud & SaaS (AWS, Google Cloud, Figma) or Travel & Dining. Lock cards by day or transaction count.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Merchant category whitelisting
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Per-employee recurring spend limits
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Single-use burnable virtual cards
              </li>
            </ul>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Automated Accounting Sync</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every card swipe automatically fetches GST invoices and categorizes expenses directly in Tally Prime, Zoho Books, QuickBooks, or SAP.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> WhatsApp & Slack receipt collection
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant GST Input Tax Credit (ITC) match
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-time webhook feed to your ERP
              </li>
            </ul>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Enterprise Security & Compliance</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Built on PCI-DSS Level 1 compliant vault with tokenized virtual cards. Real-time velocity rules block unauthorized or suspicious transactions instantly.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant freeze & unfreeze in one click
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 2-factor OTP verification for admins
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero liability on fraudulent charges
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-14 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Empower your team with BuimbPayX Corporate Cards</h3>
            <p className="text-blue-100 text-sm mt-1">Get approved in under 24 hours with seamless online KYC.</p>
          </div>
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noreferrer"
            className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm shrink-0"
          >
            Apply Now &rarr;
          </a>
        </div>
      </section>
    </div>
  );
}

