'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  ArrowRight,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  Clock,
  Zap,
} from 'lucide-react';

export default function PricingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [methodTab, setMethodTab] = useState<'gateway' | 'international' | 'optimizer' | 'subscriptions'>('gateway');

  const faqs = [
    {
      q: 'What are payment processing charges?',
      a: 'Payment gateway charges refer to the cost which is charged to facilitate online payments via the payment gateway on the website or app. Charges are calculated as a small percentage of an online payment amount and vary according to the type of online payment methods used by the customer.',
    },
    {
      q: "What does BuimbPay's 2% + GST pricing include?",
      a: 'The 2% + GST platform fee covers full end-to-end payment processing across 100+ payment modes, fraud detection, double-entry automated ledger reconciliation, PCI-DSS tokenization, 24x7 merchant support, and automated daily settlements.',
    },
    {
      q: 'Does BuimbPay charge Annual Maintenance Charges (AMC) or setup fees?',
      a: 'No. BuimbPay has zero setup fees and zero annual maintenance charges (AMC). You only pay when you process successful transactions.',
    },
    {
      q: 'Are there any hidden charges with BuimbPay Payment Gateway?',
      a: 'None. We pride ourselves on 100% transparency. There are no hidden fees, chargeback handling surcharges, or onboarding lock-in fees.',
    },
    {
      q: 'Are the payment gateway charges deducted on a per transaction basis?',
      a: 'Yes. Merchant Discount Rate (MDR) and applicable GST are automatically deducted from each transaction before net settlement is deposited into your nodal bank account.',
    },
    {
      q: 'Is there a transaction fee for standard UPI payments on BuimbPay?',
      a: 'Standard P2M UPI transactions on consumer debit accounts operate under government zero-MDR guidelines. RuPay credit card on UPI transactions carry standard interchange MDR.',
    },
    {
      q: 'Will I be charged if my customer uses a RuPay Debit Card?',
      a: 'In accordance with NPCI and RBI regulations, domestic RuPay debit card transactions incur 0% MDR for merchants.',
    },
    {
      q: "How does BuimbPay's total cost compare to gateways that appear cheaper upfront?",
      a: 'Cheaper gateways often suffer from lower transaction success rates (dropping 5-8% of sales), manual reconciliation leaks, and opaque hidden fees. BuimbPay delivers 98%+ authorization rates with smart routing, maximizing your net realized revenue.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      {/* ── 1. Hero Offer Banner (Razorpay Reference Style) ─────────────── */}
      <section className="bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-[#0A0F1E] border border-blue-500/30 rounded-3xl p-8 lg:p-14 relative overflow-hidden shadow-2xl">
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Limited Period Offer // Festive Launch
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Start accepting payments at just{' '}
            <span className="line-through text-slate-500 mr-2 text-3xl sm:text-5xl">2%</span>
            <span className="text-blue-400">0%*</span>
          </h1>

          <p className="text-base text-slate-300">
            <strong>0% platform fees for your first 90 days.</strong> Zero setup charges, zero AMC, and complete access to UPI, Cards, NetBanking, and Soundbox QR.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all"
            >
              Start for Free in Sandbox
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm transition-all"
            >
              Accepting over ₹5L/month? Get Custom Plan
            </Link>
          </div>
        </div>

        {/* Floating Badge Visual */}
        <div className="hidden lg:flex absolute top-10 right-14 w-48 h-48 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 p-1 shadow-2xl items-center justify-center text-center animate-pulse">
          <div className="w-full h-full rounded-full bg-[#0A0F1E] flex flex-col items-center justify-center p-4">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">ZERO*</span>
            <span className="text-2xl font-black text-white">PLATFORM</span>
            <span className="text-xs font-bold text-emerald-400">FEES FOR 90 DAYS</span>
          </div>
        </div>
      </section>

      {/* ── 2. Supported Payment Methods Matrix (Reference Replicated) ─── */}
      <section className="bg-[#070B16] border border-slate-800 rounded-3xl p-8 lg:p-12 space-y-8">
        <div>
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
            All-In-One Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Custom Pricing Tailored to Your Scale
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Transparent MDR breakdown across every major instrument in the Indian ecosystem.
          </p>
        </div>

        {/* Method Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cards */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <CreditCard className="w-4 h-4 text-blue-400" />
              Debit & Credit Cards
            </div>
            <p className="text-xs text-slate-400">
              Visa, RuPay, Mastercard, American Express, Diners Club International + Corporate cards
            </p>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-xs">
              <span className="text-slate-400">Standard Rate:</span>
              <span className="text-white font-bold font-mono">2.0% + GST</span>
            </div>
          </div>

          {/* UPI */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              UPI & BharatQR
            </div>
            <p className="text-xs text-slate-400">
              BHIM, Google Pay, PhonePe, Paytm, CRED, Amazon Pay + 53 other bank UPI applications
            </p>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-xs">
              <span className="text-slate-400">P2M Debit UPI:</span>
              <span className="text-emerald-400 font-bold font-mono">0.0% MDR</span>
            </div>
          </div>

          {/* Netbanking */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Building className="w-4 h-4 text-indigo-400" />
              Netbanking (68+ Banks)
            </div>
            <p className="text-xs text-slate-400">
              ICICI Bank, HDFC Bank, SBI, Kotak Mahindra, Axis Bank, Yes Bank + 62 others
            </p>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-xs">
              <span className="text-slate-400">Standard Rate:</span>
              <span className="text-white font-bold font-mono">2.0% + GST</span>
            </div>
          </div>

          {/* Wallets */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Wallet className="w-4 h-4 text-purple-400" />
              Prepaid Wallets
            </div>
            <p className="text-xs text-slate-400">
              MobiKwik, PayZapp, Freecharge, JioMoney, Airtel Money, Ola Money, PayPal
            </p>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-xs">
              <span className="text-slate-400">Standard Rate:</span>
              <span className="text-white font-bold font-mono">2.0% + GST</span>
            </div>
          </div>

          {/* PayLater & Cardless EMI */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Clock className="w-4 h-4 text-amber-400" />
              Pay Later & Cardless EMI
            </div>
            <p className="text-xs text-slate-400">
              ICICI PayLater, HDFC FlexiPay, LazyPay, Simpl, ZestMoney, Bank of Baroda EMI
            </p>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-xs">
              <span className="text-slate-400">Standard Rate:</span>
              <span className="text-white font-bold font-mono">2.5% + GST</span>
            </div>
          </div>

          {/* Credit Card on UPI */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Zap className="w-4 h-4 text-blue-400" />
              Credit Card on UPI (RuPay)
            </div>
            <p className="text-xs text-slate-400">
              Instant scan & pay on UPI rails backed by consumer RuPay credit card credit lines
            </p>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-xs">
              <span className="text-slate-400">Interchange Rate:</span>
              <span className="text-blue-400 font-bold font-mono">2.15% + GST</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Enterprise Plan Inquiry ──────────────────────────────────── */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            High Volume Merchants
          </span>
          <h3 className="text-2xl font-bold text-white">
            Is your monthly revenue more than ₹5,00,000?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Are you an enterprise collecting large volumes of payments? Contact our payment engineering team for customized interchange pricing, dedicated SLA, and multi-bank nodal escrow.
          </p>
        </div>

        <Link
          href="/contact"
          className="px-6 py-3 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-white/10 flex-shrink-0"
        >
          Get a Custom Plan <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>

      {/* ── 4. Frequently Asked Questions (Exact Reference Replicated) ─── */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Everything you need to know about payment processing fees, settlements, and compliance.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-800 rounded-2xl bg-[#070B16] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-blue-400 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    <p className="pl-5">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
