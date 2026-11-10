'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Landmark, ShieldCheck, ArrowRight, CheckCircle2, Calculator, Receipt, Building } from 'lucide-react';

export default function TaxPaymentsPage() {
  const [taxType, setTaxType] = useState('challan281');
  const [assessmentYear, setAssessmentYear] = useState('2026-27');
  const [panTan, setPanTan] = useState('');
  const [taxAmount, setTaxAmount] = useState('45000');
  const [surcharge, setSurcharge] = useState('0');
  const [interest, setInterest] = useState('0');

  const total = (parseFloat(taxAmount) || 0) + (parseFloat(surcharge) || 0) + (parseFloat(interest) || 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <Landmark className="w-3.5 h-3.5" /> Direct Tax &amp; GST Challan Disbursal
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0c2340] tracking-tight">
            Automated Tax Payments &amp; Challans
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Pay Advance Tax, TDS (Challan 281), Self-Assessment Tax, and GST directly from your BuimbPay connected current accounts in under 30 seconds.
          </p>
        </div>

        {/* Interactive Tax Payment Console */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-blue-600" /> Challan Details
            </h2>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Tax Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'challan281', label: 'TDS (Challan 281)' },
                  { id: 'advance', label: 'Advance Tax (280)' },
                  { id: 'gst', label: 'GST PMT-06' }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTaxType(t.id)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                      taxType === t.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Assessment Year</label>
                <select
                  value={assessmentYear}
                  onChange={(e) => setAssessmentYear(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-medium"
                >
                  <option value="2026-27">2026-27 (Current)</option>
                  <option value="2025-26">2025-26</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">PAN / TAN Number</label>
                <input
                  type="text"
                  value={panTan}
                  onChange={(e) => setPanTan(e.target.value.toUpperCase())}
                  placeholder="e.g. BLRP12345A"
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-mono font-medium uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Base Tax (₹)</label>
                <input
                  type="number"
                  value={taxAmount}
                  onChange={(e) => setTaxAmount(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Surcharge (₹)</label>
                <input
                  type="number"
                  value={surcharge}
                  onChange={(e) => setSurcharge(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Interest / Fee (₹)</label>
                <input
                  type="number"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Challan Summary</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-600">Tax Type</span>
                  <span className="font-bold text-slate-900">{taxType.toUpperCase()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-600">Assessment Year</span>
                  <span className="font-bold text-slate-900">{assessmentYear}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-600">Base Tax Amount</span>
                  <span className="font-bold text-slate-900">₹{parseFloat(taxAmount || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1.5 pt-3">
                  <span className="text-sm font-black text-slate-900">Total Payable</span>
                  <span className="text-base font-black text-blue-600">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <a
                href="http://localhost:5173"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Authorize &amp; Pay via BuimbPayX</span> <ArrowRight className="w-4 h-4" />
              </a>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant BSR Code &amp; CIN generation via NSDL/TIN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
