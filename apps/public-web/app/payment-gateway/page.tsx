'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  CreditCard, Zap, ShieldCheck, Globe, ArrowRight, CheckCircle2,
  Code2, Lock, RefreshCw, BarChart3, GitFork, Layers, Server,
  Smartphone, Building2, Clock, TrendingUp, AlertCircle, BadgeCheck,
} from 'lucide-react';

const PAYMENT_METHODS = [
  { label: 'UPI', items: ['Google Pay', 'PhonePe', 'Paytm', 'BHIM', 'Amazon Pay', 'WhatsApp Pay'], color: 'blue' },
  { label: 'Cards', items: ['Visa', 'Mastercard', 'RuPay', 'Amex', 'Diners', 'JCB'], color: 'indigo' },
  { label: 'Netbanking', items: ['SBI', 'HDFC', 'ICICI', 'Axis', '50+ banks'], color: 'purple' },
  { label: 'Wallets', items: ['Paytm', 'Mobikwik', 'Freecharge', 'Ola Money', 'Airtel'], color: 'emerald' },
  { label: 'Buy Now Pay Later', items: ['LazyPay', 'ZestMoney', 'Simpl', 'ePayLater', 'Flexmoney'], color: 'amber' },
  { label: 'International', items: ['PayPal', 'Apple Pay', 'Google Pay', '100+ currencies'], color: 'rose' },
];

const STATS = [
  { value: '₹8L Cr+', label: 'Processed Annually', icon: TrendingUp },
  { value: '99.99%', label: 'Uptime SLA', icon: Server },
  { value: '<120ms', label: 'API Response Time', icon: Zap },
  { value: '100+', label: 'Payment Methods', icon: CreditCard },
];

const FEATURES = [
  { icon: ShieldCheck, title: '3DS2 Authentication', desc: 'Frictionless flow for low-risk transactions. Step-up 3D Secure only when risk score demands. Reduces cart abandonment by 18%.' },
  { icon: GitFork, title: 'Smart Routing', desc: 'Route each transaction to the optimal acquirer based on card BIN, bank, method. Auto-failover prevents revenue loss from gateway downtime.' },
  { icon: RefreshCw, title: 'Retry Intelligence', desc: 'Automatic retry logic with intelligent delay and alternate acquirer selection for soft declines.' },
  { icon: Zap, title: 'Instant Settlement', desc: 'T+0 settlement with instant transfer to your registered bank account. No waiting until T+1.' },
  { icon: BarChart3, title: 'Real-time Analytics', desc: 'Live transaction monitoring, conversion funnel, BIN-level success rates, and revenue dashboards.' },
  { icon: Globe, title: 'Global Payment Rails', desc: 'Accept 100+ currencies. Automatic DCC for international cards. SWIFT & local rail settlements.' },
  { icon: Lock, title: 'Tokenisation (CoF)', desc: 'RBI-compliant card-on-file tokenisation. Secure recurring payments without storing PANs.' },
  { icon: Smartphone, title: 'Mobile SDKs', desc: 'Native iOS & Android SDKs with biometric OTP-less authentication. 2-minute integration.' },
  { icon: Code2, title: 'Drop-in Checkout', desc: 'Pre-built, themeable checkout UI. Zero custom CSS needed. PCI scope minimised to SAQ-A.' },
];

export default function PaymentGatewayPage() {
  const [activeMethod, setActiveMethod] = useState(0);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-24 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 font-semibold mb-6">
              <CreditCard className="w-3.5 h-3.5" /> Payment Gateway
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-tight mb-6">
              Accept payments on<br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                your website & app
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
              India's most reliable payment gateway. 100+ payment methods, 3DS2, smart routing, instant settlements — integrated in under 2 hours.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="http://localhost:5173" target="_blank" rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all">
                Start for Free <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/docs" className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all">
                View API Docs
              </Link>
            </div>
            <div className="flex flex-wrap gap-5 mt-8 text-xs text-slate-400">
              {['No setup fee', 'No annual fee', '0% platform fee for 90 days', 'Go live in 2 hours'].map(f => (
                <span key={f} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />{f}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="border-y border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center space-y-1">
              <Icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <div className="text-3xl font-black text-white">{value}</div>
              <div className="text-xs text-slate-400">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white mb-3">100+ Payment Methods. One Integration.</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Every payment method Indians love, in a single API call.</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
          {PAYMENT_METHODS.map((m, i) => (
            <button key={m.label} onClick={() => setActiveMethod(i)}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${activeMethod === i ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}>
              {m.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {PAYMENT_METHODS[activeMethod].items.map(item => (
            <div key={item} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-sm font-semibold text-slate-200 hover:border-blue-500/40 transition-all">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-black text-white mb-10 text-center">Built for maximum conversions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-all space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-bold text-white">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Code Preview */}
      <section className="border-t border-slate-800 bg-slate-950/60 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 font-semibold mb-4">
              <Code2 className="w-3.5 h-3.5" /> 5-Line Integration
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Integrate in minutes, not days</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">Our drop-in checkout handles all PCI compliance. You focus on building your product.</p>
            <Link href="/docs" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm">
              Read Integration Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-[#070B16] rounded-2xl border border-slate-800 p-6 font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-500 text-xs ml-2">checkout.js</span>
            </div>
            <pre className="text-xs leading-relaxed overflow-x-auto">
              <span className="text-slate-500">// Initialize BuimbPay Checkout</span>{'\n'}
              <span className="text-blue-400">const</span>{' '}<span className="text-white">rzp</span>{' = '}<span className="text-blue-400">new</span>{' '}<span className="text-emerald-400">BuimbPay</span>{'({\n'}
              {'  '}<span className="text-amber-300">key</span>{': '}<span className="text-green-400">"rzp_live_xxxx"</span>{',\n'}
              {'  '}<span className="text-amber-300">amount</span>{': '}<span className="text-purple-400">49900</span>{',\n'}
              {'  '}<span className="text-amber-300">currency</span>{': '}<span className="text-green-400">"INR"</span>{',\n'}
              {'  '}<span className="text-amber-300">name</span>{': '}<span className="text-green-400">"Acme Store"</span>{',\n'}
              {'  '}<span className="text-amber-300">handler</span>{': (res) => '}<span className="text-slate-400">verifyPayment(res)</span>{'\n'}
              {'});\n'}
              <span className="text-white">rzp</span>.<span className="text-blue-400">open</span>();
            </pre>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-slate-900 to-[#070B16] rounded-3xl border border-slate-800 p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-2">Bank-grade security, always on</h2>
            <p className="text-slate-400 text-sm">Every transaction protected by multiple layers of security & compliance</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: ShieldCheck, label: 'RBI Authorised PA', color: 'text-blue-400' },
              { icon: Lock, label: 'PCI-DSS Level 1', color: 'text-emerald-400' },
              { icon: BadgeCheck, label: 'ISO/IEC 27001', color: 'text-indigo-400' },
              { icon: AlertCircle, label: 'SOC2 Type II', color: 'text-purple-400' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="space-y-2">
                <Icon className={`w-8 h-8 ${color} mx-auto`} />
                <div className="text-sm font-bold text-white">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 py-20 text-center">
        <h2 className="text-4xl font-black text-white mb-4">Ready to accept payments?</h2>
        <p className="text-slate-400 mb-8">Join 8M+ businesses. Free for 90 days. No credit card required.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="http://localhost:5173" target="_blank" rel="noreferrer"
            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all">
            Create Free Account <ArrowRight className="w-4 h-4" />
          </a>
          <Link href="/contact" className="px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold transition-all hover:bg-slate-800">
            Talk to Sales
          </Link>
        </div>
      </section>
    </div>
  );
}
