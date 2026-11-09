'use client';
import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, CreditCard, Smartphone, Building2, Wallet, Clock, Copy, Zap, Check, Edit2, ArrowRight, QrCode, Send, Phone, AtSign, Sparkles, CheckCircle, } from 'lucide-react';
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
export default function CheckoutPage({ params }) {
    const { orderId } = React.use(params);
    const [order, setOrder] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState('UPI');
    const [receivingVpa] = useState('buimbpay.merchant@icici');
    // Magic prefill contact
    const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
    const [customerEmail, setCustomerEmail] = useState('priya.sharma@example.com');
    const [isEditingContact, setIsEditingContact] = useState(false);
    // UPI Sub-Method State
    const [upiSubMethod, setUpiSubMethod] = useState('NUMBER');
    const [upiNumber, setUpiNumber] = useState('9876543210');
    const [preferredApp, setPreferredApp] = useState('ANY');
    const [isCollectSent, setIsCollectSent] = useState(false);
    const [collectTimer, setCollectTimer] = useState(300);
    // UPI VPA State
    const [vpaUsername, setVpaUsername] = useState('priya.sharma');
    const [selectedHandle, setSelectedHandle] = useState('@okhdfcbank');
    const [isVpaVerified, setIsVpaVerified] = useState(true);
    // Card details
    const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
    const [cardExpiry, setCardExpiry] = useState('12/28');
    const [cardCvv, setCardCvv] = useState('888');
    const [cardHolder, setCardHolder] = useState('Priya Sharma');
    const [saveCardRbi, setSaveCardRbi] = useState(true);
    // Bank details
    const [selectedBank, setSelectedBank] = useState('HDFC Bank');
    const [customBank, setCustomBank] = useState('');
    // Timers & State
    const [paymentSeconds, setPaymentSeconds] = useState(300);
    const [verificationSeconds, setVerificationSeconds] = useState(30);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStep, setProcessingStep] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [paymentResult, setPaymentResult] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${API_BASE}/v1/orders/public/${orderId}`);
                if (res.ok) {
                    const data = await res.json();
                    setOrder(data);
                    if (data.status === 'PAID') {
                        setIsSuccess(true);
                    }
                }
                else {
                    setOrder({
                        id: orderId,
                        amount: 129900,
                        currency: 'INR',
                        status: 'CREATED',
                        description: 'Acme Premium Subscription',
                        merchantId: 'mid_sample',
                    });
                }
            }
            catch {
                setOrder({
                    id: orderId,
                    amount: 129900,
                    currency: 'INR',
                    status: 'CREATED',
                    description: 'Acme Premium Subscription',
                    merchantId: 'mid_sample',
                });
            }
        })();
    }, [orderId]);
    useEffect(() => {
        if (isSuccess)
            return;
        const timer = setInterval(() => {
            if (isVerifying) {
                setVerificationSeconds((prev) => (prev <= 1 ? 30 : prev - 1));
            }
            else {
                setPaymentSeconds((prev) => (prev > 0 ? prev - 1 : 0));
            }
            if (isCollectSent) {
                setCollectTimer((prev) => (prev > 0 ? prev - 1 : 0));
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [isVerifying, isSuccess, isCollectSent]);
    const rawAmount = order ? order.amount / 100 : 1299;
    const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: order?.currency || 'INR',
    }).format(rawAmount);
    const upiUri = `upi://pay?pa=${receivingVpa}&pn=Acme+Merchant&am=${rawAmount}.00&cu=INR&tn=${encodeURIComponent(order?.description || orderId)}`;
    const handleSimulatePayment = (customDetail) => {
        setIsProcessing(true);
        setProcessingStep('Connecting to issuing bank server...');
        setTimeout(() => {
            setProcessingStep('Authorising payment via UPI 2.0 / NPCI rails...');
        }, 500);
        setTimeout(() => {
            setProcessingStep('Capturing payment and verifying settlement...');
        }, 1100);
        setTimeout(() => {
            const paymentId = `pay_${Math.random().toString(36).substring(2, 11)}`;
            const utr = `4312${Math.floor(10000000 + Math.random() * 90000000)}`;
            let detail = customDetail;
            if (!detail) {
                if (selectedMethod === 'UPI') {
                    if (upiSubMethod === 'NUMBER') {
                        detail = `UPI Mobile · +91 ${upiNumber} (${preferredApp === 'ANY' ? 'PhonePe / GPay' : preferredApp})`;
                    }
                    else if (upiSubMethod === 'VPA') {
                        detail = `UPI ID · ${vpaUsername}${selectedHandle}`;
                    }
                    else if (upiSubMethod === 'INTENT') {
                        detail = 'UPI 1-Tap App · PhonePe / Google Pay';
                    }
                    else {
                        detail = `UPI QR · Scanned to ${receivingVpa}`;
                    }
                }
                else if (selectedMethod === 'CARD') {
                    detail = 'Card · Visa ending 4242';
                }
                else if (selectedMethod === 'NETBANKING') {
                    detail = `NetBanking · ${customBank || selectedBank}`;
                }
                else if (selectedMethod === 'WALLET') {
                    detail = 'Wallet · Amazon Pay';
                }
                else {
                    detail = 'PayLater · Simpl';
                }
            }
            setPaymentResult({
                id: paymentId,
                orderId,
                amount: formattedAmount,
                method: selectedMethod,
                methodDetail: detail,
                utr,
                createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
            });
            setIsProcessing(false);
            setIsVerifying(false);
            setIsCollectSent(false);
            setIsSuccess(true);
        }, 1700);
    };
    const handleSendCollectRequest = () => {
        if (!upiNumber || upiNumber.length < 10)
            return;
        setIsCollectSent(true);
        setCollectTimer(300);
    };
    const handleSendVpaCollectRequest = () => {
        if (!vpaUsername)
            return;
        setIsCollectSent(true);
        setCollectTimer(300);
    };
    const handleCopyVpa = () => {
        navigator.clipboard?.writeText(receivingVpa);
    };
    const formatTimer = (sec) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };
    return (<div className="min-h-screen bg-slate-900/90 flex items-center justify-center p-3 sm:p-4 font-sans antialiased">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col relative border border-slate-200">
        
        {/* Razorpay Authentic Modal Header (Deep Navy #0c2340) */}
        <div className="bg-[#0c2340] text-white p-4 sm:p-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-lg flex items-center justify-center shadow-md shadow-blue-500/20 flex-shrink-0">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm tracking-tight">Acme Technologies</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold flex items-center gap-1 border border-emerald-400/30">
                  <Check className="w-2.5 h-2.5"/>
                  Verified Merchant
                </span>
              </div>
              <p className="text-xs text-slate-300 truncate max-w-xs">{order?.description || orderId}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Amount Payable</span>
            <span className="text-xl sm:text-2xl font-black text-white tabular-nums tracking-tight">{formattedAmount}</span>
          </div>
        </div>

        {/* Razorpay Magic Contact Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3 text-slate-700">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contact</span>
            {isEditingContact ? (<div className="flex items-center gap-2">
                <input type="text" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs w-28"/>
                <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="px-2 py-0.5 bg-white border border-slate-300 rounded text-xs w-40"/>
                <button type="button" onClick={() => setIsEditingContact(false)} className="text-blue-600 font-bold text-[11px]">
                  Save
                </button>
              </div>) : (<div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800">{customerPhone}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 truncate max-w-[160px]">{customerEmail}</span>
              </div>)}
          </div>
          {!isEditingContact && (<button type="button" onClick={() => setIsEditingContact(true)} className="text-blue-600 hover:text-blue-700 p-1 flex items-center gap-1 font-semibold text-[11px]">
              <Edit2 className="w-3 h-3"/>
              <span>Edit</span>
            </button>)}
        </div>

        {/* Content Viewport */}
        {isSuccess ? (<div className="p-8 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-md">
              <CheckCircle2 className="w-10 h-10"/>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Payment Successful</h3>
              <p className="text-xs text-slate-500">
                Your transaction has been processed and confirmed on Indian banking rails.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2.5 text-left max-w-md mx-auto">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Payment ID</span>
                <span className="text-blue-600 font-mono font-bold">{paymentResult?.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Bank Reference (UTR)</span>
                <span className="text-slate-900 font-mono font-bold">{paymentResult?.utr}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Payment Method</span>
                <span className="text-slate-800 font-semibold">{paymentResult?.methodDetail}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Amount Paid</span>
                <span className="font-black text-emerald-600 text-sm tabular-nums">{paymentResult?.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Platform Fees</span>
                <span className="font-bold text-emerald-600">₹0.00 (0% Platform Fee)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Status</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  CAPTURED
                </span>
              </div>
            </div>

            <a href="/" className="inline-block w-full max-w-md py-3 rounded-xl bg-[#0b63e5] hover:bg-[#0957cb] text-white text-xs font-bold shadow-md shadow-blue-500/20 text-center">
              Done & Return to Store
            </a>
          </div>) : isProcessing ? (<div className="p-12 text-center space-y-6">
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"/>
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-600"/>
              </div>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-lg font-black text-slate-800">Processing Your Payment</h4>
              <p className="text-xs font-mono text-slate-500">{processingStep}</p>
            </div>
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
              Please do not press back or refresh the page while we communicate with your bank.
            </p>
          </div>) : (<div className="flex-1 flex flex-col md:flex-row min-h-[460px]">
            {/* Left Method Tabs */}
            <div className="w-full md:w-52 bg-slate-50/80 border-b md:border-b-0 md:border-r border-slate-200 p-3 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-2">
                Payment Options
              </span>

              <button onClick={() => setSelectedMethod('UPI')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${selectedMethod === 'UPI' ? 'bg-[#0b63e5] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200/60'}`}>
                <div className="flex items-center gap-2.5 min-w-0">
                  <Smartphone className="w-4 h-4 flex-shrink-0"/>
                  <span className="truncate">UPI</span>
                </div>
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded uppercase bg-emerald-100 text-emerald-700">
                  Fastest
                </span>
              </button>

              <button onClick={() => setSelectedMethod('CARD')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${selectedMethod === 'CARD' ? 'bg-[#0b63e5] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200/60'}`}>
                <div className="flex items-center gap-2.5 min-w-0">
                  <CreditCard className="w-4 h-4 flex-shrink-0"/>
                  <span className="truncate">Cards</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Visa/MC</span>
              </button>

              <button onClick={() => setSelectedMethod('NETBANKING')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${selectedMethod === 'NETBANKING' ? 'bg-[#0b63e5] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200/60'}`}>
                <div className="flex items-center gap-2.5 min-w-0">
                  <Building2 className="w-4 h-4 flex-shrink-0"/>
                  <span className="truncate">Netbanking</span>
                </div>
                <span className="text-[10px] text-slate-400">All Banks</span>
              </button>

              <button onClick={() => setSelectedMethod('WALLET')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${selectedMethod === 'WALLET' ? 'bg-[#0b63e5] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200/60'}`}>
                <div className="flex items-center gap-2.5 min-w-0">
                  <Wallet className="w-4 h-4 flex-shrink-0"/>
                  <span className="truncate">Wallets</span>
                </div>
              </button>

              <button onClick={() => setSelectedMethod('PAYLATER')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${selectedMethod === 'PAYLATER' ? 'bg-[#0b63e5] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200/60'}`}>
                <div className="flex items-center gap-2.5 min-w-0">
                  <Clock className="w-4 h-4 flex-shrink-0"/>
                  <span className="truncate">Pay Later</span>
                </div>
                <span className="text-[9px] px-1 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">Simpl</span>
              </button>
            </div>

            {/* Right Method Form Pane */}
            <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
              
              {/* UPI Tab */}
              {selectedMethod === 'UPI' && (<div className="space-y-3.5 text-xs">
                  
                  {/* UPI Sub-Mode Switcher Pill Bar */}
                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
                    <button type="button" onClick={() => { setUpiSubMethod('NUMBER'); setIsCollectSent(false); }} className={`flex-1 py-1.5 px-2 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${upiSubMethod === 'NUMBER'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80 font-black'
                    : 'text-slate-600 hover:text-slate-900'}`}>
                      <Phone className="w-3 h-3 text-emerald-600"/>
                      <span>UPI Number</span>
                    </button>

                    <button type="button" onClick={() => { setUpiSubMethod('QR'); setIsCollectSent(false); }} className={`flex-1 py-1.5 px-2 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${upiSubMethod === 'QR'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80 font-black'
                    : 'text-slate-600 hover:text-slate-900'}`}>
                      <QrCode className="w-3 h-3 text-blue-600"/>
                      <span>Scan QR</span>
                    </button>

                    <button type="button" onClick={() => { setUpiSubMethod('INTENT'); setIsCollectSent(false); }} className={`flex-1 py-1.5 px-2 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${upiSubMethod === 'INTENT'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80 font-black'
                    : 'text-slate-600 hover:text-slate-900'}`}>
                      <Zap className="w-3 h-3 text-amber-500"/>
                      <span>UPI Apps</span>
                    </button>

                    <button type="button" onClick={() => { setUpiSubMethod('VPA'); setIsCollectSent(false); }} className={`flex-1 py-1.5 px-2 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${upiSubMethod === 'VPA'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80 font-black'
                    : 'text-slate-600 hover:text-slate-900'}`}>
                      <AtSign className="w-3 h-3 text-purple-600"/>
                      <span>UPI ID</span>
                    </button>
                  </div>

                  {/* SUBMODE 1: UPI VIA MOBILE NUMBER (PHONEPE / GOOGLE PAY) */}
                  {upiSubMethod === 'NUMBER' && (<div className="space-y-3 animate-fadeIn">
                      {!isCollectSent ? (<>
                          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-blue-600"/>
                                Pay via PhonePe, Google Pay or Paytm Number
                              </span>
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                                0% Fees
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500">
                              Enter your 10-digit mobile number linked with your Indian bank account. We will send a payment request directly to your app.
                            </p>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              10-Digit Mobile Number
                            </label>
                            <div className="flex items-center rounded-xl border border-slate-300 bg-white overflow-hidden focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                              <div className="px-3 py-2 bg-slate-50 border-r border-slate-200 flex items-center gap-1.5 text-slate-700 font-bold text-xs">
                                <span>🇮🇳</span>
                                <span>+91</span>
                              </div>
                              <input type="tel" maxLength={10} value={upiNumber} onChange={(e) => setUpiNumber(e.target.value.replace(/\D/g, ''))} placeholder="Enter mobile number" className="flex-1 px-3 py-2 text-xs font-mono font-bold tracking-wider text-slate-800 focus:outline-none"/>
                              {upiNumber.length === 10 && (<div className="pr-3 text-emerald-600 flex items-center gap-1 text-[11px] font-bold">
                                  <CheckCircle className="w-4 h-4"/>
                                  <span>Verified</span>
                                </div>)}
                            </div>
                          </div>

                          {upiNumber.length === 10 && (<div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs flex items-center justify-between animate-fadeIn">
                              <div className="space-y-0.5">
                                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                                  <span>Priya Sharma</span>
                                  <span className="text-[10px] font-normal text-emerald-700">• HDFC Bank (••4092)</span>
                                </div>
                                <div className="text-[10px] text-emerald-600">
                                  Primary UPI handle active on PhonePe & Google Pay
                                </div>
                              </div>
                              <span className="px-2 py-0.5 rounded bg-emerald-200/80 text-emerald-900 font-black text-[9px] uppercase tracking-wider">
                                NPCI Linked
                              </span>
                            </div>)}

                          {/* App Selector */}
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">
                              Preferred UPI App (Optional)
                            </label>
                            <div className="grid grid-cols-4 gap-1.5">
                              {[
                            { id: 'ANY', label: 'Any / Default' },
                            { id: 'PHONEPE', label: 'PhonePe' },
                            { id: 'GPAY', label: 'Google Pay' },
                            { id: 'PAYTM', label: 'Paytm' },
                        ].map((app) => (<button key={app.id} type="button" onClick={() => setPreferredApp(app.id)} className={`py-1.5 px-1 rounded-lg border text-center transition-all cursor-pointer font-bold text-[10px] ${preferredApp === app.id
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'}`}>
                                  {app.label}
                                </button>))}
                            </div>
                          </div>

                          <button type="button" onClick={handleSendCollectRequest} className="w-full py-2.5 rounded-xl bg-[#0b63e5] hover:bg-[#0957cb] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1">
                            <Send className="w-3.5 h-3.5"/>
                            <span>Send Payment Request to +91 {upiNumber || '••••••••••'}</span>
                          </button>
                        </>) : (<div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3.5 text-center animate-fadeIn">
                          <div className="relative w-12 h-12 mx-auto">
                            <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"/>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Smartphone className="w-5 h-5 text-blue-600"/>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <h4 className="font-black text-slate-900 text-sm">
                              Payment Request Sent!
                            </h4>
                            <p className="text-xs text-slate-600 max-w-sm mx-auto">
                              Open <strong>PhonePe</strong>, <strong>Google Pay</strong>, or <strong>Paytm</strong> on mobile <span className="font-mono font-bold text-slate-900">+91 {upiNumber}</span> and approve payment of <strong className="text-blue-600">{formattedAmount}</strong>.
                            </p>
                          </div>

                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-[11px] font-bold">
                            <Clock className="w-3.5 h-3.5"/>
                            <span>Request expires in {formatTimer(collectTimer)}</span>
                          </div>

                          <div className="pt-2 space-y-2">
                            <button type="button" onClick={() => handleSimulatePayment(`UPI Mobile · +91 ${upiNumber} (Approved on PhonePe/GPay)`)} className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer">
                              <Zap className="w-3.5 h-3.5"/>
                              <span>⚡ Approve on PhonePe / GPay (Test Mode)</span>
                            </button>

                            <button type="button" onClick={() => setIsCollectSent(false)} className="text-[11px] text-slate-500 hover:text-slate-800 font-semibold cursor-pointer">
                              Change Mobile Number or Method
                            </button>
                          </div>
                        </div>)}
                    </div>)}

                  {/* SUBMODE 2: DYNAMIC QR CODE */}
                  {upiSubMethod === 'QR' && (<div className="space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border bg-blue-50 text-blue-700 border-blue-200">
                          <Clock className="w-3.5 h-3.5"/>
                          Scan valid for {formatTimer(paymentSeconds)}
                        </div>
                        <span className="text-[11px] font-bold text-emerald-600">0% Platform Fees</span>
                      </div>

                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-28 h-28 bg-white p-2 flex items-center justify-center flex-shrink-0 rounded-xl border border-slate-300 shadow-sm relative">
                          <svg viewBox="0 0 100 100" className="w-24 h-24 text-slate-900">
                            <rect width="100" height="100" fill="white"/>
                            <rect x="8" y="8" width="30" height="30" fill="currentColor" rx="4"/>
                            <rect x="14" y="14" width="18" height="18" fill="white" rx="2"/>
                            <rect x="19" y="19" width="8" height="8" fill="currentColor"/>
                            <rect x="62" y="8" width="30" height="30" fill="currentColor" rx="4"/>
                            <rect x="68" y="14" width="18" height="18" fill="white" rx="2"/>
                            <rect x="73" y="19" width="8" height="8" fill="currentColor"/>
                            <rect x="8" y="62" width="30" height="30" fill="currentColor" rx="4"/>
                            <rect x="14" y="68" width="18" height="18" fill="white" rx="2"/>
                            <rect x="19" y="73" width="8" height="8" fill="currentColor"/>
                            <rect x="44" y="12" width="6" height="6" fill="currentColor"/>
                            <rect x="52" y="22" width="6" height="6" fill="currentColor"/>
                            <rect x="44" y="32" width="6" height="6" fill="currentColor"/>
                            <rect x="52" y="42" width="8" height="8" fill="currentColor"/>
                            <rect x="42" y="52" width="8" height="6" fill="currentColor"/>
                            <rect x="62" y="52" width="6" height="6" fill="currentColor"/>
                            <rect x="72" y="62" width="8" height="8" fill="currentColor"/>
                            <rect x="52" y="72" width="6" height="8" fill="currentColor"/>
                            <rect x="62" y="82" width="12" height="6" fill="currentColor"/>
                            <rect x="80" y="72" width="8" height="8" fill="currentColor"/>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-md bg-[#0b63e5] text-white font-black text-[9px] flex items-center justify-center shadow-sm">
                              UPI
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5 text-center sm:text-left flex-1">
                          <div className="font-black text-slate-900 text-xs">Scan with any Indian UPI App</div>
                          <p className="text-[11px] text-slate-500">
                            Google Pay, PhonePe, Paytm, CRED or BHIM
                          </p>
                          <div className="flex items-center justify-center sm:justify-start gap-1.5 pt-1">
                            <span className="font-mono text-[11px] text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                              {receivingVpa}
                            </span>
                            <button onClick={handleCopyVpa} className="text-blue-600 hover:text-blue-700 p-1">
                              <Copy className="w-3.5 h-3.5"/>
                            </button>
                          </div>

                          <button type="button" onClick={() => handleSimulatePayment('UPI QR · PhonePe Scanned')} className="mt-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] flex items-center gap-1.5 shadow-sm transition-all cursor-pointer">
                            <Zap className="w-3 h-3"/>
                            <span>⚡ Simulate QR Scan & Pay</span>
                          </button>
                        </div>
                      </div>

                      <button onClick={() => handleSimulatePayment()} className="w-full py-2.5 rounded-xl bg-[#0b63e5] hover:bg-[#0957cb] text-white text-xs font-bold shadow-md shadow-blue-500/20">
                        I Have Paid — Verify Payment
                      </button>
                    </div>)}

                  {/* SUBMODE 3: 1-TAP UPI APP INTENTS */}
                  {upiSubMethod === 'INTENT' && (<div className="space-y-3 animate-fadeIn">
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                        <span className="font-bold text-slate-800 text-[11px] block mb-1">
                          Select Installed UPI App
                        </span>
                        <p className="text-[11px] text-slate-500">
                          Tap any app below to launch payment directly or simulate instant authorization.
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2.5">
                        <button type="button" onClick={() => handleSimulatePayment('UPI · Google Pay App')} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 bg-white text-slate-800 transition-all text-center cursor-pointer shadow-sm group">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-black flex items-center justify-center text-sm border border-blue-200 group-hover:scale-105 transition-transform">
                            GPay
                          </div>
                          <span className="text-[11px] font-bold">Google Pay</span>
                        </button>

                        <button type="button" onClick={() => handleSimulatePayment('UPI · PhonePe App')} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/50 bg-white text-slate-800 transition-all text-center cursor-pointer shadow-sm group">
                          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center text-sm shadow-sm group-hover:scale-105 transition-transform">
                            Pe
                          </div>
                          <span className="text-[11px] font-bold">PhonePe</span>
                        </button>

                        <button type="button" onClick={() => handleSimulatePayment('UPI · Paytm App')} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 hover:border-cyan-500 hover:bg-cyan-50/50 bg-white text-slate-800 transition-all text-center cursor-pointer shadow-sm group">
                          <div className="w-10 h-10 rounded-xl bg-[#00b9f5] text-white font-black flex items-center justify-center text-xs shadow-sm group-hover:scale-105 transition-transform">
                            Paytm
                          </div>
                          <span className="text-[11px] font-bold">Paytm</span>
                        </button>

                        <button type="button" onClick={() => handleSimulatePayment('UPI · CRED UPI')} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 hover:border-slate-800 hover:bg-slate-100 bg-white text-slate-800 transition-all text-center cursor-pointer shadow-sm group">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-xs shadow-sm group-hover:scale-105 transition-transform">
                            CRED
                          </div>
                          <span className="text-[11px] font-bold">CRED UPI</span>
                        </button>

                        <button type="button" onClick={() => handleSimulatePayment('UPI · BHIM NPCI')} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 hover:border-orange-500 hover:bg-orange-50/50 bg-white text-slate-800 transition-all text-center cursor-pointer shadow-sm group">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-orange-500 to-emerald-600 text-white font-black flex items-center justify-center text-[10px] shadow-sm group-hover:scale-105 transition-transform">
                            BHIM
                          </div>
                          <span className="text-[11px] font-bold">BHIM</span>
                        </button>

                        <button type="button" onClick={() => handleSimulatePayment('UPI · Amazon Pay')} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 bg-white text-slate-800 transition-all text-center cursor-pointer shadow-sm group">
                          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-black flex items-center justify-center text-xs shadow-sm group-hover:scale-105 transition-transform">
                            Amzn
                          </div>
                          <span className="text-[11px] font-bold">Amazon Pay</span>
                        </button>
                      </div>
                    </div>)}

                  {/* SUBMODE 4: UPI ID / VPA */}
                  {upiSubMethod === 'VPA' && (<div className="space-y-3 animate-fadeIn">
                      {!isCollectSent ? (<>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                              Enter UPI ID / VPA
                            </label>
                            <div className="flex items-center rounded-xl border border-slate-300 bg-white overflow-hidden focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                              <input type="text" value={vpaUsername} onChange={(e) => setVpaUsername(e.target.value)} placeholder="username" className="flex-1 px-3 py-2 text-xs font-mono font-bold text-slate-800 focus:outline-none"/>
                              <div className="px-2.5 py-2 bg-slate-100 border-l border-slate-200 text-slate-600 font-mono text-xs font-bold">
                                {selectedHandle}
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                              Popular UPI Handles
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {['@okhdfcbank', '@oksbi', '@okaxis', '@ybl', '@paytm', '@ibl', '@upi'].map((h) => (<button key={h} type="button" onClick={() => setSelectedHandle(h)} className={`px-2 py-1 rounded-md text-[10px] font-mono font-bold border transition-all cursor-pointer ${selectedHandle === h
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}>
                                  {h}
                                </button>))}
                            </div>
                          </div>

                          {isVpaVerified && (<div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs flex items-center justify-between">
                              <div className="text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600"/>
                                <span>Verified: Priya Sharma</span>
                              </div>
                              <span className="text-[10px] text-emerald-700 font-mono">{vpaUsername}{selectedHandle}</span>
                            </div>)}

                          <button type="button" onClick={handleSendVpaCollectRequest} className="w-full py-2.5 rounded-xl bg-[#0b63e5] hover:bg-[#0957cb] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1">
                            <Send className="w-3.5 h-3.5"/>
                            <span>Verify & Pay {formattedAmount}</span>
                          </button>
                        </>) : (<div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3.5 text-center animate-fadeIn">
                          <div className="relative w-12 h-12 mx-auto">
                            <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"/>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <AtSign className="w-5 h-5 text-blue-600"/>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <h4 className="font-black text-slate-900 text-sm">
                              Collect Request Dispatched!
                            </h4>
                            <p className="text-xs text-slate-600 max-w-sm mx-auto">
                              A payment notification for <strong className="text-blue-600">{formattedAmount}</strong> has been sent to <span className="font-mono font-bold text-slate-900">{vpaUsername}{selectedHandle}</span>.
                            </p>
                          </div>

                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-[11px] font-bold">
                            <Clock className="w-3.5 h-3.5"/>
                            <span>Request expires in {formatTimer(collectTimer)}</span>
                          </div>

                          <div className="pt-2 space-y-2">
                            <button type="button" onClick={() => handleSimulatePayment(`UPI ID · ${vpaUsername}${selectedHandle}`)} className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer">
                              <Zap className="w-3.5 h-3.5"/>
                              <span>⚡ Approve Payment (Test Mode)</span>
                            </button>

                            <button type="button" onClick={() => setIsCollectSent(false)} className="text-[11px] text-slate-500 hover:text-slate-800 font-semibold cursor-pointer">
                              Cancel & Change VPA
                            </button>
                          </div>
                        </div>)}
                    </div>)}

                </div>)}

              {/* CARD Tab */}
              {selectedMethod === 'CARD' && (<div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase">Card Number</label>
                    <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-slate-800 font-mono tracking-wider focus:outline-none focus:border-blue-600 focus:bg-white"/>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase">Valid Thru</label>
                      <input type="text" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-mono"/>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase">CVV</label>
                      <input type="password" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} maxLength={4} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-mono"/>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase">Name on Card</label>
                    <input type="text" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"/>
                  </div>

                  <button onClick={() => handleSimulatePayment('Card · Visa ending 4242')} className="w-full py-2.5 rounded-xl bg-[#0b63e5] hover:bg-[#0957cb] text-white text-xs font-bold shadow-md shadow-blue-500/20">
                    Pay {formattedAmount} with Card
                  </button>
                </div>)}

              {/* NETBANKING Tab */}
              {selectedMethod === 'NETBANKING' && (<div className="space-y-3.5 text-xs">
                  <span className="text-slate-700 block font-bold text-[11px] uppercase">Select Popular Bank</span>
                  <div className="grid grid-cols-2 gap-2">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((b) => (<button key={b} onClick={() => setSelectedBank(b)} className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${selectedBank === b ? 'bg-blue-50 text-blue-900 border-blue-500 font-bold' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                        <span className="truncate">{b}</span>
                        {selectedBank === b && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0"/>}
                      </button>))}
                  </div>

                  <button onClick={() => handleSimulatePayment(`NetBanking · ${selectedBank}`)} className="w-full py-2.5 rounded-xl bg-[#0b63e5] hover:bg-[#0957cb] text-white text-xs font-bold shadow-md shadow-blue-500/20">
                    Proceed with {selectedBank}
                  </button>
                </div>)}

              {/* WALLET Tab */}
              {selectedMethod === 'WALLET' && (<div className="space-y-3 text-xs">
                  <span className="text-slate-700 block font-bold text-[11px] uppercase">Digital Wallets</span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {['Amazon Pay', 'Paytm Wallet', 'MobiKwik', 'PhonePe Wallet'].map((w) => (<button key={w} className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 text-slate-800 font-semibold text-left flex items-center justify-between" onClick={() => handleSimulatePayment(`Wallet · ${w}`)}>
                        <span>{w}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400"/>
                      </button>))}
                  </div>
                </div>)}

              {/* PAY LATER Tab */}
              {selectedMethod === 'PAYLATER' && (<div className="space-y-3 text-xs">
                  <span className="text-slate-700 block font-bold text-[11px] uppercase">Buy Now, Pay Later</span>
                  <div className="space-y-2">
                    <button onClick={() => handleSimulatePayment('PayLater · Simpl')} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 text-slate-800 font-semibold text-left flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">Simpl</div>
                        <div className="text-[11px] text-slate-500">Pay in 3 split interest-free cycles</div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                        Eligible
                      </span>
                    </button>
                  </div>
                </div>)}

              {/* Developer Sandbox Simulator Bar */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <Zap className="w-3.5 h-3.5 text-amber-500"/>
                  <span className="font-semibold text-slate-700">Sandbox Test Mode</span>
                </div>
                <button onClick={() => handleSimulatePayment()} className="px-3 py-1 rounded-lg bg-[#0c2340] text-white hover:bg-slate-800 font-bold text-[10px] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer">
                  <span>⚡ Instant Test Payment</span>
                </button>
              </div>

            </div>
          </div>)}

        {/* Buimb-Pay Authentic Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-blue-600"/>
            <span>Secured by <strong className="text-slate-800 font-bold">Buimb-Pay</strong> · 256-Bit Bank Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-slate-400">PCI-DSS Level 1</span>
          </div>
        </div>
      </div>
    </div>);
}
