'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Percent,
  RefreshCw,
  Building,
} from 'lucide-react';

export default function GstCalculatorPage() {
  const [baseAmount, setBaseAmount] = useState<string>('10000');
  const [gstRate, setGstRate] = useState<number>(18);
  const [calcType, setCalcType] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [gatewayFeeRate, setGatewayFeeRate] = useState<number>(2.0); // 2% standard

  const parsedAmount = parseFloat(baseAmount) || 0;

  // Calculation Logic
  let netAmount = 0;
  let gstAmount = 0;
  let grossAmount = 0;

  if (calcType === 'exclusive') {
    netAmount = parsedAmount;
    gstAmount = (netAmount * gstRate) / 100;
    grossAmount = netAmount + gstAmount;
  } else {
    grossAmount = parsedAmount;
    netAmount = grossAmount / (1 + gstRate / 100);
    gstAmount = grossAmount - netAmount;
  }

  // Payment Gateway Fee calculation on gross collection
  const mdrFee = (grossAmount * gatewayFeeRate) / 100;
  const mdrGst = (mdrFee * 18) / 100; // 18% GST on processing fee
  const totalMdrDeduction = mdrFee + mdrGst;
  const netSettlementToMerchant = grossAmount - totalMdrDeduction;

  return (
    <div className="flex flex-col gap-16 py-12 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          <Calculator className="w-3.5 h-3.5" />
          Free Business Tool
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          GST & Payment Gateway Fee Calculator
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Quickly compute CGST, SGST, IGST tax breakdowns and know your exact net bank settlement after standard payment gateway MDR deductions.
        </p>
      </section>

      {/* Calculator Main Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Card */}
        <div className="lg:col-span-6 bg-[#070B16] border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">₹</span>
              <input
                type="number"
                value={baseAmount}
                onChange={(e) => setBaseAmount(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold text-xl focus:outline-none focus:border-blue-500"
                placeholder="10000"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Calculation Type
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCalcType('exclusive')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                  calcType === 'exclusive'
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                GST Exclusive (+GST)
              </button>
              <button
                type="button"
                onClick={() => setCalcType('inclusive')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                  calcType === 'inclusive'
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                GST Inclusive (Inside Total)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              GST Tax Slab
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 12, 18, 28].map((slab) => (
                <button
                  key={slab}
                  type="button"
                  onClick={() => setGstRate(slab)}
                  className={`py-2 rounded-xl text-xs font-black border transition-all ${
                    gstRate === slab
                      ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {slab}%
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Payment Gateway Fee (MDR Rate)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={gatewayFeeRate}
                onChange={(e) => setGatewayFeeRate(parseFloat(e.target.value))}
                className="flex-1 accent-blue-600 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <span className="text-sm font-bold font-mono text-white bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                {gatewayFeeRate}%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              *Eligible startups get 0% platform fee for 90 days via BuimbPay Startup Perks.
            </p>
          </div>
        </div>

        {/* Breakdown Output Card */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#1E293B] to-[#0A0F1E] border border-blue-500/30 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-base font-bold text-white">Invoice Tax & Settlement Summary</h3>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Live Breakdown
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-white/5 text-slate-300">
              <span>Net Taxable Base Value:</span>
              <span className="font-mono text-white font-bold">₹{netAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-white/5 text-slate-300">
              <span>CGST ({(gstRate / 2).toFixed(1)}%):</span>
              <span className="font-mono text-white font-bold">₹{(gstAmount / 2).toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-white/5 text-slate-300">
              <span>SGST ({(gstRate / 2).toFixed(1)}%):</span>
              <span className="font-mono text-white font-bold">₹{(gstAmount / 2).toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-2.5 border-b border-white/10 text-white font-semibold">
              <span>Total Invoice Amount (Gross):</span>
              <span className="font-mono text-lg font-extrabold text-blue-400">₹{grossAmount.toFixed(2)}</span>
            </div>

            <div className="pt-2 text-slate-400 space-y-1.5">
              <div className="flex justify-between">
                <span>Gateway MDR ({gatewayFeeRate}%):</span>
                <span className="font-mono text-slate-300">-₹{mdrFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>18% GST on Gateway Fee:</span>
                <span className="font-mono text-slate-300">-₹{mdrGst.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between mt-4">
              <div>
                <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block">
                  Net Merchant Payout (Credited to Bank)
                </span>
                <p className="text-2xl font-black text-white font-mono mt-0.5">
                  ₹{netSettlementToMerchant.toFixed(2)}
                </p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30"
            >
              Start Collecting with 0% MDR on BuimbPay
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
