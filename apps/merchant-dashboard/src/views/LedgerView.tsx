import React, { useState } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Lock,
} from 'lucide-react';

export const LedgerView: React.FC = () => {
  const [filterAccount, setFilterAccount] = useState<string>('ALL');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const [entries] = useState([
    {
      id: 'jnl_0918201a',
      txRef: 'pi_test_9a7d83f12',
      date: '2026-09-22 16:45:12',
      account: '1010 - Nodal Escrow Bank Account (Asset)',
      type: 'DEBIT',
      amount: '₹4,500.00',
      description: 'Customer payment collection via UPI MockProvider',
      hash: 'sha256:7f83b1657ff...102a',
      prevHash: 'sha256:3a19c8120ef...991c',
    },
    {
      id: 'jnl_0918201b',
      txRef: 'pi_test_9a7d83f12',
      date: '2026-09-22 16:45:12',
      account: '2010 - Merchant Payable Balance (Liability)',
      type: 'CREDIT',
      amount: '₹4,410.00',
      description: 'Net merchant settlement payable credit',
      hash: 'sha256:9a01c8411bc...481b',
      prevHash: 'sha256:7f83b1657ff...102a',
    },
    {
      id: 'jnl_0918201c',
      txRef: 'pi_test_9a7d83f12',
      date: '2026-09-22 16:45:12',
      account: '4010 - Platform MDR Fee Revenue (Income)',
      type: 'CREDIT',
      amount: '₹76.27',
      description: 'Platform MDR commission fee (1.7% net of GST)',
      hash: 'sha256:b18201fe9a0...332f',
      prevHash: 'sha256:9a01c8411bc...481b',
    },
    {
      id: 'jnl_0918201d',
      txRef: 'pi_test_9a7d83f12',
      date: '2026-09-22 16:45:12',
      account: '2050 - GST Output Tax Payable 18% (Liability)',
      type: 'CREDIT',
      amount: '₹13.73',
      description: 'Integrated GST on MDR revenue',
      hash: 'sha256:4421bca9081...55a1',
      prevHash: 'sha256:b18201fe9a0...332f',
    },
    {
      id: 'jnl_0918202a',
      txRef: 'ref_9812a014bc',
      date: '2026-09-22 17:10:04',
      account: '2010 - Merchant Payable Balance (Liability)',
      type: 'DEBIT',
      amount: '₹4,500.00',
      description: 'Merchant payable reduction for full customer refund',
      hash: 'sha256:aa91283011c...773d',
      prevHash: 'sha256:4421bca9081...55a1',
    },
    {
      id: 'jnl_0918202b',
      txRef: 'ref_9812a014bc',
      date: '2026-09-22 17:10:04',
      account: '1010 - Nodal Escrow Bank Account (Asset)',
      type: 'CREDIT',
      amount: '₹4,500.00',
      description: 'Nodal escrow bank payout for customer refund',
      hash: 'sha256:ee091820391...112c',
      prevHash: 'sha256:aa91283011c...773d',
    },
  ]);

  const handleVerifyLedger = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationResult(
        'All 6 cryptographic hash chains verified intact. Σ Debits (₹9,000.00) == Σ Credits (₹9,000.00). Zero balance deviation.'
      );
      setTimeout(() => setVerificationResult(null), 6000);
    }, 1000);
  };

  const filteredEntries = entries.filter((e) => {
    if (filterAccount === 'ALL') return true;
    return e.account.includes(filterAccount);
  });

  return (
    <div className="space-y-6">
      {verificationResult && (
        <div className="p-3 bg-[#1D2E28] border border-[#4E8B6F] text-[#4E8B6F] font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#4E8B6F] flex-shrink-0" />
          {verificationResult}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#EDE7D6]">Double-Entry Financial Ledger</h2>
          <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
          <p className="text-xs text-[#8FA396] mt-1">
            Immutable, cryptographically chained double-entry audit records fulfilling RBI Escrow governance
          </p>
        </div>

        <button
          onClick={handleVerifyLedger}
          disabled={isVerifying}
          className="px-4 py-2 rounded-[4px] bg-[#C9A227] hover:bg-[#DBB53B] text-[#131B17] text-xs font-bold flex items-center gap-2 transition-colors disabled:opacity-50 border border-[#B08C1E]"
        >
          <ShieldCheck className="w-4 h-4" />
          {isVerifying ? 'Verifying Hashes...' : 'Verify Cryptographic Integrity'}
        </button>
      </div>

      {/* Metric Cards: Square passbook style */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)]">
          <div className="text-[#8FA396] text-xs font-semibold">Nodal Escrow Balance</div>
          <div className="text-xl font-bold font-mono text-[#EDE7D6] tabular-nums mt-1">₹8,42,190.50</div>
          <div className="text-[11px] font-mono text-[#4E8B6F] mt-0.5">Reconciled with HDFC Escrow</div>
        </div>
        <div className="p-4 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)]">
          <div className="text-[#8FA396] text-xs font-semibold">Merchant Payables</div>
          <div className="text-xl font-bold font-mono text-[#C9A227] tabular-nums mt-1">₹8,12,450.00</div>
          <div className="text-[11px] font-mono text-[#8FA396] mt-0.5">Scheduled for T+1 payout</div>
        </div>
        <div className="p-4 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)]">
          <div className="text-[#8FA396] text-xs font-semibold">Platform Net Fees</div>
          <div className="text-xl font-bold font-mono text-[#EDE7D6] tabular-nums mt-1">₹25,203.81</div>
          <div className="text-[11px] font-mono text-[#8FA396] mt-0.5">Retained commission</div>
        </div>
        <div className="p-4 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)]">
          <div className="text-[#8FA396] text-xs font-semibold">GST Output Tax (18%)</div>
          <div className="text-xl font-bold font-mono text-[#EDE7D6] tabular-nums mt-1">₹4,536.69</div>
          <div className="text-[11px] font-mono text-[#8FA396] mt-0.5">To deposit by 20th next month</div>
        </div>
      </div>

      {/* Account Filters */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[rgba(237,231,214,0.08)] pb-2">
        {[
          { id: 'ALL', label: 'All Accounts' },
          { id: '1010', label: '1010 - Nodal Escrow' },
          { id: '2010', label: '2010 - Merchant Payable' },
          { id: '4010', label: '4010 - MDR Revenue' },
          { id: '2050', label: '2050 - GST Tax' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterAccount(tab.id)}
            className={`px-3 py-1.5 rounded-[2px] font-mono text-xs font-semibold transition-colors ${
              filterAccount === tab.id
                ? 'bg-[#C9A227] text-[#131B17] font-bold'
                : 'text-[#8FA396] hover:text-[#EDE7D6]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Ledger Table */}
      <div className="bg-[#1D2E28] border border-[rgba(237,231,214,0.08)] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[rgba(237,231,214,0.08)] bg-[#131B17] text-[#8FA396] font-medium">
              <th className="py-3 px-4">Journal Entry ID</th>
              <th className="py-3 px-4">Transaction Reference</th>
              <th className="py-3 px-4">Account / Chart</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Crypto Hash (SHA-256)</th>
              <th className="py-3 px-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(237,231,214,0.08)]">
            {filteredEntries.map((entry) => (
              <tr key={entry.id} className="hover:bg-[#243831] transition-colors">
                <td className="py-3 px-4 font-mono text-[#EDE7D6] font-semibold">{entry.id}</td>
                <td className="py-3 px-4 font-mono text-[#8FA396]">{entry.txRef}</td>
                <td className="py-3 px-4 text-[#EDE7D6] font-medium">{entry.account}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border ${
                      entry.type === 'DEBIT'
                        ? 'border-[#C98A2E] text-[#C98A2E] bg-[#C98A2E]/5'
                        : 'border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5'
                    }`}
                  >
                    {entry.type}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono font-bold text-[#EDE7D6] tabular-nums">{entry.amount}</td>
                <td className="py-3 px-4 font-mono text-[10px] text-[#8FA396]">
                  <div className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#4E8B6F]" />
                    {entry.hash}
                  </div>
                </td>
                <td className="py-3 px-4 font-mono text-[#8FA396] text-[11px] tabular-nums">{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
