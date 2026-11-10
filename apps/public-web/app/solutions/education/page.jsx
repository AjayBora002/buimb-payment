'use client';
import React from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function EducationSolutionPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-16 font-sans">
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
          <GraduationCap className="w-3.5 h-3.5" />
          Industry Solution · Education &amp; EdTech
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#0C2340] tracking-tight">
          BuimbPay for Education &amp; Institutions
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Streamline tuition fee collections, student fee schedules, examination payments, and No-Cost EMI financing for schools, universities, and coaching institutes.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="px-7 py-3.5 bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>Collect Education Fees</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">Personalized Student Payment Links</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Auto-generate custom fee links carrying student enrollment numbers, semester details, and fee breakdown via SMS and WhatsApp.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">Education Fee EMI</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Offer parents flexible 3 to 12 month No-Cost EMI across major credit and debit cards, ensuring high admission enrollment conversions.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0C2340]">Automated Receipt Issuance</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Instantly dispatch formal fee receipts with digital signatures, school letterheads, and Section 80C tax deduction certificates.
          </p>
        </div>
      </section>
    </div>
  );
}
