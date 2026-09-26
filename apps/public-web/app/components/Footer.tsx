'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, ArrowUpRight, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';
import { FinoraLogo } from './FinoraLogo';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="w-full bg-[#F8FAFC] py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Massive subtle Finora spiral watermark in background */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.03] select-none">
        <FinoraLogo size={700} color="#0A1128" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Floating Footer Card matching Screenshot 5 */}
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-slate-100 shadow-[0_20px_60px_rgba(15,23,42,0.06)] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          {/* Floating 3D glossy royal blue badge in top right (as seen in Screenshot 5) */}
          <div className="absolute top-6 right-8 sm:top-10 sm:right-12 hidden md:block">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#3B66FF] to-[#1A45E5] shadow-[0_12px_28px_rgba(43,89,255,0.35)] flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform duration-500 cursor-pointer">
              <FinoraLogo size={36} color="#FFFFFF" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            {/* Left Column: Signature Royal Blue Card */}
            <div className="lg:col-span-5 bg-[#2B59FF] text-white p-7 sm:p-9 rounded-2xl sm:rounded-3xl shadow-[0_16px_36px_rgba(43,89,255,0.3)] flex flex-col justify-between min-h-[340px] relative overflow-hidden group">
              {/* Background glow & subtle accent circle */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Brand Logo & Name */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <FinoraLogo size={26} color="#FFFFFF" />
                  </div>
                  <div>
                    <span className="text-2xl font-black tracking-tight block leading-none">Finora</span>
                    <span className="text-[11px] text-white/70 font-medium">By BuimbPay Technologies</span>
                  </div>
                </div>

                <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-sm">
                  The unified finance platform engineered for modern investors, startups, and payment infrastructure. Built with double-entry precision and bank-grade security.
                </p>
              </div>

              {/* Contact info matching screenshot 5 */}
              <div className="pt-8 space-y-3 relative z-10 text-xs sm:text-sm text-white/90">
                <a
                  href="mailto:help@finora.com"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-white/70 shrink-0" />
                  <span>help@finora.com</span>
                  <span className="text-white/40">/</span>
                  <span className="text-white/70">support@buimbpay.com</span>
                </a>

                <a
                  href="tel:+6281234567890"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-white/70 shrink-0" />
                  <span>+62 812-3456-7890</span>
                  <span className="text-white/40">/</span>
                  <span className="text-white/70">1800-BUIMB-PAY</span>
                </a>
              </div>
            </div>

            {/* Right Columns: Solutions, Resources, and Newsletter */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8 sm:pl-4">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 text-sm">
                {/* Solutions Links matching screenshot 5 */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                    Solutions
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    <li>
                      <Link href="/pricing" className="hover:text-[#2B59FF] transition-colors">
                        For Individual Investors
                      </Link>
                    </li>
                    <li>
                      <Link href="/pricing" className="hover:text-[#2B59FF] transition-colors">
                        For Professionals
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:text-[#2B59FF] transition-colors">
                        For Financial Advisors
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:text-[#2B59FF] transition-colors">
                        For Businesses
                      </Link>
                    </li>
                    <li className="pt-2 border-t border-slate-100">
                      <Link href="/payment-gateway" className="hover:text-[#2B59FF] transition-colors text-slate-700 font-medium">
                        Payment Gateway
                      </Link>
                    </li>
                    <li>
                      <Link href="/qr-codes" className="hover:text-[#2B59FF] transition-colors text-slate-700 font-medium">
                        Smart QR & POS
                      </Link>
                    </li>
                    <li>
                      <Link href="/instant-settlement" className="hover:text-[#2B59FF] transition-colors text-slate-700 font-medium">
                        Instant Settlements
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Resources Links matching screenshot 5 */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                    Resources
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    <li>
                      <Link href="/docs" className="hover:text-[#2B59FF] transition-colors">
                        Resources & Docs
                      </Link>
                    </li>
                    <li>
                      <a href="#faq" className="hover:text-[#2B59FF] transition-colors">
                        FAQ
                      </a>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:text-[#2B59FF] transition-colors">
                        Contact Us
                      </Link>
                    </li>
                    <li className="pt-2 border-t border-slate-100">
                      <Link href="/tools/gst-calculator" className="hover:text-[#2B59FF] transition-colors text-slate-700 font-medium">
                        Fee & GST Calculator
                      </Link>
                    </li>
                    <li>
                      <Link href="/compliance" className="hover:text-[#2B59FF] transition-colors text-slate-700 font-medium">
                        RBI Compliance Roadmap
                      </Link>
                    </li>
                    <li>
                      <Link href="/security" className="hover:text-[#2B59FF] transition-colors text-slate-700 font-medium">
                        Security & PCI-DSS Scope
                      </Link>
                    </li>
                    <li>
                      <Link href="/legal" className="hover:text-[#2B59FF] transition-colors">
                        Terms & Privacy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Newsletter subscription box matching Screenshot 5 */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="text-xs text-slate-500">
                    © 2026 Pylus Studio / BuimbPay Technologies. All rights reserved.
                  </div>

                  <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm w-full">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2B59FF] focus:bg-white transition-all"
                    />
                    <button
                      type="submit"
                      className="bg-[#2B59FF] hover:bg-[#1E40AF] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm shrink-0"
                    >
                      {subscribed ? 'Subscribed!' : 'Subscribe'}
                    </button>
                  </form>
                </div>

                <div className="text-[11px] text-slate-400 leading-relaxed">
                  Payment aggregation, treasury and banking services provided in alignment with scheduled commercial banking partners and RBI Master Directions.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
