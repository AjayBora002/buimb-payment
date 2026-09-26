import React, { useState } from 'react';
import {
  Plus,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

export const TransactionsView: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'CAPTURED' | 'PROCESSING' | 'FAILED' | 'REFUNDED'>('ALL');
  const [selectedTx, setSelectedTx] = useState<any | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [transactions, setTransactions] = useState([
    {
      id: 'pi_test_9a7d83f12',
      orderId: 'order_8923019',
      amount: '₹4,500.00',
      currency: 'INR',
      customer: 'Priya Sharma (priya@example.com)',
      method: 'UPI · Google Pay (okaxis)',
      status: 'CAPTURED',
      createdAt: '2026-09-22 16:45:12',
      steps: ['CREATED', 'PROCESSING', 'AUTHORISED', 'CAPTURED'],
    },
    {
      id: 'pi_test_b18c42a04',
      orderId: 'order_8923018',
      amount: '₹12,999.00',
      currency: 'INR',
      customer: 'Rohit Verma (rohit@example.com)',
      method: 'Card · HDFC Visa **4242',
      status: 'CAPTURED',
      createdAt: '2026-09-22 16:12:05',
      steps: ['CREATED', 'REQUIRES_ACTION', 'PROCESSING', 'AUTHORISED', 'CAPTURED'],
    },
    {
      id: 'pi_test_f41e0998a',
      orderId: 'order_8923017',
      amount: '₹1,250.00',
      currency: 'INR',
      customer: 'Kavita Das (kavita@example.com)',
      method: 'NetBanking · ICICI Bank',
      status: 'PROCESSING',
      createdAt: '2026-09-22 15:58:30',
      steps: ['CREATED', 'PROCESSING'],
    },
    {
      id: 'pi_test_302dd88e1',
      orderId: 'order_8923016',
      amount: '₹8,900.00',
      currency: 'INR',
      customer: 'Arun Patel (arun@example.com)',
      method: 'UPI · PhonePe (ybl)',
      status: 'CAPTURED',
      createdAt: '2026-09-22 14:30:19',
      steps: ['CREATED', 'PROCESSING', 'AUTHORISED', 'CAPTURED'],
    },
    {
      id: 'pi_test_57ab9201f',
      orderId: 'order_8923015',
      amount: '₹2,100.00',
      currency: 'INR',
      customer: 'Vikram Mehta (vikram@example.com)',
      method: 'Card · Axis MC **8831',
      status: 'FAILED',
      createdAt: '2026-09-22 13:10:44',
      steps: ['CREATED', 'PROCESSING', 'FAILED'],
    },
  ]);

  const handleSimulatePayment = () => {
    setIsSimulating(true);
    setNotification('Simulating payment lifecycle with MockProvider...');

    setTimeout(() => {
      const newId = `pi_test_${Math.random().toString(36).substring(2, 11)}`;
      const newTx = {
        id: newId,
        orderId: `order_${Math.floor(1000000 + Math.random() * 9000000)}`,
        amount: '₹3,200.00',
        currency: 'INR',
        customer: 'Ananya Roy (ananya@example.com)',
        method: 'UPI · PayTM',
        status: 'CAPTURED',
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
        steps: ['CREATED', 'PROCESSING', 'AUTHORISED', 'CAPTURED'],
      };

      setTransactions([newTx, ...transactions]);
      setIsSimulating(false);
      setNotification(`Simulated payment ${newId} confirmed & captured successfully!`);
      setTimeout(() => setNotification(null), 4000);
    }, 1200);
  };

  const filtered = transactions.filter((t) => filter === 'ALL' || t.status === filter);

  return (
    <div className="space-y-6">
      {notification && (
        <div className="p-3 bg-[#1D2E28] border border-[#4E8B6F] text-[#4E8B6F] font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#4E8B6F]" />
          {notification}
        </div>
      )}

      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#EDE7D6]">Payment Intents</h2>
          <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
          <p className="text-xs text-[#8FA396] mt-1">Manage, inspect, and simulate payment lifecycle transitions</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulatePayment}
            disabled={isSimulating}
            className="px-4 py-2 rounded-[4px] bg-[#C9A227] hover:bg-[#DBB53B] text-[#131B17] text-xs font-bold flex items-center gap-2 transition-colors disabled:opacity-50 border border-[#B08C1E]"
          >
            {isSimulating ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            Simulate Mock Payment
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[rgba(237,231,214,0.08)] pb-2">
        {(['ALL', 'CAPTURED', 'PROCESSING', 'FAILED', 'REFUNDED'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-semibold transition-colors ${
              filter === tab
                ? 'bg-[#C9A227] text-[#131B17] font-bold'
                : 'text-[#8FA396] hover:text-[#EDE7D6]'
            }`}
          >
            {tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-[#1D2E28] border border-[rgba(237,231,214,0.08)] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[rgba(237,231,214,0.08)] bg-[#131B17] text-[#8FA396] font-medium">
              <th className="py-3 px-4">Payment Intent ID</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Method</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date & Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(237,231,214,0.08)]">
            {filtered.map((tx) => (
              <tr
                key={tx.id}
                onClick={() => setSelectedTx(tx)}
                className="hover:bg-[#243831] cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-mono text-[#EDE7D6] font-semibold">{tx.id}</td>
                <td className="py-3 px-4 font-mono text-[#8FA396]">{tx.orderId}</td>
                <td className="py-3 px-4 text-[#EDE7D6] font-medium">{tx.customer}</td>
                <td className="py-3 px-4 text-[#8FA396]">{tx.method}</td>
                <td className="py-3 px-4 text-[#EDE7D6] font-bold font-mono tabular-nums">{tx.amount}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold tracking-wider border ${
                      tx.status === 'CAPTURED'
                        ? 'border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5'
                        : tx.status === 'PROCESSING'
                        ? 'border-[#C98A2E] text-[#C98A2E] bg-[#C98A2E]/5'
                        : 'border-[#B0503F] text-[#B0503F] bg-[#B0503F]/5'
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-[#8FA396] font-mono text-[11px] tabular-nums">{tx.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Detail Drawer / Modal */}
      {selectedTx && (
        <div className="fixed inset-0 bg-[#131B17]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1D2E28] border border-[rgba(237,231,214,0.15)] rounded-[4px] w-full max-w-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[rgba(237,231,214,0.08)] pb-4">
              <div>
                <span className="text-xs text-[#8FA396] font-mono">Payment Intent</span>
                <h3 className="text-base font-bold text-[#EDE7D6] font-mono">{selectedTx.id}</h3>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="text-[#8FA396] hover:text-[#EDE7D6] text-sm font-semibold"
              >
                Close
              </button>
            </div>

            {/* State Machine Transition Steps */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#EDE7D6] uppercase">
                State Machine Lifecycle
              </span>
              <div className="flex items-center gap-2 overflow-x-auto py-2">
                {['CREATED', 'PROCESSING', 'AUTHORISED', 'CAPTURED'].map((step, i) => {
                  const isCompleted = selectedTx.steps.includes(step);
                  return (
                    <React.Fragment key={step}>
                      <div
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] font-mono text-[11px] font-bold border ${
                          isCompleted
                            ? 'border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/10'
                            : 'border-[rgba(237,231,214,0.1)] text-[#8FA396] bg-[#131B17]'
                        }`}
                      >
                        {isCompleted && <CheckCircle2 className="w-3 h-3 text-[#4E8B6F]" />}
                        {step}
                      </div>
                      {i < 3 && <span className="text-[#8FA396] text-xs font-mono">/</span>}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Attributes Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-[#131B17] p-4 rounded-[4px] border border-[rgba(237,231,214,0.08)]">
              <div>
                <span className="text-[#8FA396]">Gross Amount</span>
                <div className="text-[#EDE7D6] font-bold font-mono text-sm">{selectedTx.amount}</div>
              </div>
              <div>
                <span className="text-[#8FA396]">Payment Method</span>
                <div className="text-[#EDE7D6] font-medium">{selectedTx.method}</div>
              </div>
              <div>
                <span className="text-[#8FA396]">Order ID</span>
                <div className="text-[#EDE7D6] font-mono">{selectedTx.orderId}</div>
              </div>
              <div>
                <span className="text-[#8FA396]">Customer</span>
                <div className="text-[#EDE7D6]">{selectedTx.customer}</div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 rounded-[4px] bg-[#131B17] hover:bg-[#243831] text-[#EDE7D6] text-xs font-semibold border border-[rgba(237,231,214,0.08)]"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
