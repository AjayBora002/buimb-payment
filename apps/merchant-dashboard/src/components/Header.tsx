import React, { useState } from 'react';
import {
  Search,
  Bell,
  HelpCircle,
  Command,
  Lock,
  X,
  AlertTriangle,
  ExternalLink,
  Plus,
  Link2,
  FileText,
  ArrowUpRight,
  QrCode,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { UserPersona, USER_PERSONAS } from '../types/persona.js';
import type { AuthUser } from '../types/auth.js';

interface HeaderProps {
  title: string;
  workspaceName?: string;
  currentPersona?: UserPersona;
  user?: AuthUser | null;
  onPersonaChange?: (persona: UserPersona) => void;
  onOpenCommandPalette: () => void;
  onOpenCheckoutPreview?: () => void;
  portalMode?: 'merchant' | 'ops';
  onTogglePortalMode?: () => void;
  onQuickAction?: (action: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  workspaceName = 'Bora Enterprises Pvt Ltd',
  user,
  onOpenCommandPalette,
  onOpenCheckoutPreview,
  onQuickAction,
}) => {
  const [isTestMode, setIsTestMode] = useState(true);
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  const notifications = [
    { id: '1', title: 'Payment Captured: ₹4,500.00', time: '12m ago', desc: 'UPI payment received via Google Pay (Priya Sharma)' },
    { id: '2', title: 'Settlement Processed: ₹84,200.00', time: '2h ago', desc: 'Dispatched to HDFC Bank A/c •••• 4891 (UTR: HDFCR52026092801)' },
    { id: '3', title: 'Mandate Pre-Debit Alert', time: '4h ago', desc: '14 UPI AutoPay mandates scheduled for tomorrow' },
  ];

  return (
    <header className="h-[68px] border-b border-slate-200 bg-white px-8 flex items-center justify-between sticky top-0 z-30 select-none text-slate-800 shadow-sm">
      {/* Left: Store breadcrumb & Title */}
      <div className="flex flex-col justify-center min-w-0 pr-4">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="truncate max-w-[200px] text-slate-700 font-semibold">{workspaceName}</span>
          <span className="text-slate-300">/</span>
          <span className="text-blue-600 font-mono text-[11px] font-bold">MID: mid_98fbc18</span>
        </div>
        <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-tight truncate">
          {title}
        </h1>
      </div>

      {/* Centre: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <button
          onClick={onOpenCommandPalette}
          className="w-full h-9 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg px-3 flex items-center justify-between text-xs text-slate-500 hover:text-slate-700 transition-all shadow-inner"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">Search payments, orders, refunds...</span>
          </div>
          <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-500 shadow-xs">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Mode Toggle, Quick Actions, Preview, Notifications, Help */}
      <div className="flex items-center gap-3">
        {/* Razorpay's Iconic Test / Live Mode Toggle */}
        <div className="flex items-center p-0.5 bg-slate-100 rounded-full border border-slate-200 shadow-xs">
          <button
            onClick={() => setIsTestMode(true)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
              isTestMode
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isTestMode ? 'bg-slate-950 animate-pulse' : 'bg-slate-400'}`} />
            TEST MODE
          </button>
          <button
            onClick={() => {
              setShowLiveModal(true);
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              !isTestMode
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-3 h-3" />
            Live Mode
          </button>
        </div>

        {/* Quick Action Button (+ Create New) */}
        <div className="relative">
          <button
            onClick={() => setShowCreateMenu(!showCreateMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Create</span>
            <ChevronDown className="w-3 h-3 ml-0.5 text-blue-200" />
          </button>

          {showCreateMenu && (
            <div className="absolute right-0 top-11 w-56 bg-white border border-slate-200 rounded-xl p-1.5 shadow-2xl z-50 text-xs text-slate-800 space-y-0.5">
              <button
                onClick={() => {
                  setShowCreateMenu(false);
                  onQuickAction?.('create-link');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-blue-600 text-left font-medium transition-colors"
              >
                <Link2 className="w-4 h-4 text-blue-600" />
                <div>
                  <div className="font-bold">Payment Link</div>
                  <div className="text-[10px] text-slate-400">Share via SMS, WhatsApp</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowCreateMenu(false);
                  onQuickAction?.('create-invoice');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-blue-600 text-left font-medium transition-colors"
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                <div>
                  <div className="font-bold">GST Invoice</div>
                  <div className="text-[10px] text-slate-400">Itemized tax bill</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowCreateMenu(false);
                  onQuickAction?.('instant-payout');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-blue-600 text-left font-medium transition-colors"
              >
                <ArrowUpRight className="w-4 h-4 text-purple-600" />
                <div>
                  <div className="font-bold">Instant Payout (X)</div>
                  <div className="text-[10px] text-slate-400">Send money via IMPS/UPI</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowCreateMenu(false);
                  onQuickAction?.('create-qr');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-blue-600 text-left font-medium transition-colors"
              >
                <QrCode className="w-4 h-4 text-amber-600" />
                <div>
                  <div className="font-bold">Dynamic UPI QR</div>
                  <div className="text-[10px] text-slate-400">Instant scan & pay</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowCreateMenu(false);
                  onQuickAction?.('issue-refund');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-rose-600 text-left font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-rose-600" />
                <div>
                  <div className="font-bold">Issue Refund</div>
                  <div className="text-[10px] text-slate-400">Instant refund to customer</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Hosted Checkout Preview */}
        {onOpenCheckoutPreview && (
          <button
            onClick={onOpenCheckoutPreview}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-all shadow-xs"
            title="Open customer hosted checkout simulator"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
            Checkout Demo
          </button>
        )}

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-11 w-84 bg-white border border-slate-200 rounded-xl p-4 space-y-3 z-50 text-xs text-slate-800 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-slate-900">Notifications (3)</span>
                <span className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex justify-between text-slate-900 font-semibold">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Docs Link */}
        <a
          href="http://localhost:3000/docs"
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors"
          title="BuimbPay API Docs"
        >
          <HelpCircle className="w-4 h-4" />
        </a>

        {/* User Pill */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-xs">
            {user ? `${user.firstName?.[0] || 'A'}${user.lastName?.[0] || 'B'}` : 'AB'}
          </div>
          <div className="text-left text-xs">
            <span className="font-bold text-slate-900 block leading-tight">
              {user ? `${user.firstName} ${user.lastName}` : 'Ajay Bora'}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
              <CheckCircle2 className="w-2.5 h-2.5" /> KYC Verified
            </span>
          </div>
        </div>
      </div>

      {/* Live Mode KYC Notice Modal */}
      {showLiveModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 border border-slate-200 rounded-xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-sm font-bold text-slate-900">Activate Live Mode</h3>
              </div>
              <button onClick={() => setShowLiveModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Your test transactions are functioning normally. To accept payments from real customers with real bank debits, submit your business documents for instant live activation.
            </p>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1.5">
              <div className="font-bold text-slate-900">Live Activation Checklist:</div>
              <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Business Profile & GSTIN / PAN (Verified)
              </div>
              <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> HDFC Bank Settlement Account (Penny Drop Verified)
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <span className="w-3.5 h-3.5 rounded-full border border-blue-500 flex items-center justify-center text-[9px] font-bold">3</span>
                Instant Digital e-Sign (Click below to activate)
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowLiveModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Keep Testing
              </button>
              <button
                onClick={() => {
                  setShowLiveModal(false);
                  setIsTestMode(false);
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
              >
                Activate Live Mode Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
