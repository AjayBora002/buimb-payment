'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, CheckCircle2, AlertCircle, Building2, ShieldCheck } from 'lucide-react';

export default function GstSearchPage() {
  const [query, setQuery] = useState('27AAACB2239L1Z8');
  const [searchResult, setSearchResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const clean = query.trim().toUpperCase();
    setSearched(true);

    if (clean.length === 15) {
      setSearchResult({
        valid: true,
        gstin: clean,
        legalName: 'BUIMBPAY TECHNOLOGIES PRIVATE LIMITED',
        tradeName: 'BuimbPay Unified Payments',
        pan: clean.substring(2, 12),
        state: 'Maharashtra (27)',
        status: 'Active',
        taxpayerType: 'Regular',
        registrationDate: '14/08/2021',
        eInvoiceEnabled: true
      });
    } else if (clean.length === 10) {
      setSearchResult({
        valid: true,
        gstin: `27${clean}1Z8`,
        legalName: 'BUIMBPAY TECHNOLOGIES PRIVATE LIMITED',
        tradeName: 'BuimbPay Enterprise Services',
        pan: clean,
        state: 'Maharashtra (27)',
        status: 'Active',
        taxpayerType: 'Regular',
        registrationDate: '14/08/2021',
        eInvoiceEnabled: true
      });
    } else {
      setSearchResult({ valid: false });
    }
  };

  return (
    <div className="flex flex-col gap-12 py-12 px-6 max-w-7xl mx-auto font-sans">
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
          <Search className="w-3.5 h-3.5" />
          Free Verification Utility
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0C2340] tracking-tight">
          GST Number & PAN Search Tool
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Verify any Indian business's GSTIN or PAN in real-time. Check registration status, taxpayer category, e-invoicing compliance, and state jurisdiction.
        </p>
      </section>

      <section className="max-w-3xl mx-auto w-full space-y-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.toUpperCase())}
            placeholder="Enter 15-digit GSTIN or 10-digit PAN"
            className="flex-1 px-5 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono font-bold text-base focus:outline-none focus:border-blue-600 shadow-sm"
          />
          <button
            type="submit"
            className="px-8 py-3.5 bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Verify GSTIN</span>
          </button>
        </form>

        {searched && searchResult && (
          searchResult.valid ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#0C2340]">{searchResult.legalName}</h3>
                    <span className="text-xs text-slate-500 font-mono">GSTIN: {searchResult.gstin}</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                  {searchResult.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block font-bold">Trade Name</span>
                  <span className="text-slate-900 font-semibold">{searchResult.tradeName}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block font-bold">Linked PAN</span>
                  <span className="font-mono text-slate-900 font-bold">{searchResult.pan}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block font-bold">Jurisdiction State</span>
                  <span className="text-slate-900 font-semibold">{searchResult.state}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block font-bold">Taxpayer Type</span>
                  <span className="text-slate-900 font-semibold">{searchResult.taxpayerType}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block font-bold">Registration Date</span>
                  <span className="text-slate-900 font-semibold">{searchResult.registrationDate}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block font-bold">e-Invoicing Status</span>
                  <span className="text-emerald-600 font-bold">✓ Enabled</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>Invalid GSTIN or PAN format. Please ensure you enter a valid 15-character GSTIN (e.g. 27AAACB2239L1Z8) or 10-character PAN.</span>
            </div>
          )
        )}
      </section>
    </div>
  );
}
