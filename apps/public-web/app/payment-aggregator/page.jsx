'use client';
import Link from 'next/link';
import { CheckCircle, Shield, Zap, TrendingUp, Users, FileText, ArrowRight, Building2, CreditCard, RefreshCw, BarChart3, Lock, Globe } from 'lucide-react';

export const metadata = {
  title: 'Payment Aggregator – RBI Authorised PA | BuimbPay',
  description: 'BuimbPay is an RBI-authorised Payment Aggregator (PA). Accept payments from 100+ methods — UPI, cards, netbanking, wallets. T+1 settlement, chargeback management, merchant KYC/KYB.',
};

const FEATURES = [
  { icon: CreditCard, title: '100+ Payment Modes', desc: 'UPI, Cards, Net Banking, Wallets, EMI, BNPL, UPI Credit — all via a single API integration.', color: 'blue' },
  { icon: Zap, title: 'T+0 / T+1 Settlement', desc: 'Receive funds the same day or next working day. Instant Settlement available on demand.', color: 'amber' },
  { icon: Shield, title: 'RBI PA Licensed', desc: 'Fully authorised by RBI under the Payment and Settlement Systems Act, 2007 (PSS Act).', color: 'green' },
  { icon: RefreshCw, title: 'Chargeback Management', desc: 'Automated dispute resolution dashboard with evidence submission and tracking.', color: 'violet' },
  { icon: BarChart3, title: 'Smart Routing', desc: 'Multi-acquirer routing improves success rates by 8–12% using real-time bank uptime data.', color: 'rose' },
  { icon: Users, title: 'Merchant KYC / KYB', desc: 'Digital onboarding with video KYC, GST verification, and bank account penny-drop in under 2 hours.', color: 'teal' },
];

const COMPLIANCE = [
  'RBI Payment Aggregator (PA) licence — Section 17 & 18, PSS Act 2007',
  'PCI DSS Level 1 certified payment processing environment',
  'Nodal escrow account maintained at a scheduled commercial bank',
  'AML / CFT monitoring per PMLA 2002 and FATF guidelines',
  'Merchant due diligence — enhanced KYB for high-risk categories',
  'T+1 settlement cycle with daily reconciliation reports',
];

const FLOW_STEPS = [
  { label: 'Customer', sub: 'Initiates payment', color: 'bg-blue-600' },
  { label: 'Merchant', sub: 'Your website / app', color: 'bg-indigo-600' },
  { label: 'BuimbPay PA', sub: 'Routes & processes', color: 'bg-violet-600' },
  { label: 'Acquiring Bank', sub: 'Issuer authorisation', color: 'bg-purple-600' },
  { label: 'Nodal Escrow', sub: 'RBI mandated account', color: 'bg-rose-600' },
  { label: 'Merchant Bank', sub: 'Settlement T+1', color: 'bg-green-600' },
];

const colorMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', hover: 'group-hover:bg-blue-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', hover: 'group-hover:bg-amber-600' },
  green: { bg: 'bg-emerald-50', text: 'text-emerald-600', hover: 'group-hover:bg-emerald-600' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-600', hover: 'group-hover:bg-violet-600' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', hover: 'group-hover:bg-rose-600' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', hover: 'group-hover:bg-teal-600' },
};

export default function PaymentAggregatorPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0C1938] text-white pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-700/50 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Shield className="w-3.5 h-3.5" /> RBI Authorised Payment Aggregator
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl mb-5">
            India's most reliable<br />
            <span className="text-[#2563EB]">Payment Aggregator</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-8 leading-relaxed">
            BuimbPay is an RBI-licensed Payment Aggregator. Connect your business to 100+ payment methods — UPI, cards, net banking, and wallets — with a single API. Collect, hold in a nodal escrow, and settle funds to your bank account on T+0 or T+1.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup" className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-lg transition-colors text-sm shadow-lg">
              Start Accepting Payments <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/docs" className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-200 font-semibold px-7 py-3.5 rounded-lg transition-colors text-sm">
              View API Docs
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
            {['₹0 setup fee', 'Go live in 2 hours', 'T+0 settlement', '24×7 support'].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PA vs PG Explainer */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Payment Aggregator vs Payment Gateway — what's the difference?</h2>
          <p className="text-slate-500 mb-10 max-w-3xl">Both process payments — but their regulatory and functional roles differ significantly.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center"><Building2 className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-bold text-slate-900">Payment Aggregator (PA)</h3>
                  <span className="text-xs text-blue-600 font-semibold">RBI-regulated entity</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                {[
                  'Holds a nodal / escrow account for merchant funds',
                  'Regulated directly by RBI (PA guidelines 2020)',
                  'Responsible for merchant onboarding, KYB, AML checks',
                  'Settles funds from escrow to merchant bank accounts',
                  'Liable for chargebacks and fraud at the network level',
                  'Must maintain minimum net worth of ₹25 Cr (existing) / ₹15 Cr (new)',
                ].map(p => <li key={p} className="flex gap-2"><CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />{p}</li>)}
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center"><Globe className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-bold text-slate-900">Payment Gateway (PG)</h3>
                  <span className="text-xs text-slate-500 font-semibold">Technology service provider</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                {[
                  'Routes payment data between merchant and acquirer',
                  'Does NOT hold merchant funds in escrow',
                  'Technology layer — PCI-DSS certified',
                  'Provides tokenisation, encryption, 3D Secure',
                  'Must partner with an RBI-authorised PA to operate',
                  'Narrower regulatory obligations vs PA',
                ].map(p => <li key={p} className="flex gap-2 text-slate-500"><CheckCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />{p}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PA Flow Diagram */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">How BuimbPay PA processes your payments</h2>
          <p className="text-slate-500 text-center mb-10">End-to-end money flow from customer to your bank account</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0">
            {FLOW_STEPS.map((step, i) => (
              <div key={step.label} className="flex flex-col md:flex-row items-center">
                <div className="flex flex-col items-center">
                  <div className={`${step.color} text-white font-bold text-xs px-4 py-2.5 rounded-xl text-center min-w-[110px]`}>
                    {step.label}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 text-center">{step.sub}</span>
                </div>
                {i < FLOW_STEPS.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-slate-300 mx-2 my-2 md:my-0 rotate-90 md:rotate-0" />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-6">Funds are held in a RBI-mandated nodal escrow account and settled to your bank within T+1 working days</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Everything a PA must offer — and more</h2>
          <p className="text-slate-500 text-center mb-10">Built to Razorpay-grade standards for reliability, compliance, and developer experience</p>
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

      {/* Compliance */}
      <section className="py-16 bg-[#0C1938] text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-900/40 border border-emerald-700/50 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <Lock className="w-3.5 h-3.5" /> Regulatory Compliance
            </div>
            <h2 className="text-3xl font-extrabold mb-4">Fully compliant.<br />Always.</h2>
            <p className="text-slate-400 leading-relaxed mb-6">BuimbPay operates under strict RBI guidelines. Every rupee transacted is processed through our RBI-designated nodal escrow account.</p>
            <Link href="/security" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm">
              View Security & Compliance <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ul className="space-y-3">
            {COMPLIANCE.map(c => (
              <li key={c} className="flex gap-3 items-start">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Merchant Onboarding */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Merchant onboarding in under 2 hours</h2>
          <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">Digital-first KYB with Aadhaar eSign, video KYC, GST verification, and penny-drop bank confirmation</p>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { step: '01', title: 'Sign Up', desc: 'Create your BuimbPay account with business email and mobile OTP.' },
              { step: '02', title: 'Business KYB', desc: 'Submit GST / CIN, PAN, and bank details. Auto-verified in real-time.' },
              { step: '03', title: 'Video KYC', desc: 'Director / proprietor completes a 2-minute live video KYC session.' },
              { step: '04', title: 'Go Live', desc: 'API keys issued. Start accepting real payments within 2 hours.' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-black text-lg flex items-center justify-center mx-auto mb-3">{s.step}</div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">{s.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-4">Ready to accept payments?</h2>
          <p className="text-blue-100 mb-8">Join 1 lakh+ businesses that trust BuimbPay for secure, compliant payment collection.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-lg transition-colors shadow-lg">
              Create Free Account
            </Link>
            <Link href="/contact" className="border border-blue-400 hover:border-white text-white font-semibold px-8 py-3.5 rounded-lg transition-colors">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
