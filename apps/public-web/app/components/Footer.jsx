import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import { RazorpayLogo } from './RazorpayLogo';

export function Footer() {
  return (
    <footer className="bg-[#0A1128] text-slate-300 pt-16 pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Top 5-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Col 1: Brand & Security */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <RazorpayLogo size={26} textColor="text-white" showSubtitle />
            <p className="text-slate-400 text-xs leading-relaxed">
              Buimb-Pay is India’s sovereign financial infrastructure platform, powering payments, payouts, business banking, and payroll for 5M+ businesses.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-[11px] font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>PCI-DSS Level 1 · ISO 27001</span>
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
                <Link href="/pos" className="hover:text-blue-400 flex items-center gap-1">
                  Buimb-Pay POS <span className="text-[8px] bg-blue-500/20 text-blue-300 font-bold px-1 rounded">NEW</span>
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
              <li><Link href="/payroll" className="hover:text-blue-400">Buimb-PayX Payroll</Link></li>
            </ul>

            <span className="text-[11px] font-bold text-white uppercase tracking-wider block pt-4">
              Become a Partner
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/partners" className="hover:text-blue-400">Partner Program</Link></li>
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
              <li><Link href="/banking" className="hover:text-blue-400">Buimb-PayX Banking</Link></li>
              <li><Link href="/vendor-payments" className="hover:text-blue-400">Source to Pay</Link></li>
              <li><Link href="/banking" className="hover:text-blue-400">Current Accounts</Link></li>
              <li><Link href="/instant-settlement" className="hover:text-blue-400">Payouts</Link></li>
              <li><Link href="/corporate-cards" className="hover:text-blue-400">Corporate Credit Card</Link></li>
              <li><Link href="/payout-links" className="hover:text-blue-400">Payout Links</Link></li>
              <li><Link href="/bank-verification" className="hover:text-blue-400">Bank Verification</Link></li>
            </ul>

            <span className="text-[11px] font-bold text-white uppercase tracking-wider block pt-4">
              More
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/payment-gateway" className="hover:text-blue-400">Route (Split Pay)</Link></li>
              <li><Link href="/invoices" className="hover:text-blue-400">Invoices</Link></li>
              <li><Link href="/payment-links" className="hover:text-blue-400">Freelancer Payments</Link></li>
              <li><Link href="/international" className="hover:text-blue-400">International Payments</Link></li>
              <li><Link href="/magic-checkout" className="hover:text-blue-400">Flash Checkout</Link></li>
              <li><Link href="/qr-codes" className="hover:text-blue-400">UPI Payments</Link></li>
              <li><Link href="/pay/order_Nx8Y29kLp102" className="hover:text-blue-400">Checkout Demo</Link></li>
            </ul>
          </div>

          {/* Col 4: Developers & Resources & Solutions */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
              Developers
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/docs" className="hover:text-blue-400">Docs</Link></li>
              <li><Link href="/api-reference" className="hover:text-blue-400">Integrations</Link></li>
              <li><Link href="/api-reference" className="hover:text-blue-400">API Reference</Link></li>
            </ul>

            <span className="text-[11px] font-bold text-white uppercase tracking-wider block pt-4">
              Resources
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/blog" className="hover:text-blue-400">Blog</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400">Learn</Link></li>
              <li><Link href="/features" className="hover:text-blue-400">Customer Stories</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400">Events</Link></li>
              <li><Link href="/compliance" className="hover:text-blue-400">Chargeback Guide</Link></li>
              <li><Link href="/instant-settlement" className="hover:text-blue-400">Settlement Guide</Link></li>
            </ul>

            <span className="text-[11px] font-bold text-white uppercase tracking-wider block pt-4">
              Solutions
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/payment-links" className="hover:text-blue-400">Education</Link></li>
              <li><Link href="/magic-checkout" className="hover:text-blue-400">E-commerce</Link></li>
              <li><Link href="/subscriptions" className="hover:text-blue-400">SaaS</Link></li>
              <li><Link href="/compliance" className="hover:text-blue-400">BFSI</Link></li>
            </ul>
          </div>

          {/* Col 5: Free Tools & Company */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
              Free Tools
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/tools/gst-calculator" className="hover:text-blue-400 font-semibold text-blue-300">GST Calculator</Link></li>
              <li><Link href="/tools/gst-calculator" className="hover:text-blue-400">GST Number Search</Link></li>
              <li><Link href="/tools/gst-calculator" className="hover:text-blue-400">GST Search by PAN</Link></li>
              <li>
                <Link href="/tools/roi-calculator" className="hover:text-blue-400 flex items-center gap-1">
                  ROI Calculator <span className="text-[8px] bg-emerald-500/20 text-emerald-300 font-bold px-1 rounded">NEW</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/roi-calculator" className="hover:text-blue-400 flex items-center gap-1">
                  CAGR Calculator <span className="text-[8px] bg-emerald-500/20 text-emerald-300 font-bold px-1 rounded">NEW</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/roi-calculator" className="hover:text-blue-400 flex items-center gap-1">
                  EBITDA Calculator <span className="text-[8px] bg-emerald-500/20 text-emerald-300 font-bold px-1 rounded">NEW</span>
                </Link>
              </li>
            </ul>

            <span className="text-[11px] font-bold text-white uppercase tracking-wider block pt-4">
              Company
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/docs" className="hover:text-blue-400">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400">Careers</Link></li>
              <li><Link href="/legal" className="hover:text-blue-400">Terms of Use</Link></li>
              <li><Link href="/legal" className="hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link href="/legal" className="hover:text-blue-400">Grievance Redressal</Link></li>
              <li><Link href="/security" className="hover:text-blue-400">Responsible Disclosure</Link></li>
              <li><Link href="/partners" className="hover:text-blue-400">Partners</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Address, CIN, Social, RBI Authorised PA */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[11px] text-slate-500">
          <div className="space-y-1">
            <div className="text-slate-400 font-bold">
              Buimb-Pay Payments Private Limited
            </div>
            <div>
              1st Floor, SJR Cyber, 22 Laskar Hosur Road, Adugodi, Bengaluru, 560030, Karnataka, India
            </div>
            <div>
              CIN: U62099KA2024PTC188982 · © Buimb-Pay 2026 All Rights Reserved
            </div>
          </div>

          <div className="text-right space-y-1">
            <div className="text-slate-300 font-semibold">
              Buimb-Pay Payments Private Limited is an RBI Authorised Payment Aggregator
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
