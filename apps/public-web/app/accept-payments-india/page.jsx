import Link from 'next/link';
import { CheckCircle, ArrowRight, Globe, Shield, Zap, TrendingUp, Smartphone, Building2, Users, Lock } from 'lucide-react';

export const metadata = {
  title: 'Accept Payments from India – Inbound UPI & INR Collection | BuimbPay',
  description: 'Allow global customers to pay in INR via UPI, net banking, and Indian cards. Seamless inbound payment collection for businesses selling into India.',
};

const FEATURES = [
  { icon: Smartphone, title: 'UPI for Global Merchants', desc: 'Let your international customers pay using UPI — the world\'s largest real-time payment network with 300M+ users.', color: 'green' },
  { icon: Globe, title: 'Localised Checkout', desc: 'Display prices in INR with auto-currency detection. Indian customers pay in their local currency.', color: 'blue' },
  { icon: Zap, title: 'Instant INR Collection', desc: 'Payments credited to your Indian bank account in real-time via UPI or within T+1 for card payments.', color: 'amber' },
  { icon: Shield, title: 'RBI Compliant', desc: 'All inbound collections are structured to comply with RBI\'s payment aggregator guidelines and FEMA regulations.', color: 'violet' },
  { icon: Users, title: 'India-first UX', desc: 'OTP-based authentication, Hindi/regional language support, and India-optimised checkout reduce drop-offs by 30%.', color: 'teal' },
  { icon: TrendingUp, title: 'Smart Routing', desc: 'Payments routed to the highest-success bank/UPI handle combination based on real-time issuer uptime.', color: 'rose' },
];

const colorMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', hover: 'group-hover:bg-blue-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', hover: 'group-hover:bg-amber-600' },
  green: { bg: 'bg-emerald-50', text: 'text-emerald-600', hover: 'group-hover:bg-emerald-600' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-600', hover: 'group-hover:bg-violet-600' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', hover: 'group-hover:bg-rose-600' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', hover: 'group-hover:bg-teal-600' },
};

export default function AcceptPaymentsIndiaPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0C1938] text-white pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-700/50 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="text-sm">🇮🇳</span> Accept Payments from India — NEW
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl mb-5">
            Sell to India's<br />
            <span className="text-[#2563EB]">700M internet users</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-8 leading-relaxed">
            Your overseas business, Indian customers. BuimbPay lets global merchants accept UPI, net banking, and Indian cards seamlessly — with an India-first checkout experience that maximises conversions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup" className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-lg transition-colors text-sm shadow-lg">
              Start Collecting INR <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-200 font-semibold px-7 py-3.5 rounded-lg transition-colors text-sm">
              Talk to India Sales Team
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
            {['UPI support', 'INR collection', 'India-first UX', 'Real-time credit'].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '₹20L Cr', label: 'Monthly UPI volume in India', sub: 'FY 2025-26' },
              { val: '700M+', label: 'Indian internet users', sub: 'Growing 10% YoY' },
              { val: '300M+', label: 'Active UPI users', sub: 'As of Jan 2026' },
              { val: '30%', label: 'Higher conversion', sub: 'with India-first UX' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="text-2xl font-black text-blue-600 mb-1">{s.val}</div>
                <div className="text-xs font-semibold text-slate-700">{s.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Everything you need to sell into India</h2>
          <p className="text-slate-500 text-center mb-10">India-optimised payment infrastructure for global businesses</p>
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

      {/* Payment modes */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Indian payment methods supported</h2>
          <p className="text-slate-500 text-center mb-10">Your Indian customers can pay the way they prefer</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { method: 'UPI', note: 'GPay, PhonePe, BHIM, Paytm', icon: '⚡' },
              { method: 'Debit Cards', note: 'Visa, Mastercard, RuPay', icon: '💳' },
              { method: 'Credit Cards', note: 'All major issuers, EMI', icon: '💎' },
              { method: 'Net Banking', note: '50+ Indian banks', icon: '🏦' },
              { method: 'Wallets', note: 'Paytm, MobiKwik, Freecharge', icon: '👛' },
              { method: 'BNPL', note: 'LazyPay, Simpl, ZestMoney', icon: '🛒' },
              { method: 'UPI Credit', note: 'RuPay Credit on UPI', icon: '📱' },
              { method: 'EMI', note: 'No-cost EMI, 3–24 months', icon: '📅' },
            ].map(m => (
              <div key={m.method} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">{m.icon}</div>
                <div className="font-bold text-slate-900 text-sm">{m.method}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{m.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-700 to-indigo-800 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-4">India is ready. Are you?</h2>
          <p className="text-blue-100 mb-8">Start collecting INR from Indian customers in minutes. No local entity required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-lg transition-colors shadow-lg">
              Create Free Account
            </Link>
            <Link href="/international" className="border border-blue-400 hover:border-white text-white font-semibold px-8 py-3.5 rounded-lg transition-colors">
              All International Options
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

