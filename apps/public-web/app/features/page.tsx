import React from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Link2,
  RefreshCw,
  Landmark,
  BookOpen,
  ShieldCheck,
  Zap,
  ArrowRight,
  QrCode,
  Building2,
  ArrowUpRight,
  Users,
  FileText,
  GitFork,
  Sparkles,
  Globe,
  Code2,
  CheckCircle2,
  Lock,
  Server,
  Banknote,
  Store,
  Volume2,
  Calculator,
  Layers,
  BadgeCheck,
  Briefcase,
} from 'lucide-react';

const PRODUCT_PILLARS = [
  {
    id: 'payments',
    icon: CreditCard,
    label: 'Payments',
    color: 'blue',
    headline: 'Accept every payment mode',
    sub: "India's most complete checkout stack — UPI, cards, netbanking, wallets, BNPL, EMI, and international payments in a single integration.",
    features: [
      { icon: CreditCard, title: 'Payment Gateway', desc: 'PCI-DSS Level 1 certified gateway with 3DS2 authentication and dynamic routing.' },
      { icon: Globe, title: 'International Payments', desc: 'Accept Visa, Mastercard, Amex, Apple Pay, Google Pay from 100+ countries at industry-low MDR.' },
      { icon: QrCode, title: 'Smart QR & BharatQR', desc: 'PhonePe-style dynamic QR with Soundbox audio alerts and Merchant Exchange.' },
      { icon: Link2, title: 'Payment Links & Pages', desc: 'Share branded payment URLs via WhatsApp, SMS, or Email. Custom expiry & partial payments.' },
      { icon: RefreshCw, title: 'Subscriptions & Mandates', desc: 'Automated billing with RBI e-mandate compliance, proration, and trial periods.' },
      { icon: Zap, title: 'Magic Checkout', desc: '1-click OTP-less checkout with pre-filled address and saved cards. 5x conversion uplift.' },
      { icon: GitFork, title: 'Optimizer (Smart Routing)', desc: 'Multi-gateway routing engine. Auto-failover across HDFC, ICICI, Axis with rule-based logic.' },
      { icon: FileText, title: 'Invoices & GST Billing', desc: 'Generate GST-compliant invoices with auto-calculations, payment tracking, and e-invoice support.' },
    ],
  },
  {
    id: 'settlements',
    icon: Zap,
    label: 'Instant Settlements',
    color: 'indigo',
    headline: '15-second on-demand payouts',
    sub: 'Stop waiting T+2 days for cash flow. Settle customer funds to your bank account in 15 seconds, 24x7x365.',
    features: [
      { icon: Zap, title: 'Instant Settlement Engine', desc: 'Disburse customer funds into your registered bank account in under 15 seconds.' },
      { icon: ArrowUpRight, title: 'On-Demand Payouts', desc: 'Trigger manual or scheduled batch payouts 24x7, including Sundays and bank holidays.' },
      { icon: Landmark, title: 'RBI Escrow Safety', desc: 'Tripartite nodal escrow account ensures zero commingling of platform and merchant capital.' },
      { icon: Calculator, title: 'Real-Time Fee Projection', desc: 'Transparent fee breakdown with zero hidden deductions and real-time net projections.' },
      { icon: BadgeCheck, title: 'Instant Penny-Drop Verification', desc: 'Validate beneficiary bank accounts and UPI handles automatically before disbursal.' },
      { icon: RefreshCw, title: 'Split Payments for Marketplaces', desc: 'Automatically split single customer orders across multiple vendors and platform fees.' },
    ],
  },
  {
    id: 'qr',
    icon: QrCode,
    label: 'Smart QR',
    color: 'purple',
    headline: 'PhonePe Merchant Exchange QR',
    sub: 'The most advanced offline payment terminal for Indian merchants — voice alerts, cash exchange, and multi-store management.',
    features: [
      { icon: QrCode, title: 'Dynamic QR Generator', desc: 'Generate per-transaction QRs with custom amount, order ID, and customer note.' },
      { icon: Volume2, title: 'Smart Soundbox', desc: 'Web Audio/Speech: "BuimbPay par ₹500 prapt hue" in Hindi & English on payment.' },
      { icon: Store, title: 'Terminal / Outlet Switcher', desc: 'Switch collecting accounts across counters, outlets, and sub-merchants instantly.' },
      { icon: Banknote, title: 'Cash @ POS (Merchant Exchange)', desc: 'Act as mini-ATM: customer scans, merchant hands cash, digital balance credited instantly.' },
      { icon: ArrowUpRight, title: 'B2B Merchant Settlement', desc: 'P2P balance transfer between registered merchants via UPI ID — zero fee.' },
      { icon: Zap, title: 'Instant UPI Settlement', desc: 'Real-time settlement to merchant bank account with QR-level analytics.' },
    ],
  },
  {
    id: 'optimizer',
    icon: GitFork,
    label: 'Optimizer',
    color: 'emerald',
    headline: 'AI multi-gateway routing & fallback',
    sub: 'Maximize transaction success rates up to 99.8%. Auto-route transactions across multiple payment rails dynamically.',
    features: [
      { icon: GitFork, title: 'Dynamic Smart Routing', desc: 'Route payments across HDFC, ICICI, Axis, and Razorpay based on live health.' },
      { icon: Zap, title: 'Real-Time Downtime Detector', desc: 'Monitors bank gateway latency and auto-switches routes before customers see failures.' },
      { icon: RefreshCw, title: 'Zero-Drop Auto Retry', desc: 'If primary gateway returns an error, silently retry on secondary route without asking for re-auth.' },
      { icon: Calculator, title: 'Lowest Cost Routing', desc: 'Automatically pick the acquirer offering the lowest MDR interchange for the payment mode.' },
      { icon: Layers, title: 'A/B Gateway Splitting', desc: 'Distribute volume dynamically (e.g. 70% Acquirer A, 30% Acquirer B) to meet bank quotas.' },
      { icon: ShieldCheck, title: 'Smart OTP Assist', desc: 'Boost checkout speed with native OTP detection and bank-page acceleration.' },
    ],
  },
  {
    id: 'risk',
    icon: ShieldCheck,
    label: 'Risk & Compliance',
    color: 'rose',
    headline: 'Enterprise-grade security & fraud prevention',
    sub: 'Proactive fraud detection, regulatory compliance, and an immutable audit ledger.',
    features: [
      { icon: ShieldCheck, title: 'AI Fraud Detection', desc: 'Real-time ML scoring on every transaction. Auto-block, step-up, and alert on anomalies.' },
      { icon: Lock, title: 'PCI-DSS Level 1', desc: "Highest PCI security standard. Card data never touches your servers." },
      { icon: BookOpen, title: 'Double-Entry Ledger', desc: 'Immutable append-only ledger with DB-trigger enforcement. Zero arithmetic rounding errors.' },
      { icon: BadgeCheck, title: 'RBI PA/PG Framework', desc: "Fully compliant with RBI's Payment Aggregator guidelines including nodal accounts." },
      { icon: Layers, title: '3DS2 Authentication', desc: 'Global strong authentication standard with frictionless flow for low-risk transactions.' },
      { icon: Server, title: 'ISO 27001 & SOC2', desc: 'Information security management system with annual third-party audits.' },
    ],
  },
  {
    id: 'developers',
    icon: Code2,
    label: 'Developers',
    color: 'cyan',
    headline: 'Built for engineering teams',
    sub: 'REST APIs, webhooks, SDKs, and an end-to-end sandbox — everything developers need to go live in hours.',
    features: [
      { icon: Code2, title: 'REST & GraphQL APIs', desc: 'Versioned REST APIs with predictable errors, idempotency keys, and OpenAPI 3.0 spec.' },
      { icon: Server, title: 'Webhooks & Events', desc: 'Real-time event stream for payment.captured, refund.processed, settlement.done, and 30+ events.' },
      { icon: ShieldCheck, title: 'API Key Management', desc: 'Scoped keys (read-only, write, admin) with HMAC-SHA256 signature verification.' },
      { icon: BookOpen, title: 'API Documentation', desc: 'Interactive playground with live request builder, response explorer, and code snippets.' },
      { icon: Zap, title: 'Full Sandbox', desc: 'Complete test environment with mock UPI, card decline scenarios, and network latency simulation.' },
      { icon: Layers, title: 'SDKs & Integrations', desc: 'Node.js, Python, Go, PHP, Ruby SDKs. Native Shopify, WooCommerce, and Magento plugins.' },
    ],
  },
];

type ColorKey = 'blue' | 'indigo' | 'purple' | 'emerald' | 'rose' | 'cyan';

const colorMap: Record<ColorKey, { bg: string; border: string; text: string; icon: string }> = {
  blue:    { bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    text: 'text-blue-400',    icon: 'text-blue-400' },
  indigo:  { bg: 'bg-indigo-500/10',  border: 'border-indigo-500/20',  text: 'text-indigo-400',  icon: 'text-indigo-400' },
  purple:  { bg: 'bg-purple-500/10',  border: 'border-purple-500/20',  text: 'text-purple-400',  icon: 'text-purple-400' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', icon: 'text-emerald-400' },
  rose:    { bg: 'bg-rose-500/10',    border: 'border-rose-500/20',    text: 'text-rose-400',    icon: 'text-rose-400' },
  cyan:    { bg: 'bg-cyan-500/10',    border: 'border-cyan-500/20',    text: 'text-cyan-400',    icon: 'text-cyan-400' },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Full Razorpay-class Feature Suite
        </div>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white leading-tight mb-6">
          Everything a growing<br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            business needs to scale
          </span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Payments, banking, payroll, QR terminals, and developer tools — all under one platform built for India.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30"
          >
            Open Merchant Dashboard <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/pricing"
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
          >
            View Pricing
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="border-y border-slate-800 bg-slate-900/40 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400">
            {[
              { icon: ShieldCheck, label: 'RBI Authorised PA', color: 'text-blue-400' },
              { icon: Lock, label: 'PCI-DSS Level 1', color: 'text-emerald-400' },
              { icon: BadgeCheck, label: 'ISO/IEC 27001', color: 'text-indigo-400' },
              { icon: CheckCircle2, label: 'SOC2 Type II', color: 'text-purple-400' },
              { icon: Server, label: '99.99% Uptime SLA', color: 'text-cyan-400' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-slate-300 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Pillars */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        {PRODUCT_PILLARS.map((pillar, idx) => {
          const PillarIcon = pillar.icon;
          const c = colorMap[pillar.color as ColorKey];
          return (
            <section key={pillar.id} id={pillar.id}>
              <div className={`flex flex-col ${idx % 2 === 0 ? '' : 'items-end text-right'} mb-12`}>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${c.bg} border ${c.border} text-xs font-bold ${c.text} mb-4`}>
                  <PillarIcon className="w-3.5 h-3.5" />
                  {pillar.label}
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
                  {pillar.headline}
                </h2>
                <p className="text-base text-slate-400 max-w-2xl leading-relaxed">
                  {pillar.sub}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {pillar.features.map((feat) => {
                  const FeatIcon = feat.icon;
                  return (
                    <div
                      key={feat.title}
                      className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 transition-all space-y-3"
                    >
                      <div className={`w-9 h-9 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                        <FeatIcon className={`w-4 h-4 ${c.icon}`} />
                      </div>
                      <h3 className="font-bold text-white text-sm">{feat.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Startup Perks CTA */}
      <section className="border-t border-slate-800 bg-gradient-to-br from-slate-900 to-[#070B16]">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              BuimbPay Startup Perks
            </div>
            <h2 className="text-3xl font-black text-white mb-3">
              Get up to ₹1Cr* in benefits
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Angel and VC-funded startups get free GMV, 90 days of Magic Checkout, SaaS credits worth ₹50L+, and priority 24×7 support.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/startup-perks"
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/30 transition-all"
            >
              Claim Startup Perks <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/qr-codes"
              className="px-6 py-3.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <QrCode className="w-4 h-4" />
              Smart QR & Merchant Exchange
            </Link>
          </div>
        </div>
      </section>

      {/* Developer CTA */}
      <section className="bg-[#070B16] border-t border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 font-bold">
            <Code2 className="w-3.5 h-3.5" />
            Developer-First
          </div>
          <h2 className="text-3xl font-black text-white">Go live in hours, not weeks</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Full REST API, interactive docs, Postman collection, and a complete sandbox with all payment failure scenarios pre-built.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/30"
            >
              <Code2 className="w-4 h-4" />
              API Documentation
            </Link>
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              Try Sandbox Dashboard <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
