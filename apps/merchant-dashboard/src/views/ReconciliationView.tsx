import React, { useState } from 'react';
import {
  Scale,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  RefreshCw,
  Filter,
  Search,
  ChevronRight,
  X,
  FileText,
  TrendingUp,
  ShieldCheck,
  Zap,
  MoreHorizontal,
} from 'lucide-react';
import { useToast } from '../components/Toast.js';

type MatchStatus = 'MATCHED' | 'MISMATCH' | 'PENDING' | 'MANUAL_RESOLVED';

interface ReconciliationEntry {
  id: string;
  date: string;
  bankRef: string;
  bankAmount: number;
  bankAmountFmt: string;
  ledgerRef: string;
  ledgerAmount: number;
  ledgerAmountFmt: string;
  difference: number;
  differenceFmt: string;
  status: MatchStatus;
  description: string;
  resolvedBy?: string;
  resolvedAt?: string;
  resolvedNote?: string;
}

const ENTRIES: ReconciliationEntry[] = [
  {
    id: 'rec_001',
    date: '22 Sep 2026',
    bankRef: 'HDFC/N/20260922/00142',
    bankAmount: 34120000,
    bankAmountFmt: '₹3,41,200.00',
    ledgerRef: 'STLMT-20260922-001',
    ledgerAmount: 34120000,
    ledgerAmountFmt: '₹3,41,200.00',
    difference: 0,
    differenceFmt: '₹0.00',
    status: 'MATCHED',
    description: 'Nodal → Merchant Settlement Batch #142',
  },
  {
    id: 'rec_002',
    date: '21 Sep 2026',
    bankRef: 'HDFC/N/20260921/00141',
    bankAmount: 28650000,
    bankAmountFmt: '₹2,86,500.00',
    ledgerRef: 'STLMT-20260921-001',
    ledgerAmount: 28670000,
    ledgerAmountFmt: '₹2,86,700.00',
    difference: -20000,
    differenceFmt: '−₹200.00',
    status: 'MISMATCH',
    description: 'Possible MDR rounding discrepancy — HDFC side',
  },
  {
    id: 'rec_003',
    date: '21 Sep 2026',
    bankRef: 'HDFC/N/20260921/00139',
    bankAmount: 5500000,
    bankAmountFmt: '₹55,000.00',
    ledgerRef: 'STLMT-20260921-002',
    ledgerAmount: 5500000,
    ledgerAmountFmt: '₹55,000.00',
    difference: 0,
    differenceFmt: '₹0.00',
    status: 'MATCHED',
    description: 'Refund pool replenishment credit',
  },
  {
    id: 'rec_004',
    date: '20 Sep 2026',
    bankRef: 'HDFC/N/20260920/00136',
    bankAmount: 0,
    bankAmountFmt: '—',
    ledgerRef: 'STLMT-20260920-003',
    ledgerAmount: 12000000,
    ledgerAmountFmt: '₹1,20,000.00',
    difference: 12000000,
    differenceFmt: '+₹1,20,000.00',
    status: 'MISMATCH',
    description: 'Bank statement missing — holiday settlement lag',
  },
  {
    id: 'rec_005',
    date: '19 Sep 2026',
    bankRef: 'HDFC/N/20260919/00130',
    bankAmount: 41700000,
    bankAmountFmt: '₹4,17,000.00',
    ledgerRef: 'STLMT-20260919-001',
    ledgerAmount: 41700000,
    ledgerAmountFmt: '₹4,17,000.00',
    difference: 0,
    differenceFmt: '₹0.00',
    status: 'MATCHED',
    description: 'Standard D+2 nodal settlement',
  },
  {
    id: 'rec_006',
    date: '18 Sep 2026',
    bankRef: 'HDFC/N/20260918/00121',
    bankAmount: 8250000,
    bankAmountFmt: '₹82,500.00',
    ledgerRef: 'STLMT-20260918-001',
    ledgerAmount: 8225000,
    ledgerAmountFmt: '₹82,250.00',
    difference: 25000,
    differenceFmt: '+₹250.00',
    status: 'MANUAL_RESOLVED',
    description: 'UPI interchange adjustment — manually verified',
    resolvedBy: 'Suresh Rajan (Finance Ops)',
    resolvedAt: '19 Sep 2026, 10:42 IST',
    resolvedNote: 'Confirmed with NPCI UDIR portal. Difference is ₹250 NPCI fee credit; correct.',
  },
  {
    id: 'rec_007',
    date: '17 Sep 2026',
    bankRef: 'PENDING',
    bankAmount: 0,
    bankAmountFmt: '—',
    ledgerRef: 'STLMT-20260917-002',
    ledgerAmount: 15500000,
    ledgerAmountFmt: '₹1,55,000.00',
    difference: 0,
    differenceFmt: '—',
    status: 'PENDING',
    description: 'NACH batch settlement — awaiting bank confirmation',
  },
];

const STATUS_META: Record<MatchStatus, { label: string; color: string; borderClass: string; icon: React.FC<{ className?: string }> }> = {
  MATCHED: { label: 'Matched', color: '#4E8B6F', borderClass: 'border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5', icon: CheckCircle2 },
  MISMATCH: { label: 'Mismatch', color: '#B0503F', borderClass: 'border-[#B0503F] text-[#B0503F] bg-[#B0503F]/5', icon: AlertTriangle },
  PENDING: { label: 'Pending', color: '#C98A2E', borderClass: 'border-[#C98A2E] text-[#C98A2E] bg-[#C98A2E]/5', icon: Clock },
  MANUAL_RESOLVED: { label: 'Resolved', color: '#C9A227', borderClass: 'border-[#C9A227] text-[#C9A227] bg-[#C9A227]/5', icon: ShieldCheck },
};

export const ReconciliationView: React.FC = () => {
  const { showToast } = useToast();
  const [filter, setFilter] = useState<'ALL' | MatchStatus>('ALL');
  const [selected, setSelected] = useState<ReconciliationEntry | null>(null);
  const [resolveNote, setResolveNote] = useState('');

  const filtered = filter === 'ALL' ? ENTRIES : ENTRIES.filter((e) => e.status === filter);

  const matched = ENTRIES.filter((e) => e.status === 'MATCHED').length;
  const mismatches = ENTRIES.filter((e) => e.status === 'MISMATCH').length;
  const pending = ENTRIES.filter((e) => e.status === 'PENDING').length;
  const resolved = ENTRIES.filter((e) => e.status === 'MANUAL_RESOLVED').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#EDE7D6] tracking-tight">Reconciliation</h2>
          <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
          <p className="text-xs text-[#8FA396] mt-1.5">3-way bank ↔ ledger ↔ payment matching · HDFC Nodal Escrow</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Reconciliation re-run queued', 'info')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-[4px] bg-[#1D2E28] hover:bg-[#EDE7D6]/[0.05] border border-[#EDE7D6]/[0.12] text-[#EDE7D6] text-xs font-medium transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Re-run
          </button>
          <button
            onClick={() => showToast('Reconciliation report exported', 'success')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-[4px] bg-[#C9A227] hover:bg-[#d8b030] text-[#131B17] text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Matched', value: matched, icon: CheckCircle2, color: '#4E8B6F' },
          { label: 'Mismatches', value: mismatches, icon: AlertTriangle, color: '#B0503F' },
          { label: 'Pending', value: pending, icon: Clock, color: '#C98A2E' },
          { label: 'Manually Resolved', value: resolved, icon: ShieldCheck, color: '#C9A227' },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              onClick={() => setFilter(m.label.toUpperCase().replace(' ', '_') as any)}
              className="bg-[#1D2E28] rounded-none border border-[#EDE7D6]/[0.08] p-4 hover:border-[#EDE7D6]/[0.16] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#8FA396] font-medium">{m.label}</span>
                <div className="w-7 h-7 rounded-[2px] flex items-center justify-center border" style={{ borderColor: `${m.color}40`, background: `${m.color}15` }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: m.color }} />
                </div>
              </div>
              <div className="text-2xl font-bold font-mono text-[#EDE7D6]">{m.value}</div>
              <div className="text-[11px] text-[#8FA396] mt-1">entries</div>
            </div>
          );
        })}
      </div>

      {/* Automation Status Banner */}
      <div className="flex items-center gap-3 p-3.5 rounded-none bg-[#131B17] border border-[#C9A227]/30">
        <Zap className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
        <div className="text-xs text-[#8FA396]">
          <span className="font-semibold text-[#EDE7D6]">Auto-match engine active</span> — Daily bank statement fetched at 07:00 IST via HDFC CMS API. 
          Next run in <span className="font-mono text-[#EDE7D6]">12h 18m</span>.
          {mismatches > 0 && (
            <span className="ml-2 text-[#B0503F] font-semibold">{mismatches} mismatch{mismatches > 1 ? 'es' : ''} require manual review.</span>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 border-b border-[#EDE7D6]/[0.08] pb-2">
        {(['ALL', 'MATCHED', 'MISMATCH', 'PENDING', 'MANUAL_RESOLVED'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded-[4px] text-xs font-semibold transition-colors ${
              filter === s ? 'bg-[#C9A227] text-[#131B17]' : 'text-[#8FA396] hover:text-[#EDE7D6]'
            }`}
          >
            {s === 'ALL' ? 'All' : STATUS_META[s as MatchStatus]?.label}
          </button>
        ))}
      </div>

      {/* Reconciliation Table */}
      <div className="bg-[#1D2E28] rounded-none border border-[#EDE7D6]/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#EDE7D6]/[0.08] bg-[#131B17]/60">
                {['Date', 'Description', 'Bank Amount', 'Ledger Amount', 'Δ Difference', 'Status', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[#8FA396]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE7D6]/[0.08]">
              {filtered.map((entry) => {
                const meta = STATUS_META[entry.status];
                const StatusIcon = meta.icon;
                return (
                  <tr
                    key={entry.id}
                    onClick={() => setSelected(entry)}
                    className="hover:bg-[#EDE7D6]/[0.02] cursor-pointer transition-colors group"
                  >
                    <td className="px-4 py-3.5 text-[#8FA396] font-mono whitespace-nowrap">{entry.date}</td>
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-[#EDE7D6]">{entry.description}</div>
                      <div className="text-[11px] font-mono text-[#8FA396]/70">{entry.bankRef}</div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[#EDE7D6]">{entry.bankAmountFmt}</td>
                    <td className="px-4 py-3.5 font-mono text-[#EDE7D6]">{entry.ledgerAmountFmt}</td>
                    <td className="px-4 py-3.5 font-mono font-semibold">
                      <span className={entry.difference === 0 ? 'text-[#4E8B6F]' : 'text-[#B0503F]'}>
                        {entry.differenceFmt}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border ${meta.borderClass}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {meta.label}
                      </span>
                    </td>
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

      {/* Detail / Resolve Panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-[#131B17]/80 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="w-full max-w-md bg-[#131B17] border-l border-[#EDE7D6]/[0.12] flex flex-col h-full overflow-y-auto">
            <div className="sticky top-0 bg-[#131B17] border-b border-[#EDE7D6]/[0.08] px-5 py-4 flex items-center justify-between z-10">
              <div>
                <div className="font-bold text-[#EDE7D6] text-sm">Reconciliation Entry</div>
                <div className="text-[11px] font-mono text-[#8FA396]">{selected.id}</div>
              </div>
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-[4px] hover:bg-[#EDE7D6]/[0.05] text-[#8FA396] hover:text-[#EDE7D6] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Comparison */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1D2E28] rounded-none p-3 border border-[#EDE7D6]/[0.08]">
                  <div className="text-[11px] text-[#8FA396] font-medium mb-1">Bank Statement</div>
                  <div className="text-base font-bold font-mono text-[#EDE7D6]">{selected.bankAmountFmt}</div>
                  <div className="text-[11px] font-mono text-[#8FA396]/70 mt-1 truncate">{selected.bankRef}</div>
                </div>
                <div className="bg-[#1D2E28] rounded-none p-3 border border-[#EDE7D6]/[0.08]">
                  <div className="text-[11px] text-[#8FA396] font-medium mb-1">Ledger Record</div>
                  <div className="text-base font-bold font-mono text-[#EDE7D6]">{selected.ledgerAmountFmt}</div>
                  <div className="text-[11px] font-mono text-[#8FA396]/70 mt-1 truncate">{selected.ledgerRef}</div>
                </div>
              </div>

              {/* Difference Summary */}
              <div className={`p-3.5 rounded-none border ${selected.difference === 0 ? 'bg-[#4E8B6F]/10 border-[#4E8B6F]/30' : 'bg-[#B0503F]/10 border-[#B0503F]/30'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#8FA396]">Difference</span>
                  <span className={`text-sm font-bold font-mono ${selected.difference === 0 ? 'text-[#4E8B6F]' : 'text-[#B0503F]'}`}>
                    {selected.differenceFmt}
                  </span>
                </div>
                <div className="text-[11px] text-[#EDE7D6] mt-1">{selected.description}</div>
              </div>

              {/* Resolution (for manual resolved) */}
              {selected.status === 'MANUAL_RESOLVED' && selected.resolvedBy && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-[#8FA396]">Resolution</div>
                  <div className="bg-[#1D2E28] border border-[#EDE7D6]/[0.08] rounded-none p-3 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-[#C9A227] font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> {selected.resolvedBy}
                    </div>
                    <div className="text-[11px] text-[#8FA396]">{selected.resolvedAt}</div>
                    <div className="text-xs text-[#EDE7D6] mt-1">{selected.resolvedNote}</div>
                  </div>
                </div>
              )}

              {/* Manual Resolve Form (for mismatches) */}
              {selected.status === 'MISMATCH' && (
                <div className="space-y-3">
                  <div className="text-[11px] font-bold text-[#8FA396]">Manual Resolution</div>
                  <textarea
                    value={resolveNote}
                    onChange={(e) => setResolveNote(e.target.value)}
                    placeholder="Explain the reason for the mismatch and confirmation source..."
                    rows={3}
                    className="w-full bg-[#1D2E28] border border-[#EDE7D6]/[0.12] rounded-[4px] px-3 py-2.5 text-xs text-[#EDE7D6] placeholder-[#8FA396]/60 focus:outline-none focus:border-[#C9A227] resize-none"
                  />
                  <button
                    onClick={() => {
                      if (!resolveNote.trim()) {
                        showToast('Please provide a resolution note', 'error');
                        return;
                      }
                      showToast('Entry marked as manually resolved', 'success');
                      setResolveNote('');
                      setSelected(null);
                    }}
                    className="w-full py-2.5 bg-[#C9A227] hover:bg-[#d8b030] text-[#131B17] text-xs font-semibold rounded-[4px] transition-colors"
                  >
                    Mark as Manually Resolved
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
