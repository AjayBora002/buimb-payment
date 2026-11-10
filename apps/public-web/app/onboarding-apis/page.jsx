'use client';
import React from 'react';
import Link from 'next/link';
import { Terminal, ShieldCheck, ArrowRight, Code, Key, CheckCircle2 } from 'lucide-react';

export default function OnboardingApisPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <Terminal className="w-3.5 h-3.5" /> Programmatic KYC &amp; Merchant Lifecycle
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0c2340] tracking-tight">
            Automated Onboarding APIs
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Create, verify, and activate sub-merchant accounts, link receiving UPI VPAs, and configure webhooks via automated RESTful APIs.
          </p>
        </div>

        {/* API Endpoint Showcase */}
        <div className="bg-[#0b1120] text-slate-100 rounded-2xl p-6 border border-slate-800 space-y-4 font-mono text-xs shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-emerald-400 font-bold">POST /api/v1/merchants/onboard</span>
            <span className="text-[11px] text-slate-400 font-sans">v1.4 Spec Compliant</span>
          </div>
          <pre className="text-blue-300 overflow-x-auto p-2 leading-relaxed">
{`curl -X POST https://api.buimbpay.com/api/v1/merchants/onboard \\
  -H "Authorization: Bearer bp_sec_master_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "businessName": "Acme Retail Store #01",
    "pan": "AAACB1234P",
    "receivingVpa": "acmeretail@icici",
    "webhookUrl": "https://api.acme.com/webhooks/buimbpay",
    "settlementCycle": "T0_INSTANT"
  }'`}
          </pre>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">01</div>
            <h3 className="font-bold text-sm text-slate-900">Instant PAN &amp; GSTIN Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Verify NSDL PAN active status and MCA incorporation records in 400ms.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">02</div>
            <h3 className="font-bold text-sm text-slate-900">Penny Drop Bank Validation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Disburse ₹1.00 automated test transfer to verify account beneficiary name before activation.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">03</div>
            <h3 className="font-bold text-sm text-slate-900">Automated Webhook Provisioning</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Generate distinct HMAC-SHA256 signing secrets per merchant and stream test events immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
