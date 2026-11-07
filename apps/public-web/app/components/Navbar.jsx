'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CreditCard, QrCode, Link2, RefreshCw, Zap, Globe, ChevronDown, Menu, X, ShieldCheck, Building, ArrowRight, ArrowUpRight, FileText, Receipt, Headphones, Sparkles, Landmark, Briefcase, Store, Calculator, } from 'lucide-react';
import { RazorpayLogo } from './RazorpayLogo';
const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:5173';
export function Navbar() {
    const [activeMenu, setActiveMenu] = useState(null);
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
    return (<>
      {/* ── Top Announcement Banner (Matching Official Screenshot {43673FF8-37F0-4D63-A269-79A3C6AFBC02}.png) ── */}
      <div className="bg-[#EBF3FF] text-[#0C2340] py-2 px-4 text-xs font-medium border-b border-blue-100 select-none">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-bold text-slate-800">Accept International Payments</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 shadow-xs">
              <span className="text-xs">🇩🇪</span> Germany
            </span>
            <span className="text-slate-600 hidden md:inline">
              Global cards, Apple Pay, Google Pay at lower fee.
            </span>
            <Link href="/pricing" className="text-[#0B63E5] hover:text-blue-800 font-bold ml-1 flex items-center gap-0.5">
              Know More
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            {['د.إ', '€', '₹', '£', '$'].map((sym, i) => (<span key={i} className="w-5 h-5 rounded-full bg-blue-600/10 text-blue-700 text-[10px] font-bold flex items-center justify-center border border-blue-200">
                {sym}
              </span>))}
          </div>
        </div>
      </div>

      {/* ── Main Sticky Navbar ── */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-3 px-4 sm:px-8'
            : 'bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8'}`} onMouseLeave={() => setActiveMenu(null)}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group mr-4">
            <RazorpayLogo size={28} textColor="text-[#0C2340]"/>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-6 text-[13px] font-semibold text-[#0C2340]">
            {/* 1. Agentic Stack */}
            <Link href="/optimizer" className="flex items-center gap-1 text-slate-700 hover:text-[#0B63E5] transition-colors group">
              <span>Agentic Stack</span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-blue-50 text-[#0B63E5] border border-blue-200">
                AI
              </span>
            </Link>

            {/* 2. Payments Mega-Menu */}
            <div className="relative" onMouseEnter={() => setActiveMenu('payments')}>
              <button className={`flex items-center gap-1 py-1 transition-colors hover:text-[#0B63E5] cursor-pointer ${activeMenu === 'payments' ? 'text-[#0B63E5]' : 'text-slate-800'}`}>
                <span>Payments</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'payments' ? 'rotate-180 text-[#0B63E5]' : 'text-slate-400'}`}/>
              </button>

              {activeMenu === 'payments' && (<div className="absolute top-full -left-20 mt-3 w-[880px] bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-6 grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-top-2 duration-150 z-50" onMouseEnter={() => setActiveMenu('payments')} onMouseLeave={() => setActiveMenu(null)}>
                  {/* Left Column: Accept Payments Online (7 cols) */}
                  <div className="col-span-7 space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Accept Payments Online
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      <Link href="/payment-gateway" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B63E5] flex items-center justify-center shrink-0 group-hover:bg-[#0B63E5] group-hover:text-white transition-colors">
                          <CreditCard className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-[#0B63E5]">
                            Payment Aggregator
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            Accepting payments made easy
                          </div>
                        </div>
                      </Link>

                      <Link href="/payment-gateway" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Globe className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                            Payment Gateway
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            Website & App checkout
                          </div>
                        </div>
                      </Link>

                      <Link href="/payment-links" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                          <Link2 className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-sky-600">
                            Payment Links
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            Create & send links to collect
                          </div>
                        </div>
                      </Link>

                      <Link href="/payment-pages" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                          <FileText className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-violet-600">
                            Payment Pages
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            Zero-code branded page
                          </div>
                        </div>
                      </Link>

                      <Link href="/qr-codes" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <QrCode className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600">
                            QR Codes
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            Multi-feature QR for business
                          </div>
                        </div>
                      </Link>

                      <Link href="/magic-checkout" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                          <Zap className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-amber-600 flex items-center gap-1">
                            Magic Checkout
                            <span className="text-[8px] bg-emerald-100 text-emerald-800 font-bold px-1 rounded">NEW</span>
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            Boost conversions & stop RTO
                          </div>
                        </div>
                      </Link>

                      <Link href="/subscriptions" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                          <RefreshCw className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-teal-600">
                            Subscriptions
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            UPI AutoPay & eNACH mandates
                          </div>
                        </div>
                      </Link>

                      <Link href="/instant-settlement" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                          <ArrowUpRight className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-rose-600">
                            Instant Settlement
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            On-demand T+0 bank payout
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Accept Payments Offline
                      </span>
                      <Link href="/qr-codes" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                          <Store className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-cyan-600">
                            Buimb-Pay POS & Soundbox
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            Smart Android POS devices & audio announcements
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Global & Omnichannel (5 cols) */}
                  <div className="col-span-5 border-l border-slate-100 pl-6 space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Accept International Payments
                      </span>
                      <div className="space-y-2">
                        <Link href="/pricing" onClick={() => setActiveMenu(null)} className="block p-2 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="text-xs font-bold text-slate-900">International Payments</div>
                          <div className="text-[10px] text-slate-500">Accept global cards & Apple Pay</div>
                        </Link>
                        <Link href="/pricing" onClick={() => setActiveMenu(null)} className="block p-2 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="text-xs font-bold text-slate-900">International Bank Transfers</div>
                          <div className="text-[10px] text-slate-500">Accept USD, GBP, EUR directly</div>
                        </Link>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Built for Global Businesses
                      </span>
                      <Link href="/pricing" onClick={() => setActiveMenu(null)} className="block p-2 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          Accept Payments from India
                          <span className="text-[8px] bg-blue-100 text-blue-700 font-bold px-1 rounded">NEW</span>
                        </div>
                        <div className="text-[10px] text-slate-500">Seamless INR collection via UPI</div>
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        All-in-One Payments
                      </span>
                      <Link href="/payment-gateway" onClick={() => setActiveMenu(null)} className="block p-2 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          Omnichannel Payments
                          <span className="text-[8px] bg-purple-100 text-purple-700 font-bold px-1 rounded">NEW</span>
                        </div>
                        <div className="text-[10px] text-slate-500">One unified platform for web, app & store</div>
                      </Link>
                    </div>
                  </div>
                </div>)}
            </div>

            {/* 3. Banking+ (Buimb-PayX) Mega-Menu */}
            <div className="relative" onMouseEnter={() => setActiveMenu('banking')}>
              <button className={`flex items-center gap-1 py-1 transition-colors hover:text-[#0B63E5] cursor-pointer ${activeMenu === 'banking' ? 'text-[#0B63E5]' : 'text-slate-800'}`}>
                <span>Banking+</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-blue-50 text-[#0B63E5] font-bold border border-blue-200">
                  Buimb-PayX
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'banking' ? 'rotate-180 text-[#0B63E5]' : 'text-slate-400'}`}/>
              </button>

              {activeMenu === 'banking' && (<div className="absolute top-full -left-48 mt-3 w-[880px] bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-6 grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-top-2 duration-150 z-50" onMouseEnter={() => setActiveMenu('banking')} onMouseLeave={() => setActiveMenu(null)}>
                  {/* Left Column: Business Banking Plus (8 cols) */}
                  <div className="col-span-8 space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Business Banking Plus
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      <Link href="/banking" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B63E5] flex items-center justify-center shrink-0 group-hover:bg-[#0B63E5] group-hover:text-white transition-colors">
                          <Building className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-[#0B63E5]">
                            Buimb-PayX Current Account
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            Supercharged for modern businesses
                          </div>
                        </div>
                      </Link>

                      <Link href="/compliance" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Receipt className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 flex items-center gap-1">
                            Vendor Payments
                            <span className="text-[8px] bg-emerald-100 text-emerald-800 font-bold px-1 rounded">NEW</span>
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            Automated accounts payable
                          </div>
                        </div>
                      </Link>

                      <Link href="/instant-settlement" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <ArrowUpRight className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600">
                            Payouts (24×7 Instant)
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            IMPS, NEFT, RTGS & UPI rails
                          </div>
                        </div>
                      </Link>

                      <Link href="/instant-settlement" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                          <Link2 className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-sky-600">
                            Payout Links
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            Send payouts without bank details
                          </div>
                        </div>
                      </Link>

                      <Link href="/compliance" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                          <ShieldCheck className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-teal-600 flex items-center gap-1">
                            Bank Verification
                            <span className="text-[8px] bg-emerald-100 text-emerald-800 font-bold px-1 rounded">₹1 PENNY</span>
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            Penny drop bank & VPA verify
                          </div>
                        </div>
                      </Link>

                      <Link href="/banking" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          <CreditCard className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-purple-600 flex items-center gap-1">
                            Corporate Cards
                            <span className="text-[8px] bg-blue-100 text-blue-700 font-bold px-1 rounded">SMART</span>
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            Streamline expenses with limits
                          </div>
                        </div>
                      </Link>

                      <Link href="/compliance" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                          <Calculator className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-amber-600">
                            Tax Payments & TDS
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            Pay taxes in under 30 seconds
                          </div>
                        </div>
                      </Link>

                      <Link href="/banking" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                          <Landmark className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-rose-600 flex items-center gap-1">
                            Escrow+ Account
                            <span className="text-[8px] bg-purple-100 text-purple-800 font-bold px-1 rounded">NEW</span>
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            For digital-first businesses
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Start Your Business (4 cols) */}
                  <div className="col-span-4 border-l border-slate-100 pl-6 space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Start Your Business
                      </span>
                      <Link href="/startup-perks" onClick={() => setActiveMenu(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B63E5] flex items-center justify-center shrink-0">
                          <Briefcase className="w-4 h-4"/>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-[#0B63E5]">
                            Company Registration
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight">
                            Incorporate Pvt Ltd, LLP in days
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Startup Benefits
                      </span>
                      <Link href="/startup-perks" onClick={() => setActiveMenu(null)} className="block p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:border-blue-200 transition-colors">
                        <div className="text-xs font-bold text-blue-900 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500"/>
                          ₹50L+ Startup Perks
                        </div>
                        <div className="text-[10px] text-blue-700 mt-1 leading-tight">
                          Cloud credits, tool discounts, and 24x7 founder support.
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>)}
            </div>

            {/* 4. Payroll Dropdown */}
            <div className="relative" onMouseEnter={() => setActiveMenu('payroll')}>
              <button className={`flex items-center gap-1 py-1 transition-colors hover:text-[#0B63E5] cursor-pointer ${activeMenu === 'payroll' ? 'text-[#0B63E5]' : 'text-slate-800'}`}>
                <span>Payroll</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'payroll' ? 'rotate-180 text-[#0B63E5]' : 'text-slate-400'}`}/>
              </button>

              {activeMenu === 'payroll' && (<div className="absolute top-full left-0 mt-3 w-[260px] bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 p-3 space-y-1 z-50 animate-in fade-in slide-in-from-top-1" onMouseEnter={() => setActiveMenu('payroll')} onMouseLeave={() => setActiveMenu(null)}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2 py-1">
                    Automated Payroll
                  </span>
                  <Link href="/payroll" onClick={() => setActiveMenu(null)} className="block px-3 py-2 rounded-lg hover:bg-slate-50 text-xs font-bold text-slate-800 hover:text-[#0B63E5]">
                    For Startups & SMEs
                  </Link>
                  <Link href="/payroll" onClick={() => setActiveMenu(null)} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 text-xs font-bold text-slate-800 hover:text-[#0B63E5]">
                    <span>For Enterprises</span>
                    <span className="text-[8px] bg-emerald-100 text-emerald-800 font-bold px-1 rounded">NEW</span>
                  </Link>
                </div>)}
            </div>

            {/* 5. Engage */}
            <Link href="/magic-checkout" className="hover:text-[#0B63E5] text-slate-800 transition-colors">
              Engage
            </Link>

            {/* 6. Partners Dropdown */}
            <div className="relative" onMouseEnter={() => setActiveMenu('partners')}>
              <button className={`flex items-center gap-1 py-1 transition-colors hover:text-[#0B63E5] cursor-pointer ${activeMenu === 'partners' ? 'text-[#0B63E5]' : 'text-slate-800'}`}>
                <span>Partners</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'partners' ? 'rotate-180 text-[#0B63E5]' : 'text-slate-400'}`}/>
              </button>

              {activeMenu === 'partners' && (<div className="absolute top-full left-0 mt-3 w-[240px] bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 p-3 space-y-1 z-50 animate-in fade-in slide-in-from-top-1" onMouseEnter={() => setActiveMenu('partners')} onMouseLeave={() => setActiveMenu(null)}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2 py-1">
                    Partnership Programs
                  </span>
                  <Link href="/pricing" onClick={() => setActiveMenu(null)} className="block px-3 py-2 rounded-lg hover:bg-slate-50 text-xs font-bold text-slate-800 hover:text-[#0B63E5]">
                    Partner Program
                  </Link>
                  <Link href="/banking" onClick={() => setActiveMenu(null)} className="block px-3 py-2 rounded-lg hover:bg-slate-50 text-xs font-bold text-slate-800 hover:text-[#0B63E5]">
                    Buimb-PayX Partners
                  </Link>
                  <Link href="/pricing" onClick={() => setActiveMenu(null)} className="block px-3 py-2 rounded-lg hover:bg-slate-50 text-xs font-bold text-slate-800 hover:text-[#0B63E5]">
                    Refer & Earn
                  </Link>
                </div>)}
            </div>

            {/* 7. Startups */}
            <Link href="/startup-perks" className={`hover:text-[#0B63E5] transition-colors ${pathname === '/startup-perks' ? 'text-[#0B63E5]' : 'text-slate-800'}`}>
              Startups
            </Link>

            {/* 8. Resources Mega-Menu */}
            <div className="relative" onMouseEnter={() => setActiveMenu('resources')}>
              <button className={`flex items-center gap-1 py-1 transition-colors hover:text-[#0B63E5] cursor-pointer ${activeMenu === 'resources' ? 'text-[#0B63E5]' : 'text-slate-800'}`}>
                <span>Resources</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'resources' ? 'rotate-180 text-[#0B63E5]' : 'text-slate-400'}`}/>
              </button>

              {activeMenu === 'resources' && (<div className="absolute top-full -left-80 mt-3 w-[840px] bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-6 grid grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2 duration-150 z-50" onMouseEnter={() => setActiveMenu('resources')} onMouseLeave={() => setActiveMenu(null)}>
                  {/* Awareness */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Awareness
                    </span>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      <Link href="/docs" className="block hover:text-[#0B63E5]">Blog</Link>
                      <Link href="/docs" className="block hover:text-[#0B63E5]">Learn</Link>
                      <Link href="/docs" className="block hover:text-[#0B63E5]">Events</Link>
                      <Link href="/docs" className="block hover:text-[#0B63E5]">White Papers</Link>
                      <Link href="/docs" className="block hover:text-[#0B63E5]">Customer Stories</Link>
                    </div>
                  </div>

                  {/* Developers */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Developers
                    </span>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      <Link href="/docs" className="block hover:text-[#0B63E5]">Developer Docs</Link>
                      <Link href="/docs" className="block hover:text-[#0B63E5]">Integrations</Link>
                      <Link href="/docs" className="block hover:text-[#0B63E5]">API Reference</Link>
                      <Link href="/docs" className="block hover:text-[#0B63E5]">API Playground</Link>
                      <Link href="/docs" className="block hover:text-[#0B63E5]">Onboarding APIs</Link>
                    </div>
                  </div>

                  {/* Solutions */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Solutions
                    </span>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      <Link href="/pricing" className="block hover:text-[#0B63E5]">SaaS</Link>
                      <Link href="/pricing" className="block hover:text-[#0B63E5]">E-Commerce</Link>
                      <Link href="/pricing" className="block hover:text-[#0B63E5]">Education</Link>
                      <Link href="/pricing" className="block hover:text-[#0B63E5]">BFSI</Link>
                      <Link href="/pricing" className="block hover:text-[#0B63E5]">Freelance</Link>
                    </div>
                  </div>

                  {/* Free Tools */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Free Tools
                    </span>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      <Link href="/tools/gst-calculator" className="block font-semibold text-[#0B63E5] hover:underline">GST Calculator</Link>
                      <Link href="/compliance" className="block hover:text-[#0B63E5]">Online TDS Payment</Link>
                      <Link href="/compliance" className="block hover:text-[#0B63E5]">GST Number Search</Link>
                      <Link href="/compliance" className="block hover:text-[#0B63E5]">GST Search by PAN</Link>
                      <Link href="/pricing" className="block hover:text-[#0B63E5]">ROI Calculator</Link>
                      <Link href="/pricing" className="block hover:text-[#0B63E5]">CAGR Calculator</Link>
                      <Link href="/pricing" className="block hover:text-[#0B63E5]">EBITDA Calculator</Link>
                    </div>
                  </div>
                </div>)}
            </div>

            {/* 9. Pricing */}
            <Link href="/pricing" className={`hover:text-[#0B63E5] transition-colors ${pathname === '/pricing' ? 'text-[#0B63E5]' : 'text-slate-800'}`}>
              Pricing
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Support icon */}
            <Link href="/docs" className="hidden lg:flex p-2 text-slate-600 hover:text-[#0B63E5] rounded-full hover:bg-slate-100 transition-colors" title="24x7 Customer Support">
              <Headphones className="w-4 h-4"/>
            </Link>

            {/* India Flag & Currency Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors">
              <span>🇮🇳</span>
              <ChevronDown className="w-3 h-3 text-slate-400"/>
            </div>

            {/* Login Button (White outline with blue text) */}
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="text-xs sm:text-sm font-bold text-[#0B63E5] border border-[#0B63E5] hover:bg-blue-50/60 px-4 py-2 rounded-lg transition-all">
              Login
            </a>

            {/* Sign Up Button (Solid Blue Pill) */}
            <Link href="/signup" className="bg-[#0B63E5] hover:bg-[#0951bd] text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-lg transition-all shadow-md shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-[1.02] flex items-center gap-1.5">
              <span>Sign Up</span>
              <ArrowRight className="w-3.5 h-3.5"/>
            </Link>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors" aria-label="Toggle navigation menu">
              {mobileMenuOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (<div className="xl:hidden fixed inset-0 z-40 bg-white text-slate-800 pt-24 px-6 overflow-y-auto pb-12 animate-in fade-in duration-150 border-t border-slate-200">
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider px-2">
              Accept Payments Online
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link href="/payment-gateway" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50">Payment Gateway</Link>
              <Link href="/payment-links" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50">Payment Links</Link>
              <Link href="/payment-pages" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50">Payment Pages</Link>
              <Link href="/magic-checkout" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50 text-blue-600">Magic Checkout</Link>
              <Link href="/subscriptions" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50">Subscriptions</Link>
              <Link href="/instant-settlement" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50">Instant Settlements</Link>
              <Link href="/smart-collect" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50">Smart Collect (VAN)</Link>
              <Link href="/qr-codes" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50">Smart QR & POS</Link>
            </div>

            <div className="pt-3 border-t border-slate-200 text-[11px] font-bold text-blue-600 uppercase tracking-wider px-2">
              Banking+ (Buimb-PayX)
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link href="/banking" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50">Current Account</Link>
              <Link href="/instant-settlement" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50">Instant Payouts</Link>
              <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50">Vendor Payments</Link>
              <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-slate-50 text-emerald-700">₹1 Penny Verify</Link>
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2 text-sm font-semibold">
              <Link href="/payroll" onClick={() => setMobileMenuOpen(false)} className="p-2 hover:text-blue-600">Payroll</Link>
              <Link href="/startup-perks" onClick={() => setMobileMenuOpen(false)} className="p-2 hover:text-blue-600">Startup Perks (₹50L+)</Link>
              <Link href="/tools/gst-calculator" onClick={() => setMobileMenuOpen(false)} className="p-2 hover:text-blue-600">Free GST Calculator</Link>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="p-2 hover:text-blue-600">Pricing</Link>
              <Link href="/docs" onClick={() => setMobileMenuOpen(false)} className="p-2 hover:text-blue-600">Developer Documentation</Link>
            </div>

            <div className="pt-4 space-y-2">
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 rounded-lg bg-[#0B63E5] text-white font-bold text-center block text-sm shadow-md">
                Sign Up Now →
              </Link>
              <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="w-full py-3 rounded-lg border border-slate-300 text-slate-800 font-bold text-center block hover:bg-slate-50 text-sm">
                Login
              </a>
            </div>
          </div>
        </div>)}
    </>);
}
