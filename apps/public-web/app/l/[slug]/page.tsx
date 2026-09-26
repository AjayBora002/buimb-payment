'use client';

import React, { useEffect, useState, use } from 'react';
import { ShieldCheck, Lock, CheckCircle2, XCircle, Loader2, CreditCard, Smartphone, Building2, Wallet, Link2, Clock } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface PaymentLink {
  id: string;
  slug: string;
  amount: number;
  currency: string;
  description?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  status: 'ACTIVE' | 'PARTIALLY_PAID' | 'PAID' | 'EXPIRED' | 'CANCELLED';
  expiresAt?: string;
  allowPartialPayment?: boolean;
  merchantId: string;
}

type CheckoutStep = 'loading' | 'error' | 'select_method' | 'processing' | 'success' | 'unavailable';

function formatAmount(paise: number, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 2 }).format(paise / 100);
}

function formatTimeLeft(expiresAt?: string): string | null {
  if (!expiresAt) return null;
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return 'Expired';
  const hours = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  if (hours > 24) return `${Math.floor(hours / 24)}d left`;
  return hours > 0 ? `${hours}h ${mins}m left` : `${mins}m left`;
}

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', sublabel: 'Google Pay, PhonePe, Paytm, BHIM', icon: <Smartphone className="w-5 h-5" />, popular: true },
  { id: 'card', label: 'Credit / Debit Card', sublabel: 'Visa, Mastercard, RuPay, Amex', icon: <CreditCard className="w-5 h-5" />, popular: false },
  { id: 'netbanking', label: 'Net Banking', sublabel: '100+ Indian banks supported', icon: <Building2 className="w-5 h-5" />, popular: false },
  { id: 'wallet', label: 'Wallets', sublabel: 'Paytm, Mobikwik, Freecharge', icon: <Wallet className="w-5 h-5" />, popular: false },
];

export default function PaymentLinkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);

  const [step, setStep] = useState<CheckoutStep>('loading');
  const [link, setLink] = useState<PaymentLink | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [bank, setBank] = useState('HDFC');
  const [payAmount, setPayAmount] = useState('');
  const [intentId, setIntentId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/v1/payment-links/public/${slug}`);
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j.message || `Link not found (${res.status})`);
        }
        const data: PaymentLink = await res.json();
        setLink(data);
        setPayAmount(String(data.amount / 100));

        if (data.status === 'PAID') { setStep('success'); return; }
        if (['EXPIRED', 'CANCELLED'].includes(data.status)) { setStep('unavailable'); return; }
        setStep('select_method');
      } catch (e: any) {
        setErrorMsg(e.message || 'Failed to load payment link');
        setStep('error');
      }
    })();
  }, [slug]);

  async function handlePay() {
    if (!link) return;
    setStep('processing');
    try {
      // Create an order from the payment link then confirm
      const intentRes = await fetch(`${API_BASE}/v1/payment-links/public/${slug}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(Number(payAmount) * 100),
          paymentMethodType: selectedMethod,
          ...(selectedMethod === 'upi' ? { upiId } : {}),
          ...(selectedMethod === 'card' ? { cardNumber, cardExpiry, cardCvv, cardName } : {}),
          ...(selectedMethod === 'netbanking' ? { bank } : {}),
          simulateOutcome: 'success',
        }),
      });
      if (!intentRes.ok) {
        const j = await intentRes.json().catch(() => ({}));
        throw new Error(j.message || 'Payment failed');
      }
      const result = await intentRes.json();
      setIntentId(result.id || result.intentId || null);
      setStep('success');
    } catch (e: any) {
      setErrorMsg(e.message || 'Payment could not be processed');
      setStep('select_method');
    }
  }

  const timeLeft = formatTimeLeft(link?.expiresAt);

  // ── Render ─────────────────────────────────────────────────────────

  if (step === 'loading') {
    return (
      <Shell>
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
          <p className="text-slate-400 text-sm">Loading payment link…</p>
        </div>
      </Shell>
    );
  }

  if (step === 'error') {
    return (
      <Shell>
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <Link2 className="w-12 h-12 text-slate-600" />
          <h2 className="text-xl font-semibold text-white">Link not found</h2>
          <p className="text-slate-400 text-sm">{errorMsg}</p>
        </div>
      </Shell>
    );
  }

  if (step === 'unavailable') {
    return (
      <Shell link={link!}>
        <div className="flex flex-col items-center justify-center gap-5 py-14 text-center">
          <XCircle className="w-12 h-12 text-red-400" />
          <h2 className="text-xl font-semibold text-white">
            {link?.status === 'EXPIRED' ? 'This link has expired' : 'This link is no longer active'}
          </h2>
          <p className="text-slate-400 text-sm">Please contact the sender for a new payment link.</p>
        </div>
      </Shell>
    );
  }

  if (step === 'success') {
    return (
      <Shell link={link!}>
        <div className="flex flex-col items-center justify-center gap-6 py-14 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Payment Successful!</h2>
            <p className="text-slate-400 mt-2 text-sm">
              {link ? formatAmount(link.amount, link.currency) : ''} received
            </p>
          </div>
          {intentId && (
            <div className="bg-slate-800/60 rounded-xl px-6 py-3 text-xs text-slate-400 font-mono">
              Ref: {intentId}
            </div>
          )}
          <p className="text-slate-500 text-xs">You may now close this window.</p>
        </div>
      </Shell>
    );
  }

  if (step === 'processing') {
    return (
      <Shell link={link!}>
        <div className="flex flex-col items-center justify-center gap-5 py-20">
          <Loader2 className="w-12 h-12 text-indigo-400 animate-spin" />
          <p className="text-white font-semibold">Processing payment…</p>
          <p className="text-slate-400 text-xs">Please do not close this window</p>
        </div>
      </Shell>
    );
  }

  // select_method
  return (
    <Shell link={link!}>
      <div className="space-y-6">
        {/* Partial payment amount input */}
        {link?.allowPartialPayment && (
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1.5">
              Amount to Pay (min partial)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">₹</span>
              <input
                id="partial-amount-input"
                type="number"
                value={payAmount}
                min={1}
                max={link.amount / 100}
                onChange={(e) => setPayAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
        )}

        {/* Method picker */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Select Payment Method</p>
          <div className="space-y-2">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMethod(m.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all text-left ${
                  selectedMethod === m.id
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-slate-700 bg-slate-800/40 hover:border-slate-600'
                }`}
              >
                <div className={`${selectedMethod === m.id ? 'text-indigo-400' : 'text-slate-400'}`}>{m.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{m.label}</span>
                    {m.popular && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">Popular</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{m.sublabel}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedMethod === m.id ? 'border-indigo-500 bg-indigo-500' : 'border-slate-600'
                }`}>
                  {selectedMethod === m.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Method fields */}
        <div className="space-y-3">
          {selectedMethod === 'upi' && (
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1.5">UPI ID</label>
              <input
                id="link-upi-input"
                type="text"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          )}

          {selectedMethod === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1.5">Card Number</label>
                <input
                  id="link-card-number"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim())}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1.5">Expiry</label>
                  <input
                    id="link-card-expiry"
                    type="text"
                    placeholder="MM / YY"
                    value={cardExpiry}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                      if (v.length > 2) v = v.slice(0, 2) + ' / ' + v.slice(2);
                      setCardExpiry(v);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1.5">CVV</label>
                  <input
                    id="link-card-cvv"
                    type="password"
                    placeholder="•••"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1.5">Name on Card</label>
                <input
                  id="link-card-name"
                  type="text"
                  placeholder="Full name as on card"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          )}

          {selectedMethod === 'netbanking' && (
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1.5">Select Bank</label>
              <select
                id="link-bank-select"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              >
                {['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak', 'YES Bank', 'IDBI', 'IndusInd', 'Federal Bank', 'Punjab National Bank'].map(b => (
                  <option key={b} value={b}>{b} Bank</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {errorMsg && (
          <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {errorMsg}
          </div>
        )}

        {/* Pay button */}
        <button
          id="link-pay-now-button"
          onClick={handlePay}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98]"
        >
          Pay {link ? formatAmount(Math.round(Number(payAmount) * 100), link.currency) : ''}
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <Lock className="w-3 h-3" />
          <span>256-bit SSL encrypted · Powered by BuimbPay</span>
        </div>
      </div>
    </Shell>
  );
}

// ── Shared Shell ──────────────────────────────────────────────────────

function Shell({ children, link }: { children: React.ReactNode; link?: PaymentLink | null }) {
  const timeLeft = formatTimeLeft(link?.expiresAt);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1E] via-[#0D1526] to-[#070B16] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">BuimbPay</span>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
          {/* Link summary */}
          {link && (
            <div className="px-6 py-5 border-b border-slate-700/50 bg-slate-800/30">
              {link.customerName && (
                <p className="text-xs text-slate-500 mb-1">Payment request for <span className="text-slate-300">{link.customerName}</span></p>
              )}
              <p className="text-3xl font-bold text-white">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: link.currency || 'INR', maximumFractionDigits: 2 }).format(link.amount / 100)}
              </p>
              {link.description && <p className="text-slate-400 text-sm mt-1">{link.description}</p>}
              {timeLeft && (
                <div className={`flex items-center gap-1.5 mt-2 text-xs ${timeLeft === 'Expired' ? 'text-red-400' : 'text-amber-400'}`}>
                  <Clock className="w-3 h-3" />
                  <span>{timeLeft}</span>
                </div>
              )}
            </div>
          )}

          <div className="px-6 py-6">{children}</div>
        </div>

        {/* Trust */}
        <div className="flex items-center justify-center gap-4 mt-5 text-xs text-slate-600">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> PCI-DSS L1</span>
          <span>·</span>
          <span>RBI PA/PG Licensed</span>
          <span>·</span>
          <span>ISO 27001</span>
        </div>
      </div>
    </div>
  );
}
