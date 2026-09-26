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
    { id: 'transactions', label: 'Go to Transactions', category: 'Navigation', icon: CreditCard, tab: 'transactions' },
    { id: 'payment-links', label: 'Go to Payment Links', category: 'Navigation', icon: Link2, tab: 'payment-links' },
    { id: 'subscriptions', label: 'Go to Subscriptions', category: 'Navigation', icon: RefreshCw, tab: 'subscriptions' },
    { id: 'refunds', label: 'Go to Refunds & Disputes', category: 'Navigation', icon: RotateCcw, tab: 'refunds' },
    { id: 'settlements', label: 'Go to Settlements', category: 'Navigation', icon: Landmark, tab: 'settlements' },
    { id: 'ledger', label: 'Go to Ledger & Reconciliation', category: 'Navigation', icon: BookOpen, tab: 'ledger' },
    { id: 'developers', label: 'Go to Developers & API', category: 'Navigation', icon: Code2, tab: 'developers' },
    { id: 'settings-kyc', label: 'Go to Business Settings & KYC', category: 'Navigation', icon: Settings, tab: 'settings-kyc' },
    { id: 'act-create-link', label: 'Action: Create Payment Link', category: 'Quick Action', icon: Plus, action: 'create-link' },
    { id: 'act-simulate-intent', label: 'Action: Create Test Payment', category: 'Quick Action', icon: CreditCard, action: 'test-integration' },
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
    <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-24 p-4 select-none">
      <div className="bg-[#1D2E28] border border-[rgba(237,231,214,0.12)] rounded-none w-full max-w-xl overflow-hidden flex flex-col">
        {/* Search bar */}
        <div className="p-4 border-b border-[rgba(237,231,214,0.08)] bg-[#131B17] flex items-center gap-3">
          <Search className="w-4 h-4 text-[#8FA396]" />
          <input
            type="text"
            placeholder="Type a command or search destination..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-xs text-[#EDE7D6] placeholder:text-[#8FA396] focus:outline-none"
          />
          <button onClick={onClose} className="text-[#8FA396] hover:text-[#EDE7D6]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-[#8FA396]">No matching commands found</div>
          ) : (
            filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    if (cmd.tab) onNavigate(cmd.tab);
                    if (cmd.action && onAction) onAction(cmd.action);
                    onClose();
                  }}
                  className="w-full px-3 py-2.5 rounded-[4px] flex items-center justify-between text-xs text-left hover:bg-[#131B17] text-[#EDE7D6] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#C9A227]" />
                    <span className="font-medium text-[#EDE7D6]">{cmd.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8FA396] px-1.5 py-0.5 rounded-[2px] bg-[#131B17] border border-[rgba(237,231,214,0.08)]">
                    {cmd.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="p-3 border-t border-[rgba(237,231,214,0.08)] bg-[#131B17] flex items-center justify-between text-[11px] font-mono text-[#8FA396]">
          <span>Navigation</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
