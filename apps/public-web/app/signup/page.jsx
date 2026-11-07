'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Sparkles, Lock, Building, Mail, User, Phone, Eye, EyeOff, Zap, } from 'lucide-react';
import { BuimbPayLogo } from '../components/RazorpayLogo';
const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:5173';
export default function SignUpPage() {
    const [formData, setFormData] = useState({
        businessName: '',
        fullName: '',
        email: '',
        phone: '',
        password: '',
        businessType: 'private_ltd',
        monthlyVolume: 'upto_5l',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate instantaneous registration & link to merchant dashboard
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            // Redirect to merchant dashboard
            window.location.href = `${DASHBOARD_URL}/?merchant=${encodeURIComponent(formData.businessName || 'Merchant')}`;
        }, 1200);
    };
    return (<div className="min-h-screen bg-[#071328] text-white flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BuimbPayLogo size={28} textColor="text-white"/>
        </Link>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400 hidden sm:inline">Already have an account?</span>
          <a href={`${DASHBOARD_URL}/?mode=login`} target="_blank" rel="noreferrer" className="px-3.5 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 text-white font-semibold transition-colors">
            Merchant Sign In
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Value Props */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5"/>
            Join 50,00,000+ businesses across India
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Power your finance with{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              BuimbPay
            </span>
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
            Get instant access to live payment links, automated wire reconciliation, UPI AutoPay subscriptions, and instant 24x7 payouts.
          </p>

          <div className="space-y-3 pt-2">
            {[
            'Zero setup fees & zero maintenance charges',
            'Accept 100+ payment methods with 99.98% uptime',
            'RBI Authorised Payment Aggregator compliant',
            'Same-day digital KYC verification',
        ].map((feature) => (<div key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0"/>
                <span>{feature}</span>
              </div>))}
          </div>

          {/* Quick Demo Sandbox Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400"/>
                Want to test first without signing up?
              </div>
              <div className="text-[11px] text-slate-400">
                Open full merchant dashboard simulator with pre-filled test data.
              </div>
            </div>
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold whitespace-nowrap shadow-md">
              Open Sandbox →
            </a>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="lg:col-span-6">
          <div className="bg-[#0e1d40] border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white">Create your Merchant Account</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Start accepting payments in under 10 minutes
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="block font-semibold text-slate-300">Company / Store Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"/>
                  <input type="text" required placeholder="Zenith Technologies LLP" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} className="w-full h-9 bg-[#071328] border border-slate-700 rounded-lg pl-9 pr-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"/>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-300">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"/>
                    <input type="text" required placeholder="Ajay Bora" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full h-9 bg-[#071328] border border-slate-700 rounded-lg pl-9 pr-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"/>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-slate-300">Work Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"/>
                    <input type="email" required placeholder="ajay@zenith.in" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full h-9 bg-[#071328] border border-slate-700 rounded-lg pl-9 pr-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"/>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-300">Mobile Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"/>
                    <input type="tel" required placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full h-9 bg-[#071328] border border-slate-700 rounded-lg pl-9 pr-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"/>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-slate-300">Create Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"/>
                    <input type={showPassword ? 'text' : 'password'} required placeholder="••••••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full h-9 bg-[#071328] border border-slate-700 rounded-lg pl-9 pr-8 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white">
                      {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-slate-300">Business Structure</label>
                <select value={formData.businessType} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })} className="w-full h-9 bg-[#071328] border border-slate-700 rounded-lg px-3 text-white focus:outline-none focus:border-blue-500">
                  <option value="private_ltd">Private Limited / Public Limited Company</option>
                  <option value="llp">Limited Liability Partnership (LLP)</option>
                  <option value="proprietorship">Sole Proprietorship</option>
                  <option value="individual">Individual Freelancer / Creator</option>
                  <option value="ngo">Trust / Society / Section 8 NGO</option>
                </select>
              </div>

              <button type="submit" disabled={isSubmitting || isSuccess} className="w-full h-10 mt-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer">
                {isSubmitting ? (<span>Setting Up Sandbox Account…</span>) : isSuccess ? (<span>Success! Launching Dashboard…</span>) : (<>
                    <span>Create Account & Start Sandbox</span>
                    <ArrowRight className="w-4 h-4"/>
                  </>)}
              </button>

              <div className="pt-2 text-[11px] text-slate-400 text-center">
                By signing up, you agree to our{' '}
                <Link href="/legal" className="text-blue-400 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/legal#privacy" className="text-blue-400 hover:underline">
                  Privacy Policy
                </Link>
                .
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 border-t border-white/10 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} BuimbPay Technologies Private Limited. All rights reserved.
      </footer>
    </div>);
}
