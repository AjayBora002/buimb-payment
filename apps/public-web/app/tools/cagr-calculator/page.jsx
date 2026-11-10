'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Calculator, ArrowRight } from 'lucide-react';

export default function CagrCalculatorPage() {
  const [initialValue, setInitialValue] = useState('100000');
  const [finalValue, setFinalValue] = useState('350000');
  const [years, setYears] = useState('3');

  const v0 = parseFloat(initialValue) || 1;
  const vn = parseFloat(finalValue) || 0;
  const n = parseFloat(years) || 1;

  const cagr = n > 0 && v0 > 0 ? (Math.pow(vn / v0, 1 / n) - 1) * 100 : 0;
  const absoluteGrowth = v0 > 0 ? ((vn - v0) / v0) * 100 : 0;

  return (
    <div className="flex flex-col gap-12 py-12 px-6 max-w-7xl mx-auto font-sans">
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
          <TrendingUp className="w-3.5 h-3.5" />
          Financial Growth Modeling
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0C2340] tracking-tight">
          Compound Annual Growth Rate (CAGR) Calculator
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Measure the annualized growth of your business revenue, investment portfolio, or merchant processing volume over multiple periods.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-xl">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Initial Value (₹)
            </label>
            <input
              type="number"
              value={initialValue}
              onChange={(e) => setInitialValue(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold text-xl focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Final / Current Value (₹)
            </label>
            <input
              type="number"
              value={finalValue}
              onChange={(e) => setFinalValue(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold text-xl focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Duration (Years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              min="0.1"
              step="0.5"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold text-xl focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        <div className="lg:col-span-6 bg-gradient-to-br from-[#0C2340] to-[#0A1A30] text-white border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Annualized Compounded Growth</span>
            <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 mt-2">
              {cagr.toFixed(2)}% <span className="text-sm font-normal text-slate-400">CAGR</span>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Absolute Return:</span>
              <span className="font-mono font-bold text-white">+{absoluteGrowth.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Net Value Created:</span>
              <span className="font-mono font-bold text-emerald-400">₹{(vn - v0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Compounding Period:</span>
              <span className="font-mono font-bold text-white">{n} Year(s)</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <Link
              href="/pricing"
              className="w-full py-3 rounded-xl bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold text-center block text-sm shadow-md transition-colors"
            >
              Scale Processing Volume with 0% Setup Fee &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
