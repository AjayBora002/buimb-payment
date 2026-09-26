import React, { useState } from 'react';
import {
  X,
  Smartphone,
  CreditCard,
  Building2,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  ArrowRight,
  RefreshCw,
  Lock,
  ChevronRight,
  Info,
} from 'lucide-react';
import { useToast } from './Toast.js';

interface HostedCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderAmount?: string;
  orderAmountRaw?: number;
  orderDesc?: string;
  onPaymentSuccess?: (paymentRecord: any) => void;
}

export const HostedCheckoutModal: React.FC<HostedCheckoutModalProps> = ({
  isOpen,
  onClose,
  orderAmount = '₹2,499.00',
  orderAmountRaw = 2499,
  orderDesc = 'Enterprise Cloud Subscription (Invoice #INV-2026-89)',
  onPaymentSuccess,
}) => {
  const { showToast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'CARD' | 'NETBANKING' | 'WALLET'>('UPI');
  const [upiVpa, setUpiVpa] = useState('customer@okaxis');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [cardHolder, setCardHolder] = useState('Priya Sharma');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setProcessingStep('Connecting to payment rail...');

    setTimeout(() => {
      setProcessingStep('Authorising payment with issuing bank...');
    }, 800);

    setTimeout(() => {
      setProcessingStep('Verifying 3D Secure / UPI PIN...');
    }, 1600);

    setTimeout(() => {
      const paymentId = `pi_test_${Math.random().toString(36).substring(2, 11)}`;
      const result = {
        id: paymentId,
        orderId: `order_${Math.floor(1000000 + Math.random() * 9000000)}`,
        amount: orderAmount,
        currency: 'INR',
        method: selectedMethod,
        methodDetail:
          selectedMethod === 'UPI'
            ? `UPI · ${upiVpa}`
            : selectedMethod === 'CARD'
            ? 'Card · Visa ending 4242'
            : selectedMethod === 'NETBANKING'
            ? `NetBanking · ${selectedBank}`
            : 'Wallet · Amazon Pay',
        status: 'CAPTURED',
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
        steps: ['CREATED', 'PROCESSING', 'AUTHORISED', 'CAPTURED'],
      };

      setIsProcessing(false);
      setIsSuccess(true);
      setPaymentResult(result);
      showToast(`Payment ${paymentId} captured successfully!`, 'success');
      onPaymentSuccess?.(result);
    }, 2400);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    setPaymentResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-[#1D2E28] border border-[rgba(237,231,214,0.12)] rounded-none w-full max-w-lg overflow-hidden flex flex-col relative">
        {/* Merchant & Order Header */}
        <div className="bg-[#131B17] border-b border-[rgba(237,231,214,0.08)] p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[2px] bg-[#C9A227] text-[#131B17] font-bold text-sm flex items-center justify-center font-mono">
              B
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#EDE7D6] text-sm tracking-tight">Acme Technologies</span>
                <span className="px-1.5 py-0.2 rounded-[2px] bg-[#4E8B6F]/10 text-[#4E8B6F] text-[9px] font-mono font-bold border border-[#4E8B6F] uppercase">
                  Verified
                </span>
              </div>
              <p className="text-[11px] text-[#8FA396] truncate max-w-xs">{orderDesc}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-[#8FA396] uppercase font-bold block">Amount to Pay</span>
            <span className="text-lg font-mono font-bold text-[#EDE7D6] tabular-nums tracking-tight">
              {orderAmount}
            </span>
          </div>
        </div>

        {/* Content Viewport */}
        {isSuccess ? (
          /* Payment Success Confirmation */
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-[#4E8B6F]/15 border border-[#4E8B6F] text-[#4E8B6F] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#EDE7D6]">Payment Successful</h3>
              <p className="text-xs text-[#8FA396]">
                Simulated sandbox transaction completed & captured with MockProvider.
              </p>
            </div>

            <div className="p-4 bg-[#131B17] border border-[rgba(237,231,214,0.08)] text-xs space-y-2 text-left font-mono">
              <div className="flex justify-between">
                <span className="text-[#8FA396]">Payment Reference</span>
                <span className="text-[#C9A227] font-semibold">{paymentResult?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8FA396]">Order Reference</span>
                <span className="text-[#EDE7D6]">{paymentResult?.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8FA396]">Amount Paid</span>
                <span className="font-bold text-[#4E8B6F] tabular-nums">{paymentResult?.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8FA396]">Instrument</span>
                <span className="text-[#EDE7D6]">{paymentResult?.methodDetail}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-2.5 rounded-[4px] bg-[#C9A227] hover:bg-[#d8b030] text-[#131B17] text-xs font-semibold transition-all"
            >
              Done & Return to Dashboard
            </button>
          </div>
        ) : isProcessing ? (
          /* Processing Loader */
          <div className="p-12 text-center space-y-5">
            <div className="w-12 h-12 rounded-full text-[#C9A227] flex items-center justify-center mx-auto border border-[#C9A227] animate-spin">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#EDE7D6]">Processing Payment</h4>
              <p className="text-xs font-mono text-[#8FA396]">{processingStep}</p>
            </div>
            <div className="text-[11px] text-[#8FA396]/80">
              Do not close this window or refresh the page.
            </div>
          </div>
        ) : (
          /* Payment Method Selector & Forms */
          <div className="flex-1 flex flex-col md:flex-row min-h-[360px]">
            {/* Left Method Tabs */}
            <div className="w-full md:w-44 bg-[#131B17] border-b md:border-b-0 md:border-r border-[rgba(237,231,214,0.08)] p-2 space-y-1">
              <button
                onClick={() => setSelectedMethod('UPI')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[4px] text-xs font-semibold transition-all ${
                  selectedMethod === 'UPI'
                    ? 'bg-[#C9A227] text-[#131B17]'
                    : 'text-[#8FA396] hover:text-[#EDE7D6] hover:bg-[#1D2E28]'
                }`}
              >
                <Smartphone className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">UPI & QR</span>
              </button>

              <button
                onClick={() => setSelectedMethod('CARD')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[4px] text-xs font-semibold transition-all ${
                  selectedMethod === 'CARD'
                    ? 'bg-[#C9A227] text-[#131B17]'
                    : 'text-[#8FA396] hover:text-[#EDE7D6] hover:bg-[#1D2E28]'
                }`}
              >
                <CreditCard className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Cards</span>
              </button>

              <button
                onClick={() => setSelectedMethod('NETBANKING')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[4px] text-xs font-semibold transition-all ${
                  selectedMethod === 'NETBANKING'
                    ? 'bg-[#C9A227] text-[#131B17]'
                    : 'text-[#8FA396] hover:text-[#EDE7D6] hover:bg-[#1D2E28]'
                }`}
              >
                <Building2 className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">NetBanking</span>
              </button>

              <button
                onClick={() => setSelectedMethod('WALLET')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[4px] text-xs font-semibold transition-all ${
                  selectedMethod === 'WALLET'
                    ? 'bg-[#C9A227] text-[#131B17]'
                    : 'text-[#8FA396] hover:text-[#EDE7D6] hover:bg-[#1D2E28]'
                }`}
              >
                <Wallet className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Wallets</span>
              </button>
            </div>

            {/* Right Method Form Pane */}
            <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
              {/* UPI Tab */}
              {selectedMethod === 'UPI' && (
                <div className="space-y-4 text-xs">
                  {/* Dynamic QR Box */}
                  <div className="p-4 bg-[#131B17] border border-[rgba(237,231,214,0.08)] flex items-center gap-4">
                    <div className="w-18 h-18 bg-white p-1.5 flex items-center justify-center flex-shrink-0 border border-black/10">
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#131B17]">
                        <rect x="10" y="10" width="30" height="30" fill="currentColor" rx="2" />
                        <rect x="16" y="16" width="18" height="18" fill="white" rx="1" />
                        <rect x="20" y="20" width="10" height="10" fill="currentColor" />
                        <rect x="60" y="10" width="30" height="30" fill="currentColor" rx="2" />
                        <rect x="66" y="16" width="18" height="18" fill="white" rx="1" />
                        <rect x="70" y="20" width="10" height="10" fill="currentColor" />
                        <rect x="10" y="60" width="30" height="30" fill="currentColor" rx="2" />
                        <rect x="16" y="66" width="18" height="18" fill="white" rx="1" />
                        <rect x="20" y="70" width="10" height="10" fill="currentColor" />
                        <rect x="50" y="50" width="12" height="12" fill="currentColor" />
                        <rect x="70" y="60" width="16" height="8" fill="currentColor" />
                        <rect x="60" y="80" width="10" height="10" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-[#EDE7D6]">Scan with any UPI App</div>
                      <p className="text-[11px] text-[#8FA396]">
                        Google Pay, PhonePe, Paytm, CRED or any BHIM UPI app
                      </p>
                      <div className="text-[10px] text-[#4E8B6F] flex items-center gap-1 font-mono font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Auto-expiring session (09:42)
                      </div>
                    </div>
                  </div>

                  {/* Manual VPA input */}
                  <div>
                    <label className="block text-[11px] font-mono text-[#8FA396] mb-1 font-medium uppercase">Or enter your UPI ID / VPA</label>
                    <input
                      type="text"
                      value={upiVpa}
                      onChange={(e) => setUpiVpa(e.target.value)}
                      placeholder="e.g. mobile@upi or name@okaxis"
                      className="w-full bg-[#131B17] border border-[rgba(237,231,214,0.12)] rounded-[4px] px-3 py-2 text-[#EDE7D6] font-mono focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>
                </div>
              )}

              {/* CARD Tab */}
              {selectedMethod === 'CARD' && (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-mono text-[#8FA396] mb-1 font-medium uppercase">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="w-full bg-[#131B17] border border-[rgba(237,231,214,0.12)] rounded-[4px] px-3 py-2 text-[#EDE7D6] font-mono tracking-wider focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-[#8FA396] mb-1 font-medium uppercase">Expiry</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-[#131B17] border border-[rgba(237,231,214,0.12)] rounded-[4px] px-3 py-2 text-[#EDE7D6] font-mono focus:outline-none focus:border-[#C9A227]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#8FA396] mb-1 font-medium uppercase">CVV / CVC</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        maxLength={4}
                        placeholder="•••"
                        className="w-full bg-[#131B17] border border-[rgba(237,231,214,0.12)] rounded-[4px] px-3 py-2 text-[#EDE7D6] font-mono focus:outline-none focus:border-[#C9A227]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#8FA396] mb-1 font-medium uppercase">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full bg-[#131B17] border border-[rgba(237,231,214,0.12)] rounded-[4px] px-3 py-2 text-[#EDE7D6] focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div className="text-[10px] text-[#8FA396] flex items-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4E8B6F]" />
                    Tokenised under RBI Card-on-File regulations. Zero raw PAN stored.
                  </div>
                </div>
              )}

              {/* NETBANKING Tab */}
              {selectedMethod === 'NETBANKING' && (
                <div className="space-y-3 text-xs">
                  <span className="text-[#8FA396] block font-mono text-[11px] uppercase">Select Popular Bank</span>
                  <div className="grid grid-cols-2 gap-2">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra'].map((b) => (
                      <button
                        key={b}
                        onClick={() => setSelectedBank(b)}
                        className={`p-2.5 rounded-[4px] border text-left flex items-center justify-between transition-all ${
                          selectedBank === b
                            ? 'bg-[#131B17] text-[#EDE7D6] border-[#C9A227]'
                            : 'bg-[#131B17]/60 text-[#8FA396] border-[rgba(237,231,214,0.06)] hover:bg-[#131B17]'
                        }`}
                      >
                        <span className="font-semibold text-xs">{b}</span>
                        {selectedBank === b && <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* WALLET Tab */}
              {selectedMethod === 'WALLET' && (
                <div className="space-y-2 text-xs">
                  <span className="text-[#8FA396] block font-mono text-[11px] uppercase">Available Wallets</span>
                  {['Amazon Pay', 'Paytm Wallet', 'PhonePe Wallet', 'Mobikwik'].map((w) => (
                    <div
                      key={w}
                      className="p-3 bg-[#131B17] border border-[rgba(237,231,214,0.06)] rounded-[4px] flex items-center justify-between"
                    >
                      <span className="font-medium text-[#EDE7D6]">{w}</span>
                      <span className="text-[#C9A227] font-mono text-[11px] font-semibold cursor-pointer">Link Wallet</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit CTA & Footer Guarantee */}
              <div className="pt-4 border-t border-[rgba(237,231,214,0.08)] space-y-2">
                <button
                  onClick={handleSimulatePayment}
                  className="w-full py-2.5 rounded-[4px] bg-[#C9A227] hover:bg-[#d8b030] text-[#131B17] text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Pay {orderAmount}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8FA396]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4E8B6F]" />
                  <span>256-bit TLS encrypted &bull; RBI PA & PCI-DSS certified</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Close in corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-[4px] text-[#8FA396] hover:text-[#EDE7D6] hover:bg-[#131B17] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
