'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CreditCard,
  QrCode,
  Link2,
  RefreshCw,
  Zap,
  Globe,
  ChevronDown,
  Menu,
  X,
  Banknote,
  ShieldCheck,
  FileCode,
  Calculator,
  ArrowRight,
} from 'lucide-react';
import { FinoraLogo } from './FinoraLogo';

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:5173';

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top International Payments Banner */}
      <div className="bg-[#0A1128] text-white/80 py-1.5 px-4 text-xs font-medium border-b border-white/10">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-white font-semibold">
              <Globe className="w-3.5 h-3.5 text-[#2B59FF]" />
              Accept International Payments
            </span>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
              <span>Germany</span>
              <span>/</span>
              <span>Canada</span>
              <span>/</span>
              <span>Australia</span>
              <span>/</span>
              <span>USA</span>
            </div>
            <span className="text-slate-400 hidden md:inline">
              Global cards, Apple Pay and Google Pay at industry-low MDR
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#2B59FF] bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
              <span>$</span>
              <span>€</span>
              <span>£</span>
              <span>₹</span>
            </div>
            <Link href="/international" className="text-[#2B59FF] hover:text-blue-300 font-semibold text-xs transition-colors">
              Know More
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Pill Navbar */}
      <div className="sticky top-4 z-50 px-4 sm:px-6 pointer-events-none">
        <header
          className={`max-w-6xl mx-auto rounded-full pointer-events-auto transition-all duration-300 ${
            scrolled
              ? 'bg-white/95 backdrop-blur-md shadow-[0_12px_32px_rgba(15,23,42,0.12)] border border-slate-200/80 py-2.5 px-5 sm:px-7'
              : 'bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white/60 py-3 px-6 sm:px-8'
          }`}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="transition-transform duration-300 group-hover:rotate-45">
                <FinoraLogo size={30} color="#2B59FF" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-[#0A1128] group-hover:text-[#2B59FF] transition-colors">
                Buimb<span className="text-[#2B59FF]">Pay</span>
              </span>
            </Link>

            {/* Desktop Nav — matching original links */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-slate-600">
              {/* Payments Mega Menu */}
              <div className="relative" onMouseEnter={() => setActiveMenu('payments')}>
                <button
                  className={`flex items-center gap-1 py-1 transition-colors hover:text-[#2B59FF] ${
                    activeMenu === 'payments' ? 'text-[#2B59FF] font-semibold' : ''
                  }`}
                >
                  <span>Payments</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeMenu === 'payments' ? 'rotate-180 text-[#2B59FF]' : 'text-slate-400'
                    }`}
                  />
                </button>

                {activeMenu === 'payments' && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[620px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-slate-100 p-5 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-200"
                    onMouseEnter={() => setActiveMenu('payments')}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    {/* Col 1: Accept Payments Online */}
                    <div className="col-span-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Accept Payments Online
                      </span>
                    </div>
                    <Link
                      href="/payment-gateway"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#2B59FF] flex items-center justify-center shrink-0 group-hover:bg-[#2B59FF] group-hover:text-white transition-colors">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-[#2B59FF]">
                          Payment Gateway
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Checkout on your website and mobile app
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/payment-links"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Link2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600">
                          Payment Links & Pages
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Collect payments via WhatsApp and SMS
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/magic-checkout"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-amber-600 flex items-center gap-1.5">
                          Magic Checkout
                          <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-bold">
                            1-Click
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Auto-fill addresses and RTO intelligence
                        </div>
                      </div>
                    </Link>

                    {/* Col 2: Recurring & Optimization */}
                    <div className="col-span-2 pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Recurring & Optimization
                      </span>
                    </div>

                    <Link
                      href="/subscriptions"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <RefreshCw className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600">
                          Subscriptions & Mandates
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          UPI AutoPay, eNACH and cards
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/optimizer"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-cyan-600">
                          Optimizer
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Multi-gateway routing and fallback
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/instant-settlement"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-purple-600">
                          Instant Settlement
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Settle merchant funds in 15 seconds
                        </div>
                      </div>
                    </Link>

                    {/* In-Store & Merchant Exchange */}
                    <div className="col-span-2 pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        In-Store & Merchant Exchange
                      </span>
                    </div>

                    <Link
                      href="/qr-codes"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-rose-600 flex items-center gap-1.5">
                          Smart QR & Soundbox
                          <span className="text-[9px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-bold">
                            New
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Dynamic QR and soundbox integration
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/qr-codes#exchange"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
                        <Banknote className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-green-600 flex items-center gap-1.5">
                          Cash @ POS Exchange
                          <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">
                            ATM
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Cash withdrawal and P2P merchant balance
                        </div>
                      </div>
                    </Link>

                    {/* Global Businesses Highlight */}
                    <div className="col-span-2 bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <span className="text-xs font-bold text-[#2B59FF] uppercase block mb-1">
                        Global Businesses
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">Accept International Payments</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        Accept 100+ currencies from 190+ countries with Apple Pay, Google Pay, and automated digital FIRA.
                      </p>
                      <Link
                        href="/international"
                        onClick={() => setActiveMenu(null)}
                        className="inline-flex items-center text-xs font-semibold text-[#2B59FF] hover:underline gap-1"
                      >
                        Explore Global Rails <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Smart QR & POS */}
              <Link
                href="/qr-codes"
                className={`flex items-center gap-1.5 transition-colors hover:text-[#2B59FF] ${
                  pathname === '/qr-codes' ? 'text-[#0A1128] font-semibold' : ''
                }`}
              >
                <span>Smart QR & POS</span>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-blue-50 text-[#2B59FF] font-bold border border-blue-100">
                  PhonePe Exchange
                </span>
              </Link>

              {/* Instant Settlements */}
              <Link
                href="/instant-settlement"
                className={`transition-colors hover:text-[#2B59FF] ${
                  pathname === '/instant-settlement' ? 'text-[#0A1128] font-semibold' : ''
                }`}
              >
                Instant Settlements
              </Link>

              {/* Pricing */}
              <Link
                href="/pricing"
                className={`transition-colors hover:text-[#2B59FF] ${
                  pathname === '/pricing' ? 'text-[#0A1128] font-semibold' : ''
                }`}
              >
                Pricing
              </Link>

              {/* Fee Calculator */}
              <Link
                href="/tools/gst-calculator"
                className={`transition-colors hover:text-[#2B59FF] ${
                  pathname === '/tools/gst-calculator' ? 'text-[#0A1128] font-semibold' : ''
                }`}
              >
                Fee Calculator
              </Link>

              {/* Developers */}
              <Link
                href="/docs"
                className={`transition-colors hover:text-[#2B59FF] ${
                  pathname === '/docs' ? 'text-[#0A1128] font-semibold' : ''
                }`}
              >
                Developers
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noreferrer"
                className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#2B59FF] px-3 py-2 transition-colors"
              >
                Merchant Sign In
              </a>

              <a
                href={`${DASHBOARD_URL}/?mode=signup`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#2B59FF] hover:bg-[#1E40AF] text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_16px_rgba(43,89,255,0.25)] hover:shadow-[0_6px_20px_rgba(43,89,255,0.4)] hover:scale-[1.02]"
              >
                Get Started
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Drawer — original links preserved */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white/98 backdrop-blur-xl pt-24 px-6 overflow-y-auto pb-12 animate-in fade-in duration-200">
          <div className="max-w-md mx-auto space-y-6">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold px-2">
                Payments & Checkout
              </div>
              <Link href="/payment-gateway" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-800">
                <span>Payment Gateway</span>
              </Link>
              <Link href="/qr-codes" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-sm font-bold text-[#2B59FF]">
                <span>Smart QR & PhonePe Exchange</span>
              </Link>
              <Link href="/payment-links" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-800">
                <span>Payment Links & Invoices</span>
              </Link>
              <Link href="/magic-checkout" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-800">
                <span>Magic Checkout (1-Click)</span>
              </Link>
              <Link href="/subscriptions" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-800">
                <span>Subscriptions & Mandates</span>
              </Link>
              <Link href="/optimizer" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-800">
                <span>Optimizer (Routing Engine)</span>
              </Link>
              <Link href="/instant-settlement" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-800">
                <span>Instant Settlement (15s)</span>
              </Link>
              <Link href="/international" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-800">
                <span>International Payments (190+ Countries)</span>
              </Link>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold px-2">
                Tools & Developers
              </div>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-600">
                Pricing (0% Platform Fee)
              </Link>
              <Link href="/tools/gst-calculator" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-600">
                Fee & GST Calculator
              </Link>
              <Link href="/docs" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-600">
                Developers & API Reference
              </Link>
            </div>

            <div className="pt-4 space-y-2.5">
              <a
                href={`${DASHBOARD_URL}/?mode=signup`}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-[#2B59FF] text-white font-semibold text-center block shadow-lg shadow-blue-500/25 text-sm"
              >
                Get Started
              </a>
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-full border border-slate-200 text-slate-700 font-semibold text-center block hover:bg-slate-50 transition-colors text-sm"
              >
                Merchant Sign In
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
