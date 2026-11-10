'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function PayrollSignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    organizationName: '',
    workEmail: '',
    phoneNumber: '',
    employees: '',
    title: '',
    agreePolicy: false,
    whatsappOnboarding: true,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = 'http://localhost:5173';
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#070d17] text-white flex flex-col justify-between font-sans antialiased relative overflow-hidden select-none">
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full border border-blue-500/10" />
        <div className="absolute top-1/4 -left-48 w-[800px] h-[800px] rounded-full border border-blue-400/5" />
        <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-amber-600/10 to-transparent blur-[120px]" />
      </div>

      {/* Top Navbar */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-slate-800/80 bg-[#070d17]/80 backdrop-blur-md relative z-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-xl font-black tracking-tight text-white">
              BuimbPay<span className="text-blue-500">X</span>
            </span>
            <span className="text-sm font-semibold text-slate-300 ml-2 pl-2 border-l border-slate-700">
              Payroll
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 hidden sm:inline">New to BuimbPayX Payroll?</span>
          <Link
            href="/payroll"
            className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
          >
            Explore features
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Main Signup Card (Matching Reference {D2D7AF27-7271-40CC-A390-449A650EA9DF}.png) */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 relative z-10">
        <div className="w-full max-w-[480px] bg-[#111927] border border-slate-800/80 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Set up your account
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
                className="w-full h-11 px-3.5 rounded-lg bg-[#0b121e] border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Organization Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                placeholder="Enter your organization name"
                className="w-full h-11 px-3.5 rounded-lg bg-[#0b121e] border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Work Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.workEmail}
                onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                placeholder="Enter your work email address"
                className="w-full h-11 px-3.5 rounded-lg bg-[#0b121e] border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Phone Number <span className="text-rose-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="eg. 9810012345"
                className="w-full h-11 px-3.5 rounded-lg bg-[#0b121e] border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Number of Employees <span className="text-rose-400">*</span>
              </label>
              <select
                required
                value={formData.employees}
                onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                className="w-full h-11 px-3.5 rounded-lg bg-[#0b121e] border border-slate-700/80 text-white text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
              >
                <option value="" disabled className="text-slate-500">Select employee count</option>
                <option value="1-10">1 - 10 employees</option>
                <option value="11-50">11 - 50 employees</option>
                <option value="51-200">51 - 200 employees</option>
                <option value="201-500">201 - 500 employees</option>
                <option value="500+">500+ enterprise</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Your Title <span className="text-rose-400">*</span>
              </label>
              <select
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full h-11 px-3.5 rounded-lg bg-[#0b121e] border border-slate-700/80 text-white text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
              >
                <option value="" disabled className="text-slate-500">Select your role</option>
                <option value="Founder / CXO">Founder / CXO / MD</option>
                <option value="Finance Head">Head of Finance / CFO</option>
                <option value="HR Leader">HR Leader / People Ops</option>
                <option value="Payroll Admin">Payroll &amp; Tax Specialist</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2 pt-2 text-xs">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreePolicy}
                  onChange={(e) => setFormData({ ...formData, agreePolicy: e.target.checked })}
                  className="mt-0.5 rounded border-slate-700 bg-[#0b121e] text-blue-500 focus:ring-0"
                />
                <span className="text-slate-300 text-[11px] leading-relaxed">
                  I agree to the <a href="#privacy" className="underline text-blue-400 hover:text-blue-300">privacy policy</a> and <a href="#terms" className="underline text-blue-400 hover:text-blue-300">terms of use</a>.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.whatsappOnboarding}
                  onChange={(e) => setFormData({ ...formData, whatsappOnboarding: e.target.checked })}
                  className="mt-0.5 rounded border-slate-700 bg-[#0b121e] text-blue-500 focus:ring-0"
                />
                <span className="text-slate-300 text-[11px] leading-relaxed">
                  Connect with me on WhatsApp for onboarding.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-[#2b82fb] hover:bg-[#2071e6] text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-60 flex items-center justify-center mt-3"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-xs text-slate-400">
              Already have an account?{' '}
              <Link href="/payroll/login" className="text-blue-400 hover:text-blue-300 font-bold">
                Log In
              </Link>
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-slate-500 border-t border-slate-800/80 relative z-10">
        © 2026 BuimbPay Technologies Pvt Ltd. All rights reserved.
      </footer>
    </div>
  );
}

