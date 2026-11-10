'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function PayrollLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = 'http://localhost:5173';
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#070d17] text-white flex flex-col justify-between font-sans antialiased relative overflow-hidden select-none">
      {/* Subtle Navy Geometric Arcs in Background (Matching RazorpayX Payroll) */}
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

      {/* Main Login Card (Matching Reference {C1E4F5B7-DA99-4AF3-9986-3E33A539D6B1}.png) */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-[440px] bg-[#111927] border border-slate-800/80 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Smart payroll for smarter businesses
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full h-11 px-3.5 rounded-lg bg-[#0b121e] border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Password
                </label>
                <a href="#forgot" className="text-[11px] text-blue-400 hover:text-blue-300">
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 px-3.5 rounded-lg bg-[#0b121e] border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-[#2b82fb] hover:bg-[#2071e6] text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-60 flex items-center justify-center"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Social / SSO Buttons */}
          <div className="space-y-2.5 pt-1">
            <button
              type="button"
              onClick={() => { window.location.href = 'http://localhost:5173'; }}
              className="w-full h-11 rounded-lg bg-[#0f1724] hover:bg-[#162032] border border-blue-500/40 text-blue-400 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Sign in with BuimbPay
            </button>

            <button
              type="button"
              onClick={() => { window.location.href = 'http://localhost:5173'; }}
              className="w-full h-11 rounded-lg bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <span className="text-xs text-slate-400">
              Not a customer yet?{' '}
              <Link href="/payroll/signup" className="text-blue-400 hover:text-blue-300 font-bold">
                Sign Up!
              </Link>
            </span>
          </div>

          <div className="pt-2 text-center text-[10px] text-slate-500 leading-relaxed">
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="#privacy" className="underline hover:text-slate-400">Privacy Policy</a> and{' '}
            <a href="#terms" className="underline hover:text-slate-400">Terms of Service</a> apply.
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

