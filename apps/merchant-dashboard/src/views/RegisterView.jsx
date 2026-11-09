import React, { useState } from 'react';
import { useAuth } from '../lib/auth-context.jsx';
import { AlertTriangle, ArrowRight, ShieldCheck, CheckCircle2, Lock, Eye, EyeOff } from 'lucide-react';

export const RegisterView = ({ onSwitchToLogin }) => {
    const { register } = useAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [organisationName, setOrganisationName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const validatePassword = (pwd) => {
        const issues = [];
        if (pwd.length < 12) issues.push('At least 12 characters');
        if (!/[A-Z]/.test(pwd)) issues.push('One uppercase letter');
        if (!/[a-z]/.test(pwd)) issues.push('One lowercase letter');
        if (!/[0-9]/.test(pwd)) issues.push('One number');
        if (!/[^A-Za-z0-9]/.test(pwd)) issues.push('One special symbol');
        return issues;
    };

    const passwordIssues = validatePassword(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match. Please verify your password confirmation.');
            return;
        }

        if (passwordIssues.length > 0) {
            setError(`Password requirement: ${passwordIssues.join(', ')}.`);
            return;
        }

        setIsLoading(true);
        try {
            await register({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim().toLowerCase(),
                password,
                organisationName: organisationName.trim() || undefined,
            });
        } catch (err) {
            setError(err.message || 'Registration failed. Please check your information.');
        } finally {
            setIsLoading(false);
        }
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
                    <span className="text-slate-500">Already registered?</span>
                    <button type="button" onClick={onSwitchToLogin} className="text-blue-600 hover:text-blue-700 font-bold">
                        Sign In &rarr;
                    </button>
                </div>
            </header>

            {/* Main Split Grid */}
            <main className="w-full max-w-7xl mx-auto px-6 py-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Column */}
                <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-12">
                    <div className="space-y-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"/>
                            Instant Digital Merchant Onboarding
                        </span>
                        <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0c2340] leading-[1.15] tracking-tight">
                            Build with India's most developer-friendly payment platform
                        </h1>
                        <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                            Sign up in minutes. Accept domestic and international payments, integrate standard checkout or drop-in Razorpay SDKs, and get automated daily bank settlements.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 pt-2 text-sm font-bold text-slate-800">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]"/>
                            </div>
                            <span>Zero Setup Cost</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]"/>
                            </div>
                            <span>Paperless KYC</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]"/>
                            </div>
                            <span>Live in 2 Minutes</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Register Form Card */}
                <div className="lg:col-span-5 w-full max-w-md mx-auto">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_20px_50px_rgba(12,35,64,0.08)] p-8 relative overflow-hidden space-y-5">
                        <div className="space-y-1">
                            <span className="text-[11px] font-bold text-slate-400 block tracking-wider uppercase">New Merchant Application</span>
                            <h2 className="text-xl font-black text-[#0c2340] tracking-tight">
                                Create your Merchant Account
                            </h2>
                        </div>

                        {error && (
                            <div className="p-3.5 rounded-xl border text-xs flex items-start gap-2.5 bg-rose-50 border-rose-200 text-rose-700">
                                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-500"/>
                                <span className="text-[11px] leading-relaxed font-medium">{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-3.5">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Priya"
                                        className="w-full h-10 px-3 rounded-lg border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Sharma"
                                        className="w-full h-10 px-3 rounded-lg border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Business or Brand Name
                                </label>
                                <input
                                    type="text"
                                    value={organisationName}
                                    onChange={(e) => setOrganisationName(e.target.value)}
                                    placeholder="Acme Commerce Pvt Ltd"
                                    className="w-full h-10 px-3 rounded-lg border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Work Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="founder@acme.com"
                                    className="w-full h-10 px-3 rounded-lg border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Create Password (12+ characters, A-Z, 0-9, symbol)
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full h-10 pl-3 pr-10 rounded-lg border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full h-10 px-3 rounded-lg border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100"
                                    required
                                />
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
                                        <span>Complete Registration</span>
                                        <ArrowRight className="w-4 h-4"/>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium border-t border-slate-100">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600"/>
                            <span>By creating an account you agree to Buimb-Pay Merchant Terms</span>
                        </div>
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
