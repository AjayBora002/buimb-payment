'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  TrendingUp,
  Percent,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Building,
  CreditCard,
} from 'lucide-react';

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:5173';

export default function RoiCalculatorPage() {
  const [monthlyGmv, setMonthlyGmv] = useState(2500000); // 25 Lakhs
  const [upiPercentage, setUpiPercentage] = useState(65);
  const [competitorFeeRate, setCompetitorFeeRate] = useState(2.0); // 2.0%

  // Calculations
  const upiGmv = (monthlyGmv * upiPercentage) / 100;
  const cardGmv = monthlyGmv - upiGmv;

  // Competitor charges standard rate across everything
  const competitorMonthlyFee = (monthlyGmv * competitorFeeRate) / 100;

  // BuimbPay pricing: 0% on sovereign UPI, 1.85% on cards
  const buimbPayMonthlyFee = (cardGmv * 1.85) / 100;

  const monthlySavings = Math.max(0, competitorMonthlyFee - buimbPayMonthlyFee);
  const annualSavings = monthlySavings * 12;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0C2340] via-[#0C1938] to-[#0A142C] text-white pt-16 pb-20 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Fee Optimizer & ROI Calculator</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Calculate your <span className="text-emerald-400">Payment Gateway Savings</span>
          </h1>

          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            See how much your business saves every month by leveraging BuimbPay's 0% fee Sovereign UPI rails, AI Smart Routing, and competitive card interchange rates.
          </p>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 -mt-10 pb-20 relative z-20">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 grid lg:grid-cols-12 gap-8">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              <span>Input Your Transaction Volumes</span>
            </h2>

            {/* Slider 1: Monthly GMV */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Estimated Monthly Transaction Volume (GMV)</span>
                <span className="font-mono font-extrabold text-blue-600 text-sm">
                  ₹{monthlyGmv.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="50000000"
                step="100000"
                value={monthlyGmv}
                onChange={(e) => setMonthlyGmv(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>₹1 Lakh</span>
                <span>₹2.5 Crore</span>
                <span>₹5 Crore</span>
              </div>
            </div>

            {/* Slider 2: UPI Share % */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">UPI Share vs Cards / Netbanking</span>
                <span className="font-mono font-extrabold text-emerald-600 text-sm">
                  {upiPercentage}% UPI ({100 - upiPercentage}% Cards)
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="95"
                step="5"
                value={upiPercentage}
                onChange={(e) => setUpiPercentage(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>20% UPI</span>
                <span>65% (India Average)</span>
                <span>95% UPI</span>
              </div>
            </div>

            {/* Competitor Current MDR */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Current Payment Gateway Fee (Competitor)</span>
                <span className="font-mono font-extrabold text-rose-600 text-sm">
                  {competitorFeeRate.toFixed(2)}% + GST
                </span>
              </div>
              <input
                type="range"
                min="1.75"
                max="3.0"
                step="0.05"
                value={competitorFeeRate}
                onChange={(e) => setCompetitorFeeRate(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1.75%</span>
                <span>2.00% (Standard)</span>
                <span>3.00%</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-800">Why BuimbPay costs significantly less:</div>
              <p>• BuimbPay Sovereign UPI rails incur 0% gateway commission.</p>
              <p>• AI Smart Router automatically routes transactions to the acquiring bank with the lowest interchange tier.</p>
            </div>
          </div>

          {/* Results Summary Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#0C1938] text-white p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-xl border border-slate-800">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estimated Savings</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Calculated
                </span>
              </div>

              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Annual Net Savings</div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1">
                  ₹{Math.round(annualSavings).toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  (₹{Math.round(monthlySavings).toLocaleString('en-IN')} saved every month)
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Gateway Cost:</span>
                  <span className="font-mono font-bold text-rose-400">₹{Math.round(competitorMonthlyFee).toLocaleString('en-IN')}/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">BuimbPay Projected Cost:</span>
                  <span className="font-mono font-bold text-emerald-400">₹{Math.round(buimbPayMonthlyFee).toLocaleString('en-IN')}/mo</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800 font-bold">
                  <span className="text-slate-200">Fee Reduction:</span>
                  <span className="text-emerald-400">
                    {competitorMonthlyFee > 0 ? Math.round((monthlySavings / competitorMonthlyFee) * 100) : 0}% Cheaper
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold text-xs sm:text-sm text-center block transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02]"
              >
                Claim Your Savings Now &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

