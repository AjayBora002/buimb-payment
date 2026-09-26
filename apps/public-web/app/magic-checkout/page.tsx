'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Zap, ArrowRight, CheckCircle2, TrendingUp, Clock,
  ShoppingCart, Users, BarChart3, Shield, Smartphone,
  CreditCard, RefreshCw, Globe, Star,
} from 'lucide-react';

const STATS = [
  { value: '~5x', label: 'Conversion Improvement', sub: 'vs standard checkout' },
  { value: '23s', label: 'Avg Checkout Time', sub: 'down from 3+ minutes' },
  { value: '60%', label: 'Address Fill Reduction', sub: 'with pre-populated data' },
  { value: '0', label: 'OTP Required', sub: 'for registered users' },
];

const FEATURES = [
  { icon: Users, title: 'Saved Customer Network', desc: '15Cr+ Indian shoppers with pre-saved addresses, cards, and UPI handles. Auto-fill on checkout — no typing.' },
  { icon: Zap, title: 'OTP-less Authentication', desc: 'Returning customers authenticate with biometrics or device trust. Zero OTP friction on repeat purchases.' },
  { icon: ShoppingCart, title: 'Pre-filled Cart Recovery', desc: 'Abandoned cart recovery via SMS/WhatsApp with one-tap payment links. Auto-apply last used payment method.' },
  { icon: CreditCard, title: 'Saved Cards & UPI', desc: 'RBI-compliant tokenised card storage. Saved UPI handles with consent. One-tap repeat payment.' },
  { icon: Globe, title: 'Global Shopper Support', desc: 'International address forms, currency display, and payment method localisation for 50+ countries.' },
  { icon: BarChart3, title: 'Conversion Analytics', desc: 'Checkout funnel analytics — see where users drop off, by payment method, device, and bank.' },
  { icon: Shield, title: 'Frictionless 3DS2', desc: 'Risk-based authentication. Low-risk transactions skip 3DS. Highest success rate in industry.' },
  { icon: Smartphone, title: 'Mobile-first Design', desc: 'Touch-optimised checkout. Native UPI intent deep links to GPay, PhonePe. 95% mobile success rate.' },
];

const STEPS = [
  { num: '01', title: 'Customer clicks "Buy Now"', desc: 'BuimbPay detects returning customer by phone or email.' },
  { num: '02', title: 'Address auto-populated', desc: 'Saved address selected automatically. Customer confirms in one tap.' },
  { num: '03', title: 'Payment method pre-selected', desc: 'Last used UPI / card suggested. One tap to pay.' },
  { num: '04', title: 'Payment complete', desc: 'No OTP for trusted devices. Order placed in 23 seconds.' },
];

export default function MagicCheckoutPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/8 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-semibold mb-6">
              <Zap className="w-3.5 h-3.5" /> Magic Checkout · 1-Click
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-tight mb-6">
              The checkout that pays<br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                itself back in 90 days
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              Magic Checkout converts 5x more than standard checkout. Pre-filled addresses, saved payments, OTP-less auth — India's largest returning-customer network at your disposal.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="http://localhost:5173" target="_blank" rel="noreferrer"
                className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold flex items-center gap-2 shadow-lg shadow-amber-500/30 transition-all">
                Enable Magic Checkout <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/startup-perks" className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold transition-all">
                Free for 90 Days (Startup Perks)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="border-y border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label, sub }) => (
            <div key={label} className="text-center space-y-1">
              <div className="text-4xl font-black text-amber-400">{value}</div>
              <div className="font-bold text-white text-sm">{label}</div>
              <div className="text-xs text-slate-500">{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-black text-white mb-3">From click to paid in 23 seconds</h2>
          <p className="text-slate-400">The complete checkout flow, frictionless for every returning customer</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <button key={s.num} onClick={() => setStep(i)}
              className={`p-6 rounded-2xl border text-left transition-all ${step === i ? 'bg-amber-500/10 border-amber-500/40' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}>
              <div className={`text-3xl font-black mb-3 ${step === i ? 'text-amber-400' : 'text-slate-600'}`}>{s.num}</div>
              <h3 className="font-bold text-white text-sm mb-2">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </button>
          ))}
        </div>
        {/* Visual indicator */}
        <div className="mt-6 p-6 rounded-2xl bg-slate-900/50 border border-amber-500/20 text-center">
          <div className="text-amber-400 font-bold text-sm mb-1">Step {step + 1} Active</div>
          <div className="text-slate-300 text-sm">{STEPS[step].desc}</div>
          <div className="flex justify-center gap-2 mt-4">
            {STEPS.map((_, i) => (
              <button key={i} onClick={() => setStep(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === step ? 'bg-amber-400 w-6' : 'bg-slate-600'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-800 py-20 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-10 text-center">Built on India's largest checkout network</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/20 transition-all space-y-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="font-bold text-white text-sm">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white mb-3">Trusted by India's fastest-growing brands</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { brand: 'UrbanClap', quote: 'Magic Checkout reduced our checkout time from 4 min to 18 seconds. Our D2C revenue is up 34% since integration.', role: 'VP Growth', stars: 5 },
            { brand: 'Meesho', quote: "The auto-filled addresses eliminated the #1 cause of cart abandonment on mobile. Game-changer for our Tier-2 users.", role: 'Head of Engineering', stars: 5 },
            { brand: 'Bewakoof', quote: 'Returning customer conversion jumped from 21% to 67% in the first month. The network effect is real.', role: 'CTO', stars: 5 },
          ].map(({ brand, quote, role, stars }) => (
            <div key={brand} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex gap-0.5">{[...Array(stars)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}</div>
              <p className="text-sm text-slate-300 leading-relaxed italic">"{quote}"</p>
              <div>
                <div className="font-bold text-white text-sm">{brand}</div>
                <div className="text-xs text-slate-400">{role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 py-20 bg-gradient-to-br from-amber-950/30 to-transparent text-center">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Startup Perks: Free for 90 Days
          </div>
          <h2 className="text-4xl font-black text-white">Enable Magic Checkout today</h2>
          <p className="text-slate-400">Free for 90 days on Startup Perks. Standard rate: 0.35% per transaction after trial.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="http://localhost:5173" target="_blank" rel="noreferrer"
              className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold flex items-center gap-2 shadow-lg shadow-amber-500/30 transition-all">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/startup-perks" className="px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold transition-all hover:bg-slate-800">
              View Startup Perks
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
