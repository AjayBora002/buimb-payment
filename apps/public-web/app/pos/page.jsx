'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Store,
  QrCode,
  Volume2,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Wifi,
  BatteryCharging,
  CreditCard,
  Printer,
  ShieldCheck,
} from 'lucide-react';

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:5173';

export default function PosPage() {
  const [selectedDevice, setSelectedDevice] = useState('soundbox');
  const [simulatedAudio, setSimulatedAudio] = useState(false);

  const handleSimulatePayment = () => {
    setSimulatedAudio(true);
    setTimeout(() => setSimulatedAudio(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0C2340] via-[#0C1938] to-[#0A142C] text-white pt-16 pb-24 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>In-Store Offline Payment Devices</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Accept in-store payments with <span className="text-[#3395FF]">Smart POS & Soundbox</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Equip your retail counters, restaurants, and field agents with Android Smart POS card machines and 4G audio soundboxes. Instant payment voice alerts in 11 Indian languages stop fraud and speed up retail checkouts.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noreferrer"
                className="bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 hover:scale-[1.02] transition-all flex items-center gap-2 text-sm"
              >
                <span>Order POS / Soundbox</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/qr-codes"
                className="bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all text-sm"
              >
                Explore Dynamic QR Codes
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-700/60 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">11</div>
                <div className="text-xs text-slate-400 mt-0.5">Indian Voice Languages</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">4G + WiFi</div>
                <div className="text-xs text-slate-400 mt-0.5">Dual Connectivity</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">72h+</div>
                <div className="text-xs text-slate-400 mt-0.5">Battery Standby Time</div>
              </div>
            </div>
          </div>

          {/* Interactive Device Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-slate-900 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Device Hardware Preview</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-800">In Stock</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedDevice('soundbox')}
                  className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all ${
                    selectedDevice === 'soundbox' ? 'bg-[#0B63E5] text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  4G Voice Soundbox
                </button>
                <button
                  onClick={() => setSelectedDevice('pos')}
                  className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all ${
                    selectedDevice === 'pos' ? 'bg-[#0B63E5] text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Android Smart POS
                </button>
              </div>

              {selectedDevice === 'soundbox' ? (
                <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-800 text-white space-y-4">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Wifi className="w-3.5 h-3.5 text-emerald-400" /> 4G LTE Active</span>
                    <span className="flex items-center gap-1"><BatteryCharging className="w-3.5 h-3.5 text-amber-400" /> 94%</span>
                  </div>

                  <div className="text-center py-4 space-y-2">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center mx-auto">
                      <Volume2 className="w-8 h-8 animate-pulse" />
                    </div>
                    <div className="font-bold text-sm">BuimbPay Voice Soundbox Pro</div>
                    <div className="text-[11px] text-slate-400">Speaker Volume: 95dB (Loud & Clear)</div>
                  </div>

                  <button
                    onClick={handleSimulatePayment}
                    className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-all shadow-md"
                  >
                    {simulatedAudio ? '🔊 "₹500 received on BuimbPay!"' : 'Simulate Customer UPI Payment'}
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-800 text-white space-y-4">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-blue-400" /> NFC / Chip / Swipe</span>
                    <span className="flex items-center gap-1"><Printer className="w-3.5 h-3.5 text-emerald-400" /> In-built Thermal Printer</span>
                  </div>

                  <div className="text-center py-4 space-y-2">
                    <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-400 flex items-center justify-center mx-auto">
                      <Smartphone className="w-8 h-8" />
                    </div>
                    <div className="font-bold text-sm">BuimbPay Smart Android POS X1</div>
                    <div className="text-[11px] text-slate-400">5.5" HD Touchscreen · Tap & Pay · Barcode Scanner</div>
                  </div>

                  <a
                    href={DASHBOARD_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#0B63E5] hover:bg-[#0951bd] text-white font-bold text-xs text-center block transition-all shadow-md"
                  >
                    Request POS Demo Unit &rarr;
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Omnichannel Retail</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C2340]">
            Built for busy retail counters across India
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From kirana stores to luxury malls, handle peak festive rush with sub-second payment settlements.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Instant Audio Alerts in 11 Languages</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              English, Hindi, Marathi, Tamil, Telugu, Kannada, Bengali, Gujarati, Malayalam, Punjabi, and Odia. Never check your mobile phone for SMS confirmations again.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B63E5] flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">All Payment Modes Supported</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Accept contactless NFC Tap & Pay (Apple Pay, Google Pay, Samsung Pay), Chip & PIN cards, dynamic UPI QR codes, and Sodexo meal vouchers.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Zero Fake Screenshot Fraud</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The soundbox speaks only when money is confirmed deposited in your nodal bank account via webhook, ending fraudulent payment screenshot scams permanently.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-14 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Order your BuimbPay POS or Soundbox today</h3>
            <p className="text-blue-100 text-sm mt-1">Delivered to your shop doorstep in 48 hours with pre-configured SIM.</p>
          </div>
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noreferrer"
            className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm shrink-0"
          >
            Order Device Now &rarr;
          </a>
        </div>
      </section>
    </div>
  );
}
