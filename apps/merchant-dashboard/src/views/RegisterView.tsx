import React, { useState } from 'react';
import { useAuth } from '../lib/auth-context.js';
import { Lock, Mail, AlertTriangle, ArrowRight, ShieldCheck, User, Building2 } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo.js';

export interface RegisterViewProps {
  onSwitchToLogin: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onSwitchToLogin }) => {
  const { register } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your password confirmation.');
      return;
    }

    if (password.length < 12) {
      setError('Password must be at least 12 characters long and include uppercase, lowercase, numbers, and symbols.');
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
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please verify your details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#131B17] text-[#EDE7D6] flex flex-col justify-center items-center p-4 font-['Public_Sans',sans-serif] select-none antialiased">
      {/* Background radial glow */}
      <div className="absolute top-1/4 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 space-y-6 my-8">
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
            <h1 className="text-lg font-bold text-[#EDE7D6] tracking-tight">Create Merchant Account</h1>
            <p className="text-xs text-[#8FA396] mt-1">
              Set up your merchant organisation and start accepting payments
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-[4px] border border-[#B0503F]/40 bg-[#B0503F]/10 text-[#EDE7D6] text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#C98A2E] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold block">Registration Error</span>
                <span className="text-[#EDE7D6]/80 text-[11px] leading-relaxed block">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#8FA396]">First Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8FA396] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="Aditi"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-9 bg-[#131B17] border border-[rgba(237,231,214,0.12)] rounded-[4px] pl-9 pr-3 text-xs text-[#EDE7D6] placeholder:text-[#5C5646] focus:outline-none focus:border-[#C9A227] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#8FA396]">Last Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8FA396] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="Sharma"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full h-9 bg-[#131B17] border border-[rgba(237,231,214,0.12)] rounded-[4px] pl-9 pr-3 text-xs text-[#EDE7D6] placeholder:text-[#5C5646] focus:outline-none focus:border-[#C9A227] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#8FA396]">Corporate Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8FA396] absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  placeholder="aditi@fintech.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-9 bg-[#131B17] border border-[rgba(237,231,214,0.12)] rounded-[4px] pl-9 pr-3 text-xs text-[#EDE7D6] placeholder:text-[#5C5646] focus:outline-none focus:border-[#C9A227] transition-colors"
                />
              </div>
            </div>

            {/* Organisation / Business Name */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold text-[#8FA396]">Business / Company Name</label>
                <span className="text-[10px] text-[#8FA396]/60">Optional</span>
              </div>
              <div className="relative">
                <Building2 className="w-4 h-4 text-[#8FA396] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Acme Technologies Pvt Ltd"
                  value={organisationName}
                  onChange={(e) => setOrganisationName(e.target.value)}
                  className="w-full h-9 bg-[#131B17] border border-[rgba(237,231,214,0.12)] rounded-[4px] pl-9 pr-3 text-xs text-[#EDE7D6] placeholder:text-[#5C5646] focus:outline-none focus:border-[#C9A227] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#8FA396]">Password</label>
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
              <p className="text-[10px] text-[#5C5646] pt-0.5">
                Min 12 characters, uppercase, lowercase, number & symbol
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#8FA396]">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8FA396] absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-9 bg-[#131B17] border border-[rgba(237,231,214,0.12)] rounded-[4px] pl-9 pr-3 text-xs text-[#EDE7D6] placeholder:text-[#5C5646] focus:outline-none focus:border-[#C9A227] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 mt-3 rounded-[4px] bg-[#C9A227] hover:bg-[#DBB53B] text-[#131B17] text-xs font-bold flex items-center justify-center gap-2 border border-[#B08C1E] transition-all disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <span>Creating merchant account…</span>
              ) : (
                <>
                  <span>Create Account & Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="text-center pt-2 text-xs text-[#8FA396]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-[#C9A227] hover:underline font-semibold cursor-pointer bg-transparent border-none p-0 inline"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="pt-2 border-t border-[rgba(237,231,214,0.08)] flex items-center justify-between text-[11px] text-[#5C5646]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4E8B6F]" />
              <span>TLS 1.3 / AES-256 Auth</span>
            </div>
            <span className="font-mono">v1.0 (Sandbox)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
