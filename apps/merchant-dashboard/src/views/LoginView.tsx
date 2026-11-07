import React, { useState } from 'react';
import { useAuth } from '../lib/auth-context.js';
import { Lock, Mail, AlertTriangle, ArrowRight, ShieldCheck, Sparkles, Building2, CheckCircle2, ChevronDown, Plus } from 'lucide-react';

export interface LoginViewProps {
  onSwitchToRegister?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onSwitchToRegister }) => {
  const { login, enterDemoMode } = useAuth();
  const [email, setEmail] = useState('admin@boraenterprises.in');
  const [password, setPassword] = useState('SandboxDemo@123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans select-none antialiased flex flex-col justify-between">
      {/* Top Navbar */}
      <div className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Razorpay polygon mark */}
          <div className="w-8 h-8 rounded-lg bg-[#0b63e5] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M14 2L4 14h7l-1 8 10-12h-7l1-8z" fill="currentColor" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tight text-[#0c2340]">
            Buimb-Pay <span className="text-xs font-bold text-blue-600 uppercase tracking-widest ml-1 px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200">Merchant</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="text-slate-500 hidden sm:inline">Need assistance?</span>
          <a href="#support" className="text-blue-600 hover:text-blue-700">Support</a>
        </div>
      </div>

      {/* Main Split Grid (Matching Reference Screenshot {90F33BDC-2432-4F2F-AD79-FA0D632A674F}.png) */}
      <div className="w-full max-w-7xl mx-auto px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Razorpay Value Proposition */}
        <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-12">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0c2340] leading-[1.18] tracking-tight">
              Join 8 Million Businesses that Trust Buimb-Pay to Supercharge their Business
            </h1>
            <p className="text-base text-slate-600 leading-relaxed max-w-xl">
              Accept domestic and international payments, automate vendor payouts, manage subscriptions, and reconcile in real time with 99.98% gateway uptime.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-sm font-bold text-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>100+ Payment Methods</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>Easy Integration</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>Powerful Dashboard</span>
            </div>
          </div>

          {/* Trust metric badges */}
          <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">₹0</div>
              <div className="text-xs text-slate-500 font-medium">Gateway Fees for 90 Days</div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">99.98%</div>
              <div className="text-xs text-slate-500 font-medium">API Platform Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">Instant</div>
              <div className="text-xs text-slate-500 font-medium">Direct Bank Settlement</div>
            </div>
          </div>
        </div>

        {/* Right Column: Authentic Razorpay Sign-in / Onboarding Card */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-7 relative overflow-hidden space-y-5">
            {/* 0% Platform Fees ribbon banner */}
            <div className="absolute -right-12 top-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-wider py-1 px-12 rotate-45 shadow-sm pointer-events-none">
              0%* Platform Fees
            </div>

            {/* Blue Icon emblem */}
            <div className="w-12 h-12 rounded-xl bg-[#0b63e5] flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path d="M14 2L4 14h7l-1 8 10-12h-7l1-8z" fill="currentColor" />
              </svg>
            </div>

            {/* Welcome title */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 block tracking-wider uppercase">Welcome to Buimb-Pay</span>
              <h2 className="text-xl font-black text-[#0c2340] tracking-tight">
                Get started with your email or phone number
              </h2>
            </div>

            {error && (
              <div className="p-3 rounded-lg border text-xs flex items-start gap-2.5 bg-rose-50 border-rose-200 text-rose-700">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-500" />
                <span className="text-[11px] leading-relaxed">{error}</span>
              </div>
            )}

            {/* Instant Demo Access (1-Click) */}
            <button
              type="button"
              onClick={enterDemoMode}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>🚀 1-Click Sandbox Demo Access (Instant Login)</span>
            </button>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email or corporate mobile number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email or phone number"
                    className="w-full h-11 px-3.5 rounded-lg border border-slate-300 text-slate-900 text-xs font-medium placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Account Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-11 px-3.5 rounded-lg border border-slate-300 text-slate-900 text-xs font-medium placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-mono"
                    required
                  />
                </div>
              </div>

              {/* Country selector (as in Razorpay screenshot) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Where is your company registered?
                </label>
                <div className="w-full h-11 px-3.5 rounded-lg border border-slate-300 bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🇮🇳</span>
                    <span>India</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-lg bg-[#0b63e5] hover:bg-[#0957cb] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <span>Continue to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Google Continue */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-slate-400 text-[11px] font-semibold">or</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <button
              type="button"
              onClick={enterDemoMode}
              className="w-full h-10 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Legal terms notice */}
            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
              By continuing you agree to our <a href="#privacy" className="text-blue-600 hover:underline">privacy policy</a> & <a href="#terms" className="text-blue-600 hover:underline">terms of use</a>.<br />
              *Limited period offer, <a href="#terms" className="text-blue-600 hover:underline">terms and conditions</a> apply.
            </p>

            {/* Razorpay Partner Bottom Card (Matching Screenshot) */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-700 block text-[11px]">Helping Clients with Buimb-Pay Solutions?</span>
                <span className="text-blue-600 font-bold text-[11px] hover:underline cursor-pointer">Become Buimb-Pay Partner &rarr;</span>
              </div>
            </div>

            {/* Toggle to register */}
            {onSwitchToRegister && (
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className="text-xs text-slate-600 hover:text-blue-600 font-semibold transition-colors"
                >
                  Don't have an account? <span className="text-blue-600 font-bold">Sign Up &rarr;</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
        © Buimb-Pay 2026. All Rights Reserved. RBI Authorised Payment Aggregator.
      </div>
    </div>
  );
};
