'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  RefreshCw, ArrowRight, CheckCircle2, Shield, Zap, BarChart3,
  CreditCard, Users, Bell, Settings, FileText, Globe, Clock, TrendingUp,
} from 'lucide-react';

const PLAN_TYPES = [
  { label: 'Fixed', desc: '₹999/month — same amount every billing cycle', icon: '📅' },
  { label: 'Usage-based', desc: 'Charge based on units consumed (API calls, seats)', icon: '📊' },
  { label: 'Per-seat', desc: '₹299 per user per month — scales with team', icon: '👥' },
  { label: 'Tiered', desc: 'Volume discounts at 100, 500, 1000+ units', icon: '📈' },
  { label: 'Freemium', desc: 'Free plan with paid upgrade triggers', icon: '🆓' },
  { label: 'One-time + recurring', desc: 'Setup fee + monthly subscription', icon: '🔄' },
];

const FEATURES = [
  { icon: CreditCard, title: 'UPI AutoPay & eNACH', desc: "India's RBI-compliant recurring debit on UPI, NACH, and debit cards. Auto-handles mandate registration and renewal." },
  { icon: Bell, title: 'Smart Retry Engine', desc: 'Failed payment? Auto-retry with exponential backoff across 3 acquirers. Recover 40% of failed recurring revenue.' },
  { icon: Users, title: 'Dunning Management', desc: 'Multi-channel dunning — in-app, email, SMS. Automated escalation from soft to hard failure.' },
  { icon: Settings, title: 'Proration & Upgrades', desc: 'Instant plan upgrades with prorated billing. Downgrades at cycle end. Mid-cycle changes handled automatically.' },
  { icon: FileText, title: 'Tax-compliant Invoicing', desc: 'Auto-generate GST invoices for each billing cycle. Customer self-serve portal to download past invoices.' },
  { icon: Globe, title: 'Multi-currency Subscriptions', desc: 'Bill international customers in their local currency. Auto-forex with no rate risk for your business.' },
  { icon: Shield, title: 'Card Tokenisation (CoF)', desc: 'RBI-mandated card-on-file tokenisation. Never store raw card data. Compliant with NPCI & RBI guidelines.' },
  { icon: Zap, title: 'Webhook-driven Lifecycle', desc: 'subscription.created, charge.succeeded, payment.failed, subscription.cancelled — real-time events for your systems.' },
];

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/8 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-semibold mb-6">
              <RefreshCw className="w-3.5 h-3.5" /> Subscriptions & Mandates
            </div>
            <h1 className="text-5xl font-black tracking-tight leading-tight mb-6">
              Recurring revenue,<br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                on autopilot
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Build SaaS, D2C, or media subscriptions with India-native UPI AutoPay, eNACH mandates, and card-on-file. Handle upgrades, proration, and failed payments automatically.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="http://localhost:5173" target="_blank" rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all">
                Set Up Subscriptions <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/docs" className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all">
                API Reference
              </Link>
            </div>
            <div className="flex flex-wrap gap-5 mt-6 text-xs text-slate-400">
              {['RBI compliant', 'Auto-retry on failure', 'Multi-currency', 'GST invoicing'].map(f => (
                <span key={f} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />{f}</span>
              ))}
            </div>
          </div>

          {/* Metrics Card */}
          <div className="bg-[#070B16] rounded-3xl border border-slate-800 p-6 space-y-5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subscription Health Dashboard</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Active Subscriptions', value: '3,842', change: '+12%', color: 'text-emerald-400' },
                { label: 'MRR', value: '₹18.4L', change: '+8.3%', color: 'text-emerald-400' },
                { label: 'Churn Rate', value: '2.1%', change: '-0.4%', color: 'text-emerald-400' },
                { label: 'Recovery Rate', value: '41%', change: '+5%', color: 'text-emerald-400' },
              ].map(({ label, value, change, color }) => (
                <div key={label} className="bg-slate-900/80 rounded-xl p-4 border border-slate-800">
                  <div className="text-xs text-slate-500 mb-1">{label}</div>
                  <div className="text-xl font-black text-white">{value}</div>
                  <div className={`text-xs font-semibold ${color}`}>{change} this month</div>
                </div>
              ))}
            </div>
            {/* Recent events */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400 font-semibold">Recent Events</div>
              {[
                { event: 'charge.succeeded', sub: 'sub_AcmePro_3841', time: '2m ago', color: 'text-emerald-400' },
                { event: 'payment.failed → retrying', sub: 'sub_AcmeFree_92', time: '14m ago', color: 'text-amber-400' },
                { event: 'subscription.upgraded', sub: 'sub_AcmePro_3839', time: '1h ago', color: 'text-blue-400' },
              ].map(({ event, sub, time, color }) => (
                <div key={sub} className="flex items-center justify-between text-xs bg-slate-900/40 rounded-lg px-3 py-2">
                  <span className={`font-mono font-semibold ${color}`}>{event}</span>
                  <span className="text-slate-500 truncate mx-2">{sub}</span>
                  <span className="text-slate-600 flex-shrink-0">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Billing Models */}
      <section className="border-t border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">Every billing model. One platform.</h2>
            <p className="text-slate-400">From simple flat-rate to complex usage-based — handle it all without custom code.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PLAN_TYPES.map((p, i) => (
              <button key={p.label} onClick={() => setActiveTab(i)}
                className={`p-5 rounded-2xl border text-left transition-all ${activeTab === i ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}>
                <div className="text-2xl mb-2">{p.icon}</div>
                <div className="font-bold text-white text-sm mb-1">{p.label}</div>
                <div className="text-xs text-slate-400">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-800 py-20 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-10 text-center">Everything to retain and grow recurring revenue</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <h2 className="text-4xl font-black text-white">Start your subscription business</h2>
          <p className="text-slate-400">No per-subscription fees. Standard payment MDR applies. Cancel anytime.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="http://localhost:5173" target="_blank" rel="noreferrer"
              className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/30">
              Create Subscription Plan <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/docs" className="px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold transition-all hover:bg-slate-800">
              API Reference
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
