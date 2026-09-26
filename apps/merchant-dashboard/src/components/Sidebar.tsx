import React, { useState } from 'react';
import {
  LayoutDashboard,
  CreditCard,
  Link2,
  RefreshCw,
  Users,
  RotateCcw,
  Landmark,
  Scale,
  BookOpen,
  Code2,
  KeyRound,
  Webhook,
  Terminal,
  Settings,
  ShieldCheck,
  CreditCard as BillingIcon,
  ChevronDown,
  ChevronUp,
  LifeBuoy,
  Check,
  Activity,
  Menu,
  FileText,
  ArrowUpRight,
  Shield,
  QrCode,
  GitFork,
  LogOut,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo.js';
import { UserPersona, USER_PERSONAS } from '../types/persona.js';
import type { AuthUser } from '../types/auth.js';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  user?: AuthUser | null;
  currentPersona?: UserPersona;
  onPersonaChange?: (persona: UserPersona) => void;
  onLogout?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  portalMode?: 'merchant' | 'ops';
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  user,
  currentPersona = USER_PERSONAS[0],
  onPersonaChange,
  onLogout,
  collapsed = false,
  onToggleCollapse,
  portalMode = 'merchant',
}) => {
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState('Acme India Technologies');

  const workspaces = [
    { id: '1', name: 'Acme India Technologies', type: 'Primary Org' },
    { id: '2', name: 'Acme B2B Marketplace', type: 'Sub-merchant' },
    { id: '3', name: 'Acme Global Staging', type: 'Test Sandbox' },
  ];

  const merchantGroups = [
    {
      group: 'Overview',
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'transactions', label: 'Transactions', icon: CreditCard },
      ],
    },
    {
      group: 'Collect Payments',
      items: [
        { id: 'qr-codes', label: 'QR Codes & POS', icon: QrCode, badge: 'PhonePe' },
        { id: 'payment-links', label: 'Payment Links', icon: Link2 },
        { id: 'subscriptions', label: 'Subscriptions', icon: RefreshCw },
        { id: 'optimizer', label: 'Optimizer (Routing)', icon: GitFork, badge: 'Smart' },
        { id: 'invoices', label: 'Invoices', icon: FileText, badge: 'New' },
        { id: 'customers', label: 'Customers', icon: Users },
      ],
    },
    {
      group: 'Manage Money',
      items: [
        { id: 'refunds', label: 'Refunds & Disputes', icon: RotateCcw, badge: '1' },
        { id: 'settlements', label: 'Settlements', icon: Landmark },
        { id: 'payouts', label: 'Payouts', icon: ArrowUpRight },
        { id: 'reconciliation', label: 'Reconciliation', icon: Scale },
        { id: 'ledger', label: 'Ledger & Audit', icon: BookOpen },
      ],
    },
    {
      group: 'Developers',
      items: [
        { id: 'developers', label: 'Developers & API', icon: Code2 },
        { id: 'api-keys', label: 'API Keys', icon: KeyRound },
        { id: 'webhooks', label: 'Webhooks', icon: Webhook },
        { id: 'logs', label: 'Logs & Telemetry', icon: Terminal },
      ],
    },
    {
      group: 'Settings',
      items: [
        { id: 'settings-kyc', label: 'Business Settings & KYC', icon: Settings },
        { id: 'team', label: 'Team & Permissions', icon: ShieldCheck },
        { id: 'billing', label: 'Billing & MDR', icon: BillingIcon },
      ],
    },
  ];

  const opsGroups = [
    {
      group: 'Operations',
      items: [
        { id: 'company-ops', label: 'KYC Review', icon: Shield, badge: undefined as string | undefined },
        { id: 'company-ops-disputes', label: 'Disputes', icon: RotateCcw, badge: undefined as string | undefined },
        { id: 'company-ops-risk', label: 'Risk Rules', icon: Activity, badge: undefined as string | undefined },
      ],
    },
  ];

  const navigationGroups = portalMode === 'ops' ? opsGroups : merchantGroups;

  return (
    <aside
      className={`bg-[#EDE7D6] text-[#131B17] border-r border-[rgba(19,27,23,0.12)] flex flex-col justify-between select-none relative transition-all duration-300 z-40 ${
        collapsed ? 'w-16' : 'w-[250px]'
      }`}
    >
      <div className="flex flex-col h-full min-h-0">
        {/* Brand Header */}
        <div className="h-[72px] px-4 flex items-center justify-between border-b border-[rgba(19,27,23,0.12)] bg-[#EDE7D6]">
          <BrandLogo collapsed={collapsed} />
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-[4px] text-[#5C5646] hover:text-[#131B17] hover:bg-[#F6F3EA] transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Workspace Selector */}
        {!collapsed && (
          <div className="p-3 border-b border-[rgba(19,27,23,0.1)] relative bg-[#EDE7D6]">
            <button
              onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
              className="w-full p-2 rounded-[4px] bg-[#F6F3EA] hover:bg-white border border-[rgba(19,27,23,0.12)] flex items-center justify-between text-left transition-colors"
            >
              <div className="truncate min-w-0 pr-2">
                <span className="text-[10px] font-bold text-[#5C5646] uppercase block">
                  Workspace
                </span>
                <span className="text-xs font-bold text-[#131B17] truncate block">
                  {currentWorkspace}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#5C5646] flex-shrink-0" />
            </button>

            {showWorkspaceMenu && (
              <div className="absolute top-16 left-3 right-3 bg-[#EDE7D6] border border-[rgba(19,27,23,0.15)] rounded-[4px] p-1.5 z-50 space-y-1 text-xs">
                {workspaces.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => {
                      setCurrentWorkspace(w.name);
                      setShowWorkspaceMenu(false);
                    }}
                    className="w-full text-left p-2 rounded-[4px] hover:bg-[#F6F3EA] flex items-center justify-between text-[#131B17]"
                  >
                    <div>
                      <div className="font-bold">{w.name}</div>
                      <div className="text-[10px] text-[#5C5646]">{w.type}</div>
                    </div>
                    {currentWorkspace === w.name && <Check className="w-3.5 h-3.5 text-[#C9A227]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Navigation Items (Scrollable with generous breathing room) */}
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
          {navigationGroups.map((grp) => (
            <div key={grp.group} className="space-y-1.5">
              {!collapsed && (
                <div className="px-3 py-1 text-[11px] font-bold text-[#5C5646] uppercase">
                  {grp.group}
                </div>
              )}

              {grp.items.map((item) => {
                const Icon = item.icon;
                const active =
                  currentTab === item.id ||
                  (item.id === 'company-ops-disputes' && currentTab === 'company-ops') ||
                  (item.id === 'company-ops-risk' && currentTab === 'company-ops') ||
                  (item.id === 'api-keys' && currentTab === 'developers') ||
                  (item.id === 'webhooks' && currentTab === 'developers') ||
                  (item.id === 'logs' && currentTab === 'developers') ||
                  (item.id === 'team' && currentTab === 'settings-kyc') ||
                  (item.id === 'billing' && currentTab === 'settings-kyc');

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      const targetId = item.id.startsWith('company-ops') ? 'company-ops' : item.id;
                      onTabChange(targetId);
                    }}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] text-xs font-semibold transition-all relative group ${
                      active
                        ? 'bg-[#C9A227] text-[#131B17] font-bold'
                        : 'text-[#5C5646] hover:text-[#131B17] hover:bg-[#F6F3EA]'
                    }`}
                  >
                    {/* Left-edge accent bar with smooth slide-in motion */}
                    <span
                      className={`absolute left-0 top-1 bottom-1 w-[3px] bg-[#C9A227] rounded-r transition-all duration-200 ${
                        active
                          ? 'opacity-0'
                          : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                      }`}
                    />

                    <div className="flex items-center gap-3 truncate min-w-0">
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 transition-colors ${
                          active
                            ? 'text-[#131B17]'
                            : 'text-[#5C5646] group-hover:text-[#131B17]'
                        }`}
                      />
                      {!collapsed && (
                        <span className={`truncate ${!active ? 'group-hover:underline' : ''}`}>
                          {item.label}
                        </span>
                      )}
                    </div>

                    {!collapsed && item.badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded-[2px] text-[9px] font-bold border ${
                          active
                            ? 'border-[#131B17] text-[#131B17] bg-transparent'
                            : 'border-[#C9A227] text-[#131B17] bg-transparent'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Gateway Health & Support */}
        {!collapsed && (
          <div className="p-3 border-t border-[rgba(19,27,23,0.12)] bg-[#EDE7D6] space-y-2">
            <div className="p-2.5 rounded-[4px] bg-[#F6F3EA] border border-[rgba(19,27,23,0.12)] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-[2px] bg-[#4E8B6F]" />
                <span className="text-[11px] font-bold text-[#131B17]">Mock Gateway</span>
              </div>
              <span className="text-[10px] text-[#4E8B6F] tabular-nums font-mono font-bold">99.98% Uptime</span>
            </div>

            <a
              href="http://localhost:3000/contact"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[4px] text-[11px] text-[#5C5646] hover:text-[#131B17] hover:bg-[#F6F3EA] transition-colors"
            >
              <LifeBuoy className="w-3.5 h-3.5 text-[#5C5646]" />
              Support & Escalation SLA
            </a>
          </div>
        )}

        {/* Footer Account Panel & Sign Out */}
        <div className="p-3 border-t border-[rgba(19,27,23,0.12)] relative bg-[#EDE7D6]">
          <div className="flex items-center justify-between p-1.5 rounded-[4px]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-[4px] bg-[#131B17] border border-[rgba(19,27,23,0.15)] flex items-center justify-center text-xs font-bold text-[#EDE7D6] flex-shrink-0">
                {user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}` || 'MB' : currentPersona.initials}
              </div>
              {!collapsed && (
                <div className="truncate min-w-0">
                  <div className="text-xs font-bold text-[#131B17] truncate">
                    {user ? `${user.firstName} ${user.lastName}` : currentPersona.name}
                  </div>
                  <div className="text-[10px] text-[#5C5646] truncate">
                    {user?.merchantUsers?.[0]?.role?.name || user?.email || currentPersona.roleLabel}
                  </div>
                </div>
              )}
            </div>
            {!collapsed && onLogout && (
              <button
                onClick={onLogout}
                className="p-1.5 rounded-[4px] text-[#5C5646] hover:text-[#B0503F] hover:bg-[#F6F3EA] border border-transparent hover:border-[rgba(19,27,23,0.12)] transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
