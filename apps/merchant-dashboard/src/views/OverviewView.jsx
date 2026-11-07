import React, { useState } from 'react';
import { Search, Smartphone, TrendingUp, CheckCircle2, Zap, } from 'lucide-react';
import { VolumeChart } from '../components/VolumeChart.jsx';
import { SuccessRateChart } from '../components/SuccessRateChart.jsx';
import { PaymentMethodMix } from '../components/PaymentMethodMix.jsx';
import { SettlementOverviewCard } from '../components/SettlementOverviewCard.jsx';
import { CommonActions } from '../components/CommonActions.jsx';
import { TransactionDrawer } from '../components/TransactionDrawer.jsx';
import { useToast } from '../components/Toast.jsx';
export const OverviewView = ({ onNavigate, merchantName = 'Ajay', }) => {
    const { showToast } = useToast();
    const [selectedTx, setSelectedTx] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [showCreateLinkModal, setShowCreateLinkModal] = useState(false);
    const [linkAmount, setLinkAmount] = useState('2500');
    const [linkDesc, setLinkDesc] = useState('Consulting Services Invoice #402');
    const [timeRange, setTimeRange] = useState('30d');
    // Realistic seeded sandbox data
    const [transactions, setTransactions] = useState([
        {
            id: 'pay_Nx8Y29kLp102',
            orderId: 'order_Nx8Y29kLp102',
            customerName: 'Priya Sharma',
            customerEmail: 'priya.sharma@gmail.com',
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
            id: 'pay_Nx8V11mRp401',
            orderId: 'order_Nx8V11mRp401',
            customerName: 'Rohit Verma',
            customerEmail: 'rohit.verma@outlook.com',
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
            id: 'pay_Nx7T99qWz302',
            orderId: 'order_Nx7T99qWz302',
            customerName: 'Kavita Das',
            customerEmail: 'kavita.das@yahoo.co.in',
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
            id: 'pay_Nx7R88bTt991',
            orderId: 'order_Nx7R88bTt991',
            customerName: 'Arun Patel',
            customerEmail: 'arun.patel@techcorp.in',
            amount: '₹8,900.00',
            amountRaw: 8900,
            currency: 'INR',
            method: 'UPI',
            methodType: 'UPI',
            methodDetail: 'PhonePe · ybl',
            status: 'CAPTURED',
            createdAt: '2 hours ago',
            arn: 'ARN77192039182',
            steps: ['CREATED', 'PROCESSING', 'AUTHORISED', 'CAPTURED'],
        },
        {
            id: 'pay_Nx6P44jKk812',
            orderId: 'order_Nx6P44jKk812',
            customerName: 'Vikram Mehta',
            customerEmail: 'vikram.m@gmail.com',
            amount: '₹2,100.00',
            amountRaw: 2100,
            currency: 'INR',
            method: 'Card',
            methodType: 'CARD',
            methodDetail: 'Axis MC · **8831',
            status: 'FAILED',
            createdAt: '3 hours ago',
            steps: ['CREATED', 'PROCESSING', 'FAILED'],
        },
        {
            id: 'pay_Nx5M33nBb701',
            orderId: 'order_Nx5M33nBb701',
            customerName: 'Sanjay Reddy',
            customerEmail: 'sanjay.reddy@startup.in',
            amount: '₹3,200.00',
            amountRaw: 3200,
            currency: 'INR',
            method: 'UPI',
            methodType: 'UPI',
            methodDetail: 'Paytm UPI · paytm',
            status: 'REFUNDED',
            createdAt: '5 hours ago',
            arn: 'ARN66190284910',
            steps: ['CREATED', 'CAPTURED', 'REFUNDED'],
        },
    ]);
    const handleSimulatePayment = () => {
        const id = `pay_${Math.random().toString(36).substring(2, 14)}`;
        const newTx = {
            id,
            orderId: `order_${Math.random().toString(36).substring(2, 14)}`,
            customerName: 'Deepak Sharma',
            customerEmail: 'deepak@example.com',
            amount: '₹1,999.00',
            amountRaw: 1999,
            currency: 'INR',
            method: 'UPI',
            methodType: 'UPI',
            methodDetail: 'BHIM UPI · upi',
            status: 'CAPTURED',
            createdAt: 'Just now',
            arn: `ARN${Math.floor(10000000000 + Math.random() * 90000000000)}`,
            steps: ['CREATED', 'PROCESSING', 'AUTHORISED', 'CAPTURED'],
        };
        setTransactions([newTx, ...transactions]);
        setSelectedTx(newTx);
        showToast(`Simulated live payment ${id} captured via UPI`, 'success');
    };
    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        showToast(`Copied ${label} to clipboard`, 'success');
    };
    const filteredTransactions = transactions.filter((t) => {
        if (statusFilter !== 'ALL' && t.status !== statusFilter)
            return false;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return (t.id.toLowerCase().includes(q) ||
                t.customerName.toLowerCase().includes(q) ||
                t.customerEmail.toLowerCase().includes(q) ||
                t.method.toLowerCase().includes(q));
        }
        return true;
    });
    return (<div className="space-y-6">
      {/* Razorpay Test Mode Welcome & KYC Notice */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-xs flex-shrink-0">
            TEST
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Welcome to BuimbPay Test Mode, {merchantName}!
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Simulate end-to-end payments, UPI autopay mandates, and test webhooks without real money movement.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button onClick={() => onNavigate('upi-observers')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs">
            <Smartphone className="w-3.5 h-3.5"/>
            UPI Observers (0% Fee)
          </button>
          <button onClick={handleSimulatePayment} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold transition-all shadow-xs">
            <Zap className="w-3.5 h-3.5 fill-current"/>
            Simulate Payment
          </button>
          <button onClick={() => onNavigate('settings-kyc')} className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 hover:bg-amber-100/50 text-slate-800 text-xs font-semibold transition-colors">
            Activate Live Account
          </button>
        </div>
      </div>

      {/* KPI Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Gross Volume */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Total Volume</span>
            <span className="text-emerald-600 font-bold flex items-center gap-0.5 text-[11px]">
              <TrendingUp className="w-3 h-3"/> +18.4%
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">₹3,42,850.00</div>
          <span className="text-[11px] text-slate-400 block">Past 30 days total</span>
        </div>

        {/* Successful Payments */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Payments</span>
            <span className="text-emerald-600 font-bold text-[11px]">96.4% success</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">1,248</div>
          <span className="text-[11px] text-slate-400 block">4 failed attempts</span>
        </div>

        {/* Refunds */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Refunds</span>
            <span className="text-slate-400 text-[11px]">4 processed</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">₹8,450.00</div>
          <span className="text-[11px] text-slate-400 block">Instant IMPS refunds</span>
        </div>

        {/* Settlement Balance */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Next Settlement</span>
            <span className="text-blue-600 font-bold text-[10px] uppercase">Tomorrow 6 AM</span>
          </div>
          <div className="text-2xl font-bold font-mono text-blue-600">₹84,200.00</div>
          <span className="text-[11px] text-slate-400 block">HDFC A/c •••• 4891</span>
        </div>

        {/* Payouts */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Payouts (X)</span>
            <span className="text-purple-600 font-bold text-[10px] uppercase">BuimbPayX</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">₹1,12,000.00</div>
          <span className="text-[11px] text-slate-400 block">Vendor & salary transfers</span>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VolumeChart />
        </div>
        <div>
          <SuccessRateChart />
        </div>
      </div>

      {/* Payment Method Mix & Settlement Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentMethodMix />
        <SettlementOverviewCard onNavigate={onNavigate}/>
      </div>

      {/* Common Quick Actions */}
      <CommonActions onAction={(key) => {
            if (key === 'create-link')
                setShowCreateLinkModal(true);
            else if (key === 'test-integration')
                handleSimulatePayment();
            else if (key === 'view-keys')
                onNavigate('developers');
            else if (key === 'check-reconciliation')
                onNavigate('settlements');
        }}/>

      {/* Real-time Transactions Feed */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Transactions</h3>
            <p className="text-xs text-slate-500">Live payment feed with one-click drawer preview</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5"/>
              <input type="text" placeholder="Search transactions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-8 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"/>
            </div>

            <button onClick={() => onNavigate('transactions')} className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors">
              View All
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider bg-slate-50">
                <th className="py-2.5 px-4">Payment ID</th>
                <th className="py-2.5 px-4">Customer</th>
                <th className="py-2.5 px-4">Amount</th>
                <th className="py-2.5 px-4">Method</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Time</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTransactions.map((tx) => (<tr key={tx.id} onClick={() => setSelectedTx(tx)} className="hover:bg-slate-50/80 cursor-pointer transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-blue-600 hover:underline">
                      {tx.id}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{tx.customerName}</div>
                    <div className="text-[11px] text-slate-400">{tx.customerEmail}</div>
                  </td>
                  <td className="py-3 px-4 font-bold font-mono text-slate-900">{tx.amount}</td>
                  <td className="py-3 px-4">
                    <span className="text-slate-700 font-medium">{tx.methodDetail}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${tx.status === 'CAPTURED'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : tx.status === 'PROCESSING'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : tx.status === 'FAILED'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                      {tx.status === 'CAPTURED' && <CheckCircle2 className="w-2.5 h-2.5"/>}
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{tx.createdAt}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={(e) => {
                e.stopPropagation();
                setSelectedTx(tx);
            }} className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors">
                      Details
                    </button>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Transaction Detail Drawer */}
      <TransactionDrawer transaction={selectedTx} onClose={() => setSelectedTx(null)} onInitiateRefund={(tx) => {
            showToast(`Initiated refund for ${tx.id}`, 'success');
            setSelectedTx(null);
        }}/>

      {/* Quick Create Payment Link Modal */}
      {showCreateLinkModal && (<div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Create Standard Payment Link</h3>
              <button onClick={() => setShowCreateLinkModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Amount (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">₹</span>
                  <input type="number" value={linkAmount} onChange={(e) => setLinkAmount(e.target.value)} className="w-full h-9 pl-7 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"/>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Payment Purpose / Description
                </label>
                <input type="text" value={linkDesc} onChange={(e) => setLinkDesc(e.target.value)} className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"/>
              </div>

              <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 text-xs text-blue-900 space-y-1">
                <div className="font-bold">Short Link will be generated:</div>
                <div className="font-mono text-blue-700">https://rzp.io/i/X9a2bC7</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowCreateLinkModal(false)} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200">
                Cancel
              </button>
              <button onClick={() => {
                setShowCreateLinkModal(false);
                showToast('Payment link generated & copied to clipboard: https://rzp.io/i/X9a2bC7', 'success');
            }} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm">
                Generate Link
              </button>
            </div>
          </div>
        </div>)}
    </div>);
};
