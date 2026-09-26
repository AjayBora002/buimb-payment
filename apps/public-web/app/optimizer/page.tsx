'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  GitFork, ArrowRight, CheckCircle2, BarChart3, Zap, Shield,
  TrendingUp, RefreshCw, Settings, AlertCircle, Clock, Server,
} from 'lucide-react';

const GATEWAYS = [
  { name: 'BuimbPay Native', sr: '96.2%', volume: '₹4.2Cr', color: 'blue', active: true },
  { name: 'HDFC Bank', sr: '94.8%', volume: '₹1.8Cr', color: 'indigo', active: true },
  { name: 'ICICI Bank', sr: '95.1%', volume: '₹1.1Cr', color: 'purple', active: true },
  { name: 'Axis Bank', sr: '93.9%', volume: '₹0.7Cr', color: 'emerald', active: false },
];

const ROUTING_RULES = [
  { condition: 'Card BIN starts with 4', action: 'Route → HDFC Bank', priority: 1, status: 'active' },
  { condition: 'UPI transactions', action: 'Route → BuimbPay Native', priority: 2, status: 'active' },
  { condition: 'Amount > ₹10,000', action: 'Route → ICICI Bank', priority: 3, status: 'active' },
  { condition: 'HDFC failure', action: 'Fallback → BuimbPay Native', priority: 4, status: 'fallback' },
  { condition: 'International cards', action: 'Route → BuimbPay Native', priority: 5, status: 'active' },
];

const FEATURES = [
  { icon: GitFork, title: 'Rule-based Routing', desc: 'Route by card BIN, bank, amount, currency, device type. Define priority and fallback chains per rule.' },
  { icon: TrendingUp, title: 'Success Rate Optimisation', desc: 'ML-powered routing selects the gateway with the highest historical success rate for the exact BIN-bank combination.' },
  { icon: RefreshCw, title: 'Automatic Failover', desc: 'Real-time gateway health monitoring. Instant failover to secondary acquirer on timeout or 5xx errors. Zero manual intervention.' },
  { icon: BarChart3, title: 'Gateway Analytics', desc: 'Compare success rates, latency, and MDR across all connected gateways. Gateway-level revenue attribution.' },
  { icon: Settings, title: 'A/B Traffic Split', desc: 'Send 80% to primary, 20% to secondary. Test new gateway performance without risk. One-click rollback.' },
  { icon: Clock, title: 'Real-time Switching', desc: 'Switch routing rules live without code deployment. Changes propagate in <30 seconds via config push.' },
  { icon: Shield, title: 'Risk-based Routing', desc: 'Route high-risk transactions to gateways with stricter fraud controls. Low-risk to faster processing rails.' },
  { icon: Server, title: 'MDR Optimization', desc: 'Route each transaction to the acquirer with the lowest MDR for that card type. Reduce processing costs by up to 18%.' },
];

export default function OptimizerPage() {
  const [selectedRule, setSelectedRule] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/8 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-semibold mb-6">
              <GitFork className="w-3.5 h-3.5" /> Optimizer · Smart Routing
            </div>
            <h1 className="text-5xl font-black tracking-tight leading-tight mb-6">
              Route every payment to<br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                its best gateway
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Connect multiple acquirers. Define smart rules. Optimizer automatically routes each transaction for maximum success rate, minimum MDR, and zero downtime.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="http://localhost:5173" target="_blank" rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all">
                Configure Optimizer <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/docs" className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all">
                API Reference
              </Link>
            </div>
            <div className="flex flex-wrap gap-5 mt-6 text-xs text-slate-400">
              {['Zero-downtime routing', 'ML-powered BIN routing', 'Real-time failover', 'No code changes'].map(f => (
                <span key={f} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />{f}</span>
              ))}
            </div>
          </div>

          {/* Gateway Health Card */}
          <div className="bg-[#070B16] rounded-3xl border border-slate-800 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gateway Health Monitor</div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live
              </div>
            </div>
            <div className="space-y-3">
              {GATEWAYS.map(g => (
                <div key={g.name} className="bg-slate-900/60 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${g.active ? 'bg-emerald-400' : 'bg-slate-600'} ${g.active ? 'animate-pulse' : ''}`} />
                    <div>
                      <div className="text-sm font-semibold text-white">{g.name}</div>
                      <div className="text-xs text-slate-500">Vol: {g.volume} / 30d</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-black ${parseFloat(g.sr) >= 95 ? 'text-emerald-400' : 'text-amber-400'}`}>{g.sr}</div>
                    <div className="text-xs text-slate-500">Success Rate</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Overall stats */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-800">
              {[
                { label: 'Blended SR', value: '95.4%' },
                { label: 'MDR Saved', value: '14.2%' },
                { label: 'Failovers', value: '3 today' },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="text-base font-black text-white">{value}</div>
                  <div className="text-[10px] text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Routing Rules Builder */}
      <section className="border-t border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">Visual Rule Builder</h2>
            <p className="text-slate-400">Create routing rules without writing code. Click any rule to inspect it.</p>
          </div>
          <div className="bg-[#070B16] rounded-3xl border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="text-sm font-bold text-white">Routing Rules (Active)</div>
              <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all">
                + Add Rule
              </button>
            </div>
            <div className="divide-y divide-slate-800">
              {ROUTING_RULES.map((rule, i) => (
                <button key={i} onClick={() => setSelectedRule(selectedRule === i ? null : i)}
                  className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all ${selectedRule === i ? 'bg-indigo-500/5' : 'hover:bg-slate-900/40'}`}>
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {rule.priority}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">IF {rule.condition}</div>
                    <div className="text-xs text-slate-400">THEN {rule.action}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${rule.status === 'fallback' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {rule.status}
                  </span>
                  <AlertCircle className={`w-4 h-4 transition-transform ${selectedRule === i ? 'text-indigo-400 rotate-180' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-800 py-20 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-10 text-center">Intelligence at every routing decision</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/20 transition-all space-y-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-indigo-400" />
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
          <h2 className="text-4xl font-black text-white">Stop losing revenue to gateway failures</h2>
          <p className="text-slate-400">Optimizer is included in all BuimbPay plans. No additional fee.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="http://localhost:5173" target="_blank" rel="noreferrer"
              className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/30">
              Enable Optimizer <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/contact" className="px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold transition-all hover:bg-slate-800">
              Talk to an Engineer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
