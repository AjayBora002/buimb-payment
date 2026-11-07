import React, { useState } from 'react';
import {
  Link2,
  Plus,
  ArrowRight,
  Copy,
  CheckCircle2,
  Clock,
  Smartphone,
  Building2,
  Zap,
  TrendingUp,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { useToast } from '../components/Toast.js';

interface PayoutLinkItem {
  id: string;
  amount: string;
  purpose: string;
  recipientName: string;
  recipientPhone: string;
  shortUrl: string;
  status: 'ISSUED' | 'CLAIMED' | 'EXPIRED';
  claimedMethod?: string;
  claimedDestination?: string;
  utr?: string;
  createdAt: string;
}

export const PayoutLinksView: React.FC = () => {
  const { showToast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [selectedLinkToClaim, setSelectedLinkToClaim] = useState<PayoutLinkItem | null>(null);

  // Claim Form State
  const [claimMethod, setClaimMethod] = useState<'UPI' | 'BANK'>('UPI');
  const [claimVpa, setClaimVpa] = useState('vendor@okhdfcbank');
  const [claimAccount, setClaimAccount] = useState('5010029310892');
  const [claimIfsc, setClaimIfsc] = useState('HDFC0001082');

  // Create Form State
  const [amountRupees, setAmountRupees] = useState('3,500.00');
  const [purpose, setPurpose] = useState('Vendor Payment');
  const [recipientName, setRecipientName] = useState('Rahul Verma');
  const [recipientPhone, setRecipientPhone] = useState('+91 98765 12345');

  const [payoutLinks, setPayoutLinks] = useState<PayoutLinkItem[]>([
    {
      id: 'plink_7810a1',
      amount: '₹3,500.00',
      purpose: 'Freelance Design Settlement',
      recipientName: 'Rahul Verma',
      recipientPhone: '+91 98765 12345',
      shortUrl: 'plink_7810a1',
      status: 'ISSUED',
      createdAt: '12 mins ago',
    },
    {
      id: 'plink_7810a2',
      amount: '₹12,800.00',
      purpose: 'Warehouse Security Deposit Refund',
      recipientName: 'Deepak Patel',
      recipientPhone: '+91 98200 88123',
      shortUrl: 'plink_7810a2',
      status: 'CLAIMED',
      claimedMethod: 'UPI',
      claimedDestination: 'deepak@okaxis',
      utr: '431298102931',
      createdAt: '2 hours ago',
    },
    {
      id: 'plink_7810a3',
      amount: '₹6,400.00',
      purpose: 'Affiliate Commission Payout',
      recipientName: 'Aarti Joshi',
      recipientPhone: '+91 98450 44102',
      shortUrl: 'plink_7810a3',
      status: 'CLAIMED',
      claimedMethod: 'BANK',
      claimedDestination: 'A/c •••• 4421 (HDFC0001082)',
      utr: '431298109924',
      createdAt: '5 hours ago',
    },
  ]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const shortId = `plink_${Math.random().toString(36).substring(2, 8)}`;
    const created: PayoutLinkItem = {
      id: shortId,
      amount: `₹${amountRupees}`,
      purpose,
      recipientName,
      recipientPhone,
      shortUrl: shortId,
      status: 'ISSUED',
      createdAt: 'Just now',
    };
    setPayoutLinks([created, ...payoutLinks]);
    setIsCreateModalOpen(false);
    showToast(`Payout link for ₹${amountRupees} created! Short URL: http://localhost:3000/payouts/${shortId}`, 'success');
  };

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLinkToClaim) return;

    const utr = `4312${Math.floor(10000000 + Math.random() * 90000000)}`;
    setPayoutLinks((prev) =>
      prev.map((l) =>
        l.id === selectedLinkToClaim.id
          ? {
              ...l,
              status: 'CLAIMED',
              claimedMethod: claimMethod,
              claimedDestination: claimMethod === 'UPI' ? claimVpa : `A/c •••• ${claimAccount.slice(-4)} (${claimIfsc})`,
              utr,
            }
          : l,
      ),
    );
    setIsClaimModalOpen(false);
    showToast(`Instant payout of ${selectedLinkToClaim.amount} dispatched! Bank UTR: ${utr}`, 'success');
  };

  const copyLink = (shortUrl: string) => {
    const full = `http://localhost:3000/payouts/${shortUrl}`;
    navigator.clipboard?.writeText(full);
    showToast(`Payout link copied: ${full}`, 'success');
  };

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-[#0b63e5] border border-blue-200">
              <Link2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">RazorpayX Payout Links</h2>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 uppercase">
              Zero-Details Instant Disbursement
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-xl">
            Send money to vendors, contractors, or customers without asking for their bank account details beforehand. Recipients claim instantly into any UPI ID or bank account 24x7.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0b63e5] hover:bg-[#0957cb] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Payout Link</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Total Payouts Dispatched</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">₹22,700.00</div>
          <div className="text-[11px] text-slate-500">3 Links Issued</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Claim Rate</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">94.8%</div>
          <div className="text-[11px] text-emerald-600 font-bold">Avg Claim Time: 4.2 mins</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Settlement Channels</span>
            <Zap className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">IMPS & UPI 24x7</div>
          <div className="text-[11px] text-slate-500">Zero Banking Holidays</div>
        </div>
      </div>

      {/* Payout Links Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Issued Payout Links</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Link ID</th>
                <th className="py-3 px-6">Recipient & Purpose</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Claim Details</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {payoutLinks.map((link) => (
                <tr key={link.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-blue-600">
                    <div className="flex items-center gap-1.5">
                      <span>{link.id}</span>
                      <button
                        onClick={() => copyLink(link.shortUrl)}
                        className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
                        title="Copy Short URL"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{link.recipientName}</div>
                    <div className="text-[11px] text-slate-400">{link.purpose} • {link.recipientPhone}</div>
                  </td>
                  <td className="py-4 px-6 font-black text-slate-900 tabular-nums">
                    {link.amount}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        link.status === 'CLAIMED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {link.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[11px]">
                    {link.status === 'CLAIMED' ? (
                      <div>
                        <div className="font-bold text-slate-800">{link.claimedDestination}</div>
                        <div className="font-mono text-slate-400 text-[10px]">UTR: {link.utr}</div>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Pending Recipient Entry</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {link.status === 'ISSUED' && (
                      <button
                        onClick={() => {
                          setSelectedLinkToClaim(link);
                          setIsClaimModalOpen(true);
                        }}
                        className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] transition-all cursor-pointer"
                      >
                        ⚡ Claim (Preview)
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Payout Link */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Create Payout Link</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Payout Amount (INR)</label>
                <input
                  type="text"
                  value={amountRupees}
                  onChange={(e) => setAmountRupees(e.target.value)}
                  placeholder="3,500.00"
                  required
                  className="w-full h-10 px-3.5 rounded-lg border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Purpose / Description</label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Vendor Invoice Settlement #108"
                  required
                  className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Recipient Name</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Rahul Verma"
                    required
                    className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Mobile Phone</label>
                  <input
                    type="text"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="+91 98765 12345"
                    required
                    className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0b63e5] hover:bg-[#0957cb] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer mt-2"
              >
                Generate Payout Link &rarr;
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Claim Link Simulator */}
      {isClaimModalOpen && selectedLinkToClaim && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recipient Claim Page</span>
                <h3 className="text-base font-black text-slate-900">Claim {selectedLinkToClaim.amount}</h3>
              </div>
              <button onClick={() => setIsClaimModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                ✕
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setClaimMethod('UPI')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  claimMethod === 'UPI' ? 'bg-[#0b63e5] text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Claim via UPI ID
              </button>
              <button
                type="button"
                onClick={() => setClaimMethod('BANK')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  claimMethod === 'BANK' ? 'bg-[#0b63e5] text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Claim via Bank A/c
              </button>
            </div>

            <form onSubmit={handleClaim} className="space-y-3.5 text-xs">
              {claimMethod === 'UPI' ? (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Enter UPI VPA</label>
                  <input
                    type="text"
                    value={claimVpa}
                    onChange={(e) => setClaimVpa(e.target.value)}
                    placeholder="e.g. rahul@okhdfcbank"
                    required
                    className="w-full h-10 px-3.5 rounded-lg border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Bank Account Number</label>
                    <input
                      type="text"
                      value={claimAccount}
                      onChange={(e) => setClaimAccount(e.target.value)}
                      placeholder="5010029310892"
                      required
                      className="w-full h-10 px-3.5 rounded-lg border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">IFSC Code</label>
                    <input
                      type="text"
                      value={claimIfsc}
                      onChange={(e) => setClaimIfsc(e.target.value)}
                      placeholder="HDFC0001082"
                      required
                      className="w-full h-10 px-3.5 rounded-lg border border-slate-300 font-mono uppercase text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer mt-2"
              >
                Disburse {selectedLinkToClaim.amount} Instantly &rarr;
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

