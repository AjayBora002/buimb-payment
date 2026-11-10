'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, ShieldCheck } from 'lucide-react';

export default function EbitdaCalculatorPage() {
  const [revenue, setRevenue] = useState('1000000');
  const [cogs, setCogs] = useState('400000');
  const [operatingExpenses, setOperatingExpenses] = useState('250000');

  const rev = parseFloat(revenue) || 0;
  const cost = parseFloat(cogs) || 0;
  const opex = parseFloat(operatingExpenses) || 0;

  const grossProfit = rev - cost;
  const ebitda = grossProfit - opex;
  const ebitdaMargin = rev > 0 ? (ebitda / rev) * 100 : 0;
  const grossMargin = rev > 0 ? (grossProfit / rev) * 100 : 0;

  return (
    <div className="flex flex-col gap-12 py-12 px-6 max-w-7xl mx-auto font-sans">
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700">
          <Calculator className="w-3.5 h-3.5" />
          Enterprise Profitability Metric
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0C2340] tracking-tight">
          EBITDA & Profit Margin Calculator
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Compute Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA) and operating cash margins for your company.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-xl">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Total Revenue / Gross Sales (₹)
            </label>
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold text-xl focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Cost of Goods Sold (COGS) (₹)
            </label>
            <input
              type="number"
              value={cogs}
              onChange={(e) => setCogs(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold text-xl focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Operating Expenses (OPEX - Salaries, Rent, Marketing) (₹)
            </label>
            <input
              type="number"
              value={operatingExpenses}
              onChange={(e) => setOperatingExpenses(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold text-xl focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        <div className="lg:col-span-6 bg-gradient-to-br from-[#0C2340] to-[#0A1A30] text-white border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Operating EBITDA</span>
            <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 mt-2">
              ₹{ebitda.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-blue-300 font-bold mt-1">
              EBITDA Margin: {ebitdaMargin.toFixed(1)}% of Revenue
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Gross Profit:</span>
              <span className="font-mono font-bold text-white">₹{grossProfit.toLocaleString('en-IN', { minimumFractionDigits: 2 })} ({grossMargin.toFixed(1)}%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Operating Overhead:</span>
              <span className="font-mono font-bold text-rose-400">-₹{opex.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <Link
              href="/banking"
              className="w-full py-3 rounded-xl bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold text-center block text-sm shadow-md transition-colors"
            >
              Optimize Working Capital with BuimbPayX &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
