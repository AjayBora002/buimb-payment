'use client';
import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Receipt, Clock, Send, Percent, Download, Calendar, } from 'lucide-react';
export default function InvoicesPage() {
    return (<div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* ── 1. Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pb-32 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-transparent pointer-events-none"/>
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none"/>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-semibold">
              <Receipt className="w-3.5 h-3.5 text-amber-400"/>
              BuimbPay Invoices · GST Invoicing & Smart Reminders
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Get paid 3x faster with{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
                GST-smart Invoices
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Create and dispatch professional GST-compliant invoices in seconds. Include integrated payment links, automate payment reminders, and reconcile payments seamlessly.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/signup" className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]">
                <span>Create Free Invoices</span>
                <ArrowRight className="w-4 h-4"/>
              </Link>
              <Link href="/tools/gst-calculator" className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all">
                Free GST Calculator
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400"/> 100% GST-Compliant PDF Invoices
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400"/> Automated WhatsApp & SMS Reminders
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400"/> Partial & Installment Payments
              </span>
            </div>
          </div>

          {/* Invoice Simulator Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#121c3b] border border-amber-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Invoice #INV-2026-094
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  DUE IN 3 DAYS
                </span>
              </div>

              <div className="bg-[#0c142b] p-5 rounded-xl border border-slate-700/80 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-start font-sans">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Billed To:</div>
                    <div className="font-bold text-white text-sm">Zenith Tech Corp Ltd</div>
                    <div className="text-[11px] text-slate-400">GSTIN: 27AABCT3518Q1ZV</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase">Amount Due:</div>
                    <div className="font-black text-amber-400 text-lg">₹59,000.00</div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px]">
                  <div className="flex justify-between text-slate-400">
                    <span>Cloud Architecture Consultation (20 hrs)</span>
                    <span className="text-white">₹50,000.00</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>CGST (9%) + SGST (9%)</span>
                    <span className="text-white">₹9,000.00</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 font-sans flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5"/>
                    Auto-reminder scheduled
                  </span>
                  <button type="button" className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5">
                    <span>Pay Online</span>
                    <ArrowRight className="w-3.5 h-3.5"/>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Integrated UPI / Card link included</span>
                <span className="text-blue-400 flex items-center gap-1 cursor-pointer hover:underline">
                  <Download className="w-3.5 h-3.5"/> Download Sample PDF
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Benefits ─────────────────────────────────────────────── */}
      <section className="py-20 bg-[#081226] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Automated Accounts Receivable
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Stop chasing late invoice payments manually
            </h2>
            <p className="text-sm text-slate-400">
              BuimbPay automatically sends polite reminders via WhatsApp, email, and SMS so you can focus on building your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0c1a38] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Send className="w-5 h-5"/>
              </div>
              <h3 className="text-lg font-bold text-white">Omnichannel Dispatch</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Send invoices instantly over WhatsApp and official email with single-click payment buttons attached.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c1a38] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
                <Calendar className="w-5 h-5"/>
              </div>
              <h3 className="text-lg font-bold text-white">Custom Reminder Schedules</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Configure reminders 3 days before due date, on due date, and automated follow-ups for overdue payments.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c1a38] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
                <Percent className="w-5 h-5"/>
              </div>
              <h3 className="text-lg font-bold text-white">Partial & Advance Payments</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Allow clients to pay in milestones or installments while tracking outstanding balances automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Bottom CTA ────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Streamline your invoicing today
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Sign up in minutes. No credit card required. Free tier includes up to 50 invoices per month.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link href="/signup" className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all hover:scale-105">
            Create Invoices Now →
          </Link>
          <Link href="/contact" className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-semibold text-sm transition-all">
            Speak to Sales
          </Link>
        </div>
      </section>
    </div>);
}
