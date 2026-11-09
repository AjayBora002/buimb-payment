'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Search,
  Building,
  Smartphone,
  ArrowRight,
  Sparkles,
  Zap,
  Lock,
  Code2,
} from 'lucide-react';

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:5173';

export default function BankVerificationPage() {
  const [testType, setTestType] = useState('bank');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedResult, setVerifiedResult] = useState(null);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedResult({
        accountStatus: 'ACTIVE',
        beneficiaryName: 'AJAY BORA',
        bankName: 'HDFC BANK LIMITED',
        branch: 'KORAMANGALA 4TH BLOCK',
        ifsc: 'HDFC0000053',
        fuzzyScore: 98,
        utr: 'UTR2026110998124501',
      });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0C2340] via-[#0C1938] to-[#0A142C] text-white pt-16 pb-24 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant Bank Account & UPI ID Verification</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Verify bank accounts in real-time with <span className="text-[#3395FF]">₹1 Penny Drop</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Verify customer and vendor bank accounts before initiating payouts. Instant ₹1 penny drop and penny-less reverse penny drop validate beneficiary name, IFSC code, and active account status via NPCI & RBI IMPS rails.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noreferrer"
                className="bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:scale-[1.02] transition-all flex items-center gap-2 text-sm"
              >
                <span>Try Verification API</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/docs"
                className="bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all text-sm"
              >
                Read Verification Docs
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-700/60 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">&lt; 1.2s</div>
                <div className="text-xs text-slate-400 mt-0.5">Verification Latency</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">99.8%</div>
                <div className="text-xs text-slate-400 mt-0.5">NPCI Rail Uptime</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">Fuzzy Match</div>
                <div className="text-xs text-slate-400 mt-0.5">AI Name Scoring</div>
              </div>
            </div>
          </div>

          {/* Live Simulator Widget */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-slate-900 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Penny Drop Sandbox</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">IMPS Rail</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => { setTestType('bank'); setVerifiedResult(null); }}
                  className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all ${
                    testType === 'bank' ? 'bg-[#0B63E5] text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Bank Account + IFSC
                </button>
                <button
                  onClick={() => { setTestType('vpa'); setVerifiedResult(null); }}
                  className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all ${
                    testType === 'vpa' ? 'bg-[#0B63E5] text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  UPI VPA / ID
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {testType === 'bank' ? (
                  <>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">Account Number</label>
                      <input
                        type="text"
                        defaultValue="50100412891234"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">IFSC Code</label>
                      <input
                        type="text"
                        defaultValue="HDFC0000053"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono uppercase text-xs"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">UPI ID (VPA)</label>
                    <input
                      type="text"
                      defaultValue="ajay@okhdfcbank"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-xs"
                    />
                  </div>
                )}

                <button
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 mt-2"
                >
                  {isVerifying ? (
                    <span>Querying NPCI Switch…</span>
                  ) : (
                    <>
                      <Search className="w-3.5 h-3.5" />
                      <span>Execute ₹1 Penny Drop Verification</span>
                    </>
                  )}
                </button>
              </div>

              {/* Verification Output */}
              {verifiedResult && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Account Verified & Active
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-900 font-bold text-[10px]">
                      {verifiedResult.fuzzyScore}% Match
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-700 text-[11px]">
                    <div><strong>Registered Name:</strong> {verifiedResult.beneficiaryName}</div>
                    <div><strong>Bank:</strong> {verifiedResult.bankName} ({verifiedResult.branch})</div>
                    <div><strong>IMPS Reference UTR:</strong> <span className="font-mono">{verifiedResult.utr}</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Verification Capabilities */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Multi-Rail Verification</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C2340]">
            Four ways to verify bank credentials in India
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Cover every customer onboarding and payout validation scenario with BuimbPay's API suite.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base">₹1 Penny Drop (IMPS)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Deposit ₹1 to the destination bank account and receive the legal account holder's name registered in the bank's core banking system (CBS).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base">UPI VPA Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zero-cost NPCI directory lookup that validates if a UPI ID (e.g. mobile@paytm) exists and returns the NPCI-registered customer name.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base">Reverse Penny Drop</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zero-cost user authentication where the customer approves a ₹1 collect request or scans a QR code, auto-fetching their verified bank A/C.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-base">Fuzzy Name Match</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              AI string scoring that handles abbreviations, phonetic spelling differences, and middle-name variations between PAN, Aadhaar, and Bank CBS.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-14 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Eliminate payout bounce rates with Bank Verification</h3>
            <p className="text-emerald-100 text-sm mt-1">Integrate our REST API with 3 lines of code. Get 100 free sandbox calls.</p>
          </div>
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noreferrer"
            className="bg-white text-emerald-800 hover:bg-emerald-50 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm shrink-0"
          >
            Start Verifying Now &rarr;
          </a>
        </div>
      </section>
    </div>
  );
}
