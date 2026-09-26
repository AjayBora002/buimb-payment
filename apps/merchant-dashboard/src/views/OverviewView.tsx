import React, { useState } from 'react';
import {
  Plus,
  Landmark,
  Search,
  Download,
  Copy,
  Smartphone,
  CreditCard,
  Building2,
  X,
} from 'lucide-react';
import { EnvironmentBanner } from '../components/EnvironmentBanner.js';
import { VolumeChart } from '../components/VolumeChart.js';
import { SuccessRateChart } from '../components/SuccessRateChart.js';
import { PaymentMethodMix } from '../components/PaymentMethodMix.js';
import { SettlementOverviewCard } from '../components/SettlementOverviewCard.js';
import { CommonActions } from '../components/CommonActions.js';
import { TransactionDrawer, TransactionRecord } from '../components/TransactionDrawer.js';
import { useToast } from '../components/Toast.js';

interface OverviewViewProps {
  onNavigate: (tab: string) => void;
  merchantName?: string;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigate,
  merchantName = 'Demo Merchant',
}) => {
  const { showToast } = useToast();
  const [selectedTx, setSelectedTx] = useState<TransactionRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'CAPTURED' | 'PROCESSING' | 'FAILED' | 'REFUNDED' | 'DISPUTED'>('ALL');
  const [showCreateLinkModal, setShowCreateLinkModal] = useState(false);
  const [linkAmount, setLinkAmount] = useState('2500');
  const [linkDesc, setLinkDesc] = useState('Consulting Services Invoice #402');

  // Realistic seeded sandbox data
  const [transactions] = useState<TransactionRecord[]>([
    {
      id: 'pi_test_9a7d83f12',
      orderId: 'order_8923019',
      customerName: 'Priya Sharma',
      customerEmail: 'p***a@example.com',
      amount: '₹4,500.00',
      amountRaw: 4500,
      currency: 'INR',
      method: 'UPI',
      methodType: 'UPI',
      methodDetail: 'Google Pay · okaxis',
      status: 'CAPTURED',
      createdAt: '12 mins ago',
      arn: 'ARN99281029381',
      steps: ['CREATED', 'PROCESSING', 'AUTHORISED', 'CAPTURED'],
    },
    {
      id: 'pi_test_b18c42a04',
      orderId: 'order_8923018',
      customerName: 'Rohit Verma',
      customerEmail: 'r***t@example.com',
      amount: '₹12,999.00',
      amountRaw: 12999,
      currency: 'INR',
      method: 'Card',
      methodType: 'CARD',
      methodDetail: 'HDFC Visa · **4242',
      status: 'CAPTURED',
      createdAt: '34 mins ago',
      arn: 'ARN88120391024',
      steps: ['CREATED', 'PROCESSING', 'AUTHORISED', 'CAPTURED'],
    },
    {
      id: 'pi_test_f41e0998a',
      orderId: 'order_8923017',
      customerName: 'Kavita Das',
      customerEmail: 'k***a@example.com',
      amount: '₹1,250.00',
      amountRaw: 1250,
      currency: 'INR',
      method: 'Net Banking',
      methodType: 'NETBANKING',
      methodDetail: 'ICICI Bank Retail',
      status: 'PROCESSING',
      createdAt: '1 hour ago',
      steps: ['CREATED', 'PROCESSING'],
    },
    {
      id: 'pi_test_302dd88e1',
      orderId: 'order_8923016',
      customerName: 'Arun Patel',
      customerEmail: 'a***n@example.com',
      amount: '₹8,900.00',
      amountRaw: 8900,
      currency: 'INR',
      method: 'UPI',
      methodType: 'UPI',
      methodDetail: 'PhonePe · ybl',
      status: 'CAPTURED',
      createdAt: '2 hours ago',
      arn: 'ARN44910283912',
      steps: ['CREATED', 'PROCESSING', 'AUTHORISED', 'CAPTURED'],
    },
    {
      id: 'pi_test_57ab9201f',
      orderId: 'order_8923015',
      customerName: 'Vikram Mehta',
      customerEmail: 'v***m@example.com',
      amount: '₹2,100.00',
      amountRaw: 2100,
      currency: 'INR',
      method: 'Card',
      methodType: 'CARD',
      methodDetail: 'Axis Mastercard · **8831',
      status: 'FAILED',
      createdAt: '3 hours ago',
      steps: ['CREATED', 'PROCESSING', 'FAILED'],
    },
    {
      id: 'pi_test_41ab029ef',
      orderId: 'order_8923014',
      customerName: 'Sanjay Gupta',
      customerEmail: 's***y@example.com',
      amount: '₹3,500.00',
      amountRaw: 3500,
      currency: 'INR',
      method: 'UPI',
      methodType: 'UPI',
      methodDetail: 'Paytm UPI · paytm',
      status: 'REFUNDED',
      createdAt: '5 hours ago',
      arn: 'ARN11928301928',
      steps: ['CREATED', 'PROCESSING', 'AUTHORISED', 'CAPTURED'],
    },
  ]);

  const copyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    showToast(`Copied ${id} to clipboard`, 'success');
  };

  const handleExport = () => {
    showToast('Exporting transaction records as CSV...', 'info');
    setTimeout(() => {
      showToast('CSV export ready for download', 'success');
    }, 1200);
  };

  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCreateLinkModal(false);
    showToast(`Payment link generated for ₹${Number(linkAmount).toLocaleString('en-IN')}`, 'success');
  };

  const handleCommonAction = (actionKey: string) => {
    switch (actionKey) {
      case 'create-link':
        setShowCreateLinkModal(true);
        break;
      case 'test-integration':
        onNavigate('transactions');
        showToast('Navigated to sandbox payment simulator', 'info');
        break;
      case 'view-keys':
        onNavigate('developers');
        break;
      case 'check-reconciliation':
        onNavigate('ledger');
        break;
      default:
        break;
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-[1440px] mx-auto select-none">
      {/* 1. Operational Toolbar (Titles sit on Header shelf) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[rgba(237,231,214,0.08)]">
        <div>
          <h2 className="text-sm font-bold text-[#EDE7D6]">
            Passbook Summary — {merchantName}
          </h2>
          <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('transactions')}
            className="px-3.5 py-1.5 rounded-[4px] bg-[#1D2E28] hover:bg-[#243831] text-[#EDE7D6] text-xs font-semibold border border-[rgba(237,231,214,0.08)] transition-colors"
          >
            View transactions
          </button>
          <button
            onClick={() => setShowCreateLinkModal(true)}
            className="px-4 py-1.5 rounded-[4px] bg-[#C9A227] hover:bg-[#DBB53B] text-[#131B17] text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#B08C1E]"
          >
            <Plus className="w-3.5 h-3.5" />
            Create payment link
          </button>
        </div>
      </div>

      {/* 2. Top Status Area: Two-Level Status System */}
      <EnvironmentBanner />

      {/* 3. Wide Ruled Ledger Summary Panel (Passbook Style) */}
      <div className="bg-[#1D2E28] border border-[rgba(237,231,214,0.08)]">
        {/* Panel Header */}
        <div className="px-6 py-4 border-b border-[rgba(237,231,214,0.08)] flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-[#EDE7D6] uppercase tracking-wider">
              Ledger Account Summary
            </h3>
            <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
          </div>
          <span className="text-[11px] font-mono text-[#8FA396]">PASSBOOK: LGR-99204-IN</span>
        </div>

        {/* Tabular Rows */}
        <div className="divide-y divide-[rgba(237,231,214,0.08)] text-xs">
          {/* Hero Stat: Gross Payment Volume */}
          <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#243831]/40 transition-colors">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#C9A227]" />
              <span className="text-[#EDE7D6] font-semibold text-sm">Gross payment volume</span>
              <span className="text-[10px] font-mono text-[#8FA396]">(Sandbox Simulated)</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#4E8B6F] font-mono font-bold">+18.2% vs 30d</span>
              <span className="text-2xl font-bold font-mono tabular-nums text-[#C9A227]">
                ₹14,82,500.00
              </span>
            </div>
          </div>

          {/* Row 2: Successful Payments */}
          <div className="px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#243831]/40 transition-colors">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[rgba(237,231,214,0.25)]" />
              <span className="text-[#8FA396]">Successful payments count</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[11px] text-[#4E8B6F] font-mono">+12.4% vs 30d</span>
              <span className="text-base font-bold font-mono tabular-nums text-[#EDE7D6]">
                1,248
              </span>
            </div>
          </div>

          {/* Row 3: Payment Success Rate */}
          <div className="px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#243831]/40 transition-colors">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#4E8B6F]" />
              <span className="text-[#8FA396]">Payment success rate</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[11px] text-[#4E8B6F] font-mono">Routing Target Met</span>
              <span className="text-base font-bold font-mono tabular-nums text-[#4E8B6F]">
                99.10%
              </span>
            </div>
          </div>

          {/* Row 4: Active Payment Links */}
          <div className="px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#243831]/40 transition-colors">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[rgba(237,231,214,0.25)]" />
              <span className="text-[#8FA396]">Active payment links</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[11px] text-[#C98A2E] font-mono">3 expiring in 7d</span>
              <span className="text-base font-bold font-mono tabular-nums text-[#EDE7D6]">
                16
              </span>
            </div>
          </div>

          {/* Row 5: Upcoming Settlement */}
          <div className="px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#243831]/40 transition-colors">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#C9A227]" />
              <span className="text-[#8FA396]">Upcoming nodal settlement (T+1 Escrow batch)</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[11px] text-[#4E8B6F] font-mono">Batch Ready</span>
              <span className="text-base font-bold font-mono tabular-nums text-[#EDE7D6]">
                ₹3,41,200.00
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Two-Column Analytics Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <VolumeChart />
        <SuccessRateChart />
      </div>

      {/* 5. Payment Method Mix & Settlement Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PaymentMethodMix />
        <SettlementOverviewCard onNavigate={onNavigate} />
      </div>

      {/* 6. Common Actions Panel */}
      <CommonActions onAction={handleCommonAction} />

      {/* 7. Recent Transactions Table */}
      <div className="p-6 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)] space-y-4">
        {/* Table Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-[#EDE7D6]">Recent Activity</h3>
            <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
            <p className="text-xs text-[#8FA396] mt-1">Latest payment activity from your sandbox</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search filter */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8FA396] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search payment ID, order..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 h-8 bg-[#131B17] border border-[rgba(237,231,214,0.08)] rounded-[4px] pl-8 pr-3 text-xs text-[#EDE7D6] placeholder:text-[#8FA396] focus:outline-none focus:border-[#C9A227]"
              />
            </div>

            {/* Status Filter Chips */}
            <div className="flex items-center p-0.5 bg-[#131B17] rounded-[4px] border border-[rgba(237,231,214,0.08)] text-xs">
              {(['ALL', 'CAPTURED', 'PROCESSING', 'FAILED', 'REFUNDED'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-1 rounded-[2px] text-[11px] font-medium transition-colors ${
                    statusFilter === st
                      ? 'bg-[#C9A227] text-[#131B17] font-bold'
                      : 'text-[#8FA396] hover:text-[#EDE7D6]'
                  }`}
                >
                  {st.charAt(0) + st.slice(1).toLowerCase()}
                </button>
              ))}
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="h-8 px-3 rounded-[4px] bg-[#131B17] hover:bg-[#243831] text-[#EDE7D6] text-xs font-medium border border-[rgba(237,231,214,0.08)] flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#8FA396]" />
              Export
            </button>

            {/* View All Link */}
            <button
              onClick={() => onNavigate('transactions')}
              className="text-xs font-bold text-[#C9A227] hover:underline transition-colors ml-1"
            >
              View all
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="border border-[rgba(237,231,214,0.08)] overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[rgba(237,231,214,0.08)] bg-[#131B17] text-[#8FA396] font-medium">
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(237,231,214,0.08)] bg-[#1D2E28]">
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  onClick={() => setSelectedTx(tx)}
                  className="hover:bg-[#243831] cursor-pointer transition-colors group"
                >
                  {/* Payment ID Cell */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 font-mono text-[#EDE7D6] font-semibold group-hover:text-[#C9A227]">
                      <span>{tx.id}</span>
                      <button
                        onClick={(e) => copyId(tx.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-0.5 text-[#8FA396] hover:text-[#EDE7D6] transition-opacity"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-[10px] text-[#8FA396] font-mono block">{tx.orderId}</span>
                  </td>

                  {/* Customer Cell */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-[#EDE7D6]">{tx.customerName}</div>
                    <div className="text-[10px] text-[#8FA396]">{tx.customerEmail}</div>
                  </td>

                  {/* Method Cell */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {tx.methodType === 'UPI' && <Smartphone className="w-3.5 h-3.5 text-[#C9A227]" />}
                      {tx.methodType === 'CARD' && <CreditCard className="w-3.5 h-3.5 text-[#4E8B6F]" />}
                      {tx.methodType === 'NETBANKING' && <Building2 className="w-3.5 h-3.5 text-[#C98A2E]" />}
                      <span className="font-medium text-[#EDE7D6]">{tx.method}</span>
                    </div>
                    <span className="text-[10px] text-[#8FA396] block">{tx.methodDetail}</span>
                  </td>

                  {/* Amount Cell */}
                  <td className="py-3 px-4 text-right">
                    <span className="font-bold font-mono text-[#EDE7D6] tabular-nums">{tx.amount}</span>
                    <span className="text-[10px] text-[#8FA396] block">INR</span>
                  </td>

                  {/* Status Cell: Stamp mark */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] text-[10px] font-mono font-bold tracking-wider border ${
                        tx.status === 'CAPTURED'
                          ? 'border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5'
                          : tx.status === 'PROCESSING'
                          ? 'border-[#C98A2E] text-[#C98A2E] bg-[#C98A2E]/5'
                          : tx.status === 'FAILED'
                          ? 'border-[#B0503F] text-[#B0503F] bg-[#B0503F]/5'
                          : 'border-[#8FA396] text-[#8FA396] bg-transparent'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>

                  {/* Created Cell */}
                  <td className="py-3 px-4 text-[#8FA396] text-[11px] font-mono tabular-nums">
                    {tx.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Transaction Detail Drawer */}
      <TransactionDrawer
        transaction={selectedTx}
        onClose={() => setSelectedTx(null)}
        onInitiateRefund={(tx) => {
          setSelectedTx(null);
          onNavigate('refunds');
          showToast(`Initiating refund flow for ${tx.id}`, 'info');
        }}
      />

      {/* Modal: Create Payment Link */}
      {showCreateLinkModal && (
        <div className="fixed inset-0 bg-[#131B17]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateLink}
            className="bg-[#1D2E28] border border-[rgba(237,231,214,0.12)] rounded-[4px] w-full max-w-md p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[rgba(237,231,214,0.08)] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#EDE7D6]">Create Payment Link</h3>
                <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
              </div>
              <button
                type="button"
                onClick={() => setShowCreateLinkModal(false)}
                className="text-[#8FA396] hover:text-[#EDE7D6]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8FA396] mb-1">Amount (₹ INR)</label>
                <input
                  type="number"
                  value={linkAmount}
                  onChange={(e) => setLinkAmount(e.target.value)}
                  className="w-full bg-[#131B17] border border-[rgba(237,231,214,0.08)] rounded-[4px] px-3 py-2 text-[#EDE7D6] font-mono font-bold text-sm focus:outline-none focus:border-[#C9A227]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#8FA396] mb-1">Description / Invoice Reference</label>
                <input
                  type="text"
                  value={linkDesc}
                  onChange={(e) => setLinkDesc(e.target.value)}
                  className="w-full bg-[#131B17] border border-[rgba(237,231,214,0.08)] rounded-[4px] px-3 py-2 text-[#EDE7D6] focus:outline-none focus:border-[#C9A227]"
                  required
                />
              </div>

              <div className="p-3 bg-[#131B17] rounded-[4px] border border-[rgba(237,231,214,0.06)] text-[11px] text-[#8FA396]">
                <span>Customers can pay using UPI apps, RuPay, Visa, Mastercard, or NetBanking.</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[rgba(237,231,214,0.08)]">
              <button
                type="button"
                onClick={() => setShowCreateLinkModal(false)}
                className="px-4 py-2 rounded-[4px] bg-[#131B17] text-[#8FA396] hover:text-[#EDE7D6] text-xs font-semibold border border-[rgba(237,231,214,0.08)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-[4px] bg-[#C9A227] hover:bg-[#DBB53B] text-[#131B17] text-xs font-bold border border-[#B08C1E]"
              >
                Generate Link
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
