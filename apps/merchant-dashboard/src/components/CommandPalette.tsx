import React, { useState, useEffect } from 'react';
import {
  Search,
  LayoutDashboard,
  CreditCard,
  Link2,
  RefreshCw,
  RotateCcw,
  Landmark,
  BookOpen,
  Code2,
  Settings,
  Plus,
  KeyRound,
  X,
  ShoppingBag,
  FileText,
  Building,
  GitFork,
  ArrowUpRight,
  AlertTriangle,
  FileSpreadsheet,
  Smartphone,
  Split,
  Zap,
  ExternalLink,
  ShieldCheck,
  Calculator,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
  onAction?: (actionKey: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onAction,
}) => {
  const [query, setQuery] = useState('');

  const commands = [
    { id: 'overview', label: 'Go to Overview', category: 'Navigation', icon: LayoutDashboard, tab: 'overview' },
    { id: 'transactions', label: 'Go to Payments / Transactions', category: 'Navigation', icon: CreditCard, tab: 'transactions' },
    { id: 'orders', label: 'Go to Orders', category: 'Navigation', icon: ShoppingBag, tab: 'orders' },
    { id: 'refunds', label: 'Go to Refunds', category: 'Navigation', icon: RotateCcw, tab: 'refunds' },
    { id: 'payment-links', label: 'Go to Payment Links', category: 'Navigation', icon: Link2, tab: 'payment-links' },
    { id: 'payment-pages', label: 'Go to Payment Pages (No-Code)', category: 'Navigation', icon: FileText, tab: 'payment-pages' },
    { id: 'route', label: 'Go to Route (Split Payments & Linked Accounts)', category: 'Navigation', icon: Split, tab: 'route' },
    { id: 'magic-checkout', label: 'Go to Magic Checkout & AI RTO Scoring', category: 'Navigation', icon: Zap, tab: 'magic-checkout' },
    { id: 'upi-observers', label: 'Go to Sovereign UPI & Bank Observers (0% Fees)', category: 'Navigation', icon: Smartphone, tab: 'upi-observers' },
    { id: 'qr-codes', label: 'Go to Smart QR & Soundbox', category: 'Navigation', icon: FileText, tab: 'qr-codes' },
    { id: 'invoices', label: 'Go to Invoices & GST', category: 'Navigation', icon: FileText, tab: 'invoices' },
    { id: 'subscriptions', label: 'Go to Subscriptions & Mandates', category: 'Navigation', icon: RefreshCw, tab: 'subscriptions' },
    { id: 'smart-collect', label: 'Go to Smart Collect (Virtual Accounts)', category: 'Navigation', icon: Building, tab: 'smart-collect' },
    { id: 'optimizer', label: 'Go to Optimizer (Multi-Gateway)', category: 'Navigation', icon: GitFork, tab: 'optimizer' },
    { id: 'payouts', label: 'Go to Payouts (BuimbPayX)', category: 'Navigation', icon: ArrowUpRight, tab: 'payouts' },
    { id: 'payout-links', label: 'Go to Payout Links (Self-Serve Vendor Payouts)', category: 'Navigation', icon: ExternalLink, tab: 'payout-links' },
    { id: 'verification', label: 'Go to Bank & VPA Verification (₹1 Penny Drop)', category: 'Navigation', icon: ShieldCheck, tab: 'verification' },
    { id: 'corporate-cards', label: 'Go to Corporate Cards (BuimbPayX)', category: 'Navigation', icon: CreditCard, tab: 'corporate-cards' },
    { id: 'account-statement', label: 'Go to Account Statement', category: 'Navigation', icon: BookOpen, tab: 'account-statement' },
    { id: 'disputes', label: 'Go to Disputes & Chargebacks', category: 'Navigation', icon: AlertTriangle, tab: 'disputes' },
    { id: 'settlements', label: 'Go to Settlements (Instant T+0)', category: 'Navigation', icon: Landmark, tab: 'settlements' },
    { id: 'tools', label: 'Go to GST & TDS Calculators (Compliance)', category: 'Navigation', icon: Calculator, tab: 'tools' },
    { id: 'reports', label: 'Go to Reports Center', category: 'Navigation', icon: FileSpreadsheet, tab: 'reports' },
    { id: 'developers', label: 'Go to API Keys & Webhooks', category: 'Navigation', icon: Code2, tab: 'developers' },
    { id: 'settings-kyc', label: 'Go to Business Profile & KYC', category: 'Navigation', icon: Settings, tab: 'settings-kyc' },
    { id: 'act-create-link', label: 'Action: Create Payment Link', category: 'Quick Action', icon: Plus, action: 'create-link' },
    { id: 'act-simulate-intent', label: 'Action: Simulate Live Payment', category: 'Quick Action', icon: CreditCard, action: 'test-integration' },
    { id: 'act-view-keys', label: 'Action: View API Keys', category: 'Quick Action', icon: KeyRound, action: 'view-keys' },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-start justify-center pt-24 p-4 animate-in fade-in duration-100">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-3 border-b border-slate-200 flex items-center gap-2 bg-slate-50">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or jump to feature..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
              No commands matching "{query}"
            </div>
          ) : (
            filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    if (cmd.tab) onNavigate(cmd.tab);
                    if (cmd.action) onAction?.(cmd.action);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-left text-xs transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                    <span className="font-medium text-slate-800 group-hover:text-blue-700">{cmd.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-blue-500 font-mono">
                    {cmd.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Use ↑ ↓ to navigate</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
