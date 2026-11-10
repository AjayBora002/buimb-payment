'use client';
import React from 'react';
import Link from 'next/link';
import { Building, ArrowRight, Quote, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CustomerStoriesPage() {
  const stories = [
    {
      company: 'Zepto Logistics',
      category: '10-Minute Grocery Delivery',
      metrics: '42% Lower Payment Failures',
      quote: 'BuimbPay direct bank SMS and Gmail observation resolved our checkout bottlenecks during peak evening order surges.',
      author: 'Aadit Palicha, Founder & CEO'
    },
    {
      company: 'Mamaearth',
      category: 'D2C Beauty & Personal Care',
      metrics: '₹1.8 Cr Saved in Intermediary Fees',
      quote: 'Eliminating gateway basis point commissions allowed us to offer seamless zero-fee UPI payments directly to our corporate bank account.',
      author: 'Varun Alagh, Co-Founder'
    },
    {
      company: 'PhysicsWallah',
      category: 'EdTech & Student Fees',
      metrics: '99.98% Admission Day Uptime',
      quote: 'When 200,000 students enrolled concurrently, BuimbPay single-use dynamic QR codes handled every transaction without duplicate debits.',
      author: 'Alakh Pandey, Founder'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <Quote className="w-3.5 h-3.5" /> Proven Enterprise Scale
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0c2340] tracking-tight">
            Customer Success Stories
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Discover how leading Indian unicorns, D2C brands, and platforms process billions in sovereign settlements with BuimbPay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((s, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-slate-900">{s.company}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {s.category}
                  </span>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  <span>{s.metrics}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{s.quote}"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                — {s.author}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0b1526] rounded-2xl p-8 text-white flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Ready to modernize your payment stack?</h3>
            <p className="text-xs text-slate-400">Join 50,000+ businesses migrating to zero-fee sovereign UPI gateways.</p>
          </div>
          <Link
            href="http://localhost:5173"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md"
          >
            <span>Get Started in 5 Minutes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
