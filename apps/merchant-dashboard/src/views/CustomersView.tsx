import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  ChevronDown,
  CreditCard,
  Smartphone,
  Building2,
  TrendingUp,
  ShieldCheck,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  X,
  Check,
  Star,
  ArrowUpRight,
  Download,
  Tag,
} from 'lucide-react';
import { useToast } from '../components/Toast.js';

interface SavedInstrument {
  type: 'card' | 'upi' | 'netbanking';
  label: string;
  masked: string;
  isDefault: boolean;
}

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  gstin?: string;
  city: string;
  lifetimeSpend: number;
  lifetimeSpendFmt: string;
  totalOrders: number;
  successRate: number;
  lastActive: string;
  firstSeen: string;
  segment: 'vip' | 'regular' | 'new' | 'at-risk';
  savedInstruments: SavedInstrument[];
  tags: string[];
}

const CUSTOMERS: CustomerRecord[] = [
  {
    id: 'cust_001',
    name: 'Anand Enterprises',
    email: 'anand@enterprises.in',
    phone: '+91 98765 43210',
    gstin: '27AABCE0000A1Z5',
    city: 'Mumbai',
    lifetimeSpend: 2350000,
    lifetimeSpendFmt: '₹23,50,000',
    totalOrders: 47,
    successRate: 97.8,
    lastActive: '2h ago',
    firstSeen: '14 Jan 2025',
    segment: 'vip',
    savedInstruments: [
      { type: 'card', label: 'HDFC Visa Platinum', masked: '•••• 4291', isDefault: true },
      { type: 'upi', label: 'Google Pay', masked: 'anand@okhdfcbank', isDefault: false },
    ],
    tags: ['b2b', 'enterprise', 'net30'],
  },
  {
    id: 'cust_002',
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    phone: '+91 90000 12345',
    city: 'Bangalore',
    lifetimeSpend: 89000,
    lifetimeSpendFmt: '₹89,000',
    totalOrders: 12,
    successRate: 100,
    lastActive: '1d ago',
    firstSeen: '3 Mar 2026',
    segment: 'regular',
    savedInstruments: [
      { type: 'upi', label: 'PhonePe', masked: 'priya@ybl', isDefault: true },
    ],
    tags: ['retail', 'upi-preferred'],
  },
  {
    id: 'cust_003',
    name: 'TechSoft Solutions Pvt Ltd',
    email: 'finance@techsoft.io',
    phone: '+91 80000 99001',
    gstin: '29AABCT1234A1ZP',
    city: 'Hyderabad',
    lifetimeSpend: 1200000,
    lifetimeSpendFmt: '₹12,00,000',
    totalOrders: 28,
    successRate: 89.3,
    lastActive: '5d ago',
    firstSeen: '22 Aug 2025',
    segment: 'at-risk',
    savedInstruments: [
      { type: 'netbanking', label: 'ICICI Corporate Net Banking', masked: 'ICICI ••••9845', isDefault: true },
      { type: 'card', label: 'Axis Rupay Corp', masked: '•••• 7712', isDefault: false },
    ],
    tags: ['b2b', 'high-churn-risk'],
  },
  {
    id: 'cust_004',
    name: 'Meera Iyer',
    email: 'meera.iyer@outlook.com',
    phone: '+91 77700 55522',
    city: 'Chennai',
    lifetimeSpend: 6500,
    lifetimeSpendFmt: '₹6,500',
    totalOrders: 2,
    successRate: 100,
    lastActive: '3h ago',
    firstSeen: '18 Sep 2026',
    segment: 'new',
    savedInstruments: [],
    tags: ['new-customer'],
  },
  {
    id: 'cust_005',
    name: 'Nexgen Retail India',
    email: 'payments@nexgen.co.in',
    phone: '+91 88888 11111',
    gstin: '07AABCN5678B1ZX',
    city: 'Delhi',
    lifetimeSpend: 5800000,
    lifetimeSpendFmt: '₹58,00,000',
    totalOrders: 213,
    successRate: 95.2,
    lastActive: '30m ago',
    firstSeen: '02 Oct 2024',
    segment: 'vip',
    savedInstruments: [
      { type: 'card', label: 'SBI Corporate Visa', masked: '•••• 0001', isDefault: true },
    ],
    tags: ['b2b', 'enterprise', 'net45', 'key-account'],
  },
];

const SEGMENT_META: Record<string, { label: string; color: string; borderClass: string }> = {
  vip: { label: 'VIP', color: '#C9A227', borderClass: 'border-[#C9A227] text-[#C9A227] bg-[#C9A227]/5' },
  regular: { label: 'Regular', color: '#4E8B6F', borderClass: 'border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5' },
  new: { label: 'New', color: '#8FA396', borderClass: 'border-[#8FA396] text-[#8FA396] bg-[#8FA396]/5' },
  'at-risk': { label: 'At Risk', color: '#B0503F', borderClass: 'border-[#B0503F] text-[#B0503F] bg-[#B0503F]/5' },
};

const INSTRUMENT_ICON: Record<string, React.FC<{ className?: string }>> = {
  card: CreditCard,
  upi: Smartphone,
  netbanking: Building2,
};

export const CustomersView: React.FC = () => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [segment, setSegment] = useState('ALL');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);
  const [showAddTag, setShowAddTag] = useState(false);
  const [newTag, setNewTag] = useState('');

  const filtered = CUSTOMERS.filter((c) => {
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchSegment = segment === 'ALL' || c.segment === segment;
    return matchSearch && matchSegment;
  });

  const totalSpend = CUSTOMERS.reduce((s, c) => s + c.lifetimeSpend, 0);
  const vipCount = CUSTOMERS.filter((c) => c.segment === 'vip').length;
  const avgSuccessRate =
    CUSTOMERS.reduce((s, c) => s + c.successRate, 0) / CUSTOMERS.length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#EDE7D6] tracking-tight">Customers</h2>
          <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
          <p className="text-xs text-[#8FA396] mt-1.5">
            {CUSTOMERS.length} total customers · Lifetime GMV ₹{(totalSpend / 100000).toFixed(1)}L
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Export started — CSV will be emailed', 'success')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-[4px] bg-[#1D2E28] hover:bg-[#EDE7D6]/[0.05] border border-[#EDE7D6]/[0.12] text-[#EDE7D6] text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button
            onClick={() => showToast('Customer creation coming in full build', 'info')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-[4px] bg-[#C9A227] hover:bg-[#d8b030] text-[#131B17] text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Customer
          </button>
        </div>
      </div>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Customers', value: CUSTOMERS.length.toString(), sub: '+3 this week', icon: Users, color: '#8FA396' },
          { label: 'VIP Accounts', value: vipCount.toString(), sub: 'Top 40% of GMV', icon: Star, color: '#C9A227' },
          { label: 'Total Lifetime GMV', value: `₹${(totalSpend / 100000).toFixed(1)}L`, sub: 'all time', icon: TrendingUp, color: '#4E8B6F' },
          { label: 'Avg. Success Rate', value: `${avgSuccessRate.toFixed(1)}%`, sub: 'across all customers', icon: ShieldCheck, color: '#4E8B6F' },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-[#1D2E28] rounded-none border border-[#EDE7D6]/[0.08] p-4 hover:border-[#EDE7D6]/[0.16] transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#8FA396] font-medium">{m.label}</span>
                <div className="w-7 h-7 rounded-[2px] flex items-center justify-center border" style={{ borderColor: `${m.color}40`, background: `${m.color}15` }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: m.color }} />
                </div>
              </div>
              <div className="text-2xl font-bold font-mono text-[#EDE7D6]">{m.value}</div>
              <div className="text-[11px] text-[#8FA396] mt-1">{m.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8FA396]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="w-full h-9 bg-[#1D2E28] border border-[#EDE7D6]/[0.12] rounded-[4px] pl-9 pr-3 text-xs text-[#EDE7D6] placeholder-[#8FA396]/60 focus:outline-none focus:border-[#C9A227]"
          />
        </div>
        <div className="flex gap-1.5 border-b border-[#EDE7D6]/[0.08] pb-2">
          {['ALL', 'vip', 'regular', 'new', 'at-risk'].map((s) => (
            <button
              key={s}
              onClick={() => setSegment(s)}
              className={`px-3 py-1 rounded-[4px] text-xs font-semibold transition-colors ${
                segment === s
                  ? 'bg-[#C9A227] text-[#131B17]'
                  : 'text-[#8FA396] hover:text-[#EDE7D6]'
              }`}
            >
              {s === 'ALL' ? 'All' : SEGMENT_META[s]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-[#1D2E28] rounded-none border border-[#EDE7D6]/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#EDE7D6]/[0.08] bg-[#131B17]/60">
                {['Customer', 'Segment', 'Lifetime GMV', 'Orders', 'Success Rate', 'Last Active', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[#8FA396]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE7D6]/[0.08]">
              {filtered.map((c) => {
                const seg = SEGMENT_META[c.segment];
                return (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCustomer(c)}
                    className="hover:bg-[#EDE7D6]/[0.02] cursor-pointer transition-colors group"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-[2px] bg-[#131B17] border border-[#EDE7D6]/[0.12] flex items-center justify-center text-xs font-bold text-[#C9A227] flex-shrink-0 font-mono">
                          {c.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-[#EDE7D6] flex items-center gap-1">
                            {c.name}
                            {c.segment === 'vip' && <Star className="w-3 h-3 text-[#C9A227] fill-[#C9A227]" />}
                          </div>
                          <div className="text-[#8FA396] text-[11px] font-mono">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border ${seg.borderClass}`}
                      >
                        {seg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono font-semibold text-[#EDE7D6]">
                      {c.lifetimeSpendFmt}
                    </td>
                    <td className="px-4 py-3.5 text-[#8FA396] font-mono">{c.totalOrders}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-none bg-[#131B17]">
                          <div
                            className="h-full rounded-none"
                            style={{
                              width: `${c.successRate}%`,
                              background: c.successRate >= 95 ? '#4E8B6F' : c.successRate >= 80 ? '#C98A2E' : '#B0503F',
                            }}
                          />
                        </div>
                        <span className={`font-mono font-medium ${c.successRate >= 95 ? 'text-[#4E8B6F]' : c.successRate >= 80 ? 'text-[#C98A2E]' : 'text-[#B0503F]'}`}>
                          {c.successRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[#8FA396] font-mono">{c.lastActive}</td>
                    <td className="px-4 py-3.5">
                      <button className="opacity-0 group-hover:opacity-100 p-1 rounded-[4px] hover:bg-[#EDE7D6]/[0.05] text-[#8FA396] hover:text-[#EDE7D6] transition-all">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-[#131B17]/80 backdrop-blur-sm" onClick={() => setSelectedCustomer(null)} />
          <div className="w-full max-w-md bg-[#131B17] border-l border-[#EDE7D6]/[0.12] flex flex-col h-full overflow-y-auto">
            {/* Drawer Header */}
            <div className="sticky top-0 bg-[#131B17] border-b border-[#EDE7D6]/[0.08] px-5 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[2px] bg-[#1D2E28] border border-[#EDE7D6]/[0.12] flex items-center justify-center text-sm font-bold text-[#C9A227] font-mono">
                  {selectedCustomer.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <div className="font-bold text-[#EDE7D6] flex items-center gap-1.5">
                    {selectedCustomer.name}
                    {selectedCustomer.segment === 'vip' && <Star className="w-3.5 h-3.5 text-[#C9A227] fill-[#C9A227]" />}
                  </div>
                  <div className="text-[11px] font-mono text-[#8FA396]">{selectedCustomer.id}</div>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="p-1.5 rounded-[4px] hover:bg-[#EDE7D6]/[0.05] text-[#8FA396] hover:text-[#EDE7D6]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#EDE7D6]">Contact Details</div>
                {[
                  { icon: Mail, label: selectedCustomer.email },
                  { icon: Phone, label: selectedCustomer.phone },
                  { icon: Calendar, label: `Member since ${selectedCustomer.firstSeen}` },
                ].map((row) => {
                  const Icon = row.icon;
                  return (
                    <div key={row.label} className="flex items-center gap-2.5 text-xs text-[#8FA396]">
                      <Icon className="w-3.5 h-3.5 text-[#8FA396]" />
                      {row.label}
                    </div>
                  );
                })}
                {selectedCustomer.gstin && (
                  <div className="flex items-center gap-2.5 text-xs text-[#8FA396]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8FA396]" />
                    GSTIN: <span className="font-mono text-[#EDE7D6]">{selectedCustomer.gstin}</span>
                  </div>
                )}
              </div>

              {/* Spend Metrics */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Lifetime GMV', value: selectedCustomer.lifetimeSpendFmt },
                  { label: 'Orders', value: selectedCustomer.totalOrders.toString() },
                  { label: 'Success', value: `${selectedCustomer.successRate}%` },
                ].map((m) => (
                  <div key={m.label} className="bg-[#1D2E28] rounded-none border border-[#EDE7D6]/[0.08] p-3 text-center">
                    <div className="text-lg font-bold font-mono text-[#EDE7D6]">{m.value}</div>
                    <div className="text-[10px] text-[#8FA396] mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Saved Payment Instruments */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#EDE7D6]">Saved Instruments</div>
                {selectedCustomer.savedInstruments.length === 0 ? (
                  <div className="text-xs text-[#8FA396] italic">No saved instruments</div>
                ) : (
                  selectedCustomer.savedInstruments.map((inst, i) => {
                    const Icon = INSTRUMENT_ICON[inst.type];
                    return (
                      <div key={i} className="flex items-center justify-between bg-[#1D2E28] rounded-none p-3 border border-[#EDE7D6]/[0.08]">
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-[#C9A227]" />
                          <div>
                            <div className="text-xs font-medium text-[#EDE7D6]">{inst.label}</div>
                            <div className="text-[11px] font-mono text-[#8FA396]">{inst.masked}</div>
                          </div>
                        </div>
                        {inst.isDefault && (
                          <span className="text-[10px] font-mono font-bold text-[#4E8B6F] border border-[#4E8B6F] bg-[#4E8B6F]/10 px-2 py-0.5 rounded-[2px]">Default</span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#EDE7D6]">Tags</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCustomer.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-[2px] bg-[#1D2E28] border border-[#EDE7D6]/[0.08] text-[10px] font-mono text-[#EDE7D6]">
                      {tag}
                    </span>
                  ))}
                  <button
                    onClick={() => setShowAddTag(true)}
                    className="px-2 py-0.5 rounded-[2px] border border-[#EDE7D6]/[0.2] text-[10px] text-[#8FA396] hover:text-[#EDE7D6] hover:border-[#C9A227] transition-colors flex items-center gap-1"
                  >
                    <Tag className="w-2.5 h-2.5" /> Add Tag
                  </button>
                </div>
                {showAddTag && (
                  <div className="flex gap-2 mt-2">
                    <input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="e.g. net60"
                      className="flex-1 h-8 bg-[#1D2E28] border border-[#EDE7D6]/[0.12] rounded-[4px] px-2.5 text-xs text-[#EDE7D6] placeholder-[#8FA396]/60 focus:outline-none focus:border-[#C9A227]"
                    />
                    <button
                      onClick={() => {
                        if (newTag.trim()) {
                          showToast(`Tag "${newTag}" added`, 'success');
                          setNewTag('');
                        }
                        setShowAddTag(false);
                      }}
                      className="px-3 h-8 bg-[#C9A227] hover:bg-[#d8b030] text-[#131B17] text-xs font-semibold rounded-[4px] transition-colors"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="flex gap-2 pt-2 border-t border-[#EDE7D6]/[0.08]">
                <button
                  onClick={() => showToast(`Sending payment request to ${selectedCustomer.email}`, 'success')}
                  className="flex-1 py-2 bg-[#C9A227] hover:bg-[#d8b030] text-[#131B17] text-xs font-semibold rounded-[4px] transition-colors"
                >
                  Send Payment Request
                </button>
                <button
                  onClick={() => showToast('Customer report generated', 'info')}
                  className="py-2 px-3 bg-[#1D2E28] hover:bg-[#EDE7D6]/[0.05] text-[#EDE7D6] text-xs font-medium rounded-[4px] border border-[#EDE7D6]/[0.12] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
