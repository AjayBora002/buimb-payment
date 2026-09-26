import React, { useState } from 'react';
import {
  RotateCcw,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  ShieldAlert,
  ArrowUpRight,
  Filter,
} from 'lucide-react';

export const RefundsView: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'SUCCEEDED' | 'PROCESSING' | 'FAILED'>('ALL');
  const [activeSubTab, setActiveSubTab] = useState<'refunds' | 'disputes'>('refunds');
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [refunds, setRefunds] = useState([
    {
      id: 'ref_9812a014bc',
      paymentIntentId: 'pi_test_9a7d83f12',
      customer: 'Priya Sharma (priya@example.com)',
      amount: '₹4,500.00',
      reason: 'Customer requested cancellation',
      type: 'INSTANT_UPI',
      status: 'SUCCEEDED',
      arn: 'ARN99281029381',
      idempotencyKey: 'idem_ref_91823901',
      createdAt: '2026-09-22 17:10:04',
    },
    {
      id: 'ref_9812a014bb',
      paymentIntentId: 'pi_test_b18c42a04',
      customer: 'Rohit Verma (rohit@example.com)',
      amount: '₹2,500.00',
      reason: 'Partial return - 1 item damaged',
      type: 'STANDARD_CARD',
      status: 'PROCESSING',
      arn: 'Pending Card Network',
      idempotencyKey: 'idem_ref_91823902',
      createdAt: '2026-09-22 15:30:21',
    },
    {
      id: 'ref_9812a014ba',
      paymentIntentId: 'pi_test_302dd88e1',
      customer: 'Arun Patel (arun@example.com)',
      amount: '₹8,900.00',
      reason: 'Duplicate payment initiated by customer',
      type: 'INSTANT_UPI',
      status: 'SUCCEEDED',
      arn: 'ARN44910283912',
      idempotencyKey: 'idem_ref_91823903',
      createdAt: '2026-09-22 11:20:45',
    },
  ]);

  const [disputes] = useState([
    {
      id: 'dsp_10928301',
      paymentIntentId: 'pi_test_57ab9201f',
      amount: '₹2,100.00',
      reason: '10.4 Fraud - Cardholder does not recognize transaction',
      dueBy: '2026-09-29',
      status: 'ACTION_REQUIRED',
      cardScheme: 'Mastercard',
    },
  ]);

  const [form, setForm] = useState({
    paymentIntentId: 'pi_test_9a7d83f12',
    amount: '1000',
    reason: 'Customer request',
    isInstant: true,
  });

  const handleInitiateRefund = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef = {
      id: `ref_${Math.random().toString(36).substring(2, 12)}`,
      paymentIntentId: form.paymentIntentId,
      customer: 'Merchant Selected Tx',
      amount: `₹${Number(form.amount).toLocaleString('en-IN')}.00`,
      reason: form.reason,
      type: form.isInstant ? 'INSTANT_UPI' : 'STANDARD_BANK',
      status: 'SUCCEEDED',
      arn: `ARN${Math.floor(10000000000 + Math.random() * 90000000000)}`,
      idempotencyKey: `idem_ref_${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
    };

    setRefunds([newRef, ...refunds]);
    setShowModal(false);
    setNotification(`Refund ${newRef.id} processed successfully via ${newRef.type}`);
    setTimeout(() => setNotification(null), 4000);
  };

  const filteredRefunds = refunds.filter((r) => filter === 'ALL' || r.status === filter);

  return (
    <div className="space-y-6">
      {notification && (
        <div className="p-3.5 rounded-none bg-[#4E8B6F]/10 border border-[#4E8B6F]/40 text-[#4E8B6F] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#4E8B6F]" />
          {notification}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#EDE7D6] tracking-tight">Refunds & Chargeback Disputes</h2>
          <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
          <p className="text-xs text-[#8FA396] mt-1.5">
            Process instant UPI refunds, manage banking reversal lifecycles, and submit chargeback evidence
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-[4px] bg-[#C9A227] hover:bg-[#d8b030] text-[#131B17] text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Initiate Refund
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08]">
          <div className="text-[#8FA396] text-xs font-medium">Total Refunded (30D)</div>
          <div className="text-xl font-bold font-mono text-[#EDE7D6] mt-1">₹15,900.00</div>
          <div className="text-[11px] text-[#8FA396] font-mono mt-0.5">3 processed transactions</div>
        </div>
        <div className="p-4 rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08]">
          <div className="text-[#8FA396] text-xs font-medium">Instant Refunds Share</div>
          <div className="text-xl font-bold font-mono text-[#4E8B6F] mt-1">84.3%</div>
          <div className="text-[11px] text-[#4E8B6F] font-mono mt-0.5">Dispatched under 4 seconds</div>
        </div>
        <div className="p-4 rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08]">
          <div className="text-[#8FA396] text-xs font-medium">Chargeback Ratio</div>
          <div className="text-xl font-bold font-mono text-[#EDE7D6] mt-1">0.02%</div>
          <div className="text-[11px] text-[#4E8B6F] font-mono mt-0.5">Within 1.0% regulatory ceiling</div>
        </div>
        <div className="p-4 rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08]">
          <div className="text-[#8FA396] text-xs font-medium">Pending Disputes</div>
          <div className="text-xl font-bold font-mono text-[#C98A2E] mt-1">1 Action Required</div>
          <div className="text-[11px] text-[#8FA396] mt-0.5">7 days left to submit proof</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-[#EDE7D6]/[0.08] pb-2">
        <button
          onClick={() => setActiveSubTab('refunds')}
          className={`text-xs font-semibold pb-1 transition-colors ${
            activeSubTab === 'refunds'
              ? 'text-[#C9A227] border-b-2 border-[#C9A227]'
              : 'text-[#8FA396] hover:text-[#EDE7D6]'
          }`}
        >
          All Refunds ({refunds.length})
        </button>
        <button
          onClick={() => setActiveSubTab('disputes')}
          className={`text-xs font-semibold pb-1 flex items-center gap-1.5 transition-colors ${
            activeSubTab === 'disputes'
              ? 'text-[#C98A2E] border-b-2 border-[#C98A2E]'
              : 'text-[#8FA396] hover:text-[#EDE7D6]'
          }`}
        >
          Disputes & Chargebacks
          <span className="px-1.5 py-0.5 rounded-[2px] border border-[#C98A2E] bg-[#C98A2E]/10 text-[#C98A2E] text-[10px] font-mono font-bold">1</span>
        </button>
      </div>

      {activeSubTab === 'refunds' ? (
        <div className="space-y-4">
          {/* Table */}
          <div className="rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EDE7D6]/[0.08] bg-[#131B17]/60 text-[#8FA396] font-medium">
                  <th className="py-3.5 px-4">Refund ID</th>
                  <th className="py-3.5 px-4">Payment Intent</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Speed / Rail</th>
                  <th className="py-3.5 px-4">Reason</th>
                  <th className="py-3.5 px-4">Bank Ref (ARN)</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE7D6]/[0.08]">
                {filteredRefunds.map((ref) => (
                  <tr key={ref.id} className="hover:bg-[#EDE7D6]/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[#EDE7D6] font-medium">{ref.id}</td>
                    <td className="py-3.5 px-4 font-mono text-[#8FA396]">{ref.paymentIntentId}</td>
                    <td className="py-3.5 px-4 text-[#EDE7D6] font-semibold font-mono">{ref.amount}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#EDE7D6]">
                        {ref.type.includes('INSTANT') ? (
                          <Zap className="w-3 h-3 text-[#C9A227]" />
                        ) : (
                          <Clock className="w-3 h-3 text-[#8FA396]" />
                        )}
                        {ref.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#8FA396] truncate max-w-[180px]">{ref.reason}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#8FA396]">{ref.arn}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold ${
                          ref.status === 'SUCCEEDED'
                            ? 'border border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5'
                            : 'border border-[#C9A227] text-[#C9A227] bg-[#C9A227]/5'
                        }`}
                      >
                        {ref.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#8FA396] font-mono">{ref.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDE7D6]/[0.08] pb-3">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-[#C98A2E]" />
                <div>
                  <h4 className="text-sm font-bold text-[#EDE7D6]">Dispute #dsp_10928301</h4>
                  <div className="text-xs text-[#8FA396] font-mono">Card Scheme: Mastercard · Dispute Claim: ₹2,100.00</div>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border border-[#C98A2E] text-[#C98A2E] bg-[#C98A2E]/5">
                Action Required
              </span>
            </div>
            <div className="text-xs text-[#EDE7D6] space-y-1">
              <p><strong>Reason Code 10.4:</strong> Customer reported unrecognized online charge on Axis MC **8831.</p>
              <p className="text-[#8FA396]">Required evidence: Proof of service delivery, customer communication logs, IP geolocation & 3DS authentication audit trail.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-[4px] bg-[#C9A227] hover:bg-[#d8b030] text-[#131B17] text-xs font-semibold transition-colors">
                Submit Evidence Package
              </button>
              <button className="px-3 py-1.5 rounded-[4px] bg-[#131B17] hover:bg-[#EDE7D6]/[0.05] text-[#EDE7D6] text-xs font-medium border border-[#EDE7D6]/[0.12] transition-colors">
                Accept Liability & Settle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Initiate Refund Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#131B17]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleInitiateRefund}
            className="bg-[#1D2E28] border border-[#EDE7D6]/[0.12] rounded-none w-full max-w-md p-6 space-y-4 shadow-2xl"
          >
            <div>
              <h3 className="text-base font-bold text-[#EDE7D6]">Initiate Idempotent Refund</h3>
              <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8FA396] mb-1 font-medium">Payment Intent ID</label>
                <input
                  type="text"
                  value={form.paymentIntentId}
                  onChange={(e) => setForm({ ...form, paymentIntentId: e.target.value })}
                  className="w-full bg-[#131B17] border border-[#EDE7D6]/[0.12] rounded-[4px] px-3 py-2 text-[#EDE7D6] font-mono focus:outline-none focus:border-[#C9A227]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#8FA396] mb-1 font-medium">Refund Amount (₹)</label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full bg-[#131B17] border border-[#EDE7D6]/[0.12] rounded-[4px] px-3 py-2 text-[#EDE7D6] font-mono focus:outline-none focus:border-[#C9A227]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#8FA396] mb-1 font-medium">Reason for Refund</label>
                <select
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  className="w-full bg-[#131B17] border border-[#EDE7D6]/[0.12] rounded-[4px] px-3 py-2 text-[#EDE7D6] focus:outline-none focus:border-[#C9A227]"
                >
                  <option>Customer requested cancellation</option>
                  <option>Defective / damaged merchandise</option>
                  <option>Duplicate charge</option>
                  <option>Fraudulent or unauthorized transaction</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="instant"
                  checked={form.isInstant}
                  onChange={(e) => setForm({ ...form, isInstant: e.target.checked })}
                  className="rounded-[2px] border-[#EDE7D6]/[0.2] bg-[#131B17] text-[#C9A227] focus:ring-[#C9A227]"
                />
                <label htmlFor="instant" className="text-[#EDE7D6]">
                  Execute Instant UPI Refund (Credit to source VPA immediately)
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#EDE7D6]/[0.08]">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-3 py-1.5 rounded-[4px] bg-[#131B17] text-[#8FA396] text-xs font-medium hover:text-[#EDE7D6] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-[4px] bg-[#C9A227] text-[#131B17] text-xs font-semibold hover:bg-[#d8b030] transition-colors"
              >
                Confirm & Refund
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
