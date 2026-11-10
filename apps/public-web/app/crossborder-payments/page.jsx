'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Globe,
  CreditCard,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Euro,
  HelpCircle,
  Building2,
  TrendingUp,
  Percent
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function CrossborderPaymentsPage() {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [amount, setAmount] = useState('380');

  const currencies = [
    { code: 'USD', symbol: '$', rate: 86.4, country: 'USA 🇺🇸', flag: '🇺🇸' },
    { code: 'EUR', symbol: '€', rate: 93.2, country: 'France 🇫🇷', flag: '🇫🇷' },
    { code: 'GBP', symbol: '£', rate: 109.8, country: 'UK 🇬🇧', flag: '🇬🇧' },
    { code: 'AED', symbol: 'د.إ', rate: 23.5, country: 'UAE 🇦🇪', flag: '🇦🇪' },
    { code: 'SGD', symbol: 'S$', rate: 64.1, country: 'Singapore 🇸🇬', flag: '🇸🇬' },
  ];

  const currentCurrency = currencies.find(c => c.code === selectedCurrency) || currencies[0];
  const inrEquivalent = (Number(amount || 0) * currentCurrency.rate).toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION - Directly Matching Razorpay Screenshots {02722972-4FF4-4033-B28B-70136881D9FE}.png & {75859952-FB36-4057-9C82-3DFD74E1F466}.png */}
        <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
              
              {/* Left Column: Headlines & CTA */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  International Cross-Border Payments
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0c2340] tracking-tight leading-[1.1]">
                  Accept international cards at <span className="text-[#0B63E5]">3%*</span>.<br />
                  Switch to BuimbPay.
                </h1>

                <p className="text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
                  Power your business with global payment options. Cards, international bank transfers, Apple Pay, Google Pay and more. Lowest transaction fees and India-based 24/7 dedicated support.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/signup"
                    className="bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-[1.02] transition-all text-sm flex items-center gap-2"
                  >
                    <span>Sign Up Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="http://localhost:5173"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm transition-all shadow-xs"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Sign up with Google</span>
                  </a>
                </div>

                <div className="flex items-center gap-6 pt-4 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Instant FIRC &amp; Inward Remittance</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>130+ Currencies Supported</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Zero Chargeback Shield</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Global Fashion/Artisan Visual (Replicating French & Indian Artisan Hero) */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-blue-950 p-6 text-white">
                  
                  {/* Currency Selector Pills */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-700/60 mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Customer Origin</span>
                    <div className="flex items-center gap-1">
                      {currencies.map(c => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => setSelectedCurrency(c.code)}
                          className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                            selectedCurrency === c.code
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-800/80 text-slate-400 hover:text-white'
                          }`}
                        >
                          {c.code}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Merchant Showcase Card */}
                  <div className="bg-white rounded-2xl p-5 text-slate-900 shadow-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black tracking-tight text-slate-800 uppercase">
                        HouseofTasya ™
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Live Cross-Border
                      </span>
                    </div>

                    <div className="rounded-xl overflow-hidden h-40 bg-gradient-to-br from-rose-900 via-red-800 to-amber-900 flex items-center justify-center relative p-4">
                      <div className="text-center text-white space-y-1">
                        <div className="text-3xl">👗</div>
                        <div className="text-sm font-extrabold tracking-wide">Heritage Bridal Lehenga</div>
                        <div className="text-[11px] text-red-200">Handcrafted Zari Embroidery · Jaipur, India</div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs font-bold text-slate-500">Order Amount</span>
                        <div className="text-right">
                          <span className="text-2xl font-black text-slate-900">
                            {currentCurrency.symbol} {amount}.00
                          </span>
                          <span className="block text-[11px] text-emerald-600 font-bold">
                            ≈ ₹ {inrEquivalent} INR to Merchant
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <div className="flex-1 py-3 bg-[#0B63E5] hover:bg-blue-700 text-white text-center rounded-xl font-bold text-sm shadow-md cursor-pointer transition-all">
                          Pay with Apple Pay / Card
                        </div>
                      </div>

                      <div className="text-center pt-1">
                        <span className="text-[10px] text-slate-400 font-semibold">
                          Secured by <strong className="text-slate-700">BuimbPay</strong> · 256-Bit TLS Bank Grade
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Connection Pill */}
                  <div className="mt-6 flex items-center justify-between text-xs font-semibold px-2 text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{currentCurrency.flag}</span>
                      <span>Buyer in {currentCurrency.country}</span>
                    </div>
                    <span className="text-blue-400">⚡ Instant Settlement</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🇮🇳</span>
                      <span>Merchant in India</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8 border-t border-slate-200">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Percent className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Flat 3% Rate</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Transparent 3% flat fee on international cards without hidden currency conversion markups.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">130+ Currencies</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Display prices in USD, EUR, GBP, AED, SGD and allow international customers to pay in their local currency.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Virtual Bank Accounts</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Collect USD via ACH, EUR via SEPA, and GBP via BACS directly into local virtual accounts in your name.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Automated FIRC</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Receive EDPMS and e-FIRC compliance certificates directly into your merchant dashboard automatically.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* COMPARISON SECTION */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center space-y-3 mb-12">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Transparent Pricing
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                How BuimbPay Compares for Cross-Border
              </h2>
              <p className="text-sm text-slate-600 max-w-xl mx-auto">
                Stop losing up to 7% on cross-border payments through hidden FX conversions and legacy international aggregators.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200">
                    <th className="py-4 px-6 font-bold text-slate-900">Features &amp; Fees</th>
                    <th className="py-4 px-6 font-bold text-blue-600 bg-blue-50/50">BuimbPay Cross-Border</th>
                    <th className="py-4 px-6 font-bold text-slate-600">PayPal / Stripe India</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-800">Transaction Fee</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 bg-blue-50/20">3.00% flat</td>
                    <td className="py-4 px-6 text-slate-600">3.99% – 4.40% + fixed fee</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-800">FX Markup on Conversion</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 bg-blue-50/20">Interbank Rate (0% markup)</td>
                    <td className="py-4 px-6 text-slate-600">3.0% – 4.5% hidden spread</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-800">FIRC / e-BRC Certificate</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 bg-blue-50/20">Free &amp; Instant in Dashboard</td>
                    <td className="py-4 px-6 text-slate-600">₹100 – ₹500 per transaction or bank delay</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-800">Settlement Timeline</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 bg-blue-50/20">T+2 Business Days directly in INR</td>
                    <td className="py-4 px-6 text-slate-600">T+5 to T+7 Days</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-800">Local Payment Methods</td>
                    <td className="py-4 px-6 font-bold text-emerald-600 bg-blue-50/20">Apple Pay, Google Pay, ACH, SEPA</td>
                    <td className="py-4 px-6 text-slate-600">Limited options in India accounts</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-[#0B63E5] hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all text-sm"
              >
                <span>Enable International Payments in 15 Minutes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
