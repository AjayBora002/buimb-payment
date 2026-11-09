import React, { useState } from 'react';
import {
  LayoutDashboard,
  CreditCard,
  Link2,
  RefreshCw,
  Users,
  RotateCcw,
  Landmark,
  BookOpen,
  Code2,
  Settings,
  ShieldCheck,
  ChevronDown,
  Check,
  Menu,
  FileText,
  ArrowUpRight,
  Shield,
  QrCode,
  GitFork,
  LogOut,
  ShoppingBag,
  AlertTriangle,
  FileSpreadsheet,
  Building,
  Zap,
  Smartphone,
  Split,
  Calculator,
  ExternalLink,
  Sparkles,
  Lock,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo.jsx';
import { USER_PERSONAS } from '../types/persona.js';

export const Sidebar = ({
  currentTab,
  onTabChange,
  user,
  currentPersona = USER_PERSONAS[0],
  onLogout,
  collapsed = false,
  onToggleCollapse,
}) => {
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState('Bora Enterprises Pvt Ltd');

  const workspaces = [
    { id: '1', name: 'Bora Enterprises Pvt Ltd', type: 'Primary Account (MID: mid_98fbc18)' },
    { id: '2', name: 'Bora Retail & E-Commerce', type: 'Sub-merchant (MID: mid_44a19c2)' },
    { id: '3', name: 'Bora Staging Sandbox', type: 'Test Environment' },
  ];

  const buimbpayNavGroups = [
    {
      group: 'Home',
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'startup-perks', label: 'Startup Perks', icon: Sparkles, badge: '₹1Cr Perks' },
      ],
    },
    {
      group: 'Payment Gateway',
      items: [
        { id: 'transactions', label: 'Payments', icon: CreditCard, count: '1,248' },
        { id: 'orders', label: 'Orders', icon: ShoppingBag },
        { id: 'refunds', label: 'Refunds', icon: RotateCcw },
        { id: 'payment-links', label: 'Payment Links', icon: Link2 },
        { id: 'payment-pages', label: 'Payment Pages', icon: FileText, badge: 'No-Code' },
        { id: 'route', label: 'Route (Split Pay)', icon: Split, badge: 'Marketplace' },
        { id: 'magic-checkout', label: 'Magic Checkout', icon: Zap, badge: 'AI RTO' },
        { id: 'upi-observers', label: 'UPI & Observers', icon: Smartphone, badge: '0% Fee' },
        { id: 'qr-codes', label: 'Smart QR & Soundbox', icon: QrCode, badge: 'UPI' },
        { id: 'invoices', label: 'Invoices & GST', icon: FileText },
        { id: 'subscriptions', label: 'Subscriptions', icon: RefreshCw },
        { id: 'smart-collect', label: 'Smart Collect', icon: Building, badge: 'VAN' },
        { id: 'optimizer', label: 'Optimizer', icon: GitFork, badge: 'AI Route' },
        { id: 'customers', label: 'Customers', icon: Users },
      ],
    },
    {
      group: 'Banking Plus (BuimbPayX)',
      items: [
        { id: 'payouts', label: 'Payouts', icon: ArrowUpRight, badge: 'Instant' },
        { id: 'payout-links', label: 'Payout Links', icon: ExternalLink, badge: 'Self-Serve' },
        { id: 'verification', label: 'Bank & VPA Verify', icon: ShieldCheck, badge: 'Penny Drop' },
        { id: 'corporate-cards', label: 'Corporate Cards', icon: CreditCard, badge: 'Smart' },
        { id: 'account-statement', label: 'Account Statement', icon: BookOpen, badge: 'Current A/c' },
        { id: 'ledger', label: 'Double-Entry Ledger', icon: Lock, badge: 'RBI Escrow' },
      ],
    },
    {
      group: 'Risk & Disputes',
      items: [
        { id: 'disputes', label: 'Disputes & Chargebacks', icon: AlertTriangle, count: '1' },
        { id: 'risk', label: 'Fraud Prevention Rules', icon: Shield, badge: 'AI Shield' },
      ],
    },
    {
      group: 'Settlements & Reports',
      items: [
        { id: 'settlements', label: 'Settlements', icon: Landmark, badge: 'T+0 Instant' },
        { id: 'reconciliation', label: 'Reconciliation', icon: RefreshCw, badge: 'MIS' },
        { id: 'tools', label: 'GST & TDS Calculators', icon: Calculator, badge: 'Tools' },
        { id: 'reports', label: 'Reports Center', icon: FileSpreadsheet },
      ],
    },
    {
      group: 'Developers & Settings',
      items: [
        { id: 'developers', label: 'API Keys & Webhooks', icon: Code2 },
        { id: 'settings-kyc', label: 'Business Profile & KYC', icon: Settings, badge: 'Verified' },
      ],
    },
  ];

  return (
    <aside
      className={`bg-[#0C1938] text-slate-300 border-r border-slate-800 flex flex-col justify-between select-none relative transition-all duration-300 z-40 ${
        collapsed ? 'w-16' : 'w-[250px]'
      }`}
    >
      <div className="flex flex-col h-full min-h-0">
        {/* Brand Header */}
        <div className="h-[68px] px-4 flex items-center justify-between border-b border-slate-800 bg-[#0A142C]">
          <BrandLogo collapsed={collapsed} />
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Merchant Store Selector */}
        {!collapsed && (
          <div className="p-3 border-b border-slate-800 bg-[#091228] relative">
            <button
              onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
              className="w-full p-2.5 rounded-lg bg-[#0e1d40] hover:bg-[#132652] border border-slate-700/80 flex items-center justify-between text-left transition-colors"
            >
              <div className="truncate min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                    Merchant Account
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-bold text-white truncate block mt-0.5">
                  {currentWorkspace}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            </button>

            {showWorkspaceMenu && (
              <div className="absolute top-[68px] left-3 right-3 bg-[#0e1d40] border border-slate-700 rounded-lg p-1.5 z-50 space-y-1 shadow-2xl text-xs">
                {workspaces.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => {
                      setCurrentWorkspace(w.name);
                      setShowWorkspaceMenu(false);
                    }}
                    className="w-full text-left p-2 rounded-md hover:bg-slate-800/80 flex items-center justify-between text-slate-200"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-white truncate">{w.name}</div>
                      <div className="text-[10px] text-slate-400">{w.type}</div>
                    </div>
                    {currentWorkspace === w.name && (
                      <Check className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-5">
          {buimbpayNavGroups.map((grp) => (
            <div key={grp.group} className="space-y-0.5">
              {!collapsed && (
                <div className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {grp.group}
                </div>
              )}

              {grp.items.map((item) => {
                const Icon = item.icon;
                const active = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all group cursor-pointer ${
                      active
                        ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate min-w-0">
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 transition-colors ${
                          active ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                        }`}
                      />
                      {!collapsed && (
                        <span className="truncate">
                          {item.label}
                        </span>
                      )}
                    </div>

                    {!collapsed && (item.badge || item.count) && (
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          active
                            ? 'bg-white/20 text-white'
                            : item.count
                            ? 'bg-slate-800 text-slate-300'
                            : 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                        }`}
                      >
                        {item.badge || item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Gateway Uptime Indicator */}
        {!collapsed && (
          <div className="p-3 border-t border-slate-800 bg-[#091228] space-y-2">
            <div className="p-2.5 rounded-lg bg-[#0e1d40] border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-semibold text-slate-200">BuimbPay Rails</span>
              </div>
              <span className="text-[10px] text-emerald-400 tabular-nums font-mono font-bold">99.98% Up</span>
            </div>
          </div>
        )}

        {/* Footer Account Profile */}
        <div className="p-3 border-t border-slate-800 bg-[#0A142C]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-md">
                {user ? `${user.firstName?.[0] || 'A'}${user.lastName?.[0] || 'B'}` : 'AB'}
              </div>
              {!collapsed && (
                <div className="truncate min-w-0">
                  <div className="text-xs font-bold text-white truncate">
                    {user ? `${user.firstName} ${user.lastName}` : 'Ajay Bora'}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono truncate">
                    MID: mid_98fbc18
                  </div>
                </div>
              )}
            </div>

            {!collapsed && onLogout && (
              <button
                onClick={onLogout}
                className="p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
