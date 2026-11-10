'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Building, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export default function BusinessDirectoryPage() {
  const [query, setQuery] = useState('');

  const businesses = [
    { name: 'BuimbPay Technologies Pvt Ltd', category: 'Fintech & Payment Aggregator', location: 'Bengaluru, Karnataka', gstin: '29AAACB1234P1Z5', verified: true },
    { name: 'Razorpay Software Pvt Ltd', category: 'Payment Infrastructure', location: 'Bengaluru, Karnataka', gstin: '29AABCR1234Q1Z1', verified: true },
    { name: 'Paytm Payments Services Ltd', category: 'UPI & Merchant Acquiring', location: 'Noida, Uttar Pradesh', gstin: '09AAECP1234R1Z3', verified: true },
    { name: 'PhonePe Internet Pvt Ltd', category: 'Consumer UPI & Soundbox', location: 'Bengaluru, Karnataka', gstin: '29AAGCP1234S1Z4', verified: true },
    { name: 'Cashfree Payments India Pvt Ltd', category: 'Payouts & Banking Rails', location: 'Bengaluru, Karnataka', gstin: '29AADCC1234T1Z6', verified: true }
  ];

  const filtered = businesses.filter(b => b.name.toLowerCase().includes(query.toLowerCase()) || b.category.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <Building className="w-3.5 h-3.5" /> India Corporate &amp; MSME Registry
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0c2340] tracking-tight">
            Verified Business Directory
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Explore and verify 500,000+ registered companies, GSTINs, and commercial merchants operating on Indian sovereign payment rails.
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search companies by name, business category, or GSTIN..."
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((b, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900">{b.name}</h3>
                  {b.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <span>{b.category}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{b.location}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 pt-1">
                  GSTIN: {b.gstin}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <Link href={`/tools/gst-search?gstin=${b.gstin}`} className="text-blue-600 font-bold hover:underline">
                  Inspect Tax Profile →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
