import React, { useState } from 'react';
import {
  Shield,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ChevronRight,
  X,
  FileText,
  TrendingUp,
  Activity,
  Zap,
  Eye,
  Ban,
  Check,
  MoreHorizontal,
  Building2,
  Star,
} from 'lucide-react';
import { useToast } from '../components/Toast.js';

type KycStatus = 'APPROVED' | 'PENDING' | 'REJECTED' | 'RESUBMISSION';
type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

interface MerchantApplication {
  id: string;
  businessName: string;
  ownerName: string;
  pan: string;
  gstin?: string;
  category: string;
  city: string;
  appliedAt: string;
  kycStatus: KycStatus;
  riskLevel: RiskLevel;
  monthlyGmv: string;
  documentsSubmitted: number;
  documentsRequired: number;
  notes?: string;
}

interface DisputeCase {
  id: string;
  merchantName: string;
  customerName: string;
  amount: string;
  reason: string;
  status: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED_MERCHANT' | 'RESOLVED_CUSTOMER';
  raisedAt: string;
}

interface VelocityRule {
  id: string;
  name: string;
  description: string;
  threshold: string;
  window: string;
  action: 'BLOCK' | 'FLAG' | 'REVIEW';
  active: boolean;
  triggeredLast24h: number;
}

const MERCHANTS: MerchantApplication[] = [
  {
    id: 'mch_KYC001',
    businessName: 'FreshMart Groceries Pvt Ltd',
    ownerName: 'Kartik Mehta',
    pan: 'AAACF1234D',
    gstin: '27AAACF1234D1Z5',
    category: 'Grocery & FMCG',
    city: 'Pune',
    appliedAt: '20 Sep 2026',
    kycStatus: 'PENDING',
    riskLevel: 'LOW',
    monthlyGmv: '₹12L',
    documentsSubmitted: 4,
    documentsRequired: 5,
    notes: 'Bank statement pending',
  },
  {
    id: 'mch_KYC002',
    businessName: 'CryptoEdge Advisory',
    ownerName: 'Rohan D\'Souza',
    pan: 'BBBCE5678F',
    category: 'Financial Advisory',
    city: 'Goa',
    appliedAt: '18 Sep 2026',
    kycStatus: 'REJECTED',
    riskLevel: 'CRITICAL',
    monthlyGmv: '₹80L',
    documentsSubmitted: 5,
    documentsRequired: 5,
    notes: 'Prohibited category — crypto advisory under RBI watch. Rejected by compliance.',
  },
  {
    id: 'mch_KYC003',
    businessName: 'NovaMed Health LLP',
    ownerName: 'Dr. Sunita Rao',
    pan: 'CCCNM9012G',
    gstin: '29CCCNM9012G1ZT',
    category: 'Healthcare & Pharma',
    city: 'Bengaluru',
    appliedAt: '22 Sep 2026',
    kycStatus: 'APPROVED',
    riskLevel: 'LOW',
    monthlyGmv: '₹25L',
    documentsSubmitted: 5,
    documentsRequired: 5,
  },
  {
    id: 'mch_KYC004',
    businessName: 'PixelCraft Studios',
    ownerName: 'Arjun Bose',
    pan: 'DDDPX3456H',
    category: 'Digital Services',
    city: 'Kolkata',
    appliedAt: '21 Sep 2026',
    kycStatus: 'RESUBMISSION',
    riskLevel: 'MEDIUM',
    monthlyGmv: '₹8L',
    documentsSubmitted: 3,
    documentsRequired: 5,
    notes: 'GST certificate mismatch — requested re-upload',
  },
];

const DISPUTES: DisputeCase[] = [
  {
    id: 'dsp_001',
    merchantName: 'FreshMart Groceries',
    customerName: 'Priya Sharma',
    amount: '₹2,499',
    reason: 'Item not received',
    status: 'OPEN',
    raisedAt: '22 Sep 2026',
  },
  {
    id: 'dsp_002',
    merchantName: 'NovaMed Health',
    customerName: 'Vikram Joshi',
    amount: '₹8,500',
    reason: 'Service not as described',
    status: 'UNDER_REVIEW',
    raisedAt: '20 Sep 2026',
  },
  {
    id: 'dsp_003',
    merchantName: 'PixelCraft Studios',
    customerName: 'Ananya Gupta',
    amount: '₹15,000',
    reason: 'Unauthorised charge',
    status: 'RESOLVED_CUSTOMER',
    raisedAt: '18 Sep 2026',
  },
];

const VELOCITY_RULES: VelocityRule[] = [
  { id: 'vr_001', name: 'High-frequency single card', description: 'More than 5 transactions from same card in 10 minutes', threshold: '5 txn', window: '10 min', action: 'BLOCK', active: true, triggeredLast24h: 2 },
  { id: 'vr_002', name: 'New account large amount', description: 'First-time merchant with GMV > ₹1L in first 24h', threshold: '₹1,00,000', window: '24h', action: 'REVIEW', active: true, triggeredLast24h: 0 },
  { id: 'vr_003', name: 'Refund ratio spike', description: 'Merchant refund rate exceeds 15% in rolling 7 days', threshold: '15%', window: '7 days', action: 'FLAG', active: true, triggeredLast24h: 1 },
  { id: 'vr_004', name: 'IP geo-mismatch', description: 'Transaction IP country differs from registered merchant country', threshold: 'geo mismatch', window: 'per txn', action: 'FLAG', active: false, triggeredLast24h: 0 },
];

const KYC_META: Record<KycStatus, { label: string; color: string; icon: React.FC<{ className?: string }> }> = {
  APPROVED: { label: 'Approved', color: '#4E8B6F', icon: CheckCircle2 },
  PENDING: { label: 'Pending', color: '#C98A2E', icon: Clock },
  REJECTED: { label: 'Rejected', color: '#B0503F', icon: Ban },
  RESUBMISSION: { label: 'Resubmission', color: '#C9A227', icon: AlertTriangle },
};

const RISK_META: Record<RiskLevel, { label: string; color: string }> = {
  LOW: { label: 'Low', color: '#4E8B6F' },
  MEDIUM: { label: 'Medium', color: '#C98A2E' },
  HIGH: { label: 'High', color: '#B0503F' },
  CRITICAL: { label: 'Critical', color: '#B0503F' },
};

const DISPUTE_META = {
  OPEN: { label: 'Open', color: '#B0503F' },
  UNDER_REVIEW: { label: 'Under Review', color: '#C98A2E' },
  RESOLVED_MERCHANT: { label: 'Merchant Win', color: '#4E8B6F' },
  RESOLVED_CUSTOMER: { label: 'Customer Win', color: '#8FA396' },
};

export const CompanyOpsView: React.FC = () => {
  const { showToast } = useToast();
  const [tab, setTab] = useState<'kyc' | 'disputes' | 'risk'>('kyc');
  const [selectedMerchant, setSelectedMerchant] = useState<MerchantApplication | null>(null);
  const [rules, setRules] = useState(VELOCITY_RULES);

  const pendingKyc = MERCHANTS.filter((m) => m.kycStatus === 'PENDING' || m.kycStatus === 'RESUBMISSION').length;
  const openDisputes = DISPUTES.filter((d) => d.status === 'OPEN' || d.status === 'UNDER_REVIEW').length;
  const activeRules = rules.filter((r) => r.active).length;
  const triggeredRules = rules.reduce((s, r) => s + r.triggeredLast24h, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#C9A227]" />
            <h2 className="text-xl font-bold text-[#EDE7D6]">Company Operations</h2>
          </div>
          <p className="text-xs text-[#8FA396] mt-0.5">Internal ops portal — Merchant KYC · Disputes · Risk Velocity Rules</p>
        </div>
        <div className="px-2.5 py-1 rounded-[2px] font-mono text-[11px] font-bold border border-[#C9A227] text-[#C9A227] uppercase tracking-wider">
          Internal View Only
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'KYC Queue', value: pendingKyc.toString(), sub: 'awaiting review', icon: Users, color: '#C98A2E' },
          { label: 'Open Disputes', value: openDisputes.toString(), sub: 'need arbitration', icon: AlertTriangle, color: '#B0503F' },
          { label: 'Active Rules', value: `${activeRules}/${rules.length}`, sub: 'velocity rules', icon: Zap, color: '#C9A227' },
          { label: 'Triggered (24h)', value: triggeredRules.toString(), sub: 'rule violations', icon: Activity, color: '#B0503F' },
        ].map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-[#1D2E28] rounded-none border border-[rgba(237,231,214,0.08)] p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-[#8FA396] uppercase tracking-wider">{m.label}</span>
                <div className="w-7 h-7 rounded-[2px] flex items-center justify-center border" style={{ borderColor: `${m.color}30`, background: `${m.color}15` }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: m.color }} />
                </div>
              </div>
              <div className="text-2xl font-mono font-bold tabular-nums text-[#EDE7D6]">{m.value}</div>
              <div className="text-[11px] text-[#8FA396] mt-1">{m.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-[#1D2E28] p-1 border border-[rgba(237,231,214,0.08)] w-fit">
        {[
          { id: 'kyc', label: 'Merchant KYC' },
          { id: 'disputes', label: 'Disputes' },
          { id: 'risk', label: 'Risk Rules' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`px-4 py-1.5 rounded-[4px] text-xs font-semibold transition-all ${
              tab === t.id ? 'bg-[#C9A227] text-[#131B17]' : 'text-[#8FA396] hover:text-[#EDE7D6]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* KYC Tab */}
      {tab === 'kyc' && (
        <div className="bg-[#1D2E28] rounded-none border border-[rgba(237,231,214,0.08)] overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[rgba(237,231,214,0.08)] bg-[#131B17]/40">
                {['Business', 'Category', 'Applied', 'Documents', 'Risk', 'KYC Status'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-mono font-bold text-[#8FA396] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(237,231,214,0.06)]">
              {MERCHANTS.map((m) => {
                const kycMeta = KYC_META[m.kycStatus];
                const riskMeta = RISK_META[m.riskLevel];
                const KycIcon = kycMeta.icon;
                return (
                  <tr key={m.id} onClick={() => setSelectedMerchant(m)} className="hover:bg-[#131B17]/50 cursor-pointer transition-colors group">
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-[#EDE7D6]">{m.businessName}</div>
                      <div className="text-[11px] text-[#8FA396]">{m.ownerName} · {m.city}</div>
                    </td>
                    <td className="px-4 py-3.5 text-[#EDE7D6]/80">{m.category}</td>
                    <td className="px-4 py-3.5 font-mono text-[#8FA396]">{m.appliedAt}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-[1px] bg-[#131B17]">
                          <div
                            className="h-full rounded-[1px] bg-[#C9A227]"
                            style={{ width: `${(m.documentsSubmitted / m.documentsRequired) * 100}%` }}
                          />
                        </div>
                        <span className="font-mono tabular-nums text-[#8FA396]">{m.documentsSubmitted}/{m.documentsRequired}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: riskMeta.color }}>{riskMeta.label}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border uppercase tracking-wider"
                        style={{ color: kycMeta.color, borderColor: kycMeta.color, background: `${kycMeta.color}10` }}
                      >
                        <KycIcon className="w-3 h-3" /> {kycMeta.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Disputes Tab */}
      {tab === 'disputes' && (
        <div className="bg-[#1D2E28] rounded-none border border-[rgba(237,231,214,0.08)] overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[rgba(237,231,214,0.08)] bg-[#131B17]/40">
                {['Dispute ID', 'Merchant', 'Customer', 'Amount', 'Reason', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-mono font-bold text-[#8FA396] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(237,231,214,0.06)]">
              {DISPUTES.map((d) => {
                const meta = DISPUTE_META[d.status];
                return (
                  <tr key={d.id} className="hover:bg-[#131B17]/50 transition-colors">
                    <td className="px-4 py-3.5 font-mono text-[#8FA396] text-[11px]">{d.id}</td>
                    <td className="px-4 py-3.5 font-medium text-[#EDE7D6]">{d.merchantName}</td>
                    <td className="px-4 py-3.5 text-[#EDE7D6]/80">{d.customerName}</td>
                    <td className="px-4 py-3.5 font-mono font-bold tabular-nums text-[#EDE7D6]">{d.amount}</td>
                    <td className="px-4 py-3.5 text-[#8FA396]">{d.reason}</td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border uppercase tracking-wider" style={{ color: meta.color, borderColor: meta.color, background: `${meta.color}10` }}>
                        {meta.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {(d.status === 'OPEN' || d.status === 'UNDER_REVIEW') && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => showToast(`Dispute ${d.id} resolved in favour of merchant`, 'success')}
                            className="px-2 py-0.5 rounded-[4px] border border-[#4E8B6F] text-[#4E8B6F] text-[10px] font-mono font-bold hover:bg-[#4E8B6F]/10 transition-colors"
                          >
                            Merchant Win
                          </button>
                          <button
                            onClick={() => showToast(`Dispute ${d.id} resolved in favour of customer`, 'info')}
                            className="px-2 py-0.5 rounded-[4px] border border-[rgba(237,231,214,0.2)] text-[#EDE7D6] text-[10px] font-mono font-bold hover:bg-[#EDE7D6]/10 transition-colors"
                          >
                            Customer Win
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Risk Rules Tab */}
      {tab === 'risk' && (
        <div className="space-y-3">
          {rules.map((rule) => (
            <div key={rule.id} className="bg-[#1D2E28] rounded-none border border-[rgba(237,231,214,0.08)] p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[#EDE7D6]">{rule.name}</span>
                    <span
                      className="px-1.5 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border uppercase tracking-wider"
                      style={{
                        color: rule.action === 'BLOCK' ? '#B0503F' : rule.action === 'FLAG' ? '#C98A2E' : '#C9A227',
                        borderColor: rule.action === 'BLOCK' ? '#B0503F' : rule.action === 'FLAG' ? '#C98A2E' : '#C9A227',
                        background: rule.action === 'BLOCK' ? '#B0503F10' : rule.action === 'FLAG' ? '#C98A2E10' : '#C9A22710',
                      }}
                    >
                      {rule.action}
                    </span>
                    {rule.triggeredLast24h > 0 && (
                      <span className="px-1.5 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border border-[#B0503F] text-[#B0503F] bg-[#B0503F]/10">
                        {rule.triggeredLast24h}× triggered 24h
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#8FA396]">{rule.description}</div>
                  <div className="flex items-center gap-4 mt-2 text-[11px] font-mono text-[#8FA396]">
                    <span>Threshold: <span className="text-[#EDE7D6] font-semibold">{rule.threshold}</span></span>
                    <span>Window: <span className="text-[#EDE7D6] font-semibold">{rule.window}</span></span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={() => {
                      setRules((prev) => prev.map((r) => r.id === rule.id ? { ...r, active: !r.active } : r));
                      showToast(`Rule "${rule.name}" ${rule.active ? 'disabled' : 'enabled'}`, rule.active ? 'error' : 'success');
                    }}
                    className={`relative w-10 h-5 rounded-[2px] border border-[rgba(237,231,214,0.2)] transition-colors ${rule.active ? 'bg-[#C9A227]' : 'bg-[#131B17]'}`}
                  >
                    <span className={`absolute top-0.5 w-3.5 h-3.5 rounded-[1px] transition-all ${rule.active ? 'left-5 bg-[#131B17]' : 'left-0.5 bg-[#8FA396]'}`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Merchant KYC Detail Panel */}
      {selectedMerchant && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60" onClick={() => setSelectedMerchant(null)} />
          <div className="w-full max-w-md bg-[#1D2E28] border-l border-[rgba(237,231,214,0.12)] flex flex-col h-full overflow-y-auto">
            <div className="sticky top-0 bg-[#1D2E28] border-b border-[rgba(237,231,214,0.08)] px-5 py-4 flex items-center justify-between z-10">
              <div>
                <div className="font-bold text-[#EDE7D6] text-sm">{selectedMerchant.businessName}</div>
                <div className="text-[11px] font-mono text-[#8FA396]">{selectedMerchant.id}</div>
              </div>
              <button onClick={() => setSelectedMerchant(null)} className="p-1.5 rounded-[4px] hover:bg-[#131B17] text-[#8FA396] hover:text-[#EDE7D6]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-5">
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                {(() => {
                  const meta = KYC_META[selectedMerchant.kycStatus];
                  const Icon = meta.icon;
                  return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] font-mono text-xs font-bold border uppercase tracking-wider" style={{ color: meta.color, borderColor: meta.color, background: `${meta.color}10` }}>
                      <Icon className="w-3.5 h-3.5" /> {meta.label}
                    </span>
                  );
                })()}
                <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: RISK_META[selectedMerchant.riskLevel].color }}>
                  {RISK_META[selectedMerchant.riskLevel].label} Risk
                </span>
              </div>

              {/* Details */}
              <div className="border border-[rgba(237,231,214,0.08)] divide-y divide-[rgba(237,231,214,0.06)] bg-[#131B17]/40 p-1">
                {[
                  { label: 'Owner', value: selectedMerchant.ownerName },
                  { label: 'PAN', value: selectedMerchant.pan },
                  { label: 'GSTIN', value: selectedMerchant.gstin ?? 'Not provided' },
                  { label: 'Category', value: selectedMerchant.category },
                  { label: 'City', value: selectedMerchant.city },
                  { label: 'Expected Monthly GMV', value: selectedMerchant.monthlyGmv },
                  { label: 'Applied', value: selectedMerchant.appliedAt },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2 px-3">
                    <span className="text-[11px] font-mono text-[#8FA396]">{row.label}</span>
                    <span className="text-xs font-medium text-[#EDE7D6]">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Document Progress */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono font-bold text-[#8FA396] uppercase tracking-wider">Document Completion</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-[1px] bg-[#131B17]">
                    <div
                      className="h-full rounded-[1px] bg-[#C9A227] transition-all"
                      style={{ width: `${(selectedMerchant.documentsSubmitted / selectedMerchant.documentsRequired) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono tabular-nums text-[#EDE7D6]">{selectedMerchant.documentsSubmitted}/{selectedMerchant.documentsRequired}</span>
                </div>
              </div>

              {/* Notes */}
              {selectedMerchant.notes && (
                <div className="p-3 bg-[#131B17]/60 border border-[rgba(237,231,214,0.12)]">
                  <div className="text-[10px] font-mono font-bold text-[#C98A2E] uppercase tracking-wider mb-1">Ops Note</div>
                  <div className="text-xs text-[#EDE7D6]/80">{selectedMerchant.notes}</div>
                </div>
              )}

              {/* Actions */}
              {(selectedMerchant.kycStatus === 'PENDING' || selectedMerchant.kycStatus === 'RESUBMISSION') && (
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      showToast(`${selectedMerchant.businessName} approved!`, 'success');
                      setSelectedMerchant(null);
                    }}
                    className="flex-1 py-2 bg-[#4E8B6F] hover:bg-[#5da382] text-[#131B17] text-xs font-bold rounded-[4px] transition-all"
                  >
                    Approve KYC
                  </button>
                  <button
                    onClick={() => {
                      showToast(`${selectedMerchant.businessName} rejected`, 'error');
                      setSelectedMerchant(null);
                    }}
                    className="flex-1 py-2 border border-[#B0503F] text-[#B0503F] hover:bg-[#B0503F]/10 text-xs font-bold rounded-[4px] transition-all"
                  >
                    Reject KYC
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
