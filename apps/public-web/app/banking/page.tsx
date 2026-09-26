import React from 'react';
import Link from 'next/link';
import {
  Building2, ArrowRight, CheckCircle2, CreditCard, Banknote, Globe,
  Shield, BarChart3, Zap, Clock, BadgeCheck, ArrowUpRight, Settings,
} from 'lucide-react';

const PRODUCTS = [
  {
    id: 'current-account',
    title: 'BuimbPayX Current Account',
    subtitle: 'API-first business banking',
    desc: 'Zero-balance business account with API-driven payouts, sub-accounts for each business vertical, auto-sweep to FD, and a full transaction audit trail.',
    features: ['Zero balance required', 'IMPS/NEFT/RTGS via API', 'Sub-account management', 'Auto-sweep to FD', 'Team-level permissions', '4% interest on idle balance'],
    icon: Building2,
    color: 'indigo',
    badge: 'Most Popular',
  },
  {
    id: 'vendor-payments',
    title: 'Vendor Payments',
    subtitle: 'AP automation at scale',
    desc: 'Automate your entire accounts payable workflow. Upload bulk vendor lists, auto-deduct TDS, reconcile GST Input Credit, and get ISO 20022 compliant payment files.',
    features: ['Bulk payout (10K+ at once)', 'Auto TDS deduction (194C/194J)', 'GST ITC reconciliation', 'Vendor self-onboarding portal', 'GSTR-2A auto-match', 'CA-approval workflows'],
    icon: ArrowUpRight,
    color: 'purple',
    badge: null,
  },
  {
    id: 'payouts',
    title: 'Payouts & Payout Links',
    subtitle: 'Disburse at scale, 24×7',
    desc: 'Send money to 100+ destinations — bank accounts, UPI, wallets, cards — via a single API. Payout Links let recipients choose their preferred settlement method.',
    features: ['Bank / UPI / Wallet / Card', '₹0 per payout (bank transfer)', 'Payout Links (recipient choice)', '24×7 IMPS availability', 'GST-compliant fee deduction', 'Real-time status webhooks'],
    icon: Banknote,
    color: 'emerald',
    badge: null,
  },
  {
    id: 'corporate-cards',
    title: 'Corporate Cards',
    subtitle: 'Collateral-free team spending',
    desc: 'Issue virtual and physical Visa cards to your team instantly. Set spend limits per category, block and unblock cards in real time, and auto-reconcile with accounting.',
    features: ['Virtual + Physical cards', 'Per-employee spend limits', 'Category-based controls', 'Real-time expense alerts', 'Accounting software sync', 'Automated GST credit'],
    icon: CreditCard,
    color: 'blue',
    badge: 'New',
  },
  {
    id: 'escrow',
    title: 'Escrow+ Account',
    subtitle: 'Regulated trust for marketplaces',
    desc: 'RBI-compliant tripartite escrow for real estate, marketplaces, and B2B. Hold buyer funds securely and release to sellers only on milestone or delivery completion.',
    features: ['RBI PA-regulated nodal', 'Marketplace split payments', 'Milestone-based release', 'Real estate RERA compliance', 'Dispute escalation engine', 'Full audit trail'],
    icon: Shield,
    color: 'rose',
    badge: null,
  },
  {
    id: 'forex',
    title: 'Forex & FDI',
    subtitle: 'International capital flows',
    desc: 'Receive foreign investment, salary, or revenue in USD, EUR, GBP and more. Competitive exchange rates with same-day FIRA documentation for RBI compliance.',
    features: ['Inward remittance (SWIFT/SEPA)', 'Competitive forex rates', 'Same-day FIRA', 'FDI reporting automation', 'FCRA donations support', 'Multi-currency ledger'],
    icon: Globe,
    color: 'cyan',
    badge: null,
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400', badge: 'bg-indigo-500/20 text-indigo-300' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-300' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-300' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-300' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300' },
};

export default function BankingPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/8 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-semibold mb-6">
            <Building2 className="w-3.5 h-3.5" /> BuimbPayX · Banking+
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-tight mb-6 max-w-4xl mx-auto">
            Your payments platform.<br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Now with full banking.
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            BuimbPayX is the business banking layer on top of BuimbPay. Current accounts, corporate cards, vendor automation, escrow, forex — all under one API.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="http://localhost:5173" target="_blank" rel="noreferrer"
              className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all">
              Open Current Account <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/contact" className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold transition-all">
              Talk to Banking Expert
            </Link>
          </div>
          <div className="flex flex-wrap gap-5 mt-8 text-xs text-slate-400 justify-center">
            {['Zero balance requirement', 'RBI Authorised', 'API-first', 'Instant KYC'].map(f => (
              <span key={f} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />{f}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="border-y border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '₹2L Cr+', label: 'Payouts Processed', icon: Banknote },
            { value: '5,00,000+', label: 'Active Accounts', icon: Building2 },
            { value: '<2 min', label: 'Account Opening', icon: Zap },
            { value: '24×7', label: 'Instant Transfers', icon: Clock },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="space-y-1">
              <Icon className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
              <div className="text-3xl font-black text-white">{value}</div>
              <div className="text-xs text-slate-400">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 py-20 space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white mb-3">Complete business banking suite</h2>
          <p className="text-slate-400">Every financial product your business needs, all API-accessible from day one.</p>
        </div>
        {PRODUCTS.map(({ id, title, subtitle, desc, features, icon: Icon, color, badge }) => {
          const c = colorMap[color];
          return (
            <div key={id} id={id} className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${c.text}`} />
                    </div>
                    {badge && <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${c.badge}`}>{badge}</span>}
                  </div>
                  <h3 className="text-xl font-black text-white mb-1">{title}</h3>
                  <div className={`text-xs font-semibold ${c.text} mb-3`}>{subtitle}</div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">{desc}</p>
                  <a href="http://localhost:5173" target="_blank" rel="noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-semibold ${c.text} hover:opacity-80 transition-opacity`}>
                    Get Started <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {features.map(f => (
                    <div key={f} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${c.text} mt-0.5 flex-shrink-0`} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 py-20 text-center">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <BadgeCheck className="w-12 h-12 text-indigo-400 mx-auto" />
          <h2 className="text-4xl font-black text-white">Open your BuimbPayX account in 2 minutes</h2>
          <p className="text-slate-400">Video KYC · Zero balance · Instant activation · RBI Authorised</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="http://localhost:5173" target="_blank" rel="noreferrer"
              className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/30">
              Open Account Now <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/contact" className="px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold transition-all hover:bg-slate-800">
              Schedule Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
