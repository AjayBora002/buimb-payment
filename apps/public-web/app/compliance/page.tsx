import React from 'react';
import { ShieldCheck, Landmark, Lock, FileCheck, CheckCircle2, Clock } from 'lucide-react';

export default function CompliancePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          Regulatory & Security Governance
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Compliance & Regulatory Architecture
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Payments in India are strictly regulated financial operations. BuimbPay is architected from day one to comply with Reserve Bank of India (RBI) guidelines, banking escrow mandates, and PCI-DSS standards.
        </p>
      </div>

      {/* Primary Pillars */}
      <div className="space-y-8">
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Landmark className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">1. Reserve Bank of India (RBI) PA Framework</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Under the Payment and Settlement Systems Act, 2007 (PSSA), entities operating payment aggregation in India must obtain formal authorization from the Reserve Bank of India. The regulations ensure customer fund protection, mandatory escrow account management, and strict merchant due diligence (MDD).
          </p>
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-400">
            <strong>Current Operating Status:</strong> BuimbPay is operating in development sandbox mode. Live payment processing remains programmatically blocked until all regulatory licenses and banking authorizations are finalized.
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">2. Bank Escrow Accounts & Fund Segregation</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            In accordance with RBI regulations, non-bank payment aggregators must never hold merchant funds in internal corporate bank accounts. All settlement funds must flow through a designated Escrow Account opened with a scheduled commercial bank.
          </p>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Settlement balances are held solely for customer refunds and merchant payouts
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Zero commingling of platform operating capital with merchant transactions
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Daily automated bank reconciliation against core accounting ledger
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">3. PCI-DSS Compliance & Card Data Security</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            BuimbPay enforces a strict zero-cardholder-data-storage architecture. Platform databases never store raw PAN (Primary Account Numbers) or CVV codes. All card processing leverages network tokenisation as mandated by the RBI Tokenisation Guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}
