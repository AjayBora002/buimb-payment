'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Link2, ArrowRight, CheckCircle2, Share2, Clock, Globe,
  CreditCard, Smartphone, QrCode, Mail, MessageSquare,
  BarChart3, Shield, Zap, Users, FileText, Copy,
} from 'lucide-react';

const USE_CASES = [
  { icon: Users, label: 'Freelancers', desc: 'Send invoice links to clients with auto-reminder follow-ups.' },
  { icon: FileText, label: 'Invoicing', desc: 'Attach payment link to GST invoices for instant collection.' },
  { icon: Globe, label: 'D2C Brands', desc: 'Sell via social media without a website.' },
  { icon: MessageSquare, label: 'WhatsApp Commerce', desc: 'Share payment links in WhatsApp chats and groups.' },
  { icon: CreditCard, label: 'Subscription Billing', desc: 'Auto-recurring payment collection for SaaS and services.' },
  { icon: Smartphone, label: 'Field Teams', desc: 'Enable ground sales reps to collect payments on the spot.' },
];

const LINK_FEATURES = [
  { title: 'Custom Expiry', desc: 'Set links to expire after 1 day, 7 days, or a custom date. Expired links auto-decline.' },
  { title: 'Partial Payments', desc: 'Accept partial amounts. Track outstanding balance. Perfect for milestone billing.' },
  { title: 'UPI QR Included', desc: 'Every link auto-generates a UPI QR code. Share or print at your store.' },
  { title: 'Auto Reminders', desc: 'Smart SMS + WhatsApp reminders sent automatically at 24h, 2h, and overdue.' },
  { title: 'Customer Details', desc: 'Collect name, email, phone, and custom fields before payment.' },
  { title: 'Instant Receipts', desc: 'Auto-email branded payment receipts with GST breakdowns to customers.' },
  { title: 'Multi-currency', desc: 'Accept payments in USD, EUR, GBP, AED and more. Auto-convert to INR.' },
  { title: 'Webhooks on Pay', desc: 'Real-time webhook firing on payment success. Trigger CRM or ERP workflows.' },
];

export default function PaymentLinksPage() {
  const [copied, setCopied] = useState(false);
  const demoLink = 'https://buimbpay.in/pay/demo_acme_499';

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 font-semibold mb-6">
                <Link2 className="w-3.5 h-3.5" /> Payment Links & Pages
              </div>
              <h1 className="text-5xl font-black tracking-tight leading-tight mb-6">
                Collect payments<br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  without a website
                </span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Create a payment link in 30 seconds. Share via SMS, WhatsApp, email, or QR code. Get paid instantly. No code. No website needed.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="http://localhost:5173" target="_blank" rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all">
                  Create Your First Link <ArrowRight className="w-4 h-4" />
                </a>
                <Link href="/pricing" className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all">
                  View Pricing
                </Link>
              </div>
              <div className="flex flex-wrap gap-5 mt-6 text-xs text-slate-400">
                {['No coding needed', 'Free to create', 'Paid in seconds'].map(f => (
                  <span key={f} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />{f}</span>
                ))}
              </div>
            </div>

            {/* Live Demo Card */}
            <div className="bg-[#070B16] rounded-3xl border border-slate-800 p-6 space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Payment Link Preview</div>
              <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white">A</div>
                  <div>
                    <div className="font-bold text-white text-sm">Acme Design Studio</div>
                    <div className="text-xs text-slate-400">Logo Design Package</div>
                  </div>
                </div>
                <div className="text-3xl font-black text-white">₹4,999</div>
                <div className="space-y-2">
                  {['UPI (GPay / PhonePe / Paytm)', 'Debit / Credit Card', 'Net Banking', 'EMI'].map(m => (
                    <div key={m} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />{m}
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all">
                  Pay ₹4,999
                </button>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 justify-center">
                  <Shield className="w-3 h-3" /> Secured by BuimbPay · PCI-DSS Level 1
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-900 rounded-xl px-3 py-2 border border-slate-800">
                <Link2 className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span className="text-xs text-slate-400 truncate flex-1">{demoLink}</span>
                <button onClick={() => { navigator.clipboard.writeText(demoLink); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors flex-shrink-0">
                  {copied ? <><CheckCircle2 className="w-3.5 h-3.5" />Copied!</> : <><Copy className="w-3.5 h-3.5" />Copy</>}
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                {[{ icon: Mail, label: 'Email' }, { icon: MessageSquare, label: 'WhatsApp' }, { icon: QrCode, label: 'QR Code' }].map(({ icon: Icon, label }) => (
                  <button key={label} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-t border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">Who uses Payment Links?</h2>
            <p className="text-slate-400">From solopreneurs to enterprise AR teams</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {USE_CASES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/30 transition-all space-y-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-purple-400" />
                </div>
                <h3 className="font-bold text-white">{label}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-800 py-20 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-white mb-10 text-center">Everything you need to get paid</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LINK_FEATURES.map(({ title, desc }) => (
              <div key={title} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <h4 className="font-bold text-white text-sm">{title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Callout */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block bg-gradient-to-br from-slate-900 to-[#070B16] rounded-3xl border border-slate-800 p-12 max-w-2xl mx-auto">
            <BarChart3 className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-white mb-3">₹0 to create. Pay only on collection.</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Creating payment links is completely free. We charge a small MDR only when your customer pays. Standard rates: 2% UPI, 2% Debit Card, 2.5% Credit Card.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="http://localhost:5173" target="_blank" rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm flex items-center gap-2 transition-all">
                Create Link for Free <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/pricing" className="px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all hover:bg-slate-700">
                View Full Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
