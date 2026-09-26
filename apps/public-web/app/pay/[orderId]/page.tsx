'use client';

import React, { useEffect, useState, use } from 'react';
import { ShieldCheck, Lock, CheckCircle2, XCircle, Loader2, CreditCard, Smartphone, Building2, Wallet } from 'lucide-react';
import Image from 'next/image';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

type OrderStatus = 'CREATED' | 'PROCESSING' | 'PAID' | 'FAILED' | 'CANCELLED' | 'EXPIRED';

interface Order {
  id: string;
  amount: number;
  currency: string;
  status: OrderStatus;
  description?: string;
  receipt?: string;
  merchantId: string;
}

type CheckoutStep = 'loading' | 'error' | 'select_method' | 'enter_details' | 'processing' | 'success' | 'failed';

const METHOD_ICONS: Record<string, JSX.Element> = {
  upi: <Smartphone className="w-5 h-5" />,
  card: <CreditCard className="w-5 h-5" />,
  netbanking: <Building2 className="w-5 h-5" />,
  wallet: <Wallet className="w-5 h-5" />,
};

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', sublabel: 'Google Pay, PhonePe, Paytm, BHIM', popular: true },
  { id: 'card', label: 'Credit / Debit Card', sublabel: 'Visa, Mastercard, RuPay, Amex', popular: false },
  { id: 'netbanking', label: 'Net Banking', sublabel: '100+ Indian banks supported', popular: false },
  { id: 'wallet', label: 'Wallets', sublabel: 'Paytm, Mobikwik, Freecharge', popular: false },
];

function formatAmount(paise: number, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 2 }).format(paise / 100);
}

export default function CheckoutPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = React.use(params);

  const [step, setStep] = useState<CheckoutStep>('loading');
  const [order, setOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [bank, setBank] = useState('HDFC');
  const [intentId, setIntentId] = useState<string | null>(null);

  // Fetch order on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/v1/orders/public/${orderId}`);
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j.message || `Order not found (${res.status})`);
        }
        const data: Order = await res.json();
        if (data.status === 'PAID') {
          setOrder(data);
          setStep('success');
          return;
        }
        if (['CANCELLED', 'EXPIRED', 'FAILED'].includes(data.status)) {
          setOrder(data);
          setStep('failed');
          return;
        }
        setOrder(data);
        setStep('select_method');
      } catch (e: any) {
        setErrorMsg(e.message || 'Failed to load order');
        setStep('error');
      }
    })();
  }, [orderId]);

  async function handlePay() {
    if (!order) return;
    setStep('processing');
    try {
      // 1. Create payment intent
      const intentRes = await fetch(`${API_BASE}/v1/payment-intents/public`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id }),
      });
      if (!intentRes.ok) throw new Error('Could not initiate payment');
      const intent = await intentRes.json();
      setIntentId(intent.id);

      // 2. Confirm payment intent
      const confirmRes = await fetch(`${API_BASE}/v1/payment-intents/public/${intent.id}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodType: selectedMethod,
          ...(selectedMethod === 'upi' ? { upiId } : {}),
          ...(selectedMethod === 'card' ? { cardNumber, cardExpiry, cardCvv, cardName } : {}),
          ...(selectedMethod === 'netbanking' ? { bank } : {}),
          simulateOutcome: 'success',
        }),
      });
      if (!confirmRes.ok) {
        const j = await confirmRes.json().catch(() => ({}));
        throw new Error(j.message || 'Payment confirmation failed');
      }
      setStep('success');
    } catch (e: any) {
      setErrorMsg(e.message || 'Payment failed');
      setStep('failed');
    }
  }

  // ── Render helpers ──────────────────────────────────────────────────

  if (step === 'loading') {
    return (
      <CheckoutShell>
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
          <p className="text-slate-400 text-sm">Loading order details…</p>
        </div>
      </CheckoutShell>
    );
  }

  if (step === 'error') {
    return (
      <CheckoutShell>
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <XCircle className="w-12 h-12 text-red-400" />
          <h2 className="text-xl font-semibold text-white">Order not found</h2>
          <p className="text-slate-400 text-sm text-center max-w-xs">{errorMsg}</p>
        </div>
      </CheckoutShell>
    );
  }

  if (step === 'success') {
    return (
      <CheckoutShell order={order!}>
        <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Payment Successful!</h2>
            <p className="text-slate-400 mt-2 text-sm">
              {formatAmount(order!.amount, order!.currency)} paid successfully
            </p>
          </div>
          {intentId && (
            <div className="bg-slate-800/60 rounded-xl px-6 py-3 text-xs text-slate-400 font-mono">
              Ref: {intentId}
            </div>
          )}
          <p className="text-slate-500 text-xs">You can now close this window.</p>
        </div>
      </CheckoutShell>
    );
  }

  if (step === 'failed') {
    return (
      <CheckoutShell order={order!}>
        <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
            <XCircle className="w-10 h-10 text-red-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Payment Failed</h2>
            <p className="text-slate-400 mt-2 text-sm">{errorMsg || 'The payment could not be processed.'}</p>
          </div>
          <button
            onClick={() => { setStep('select_method'); setErrorMsg(''); }}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </CheckoutShell>
    );
  }

  if (step === 'processing') {
    return (
      <CheckoutShell order={order!}>
        <div className="flex flex-col items-center justify-center gap-5 py-20">
          <div className="relative w-16 h-16">
            <Loader2 className="w-16 h-16 text-indigo-400 animate-spin absolute inset-0" />
          </div>
          <p className="text-white font-semibold">Processing payment…</p>
          <p className="text-slate-400 text-xs">Please do not close this window</p>
        </div>
      </CheckoutShell>
    );
  }

  // select_method + enter_details
  return (
    <CheckoutShell order={order!}>
      <div className="space-y-6">
        {/* Payment Methods */}
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
                <div className={`${selectedMethod === m.id ? 'text-indigo-400' : 'text-slate-400'}`}>
                  {METHOD_ICONS[m.id]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{m.label}</span>
                    {m.popular && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">
                        Popular
                      </span>
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

        {/* Method-specific fields */}
        <div className="space-y-3">
          {selectedMethod === 'upi' && (
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1.5">UPI ID</label>
              <input
                id="upi-id-input"
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
                  id="card-number-input"
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
                    id="card-expiry-input"
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
                    id="card-cvv-input"
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
                  id="card-name-input"
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
                id="bank-select"
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

          {selectedMethod === 'wallet' && (
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1.5">Select Wallet</label>
              <div className="grid grid-cols-3 gap-2">
                {['Paytm', 'Mobikwik', 'Freecharge'].map(w => (
                  <button key={w} className="py-2.5 rounded-xl border border-slate-700 bg-slate-800/40 hover:border-indigo-500 text-sm text-slate-300 hover:text-white transition-all">
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pay Button */}
        <button
          id="pay-now-button"
          onClick={handlePay}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98]"
        >
          Pay {formatAmount(order!.amount, order!.currency)}
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <Lock className="w-3 h-3" />
          <span>256-bit SSL encrypted · Powered by BuimbPay</span>
        </div>
      </div>
    </CheckoutShell>
  );
}

// ── Shared shell ─────────────────────────────────────────────────────

function CheckoutShell({ children, order }: { children: React.ReactNode; order?: Order | null }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1E] via-[#0D1526] to-[#070B16] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">BuimbPay</span>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
          {/* Order summary */}
          {order && (
            <div className="px-6 py-5 border-b border-slate-700/50 bg-slate-800/30">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Amount Due</p>
              <p className="text-3xl font-bold text-white">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: order.currency || 'INR', maximumFractionDigits: 2 }).format(order.amount / 100)}
              </p>
              {order.description && (
                <p className="text-slate-400 text-sm mt-1">{order.description}</p>
              )}
              <p className="text-slate-600 text-xs mt-2 font-mono">Order #{order.id.slice(-8).toUpperCase()}</p>
            </div>
          )}

          {/* Content */}
          <div className="px-6 py-6">{children}</div>
        </div>

        {/* Trust badges */}
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
