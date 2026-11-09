'use client';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Globe, Shield, Zap, TrendingUp, DollarSign, Building2, RefreshCw, Lock } from 'lucide-react';

export const metadata = {
  title: 'International Bank Transfers – SWIFT / WIRE | BuimbPay',
  description: 'Receive international bank transfers in USD, GBP, EUR directly to your Indian bank account via SWIFT. No intermediary bank charges. Transparent FX rates for exporters.',
};

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', rate: '83.42' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', rate: '105.18' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', rate: '90.74' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', rate: '54.31' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', rate: '61.27' },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬', rate: '62.84' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', rate: '0.56' },
  { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪', rate: '22.71' },
];

const FEATURES = [
  { icon: Globe, title: 'SWIFT / Wire Transfers', desc: 'Dedicated SWIFT-enabled virtual accounts for receiving USD, GBP, EUR, AUD, CAD, SGD, JPY, AED.', color: 'blue' },
  { icon: TrendingUp, title: 'Live FX Rates', desc: 'Interbank-close FX conversion with spread as low as 0.5%. Lock rates with forward contracts.', color: 'green' },
  { icon: Zap, title: 'T+2 Settlement', desc: 'Funds converted and settled to your INR bank account within 2 business days of receipt.', color: 'amber' },
  { icon: Shield, title: 'FEMA Compliant', desc: 'All inward remittances are FEMA 1999 and RBI Master Direction compliant with auto FIRC generation.', color: 'violet' },
  { icon: Building2, title: 'Dedicated Virtual Accounts', desc: 'Unique account numbers per currency. Share with clients for clean reconciliation by sender.', color: 'teal' },
  { icon: RefreshCw, title: 'Auto Reconciliation', desc: 'Incoming SWIFT messages matched to your orders. Unmatched credits flagged for review in real-time.', color: 'rose' },
];

const colorMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', hover: 'group-hover:bg-blue-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', hover: 'group-hover:bg-amber-600' },
  green: { bg: 'bg-emerald-50', text: 'text-emerald-600', hover: 'group-hover:bg-emerald-600' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-600', hover: 'group-hover:bg-violet-600' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', hover: 'group-hover:bg-rose-600' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', hover: 'group-hover:bg-teal-600' },
};

export default function InternationalTransfersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0C1938] text-white pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-700/50 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Globe className="w-3.5 h-3.5" /> SWIFT / Wire Transfers
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl mb-5">
            Receive international<br />
            <span className="text-[#2563EB]">bank transfers directly</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-8 leading-relaxed">
            Get a dedicated SWIFT-enabled virtual account in USD, GBP, EUR and 5 more currencies. Your overseas clients send a bank wire — you receive INR in your account within T+2. No intermediary banks. No hidden charges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup" className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-lg transition-colors text-sm shadow-lg">
              Get Your SWIFT Account <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-200 font-semibold px-7 py-3.5 rounded-lg transition-colors text-sm">
              Talk to Forex Expert
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
            {['8 currencies', 'T+2 settlement', 'Auto FIRC', 'FEMA compliant'].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Live FX Rates */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Live FX Rates (indicative)</h2>
            <span className="text-xs text-slate-400">Updated every 15 minutes · 1 unit = INR</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CURRENCIES.map(c => (
              <div key={c.code} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{c.flag}</span>
                  <div>
                    <div className="font-black text-slate-900 text-sm">{c.code}</div>
                    <div className="text-[10px] text-slate-400">{c.name}</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-blue-600">₹{c.rate}</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">↑ 0.12% today</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Built for Indian exporters & freelancers</h2>
          <p className="text-slate-500 text-center mb-10">Receive international wires as easily as a domestic NEFT</p>
          <div className="grid md:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => {
              const c = colorMap[color];
              return (
                <div key={title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm group hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.text} ${c.hover} group-hover:text-white flex items-center justify-center mb-4 transition-colors`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1 text-sm">{title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">How SWIFT transfers work with BuimbPay</h2>
          <p className="text-slate-500 text-center mb-10">Simple 4-step process from invoice to INR credit</p>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { step: '01', title: 'Get Your SWIFT Details', desc: 'BuimbPay assigns a unique IBAN / account number per currency (USD, GBP, EUR, etc.).' },
              { step: '02', title: 'Share with Client', desc: 'Send your SWIFT account details on the invoice. Your client does a standard bank wire transfer.' },
              { step: '03', title: 'We Receive & Convert', desc: 'Funds arrive at our correspondent bank. We convert at live interbank FX rate (spread: 0.5–1%).' },
              { step: '04', title: 'INR Credited T+2', desc: 'INR settled to your Indian bank account within 2 working days. FIRC auto-generated for RBI compliance.' },
            ].map(s => (
              <div key={s.step} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-3">{s.step}</div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">{s.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-700 to-indigo-800 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-4">Start receiving international payments today</h2>
          <p className="text-blue-100 mb-8">Get your SWIFT virtual account in minutes. No hidden fees. Full FEMA compliance built in.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-lg transition-colors shadow-lg">
              Open Free Account
            </Link>
            <Link href="/international" className="border border-blue-400 hover:border-white text-white font-semibold px-8 py-3.5 rounded-lg transition-colors">
              See All International Options
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
