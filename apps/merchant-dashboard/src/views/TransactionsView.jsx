import React, { useState } from 'react';
import { Plus, CheckCircle2, RefreshCw, X, ArrowUpRight, ShieldCheck, Download, Search, Filter } from 'lucide-react';

export const TransactionsView = () => {
    const [filter, setFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTx, setSelectedTx] = useState(null);
    const [isSimulating, setIsSimulating] = useState(false);
    const [notification, setNotification] = useState(null);

    const [transactions, setTransactions] = useState([
        {
            id: 'pay_Nx8Y29kLp102',
            orderId: 'order_Nx8Y29kLp102',
            amount: '₹4,500.00',
            amountRaw: 4500,
            currency: 'INR',
            customer: 'Priya Sharma (priya@example.com)',
            method: 'UPI · Google Pay (okaxis)',
            status: 'CAPTURED',
            arn: 'ARN99281029381',
            createdAt: '2026-11-09 22:15:12',
            steps: ['CREATED', 'PROCESSING', 'AUTHORISED', 'CAPTURED'],
        },
        {
            id: 'pay_Nx8V11mRp401',
            orderId: 'order_Nx8V11mRp401',
            amount: '₹12,999.00',
            amountRaw: 12999,
            currency: 'INR',
            customer: 'Rohit Verma (rohit@example.com)',
            method: 'Card · HDFC Visa **4242',
            status: 'CAPTURED',
            arn: 'ARN88120391024',
            createdAt: '2026-11-09 21:58:05',
            steps: ['CREATED', 'REQUIRES_ACTION', 'PROCESSING', 'AUTHORISED', 'CAPTURED'],
        },
        {
            id: 'pay_Nx7T99qWz302',
            orderId: 'order_Nx7T99qWz302',
            amount: '₹1,250.00',
            amountRaw: 1250,
            currency: 'INR',
            customer: 'Kavita Das (kavita@example.com)',
            method: 'NetBanking · ICICI Bank Retail',
            status: 'PROCESSING',
            arn: 'ARN77102938192',
            createdAt: '2026-11-09 21:30:30',
            steps: ['CREATED', 'PROCESSING'],
        },
        {
            id: 'pay_Nx7R88bTt991',
            orderId: 'order_Nx7R88bTt991',
            amount: '₹8,900.00',
            amountRaw: 8900,
            currency: 'INR',
            customer: 'Arun Patel (arun@example.com)',
            method: 'UPI · PhonePe (ybl)',
            status: 'CAPTURED',
            arn: 'ARN66192830192',
            createdAt: '2026-11-09 20:45:19',
            steps: ['CREATED', 'PROCESSING', 'AUTHORISED', 'CAPTURED'],
        },
        {
            id: 'pay_Nx6P77vKk882',
            orderId: 'order_Nx6P77vKk882',
            amount: '₹2,100.00',
            amountRaw: 2100,
            currency: 'INR',
            customer: 'Vikram Mehta (vikram@example.com)',
            method: 'Card · Axis MC **8831',
            status: 'FAILED',
            arn: 'ARN55102938102',
            createdAt: '2026-11-09 19:10:44',
            steps: ['CREATED', 'PROCESSING', 'FAILED'],
        },
    ]);

    const handleSimulatePayment = () => {
        setIsSimulating(true);
        setNotification('Simulating real-time payment capture & NPCI settlement...');
        setTimeout(() => {
            const newId = `pay_${Math.random().toString(36).substring(2, 11)}`;
            const newTx = {
                id: newId,
                orderId: `order_${Math.floor(1000000 + Math.random() * 9000000)}`,
                amount: '₹3,200.00',
                amountRaw: 3200,
                currency: 'INR',
                customer: 'Ananya Roy (ananya@example.com)',
                method: 'UPI · PayTM (paytm)',
                status: 'CAPTURED',
                arn: `ARN${Math.floor(10000000000 + Math.random() * 90000000000)}`,
                createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
                steps: ['CREATED', 'PROCESSING', 'AUTHORISED', 'CAPTURED'],
            };
            setTransactions([newTx, ...transactions]);
            setIsSimulating(false);
            setNotification(`Payment ${newId} captured & queued for daily settlement.`);
            setTimeout(() => setNotification(null), 4000);
        }, 1200);
    };

    const filtered = transactions.filter((t) => {
        const matchesFilter = filter === 'ALL' || t.status === filter;
        const matchesSearch =
            !searchQuery ||
            t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.method.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'CAPTURED':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        CAPTURED
                    </span>
                );
            case 'PROCESSING':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        PROCESSING
                    </span>
                );
            case 'FAILED':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        FAILED
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {status}
                    </span>
                );
        }
    };

    return (
        <div className="space-y-6 max-w-7xl">
            {notification && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm animate-fadeIn">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{notification}</span>
                    </div>
                    <button onClick={() => setNotification(null)} className="text-emerald-600 hover:text-emerald-800">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                    <h2 className="text-xl font-black text-[#0c2340] tracking-tight">
                        Payments & Transactions
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        Real-time transaction stream across domestic UPI, RuPay, Visa, MasterCard, and Netbanking.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSimulatePayment}
                        disabled={isSimulating}
                        className="px-4 py-2 rounded-lg bg-[#0b63e5] hover:bg-[#0957cb] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                    >
                        {isSimulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>Simulate Live Payment</span>
                    </button>
                </div>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 w-fit">
                    {['ALL', 'CAPTURED', 'PROCESSING', 'FAILED'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                                filter === tab
                                    ? 'bg-white text-[#0c2340] shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            {tab.charAt(0) + tab.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>

                <div className="relative w-full sm:w-72">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search payment ID, customer, method..."
                        className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100"
                    />
                </div>
            </div>

            {/* Transactions Table Container */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                            <th className="py-3.5 px-4">Payment ID</th>
                            <th className="py-3.5 px-4">Order ID</th>
                            <th className="py-3.5 px-4">Customer</th>
                            <th className="py-3.5 px-4">Payment Mode</th>
                            <th className="py-3.5 px-4">Amount</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4">Timestamp</th>
                            <th className="py-3.5 px-4 text-right">Details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                        {filtered.map((tx) => (
                            <tr
                                key={tx.id}
                                onClick={() => setSelectedTx(tx)}
                                className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                            >
                                <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{tx.id}</td>
                                <td className="py-3.5 px-4 font-mono text-slate-500">{tx.orderId}</td>
                                <td className="py-3.5 px-4 font-semibold text-slate-900">{tx.customer}</td>
                                <td className="py-3.5 px-4 font-medium text-slate-600">{tx.method}</td>
                                <td className="py-3.5 px-4 font-black font-mono text-slate-900">{tx.amount}</td>
                                <td className="py-3.5 px-4">{getStatusBadge(tx.status)}</td>
                                <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">{tx.createdAt}</td>
                                <td className="py-3.5 px-4 text-right">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedTx(tx);
                                        }}
                                        className="text-blue-600 hover:text-blue-700 font-bold text-xs"
                                    >
                                        Inspect &rarr;
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Transaction Inspection Slide-over Drawer */}
            {selectedTx && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex justify-end"
                    onClick={() => setSelectedTx(null)}
                >
                    <div
                        className="bg-white border-l border-slate-200 w-full max-w-lg p-6 space-y-6 shadow-2xl h-full overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div>
                                <span className="text-[11px] font-bold text-slate-400 block tracking-wider uppercase">
                                    Transaction Dossier
                                </span>
                                <h3 className="text-lg font-black font-mono text-[#0c2340]">
                                    {selectedTx.id}
                                </h3>
                            </div>
                            <button
                                onClick={() => setSelectedTx(null)}
                                className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Amount & Status Card */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                            <div>
                                <span className="text-xs text-slate-500 font-semibold block">Total Amount Paid</span>
                                <span className="text-2xl font-black font-mono text-slate-900">{selectedTx.amount}</span>
                            </div>
                            <div>{getStatusBadge(selectedTx.status)}</div>
                        </div>

                        {/* Lifecycle Stepper */}
                        <div className="space-y-2">
                            <span className="text-xs font-bold text-slate-800">Payment Lifecycle States</span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                                {selectedTx.steps.map((st, i) => (
                                    <React.Fragment key={st}>
                                        <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-mono text-[10px] font-bold border border-blue-200">
                                            {st}
                                        </span>
                                        {i < selectedTx.steps.length - 1 && (
                                            <span className="text-slate-300 font-bold">&rarr;</span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Technical Metadata */}
                        <div className="space-y-3 border-t border-slate-100 pt-4 text-xs">
                            <span className="font-bold text-slate-900 block">Bank Settlement Metadata</span>
                            <div className="grid grid-cols-2 gap-3 text-slate-600">
                                <div>
                                    <span className="text-slate-400 block text-[11px]">Bank Reference (ARN)</span>
                                    <span className="font-mono font-bold text-slate-800">{selectedTx.arn}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block text-[11px]">Payment Mode</span>
                                    <span className="font-semibold text-slate-800">{selectedTx.method}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block text-[11px]">Associated Order ID</span>
                                    <span className="font-mono font-bold text-slate-800">{selectedTx.orderId}</span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block text-[11px]">Timestamp</span>
                                    <span className="font-mono text-slate-800">{selectedTx.createdAt}</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                                <ShieldCheck className="w-4 h-4" />
                                <span>Verified by Issuer Bank</span>
                            </div>
                            <button
                                onClick={() => setSelectedTx(null)}
                                className="px-4 py-2 rounded-lg bg-[#0c2340] text-white text-xs font-bold"
                            >
                                Close Dossier
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
