import React, { useState } from 'react';
import {
  ArrowUpRight,
  Plus,
  Search,
  Download,
  Clock,
  CheckCircle2,
  AlertTriangle,
  X,
  Building2,
  CreditCard,
  Landmark,
  TrendingUp,
  Users,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react';
import { useToast } from '../components/Toast.js';

type PayoutStatus = 'PROCESSED' | 'PENDING' | 'FAILED' | 'QUEUED';
type PayoutRail = 'IMPS' | 'NEFT' | 'RTGS' | 'UPI';

interface PayoutRecord {
  id: string;
  beneficiaryName: string;
  beneficiaryAccount: string;
  beneficiaryIfsc: string;
  bank: string;
  amount: number;
  amountFmt: string;
  rail: PayoutRail;
  status: PayoutStatus;
  purpose: string;
  utr?: string;
  createdAt: string;
  processedAt?: string;
}

const PAYOUTS: PayoutRecord[] = [
  {
    id: 'pyt_001',
    beneficiaryName: 'Ravi Kumar (Vendor #V-001)',
    beneficiaryAccount: '••••••7890',
    beneficiaryIfsc: 'HDFC0004321',
    bank: 'HDFC Bank',
    amount: 4500000,
    amountFmt: '₹45,000.00',
    rail: 'IMPS',
    status: 'PROCESSED',
    purpose: 'Vendor payment — October delivery batch',
    utr: 'HDFC2609220987654',
    createdAt: '22 Sep 2026, 10:15 IST',
    processedAt: '22 Sep 2026, 10:15 IST',
  },
  {
    id: 'pyt_002',
    beneficiaryName: 'Sumaiya Ali (Freelancer)',
    beneficiaryAccount: '••••••3322',
    beneficiaryIfsc: 'ICIC0001234',
    bank: 'ICICI Bank',
    amount: 1250000,
    amountFmt: '₹12,500.00',
    rail: 'NEFT',
    status: 'QUEUED',
    purpose: 'Design & Content — September invoice',
    createdAt: '22 Sep 2026, 11:00 IST',
  },
  {
    id: 'pyt_003',
    beneficiaryName: 'CloudOps Infrastructure Ltd',
    beneficiaryAccount: '••••••0011',
    beneficiaryIfsc: 'SBIN0008765',
    bank: 'SBI',
    amount: 18750000,
    amountFmt: '₹1,87,500.00',
    rail: 'RTGS',
    status: 'PROCESSED',
    purpose: 'Monthly hosting & colocation — RTGS wire',
    utr: 'SBI2609210043210',
    createdAt: '21 Sep 2026, 09:30 IST',
    processedAt: '21 Sep 2026, 10:04 IST',
  },
  {
    id: 'pyt_004',
    beneficiaryName: 'Delivery Partner Pool (bulk)',
    beneficiaryAccount: 'POOL',
    beneficiaryIfsc: 'YESB0000123',
    bank: 'Yes Bank',
    amount: 7800000,
    amountFmt: '₹78,000.00',
    rail: 'IMPS',
    status: 'FAILED',
    purpose: 'Delivery partner commission — 52 riders',
    createdAt: '20 Sep 2026, 18:00 IST',
    processedAt: '20 Sep 2026, 18:03 IST',
  },
  {
    id: 'pyt_005',
    beneficiaryName: 'Office Supplies Depot',
    beneficiaryAccount: '••••••5544',
    beneficiaryIfsc: 'AXIS0004567',
    bank: 'Axis Bank',
    amount: 385000,
    amountFmt: '₹3,850.00',
    rail: 'UPI',
    status: 'PROCESSED',
    purpose: 'Stationery & pantry supplies',
    utr: 'AXIS2609190000098',
    createdAt: '19 Sep 2026, 14:30 IST',
    processedAt: '19 Sep 2026, 14:30 IST',
  },
];

const STATUS_META: Record<PayoutStatus, { label: string; color: string; borderClass: string; icon: React.FC<{ className?: string }> }> = {
  PROCESSED: { label: 'Processed', color: '#4E8B6F', borderClass: 'border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5', icon: CheckCircle2 },
  PENDING: { label: 'Pending', color: '#C98A2E', borderClass: 'border-[#C98A2E] text-[#C98A2E] bg-[#C98A2E]/5', icon: Clock },
  QUEUED: { label: 'Queued', color: '#C9A227', borderClass: 'border-[#C9A227] text-[#C9A227] bg-[#C9A227]/5', icon: Clock },
  FAILED: { label: 'Failed', color: '#B0503F', borderClass: 'border-[#B0503F] text-[#B0503F] bg-[#B0503F]/5', icon: AlertTriangle },
};

const RAIL_META: Record<PayoutRail, { color: string; bg: string }> = {
  IMPS: { color: '#4E8B6F', bg: '#4E8B6F15' },
  NEFT: { color: '#8FA396', bg: '#8FA39615' },
  RTGS: { color: '#C9A227', bg: '#C9A22715' },
  UPI: { color: '#C98A2E', bg: '#C98A2E15' },
};

export const PayoutsView: React.FC = () => {
  const { showToast } = useToast();
  const [filter, setFilter] = useState<'ALL' | PayoutStatus>('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selected, setSelected] = useState<PayoutRecord | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // New payout form state
  const [form, setForm] = useState({
    name: '', account: '', ifsc: '', amount: '', purpose: '', rail: 'IMPS' as PayoutRail,
  });

  const filtered = filter === 'ALL' ? PAYOUTS : PAYOUTS.filter((p) => p.status === filter);
  const totalProcessed = PAYOUTS.filter((p) => p.status === 'PROCESSED').reduce((s, p) => s + p.amount, 0);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#EDE7D6] tracking-tight">Payouts</h2>
          <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
          <p className="text-xs text-[#8FA396] mt-1.5">Vendor & partner disbursements via IMPS / NEFT / RTGS / UPI</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Payout report exported', 'success')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-[4px] bg-[#1D2E28] hover:bg-[#EDE7D6]/[0.05] border border-[#EDE7D6]/[0.12] text-[#EDE7D6] text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-[4px] bg-[#C9A227] hover:bg-[#d8b030] text-[#131B17] text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> New Payout
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Disbursed', value: `₹${(totalProcessed / 100000).toFixed(1)}L`, icon: TrendingUp, color: '#4E8B6F' },
          { label: 'Queued', value: PAYOUTS.filter((p) => p.status === 'QUEUED').length.toString(), icon: Clock, color: '#C9A227' },
          { label: 'Failed', value: PAYOUTS.filter((p) => p.status === 'FAILED').length.toString(), icon: AlertTriangle, color: '#B0503F' },
          { label: 'Beneficiaries', value: PAYOUTS.length.toString(), icon: Users, color: '#8FA396' },
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
            </div>
          );
        })}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 border-b border-[#EDE7D6]/[0.08] pb-2">
        {(['ALL', 'PROCESSED', 'QUEUED', 'PENDING', 'FAILED'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded-[4px] text-xs font-semibold transition-colors ${
              filter === s ? 'bg-[#C9A227] text-[#131B17]' : 'text-[#8FA396] hover:text-[#EDE7D6]'
            }`}
          >
            {s === 'ALL' ? 'All' : STATUS_META[s as PayoutStatus]?.label ?? s}
          </button>
        ))}
      </div>

      {/* Payouts Table */}
      <div className="bg-[#1D2E28] rounded-none border border-[#EDE7D6]/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#EDE7D6]/[0.08] bg-[#131B17]/60">
                {['Beneficiary', 'Amount', 'Rail', 'Purpose', 'Status', 'Date', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[#8FA396]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE7D6]/[0.08]">
              {filtered.map((p) => {
                const meta = STATUS_META[p.status];
                const StatusIcon = meta.icon;
                const railStyle = RAIL_META[p.rail];
                return (
                  <tr
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className="hover:bg-[#EDE7D6]/[0.02] cursor-pointer transition-colors group"
                  >
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-[#EDE7D6]">{p.beneficiaryName}</div>
                      <div className="text-[11px] font-mono text-[#8FA396]/70">{p.bank} · {p.beneficiaryAccount}</div>
                    </td>
                    <td className="px-4 py-3.5 font-mono font-semibold text-[#EDE7D6]">{p.amountFmt}</td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border" style={{ color: railStyle.color, background: railStyle.bg, borderColor: `${railStyle.color}40` }}>
                        {p.rail}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#8FA396] max-w-[180px] truncate">{p.purpose}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border ${meta.borderClass}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {meta.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#8FA396] font-mono whitespace-nowrap">{p.createdAt.split(',')[0]}</td>
                    <td className="px-4 py-3.5">
                      <ChevronRight className="w-3.5 h-3.5 text-[#8FA396] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-[#131B17]/80 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="w-full max-w-md bg-[#131B17] border-l border-[#EDE7D6]/[0.12] flex flex-col h-full overflow-y-auto">
            <div className="sticky top-0 bg-[#131B17] border-b border-[#EDE7D6]/[0.08] px-5 py-4 flex items-center justify-between z-10">
              <div>
                <div className="font-bold text-[#EDE7D6] text-sm">Payout Details</div>
                <div className="text-[11px] font-mono text-[#8FA396]">{selected.id}</div>
              </div>
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-[4px] hover:bg-[#EDE7D6]/[0.05] text-[#8FA396] hover:text-[#EDE7D6] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-5">
              {/* Amount Card */}
              <div className="bg-[#1D2E28] rounded-none p-4 text-center border border-[#EDE7D6]/[0.08]">
                <div className="text-3xl font-bold font-mono text-[#EDE7D6]">{selected.amountFmt}</div>
                <div className="text-xs text-[#8FA396] mt-1">{selected.purpose}</div>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border" style={{ color: RAIL_META[selected.rail].color, background: RAIL_META[selected.rail].bg, borderColor: `${RAIL_META[selected.rail].color}40` }}>
                    {selected.rail}
                  </span>
                  {(() => {
                    const meta = STATUS_META[selected.status];
                    const Icon = meta.icon;
                    return (
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border ${meta.borderClass}`}>
                        <Icon className="w-3 h-3" /> {meta.label}
                      </span>
                    );
                  })()}
                </div>
              </div>

              {/* Beneficiary Details */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#EDE7D6]">Beneficiary Information</div>
                {[
                  { label: 'Name', value: selected.beneficiaryName },
                  { label: 'Account', value: selected.beneficiaryAccount },
                  { label: 'IFSC', value: selected.beneficiaryIfsc },
                  { label: 'Bank', value: selected.bank },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-[#EDE7D6]/[0.08]">
                    <span className="text-xs text-[#8FA396]">{row.label}</span>
                    <span className="text-xs font-mono text-[#EDE7D6]">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* UTR if available */}
              {selected.utr && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#EDE7D6]">Settlement Reference</div>
                  <div className="flex items-center justify-between bg-[#1D2E28] rounded-none p-3 border border-[#EDE7D6]/[0.08]">
                    <span className="text-xs font-mono text-[#4E8B6F]">{selected.utr}</span>
                    <button onClick={() => handleCopy(selected.utr!, 'utr')} className="text-[#8FA396] hover:text-[#EDE7D6]">
                      {copied === 'utr' ? <Check className="w-3.5 h-3.5 text-[#4E8B6F]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Retry Failed */}
              {selected.status === 'FAILED' && (
                <button
                  onClick={() => showToast('Payout retry initiated', 'info')}
                  className="w-full py-2.5 bg-[#B0503F]/15 hover:bg-[#B0503F]/25 text-[#B0503F] text-xs font-semibold rounded-[4px] border border-[#B0503F]/40 transition-colors"
                >
                  Retry Payout
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Payout Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-[#131B17]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1D2E28] border border-[#EDE7D6]/[0.12] rounded-none w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EDE7D6]/[0.08] px-5 py-4">
              <div>
                <h3 className="text-sm font-bold text-[#EDE7D6]">New Payout</h3>
                <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
              </div>
              <button onClick={() => setShowCreateModal(false)} className="p-1.5 rounded-[4px] hover:bg-[#EDE7D6]/[0.05] text-[#8FA396] hover:text-[#EDE7D6]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {[
                { key: 'name', label: 'Beneficiary Name', placeholder: 'e.g. Ravi Kumar' },
                { key: 'account', label: 'Account Number', placeholder: 'e.g. 0123456789' },
                { key: 'ifsc', label: 'IFSC Code', placeholder: 'e.g. HDFC0001234' },
                { key: 'amount', label: 'Amount (₹)', placeholder: 'e.g. 50000' },
                { key: 'purpose', label: 'Purpose / Narration', placeholder: 'e.g. Vendor payment Oct 2026' },
              ].map((f) => (
                <div key={f.key} className="space-y-1.5">
                  <label className="text-xs font-medium text-[#8FA396]">{f.label}</label>
                  <input
                    value={(form as any)[f.key]}
                    onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full h-9 bg-[#131B17] border border-[#EDE7D6]/[0.12] rounded-[4px] px-3 text-xs text-[#EDE7D6] placeholder-[#8FA396]/50 focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              ))}
              {/* Rail Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#8FA396]">Payment Rail</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['IMPS', 'NEFT', 'RTGS', 'UPI'] as PayoutRail[]).map((rail) => (
                    <button
                      key={rail}
                      onClick={() => setForm((prev) => ({ ...prev, rail }))}
                      className={`py-1.5 rounded-[4px] text-xs font-bold transition-colors ${
                        form.rail === rail ? 'bg-[#C9A227] text-[#131B17]' : 'bg-[#131B17] text-[#8FA396] hover:text-[#EDE7D6] border border-[#EDE7D6]/[0.08]'
                      }`}
                    >
                      {rail}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-2 border-t border-[#EDE7D6]/[0.08]">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 py-2 bg-[#131B17] hover:bg-[#EDE7D6]/[0.05] text-[#8FA396] text-xs font-medium rounded-[4px] border border-[#EDE7D6]/[0.08] transition-colors">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    showToast(`Payout of ₹${form.amount} queued via ${form.rail}`, 'success');
                    setShowCreateModal(false);
                    setForm({ name: '', account: '', ifsc: '', amount: '', purpose: '', rail: 'IMPS' });
                  }}
                  className="flex-1 py-2 bg-[#C9A227] hover:bg-[#d8b030] text-[#131B17] text-xs font-semibold rounded-[4px] transition-colors"
                >
                  Submit Payout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
