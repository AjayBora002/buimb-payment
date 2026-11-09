'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Receipt,
  CheckCircle2,
  UploadCloud,
  FileCheck,
  Calculator,
  ArrowRight,
  Shield,
  Layers,
  Banknote,
  Clock,
  Sparkles,
} from 'lucide-react';

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:5173';

export default function VendorPaymentsPage() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0C2340] via-[#0C1938] to-[#0A142C] text-white pt-16 pb-24 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>BuimbPayX Accounts Payable Automation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Automate invoice processing & <span className="text-[#3395FF]">vendor payouts</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Capture invoices automatically via AI OCR, auto-calculate TDS (Section 194C, 194J), trigger multi-level maker-checker approvals, and disburse 24×7 vendor payouts in 1-click.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noreferrer"
                className="bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:scale-[1.02] transition-all flex items-center gap-2 text-sm"
              >
                <span>Automate Vendor Payments</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/tools/gst-calculator"
                className="bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all text-sm"
              >
                Calculate TDS & GST Input
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-700/60 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">99%</div>
                <div className="text-xs text-slate-400 mt-0.5">OCR Extraction Accuracy</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">10,000+</div>
                <div className="text-xs text-slate-400 mt-0.5">Bulk Invoices in 1 Batch</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">TDS & GSTR-2A Match</div>
              </div>
            </div>
          </div>

          {/* Interactive AP Flow Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-slate-900 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">AP Workflow Engine</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Ready to Pay</span>
              </div>

              {/* Sample Invoice Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Apex Tech Logistics LLP</div>
                    <div className="text-[11px] text-slate-500 font-mono">INV-2026-9812 · GSTIN: 29AABCU9603R1ZM</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">Verified</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Gross Amount</span>
                    <span className="font-bold text-slate-800">₹85,000</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-rose-500 block">TDS (194C @ 2%)</span>
                    <span className="font-bold text-rose-600">-₹1,700</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-600 block">Net Payout</span>
                    <span className="font-extrabold text-emerald-700">₹83,300</span>
                  </div>
                </div>
              </div>

              {/* Multi-tier Approval Status */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Finance Manager (Maker)</span>
                  </div>
                  <span className="text-[10px] font-bold">Approved</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Director / Signatory (Checker)</span>
                  </div>
                  <span className="text-[10px] font-bold">Approved</span>
                </div>
              </div>

              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold text-xs text-center block transition-all shadow-md"
              >
                Disburse ₹83,300 via 24×7 IMPS &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C2340]">
            From invoice upload to bank payout in 3 steps
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Say goodbye to endless Excel spreadsheets, manual NEFT uploads, and tax penalty risks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900">Upload or Forward Invoices</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Vendors can email invoices directly to your unique BuimbPayX inbox or you can bulk-upload PDFs/scans. Our AI extracts line items, GSTIN, and bank IFSC instantly.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900">Auto TDS & Compliance Check</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              BuimbPayX cross-references the invoice with the vendor's PAN to calculate exact TDS deductions (194C, 194J, 194Q) and validates GSTIN against the GST portal.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900">Maker-Checker Payout</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Designated approvers receive instant WhatsApp/Email alerts. Once approved, funds are transferred via IMPS/RTGS instantly with automated payment advice sent to the vendor.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white py-14 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Simplify accounts payable with BuimbPayX Vendor Payments</h3>
            <p className="text-blue-100 text-sm mt-1">Zero setup fees. Pay vendors 24×7 with automated tax compliance.</p>
          </div>
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noreferrer"
            className="bg-white text-indigo-700 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm shrink-0"
          >
            Get Started Now &rarr;
          </a>
        </div>
      </section>
    </div>
  );
}
