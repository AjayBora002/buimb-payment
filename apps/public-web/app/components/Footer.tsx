'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { RazorpayLogo } from './RazorpayLogo';

export function Footer() {
  return (
    <footer className="w-full bg-[#0C1A30] text-slate-300 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs font-sans select-none antialiased">
      <div className="max-w-7xl mx-auto">
        {/* Main 6-Column Grid matching Official Razorpay Mega-Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Brand Info & Compliance Badges */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-6">
            <RazorpayLogo size={32} textColor="text-white" />

            <p className="text-[11px] text-slate-400 leading-relaxed">
              A comprehensive payments suite in India designed to help businesses seamlessly accept, process, and disburse payments. It gives you access to all payment modes including credit card, debit card, netbanking, UPI and popular wallets including JioMoney, Mobikwik, Airtel Money, FreeCharge, Ola Money and PayZapp.
            </p>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              RazorpayX supercharges your business banking experience, bringing effectiveness, efficiency, and excellence to all financial processes. With RazorpayX, businesses can get access to fully-functional current accounts, supercharge their payouts and automate payroll compliance.
            </p>

            <div className="text-[10px] text-slate-500 leading-normal pt-2">
              Disclaimer: The RazorpayX powered Current Account and VISA corporate credit card are provided by RBI licensed banks. Your RazorpayX powered current account is provided by our partner banks i.e, ICICI, RBL, Yes bank, in accordance with RBI regulations.
            </div>

            {/* Certifications Badges */}
            <div className="flex items-center gap-3 pt-3 flex-wrap">
              <div className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-[10px] font-bold text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                PCI-DSS Level 1
              </div>
              <div className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-[10px] font-bold text-slate-200 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                ISO/IEC 27001
              </div>
              <div className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-[10px] font-bold text-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                AICPA SOC 2
              </div>
            </div>
          </div>

          {/* Col 2: Accept Payments */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
              Accept Payments
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/payment-gateway" className="hover:text-blue-400">Payment Aggregator</Link></li>
              <li><Link href="/payment-gateway" className="hover:text-blue-400">Payment Gateway</Link></li>
              <li><Link href="/payment-pages" className="hover:text-blue-400">Payment Pages</Link></li>
              <li><Link href="/payment-links" className="hover:text-blue-400">Payment Links</Link></li>
              <li>
                <Link href="/qr-codes" className="hover:text-blue-400 flex items-center gap-1">
                  Razorpay POS <span className="text-[8px] bg-blue-500/20 text-blue-300 font-bold px-1 rounded">NEW</span>
                </Link>
              </li>
              <li><Link href="/qr-codes" className="hover:text-blue-400">QR Codes</Link></li>
              <li><Link href="/subscriptions" className="hover:text-blue-400">Subscriptions</Link></li>
              <li><Link href="/smart-collect" className="hover:text-blue-400">Smart Collect</Link></li>
              <li><Link href="/optimizer" className="hover:text-blue-400">Optimizer</Link></li>
              <li><Link href="/instant-settlement" className="hover:text-blue-400">Instant Settlements</Link></li>
            </ul>

            <span className="text-[11px] font-bold text-white uppercase tracking-wider block pt-4">
              Payroll
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/payroll" className="hover:text-blue-400">RazorpayX Payroll</Link></li>
            </ul>

            <span className="text-[11px] font-bold text-white uppercase tracking-wider block pt-4">
              Become a Partner
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/pricing" className="hover:text-blue-400">Refer and Earn</Link></li>
              <li><Link href="/docs" className="hover:text-blue-400">Onboarding APIs</Link></li>
            </ul>
          </div>

          {/* Col 3: More & Banking Plus */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
              Banking Plus
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/banking" className="hover:text-blue-400">RazorpayX</Link></li>
              <li><Link href="/compliance" className="hover:text-blue-400">Source to pay</Link></li>
              <li><Link href="/banking" className="hover:text-blue-400">Current Accounts</Link></li>
              <li><Link href="/instant-settlement" className="hover:text-blue-400">Payouts</Link></li>
              <li><Link href="/instant-settlement" className="hover:text-blue-400">Payout Links</Link></li>
              <li><Link href="/banking" className="hover:text-blue-400">Corporate Credit Card</Link></li>
            </ul>

            <span className="text-[11px] font-bold text-white uppercase tracking-wider block pt-4">
              More
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/payment-gateway" className="hover:text-blue-400">Route (Split Pay)</Link></li>
              <li><Link href="/invoices" className="hover:text-blue-400">Invoices</Link></li>
              <li><Link href="/payment-links" className="hover:text-blue-400">Freelancer Payments</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-400">International Payments</Link></li>
              <li><Link href="/magic-checkout" className="hover:text-blue-400">Flash Checkout</Link></li>
              <li><Link href="/qr-codes" className="hover:text-blue-400">UPI Payments</Link></li>
              <li><Link href="/qr-codes" className="hover:text-blue-400">ePOS</Link></li>
              <li><Link href="/payment-gateway" className="hover:text-blue-400">Checkout Demo</Link></li>
            </ul>
          </div>

          {/* Col 4: Developers & Resources & Solutions */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
              Developers
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/docs" className="hover:text-blue-400">Docs</Link></li>
              <li><Link href="/docs" className="hover:text-blue-400">Integrations</Link></li>
              <li><Link href="/docs" className="hover:text-blue-400">API Reference</Link></li>
            </ul>

            <span className="text-[11px] font-bold text-white uppercase tracking-wider block pt-4">
              Resources
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/docs" className="hover:text-blue-400">Blog</Link></li>
              <li><Link href="/docs" className="hover:text-blue-400">Learn</Link></li>
              <li><Link href="/docs" className="hover:text-blue-400">Customer Stories</Link></li>
              <li><Link href="/docs" className="hover:text-blue-400">Events</Link></li>
              <li><Link href="/compliance" className="hover:text-blue-400">Chargeback Guide</Link></li>
              <li><Link href="/instant-settlement" className="hover:text-blue-400">Settlement Guide</Link></li>
            </ul>

            <span className="text-[11px] font-bold text-white uppercase tracking-wider block pt-4">
              Solutions
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/pricing" className="hover:text-blue-400">Education</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-400">E-commerce</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-400">SaaS</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-400">BFSI</Link></li>
            </ul>
          </div>

          {/* Col 5: Free Tools & Company */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
              Free Tools
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/tools/gst-calculator" className="hover:text-blue-400 font-semibold text-blue-300">GST Calculator</Link></li>
              <li><Link href="/compliance" className="hover:text-blue-400">GST Number Search</Link></li>
              <li><Link href="/compliance" className="hover:text-blue-400">GST Search by PAN</Link></li>
              <li>
                <Link href="/pricing" className="hover:text-blue-400 flex items-center gap-1">
                  ROI Calculator <span className="text-[8px] bg-emerald-500/20 text-emerald-300 font-bold px-1 rounded">NEW</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-400 flex items-center gap-1">
                  CAGR Calculator <span className="text-[8px] bg-emerald-500/20 text-emerald-300 font-bold px-1 rounded">NEW</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-400 flex items-center gap-1">
                  EBITDA Calculator <span className="text-[8px] bg-emerald-500/20 text-emerald-300 font-bold px-1 rounded">NEW</span>
                </Link>
              </li>
            </ul>

            <span className="text-[11px] font-bold text-white uppercase tracking-wider block pt-4">
              Company
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/docs" className="hover:text-blue-400">About Us</Link></li>
              <li><Link href="/docs" className="hover:text-blue-400">Careers</Link></li>
              <li><Link href="/compliance" className="hover:text-blue-400">Terms of Use</Link></li>
              <li><Link href="/compliance" className="hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link href="/compliance" className="hover:text-blue-400">Grievance Redressal</Link></li>
              <li><Link href="/compliance" className="hover:text-blue-400">Responsible Disclosure</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-400">Partners</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Address, CIN, Social, RBI Authorised PA */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[11px] text-slate-500">
          <div className="space-y-1">
            <div className="text-slate-400 font-bold">
              Razorpay Payments Private Limited
            </div>
            <div>
              1st Floor, SJR Cyber, 22 Laskar Hosur Road, Adugodi, Bengaluru, 560030, Karnataka, India
            </div>
            <div>
              CIN: U62099KA2024PTC188982 · © Razorpay 2026 All Rights Reserved
            </div>
          </div>

          <div className="text-right space-y-1">
            <div className="text-slate-300 font-semibold">
              Razorpay Payments Private Limited is an RBI Authorised Payment Aggregator
            </div>
            <div className="text-[10px] text-slate-500">
              BuimbPay Enterprise Infrastructure Engine · 99.98% Gateway SLA
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
