'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Zap,
  ShieldCheck,
  Code2,
  Lock,
  CheckCircle2,
  RefreshCw,
  Layers,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Smartphone,
  Building,
  GitFork,
  Link2,
  QrCode,
  FileText,
  Copy,
  Users,
  Check,
  TrendingUp,
  Store,
  DollarSign,
  Briefcase,
  HelpCircle,
  Calculator,
  Search,
  Receipt,
  Headphones,
  BadgePercent,
  Split,
  Percent,
  ExternalLink,
} from 'lucide-react';

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:5173';

export default function HomePage() {
  // Recommendation Selector State (Matching Reference {43673FF8-37F0-4D63-A269-79A3C6AFBC02}.png)
  const [needHelpChoice, setNeedHelpChoice] = useState<
    'accept' | 'payouts' | 'banking' | 'credit' | 'payroll' | 'other'
  >('accept');

  // Interactive Product Tab
  const [activeTab, setActiveTab] = useState<
    | 'gateway'
    | 'magic'
    | 'route'
    | 'links'
    | 'pages'
    | 'subscriptions'
    | 'smart-collect'
    | 'optimizer'
    | 'payouts'
    | 'verify'
    | 'cards'
  >('gateway');

  const [simUpiActive, setSimUpiActive] = useState<boolean>(true);
  const [activeCodeTab, setActiveCodeTab] = useState<'nodejs' | 'python' | 'curl' | 'php' | 'java'>('nodejs');
  const [volumeSlider, setVolumeSlider] = useState<number>(500000);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Quick Calculator State
  const [calcAmount, setCalcAmount] = useState<number>(10000);
  const [calcGstRate, setCalcGstRate] = useState<number>(18);

  const codeSnippets = {
    nodejs: `const Razorpay = require('razorpay');

const instance = new Razorpay({
  key_id: 'rzp_test_Nx8Y29kLp102',
  key_secret: 'YOUR_KEY_SECRET',
});

// Create Order for standard Razorpay checkout
const order = await instance.orders.create({
  amount: 450000, // amount in paise (₹4,500.00)
  currency: 'INR',
  receipt: 'receipt_order_7719',
  notes: {
    customer_name: 'Priya Sharma',
    service: 'Pro Annual Cloud Subscription',
  },
});`,
    python: `import razorpay

client = razorpay.Client(auth=("rzp_test_Nx8Y29kLp102", "YOUR_KEY_SECRET"))

# Create Order for standard Razorpay checkout
order = client.order.create({
    'amount': 450000, # amount in paise
    'currency': 'INR',
    'receipt': 'receipt_order_7719',
    'notes': {
        'customer_name': 'Priya Sharma',
        'service': 'Pro Annual Cloud Subscription'
    }
})`,
    curl: `curl -u rzp_test_Nx8Y29kLp102:YOUR_KEY_SECRET \\
  -X POST https://api.razorpay.com/v1/orders \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 450000,
    "currency": "INR",
    "receipt": "receipt_order_7719",
    "notes": {
      "customer_name": "Priya Sharma"
    }
  }'`,
    php: `$api = new Razorpay\\Api\\Api('rzp_test_Nx8Y29kLp102', 'YOUR_KEY_SECRET');

$order = $api->order->create([
    'amount'   => 450000,
    'currency' => 'INR',
    'receipt'  => 'receipt_order_7719'
]);`,
    java: `RazorpayClient razorpay = new RazorpayClient("rzp_test_Nx8Y29kLp102", "YOUR_KEY_SECRET");

JSONObject orderRequest = new JSONObject();
orderRequest.put("amount", 450000);
orderRequest.put("currency", "INR");
orderRequest.put("receipt", "receipt_order_7719");

Order order = razorpay.orders.create(orderRequest);`,
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeCodeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const faqs = [
    {
      q: 'What is Razorpay and how does it work for my business?',
      a: 'Razorpay is India’s leading full-stack payment gateway & business banking platform. It enables merchants to accept payments across 100+ payment methods including UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards (Visa, Mastercard, RuPay), Net Banking (50+ banks), and Wallets with 99.98% gateway uptime.',
    },
    {
      q: 'What is RazorpayX and how are instant payouts executed?',
      a: 'RazorpayX is our modern business banking platform that provides digital Current Accounts with partner scheduled banks, 24x7 instant automated payouts via IMPS/NEFT/UPI in 15 seconds, smart corporate expense cards with spend controls, automated vendor invoice payments, and ₹1 penny drop bank verification.',
    },
    {
      q: 'What is Razorpay Route and how do marketplace splits work?',
      a: 'Razorpay Route automates split payments for multi-vendor marketplaces. When a buyer pays, Route instantly deducts your platform commission and transfers the seller’s share to their linked bank account, eliminating manual reconciliations and accounting errors.',
    },
    {
      q: 'What is Magic Checkout and how does it prevent COD RTO fraud?',
      a: 'Magic Checkout provides a 1-click checkout experience with 50M+ pre-filled Indian addresses, speeding up checkout by 5x. Its built-in AI machine learning model scores the Return-to-Origin (RTO) risk of COD orders and lets you automatically restrict high-risk COD orders or incentivize UPI prepayment with ₹50 discounts.',
    },
    {
      q: 'How fast are settlements credited to my bank account?',
      a: 'Standard settlements are credited on a T+1 business day cycle. With Razorpay Instant Settlements, merchants can access their funds in 15 seconds, 24x7x365, even on bank holidays and weekends with immediate IMPS UTR generation.',
    },
    {
      q: 'What documents are required for instant merchant onboarding and KYC?',
      a: 'To activate live payments, submit your Business PAN, Company Incorporation or GSTIN certificate, and an active Bank Current Account. Digital penny drop verification is completed in real-time, enabling you to accept payments on day one.',
    },
  ];

  return (
    <div className="w-full bg-white text-slate-900 overflow-hidden font-sans select-none antialiased">
      {/* ── 1. Hero Section ──────────────────────── */}
      <section className="relative pt-12 pb-20 md:pb-28 px-4 sm:px-6 bg-gradient-to-b from-[#0C2340] via-[#0A1B33] to-[#071328] text-white overflow-hidden border-b border-slate-800">
        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-blue-600/15 rounded-full blur-[140px]" />
          <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          <div className="text-center max-w-4xl mx-auto space-y-5">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-md text-xs font-bold text-blue-300 uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Powering India's Digital Economy
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black tracking-tight text-white leading-[1.08]">
              Power your finance,{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                grow your business
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
              Accept payments from customers across 100+ modes. Automate payouts for vendors & employees with RazorpayX. Never run out of working capital.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/signup"
                className="bg-[#0B63E5] hover:bg-[#0951bd] text-white px-8 py-3.5 rounded-lg text-sm font-bold transition-all shadow-xl shadow-blue-600/30 hover:scale-[1.02] flex items-center gap-2"
              >
                <span>Sign Up Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-md px-7 py-3.5 rounded-lg text-sm font-bold transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Explore Live Demo</span>
              </a>
            </div>
          </div>

          {/* ── Interactive "Need Help Choosing?" Bar (From Reference {43673FF8-37F0-4D63-A269-79A3C6AFBC02}.png) ── */}
          <div className="pt-6 max-w-5xl mx-auto">
            <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-white shadow-2xl">
              <span className="px-3 py-1.5 text-slate-300 font-semibold flex items-center gap-1.5 hidden md:flex">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Need help choosing?
              </span>

              <button
                onClick={() => setNeedHelpChoice('accept')}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  needHelpChoice === 'accept'
                    ? 'bg-[#0B63E5] text-white shadow-md'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Accept Payments</span>
              </button>

              <button
                onClick={() => setNeedHelpChoice('payouts')}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  needHelpChoice === 'payouts'
                    ? 'bg-[#0B63E5] text-white shadow-md'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>Make Payouts</span>
              </button>

              <button
                onClick={() => setNeedHelpChoice('banking')}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  needHelpChoice === 'banking'
                    ? 'bg-[#0B63E5] text-white shadow-md'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Start Business Banking</span>
              </button>

              <button
                onClick={() => setNeedHelpChoice('credit')}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  needHelpChoice === 'credit'
                    ? 'bg-[#0B63E5] text-white shadow-md'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <BadgePercent className="w-3.5 h-3.5" />
                <span>Get Credit & Perks</span>
              </button>

              <button
                onClick={() => setNeedHelpChoice('payroll')}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  needHelpChoice === 'payroll'
                    ? 'bg-[#0B63E5] text-white shadow-md'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Automate Payroll</span>
              </button>
            </div>
          </div>

          {/* ── Dynamic Hero Showcase Card Based on Choice ── */}
          <div className="max-w-5xl mx-auto pt-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Column: Live Interactive Product Experience (7 cols) */}
              <div className="lg:col-span-7 bg-[#0E203C]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-6 shadow-2xl space-y-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="ml-2 text-xs font-mono text-slate-300">
                        api.razorpay.com/checkout
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> RBI Authorised PA
                    </span>
                  </div>

                  {needHelpChoice === 'accept' && (
                    <div className="space-y-4 pt-3">
                      <div className="p-4 rounded-xl bg-[#09152C] border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-slate-400 font-medium block">
                            Order #order_Nx8Y29kLp102
                          </span>
                          <h4 className="text-base font-bold text-white mt-0.5">
                            Puffer Winter Jacket · 1 Item
                          </h4>
                          <span className="text-[11px] text-emerald-400 font-semibold">
                            ₹50 saved with coupon BINGE50
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-slate-400 block">Total Payable</span>
                          <div className="text-2xl font-black font-mono text-white">₹4,299.00</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                        <button
                          onClick={() => setSimUpiActive(true)}
                          className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                            simUpiActive
                              ? 'bg-blue-600/25 border-blue-400 text-white font-bold'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                          }`}
                        >
                          <Smartphone className="w-4 h-4 text-blue-400" />
                          <span>UPI / QR</span>
                        </button>

                        <button
                          onClick={() => setSimUpiActive(false)}
                          className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                            !simUpiActive
                              ? 'bg-blue-600/25 border-blue-400 text-white font-bold'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                          }`}
                        >
                          <CreditCard className="w-4 h-4 text-emerald-400" />
                          <span>Cards (Flash)</span>
                        </button>

                        <div className="p-3 rounded-xl border bg-white/5 border-white/10 text-slate-400 flex flex-col items-center gap-1.5">
                          <Building className="w-4 h-4 text-purple-400" />
                          <span>50+ Netbanking</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span>
                            {simUpiActive
                              ? 'Google Pay UPI Dynamic QR generated'
                              : 'Visa Secure Card Tokenized (0-OTP)'}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-emerald-400">RRN: 8812902910</span>
                      </div>
                    </div>
                  )}

                  {needHelpChoice === 'payouts' && (
                    <div className="space-y-4 pt-3">
                      <div className="p-4 rounded-xl bg-[#09152C] border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-slate-400 font-medium block">
                            Self-Serve Payout Link Issued
                          </span>
                          <h4 className="text-base font-bold text-white mt-0.5">
                            Freelance Design Retainer #882
                          </h4>
                          <span className="text-[11px] text-blue-300 font-mono">
                            rzp.link/p/plink_998201
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-slate-400 block">Payout Net</span>
                          <div className="text-2xl font-black font-mono text-emerald-400">₹32,500.00</div>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-200 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-white">
                          <CheckCircle2 className="w-4 h-4 text-blue-400" />
                          Recipient Claim Portal Active
                        </div>
                        <div>Recipient enters their preferred UPI ID or Bank Account. Instant credit in 15 seconds.</div>
                      </div>
                    </div>
                  )}

                  {needHelpChoice === 'banking' && (
                    <div className="space-y-4 pt-3">
                      <div className="p-4 rounded-xl bg-[#09152C] border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-slate-400 font-medium block">
                            RazorpayX Corporate Card
                          </span>
                          <h4 className="text-base font-bold text-white mt-0.5">
                            Smart Virtual Business Card •••• 9012
                          </h4>
                          <span className="text-[11px] text-emerald-400 font-semibold">
                            Monthly Limit: ₹5,00,000 / month
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-slate-400 block">Available Credit</span>
                          <div className="text-2xl font-black font-mono text-white">₹4,12,000.00</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between text-xs text-purple-200">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-purple-400" />
                          <span>Real-time Spend Controls · Zero Personal Guarantee</span>
                        </div>
                        <span className="font-bold text-purple-300">ACTIVE</span>
                      </div>
                    </div>
                  )}

                  {needHelpChoice === 'credit' && (
                    <div className="space-y-4 pt-3">
                      <div className="p-4 rounded-xl bg-[#09152C] border border-white/10 space-y-2">
                        <span className="text-[11px] text-amber-400 font-bold block uppercase tracking-wider">
                          Razorpay Startup Perks
                        </span>
                        <h4 className="text-xl font-black text-white">
                          Backing Bold Ideas with ₹50L+ in Benefits
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          AWS, Google Cloud, Stripe, Notion, and HubSpot credits. 24x7 dedicated founder support.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-slate-400 text-[10px]">Cloud Credits</span>
                          <div className="text-base font-bold text-white">₹25,00,000</div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-slate-400 text-[10px]">SaaS Discounts</span>
                          <div className="text-base font-bold text-emerald-400">100+ Partner Tools</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {needHelpChoice === 'payroll' && (
                    <div className="space-y-4 pt-3">
                      <div className="p-4 rounded-xl bg-[#09152C] border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-slate-400 font-medium block">
                            RazorpayX Payroll Batch Disbursal
                          </span>
                          <h4 className="text-base font-bold text-white mt-0.5">
                            October 2026 Salary Payroll (42 Employees)
                          </h4>
                          <span className="text-[11px] text-emerald-400 font-semibold">
                            PF, PT, ESI, TDS Auto-Withheld
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-slate-400 block">Total Payroll</span>
                          <div className="text-2xl font-black font-mono text-white">₹28,45,000.00</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-between text-xs text-blue-200">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span>3-Click Direct Bank Transfer via IMPS Rails</span>
                        </div>
                        <span className="font-mono text-emerald-400 font-bold">100% SUCCESS</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-blue-400" /> 256-Bit Bank Encryption
                  </span>
                  <span className="text-white font-bold font-mono">142ms Transaction Speed</span>
                </div>
              </div>

              {/* Right Column: Live Banking & Settlement Escrow Preview (5 cols) */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1E40] to-[#08152D] border border-blue-500/25 rounded-2xl p-6 shadow-2xl flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      RazorpayX Nodal Escrow
                    </span>
                    <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live RBI Settlement Rails
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400">Available Business Balance</span>
                    <div className="text-3xl font-extrabold text-white font-mono mt-0.5">
                      ₹14,82,500.00
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-semibold flex items-center gap-1.5">
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                        Instant Settlement Dispatched
                      </span>
                      <span className="font-mono text-emerald-400 font-bold">T+0 Instant</span>
                    </div>
                    <div className="flex justify-between items-baseline font-mono">
                      <span className="text-slate-400">HDFC Bank •••• 4891</span>
                      <span className="text-base font-bold text-white">₹85,000.00</span>
                    </div>
                    <div className="text-[10px] text-slate-400 border-t border-white/5 pt-1.5 flex justify-between">
                      <span>UTR: HDFCR52026110701</span>
                      <span className="text-emerald-400">IMPS 24x7</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <div className="font-bold text-blue-300">₹1 Penny Drop Verification</div>
                      <div className="text-[11px] text-slate-400">NPCI VPA & Bank resolution</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-blue-600 text-white text-[10px] font-bold">
                      VERIFIED
                    </span>
                  </div>
                </div>

                <a
                  href={DASHBOARD_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-lg bg-[#0B63E5] hover:bg-[#0951bd] text-white text-xs font-bold text-center block transition-colors shadow-md shadow-blue-500/25"
                >
                  Open Merchant Control Center →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Festive 0% Platform Fee Banner (From Reference {D07E7E45-A24A-4A45-814D-DFD6A302798F}.png) ── */}
      <section className="py-12 px-4 sm:px-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <BadgePercent className="w-3.5 h-3.5" />
              Limited Period Festive Offer
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0C2340] tracking-tight">
              Start <span className="text-[#0B63E5]">accepting payments</span> at just{' '}
              <span className="line-through text-slate-400 text-2xl font-bold">2%</span>{' '}
              <span className="text-4xl sm:text-5xl font-black text-[#0B63E5]">0%*</span>
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Zero platform fees for your first 90 days. Accept payments across UPI, Cards, 50+ Netbanking, and EMI.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/signup"
              className="px-6 py-3.5 rounded-xl bg-[#0B63E5] hover:bg-[#0951bd] text-white text-sm font-bold shadow-lg shadow-blue-600/25 transition-all"
            >
              Start for Free
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-sm font-bold shadow-xs transition-all"
            >
              Accepting over ₹5L/month?
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. Trusted by 8 Million Businesses (Social Proof) ── */}
      <section className="py-10 bg-white border-b border-slate-200 text-center select-none overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Empowering 8,00,000+ businesses across India — from ambitious startups to market leaders
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 pt-2 opacity-85">
            {[
              'Swiggy',
              'Zomato',
              'Blinkit',
              'Zerodha',
              'CRED',
              'BookMyShow',
              'Urban Company',
              'Nykaa',
              'Ola',
              'Lenskart',
            ].map((brand) => (
              <span
                key={brand}
                className="text-base sm:text-xl font-extrabold text-slate-700 hover:text-[#0B63E5] transition-colors tracking-tight"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Complete Products Suite Tabs & Showcase ── */}
      <section className="py-20 px-4 sm:px-6 bg-[#F8FAFC] text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#0B63E5] uppercase tracking-wider block">
              Full-Stack Payment & Banking Suite
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Every tool your business needs to grow
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore Razorpay’s comprehensive suite of online and in-store payments, automated banking, and financial compliance.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl max-w-5xl mx-auto text-xs font-bold">
            {[
              { id: 'gateway', label: 'Payment Gateway', icon: CreditCard },
              { id: 'magic', label: 'Magic Checkout', icon: Zap, badge: 'NEW' },
              { id: 'route', label: 'Route (Splits)', icon: Split, badge: 'Marketplace' },
              { id: 'links', label: 'Payment Links', icon: Link2 },
              { id: 'pages', label: 'Payment Pages', icon: FileText },
              { id: 'subscriptions', label: 'Subscriptions', icon: RefreshCw },
              { id: 'smart-collect', label: 'Smart Collect', icon: Building },
              { id: 'optimizer', label: 'Optimizer', icon: GitFork },
              { id: 'payouts', label: 'RazorpayX Payouts', icon: ArrowUpRight },
              { id: 'verify', label: 'Bank & VPA Verify', icon: ShieldCheck, badge: '₹1' },
              { id: 'cards', label: 'Corporate Cards', icon: CreditCard },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white text-[#0B63E5] shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[8px] bg-blue-100 text-blue-700 px-1 py-0.2 rounded font-bold">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Cards */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xl max-w-5xl mx-auto">
            {activeTab === 'gateway' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B63E5] flex items-center justify-center font-bold">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Payment Gateway</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Offer your customers seamless checkout across 100+ payment methods including UPI Intent, Cards with automatic brand detection, 50+ Netbanking banks, and EMI.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Industry-best 99.98% gateway uptime</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant automated refund processing in 15 minutes</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Tokenized cards compliant with RBI guidelines</li>
                  </ul>
                  <div className="pt-2">
                    <Link href="/payment-gateway" className="inline-flex items-center gap-1 text-sm font-bold text-[#0B63E5] hover:underline">
                      Explore Payment Gateway <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Checkout Success Rate</span>
                    <span className="text-emerald-600 font-mono font-bold">98.4% Average</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[98.4%]" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="text-slate-500 block text-[10px]">Avg Latency</span>
                      <span className="font-bold text-slate-900 font-mono text-base">142ms</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="text-slate-500 block text-[10px]">Supported Currencies</span>
                      <span className="font-bold text-slate-900 font-mono text-base">100+ Currencies</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'magic' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Magic Checkout & AI RTO Intelligence</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Improve conversions by 20% with pre-filled customer details from Razorpay's 50M+ shopper network. Reduce costly Cash-on-Delivery (COD) return-to-origin fraud with machine learning risk evaluation.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> 1-Click checkout with prefilled addresses</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI Return-To-Origin risk score for every pin code</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> ₹50 UPI prepaid checkout incentive discounts</li>
                  </ul>
                  <div className="pt-2">
                    <Link href="/magic-checkout" className="inline-flex items-center gap-1 text-sm font-bold text-[#0B63E5] hover:underline">
                      Explore Magic Checkout <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">Pin Code 560001 (Bengaluru)</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">LOW RISK</span>
                    </div>
                    <div className="text-[11px] text-slate-500">Predicted RTO Risk Score: 12% (Safe for COD)</div>
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px] flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Applied Coupon: FLAT100 (₹100 Instant Discount)</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'route' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <Split className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Razorpay Route (Marketplace Splits)</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Easily manage split payments for marketplaces, aggregators, and franchises. Automatically deduct commissions and route funds to linked vendor accounts with instant reversals on refunds.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Automated vendor onboarding and bank linking</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Percentage and flat platform commission deductions</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Automated transfer reversals on partial/full refunds</li>
                  </ul>
                  <div className="pt-2">
                    <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-bold text-[#0B63E5] hover:underline">
                      Manage Linked Accounts in Dashboard <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 font-mono text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-400 text-[10px]">Order Value</span>
                    <div className="text-base font-bold text-slate-900">₹10,000.00</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="text-[10px] text-blue-600">Platform Commission (15%)</span>
                      <div className="text-sm font-bold text-blue-900">₹1,500.00</div>
                    </div>
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <span className="text-[10px] text-emerald-600">Vendor Transfer</span>
                      <div className="text-sm font-bold text-emerald-900">₹8,500.00</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'verify' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Bank & VPA Verification (₹1 Penny Drop)</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Instantly verify bank accounts and UPI IDs directly via IMPS penny drop rails. Resolve registered account holder names and fetch IFSC branch directory metadata before initiating payouts.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> ₹1 IMPS Penny Drop account validation</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> NPCI UPI VPA address resolution</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> RBI IFSC Directory lookup</li>
                  </ul>
                  <div className="pt-2">
                    <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-bold text-[#0B63E5] hover:underline">
                      Verify Bank Accounts in Console <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 font-mono text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-400 text-[10px]">Verified Account Holder Name</span>
                    <div className="font-bold text-emerald-600 text-sm">BORA ENTERPRISES PRIVATE LIMITED</div>
                    <div className="text-slate-500 text-[11px]">HDFC Bank •••• 4891 · IFSC: HDFC0001082</div>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg flex items-center justify-between">
                    <span>IMPS Penny Drop Status:</span>
                    <span className="font-bold">VERIFIED SUCCESS (UTR: 881290)</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">RazorpayX Corporate Cards</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Smart corporate credit and debit cards engineered for startup expenses. Set team spending limits, freeze cards in 1 click, and get automated receipt matching with Tally and Zoho.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Collateral-free corporate credit line</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dynamic category spend controls (SaaS, Ads, Travel)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant card lock & virtual card generation</li>
                  </ul>
                  <div className="pt-2">
                    <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-bold text-[#0B63E5] hover:underline">
                      Issue Corporate Cards <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c2340] to-[#12335c] text-white shadow-xl space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold tracking-wider">RAZORPAYX SMART CARD</span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">ACTIVE</span>
                  </div>
                  <div className="font-mono text-lg font-bold tracking-widest pt-2">
                    4214 •••• •••• 9012
                  </div>
                  <div className="flex justify-between items-end text-xs text-slate-300 pt-2 border-t border-white/10">
                    <div>
                      <span className="text-[10px] text-slate-400 block">CARDHOLDER</span>
                      <span className="font-bold text-white">AJAY BORA</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">EXPIRES</span>
                      <span className="font-bold text-white">10/30</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other existing tabs (Links, Pages, Subscriptions, Smart-Collect, Optimizer, Payouts) remain clickable */}
            {['links', 'pages', 'subscriptions', 'smart-collect', 'optimizer', 'payouts'].includes(activeTab) && (
              <div className="text-center py-6 space-y-3">
                <h4 className="text-xl font-bold text-slate-800 capitalize">{activeTab.replace('-', ' ')} Suite</h4>
                <p className="text-xs text-slate-600 max-w-lg mx-auto">
                  Complete feature suite with production API, webhooks, and sandbox testing available in your merchant dashboard.
                </p>
                <div className="pt-2">
                  <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl bg-[#0B63E5] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-md">
                    Launch in Dashboard →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 5. Free Financial & Compliance Calculators Launcher ── */}
      <section className="py-16 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#0B63E5] uppercase tracking-wider block">
              Free Essential Business Tools
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Compliant tax & business calculators
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Use our verified Indian tax and financial calculators with instant breakdown.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/tools/gst-calculator"
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0B63E5] flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#0B63E5]">GST Calculator</h4>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                Compute inclusive and exclusive GST across 0%, 5%, 12%, 18%, and 28% slabs with CGST/SGST/IGST split.
              </p>
            </Link>

            <Link
              href="/compliance"
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <Percent className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600">TDS Withholding Calculator</h4>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                Section 194C (contractors), 194J (fees), 194I (rent), and 194Q (goods) tax rate computation.
              </p>
            </Link>

            <Link
              href="/compliance"
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600">GSTIN & PAN Search</h4>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                Validate vendor GSTIN number formatting and extract state codes and PAN correlations in real-time.
              </p>
            </Link>

            <Link
              href="/pricing"
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-purple-600">ROI & CAGR Calculator</h4>
              <p className="text-xs text-slate-500 mt-1 leading-normal">
                Calculate compounded annual growth rates and business investment returns across years.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. Developers First (Matching Reference {EA311644-0EC6-436A-9E34-F4ECD306F452}.png) ── */}
      <section className="py-20 px-4 sm:px-6 bg-[#071328] text-white">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Top Developer Prompt Card */}
          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-blue-400 text-sm font-bold">
                <Code2 className="w-4 h-4" />
                <span>Are you a developer?</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Find comprehensive guides and documentation to start with Razorpay as quickly as possible.
              </h3>
            </div>
            <Link
              href="/docs"
              className="px-6 py-3 rounded-xl bg-[#0B63E5] hover:bg-[#0951bd] text-white text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-lg shadow-blue-500/25"
            >
              <span>View Docs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Interactive Code Window */}
          <div className="max-w-4xl mx-auto bg-[#0A192F] rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-[#08152A] text-xs">
              <div className="flex items-center gap-2">
                {(['nodejs', 'python', 'curl', 'php', 'java'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveCodeTab(lang)}
                    className={`px-3 py-1 rounded-md font-mono font-semibold transition-all cursor-pointer ${
                      activeCodeTab === lang
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang === 'nodejs' ? 'Node.js' : lang.toUpperCase()}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="p-6 text-xs sm:text-sm font-mono text-blue-200 overflow-x-auto leading-relaxed bg-[#061021]">
              <code>{codeSnippets[activeCodeTab]}</code>
            </pre>
          </div>

          {/* Native SDKs & E-Commerce Plugins */}
          <div className="text-center pt-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-4">
              Native SDKs and E-Commerce Plugins Available
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto text-xs font-mono">
              {[
                'Shopify',
                'WooCommerce',
                'React / Next.js',
                'Flutter',
                'React Native',
                'Android SDK',
                'iOS Swift',
                'Magento',
                'Node.js',
                'Python',
                'PHP',
                'Java',
              ].map((sdk) => (
                <span
                  key={sdk}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300"
                >
                  {sdk}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Transparent Pricing Calculator ── */}
      <section className="py-20 px-4 sm:px-6 bg-[#F8FAFC] text-slate-900 border-t border-slate-200">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-[#0B63E5] uppercase tracking-wider block">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Simple, transparent pricing with zero surprises
            </h2>
            <p className="text-slate-600 text-sm">
              Standard 2.0% fee on domestic cards, netbanking, and UPI. ₹0 setup fee and ₹0 annual maintenance.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div>
              <div className="flex justify-between items-center text-sm font-bold text-slate-800 mb-2">
                <span>Estimated Monthly Payment Volume:</span>
                <span className="text-xl font-mono text-[#0B63E5]">
                  ₹{volumeSlider.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="5000000"
                step="50000"
                value={volumeSlider}
                onChange={(e) => setVolumeSlider(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B63E5]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                <span>₹50,000 / mo</span>
                <span>₹50,00,000 / mo</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">Processing Fee (2.0%)</span>
                <span className="text-xl font-bold font-mono text-slate-900 mt-1 block">
                  ₹{(volumeSlider * 0.02).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">Setup & AMC Fee</span>
                <span className="text-xl font-bold font-mono text-emerald-600 mt-1 block">
                  ₹0.00 FREE
                </span>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <span className="text-xs text-blue-700 block font-semibold">Net Payout to Bank</span>
                <span className="text-xl font-bold font-mono text-blue-900 mt-1 block">
                  ₹{(volumeSlider * 0.9764).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FAQs ── */}
      <section className="py-20 px-4 sm:px-6 bg-white text-slate-900 border-t border-slate-200">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Everything you need to know about getting started with Razorpay.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-sm text-slate-800 flex items-center justify-between gap-4 hover:bg-slate-50 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
