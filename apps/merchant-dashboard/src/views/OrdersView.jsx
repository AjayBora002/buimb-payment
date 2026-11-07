import React, { useState } from 'react';
import { Search, Plus, ShoppingBag, ExternalLink, Copy, CheckCircle2, Clock, Download, } from 'lucide-react';
import { useToast } from '../components/Toast.jsx';
export const OrdersView = () => {
    const { showToast } = useToast();
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newAmount, setNewAmount] = useState('1499');
    const [newReceipt, setNewReceipt] = useState('REC-892301');
    const [orders, setOrders] = useState([
        {
            id: 'order_Nx8Y29kLp102',
            receipt: 'REC-2026-0901',
            amount: '₹4,500.00',
            amountRaw: 4500,
            currency: 'INR',
            attempts: 1,
            status: 'PAID',
            customerEmail: 'priya.sharma@example.com',
            createdAt: '12 mins ago',
            paymentId: 'pay_Nx8Y29kLp102',
        },
        {
            id: 'order_Nx8V11mRp401',
            receipt: 'REC-2026-0902',
            amount: '₹12,999.00',
            amountRaw: 12999,
            currency: 'INR',
            attempts: 1,
            status: 'PAID',
            customerEmail: 'rohit.verma@example.com',
            createdAt: '34 mins ago',
            paymentId: 'pay_Nx8V11mRp401',
        },
        {
            id: 'order_Nx7T99qWz302',
            receipt: 'REC-2026-0903',
            amount: '₹1,250.00',
            amountRaw: 1250,
            currency: 'INR',
            attempts: 2,
            status: 'ATTEMPTED',
            customerEmail: 'kavita.das@example.com',
            createdAt: '1 hour ago',
        },
        {
            id: 'order_Nx7R88bTt991',
            receipt: 'REC-2026-0904',
            amount: '₹8,900.00',
            amountRaw: 8900,
            currency: 'INR',
            attempts: 1,
            status: 'PAID',
            customerEmail: 'arun.patel@example.com',
            createdAt: '2 hours ago',
            paymentId: 'pay_Nx7R88bTt991',
        },
        {
            id: 'order_Nx6P44jKk812',
            receipt: 'REC-2026-0905',
            amount: '₹3,400.00',
            amountRaw: 3400,
            currency: 'INR',
            attempts: 0,
            status: 'CREATED',
            customerEmail: 'manish.rao@example.com',
            createdAt: '3 hours ago',
        },
    ]);
    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        showToast(`Copied ${label} to clipboard`, 'success');
    };
    const handleCreateOrder = (e) => {
        e.preventDefault();
        const id = `order_${Math.random().toString(36).substring(2, 14)}`;
        const parsedAmount = parseFloat(newAmount) || 1000;
        const newOrder = {
            id,
            receipt: newReceipt,
            amount: `₹${parsedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
            amountRaw: parsedAmount,
            currency: 'INR',
            attempts: 0,
            status: 'CREATED',
            customerEmail: 'customer@client.com',
            createdAt: 'Just now',
        };
        setOrders([newOrder, ...orders]);
        setShowCreateModal(false);
        showToast(`Created Order ${id}`, 'success');
    };
    const filteredOrders = orders.filter((o) => {
        if (filter !== 'ALL' && o.status !== filter)
            return false;
        if (search) {
            const q = search.toLowerCase();
            return o.id.toLowerCase().includes(q) || o.receipt.toLowerCase().includes(q) || o.customerEmail.toLowerCase().includes(q);
        }
        return true;
    });
    return (<div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Orders</h2>
          <p className="text-xs text-slate-500 mt-1">
            Track checkout sessions, payment attempts, and order fulfillment states.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => showToast('Exported Orders to CSV', 'info')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-xs">
            <Download className="w-3.5 h-3.5 text-slate-500"/>
            Export CSV
          </button>

          <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm shadow-blue-600/30">
            <Plus className="w-4 h-4"/>
            + Create Order
          </button>
        </div>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500">Total Orders</span>
          <div className="text-2xl font-bold text-slate-900">{orders.length}</div>
          <span className="text-[11px] text-slate-400">Past 30 days</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500">Paid Conversion Rate</span>
          <div className="text-2xl font-bold text-emerald-600">80.0%</div>
          <span className="text-[11px] text-emerald-600 font-medium">Optimal customer checkout</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500">Gross Ordered Value</span>
          <div className="text-2xl font-bold text-slate-900 font-mono">₹31,049.00</div>
          <span className="text-[11px] text-slate-400">Sum of all created orders</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            {['ALL', 'PAID', 'ATTEMPTED', 'CREATED'].map((st) => (<button key={st} onClick={() => setFilter(st)} className={`px-3 py-1 rounded-md transition-all ${filter === st
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'}`}>
                {st}
              </button>))}
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5"/>
            <input type="text" placeholder="Search by order ID or receipt..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-8 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"/>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider bg-slate-50/60">
                <th className="py-2.5 px-3">Order ID</th>
                <th className="py-2.5 px-3">Receipt</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Customer</th>
                <th className="py-2.5 px-3">Attempts</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Created</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredOrders.map((ord) => (<tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 font-mono font-bold text-blue-600">
                      <span>{ord.id}</span>
                      <button onClick={() => copyToClipboard(ord.id, 'Order ID')} className="text-slate-400 hover:text-slate-600" title="Copy Order ID">
                        <Copy className="w-3 h-3"/>
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600">{ord.receipt}</td>
                  <td className="py-3 px-3 font-bold font-mono text-slate-900">{ord.amount}</td>
                  <td className="py-3 px-3 text-slate-600 truncate max-w-[160px]">{ord.customerEmail}</td>
                  <td className="py-3 px-3 font-mono">{ord.attempts}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${ord.status === 'PAID'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : ord.status === 'ATTEMPTED'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                      {ord.status === 'PAID' && <CheckCircle2 className="w-2.5 h-2.5"/>}
                      {ord.status === 'ATTEMPTED' && <Clock className="w-2.5 h-2.5"/>}
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{ord.createdAt}</td>
                  <td className="py-3 px-3 text-right">
                    <button onClick={() => copyToClipboard(`https://api.buimbpay.com/v1/checkout/${ord.id}`, 'Checkout Link')} className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors inline-flex items-center gap-1">
                      <ExternalLink className="w-3 h-3 text-blue-600"/>
                      Copy Link
                    </button>
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Order Modal */}
      {showCreateModal && (<div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Create New Order</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Order Amount (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">₹</span>
                  <input type="number" required value={newAmount} onChange={(e) => setNewAmount(e.target.value)} className="w-full h-9 pl-7 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"/>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Merchant Receipt #
                </label>
                <input type="text" required value={newReceipt} onChange={(e) => setNewReceipt(e.target.value)} className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"/>
              </div>

              <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 text-xs text-blue-900 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5 text-blue-600"/>
                  BuimbPay Standard Checkout
                </div>
                <p className="text-[11px] text-blue-700">
                  Orders allow you to associate payments with carts, prevent multiple debits, and bind customer attempts.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm">
                  Generate Order
                </button>
              </div>
            </form>
          </div>
        </div>)}
    </div>);
};
