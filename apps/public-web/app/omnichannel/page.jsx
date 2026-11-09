import Link from 'next/link';
import { CheckCircle, ArrowRight, Globe, Shield, Zap, TrendingUp, Smartphone, Store, Monitor, BarChart3, RefreshCw, Users } from 'lucide-react';

export const metadata = {
  title: 'Omnichannel Payments – Web, App & Store | BuimbPay',
  description: 'One unified payment platform for online (web + app) and offline (POS + soundbox) channels. Unified dashboard, single reconciliation, consistent checkout experience across all touchpoints.',
};

const CHANNELS = [
  { icon: Monitor, label: 'Website', desc: 'Customisable checkout, payment button, and hosted pages', color: 'blue' },
  { icon: Smartphone, label: 'Mobile App', desc: 'iOS & Android SDKs with native UPI intent flow', color: 'violet' },
  { icon: Store, label: 'Physical Store', desc: 'Smart POS terminals + BuimbPay Soundbox for QR + tap-to-pay', color: 'teal' },
  { icon: Globe, label: 'WhatsApp / Social', desc: 'Payment links sent via WhatsApp, SMS, or email', color: 'green' },
];

const FEATURES = [
  { icon: BarChart3, title: 'Unified Dashboard', desc: 'All transactions — online and offline — in one analytics view. No more separate portals.', color: 'blue' },
  { icon: RefreshCw, title: 'Single Reconciliation', desc: 'One settlement report for web, app, and POS. Cuts accounting effort by 60%.', color: 'violet' },
  { icon: Users, title: 'Customer 360°', desc: 'Recognise returning customers across channels. Build loyalty programs on unified data.', color: 'green' },
  { icon: Zap, title: 'Consistent Checkout', desc: 'Same BuimbPay-branded checkout on all channels reduces customer confusion and boosts trust.', color: 'amber' },
  { icon: Shield, title: 'Centralised Risk & Fraud', desc: 'Cross-channel fraud detection. Flag suspicious patterns across web and POS simultaneously.', color: 'rose' },
  { icon: TrendingUp, title: 'Cross-channel Analytics', desc: 'Compare conversion rates, ATV, and payment method split across web vs app vs store.', color: 'teal' },
];

const colorMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', hover: 'group-hover:bg-blue-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', hover: 'group-hover:bg-amber-600' },
  green: { bg: 'bg-emerald-50', text: 'text-emerald-600', hover: 'group-hover:bg-emerald-600' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-600', hover: 'group-hover:bg-violet-600' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', hover: 'group-hover:bg-rose-600' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', hover: 'group-hover:bg-teal-600' },
};

export default function OmnichannelPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0C1938] text-white pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-purple-900/40 border border-purple-700/50 text-purple-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Zap className="w-3.5 h-3.5" /> All-in-One Payments — NEW
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl mb-5">
            One platform.<br />
            <span className="text-purple-400">Every channel.</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-8 leading-relaxed">
            BuimbPay Omnichannel unifies your web, app, and physical store payments under a single API, single dashboard, and single settlement report. No fragmented data. No separate reconciliations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-7 py-3.5 rounded-lg transition-colors text-sm shadow-lg">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-200 font-semibold px-7 py-3.5 rounded-lg transition-colors text-sm">
              Request Demo
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
            {['Web + App + POS', 'Single API', 'Unified reconciliation', '100+ payment modes'].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-purple-400" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">All your payment channels. Unified.</h2>
          <p className="text-slate-500 text-center mb-10">One BuimbPay integration covers every touchpoint where your customers pay</p>
          <div className="grid md:grid-cols-4 gap-5">
            {CHANNELS.map(({ icon: Icon, label, desc, color }) => {
              const c = colorMap[color];
              return (
                <div key={label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow group">
                  <div className={`w-12 h-12 rounded-2xl ${c.bg} ${c.text} ${c.hover} group-hover:text-white flex items-center justify-center mx-auto mb-4 transition-colors`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm">{label}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Omnichannel superpowers</h2>
          <p className="text-slate-500 text-center mb-10">The business intelligence you get when all channels speak to each other</p>
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

      {/* Architecture diagram */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">How it's architected</h2>
          <p className="text-slate-500 text-center mb-10">One API layer connecting all channels to the same payment engine</p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            {/* Visual flow */}
            <div className="grid grid-cols-3 gap-4 text-center text-sm mb-6">
              {['Website', 'Mobile App', 'POS Terminal'].map(s => (
                <div key={s} className="bg-slate-50 rounded-xl p-3 font-semibold text-slate-700 text-xs">{s}</div>
              ))}
            </div>
            <div className="text-center text-slate-400 text-sm mb-4">↓ BuimbPay Universal API ↓</div>
            <div className="bg-purple-600 text-white rounded-xl p-4 text-center font-bold mb-4">
              BuimbPay Payment Engine
              <div className="text-xs font-normal text-purple-200 mt-1">Routing · Risk · Settlement · Analytics</div>
            </div>
            <div className="text-center text-slate-400 text-sm mb-4">↓ Single reconciliation ↓</div>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              {['Bank Settlement', 'Analytics Dashboard', 'Accounting Export'].map(s => (
                <div key={s} className="bg-emerald-50 rounded-xl p-3 font-semibold text-emerald-700 text-xs">{s}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-700 to-indigo-800 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-4">Unify your payments today</h2>
          <p className="text-purple-100 mb-8">One platform for every channel your customers use. Start free, scale without limits.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white text-purple-700 hover:bg-purple-50 font-bold px-8 py-3.5 rounded-lg transition-colors shadow-lg">
              Get Started Free
            </Link>
            <Link href="/payment-gateway" className="border border-purple-400 hover:border-white text-white font-semibold px-8 py-3.5 rounded-lg transition-colors">
              See Payment Gateway
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

