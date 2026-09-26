import React from 'react';
import Link from 'next/link';
import {
  Zap, ArrowRight, CheckCircle2, Clock, TrendingUp, Shield,
  Building2, CreditCard, Banknote, Globe, BarChart3, BadgeCheck,
} from 'lucide-react';

const SETTLEMENT_TYPES = [
  {
    type: 'T+0 (Instant)',
    icon: Zap,
    desc: 'Funds in your bank account within 15 minutes of payment success. Available 24×7 including bank holidays.',
    color: 'emerald',
    fee: '0.25% additional fee',
    ideal: 'E-commerce, D2C, travel',
  },
  {
    type: 'T+1 (Next Day)',
    icon: Clock,
    desc: 'Standard settlement. Next business day credit to your registered bank account. Batch processing at 8 PM.',
    color: 'blue',
    fee: 'Included in MDR',
    ideal: 'All business types',
  },
  {
    type: 'T+2 to T+5',
    icon: Building2,
    desc: 'Custom settlement cycles for industries with high chargeback risk. Configurable rolling reserve.',
    color: 'purple',
    fee: 'Custom pricing',
    ideal: 'Travel, high-ticket retail',
  },
];

const FEATURES = [
  { icon: TrendingUp, title: 'Daily Settlement Reports', desc: 'Gross collections, MDR deductions, GST on fees, refunds, chargebacks — all itemised in a single daily report.' },
  { icon: BarChart3, title: 'Net Settlement Reconciliation', desc: 'Auto-reconcile bank credits with our settlement file. Flag any discrepancies in real time.' },
  { icon: Building2, title: 'Multi-bank Settlement', desc: 'Credit different payment methods to different bank accounts. UPI to one bank, cards to another.' },
  { icon: Globe, title: 'Forex Settlement', desc: 'International payments settled in INR at competitive exchange rates with FIRA documentation.' },
  { icon: Shield, title: 'Escrow & Marketplace', desc: 'Hold funds in regulated escrow. Release to sub-merchants on delivery confirmation or milestones.' },
  { icon: BadgeCheck, title: 'RBI Nodal Compliance', desc: 'All funds pass through RBI-mandated nodal account. Full audit trail for compliance teams.' },
];

export default function InstantSettlementPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/8 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-semibold mb-6">
            <Zap className="w-3.5 h-3.5" /> Instant Settlement
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-tight mb-6 max-w-4xl mx-auto">
            Your money. Your bank.<br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              In 15 minutes.
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            Don't wait for T+1 settlement. With Instant Settlement, your UPI, card, and netbanking collections hit your bank account within 15 minutes — 24×7, 365 days.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="http://localhost:5173" target="_blank" rel="noreferrer"
              className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all">
              Enable Instant Settlement <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/contact" className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold transition-all">
              Talk to Sales
            </Link>
          </div>
          {/* Live counter */}
          <div className="mt-12 inline-flex items-center gap-3 bg-slate-900/60 border border-emerald-500/20 rounded-2xl px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-bold text-emerald-400">Last instant settlement:</span>
            </div>
            <span className="text-sm text-slate-300 font-mono">₹1,24,500 → HDFC Bank · 12s ago</span>
          </div>
        </div>
      </section>

      {/* Settlement Types */}
      <section className="border-t border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-10 text-center">Choose your settlement cycle</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SETTLEMENT_TYPES.map(({ type, icon: Icon, desc, color, fee, ideal }) => (
              <div key={type}
                className={`p-6 rounded-2xl border transition-all space-y-4 ${color === 'emerald' ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-slate-900/50 border-slate-800'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  color === 'emerald' ? 'bg-emerald-500/20' : color === 'blue' ? 'bg-blue-500/10' : 'bg-purple-500/10'
                }`}>
                  <Icon className={`w-5 h-5 ${color === 'emerald' ? 'text-emerald-400' : color === 'blue' ? 'text-blue-400' : 'text-purple-400'}`} />
                </div>
                <div>
                  <div className="font-black text-white text-lg">{type}</div>
                  {color === 'emerald' && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">RECOMMENDED</span>}
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-slate-500">Additional fee</span><span className="text-slate-300 font-semibold">{fee}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Ideal for</span><span className="text-slate-300 font-semibold">{ideal}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="border-t border-slate-800 py-20 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-12 text-center">How instant settlement works</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {[
              { step: 'Customer Pays', detail: 'UPI / Card / Net Banking', icon: CreditCard },
              { step: 'Payment Authorized', detail: 'Acquirer confirms in <3s', icon: BadgeCheck },
              { step: 'Nodal Debit', detail: 'RBI nodal → your account', icon: Banknote },
              { step: 'Bank Credit', detail: 'Within 15 minutes, 24×7', icon: Building2 },
            ].map(({ step, detail, icon: Icon }, i) => (
              <React.Fragment key={step}>
                <div className="flex-1 bg-[#070B16] rounded-2xl border border-slate-800 p-5 text-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="font-bold text-white text-sm">{step}</div>
                  <div className="text-xs text-slate-400">{detail}</div>
                </div>
                {i < 3 && <ArrowRight className="w-5 h-5 text-slate-600 flex-shrink-0 hidden md:block" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-10 text-center">Complete settlement management</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/20 transition-all space-y-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="font-bold text-white text-sm">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 py-20 text-center">
        <h2 className="text-4xl font-black text-white mb-4">Cash flow, accelerated.</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">Enable Instant Settlement from your dashboard settings. No paperwork. No calls.</p>
        <a href="http://localhost:5173" target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/30 transition-all">
          Enable Now <ArrowRight className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
}
