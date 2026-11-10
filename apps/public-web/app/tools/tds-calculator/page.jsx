'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function TdsCalculatorPage() {
  const [invoiceAmount, setInvoiceAmount] = useState('50000');
  const [section, setSection] = useState('194J_tech');
  const [panAvailable, setPanAvailable] = useState(true);

  const sections = {
    '194C_ind': { name: '194C - Contractor (Individual/HUF)', rate: 1.0 },
    '194C_oth': { name: '194C - Contractor (Company/Firm)', rate: 2.0 },
    '194J_tech': { name: '194J - Professional / Technical Services', rate: 2.0 },
    '194J_prof': { name: '194J - Professional Fee (Other)', rate: 10.0 },
    '194I_plant': { name: '194I - Rent on Plant & Machinery', rate: 2.0 },
    '194I_land': { name: '194I - Rent on Land/Building', rate: 10.0 },
    '194H': { name: '194H - Commission / Brokerage', rate: 5.0 },
  };

  const amount = parseFloat(invoiceAmount) || 0;
  const standardRate = sections[section]?.rate || 2.0;
  const effectiveRate = panAvailable ? standardRate : 20.0;
  const tdsAmount = (amount * effectiveRate) / 100;
  const netPayable = amount - tdsAmount;

  return (
    <div className="flex flex-col gap-12 py-12 px-6 max-w-7xl mx-auto font-sans">
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
          <Calculator className="w-3.5 h-3.5" />
          Free Tax Compliance Tool
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0C2340] tracking-tight">
          Online TDS & Tax Payment Calculator
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Compute accurate Tax Deducted at Source (TDS) under FY 2026-27 guidelines across sections 194C, 194J, 194I, and 194H with net vendor disbursals.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-xl">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Gross Invoice Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 font-bold">₹</span>
              <input
                type="number"
                value={invoiceAmount}
                onChange={(e) => setInvoiceAmount(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold text-xl focus:outline-none focus:border-blue-600"
                placeholder="50000"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              TDS Section & Service Type
            </label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold text-sm focus:outline-none focus:border-blue-600"
            >
              {Object.entries(sections).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.name} ({item.rate}%)
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <div className="text-xs font-bold text-slate-800">Vendor PAN Available</div>
              <div className="text-[11px] text-slate-500">Without PAN, standard 20% higher TDS applies (Section 206AA)</div>
            </div>
            <input
              type="checkbox"
              checked={panAvailable}
              onChange={(e) => setPanAvailable(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="lg:col-span-6 bg-gradient-to-br from-[#0C2340] to-[#0A1A30] text-white border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">TDS Computation Breakdown</span>
            <span className="text-xs font-bold text-blue-400 font-mono">Rate: {effectiveRate}%</span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Gross Invoice Amount:</span>
              <span className="font-mono font-bold text-lg">₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-amber-400 font-semibold">TDS to be Deducted:</span>
              <span className="font-mono font-bold text-lg text-amber-400">-₹{tdsAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
              <div>
                <span className="text-xs text-slate-400 block font-bold uppercase">Net Payable to Vendor</span>
                <span className="text-[11px] text-emerald-400 font-medium">Instant 24x7 Bank Disbursal</span>
              </div>
              <span className="text-3xl font-black font-mono text-emerald-400">
                ₹{netPayable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Automate TDS withholding and Challan 281 filing via BuimbPay Vendor Payments.</span>
            </div>
            <Link
              href="/vendor-payments"
              className="w-full py-3 rounded-xl bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold text-center block text-sm shadow-md transition-colors"
            >
              Automate Vendor Payments & TDS &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
