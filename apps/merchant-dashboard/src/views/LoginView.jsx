import React, { useState } from 'react';
import { useAuth } from '../lib/auth-context.jsx';
import { AlertTriangle, ArrowRight, ShieldCheck, Lock, Eye, EyeOff, CheckCircle2, ChevronDown } from 'lucide-react';

export const LoginView = ({ onSwitchToRegister }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('superadmin@buimbpay.com');
    const [password, setPassword] = useState('Admin@BuimbPay2026!');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await login(email, password);
        } catch (err) {
            setError(err.message || 'Authentication failed. Please verify your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickFillRole = (roleEmail) => {
        setEmail(roleEmail);
        setPassword('Admin@BuimbPay2026!');
        setError(null);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans select-none antialiased flex flex-col justify-between">
            {/* Top Navbar */}
            <header className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between border-b border-slate-200/60 bg-white/70 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0b63e5] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                            <path d="M14 2L4 14h7l-1 8 10-12h-7l1-8z" fill="currentColor"/>
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
            </header>

            {/* Main Split Grid */}
            <main className="w-full max-w-7xl mx-auto px-6 py-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Column: Razorpay Value Proposition */}
                <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-12">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"/>
                            India's Sovereign Payment Infrastructure
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0c2340] leading-[1.15] tracking-tight">
                            Power your business with India's unified payment gateway
                        </h1>
                        <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                            Accept 100+ payment modes across UPI, Cards, Netbanking and Wallets. Automate vendor payouts and instant bank settlements with BuimbPayX.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 pt-2 text-sm font-bold text-slate-800">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]"/>
                            </div>
                            <span>100+ Payment Modes</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]"/>
                            </div>
                            <span>T+0 Instant Settlements</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]"/>
                            </div>
                            <span>Direct Bank Rails</span>
                        </div>
                    </div>

                    {/* Trust metric badges */}
                    <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-6">
                        <div>
                            <div className="text-2xl font-black text-slate-900 tracking-tight">₹0</div>
                            <div className="text-xs text-slate-500 font-medium mt-0.5">Setup Fee</div>
                        </div>
                        <div>
                            <div className="text-2xl font-black text-slate-900 tracking-tight">99.98%</div>
                            <div className="text-xs text-slate-500 font-medium mt-0.5">Gateway Uptime</div>
                        </div>
                        <div>
                            <div className="text-2xl font-black text-slate-900 tracking-tight">256-bit</div>
                            <div className="text-xs text-slate-500 font-medium mt-0.5">AES-GCM Encryption</div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Authentic Razorpay Sign-in Card */}
                <div className="lg:col-span-5 w-full max-w-md mx-auto">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_20px_50px_rgba(12,35,64,0.08)] p-8 relative overflow-hidden space-y-6">
                        {/* Header Emblem & Title */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#0b63e5] flex items-center justify-center text-white shadow-md shadow-blue-500/25">
                                <Lock className="w-5 h-5"/>
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-slate-400 block tracking-wider uppercase">Merchant Portal</span>
                                <h2 className="text-xl font-black text-[#0c2340] tracking-tight">
                                    Sign in to Buimb-Pay
                                </h2>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3.5 rounded-xl border text-xs flex items-start gap-2.5 bg-rose-50 border-rose-200 text-rose-700 animate-shake">
                                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-500"/>
                                <span className="text-[11px] leading-relaxed font-medium">{error}</span>
                            </div>
                        )}

                        {/* Enterprise Admin Role Fast Selector */}
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-[11px] text-slate-800 flex items-center gap-1.5">
                                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600"/>
                                    Enterprise Role Credentials (RBAC Tiers)
                                </span>
                                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                    Live Database Verified
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                                <button
                                    type="button"
                                    onClick={() => handleQuickFillRole('superadmin@buimbpay.com')}
                                    className={`px-2 py-1.5 rounded-lg text-left text-[11px] font-semibold border transition-all ${
                                        email === 'superadmin@buimbpay.com'
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                                    }`}
                                >
                                    👑 Super Admin
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleQuickFillRole('finance@buimbpay.com')}
                                    className={`px-2 py-1.5 rounded-lg text-left text-[11px] font-semibold border transition-all ${
                                        email === 'finance@buimbpay.com'
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                                    }`}
                                >
                                    🏦 Finance / Settlements
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleQuickFillRole('risk@buimbpay.com')}
                                    className={`px-2 py-1.5 rounded-lg text-left text-[11px] font-semibold border transition-all ${
                                        email === 'risk@buimbpay.com'
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                                    }`}
                                >
                                    🛡️ Risk &amp; Fraud
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleQuickFillRole('auditor@buimbpay.com')}
                                    className={`px-2 py-1.5 rounded-lg text-left text-[11px] font-semibold border transition-all ${
                                        email === 'auditor@buimbpay.com'
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                                    }`}
                                >
                                    ⚖️ RBI Regulatory Auditor
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your registered email"
                                    className="w-full h-11 px-3.5 rounded-lg border border-slate-300 text-slate-900 text-xs font-medium placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-xs font-bold text-slate-700">
                                        Password
                                    </label>
                                    <a href="#forgot" className="text-[11px] font-semibold text-blue-600 hover:underline">
                                        Forgot?
                                    </a>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full h-11 pl-3.5 pr-10 rounded-lg border border-slate-300 text-slate-900 text-xs font-medium placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all font-mono"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    Operating Country & Currency
                                </label>
                                <div className="w-full h-11 px-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-800">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">🇮🇳</span>
                                        <span>India (INR ₹)</span>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-slate-400"/>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 rounded-lg bg-[#0b63e5] hover:bg-[#0957cb] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
                            >
                                {isLoading ? (
                                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"/>
                                ) : (
                                    <>
                                        <span>Sign In to Dashboard</span>
                                        <ArrowRight className="w-4 h-4"/>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Security notice */}
                        <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium border-t border-slate-100">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600"/>
                            <span>256-bit TLS Encrypted · PCI-DSS Compliant Infrastructure</span>
                        </div>

                        {/* Toggle to register */}
                        {onSwitchToRegister && (
                            <div className="text-center pt-1">
                                <button
                                    type="button"
                                    onClick={onSwitchToRegister}
                                    className="text-xs text-slate-600 hover:text-blue-600 font-semibold transition-colors"
                                >
                                    New to Buimb-Pay? <span className="text-blue-600 font-bold">Create Merchant Account &rarr;</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
                © Buimb-Pay 2026. All Rights Reserved. RBI Authorized Payment Aggregator Infrastructure.
            </footer>
        </div>
    );
};
