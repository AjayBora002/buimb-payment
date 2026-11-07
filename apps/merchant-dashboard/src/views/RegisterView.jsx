import React, { useState } from 'react';
import { useAuth } from '../lib/auth-context.jsx';
import { AlertTriangle, ArrowRight, Plus, Sparkles } from 'lucide-react';
export const RegisterView = ({ onSwitchToLogin }) => {
    const { register, enterDemoMode } = useAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [organisationName, setOrganisationName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            setError('Passwords do not match. Please verify your password confirmation.');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
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
        }
        catch (err) {
            setError(err.message || 'Registration failed. Please verify your details.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (<div className="min-h-screen bg-white text-slate-900 font-sans select-none antialiased flex flex-col justify-between">
      {/* Top Navbar */}
      <div className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
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
      </div>

      {/* Main Split Grid */}
      <div className="w-full max-w-7xl mx-auto px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-12">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"/>
              Direct Instant Merchant Onboarding
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0c2340] leading-[1.18] tracking-tight">
              Power Your Business with India's #1 Payments Gateway
            </h1>
            <p className="text-base text-slate-600 leading-relaxed max-w-xl">
              Accept credit cards, debit cards, 100+ UPI apps, netbanking, and international payments with automated instant settlement directly to your bank.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-sm font-bold text-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 stroke-[3]"/>
              </div>
              <span>Zero Setup Cost</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 stroke-[3]"/>
              </div>
              <span>Paperless KYC</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 stroke-[3]"/>
              </div>
              <span>Live in 2 Minutes</span>
            </div>
          </div>
        </div>

        {/* Right Column: Register Card */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-7 relative overflow-hidden space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 block tracking-wider uppercase">Merchant Registration</span>
              <h2 className="text-xl font-black text-[#0c2340] tracking-tight">
                Create your merchant account
              </h2>
            </div>

            {error && (<div className="p-3 rounded-lg border text-xs flex items-start gap-2.5 bg-rose-50 border-rose-200 text-rose-700">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-500"/>
                <span className="text-[11px] leading-relaxed">{error}</span>
              </div>)}

            <button type="button" onClick={enterDemoMode} className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer">
              <Sparkles className="w-4 h-4 text-white"/>
              <span>🚀 Or Launch Sandbox Demo Dashboard</span>
            </button>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">First Name</label>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Priya" required className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100"/>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Last Name</label>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Sharma" required className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100"/>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Business / Company Name</label>
                <input type="text" value={organisationName} onChange={(e) => setOrganisationName(e.target.value)} placeholder="Acme Digital Pvt Ltd" className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100"/>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Business Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="priya@acmedigital.com" required className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100"/>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100 font-mono"/>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Confirm</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-medium focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100 font-mono"/>
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="w-full h-11 rounded-lg bg-[#0b63e5] hover:bg-[#0957cb] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2">
                {isLoading ? (<span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"/>) : (<>
                    <span>Create Free Account</span>
                    <ArrowRight className="w-4 h-4"/>
                  </>)}
              </button>
            </form>

            <div className="text-center pt-2">
              <button type="button" onClick={onSwitchToLogin} className="text-xs text-slate-600 hover:text-blue-600 font-semibold transition-colors">
                Already have an account? <span className="text-blue-600 font-bold">Sign In &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
        © Buimb-Pay 2026. All Rights Reserved. RBI Authorised Payment Aggregator.
      </div>
    </div>);
};
