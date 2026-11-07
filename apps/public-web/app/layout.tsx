import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:5173';

export const metadata: Metadata = {
  title: 'Buimb-Pay - Best Payment Solution for Online Payments India',
  description:
    "Online Payments India: Start Accepting Payments Instantly with Buimb-Pay's Payment Suite, which Supports Netbanking, Credit Card & Debit Cards, UPI, Buimb-PayX etc.",
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
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-['Inter',sans-serif] bg-white text-slate-900 min-h-screen flex flex-col antialiased">
        {/* Official Razorpay Sticky Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-1">{children}</div>

        {/* Official Razorpay Mega-Footer */}
        <Footer />
      </body>
    </html>
  );
}
