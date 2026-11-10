'use client';
import React from 'react';
import Link from 'next/link';
import { Landmark, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export default function BfsiSolutionPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
          <Landmark className="w-3.5 h-3.5" />
          Industry Solution · Banking &amp; Financial Services
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          BuimbPay for BFSI &amp; Fintechs
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Bank-grade infrastructure built for loan repayments, insurance premium collections, mutual fund SIP investments, and NBFC disbursement flows.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="px-7 py-3.5 bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Deploy BFSI Solution</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">NACH &amp; e-NACH Mandates</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Register automated recurring debit mandates via Netbanking and Aadhaar OTP for loan EMIs and wealth management SIPs.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">Instant Loan Disbursal</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Disburse approved credit lines and personal loans directly into verified borrower bank accounts 24x7 in under 15 seconds.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">Penny Drop Account Verification</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Verify beneficiary bank accounts and name match scores before executing high-value credit transfers, eliminating misdirected credits.
          </p>
        </div>
      </section>
    </div>
  );
}
