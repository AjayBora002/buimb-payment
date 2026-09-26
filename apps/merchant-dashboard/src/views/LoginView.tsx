import React, { useState } from 'react';
import { useAuth } from '../lib/auth-context.js';
import { Lock, Mail, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo.js';

export const LoginView: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const isLocked = error?.includes('Account is locked');

  return (
    <div className="min-h-screen bg-[#131B17] text-[#EDE7D6] flex flex-col justify-center items-center p-4 font-['Public_Sans',sans-serif] select-none antialiased">
      {/* Background radial glow */}
      <div className="absolute top-1/3 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand header */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <BrandLogo collapsed={false} />
          <p className="text-xs text-[#8FA396] pt-1">
            Merchant Operating System & Unified Payments Platform
          </p>
        </div>

        {/* Card container */}
        <div className="bg-[#1D2E28] border border-[rgba(237,231,214,0.12)] p-8 rounded-[4px] shadow-2xl space-y-6">
          <div className="border-b border-[rgba(237,231,214,0.08)] pb-4">
            <h1 className="text-lg font-bold text-[#EDE7D6] tracking-tight">Merchant Sign In</h1>
            <p className="text-xs text-[#8FA396] mt-1">
              Enter your corporate credentials to access your merchant portal
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div
              className={`p-3.5 rounded-[4px] border text-xs flex items-start gap-2.5 ${
                isLocked
                  ? 'bg-[#B0503F]/15 border-[#B0503F] text-[#EDE7D6]'
                  : 'bg-[#B0503F]/10 border-[#B0503F]/40 text-[#EDE7D6]'
              }`}
            >
              <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isLocked ? 'text-[#B0503F]' : 'text-[#C98A2E]'}`} />
              <div className="space-y-1">
                <span className="font-bold block">
                  {isLocked ? 'Account Security Alert' : 'Authentication Error'}
                </span>
                <span className="text-[#EDE7D6]/80 text-[11px] leading-relaxed block">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#8FA396]">
                Corporate Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8FA396] absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  placeholder="admin@merchant.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-9 bg-[#131B17] border border-[rgba(237,231,214,0.12)] rounded-[4px] pl-9 pr-3 text-xs text-[#EDE7D6] placeholder:text-[#5C5646] focus:outline-none focus:border-[#C9A227] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold text-[#8FA396]">Password</label>
                <span className="text-[10px] text-[#C9A227] hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8FA396] absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-9 bg-[#131B17] border border-[rgba(237,231,214,0.12)] rounded-[4px] pl-9 pr-3 text-xs text-[#EDE7D6] placeholder:text-[#5C5646] focus:outline-none focus:border-[#C9A227] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 mt-2 rounded-[4px] bg-[#C9A227] hover:bg-[#DBB53B] text-[#131B17] text-xs font-bold flex items-center justify-center gap-2 border border-[#B08C1E] transition-all disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <span>Verifying credentials…</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-[rgba(237,231,214,0.08)] flex items-center justify-between text-[11px] text-[#5C5646]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4E8B6F]" />
              <span>TLS 1.3 / AES-256 Auth</span>
            </div>
            <span className="font-mono">v1.0 (Sandbox)</span>
          </div>
        </div>

        {/* Demo Credentials Helper */}
        <div className="bg-[#1D2E28]/60 border border-[rgba(237,231,214,0.06)] p-3 rounded-[4px] text-[11px] text-[#8FA396] space-y-1">
          <div className="font-bold text-[#EDE7D6]">Seed Merchant Access:</div>
          <div className="flex justify-between font-mono text-[10px]">
            <span>Email: demo@buimbpay.sandbox</span>
            <span className="text-[#C9A227] cursor-pointer hover:underline" onClick={() => { setEmail('demo@buimbpay.sandbox'); setPassword('SandboxDemo@123'); }}>Autofill</span>
          </div>
          <div className="font-mono text-[10px] text-[#5C5646]">Password: SandboxDemo@123</div>
        </div>
      </div>
    </div>
  );
};
