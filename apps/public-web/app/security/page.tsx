import React from 'react';
import { ShieldCheck, Lock, Key, Server, Cpu, CheckCircle2, AlertOctagon } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          Enterprise Defense-in-Depth
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Security & Cryptographic Architecture
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          BuimbPay is built on a zero-trust model designed to protect financial transactions, customer data, and banking integrations against modern threat vectors.
        </p>
      </div>

      {/* Primary Security Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Zero PAN Storage Architecture</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            In compliance with RBI Card-on-File (CoF) Tokenisation guidelines and PCI-DSS Level 1 specifications, BuimbPay servers never store, log, or transmit raw 16-digit card numbers or CVVs. All transactions use network tokens issued by Visa, Mastercard, and RuPay.
          </p>
          <div className="pt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            PCI-DSS Scope Minimalised
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Envelope Encryption & KMS</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Merchant credentials, bank account details, and webhook secrets are encrypted at rest using AES-256-GCM authenticated encryption. Data keys are protected under dedicated Hardware Security Modules (Cloud KMS / HSM).
          </p>
          <div className="pt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Envelope Key Hierarchy (MEK / DEK)
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Cryptographic Audit Trails</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every transaction, refund, dispute, and state change produces an immutable audit log entry chained together with SHA-256 cryptographic hashes. Tampering with any historical record invalidates the entire subsequent verification chain.
          </p>
          <div className="pt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Immutable Merkle Chain
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">HMAC Webhook Signatures</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All webhook event payloads delivered to merchants include an <code className="text-amber-300">X-BuimbPay-Signature</code> header generated via HMAC-SHA256 with timestamp validation to prevent replay attacks.
          </p>
          <div className="pt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Replay-resistant HMAC-SHA256
          </div>
        </div>
      </div>

      {/* Sandbox Notice */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/30 flex items-start gap-4">
        <AlertOctagon className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">Development Sandbox Operating Policy</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            The platform is presently operating in simulated sandbox mode. Production payment rails, live merchant boarding, and real money movement will remain disabled until independent third-party PCI-DSS ROC assessment and RBI PA authorization are granted.
          </p>
        </div>
      </div>
    </div>
  );
}
