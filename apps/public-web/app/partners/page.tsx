'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users, ArrowRight, CheckCircle2, Shield, Zap, Building2,
  Calculator, Sparkles, Award, TrendingUp, Handshake, Globe,
  Code2, FileCheck, Check, ChevronRight, HelpCircle
} from 'lucide-react';

const TIERS = [
  {
    name: 'Silver Partner',
    sub: 'For freelance developers, CA/CS firms & indie consultants',
    share: '15%',
    merchants: '1 - 10 active merchants',
    color: 'slate',
    features: [
      '15% recurring revenue share on MDR fees',
      'Partner portal with real-time attribution',
      'Co-branded merchant onboarding links',
      'Standard email & ticketing support',
      'Access to developer sandboxes & SDKs',
      'Monthly automated commission payouts',
    ],
  },
  {
    name: 'Gold Partner',
    sub: 'For web & app development agencies, e-commerce studios',
    share: '25%',
    merchants: '11 - 50 active merchants',
    color: 'blue',
    highlight: true,
    features: [
      '25% recurring revenue share on all transactions',
      'Dedicated Partner Growth Manager',
      'Joint co-marketing & directory listing',
      'Priority 24/7 technical integration assistance',
      'Early access to beta APIs & new features',
      'Free staging credits for client testing',
      'Co-branded sales pitch collateral',
    ],
  },
  {
    name: 'Platinum Partner',
    sub: 'For enterprise system integrators, ERP consultants & platforms',
    share: '35%',
    merchants: '50+ active merchants',
    color: 'emerald',
    features: [
      'Up to 35% recurring revenue share (custom rates)',
      'Custom white-label checkout and sub-merchant APIs',
      'Quarterly business reviews & executive sponsor',
      'Custom SLA & direct engineering Slack channel',
      'Marketplace integration listing in BuimbPay App Store',
      'Co-selling assistance from BuimbPay Enterprise team',
      'Custom pricing structures for high-volume enterprise clients',
    ],
  },
];

const INTEGRATIONS = [
  { name: 'Shopify', category: 'E-commerce', desc: 'Pre-built plugin with 1-click install and UPI intent support' },
  { name: 'WooCommerce', category: 'WordPress', desc: 'Official plugin supporting subscriptions and instant refund sync' },
  { name: 'Magento 2 / Adobe Commerce', category: 'Enterprise', desc: 'Enterprise module with multi-store and multi-currency support' },
  { name: 'Zoho Books & Invoice', category: 'Accounting', desc: 'Automated invoice payment links with instant status reconciliation' },
  { name: 'Tally Prime', category: 'ERP', desc: 'Auto-reconciliation connector for bank feeds and GST reporting' },
  { name: 'Salesforce', category: 'CRM', desc: 'Collect and track customer payments directly within Salesforce CRM' },
];

export default function PartnersPage() {
  const [merchantsCount, setMerchantsCount] = useState<number>(20);
  const [avgGmv, setAvgGmv] = useState<number>(500000); // 5 Lakhs per merchant
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    category: 'Agency / Developer',
  });

  // Calculate earnings: Total GMV * 1.8% average fee * tier share
  const totalMonthlyGmv = merchantsCount * avgGmv;
  const tierShare = merchantsCount > 50 ? 0.35 : merchantsCount > 10 ? 0.25 : 0.15;
  const estimatedAnnualPayout = Math.round(totalMonthlyGmv * 0.018 * tierShare * 12);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 font-semibold mb-6">
              <Handshake className="w-3.5 h-3.5 text-blue-400" /> BuimbPay Partner Network
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-6">
              Grow your revenue.<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Earn up to 35% revenue share.
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Join India’s fastest-growing fintech partner program. Empower your clients with next-generation payments, instant settlements, and UPI AutoPay while earning generous recurring commissions for life.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#apply"
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
              >
                Apply as a Partner <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#calculator"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
              >
                Calculate Earnings
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Lifetime Recurring Payouts
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Dedicated Growth Manager
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero Integration Costs
              </span>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" /> Partner Ecosystem Impact
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5">
                <p className="text-xs text-slate-400 mb-1">Total Payouts to Partners</p>
                <p className="text-3xl font-black text-white">₹14.8 Cr+</p>
                <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  ↑ 142% YoY growth
                </p>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5">
                <p className="text-xs text-slate-400 mb-1">Active Partners</p>
                <p className="text-3xl font-black text-white">2,400+</p>
                <p className="text-[11px] text-blue-400 mt-1">
                  Agencies, ERPs & CAs
                </p>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5">
                <p className="text-xs text-slate-400 mb-1">Avg. Client Activation</p>
                <p className="text-3xl font-black text-white">&lt; 24 Hrs</p>
                <p className="text-[11px] text-emerald-400 mt-1">Paperless digital KYC</p>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5">
                <p className="text-xs text-slate-400 mb-1">Max Revenue Share</p>
                <p className="text-3xl font-black text-emerald-400">35%</p>
                <p className="text-[11px] text-slate-400 mt-1">Tier-based incentives</p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <p className="text-xs text-blue-200">
                Are you an enterprise platform or ERP provider? <Link href="/contact" className="underline font-semibold hover:text-white">Request tailored white-label contracts</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Revenue Calculator */}
      <section id="calculator" className="py-20 border-t border-slate-800 bg-[#070B16]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">Interactive Calculator</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 mb-4">
              Estimate your annual recurring commission
            </h2>
            <p className="text-slate-400 text-sm">
              Adjust the sliders below to see your potential recurring earnings based on client volume and monthly processing GMV.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 lg:p-12 backdrop-blur-xl grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-200">
                    Referred Active Merchants
                  </label>
                  <span className="text-lg font-black text-blue-400 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    {merchantsCount} Merchants
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={merchantsCount}
                  onChange={(e) => setMerchantsCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>1 Merchant (Silver)</span>
                  <span>15 Merchants (Gold)</span>
                  <span>100 Merchants (Platinum)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-200">
                    Average Monthly GMV per Merchant
                  </label>
                  <span className="text-lg font-black text-emerald-400 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    ₹{(avgGmv / 100000).toFixed(1)} Lakhs
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="5000000"
                  step="50000"
                  value={avgGmv}
                  onChange={(e) => setAvgGmv(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>₹50K (Retail / Small)</span>
                  <span>₹25 Lakhs (Medium)</span>
                  <span>₹50 Lakhs (High-Growth)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-1.5">
                <div className="flex justify-between">
                  <span>Current Eligible Tier:</span>
                  <span className="font-bold text-white">
                    {merchantsCount > 50 ? 'Platinum (35% Share)' : merchantsCount > 10 ? 'Gold (25% Share)' : 'Silver (15% Share)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Network Monthly GMV:</span>
                  <span className="font-bold text-white">₹{(totalMonthlyGmv / 100000).toFixed(2)} Lakhs / mo</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Monthly Payout:</span>
                  <span className="font-bold text-emerald-400">₹{Math.round(estimatedAnnualPayout / 12).toLocaleString('en-IN')} / mo</span>
                </div>
              </div>
            </div>

            {/* Result Box */}
            <div className="bg-gradient-to-br from-blue-950/50 via-indigo-950/40 to-slate-900 border border-blue-500/30 rounded-3xl p-8 text-center flex flex-col items-center justify-center">
              <Award className="w-12 h-12 text-blue-400 mb-3" />
              <span className="text-xs uppercase tracking-wider text-blue-300 font-bold mb-2">
                Estimated Annual Commission
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight">
                ₹{estimatedAnnualPayout.toLocaleString('en-IN')}
                <span className="text-lg text-slate-400 font-normal"> / year</span>
              </div>
              <p className="text-xs text-slate-400 max-w-xs mb-6">
                Directly credited to your registered bank account on the 5th of every month. No hidden deductions or capped ceilings.
              </p>
              <a
                href="#apply"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/30 text-center"
              >
                Become a Partner & Start Earning
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Tiers */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">Partner Tiers</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2 mb-4">
            Structured for every stage of partnership
          </h2>
          <p className="text-slate-400 text-sm">
            Whether you are an independent consultant or an enterprise agency with hundreds of merchant clients, we have a tier designed for you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 transition-all relative flex flex-col justify-between ${
                tier.highlight
                  ? 'bg-gradient-to-b from-blue-950/40 to-slate-900 border-2 border-blue-500/60 shadow-2xl shadow-blue-500/10'
                  : 'bg-slate-900/40 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white font-bold text-[10px] rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  <span className="text-2xl font-black text-emerald-400">{tier.share}</span>
                </div>
                <p className="text-xs text-slate-400 mb-2">{tier.sub}</p>
                <div className="text-[11px] font-semibold text-blue-400 mb-6 bg-blue-500/10 px-2.5 py-1 rounded inline-block">
                  {tier.merchants}
                </div>

                <ul className="space-y-3 text-xs text-slate-300 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#apply"
                className={`w-full py-3 rounded-xl font-semibold text-xs transition-all text-center block ${
                  tier.highlight
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                Join as {tier.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="py-20 border-t border-slate-800 bg-[#070B16]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">Ecosystem Connectors</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 mb-4">
              Pre-built modules for your favorite stacks
            </h2>
            <p className="text-slate-400 text-sm">
              Save hours of custom coding. Our certified connectors make client onboarding seamless across all major e-commerce, billing, and accounting platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INTEGRATIONS.map((item) => (
              <div
                key={item.name}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                    {item.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {item.desc}
                </p>
                <div className="text-[11px] font-semibold text-blue-400 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  View Integration Docs <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Application Form */}
      <section id="apply" className="py-24 max-w-4xl mx-auto px-6">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">Get Started Today</span>
            <h2 className="text-3xl font-black mt-2 mb-2">Apply for Partner Program</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Fill out this simple form to get instant access to the partner dashboard and referral links.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Application Received!</h3>
              <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
                Thank you for applying to the BuimbPay Partner Network. Our partnership manager will review your submission and activate your partner portal within 2 hours.
              </p>
              <a
                href="http://localhost:5173"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs inline-flex items-center gap-2"
              >
                Access Merchant Sandbox <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@agency.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Agency / Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="PixelCraft Labs"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Website or Portfolio URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://agency.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Partner Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="Agency / Developer">Web / App Development Agency</option>
                  <option value="ERP / Software Consultant">ERP & Business Software Consultant (Tally, SAP, Zoho)</option>
                  <option value="CA / CS / Legal Consultant">Chartered Accountant / CS / Financial Advisor</option>
                  <option value="Incubator / Co-working">Incubator / Accelerator / Co-working Space</option>
                  <option value="Payment Aggregator / Affiliate">Affiliate Marketer / Payment Reseller</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 mt-4 flex items-center justify-center gap-2"
              >
                Submit Partner Application <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-[11px] text-slate-500 mt-2">
                By submitting, you agree to BuimbPay’s Partner Terms & Conditions and Data Privacy Guidelines.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
