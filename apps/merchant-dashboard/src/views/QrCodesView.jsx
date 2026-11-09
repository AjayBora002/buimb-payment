import React, { useState } from 'react';
import { QrCode, Volume2, VolumeX, ArrowRightLeft, Store, Banknote, Sparkles, Download, Share2, CheckCircle2, Clock, RefreshCw, Zap, } from 'lucide-react';
const TERMINALS = [
    {
        id: 'term_01',
        name: 'Main Billing Counter (HQ)',
        code: 'POS-BLR-01',
        vpa: 'buimbpay.acme@icici',
        status: 'ACTIVE',
        balance: 48250,
    },
    {
        id: 'term_02',
        name: 'Express Drive-Thru Terminal',
        code: 'POS-BLR-02',
        vpa: 'acme.express@buimbpay',
        status: 'ACTIVE',
        balance: 19400,
    },
    {
        id: 'term_03',
        name: 'Indiranagar Flagship Store',
        code: 'POS-SUB-09',
        vpa: 'acme.indiranagar@yesbank',
        status: 'ACTIVE',
        balance: 62100,
    },
    {
        id: 'term_04',
        name: 'Mumbai Bandra Sub-Merchant',
        code: 'POS-MUM-14',
        vpa: 'acme.bandra@hdfcbank',
        status: 'ACTIVE',
        balance: 35000,
    },
];
export const QrCodesView = () => {
    const [activeTab, setActiveTab] = useState('qr');
    const [selectedTerminal, setSelectedTerminal] = useState(TERMINALS[0]);
    const [qrAmount, setQrAmount] = useState('500');
    const [orderNote, setOrderNote] = useState('Store Sale');
    const [paymentStatus, setPaymentStatus] = useState('IDLE');
    const [lastPayment, setLastPayment] = useState(null);
    // Soundbox Settings
    const [soundboxEnabled, setSoundboxEnabled] = useState(true);
    const [soundboxLang, setSoundboxLang] = useState('hi');
    // Cash Exchange State
    const [cashAmount, setCashAmount] = useState('1000');
    const [cashPhone, setCashPhone] = useState('9988776655');
    const [exchangeHistory, setExchangeHistory] = useState([
        {
            id: 'CE-9401',
            time: '10 mins ago',
            customerPhone: '98450*****',
            cashGiven: 1000,
            digitalCredited: 1005,
            commission: 5,
            rrn: '427189102931',
            status: 'SUCCESS',
        },
        {
            id: 'CE-9400',
            time: '42 mins ago',
            customerPhone: '97312*****',
            cashGiven: 500,
            digitalCredited: 502.5,
            commission: 2.5,
            rrn: '427189081240',
            status: 'SUCCESS',
        },
        {
            id: 'CE-9399',
            time: '2 hours ago',
            customerPhone: '91234*****',
            cashGiven: 2000,
            digitalCredited: 2010,
            commission: 10,
            rrn: '427188941019',
            status: 'SUCCESS',
        },
    ]);
    // Audio Announcement synthesis (Soundbox effect)
    const playSoundboxAnnouncement = (amount, lang = soundboxLang) => {
        if (!soundboxEnabled)
            return;
        try {
            // 1. Play dual-frequency sound chime via Web Audio API
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                const audioCtx = new AudioContextClass();
                const osc1 = audioCtx.createOscillator();
                const osc2 = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                osc1.type = 'sine';
                osc1.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
                osc1.frequency.setValueAtTime(880, audioCtx.currentTime + 0.12); // A5
                osc2.type = 'triangle';
                osc2.frequency.setValueAtTime(880, audioCtx.currentTime + 0.12);
                osc2.frequency.setValueAtTime(1174.66, audioCtx.currentTime + 0.25); // D6
                gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
                osc1.connect(gainNode);
                osc2.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                osc1.start();
                osc2.start();
                osc1.stop(audioCtx.currentTime + 0.6);
                osc2.stop(audioCtx.currentTime + 0.6);
            }
            // 2. Play speech announcement
            if ('speechSynthesis' in window) {
                setTimeout(() => {
                    const text = lang === 'hi'
                        ? `BuimbPay par ${amount} rupaye prapt hue`
                        : `Payment of ${amount} rupees received on BuimbPay`;
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
                    utterance.rate = 0.95;
                    utterance.pitch = 1.05;
                    window.speechSynthesis.speak(utterance);
                }, 500);
            }
        }
        catch {
            // Fallback silently if audio context is blocked
        }
    };
    const handleSimulatePayment = () => {
        const amt = parseFloat(qrAmount) || 500;
        setPaymentStatus('PENDING');
        setTimeout(() => {
            setPaymentStatus('SUCCESS');
            const rrn = Math.floor(100000000000 + Math.random() * 900000000000).toString();
            setLastPayment({
                amount: amt,
                payer: 'Rohan Sharma (rohan@okhdfcbank)',
                time: 'Just now',
                rrn,
            });
            playSoundboxAnnouncement(amt);
        }, 1200);
    };
    const handleExecuteCashExchange = () => {
        const cash = parseFloat(cashAmount) || 1000;
        const commission = Math.round(cash * 0.005 * 10) / 10;
        const digitalCredited = cash + commission;
        const rrn = Math.floor(100000000000 + Math.random() * 900000000000).toString();
        const newRecord = {
            id: `CE-${Math.floor(9400 + Math.random() * 100)}`,
            time: 'Just now',
            customerPhone: cashPhone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2'),
            cashGiven: cash,
            digitalCredited,
            commission,
            rrn,
            status: 'SUCCESS',
        };
        setExchangeHistory([newRecord, ...exchangeHistory]);
        playSoundboxAnnouncement(digitalCredited);
    };
    return (<div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(237,231,214,0.08)] pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-[#0f172a] flex items-center gap-2">
              <QrCode className="w-5 h-5 text-[#0b63e5]"/>
              Smart QR & Merchant Cash Exchange
            </h1>
            <span className="px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold bg-[#4E8B6F]/10 text-[#4E8B6F] border border-[#4E8B6F] uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3 h-3"/> Live Interoperable QR
            </span>
          </div>
          <p className="text-xs text-[#64748b] mt-1">
            Accept UPI & BharatQR, trigger live multilingual Soundbox audio announcements, and execute Cash @ POS merchant exchange.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[white] p-1 border border-[rgba(237,231,214,0.08)]">
          <button onClick={() => setActiveTab('qr')} className={`px-3.5 py-1.5 rounded-[4px] text-xs font-semibold transition-all ${activeTab === 'qr'
            ? 'bg-[#0b63e5] text-[#f8fafc]'
            : 'text-[#64748b] hover:text-[#0f172a]'}`}>
            Dynamic QR & Soundbox
          </button>
          <button onClick={() => setActiveTab('exchange')} className={`px-3.5 py-1.5 rounded-[4px] text-xs font-semibold transition-all flex items-center gap-1.5 ${activeTab === 'exchange'
            ? 'bg-[#0b63e5] text-[#f8fafc]'
            : 'text-[#64748b] hover:text-[#0f172a]'}`}>
            <ArrowRightLeft className="w-3.5 h-3.5"/>
            Merchant Exchange (Cash @ POS)
          </button>
          <button onClick={() => setActiveTab('terminals')} className={`px-3.5 py-1.5 rounded-[4px] text-xs font-semibold transition-all flex items-center gap-1.5 ${activeTab === 'terminals'
            ? 'bg-[#0b63e5] text-[#f8fafc]'
            : 'text-[#64748b] hover:text-[#0f172a]'}`}>
            <Store className="w-3.5 h-3.5"/>
            Terminals ({TERMINALS.length})
          </button>
        </div>
      </div>

      {/* Active Terminal Info Bar */}
      <div className="bg-[white] border border-[rgba(237,231,214,0.08)] p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[2px] bg-[#f8fafc] border border-[rgba(237,231,214,0.12)] flex items-center justify-center text-[#0b63e5]">
            <Store className="w-4 h-4"/>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#0f172a]">{selectedTerminal.name}</span>
              <span className="text-[11px] font-mono text-[#0b63e5] border border-[#0b63e5]/40 px-1.5 py-0.2 rounded-[2px]">
                {selectedTerminal.code}
              </span>
            </div>
            <p className="text-xs text-[#64748b] font-mono mt-0.5">
              Receiving VPA: <span className="text-[#0f172a] font-medium">{selectedTerminal.vpa}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[11px] font-mono uppercase text-[#64748b]">Today's QR Volume</span>
            <p className="text-base font-mono font-bold text-[#0f172a]">₹{selectedTerminal.balance.toLocaleString('en-IN')}</p>
          </div>
          <select value={selectedTerminal.id} onChange={(e) => {
            const term = TERMINALS.find((t) => t.id === e.target.value);
            if (term)
                setSelectedTerminal(term);
        }} className="bg-[#f8fafc] border border-[rgba(237,231,214,0.12)] text-[#0f172a] text-xs rounded-[4px] px-3 py-2 focus:outline-none focus:border-[#0b63e5]">
            {TERMINALS.map((t) => (<option key={t.id} value={t.id}>
                Switch to {t.name}
              </option>))}
          </select>
        </div>
      </div>

      {/* TAB 1: DYNAMIC QR & SOUNDBOX */}
      {activeTab === 'qr' && (<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: QR Generator & Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[white] border border-[rgba(237,231,214,0.08)] p-6">
              <h2 className="text-sm font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0b63e5]"/>
                Generate Dynamic Bill QR
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#64748b] mb-1.5">
                    Amount (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-mono text-[#64748b]">₹</span>
                    <input type="number" value={qrAmount} onChange={(e) => {
                setQrAmount(e.target.value);
                setPaymentStatus('IDLE');
            }} className="w-full pl-8 pr-4 py-2 bg-[#f8fafc] border border-[rgba(237,231,214,0.12)] rounded-[4px] text-[#0f172a] font-mono font-bold text-base focus:outline-none focus:border-[#0b63e5]" placeholder="0.00"/>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#64748b] mb-1.5">
                    Bill / Order Note
                  </label>
                  <input type="text" value={orderNote} onChange={(e) => setOrderNote(e.target.value)} className="w-full px-4 py-2 bg-[#f8fafc] border border-[rgba(237,231,214,0.12)] rounded-[4px] text-[#0f172a] text-xs focus:outline-none focus:border-[#0b63e5]" placeholder="e.g. Counter Order #1042"/>
                </div>
              </div>

              {/* Quick Amount Chips */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs font-mono text-[#64748b]">Quick Slabs:</span>
                {['100', '250', '500', '1000', '2499', '5000'].map((amt) => (<button key={amt} type="button" onClick={() => {
                    setQrAmount(amt);
                    setPaymentStatus('IDLE');
                }} className={`px-2.5 py-1 rounded-[4px] text-xs font-mono transition-all ${qrAmount === amt
                    ? 'bg-[#0b63e5] text-[#f8fafc] font-bold'
                    : 'bg-[#f8fafc] text-[#64748b] hover:text-[#0f172a] border border-[rgba(237,231,214,0.08)]'}`}>
                    +₹{amt}
                  </button>))}
              </div>

              {/* Simulation CTA */}
              <div className="pt-4 border-t border-[rgba(237,231,214,0.08)] flex flex-wrap items-center justify-between gap-3">
                <button type="button" onClick={handleSimulatePayment} disabled={paymentStatus === 'PENDING'} className="px-5 py-2.5 rounded-[4px] bg-[#0b63e5] hover:bg-[#d8b030] text-[#f8fafc] font-semibold text-xs flex items-center gap-2 transition-all disabled:opacity-50">
                  {paymentStatus === 'PENDING' ? (<>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin"/>
                      Scanning UPI Payment...
                    </>) : (<>
                      <Zap className="w-3.5 h-3.5"/>
                      Simulate Customer Scan & Pay
                    </>)}
                </button>

                <button type="button" onClick={() => {
                setPaymentStatus('IDLE');
                setLastPayment(null);
            }} className="text-xs font-mono text-[#64748b] hover:text-[#0f172a] transition-colors">
                  Reset Terminal
                </button>
              </div>
            </div>

            {/* Smart Soundbox Hardware Card */}
            <div className="bg-[white] border border-[rgba(237,231,214,0.08)] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[2px] bg-[#f8fafc] border border-[rgba(237,231,214,0.12)] flex items-center justify-center text-[#0b63e5]">
                    <Volume2 className="w-4 h-4"/>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#0f172a] flex items-center gap-2">
                      BuimbPay Soundbox (Voice Alert)
                      <span className="w-2 h-2 rounded-full bg-[#4E8B6F]"></span>
                    </h3>
                    <p className="text-xs font-mono text-[#64748b]">4G SIM Connected • Battery 94% • Firmware v2.4.1</p>
                  </div>
                </div>

                <button onClick={() => setSoundboxEnabled(!soundboxEnabled)} className={`p-2 rounded-[4px] border transition-all ${soundboxEnabled
                ? 'bg-[#4E8B6F]/10 border-[#4E8B6F] text-[#4E8B6F]'
                : 'bg-[#B0503F]/10 border-[#B0503F] text-[#B0503F]'}`} title={soundboxEnabled ? 'Mute Soundbox' : 'Unmute Soundbox'}>
                  {soundboxEnabled ? <Volume2 className="w-4 h-4"/> : <VolumeX className="w-4 h-4"/>}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[rgba(237,231,214,0.08)]">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#64748b] mb-1">
                    Announcement Language
                  </label>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setSoundboxLang('hi')} className={`flex-1 py-1.5 px-3 rounded-[4px] text-xs font-mono transition-all ${soundboxLang === 'hi'
                ? 'bg-[#0b63e5] text-[#f8fafc] font-bold'
                : 'bg-[#f8fafc] border border-[rgba(237,231,214,0.12)] text-[#64748b]'}`}>
                      🇮🇳 Hindi (हिन्दी)
                    </button>
                    <button type="button" onClick={() => setSoundboxLang('en')} className={`flex-1 py-1.5 px-3 rounded-[4px] text-xs font-mono transition-all ${soundboxLang === 'en'
                ? 'bg-[#0b63e5] text-[#f8fafc] font-bold'
                : 'bg-[#f8fafc] border border-[rgba(237,231,214,0.12)] text-[#64748b]'}`}>
                      🇬🇧 English
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#64748b] mb-1">
                    Soundbox Voice Test
                  </label>
                  <button type="button" onClick={() => playSoundboxAnnouncement(parseFloat(qrAmount) || 500)} className="w-full py-1.5 px-3 rounded-[4px] bg-[#f8fafc] hover:bg-[#f8fafc]/80 border border-[rgba(237,231,214,0.12)] text-xs font-mono text-[#0f172a] flex items-center justify-center gap-1.5 transition-all">
                    <Volume2 className="w-3.5 h-3.5 text-[#0b63e5]"/>
                    Play Test Audio (₹{qrAmount})
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Counter Standee Display */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm bg-[#0f172a] text-[#f8fafc] border-2 border-[#0b63e5] p-6 relative">
              {/* Standee Branding Header */}
              <div className="text-center pb-4 border-b border-[rgba(19,27,23,0.15)] mb-4">
                <div className="inline-flex items-center gap-1.5 border border-[#f8fafc] px-2.5 py-0.5 rounded-[2px] font-mono text-[11px] font-bold mb-2">
                  <Store className="w-3 h-3 text-[#f8fafc]"/>
                  {selectedTerminal.name}
                </div>
                <h4 className="text-lg font-bold tracking-tight">
                  Buimb<span className="text-[#0b63e5]">Pay</span>
                </h4>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#5C5646]">All-In-One Interoperable BharatQR</p>
              </div>

              {/* QR Code Container */}
              <div className="bg-[#F6F3EA] p-4 border border-[rgba(19,27,23,0.15)] flex flex-col items-center justify-center relative">
                {/* Simulated High-Res QR SVG */}
                <div className="w-52 h-52 bg-white flex items-center justify-center relative p-2 border border-black/10">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#f8fafc]" fill="currentColor">
                    {/* Top-left marker */}
                    <rect x="5" y="5" width="28" height="28" fill="#f8fafc" rx="1"/>
                    <rect x="9" y="9" width="20" height="20" fill="#fff" rx="1"/>
                    <rect x="13" y="13" width="12" height="12" fill="#0b63e5" rx="1"/>

                    {/* Top-right marker */}
                    <rect x="67" y="5" width="28" height="28" fill="#f8fafc" rx="1"/>
                    <rect x="71" y="9" width="20" height="20" fill="#fff" rx="1"/>
                    <rect x="75" y="13" width="12" height="12" fill="#0b63e5" rx="1"/>

                    {/* Bottom-left marker */}
                    <rect x="5" y="67" width="28" height="28" fill="#f8fafc" rx="1"/>
                    <rect x="9" y="71" width="20" height="20" fill="#fff" rx="1"/>
                    <rect x="13" y="75" width="12" height="12" fill="#0b63e5" rx="1"/>

                    {/* Data dots pattern */}
                    <rect x="38" y="8" width="5" height="5"/>
                    <rect x="48" y="8" width="5" height="5"/>
                    <rect x="56" y="8" width="5" height="5"/>
                    <rect x="38" y="18" width="5" height="5"/>
                    <rect x="48" y="24" width="8" height="5"/>
                    <rect x="58" y="18" width="5" height="5"/>

                    <rect x="8" y="38" width="5" height="5"/>
                    <rect x="18" y="38" width="5" height="5"/>
                    <rect x="26" y="44" width="6" height="6"/>
                    <rect x="8" y="48" width="8" height="5"/>
                    <rect x="18" y="56" width="6" height="6"/>

                    <rect x="38" y="38" width="6" height="6"/>
                    <rect x="56" y="38" width="6" height="6"/>
                    <rect x="46" y="46" width="8" height="8"/>
                    <rect x="38" y="56" width="6" height="6"/>
                    <rect x="56" y="56" width="6" height="6"/>

                    <rect x="68" y="38" width="5" height="5"/>
                    <rect x="78" y="38" width="8" height="5"/>
                    <rect x="88" y="44" width="5" height="5"/>
                    <rect x="72" y="48" width="6" height="6"/>
                    <rect x="84" y="56" width="8" height="6"/>

                    <rect x="38" y="68" width="6" height="6"/>
                    <rect x="48" y="68" width="6" height="6"/>
                    <rect x="58" y="74" width="6" height="6"/>
                    <rect x="38" y="82" width="6" height="6"/>
                    <rect x="48" y="82" width="6" height="6"/>
                    <rect x="58" y="86" width="6" height="6"/>

                    <rect x="68" y="68" width="6" height="6"/>
                    <rect x="78" y="68" width="6" height="6"/>
                    <rect x="88" y="74" width="6" height="6"/>
                    <rect x="68" y="82" width="6" height="6"/>
                    <rect x="78" y="82" width="6" height="6"/>
                    <rect x="88" y="86" width="6" height="6"/>
                  </svg>

                  {/* Central Badge Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-[2px] bg-[#0f172a] border-2 border-[#f8fafc] flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[#f8fafc] fill-[#f8fafc]"/>
                    </div>
                  </div>

                  {/* Success Overlay when paid */}
                  {paymentStatus === 'SUCCESS' && (<div className="absolute inset-0 bg-[#4E8B6F] flex flex-col items-center justify-center text-[#0f172a] p-4 text-center">
                      <CheckCircle2 className="w-12 h-12 mb-2 text-[#0f172a]"/>
                      <span className="text-xl font-mono font-bold">₹{qrAmount}</span>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">Payment Received</span>
                      <span className="text-[10px] font-mono opacity-80 mt-1">Soundbox Alert Fired</span>
                    </div>)}
                </div>

                <div className="mt-3 text-center">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-[#f8fafc]">
                    SCAN & PAY WITH ANY UPI APP
                  </span>
                  <div className="flex items-center justify-center gap-2 mt-1.5">
                    {['PhonePe', 'GPay', 'Paytm', 'BHIM'].map((app) => (<span key={app} className="text-[10px] font-mono font-semibold text-[#f8fafc] bg-[#0f172a] border border-[#f8fafc]/30 px-1.5 py-0.5 rounded-[2px]">
                        {app}
                      </span>))}
                  </div>
                </div>
              </div>

              {/* Dynamic Bill Amount footer on Standee */}
              <div className="mt-4 pt-3 border-t border-[rgba(19,27,23,0.15)] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#5C5646] uppercase text-[10px]">Payable Amount</span>
                  <p className="text-lg font-bold text-[#f8fafc]">₹{parseFloat(qrAmount || '0').toLocaleString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <span className="text-[#5C5646] uppercase text-[10px]">Status</span>
                  <p className={`font-bold uppercase tracking-wider ${paymentStatus === 'SUCCESS' ? 'text-[#4E8B6F]' : 'text-[#C98A2E]'}`}>
                    {paymentStatus === 'SUCCESS' ? 'Verified' : 'Waiting...'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <button type="button" onClick={() => alert(`Standee PDF template for ${selectedTerminal.name} downloaded.`)} className="flex-1 py-2 rounded-[4px] bg-[#f8fafc] hover:bg-[white] text-[#0f172a] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all">
                  <Download className="w-3.5 h-3.5 text-[#0b63e5]"/>
                  Print Standee
                </button>
                <button type="button" onClick={() => alert(`UPI link copied: upi://pay?pa=${selectedTerminal.vpa}&am=${qrAmount}`)} className="px-3 py-2 rounded-[4px] bg-[#f8fafc] hover:bg-[white] text-[#0f172a] text-xs font-semibold flex items-center justify-center transition-all" title="Share UPI Link">
                  <Share2 className="w-3.5 h-3.5 text-[#0b63e5]"/>
                </button>
              </div>
            </div>

            {/* Last Transaction Toast Info */}
            {lastPayment && (<div className="mt-4 w-full max-w-sm bg-[white] border border-[#4E8B6F] p-3 text-xs">
                <div className="flex items-center justify-between text-[#4E8B6F] font-mono font-semibold mb-1">
                  <span>Last Received</span>
                  <span>RRN: {lastPayment.rrn}</span>
                </div>
                <p className="font-mono text-[#0f172a]">₹{lastPayment.amount} from {lastPayment.payer}</p>
              </div>)}
          </div>
        </div>)}

      {/* TAB 2: MERCHANT EXCHANGE (CASH @ POS) */}
      {activeTab === 'exchange' && (<div className="space-y-6">
          <div className="bg-[white] border border-[rgba(237,231,214,0.08)] p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border border-[#0b63e5] text-[#0b63e5] uppercase tracking-wider">
                  RBI Master Direction Cash @ POS & B2B Settlement
                </span>
                <h2 className="text-lg font-bold text-[#0f172a] mt-2">
                  Merchant Exchange: Cash @ POS & Mini-ATM Facility
                </h2>
                <p className="text-xs text-[#64748b] max-w-2xl mt-1">
                  Customers scan your Merchant QR to withdraw physical cash. You dispense cash from your shop counter; the digital amount + 0.5% merchant incentive is instantly credited to your BuimbPay nodal wallet!
                </p>
              </div>

              <div className="bg-[#f8fafc] p-4 border border-[rgba(237,231,214,0.08)] text-center min-w-[200px]">
                <span className="text-[11px] font-mono text-[#64748b] uppercase">Exchange Incentive Earned</span>
                <p className="text-2xl font-mono font-bold text-[#4E8B6F] mt-1">₹4,820.50</p>
                <span className="text-[11px] font-mono text-[#0b63e5]">384 exchanges this month</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Cash Dispense Form */}
            <div className="lg:col-span-5 bg-[white] border border-[rgba(237,231,214,0.08)] p-6">
              <h3 className="text-sm font-semibold text-[#0f172a] mb-4 flex items-center gap-2">
                <Banknote className="w-4 h-4 text-[#4E8B6F]"/>
                Initiate Cash Dispense (Cash @ POS)
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#64748b] mb-1">
                    Customer Mobile Number
                  </label>
                  <input type="tel" value={cashPhone} onChange={(e) => setCashPhone(e.target.value)} className="w-full px-4 py-2 bg-[#f8fafc] border border-[rgba(237,231,214,0.12)] rounded-[4px] text-[#0f172a] font-mono text-xs focus:outline-none focus:border-[#0b63e5]" placeholder="10-digit mobile"/>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#64748b] mb-1">
                    Cash Requested to Handover (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-mono text-[#64748b]">₹</span>
                    <input type="number" value={cashAmount} onChange={(e) => setCashAmount(e.target.value)} className="w-full pl-8 pr-4 py-2 bg-[#f8fafc] border border-[rgba(237,231,214,0.12)] rounded-[4px] text-[#0f172a] font-mono font-bold text-base focus:outline-none focus:border-[#0b63e5]"/>
                  </div>
                </div>

                {/* Slabs */}
                <div className="flex gap-2">
                  {['500', '1000', '1500', '2000'].map((amt) => (<button key={amt} type="button" onClick={() => setCashAmount(amt)} className={`flex-1 py-1.5 rounded-[4px] text-xs font-mono transition-all ${cashAmount === amt
                    ? 'bg-[#4E8B6F] text-[#f8fafc] font-bold'
                    : 'bg-[#f8fafc] border border-[rgba(237,231,214,0.12)] text-[#64748b]'}`}>
                      ₹{amt}
                    </button>))}
                </div>

                {/* Breakdown Calculation */}
                <div className="bg-[#f8fafc] p-3.5 border border-[rgba(237,231,214,0.08)] space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-[#64748b]">
                    <span>Cash handed to customer:</span>
                    <span className="text-[#0f172a] font-medium">₹{parseFloat(cashAmount || '0')}</span>
                  </div>
                  <div className="flex justify-between text-[#4E8B6F]">
                    <span>Merchant incentive (+0.5%):</span>
                    <span className="font-semibold">+₹{Math.round((parseFloat(cashAmount || '0') * 0.005) * 10) / 10}</span>
                  </div>
                  <div className="pt-2 border-t border-[rgba(237,231,214,0.08)] flex justify-between font-bold text-[#0f172a]">
                    <span>Nodal wallet auto-credit:</span>
                    <span className="text-[#0b63e5]">
                      ₹{parseFloat(cashAmount || '0') + Math.round((parseFloat(cashAmount || '0') * 0.005) * 10) / 10}
                    </span>
                  </div>
                </div>

                <button type="button" onClick={handleExecuteCashExchange} className="w-full py-2.5 rounded-[4px] bg-[#0b63e5] hover:bg-[#d8b030] text-[#f8fafc] font-semibold text-xs flex items-center justify-center gap-2 transition-all">
                  <ArrowRightLeft className="w-4 h-4"/>
                  Confirm Handover & Trigger Audio
                </button>
              </div>
            </div>

            {/* Exchange Audit Ledger */}
            <div className="lg:col-span-7 bg-[white] border border-[rgba(237,231,214,0.08)] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[#0f172a] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0b63e5]"/>
                  Cash Exchange Activity Log
                </h3>
                <span className="text-[10px] font-mono text-[#64748b] uppercase">Live NPCI RRN Sync</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[rgba(237,231,214,0.08)] text-[10px] font-mono uppercase text-[#64748b]">
                      <th className="pb-3 font-semibold">ID & Time</th>
                      <th className="pb-3 font-semibold">Customer</th>
                      <th className="pb-3 font-semibold">Cash Given</th>
                      <th className="pb-3 font-semibold">Credited</th>
                      <th className="pb-3 font-semibold">Incentive</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(237,231,214,0.06)] font-mono">
                    {exchangeHistory.map((item) => (<tr key={item.id} className="hover:bg-[#f8fafc]/40">
                        <td className="py-3">
                          <span className="text-[#0f172a] font-semibold">{item.id}</span>
                          <p className="text-[10px] text-[#64748b]">{item.time}</p>
                        </td>
                        <td className="py-3 text-[#0f172a]/80">{item.customerPhone}</td>
                        <td className="py-3 text-[#0f172a] font-bold">₹{item.cashGiven.toLocaleString('en-IN')}</td>
                        <td className="py-3 text-[#4E8B6F] font-bold">₹{item.digitalCredited.toLocaleString('en-IN')}</td>
                        <td className="py-3 text-[#0b63e5] font-semibold">+₹{item.commission}</td>
                        <td className="py-3">
                          <span className="px-1.5 py-0.5 rounded-[2px] text-[10px] font-bold bg-[#4E8B6F]/10 text-[#4E8B6F] border border-[#4E8B6F] uppercase">
                            {item.status}
                          </span>
                        </td>
                      </tr>))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>)}

      {/* TAB 3: TERMINALS & OUTLETS */}
      {activeTab === 'terminals' && (<div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TERMINALS.map((t) => (<div key={t.id} onClick={() => setSelectedTerminal(t)} className={`p-4 border cursor-pointer transition-all ${selectedTerminal.id === t.id
                    ? 'bg-[white] border-[#0b63e5]'
                    : 'bg-[white] border-[rgba(237,231,214,0.08)] hover:border-[rgba(237,231,214,0.2)]'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-[2px] bg-[#f8fafc] border border-[rgba(237,231,214,0.12)] flex items-center justify-center text-[#0b63e5]">
                    <Store className="w-4 h-4"/>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border border-[#4E8B6F] text-[#4E8B6F] uppercase">
                    {t.status}
                  </span>
                </div>

                <h4 className="text-xs font-semibold text-[#0f172a]">{t.name}</h4>
                <p className="text-[11px] font-mono text-[#64748b] mt-0.5">{t.code}</p>
                <p className="text-[11px] font-mono text-[#0b63e5] mt-2 truncate">{t.vpa}</p>

                <div className="mt-4 pt-3 border-t border-[rgba(237,231,214,0.08)] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#64748b]">Today's Volume</span>
                  <span className="font-bold text-[#0f172a]">₹{t.balance.toLocaleString('en-IN')}</span>
                </div>
              </div>))}
          </div>
        </div>)}
    </div>);
};
