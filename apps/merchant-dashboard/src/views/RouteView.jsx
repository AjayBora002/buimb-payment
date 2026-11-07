import React, { useState } from 'react';
import { GitFork, Plus, ArrowRight, RotateCcw, CheckCircle2, Users, DollarSign, TrendingUp, Percent, } from 'lucide-react';
import { useToast } from '../components/Toast.jsx';
export const RouteView = () => {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState('accounts');
    const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    // Form states
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newAccount, setNewAccount] = useState('');
    const [newIfsc, setNewIfsc] = useState('');
    const [newSplitShare, setNewSplitShare] = useState('90');
    const [transferPaymentId, setTransferPaymentId] = useState('pay_live_789102');
    const [transferAccountId, setTransferAccountId] = useState('');
    const [transferAmount, setTransferAmount] = useState('4,500.00');
    const [accounts, setAccounts] = useState([
        {
            id: 'acc_vendor_01',
            name: 'Delhi Retailers Hub',
            email: 'vendor1@delhiretail.com',
            phone: '+91 98101 23456',
            accountNumber: '•••• •••• 9812',
            ifsc: 'HDFC0001082',
            splitSharePct: 90,
            status: 'ACTIVE',
            totalTransferred: '₹1,42,800.00',
        },
        {
            id: 'acc_vendor_02',
            name: 'Bangalore Tech Suppliers',
            email: 'finance@bangaloresuppliers.in',
            phone: '+91 98450 88219',
            accountNumber: '•••• •••• 4421',
            ifsc: 'ICIC0000412',
            splitSharePct: 85,
            status: 'ACTIVE',
            totalTransferred: '₹89,450.00',
        },
        {
            id: 'acc_vendor_03',
            name: 'Mumbai Artisan Collective',
            email: 'payouts@mumbaiartisan.org',
            phone: '+91 98200 11984',
            accountNumber: '•••• •••• 7713',
            ifsc: 'SBIN0002104',
            splitSharePct: 92,
            status: 'ACTIVE',
            totalTransferred: '₹2,10,300.00',
        },
    ]);
    const [transfers, setTransfers] = useState([
        {
            id: 'trf_981a10',
            paymentId: 'pay_live_789102',
            accountName: 'Delhi Retailers Hub',
            amount: '₹4,050.00',
            fee: '₹81.00',
            status: 'PROCESSED',
            createdAt: '10 mins ago',
        },
        {
            id: 'trf_981a11',
            paymentId: 'pay_live_789101',
            accountName: 'Mumbai Artisan Collective',
            amount: '₹12,420.00',
            fee: '₹248.40',
            status: 'PROCESSED',
            createdAt: '1 hour ago',
        },
        {
            id: 'trf_981a12',
            paymentId: 'pay_live_789098',
            accountName: 'Bangalore Tech Suppliers',
            amount: '₹2,550.00',
            fee: '₹51.00',
            status: 'REVERSED',
            createdAt: '3 hours ago',
        },
    ]);
    const handleCreateAccount = (e) => {
        e.preventDefault();
        const newId = `acc_vendor_${Math.random().toString(36).substring(2, 8)}`;
        const created = {
            id: newId,
            name: newName,
            email: newEmail,
            phone: newPhone,
            accountNumber: `•••• •••• ${newAccount.slice(-4) || '1234'}`,
            ifsc: newIfsc.toUpperCase(),
            splitSharePct: Number(newSplitShare) || 90,
            status: 'ACTIVE',
            totalTransferred: '₹0.00',
        };
        setAccounts([created, ...accounts]);
        setIsAddAccountModalOpen(false);
        showToast(`Linked account "${newName}" created successfully!`, 'success');
        setNewName('');
        setNewEmail('');
        setNewPhone('');
        setNewAccount('');
        setNewIfsc('');
    };
    const handleCreateTransfer = (e) => {
        e.preventDefault();
        const selected = accounts.find((a) => a.id === transferAccountId) || accounts[0];
        const newTrf = {
            id: `trf_${Math.random().toString(36).substring(2, 8)}`,
            paymentId: transferPaymentId,
            accountName: selected.name,
            amount: `₹${transferAmount}`,
            fee: `₹${(parseFloat(transferAmount.replace(/,/g, '')) * 0.02).toFixed(2)}`,
            status: 'PROCESSED',
            createdAt: 'Just now',
        };
        setTransfers([newTrf, ...transfers]);
        setIsTransferModalOpen(false);
        showToast(`Split transfer of ₹${transferAmount} to ${selected.name} executed!`, 'success');
    };
    const handleReverseTransfer = (id) => {
        setTransfers((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'REVERSED' } : t)));
        showToast(`Transfer ${id} reversed successfully. Funds returned to primary merchant ledger.`, 'info');
    };
    return (<div className="space-y-6 select-none animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-[#0b63e5] border border-blue-200">
              <GitFork className="w-5 h-5"/>
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Buimb-Pay Route</h2>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 uppercase">
              Marketplace Split Transfers
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-xl">
            Automatically split incoming payments between your platform and multiple linked seller/vendor bank accounts with programmable commission deduction.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button onClick={() => setIsTransferModalOpen(true)} className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <ArrowRight className="w-4 h-4 text-slate-500"/>
            <span>Create Split Transfer</span>
          </button>
          <button onClick={() => setIsAddAccountModalOpen(true)} className="px-4 py-2 rounded-xl bg-[#0b63e5] hover:bg-[#0957cb] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer">
            <Plus className="w-4 h-4"/>
            <span>Add Linked Account</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Total Split Volume</span>
            <DollarSign className="w-4 h-4 text-blue-600"/>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">₹4,42,550.00</div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3"/>
            <span>+18.4% from last week</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Active Linked Accounts</span>
            <Users className="w-4 h-4 text-emerald-600"/>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">{accounts.length} Vendors</div>
          <div className="text-[11px] text-slate-400">100% verified KYC & bank status</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Platform Commission</span>
            <Percent className="w-4 h-4 text-purple-600"/>
          </div>
          <div className="text-2xl font-black text-purple-700 tabular-nums">₹44,255.00</div>
          <div className="text-[11px] text-slate-500 font-medium">Avg 10.0% take rate</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Settlement Rail</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600"/>
          </div>
          <div className="text-2xl font-black text-slate-900">Direct T+0</div>
          <div className="text-[11px] text-emerald-600 font-medium">Auto-dispatched via IMPS/NEFT</div>
        </div>
      </div>

      {/* Main Tabbed Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 pt-4 flex gap-6">
          <button onClick={() => setActiveTab('accounts')} className={`pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${activeTab === 'accounts'
            ? 'border-[#0b63e5] text-[#0b63e5]'
            : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
            Linked Vendor Accounts ({accounts.length})
          </button>
          <button onClick={() => setActiveTab('transfers')} className={`pb-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${activeTab === 'transfers'
            ? 'border-[#0b63e5] text-[#0b63e5]'
            : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
            Split Transfers ({transfers.length})
          </button>
        </div>

        {/* Tab 1: Linked Accounts */}
        {activeTab === 'accounts' && (<div className="divide-y divide-slate-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-6">Vendor Name</th>
                    <th className="py-3 px-6">Bank Account / IFSC</th>
                    <th className="py-3 px-6">Split Share %</th>
                    <th className="py-3 px-6">Total Dispatched</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {accounts.map((acc) => (<tr key={acc.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-900">{acc.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{acc.email} • {acc.phone}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-mono text-slate-800 font-semibold">{acc.accountNumber}</div>
                        <div className="text-[10px] text-blue-600 font-mono font-bold uppercase">{acc.ifsc}</div>
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-800 tabular-nums">
                        {acc.splitSharePct}%
                      </td>
                      <td className="py-4 px-6 font-bold text-emerald-600 tabular-nums">
                        {acc.totalTransferred}
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          ACTIVE
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button onClick={() => {
                    setTransferAccountId(acc.id);
                    setIsTransferModalOpen(true);
                }} className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] transition-all cursor-pointer">
                          Transfer &rarr;
                        </button>
                      </td>
                    </tr>))}
                </tbody>
              </table>
            </div>
          </div>)}

        {/* Tab 2: Split Transfers */}
        {activeTab === 'transfers' && (<div className="divide-y divide-slate-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-6">Transfer ID</th>
                    <th className="py-3 px-6">Original Payment</th>
                    <th className="py-3 px-6">Recipient Account</th>
                    <th className="py-3 px-6">Transfer Amount</th>
                    <th className="py-3 px-6">Platform Fee</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-right">Reversal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {transfers.map((trf) => (<tr key={trf.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-blue-600">
                        {trf.id}
                      </td>
                      <td className="py-4 px-6 font-mono text-slate-600">
                        {trf.paymentId}
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900">
                        {trf.accountName}
                      </td>
                      <td className="py-4 px-6 font-bold text-emerald-600 tabular-nums">
                        {trf.amount}
                      </td>
                      <td className="py-4 px-6 text-slate-500 tabular-nums">
                        {trf.fee}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${trf.status === 'PROCESSED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'}`}>
                          {trf.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {trf.status === 'PROCESSED' && (<button onClick={() => handleReverseTransfer(trf.id)} className="text-rose-600 hover:text-rose-700 font-bold text-[11px] flex items-center gap-1 justify-end ml-auto cursor-pointer">
                            <RotateCcw className="w-3 h-3"/>
                            Reverse
                          </button>)}
                      </td>
                    </tr>))}
                </tbody>
              </table>
            </div>
          </div>)}
      </div>

      {/* Modal: Add Linked Account */}
      {isAddAccountModalOpen && (<div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Add Linked Vendor Account</h3>
              <button onClick={() => setIsAddAccountModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAccount} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Vendor / Business Name</label>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Pune Electronics Hub" required className="w-full h-9 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600"/>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Vendor Email</label>
                  <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="vendor@example.com" required className="w-full h-9 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600"/>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Mobile Phone</label>
                  <input type="text" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder="+91 98765 43210" required className="w-full h-9 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600"/>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Bank Account Number</label>
                  <input type="text" value={newAccount} onChange={(e) => setNewAccount(e.target.value)} placeholder="5010029310892" required className="w-full h-9 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 font-mono"/>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">IFSC Code</label>
                  <input type="text" value={newIfsc} onChange={(e) => setNewIfsc(e.target.value)} placeholder="HDFC0001082" required className="w-full h-9 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 font-mono uppercase"/>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Default Split Share % (Vendor receives this %)
                </label>
                <input type="number" value={newSplitShare} onChange={(e) => setNewSplitShare(e.target.value)} min="1" max="99" className="w-full h-9 px-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 font-mono"/>
              </div>

              <button type="submit" className="w-full py-2.5 rounded-xl bg-[#0b63e5] hover:bg-[#0957cb] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer mt-2">
                Create Linked Account
              </button>
            </form>
          </div>
        </div>)}

      {/* Modal: Create Transfer */}
      {isTransferModalOpen && (<div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Execute Split Transfer</h3>
              <button onClick={() => setIsTransferModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTransfer} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Select Linked Vendor Account</label>
                <select value={transferAccountId} onChange={(e) => setTransferAccountId(e.target.value)} className="w-full h-9 px-3 rounded-lg border border-slate-300 bg-white text-slate-800">
                  {accounts.map((a) => (<option key={a.id} value={a.id}>
                      {a.name} ({a.splitSharePct}%)
                    </option>))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Original Payment ID</label>
                <input type="text" value={transferPaymentId} onChange={(e) => setTransferPaymentId(e.target.value)} className="w-full h-9 px-3 rounded-lg border border-slate-300 font-mono text-slate-800"/>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Transfer Amount (INR)</label>
                <input type="text" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} className="w-full h-9 px-3 rounded-lg border border-slate-300 font-mono text-slate-800"/>
              </div>

              <button type="submit" className="w-full py-2.5 rounded-xl bg-[#0b63e5] hover:bg-[#0957cb] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer mt-2">
                Execute Transfer Now
              </button>
            </form>
          </div>
        </div>)}
    </div>);
};
