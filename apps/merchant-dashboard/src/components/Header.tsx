import React, { useState } from 'react';
import {
  Search,
  Bell,
  HelpCircle,
  Command,
  Shield,
  Lock,
  X,
  AlertTriangle,
  ExternalLink,
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
}

export const Header: React.FC<HeaderProps> = ({
  title,
  workspaceName = 'Acme India Technologies Pvt Ltd',
  currentPersona = USER_PERSONAS[0],
  user,
  onPersonaChange,
  onOpenCommandPalette,
  onOpenCheckoutPreview,
  portalMode = 'merchant',
  onTogglePortalMode,
}) => {
  const [showProdModal, setShowProdModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: '1', title: 'Pre-debit alert dispatched', time: '12m ago', desc: '14 UPI AutoPay mandates notified 24h prior' },
    { id: '2', title: 'Daily Nodal reconciliation matched', time: '1h ago', desc: 'HDFC Escrow account balanced to zero deviation' },
    { id: '3', title: 'Sandbox MockProvider active', time: '3h ago', desc: 'Simulated settlement batch queued for 00:00 IST' },
  ];

  return (
    <header className="h-[76px] border-b border-[rgba(19,27,23,0.12)] bg-[#EDE7D6] px-8 flex items-center justify-between sticky top-0 z-30 select-none text-[#131B17]">
      {/* Left: Defined Shelf for Page Titles with strong weight contrast */}
      <div className="flex flex-col justify-center min-w-0 pr-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-[#5C5646]">
          <span className="truncate max-w-[180px] md:max-w-none">{workspaceName}</span>
          <span className="text-[#5C5646]/50">/</span>
          <span className="text-[#5C5646] uppercase font-bold tracking-wider">{portalMode === 'ops' ? 'Operations' : 'Merchant Portal'}</span>
        </div>
        <h1 className="text-xl font-extrabold text-[#131B17] tracking-tight leading-tight truncate">
          {title}
        </h1>
      </div>

      {/* Centre: Global Search with Cmd+K */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <button
          onClick={onOpenCommandPalette}
          className="w-full h-9 bg-[#F6F3EA] hover:bg-white border border-[rgba(19,27,23,0.12)] rounded-[4px] px-3 flex items-center justify-between text-xs text-[#5C5646] hover:text-[#131B17] transition-all"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-[#5C5646]" />
            <span className="truncate">Search payments, links, customers, or jump to...</span>
          </div>
          <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[2px] bg-[#EDE7D6] border border-[rgba(19,27,23,0.15)] text-[10px] font-mono text-[#5C5646]">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Prominent Environment Switcher, Notifications, Help, User */}
      <div className="flex items-center gap-3">
        {/* Customer Checkout Preview Button */}
        {onOpenCheckoutPreview && (
          <button
            onClick={onOpenCheckoutPreview}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#F6F3EA] hover:bg-white border border-[rgba(19,27,23,0.15)] text-[#131B17] text-xs font-bold transition-all"
            title="Open customer hosted checkout simulator"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C9A227]" />
            Preview Checkout
          </button>
        )}

        {/* Portal Switcher (Merchant Dashboard vs Company Ops) */}
        {onTogglePortalMode && (
          <button
            onClick={onTogglePortalMode}
            className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-[4px] text-xs font-bold border transition-all ${
              portalMode === 'ops'
                ? 'bg-[#C9A227] text-[#131B17] border-[#B08C1E]'
                : 'bg-[#F6F3EA] hover:bg-white text-[#5C5646] hover:text-[#131B17] border-[rgba(19,27,23,0.12)]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            {portalMode === 'ops' ? 'Company Ops' : 'Merchant Portal'}
          </button>
        )}

        {/* Sandbox / Production Switcher */}
        <div className="flex items-center p-0.5 bg-[#F6F3EA] rounded-[4px] border border-[rgba(19,27,23,0.12)]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-[#C9A227] text-[#131B17] text-xs font-bold border border-[#B08C1E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#131B17]" />
            Sandbox
          </div>

          <button
            onClick={() => setShowProdModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-[2px] text-xs font-medium text-[#5C5646] hover:text-[#131B17] hover:bg-white transition-colors"
          >
            <Lock className="w-3 h-3" />
            Production
          </button>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-[4px] text-[#5C5646] hover:text-[#131B17] hover:bg-[#F6F3EA] border border-transparent hover:border-[rgba(19,27,23,0.12)] transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C9A227]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-[#EDE7D6] border border-[rgba(19,27,23,0.15)] rounded-[4px] p-4 space-y-3 z-50 text-xs text-[#131B17]">
              <div className="flex items-center justify-between border-b border-[rgba(19,27,23,0.12)] pb-2">
                <span className="font-bold text-[#131B17]">Notifications</span>
                <span className="text-[10px] text-[#C9A227] font-bold cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-[4px] bg-[#F6F3EA] border border-[rgba(19,27,23,0.08)] space-y-1">
                    <div className="flex justify-between text-[#131B17] font-bold">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-[#5C5646] font-normal">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#5C5646]">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Documentation / Help Icon */}
        <a
          href="http://localhost:3000/docs"
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-[4px] text-[#5C5646] hover:text-[#131B17] hover:bg-[#F6F3EA] border border-transparent hover:border-[rgba(19,27,23,0.12)] transition-colors"
          title="API Documentation & Developer Portal"
        >
          <HelpCircle className="w-4 h-4" />
        </a>

        {/* Role Badge Indicator */}
        <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-[rgba(19,27,23,0.12)]">
          <div className="w-7 h-7 rounded-[4px] bg-[#131B17] border border-[rgba(19,27,23,0.15)] flex items-center justify-center text-xs font-bold text-[#EDE7D6]">
            {user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}` || 'MB' : currentPersona.initials}
          </div>
          <div className="text-left text-xs">
            <span className="font-bold text-[#131B17] block leading-none">
              {user ? `${user.firstName} ${user.lastName}` : currentPersona.name.split(' ')[0]}
            </span>
            <span className="text-[10px] text-[#5C5646] leading-none">
              {user?.merchantUsers?.[0]?.role?.name || currentPersona.roleLabel.split(' · ')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Production Switch Protection Dialog */}
      {showProdModal && (
        <div className="fixed inset-0 bg-[#131B17]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#EDE7D6] text-[#131B17] border border-[rgba(19,27,23,0.15)] rounded-[4px] w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[rgba(19,27,23,0.12)] pb-3">
              <div className="flex items-center gap-2 text-[#C98A2E]">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-sm font-bold text-[#131B17]">Production Access Restricted</h3>
              </div>
              <button onClick={() => setShowProdModal(false)} className="text-[#5C5646] hover:text-[#131B17]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#5C5646] leading-relaxed">
              Production payment gateway terminals and real money movement remain locked in compliance with Reserve Bank of India (RBI) Payment Aggregator regulations.
            </p>

            <div className="p-3 bg-[#F6F3EA] rounded-[4px] border border-[rgba(19,27,23,0.1)] text-xs text-[#5C5646] space-y-1.5">
              <div className="font-bold text-[#131B17]">Pending Milestones:</div>
              <div>• RBI Authorisation Certificate of Operation</div>
              <div>• Scheduled Commercial Bank Escrow Deed</div>
              <div>• PCI-DSS Level 1 QSA Attestation of Compliance</div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowProdModal(false)}
                className="px-4 py-2 rounded-[4px] bg-[#F6F3EA] hover:bg-white text-[#131B17] text-xs font-bold border border-[rgba(19,27,23,0.12)]"
              >
                Understood
              </button>
              <a
                href="http://localhost:3000/compliance"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-[4px] bg-[#C9A227] hover:bg-[#DBB53B] text-[#131B17] text-xs font-bold inline-flex items-center gap-1.5 border border-[#B08C1E]"
              >
                View Compliance Roadmap
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
