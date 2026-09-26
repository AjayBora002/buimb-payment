import React from 'react';
import { Scale, FileText, Landmark, UserCheck, AlertTriangle } from 'lucide-react';

export default function LegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12 text-xs">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          <Scale className="w-3.5 h-3.5" />
          Regulatory Disclosures & Policy Framework
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Legal & Regulatory Disclosures
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Statutory declarations, customer grievance redressal mechanism, and RBI Payment Aggregator operating framework.
        </p>
      </div>

      {/* 1. Regulatory Status */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Landmark className="w-4 h-4 text-blue-400" />
          1. RBI Payment Aggregator Operating Status
        </h2>
        <p className="text-slate-300 leading-relaxed">
          BuimbPay is built in accordance with the Guidelines on Regulation of Payment Aggregators and Payment Gateways issued by the Reserve Bank of India (RBI/DPSS/2019-20/174).
        </p>
        <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
          <strong>Sandbox Notice:</strong> BuimbPay is currently operated strictly in simulated test mode. No real money transmission, live banking settlements, or production merchant boarding takes place until final Certificate of Authorisation (CoA) is issued by the Reserve Bank of India under Section 7 of the Payment and Settlement Systems Act, 2007.
        </div>
      </section>

      {/* 2. Grievance Redressal Policy */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          2. Customer Grievance Redressal Mechanism
        </h2>
        <p className="text-slate-300 leading-relaxed">
          In line with RBI directives on customer dispute resolution, BuimbPay maintains a multi-tiered escalation matrix for merchant and end-consumer complaints:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="font-semibold text-white">Level 1: Customer Care</div>
            <div className="text-slate-400">Email: support@buimbpay.com</div>
            <div className="text-slate-400">Response SLA: Within 24 business hours</div>
          </div>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="font-semibold text-white">Level 2: Principal Nodal Officer</div>
            <div className="text-slate-400">Name: Grievance Officer, BuimbPay Operations</div>
            <div className="text-slate-400">Email: grievance@buimbpay.com</div>
            <div className="text-slate-400">Resolution SLA: Maximum 3 business days</div>
          </div>
        </div>
      </section>

      {/* 3. Escrow Account Framework */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-400" />
          3. Nodal Escrow Account Maintenance
        </h2>
        <p className="text-slate-300 leading-relaxed">
          All customer collections are credited directly into a non-interest-bearing Escrow Account maintained with a Scheduled Commercial Bank. Funds in the escrow account are ring-fenced and used solely for:
        </p>
        <ul className="list-disc list-inside text-slate-400 space-y-1 pl-2">
          <li>Settlement payouts to verified, onboarded merchants (T+1 / T+2 basis)</li>
          <li>Instant or standard reversals for customer refunds and chargeback adjustments</li>
          <li>Statutory tax deductions (GST, TDS) payable to government accounts</li>
          <li>MDR fee transfer to corporate operating account only upon successful transaction settlement</li>
        </ul>
      </section>

      {/* 4. Prohibited Businesses */}
      <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          4. Prohibited & High-Risk Merchant Categories
        </h2>
        <p className="text-slate-400 leading-relaxed">
          As part of Merchant Due Diligence (MDD) and Prevention of Money Laundering Act (PMLA) requirements, the platform programmatically restricts businesses involving unauthorized forex trading, gambling/betting, unregistered lottery, pyramid/Ponzi schemes, and prohibited pharmaceuticals.
        </p>
      </section>
    </div>
  );
}
