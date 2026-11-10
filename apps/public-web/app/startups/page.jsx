'use client';
import React from 'react';
import Link from 'next/link';
import { Rocket, ShieldCheck, ArrowRight, CheckCircle2, Sparkles, Building, Gift, Globe } from 'lucide-react';

export default function StartupsPage() {
  const perks = [
    { title: '₹1 Crore Zero-Fee UPI', desc: 'Process your first ₹1 Crore GMV on sovereign UPI rails with 0% platform deductions.', val: '₹2,00,000 Savings' },
    { title: 'AWS & GCP Cloud Credits', desc: 'Up to $100,000 in promotional cloud hosting and database credits from partner networks.', val: '$100K Value' },
    { title: 'Fast-Track DPIIT Incorporation', desc: 'Dedicated CA & CS desk for private limited incorporation, trademark, and 80-IAC tax exemption.', val: '48-Hour Turnaround' },
    { title: 'Curated VC Pitch Days', desc: 'Exclusive quarterly showcases to 80+ tier-1 angel syndicates and venture capital partners.', val: 'Direct Introductions' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <Rocket className="w-3.5 h-3.5 text-blue-600" /> BuimbPay for Founders &amp; Startups
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0c2340] tracking-tight">
            Scale from Day 1 with India's Sovereign Payment Rail
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            From incorporating your Pvt Ltd to processing millions in ARR, BuimbPay provides zero-fee UPI infrastructure, instant connected banking, and ₹50 Lakh+ in founder perks.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="http://localhost:5173"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <span>Apply for Startup Program</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/startup-perks"
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 shadow-xs transition-all"
            >
              Explore Perks Catalogue
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {perks.map((p, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    {p.val}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Instant activation upon KYC verification</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0b1526] rounded-2xl p-10 text-white flex flex-wrap items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-bold">Over 3,000+ Startups Scaled with BuimbPay</h3>
            <p className="text-xs text-slate-400">Join YC, Peak XV, and Blume-backed startups who switched to sovereign payment processing.</p>
          </div>
          <Link
            href="http://localhost:5173"
            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md"
          >
            <span>Claim Your Founder Credits</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
