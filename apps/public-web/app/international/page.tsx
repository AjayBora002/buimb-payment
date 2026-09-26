'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Globe, ArrowRight, CheckCircle2, ShieldCheck, Zap, CreditCard,
  Building2, DollarSign, FileCheck, Layers, RefreshCw, Smartphone,
  Check, Lock, ExternalLink, ChevronRight
} from 'lucide-react';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', region: 'United States', fee: '2.9% + $0.30', payout: 'T+2 days', methods: ['Apple Pay', 'Google Pay', 'Visa/Mastercard', 'ACH'] },
  { code: 'EUR', name: 'Euro', symbol: '€', region: 'European Union', fee: '2.8% + €0.25', payout: 'T+2 days', methods: ['Apple Pay', 'SEPA', 'iDEAL', 'Klarna', 'Cards'] },
  { code: 'GBP', name: 'British Pound', symbol: '£', region: 'United Kingdom', fee: '2.8% + £0.20', payout: 'T+2 days', methods: ['Apple Pay', 'BACS Direct', 'Clearpay', 'Cards'] },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', region: 'Australia', fee: '2.9% + A$0.30', payout: 'T+3 days', methods: ['Apple Pay', 'Afterpay', 'Cards'] },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', region: 'Singapore', fee: '2.8% + S$0.30', payout: 'T+2 days', methods: ['Apple Pay', 'GrabPay', 'PayNow', 'Cards'] },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED', region: 'United Arab Emirates', fee: '3.0% + 1 AED', payout: 'T+3 days', methods: ['Apple Pay', 'Cards', 'Careem Pay'] },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', region: 'Canada', fee: '2.9% + C$0.30', payout: 'T+2 days', methods: ['Apple Pay', 'Interac', 'Cards'] },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', region: 'Japan', fee: '3.1%', payout: 'T+3 days', methods: ['Apple Pay', 'Konbini', 'Cards'] },
];

const COMPLIANCE_ITEMS = [
  {
    title: 'Digital FIRA Generation',
    desc: 'Foreign Inward Remittance Advice (FIRA) issued directly from authorized AD-1 partner banks within 48 hours for easy GST zero-rating & export audits.',
  },
  {
    title: 'RBI Master Directions Compliant',
    desc: 'Strictly aligned with RBI circulars for Online Payment Gateway Service Providers (OPGSP) and cross-border payment aggregators.',
  },
  {
    title: '3DS 2.0 & PSD2 SCA Ready',
    desc: 'Frictionless biometric authorization for European and global cardholders to reduce cart abandonment while maintaining zero fraud liability.',
  },
  {
    title: 'Automated EDPMS Filing Helpers',
    desc: 'Pre-formatted data sheets for export data processing and monitoring system filing with your chartered accountants.',
  },
];

export default function InternationalPaymentsPage() {
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [amount, setAmount] = useState<number>(100);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 font-semibold mb-6">
              <Globe className="w-3.5 h-3.5 text-blue-400" /> Cross-Border & Global Rails
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-6">
              Sell to 190+ countries.<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Settle directly in INR or USD.
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Enable global shoppers to pay with local credit cards, Apple Pay, Google Pay, and localized bank rails in 100+ currencies. Automated digital FIRA, instant forex conversion, and 0% cross-border hidden markups.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="http://localhost:5173"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
              >
                Activate International Payments <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/docs"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
              >
                View API Docs
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Automated Digital FIRA
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 1-Click Apple Pay & GPay
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100+ Local Currencies
              </span>
            </div>
          </div>

          {/* Interactive Currency Simulation Box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">
                  Live Currency Rail
                </span>
                <h3 className="text-lg font-bold text-white">Select Target Currency</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                ● Live Real-Time FX
              </span>
            </div>

            {/* Currency Pill Selector */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSelectedCurrency(c)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center border ${
                    selectedCurrency.code === c.code
                      ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span className="block">{c.code}</span>
                  <span className="text-[10px] font-normal opacity-80">{c.symbol}</span>
                </button>
              ))}
            </div>

            {/* Currency Detail Card */}
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Selected Country & Region</span>
                <span className="text-sm font-bold text-white">{selectedCurrency.region}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Processing Fee</span>
                <span className="text-sm font-bold text-blue-400">{selectedCurrency.fee}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Settlement Timeline</span>
                <span className="text-sm font-bold text-emerald-400">{selectedCurrency.payout} (INR Direct)</span>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-2">Supported Local Payment Methods:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedCurrency.methods.map((m) => (
                    <span
                      key={m}
                      className="px-2.5 py-1 rounded-lg text-[11px] bg-slate-900 border border-slate-800 text-slate-300 font-medium"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Conversion Preview */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-blue-500/20 flex items-center justify-between text-xs">
              <div className="text-slate-300">
                Customer pays: <strong className="text-white">{selectedCurrency.symbol}{amount}</strong>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">Net INR Credited (Est.)</span>
                <strong className="text-emerald-400 text-sm">
                  ₹{Math.round(amount * (selectedCurrency.code === 'USD' ? 86.5 : selectedCurrency.code === 'EUR' ? 94.2 : selectedCurrency.code === 'GBP' ? 110.1 : 58.4) * 0.971).toLocaleString('en-IN')}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Payment Methods Grid */}
      <section className="py-20 border-t border-slate-800 bg-[#070B16]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">Payment Channels</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 mb-4">
              Every international payment method your buyers trust
            </h2>
            <p className="text-slate-400 text-sm">
              Don’t let foreign buyers drop off at checkout. Present their preferred native currency and 1-touch mobile wallet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <CreditCard className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Global Credit & Debit Cards</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Visa, Mastercard, American Express, JCB, Diners Club, Discover, and China UnionPay with 3DS 2.0.
              </p>
              <span className="text-[11px] font-semibold text-blue-400">190+ Countries</span>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Apple Pay & Google Pay</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                1-tap biometric FaceID & TouchID authorization. Up to 3.5× higher conversion for iPhone & Mac users worldwide.
              </p>
              <span className="text-[11px] font-semibold text-indigo-400">Zero manual card entry</span>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Local Bank Transfers & Direct Debit</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                SEPA in Europe, ACH in the United States, BACS in the UK, and iDEAL in the Netherlands.
              </p>
              <span className="text-[11px] font-semibold text-emerald-400">Lowest interchange rates</span>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Global Buy Now Pay Later</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Offer flexible pay-in-4 installments via Klarna, Afterpay, and Clearpay to boost overseas average order value.
              </p>
              <span className="text-[11px] font-semibold text-purple-400">Up to 45% larger basket size</span>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & FIRA Pillar */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">Seamless Cross-Border Compliance</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 mb-6">
              RBI Compliance & Automated Digital FIRA
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Cross-border payments in India typically require tedious paperwork with banks. BuimbPay automates everything: Foreign Inward Remittance Advice (FIRA) certificates are generated digitally by our Authorized Dealer Category-1 (AD-1) banking partners and available for instant download in your dashboard.
            </p>

            <div className="space-y-4">
              {COMPLIANCE_ITEMS.map((item) => (
                <div key={item.title} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Code Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 font-mono text-xs shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-slate-400 text-[11px]">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                checkout-international.js
              </span>
              <span className="text-blue-400">Node.js SDK</span>
            </div>

            <pre className="text-slate-300 overflow-x-auto leading-relaxed">
{`// Create an International Payment Order in USD
const order = await buimbpay.orders.create({
  amount: 4900,         // $49.00 USD
  currency: 'USD',      // 100+ currencies supported
  receipt: 'inv_global_9821',
  customer: {
    name: 'Emily Davis',
    email: 'emily@california-ventures.com',
    country: 'US'
  },
  notes: {
    purpose_code: 'P0802', // Software export
    gst_treatment: 'EXPORT_WITHOUT_LUT'
  }
});

// Front-end initializes Magic Checkout with Apple Pay & USD
buimbpay.open({
  order_id: order.id,
  display_currency: 'USD',
  features: {
    apple_pay: true,
    local_rails: true
  }
});`}
            </pre>

            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-sans">
              <span>Ready-to-use drop-in SDK</span>
              <Link href="/docs" className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1">
                Explore SDKs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-20 border-t border-slate-800 bg-[#070B16]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Start expanding your global revenue today
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8">
            Enable international transactions with 1 click inside your merchant dashboard. Zero activation fees and paperless verification.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              Open Merchant Account <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
            >
              Contact Cross-Border Specialist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
