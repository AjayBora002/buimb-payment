import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { Navbar } from './components/Navbar';

export const metadata: Metadata = {
  title: 'BuimbPay — Full Payment Gateway Suite & PhonePe Merchant Exchange QR',
  description:
    'Accept UPI, Cards, NetBanking, and recurring subscriptions with double-entry ledger precision. Built with strict state-machine controls and an end-to-end sandbox.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-['Plus_Jakarta_Sans',sans-serif] bg-[#F8FAFC] text-[#0F172A] min-h-screen flex flex-col antialiased">
        {/* Floating Pill Navbar with original BuimbPay nav */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-1">{children}</div>

        {/* Original BuimbPay Footer — untouched content */}
        <footer className="border-t border-slate-200 bg-[#F8FAFC] text-slate-500 py-16 px-6 text-xs">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Col 1: About & Regulatory */}
            <div className="col-span-2 md:col-span-1 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
                <div className="w-7 h-7 rounded-lg bg-[#2B59FF] flex items-center justify-center text-xs font-black text-white">
                  B
                </div>
                BuimbPay
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                A comprehensive payments suite in India designed to help businesses seamlessly accept, process, and disburse payments across 100+ modes.
              </p>
              <div className="pt-2 flex flex-col gap-1.5 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-[#2B59FF]" />
                  RBI Authorised PA Framework
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  PCI-DSS Level 1 Compliant
                </span>
                <span className="flex items-center gap-1.5 text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#2B59FF]" />
                  ISO/IEC 27001 Certified
                </span>
              </div>
            </div>

            {/* Col 2: Accept Payments */}
            <div>
              <h4 className="text-slate-900 font-bold mb-3 uppercase tracking-wider text-[11px]">Accept Payments</h4>
              <ul className="space-y-2">
                <li><Link href="/payment-gateway" className="hover:text-slate-900 transition-colors">Payment Gateway</Link></li>
                <li><Link href="/international" className="hover:text-slate-900 transition-colors">International Payments</Link></li>
                <li><Link href="/qr-codes" className="hover:text-slate-900 transition-colors text-[#2B59FF] font-semibold">QR Codes (PhonePe Exchange)</Link></li>
                <li><Link href="/magic-checkout" className="hover:text-slate-900 transition-colors">Magic Checkout</Link></li>
                <li><Link href="/payment-links" className="hover:text-slate-900 transition-colors">Payment Links & Pages</Link></li>
                <li><Link href="/subscriptions" className="hover:text-slate-900 transition-colors">Subscriptions & Mandates</Link></li>
                <li><Link href="/optimizer" className="hover:text-slate-900 transition-colors">Optimizer</Link></li>
                <li><Link href="/instant-settlement" className="hover:text-slate-900 transition-colors">Instant Settlements</Link></li>
              </ul>
            </div>

            {/* Col 3: Settlements & In-Store */}
            <div>
              <h4 className="text-slate-900 font-bold mb-3 uppercase tracking-wider text-[11px]">Settlements & In-Store</h4>
              <ul className="space-y-2">
                <li><Link href="/instant-settlement" className="hover:text-slate-900 transition-colors text-[#2B59FF] font-semibold">Instant Settlement (15s)</Link></li>
                <li><Link href="/qr-codes" className="hover:text-slate-900 transition-colors">Smart QR Codes</Link></li>
                <li><Link href="/qr-codes#exchange" className="hover:text-slate-900 transition-colors text-emerald-600 font-semibold">Cash @ POS (ATM)</Link></li>
                <li><Link href="/qr-codes" className="hover:text-slate-900 transition-colors">4G Smart Soundbox</Link></li>
                <li><Link href="/optimizer" className="hover:text-slate-900 transition-colors">Dynamic Fallback Engine</Link></li>
                <li><Link href="/payment-links" className="hover:text-slate-900 transition-colors">WhatsApp & SMS Billing</Link></li>
              </ul>
            </div>

            {/* Col 4: Developers & Tools */}
            <div>
              <h4 className="text-slate-900 font-bold mb-3 uppercase tracking-wider text-[11px]">Developers & Tools</h4>
              <ul className="space-y-2">
                <li><Link href="/docs" className="hover:text-slate-900 transition-colors">API Documentation</Link></li>
                <li><Link href="/docs#sdks" className="hover:text-slate-900 transition-colors">SDKs & Integrations</Link></li>
                <li><Link href="/tools/gst-calculator" className="hover:text-slate-900 transition-colors text-[#2B59FF]">GST Calculator</Link></li>
                <li><Link href="/pricing" className="hover:text-slate-900 transition-colors">Pricing & Fee Estimator</Link></li>
                <li><Link href="/compliance" className="hover:text-slate-900 transition-colors">RBI Compliance Roadmap</Link></li>
                <li><Link href="/security" className="hover:text-slate-900 transition-colors">Security Scope Reduction</Link></li>
              </ul>
            </div>

            {/* Col 5: Company & Legal */}
            <div>
              <h4 className="text-slate-900 font-bold mb-3 uppercase tracking-wider text-[11px]">Company & Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/legal" className="hover:text-slate-900 transition-colors">Terms of Service</Link></li>
                <li><Link href="/legal#privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/compliance" className="hover:text-slate-900 transition-colors">Grievance Redressal</Link></li>
                <li><Link href="/contact" className="hover:text-slate-900 transition-colors">Support & Sales</Link></li>
                <li>
                  <a href="http://localhost:5173" target="_blank" rel="noreferrer" className="text-[#2B59FF] font-semibold hover:underline">
                    Launch Merchant Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
            <div>© {new Date().getFullYear()} Buimb Technologies Private Limited. All rights reserved.</div>
            <div className="text-[11px] text-slate-400 text-center md:text-right">
              Payment aggregation and banking services provided in alignment with scheduled commercial banking partners and RBI Master Directions.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
