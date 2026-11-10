'use client';
import React, { useState } from 'react';
import { Search, Building, CheckCircle2, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function GstSearchPanPage() {
  const [pan, setPan] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanPan = pan.trim().toUpperCase();
    if (cleanPan.length !== 10) {
      alert('Please enter a valid 10-character PAN');
      return;
    }

    setResult({
      pan: cleanPan,
      legalName: 'BuimbPay Technologies Private Limited',
      stateCount: 3,
      gstins: [
        { gstin: `29${cleanPan}1Z5`, state: 'Karnataka (29)', status: 'ACTIVE', type: 'Regular', centerJurisdiction: 'Bengaluru West' },
        { gstin: `27${cleanPan}1Z8`, state: 'Maharashtra (27)', status: 'ACTIVE', type: 'Regular', centerJurisdiction: 'Mumbai South' },
        { gstin: `07${cleanPan}1Z2`, state: 'Delhi (07)', status: 'ACTIVE', type: 'Regular', centerJurisdiction: 'New Delhi Ward 4' }
      ]
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <Search className="w-3.5 h-3.5" /> GST Portal Real-Time Registry
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0c2340] tracking-tight">
            GST Search by PAN
          </h1>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Discover all multi-state GSTIN registrations linked to any Permanent Account Number (PAN) across India.
          </p>
        </div>

        <form onSubmit={handleSearch} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <label className="text-xs font-bold text-slate-700 block">Enter 10-Digit PAN</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase())}
              placeholder="e.g. AAACB1234P"
              maxLength={10}
              className="flex-1 h-12 px-4 rounded-xl border border-slate-300 font-mono text-sm uppercase font-bold tracking-wider"
              required
            />
            <button
              type="submit"
              className="px-6 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 transition-all"
            >
              <span>Search GSTINs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {result && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">{result.legalName}</h3>
                <div className="text-xs text-slate-500 font-mono mt-0.5">PAN: {result.pan}</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                {result.stateCount} Active Registrations Found
              </span>
            </div>

            <div className="space-y-3">
              {result.gstins.map((g, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-black font-mono text-blue-600">{g.gstin}</div>
                    <div className="text-xs text-slate-600">{g.state} · {g.centerJurisdiction}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                      {g.status}
                    </span>
                    <Link
                      href={`/tools/gst-search?gstin=${g.gstin}`}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      View Details <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
