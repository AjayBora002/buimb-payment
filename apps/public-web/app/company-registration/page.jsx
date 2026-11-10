'use client';
import React from 'react';
import Link from 'next/link';
import { Briefcase, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function CompanyRegistrationPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
          <Briefcase className="w-3.5 h-3.5" />
          Founder Services
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          Incorporate Your Business in Days
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Fast-track Private Limited, LLP, or One Person Company (OPC) incorporation with MCA filing, DIN, DSC, PAN, TAN, and an active BuimbPay Current Account.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="px-7 py-3.5 bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Start Company Registration</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">Private Limited (Pvt Ltd)</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            The gold standard for venture-funded startups. Limited liability, equity fundraising capability, and separate legal entity status.
          </p>
          <div className="text-xs text-blue-600 font-bold">Includes 2 DINs, Name Approval, MOA/AOA</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">Limited Liability Partnership (LLP)</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Ideal for agencies, consultancies, and family businesses looking for limited liability protection with lower annual compliance overhead.
          </p>
          <div className="text-xs text-emerald-600 font-bold">Includes DPIN, Partnership Deed Draft</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">Zero-Balance Current Account</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Instant digital provisioning of your business current account with partner scheduled banks the same day your CIN is approved.
          </p>
          <div className="text-xs text-purple-600 font-bold">₹0 Minimum Balance · Free Corporate Cards</div>
        </div>
      </section>
    </div>
  );
}
