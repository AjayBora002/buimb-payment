import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  Calendar,
  Search,
  Filter,
  ArrowDownLeft,
  ArrowUpRight,
  Building,
  CreditCard,
  Copy,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  ExternalLink,
  ChevronDown,
  X,
  Info,
  Clock,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useToast } from '../components/Toast.jsx';

export const AccountStatementView = () => {
  const { showToast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('THIS_MONTH');
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const accountDetails = {
    accountHolder: 'Bora Enterprises Pvt Ltd',
    accountNumber: '91828391028301',
    ifsc: 'ICIC0000011',
    bankName: 'ICICI Bank Ltd',
    branch: 'Koramangala 4th Block, Bengaluru',
    accountType: 'BuimbPayX Smart Current Account (Escrow Linked)',
    availableBalance: 428450.00,
    unclearedBalance: 12500.00,
    totalCreditsMonth: 1842100.00,
    totalDebitsMonth: 1426150.00,
  };

  const [statementEntries, setStatementEntries] = useState([
    {
      id: 'tx_stmt_9011',
      date: '2026-09-23 15:42:19',
      description: 'Settlement Payout Credit (Batch STLMT-20260923-001)',
      utr: 'UTR2026092389102481',
      category: 'SETTLEMENT',
      type: 'CR',
      amount: 341200.00,
      runningBalance: 428450.00,
      counterparty: 'BuimbPay Nodal Escrow Account',
      counterpartyAcc: '•••• •••• 9901',
      mode: 'NEFT',
      status: 'SETTLED',
    },
    {
      id: 'tx_stmt_9012',
      date: '2026-09-23 11:20:05',
      description: 'Vendor Payout: Delhi Retailers Hub (Inventory Consignment #89)',
      utr: 'UTR2026092344192019',
      category: 'VENDOR_PAYOUT',
      type: 'DR',
      amount: 45000.00,
      runningBalance: 87250.00,
      counterparty: 'Delhi Retailers Hub LLP',
      counterpartyAcc: '•••• •••• 9812 (HDFC Bank)',
      mode: 'IMPS_INSTANT',
      status: 'SETTLED',
    },
    {
      id: 'tx_stmt_9013',
      date: '2026-09-22 18:05:44',
      description: 'Direct UPI Customer Collection: Priya Sharma (order_Nx8Y29kLp102)',
      utr: 'UTR2026092211902847',
      category: 'COLLECTION',
      type: 'CR',
      amount: 4500.00,
      runningBalance: 132250.00,
      counterparty: 'priya.sharma@okhdfcbank',
      counterpartyAcc: 'VPA: priya.sharma@okhdfcbank',
      mode: 'UPI_2.0',
      status: 'SETTLED',
    },
    {
      id: 'tx_stmt_9014',
      date: '2026-09-22 17:15:30',
      description: 'Customer Refund Debit (ref_9812a014bc for order_Nx7R88bTt991)',
      utr: 'UTR2026092289410293',
      category: 'REFUND',
      type: 'DR',
      amount: 8900.00,
      runningBalance: 127750.00,
      counterparty: 'Arun Patel (Axis Bank)',
      counterpartyAcc: '•••• •••• 4410',
      mode: 'AUTO_REFUND',
      status: 'SETTLED',
    },
    {
      id: 'tx_stmt_9015',
      date: '2026-09-22 14:10:12',
      description: 'Smart Collect Virtual Account Inflow (VAN: BUIMB910283)',
      utr: 'UTR2026092299812044',
      category: 'COLLECTION',
      type: 'CR',
      amount: 75000.00,
      runningBalance: 136650.00,
      counterparty: 'Bora Retail Distribution Partners',
      counterpartyAcc: 'RTGS / SBI Corporate Banking',
      mode: 'RTGS',
      status: 'SETTLED',
    },
    {
      id: 'tx_stmt_9016',
      date: '2026-09-21 23:59:59',
      description: 'Monthly MDR & Gateway Platform Service Fee + GST 18%',
      utr: 'UTR2026092100918231',
      category: 'FEE_DEDUCTION',
      type: 'DR',
      amount: 1420.50,
      runningBalance: 61650.00,
      counterparty: 'BuimbPay Technologies Private Limited',
      counterpartyAcc: 'GSTIN: 29AAGCB1209M1ZR',
      mode: 'SYSTEM_AUTODEBIT',
      status: 'SETTLED',
    },
    {
      id: 'tx_stmt_9017',
      date: '2026-09-21 16:30:18',
      description: 'Corporate Card Top-Up: Virtual Expense Card (Priya Sharma)',
      utr: 'UTR2026092177410928',
      category: 'CARD_EXPENSE',
      type: 'DR',
      amount: 25000.00,
      runningBalance: 63070.50,
      counterparty: 'BuimbPayX Smart Corporate Card Pool',
      counterpartyAcc: 'Card ID: card_corp_01',
      mode: 'CARD_LOAD',
      status: 'SETTLED',
    },
    {
      id: 'tx_stmt_9018',
      date: '2026-09-20 10:00:00',
      description: 'Opening Balance Carried Forward',
      utr: 'UTR2026092000000001',
      category: 'OPENING_BAL',
      type: 'CR',
      amount: 88070.50,
      runningBalance: 88070.50,
      counterparty: 'System Ledger Roll-Forward',
      counterpartyAcc: 'BuimbPay Core Banking Engine',
      mode: 'SYSTEM',
      status: 'SETTLED',
    },
  ]);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label}: ${text}`, 'success');
  };

  const handleDownloadPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast('Account Statement PDF (Sep 2026) generated and downloaded successfully.', 'success');
    }, 1200);
  };

  const handleExportCSV = () => {
    const headers = ['Date', 'Description', 'UTR', 'Type', 'Amount (INR)', 'Running Balance (INR)', 'Category', 'Mode'];
    const rows = filteredEntries.map(e => [
      `"${e.date}"`,
      `"${e.description.replace(/"/g, '""')}"`,
      `"${e.utr}"`,
      e.type,
      e.amount.toFixed(2),
      e.runningBalance.toFixed(2),
      e.category,
      e.mode
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `buimbpay_account_statement_${selectedPeriod.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV Statement exported successfully.', 'success');
  };

  const filteredEntries = statementEntries.filter(entry => {
    const matchesSearch =
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.utr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.counterparty.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filterType === 'CR') return entry.type === 'CR';
    if (filterType === 'DR') return entry.type === 'DR';
    if (filterType === 'SETTLEMENT') return entry.category === 'SETTLEMENT';
    if (filterType === 'VENDOR_PAYOUT') return entry.category === 'VENDOR_PAYOUT';

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Account Overview Top Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                <Building className="w-5 h-5" />
              </span>
              <div>
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  {accountDetails.accountHolder}
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  {accountDetails.accountType}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-200 font-mono text-slate-700">
                <span className="text-slate-400 font-sans">A/C:</span>
                <span className="font-semibold">{accountDetails.accountNumber}</span>
                <button
                  onClick={() => copyToClipboard(accountDetails.accountNumber, 'Account Number')}
                  className="text-slate-400 hover:text-blue-600 transition-colors ml-1"
                  title="Copy A/C No"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-200 font-mono text-slate-700">
                <span className="text-slate-400 font-sans">IFSC:</span>
                <span className="font-semibold">{accountDetails.ifsc}</span>
                <button
                  onClick={() => copyToClipboard(accountDetails.ifsc, 'IFSC Code')}
                  className="text-slate-400 hover:text-blue-600 transition-colors ml-1"
                  title="Copy IFSC"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                RBI Nodal Escrow Linked
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 self-start lg:self-auto">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-[#0b63e5] hover:bg-[#094eb8] text-white transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isExporting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>Download PDF Statement</span>
            </button>
          </div>
        </div>

        {/* 4 Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">Available Balance</span>
            <div className="text-2xl font-black text-slate-900 tabular-nums">
              ₹{accountDetails.availableBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Ready for Instant Payouts
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">Total Inflow (Sep 2026)</span>
            <div className="text-2xl font-black text-emerald-600 tabular-nums flex items-baseline gap-1">
              <span>+₹{accountDetails.totalCreditsMonth.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Collections + Settlements
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">Total Outflow (Sep 2026)</span>
            <div className="text-2xl font-black text-rose-600 tabular-nums flex items-baseline gap-1">
              <span>-₹{accountDetails.totalDebitsMonth.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Vendor Payouts + Fees
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500">Lien / Uncleared Hold</span>
            <div className="text-2xl font-black text-slate-700 tabular-nums">
              ₹{accountDetails.unclearedBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-slate-400">
              Clears in T+1 settlement window
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Period Selector Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {[
              { id: 'THIS_MONTH', label: 'This Month' },
              { id: 'LAST_MONTH', label: 'Last Month' },
              { id: 'LAST_90', label: 'Last 90 Days' },
              { id: 'FY_26', label: 'FY 2026-27' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedPeriod(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  selectedPeriod === tab.id
                    ? 'bg-white text-blue-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: 'ALL', label: 'All Transactions' },
              { id: 'CR', label: 'Credits (Inflows)' },
              { id: 'DR', label: 'Debits (Outflows)' },
              { id: 'SETTLEMENT', label: 'Settlements' },
              { id: 'VENDOR_PAYOUT', label: 'Vendor Payouts' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  filterType === f.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by Bank UTR, counterparty name, description or order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Statement Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">Bank Statement Transactions</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-200 text-slate-700">
              {filteredEntries.length} Records
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            All amounts in Indian Rupees (INR ₹)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Transaction Details</th>
                <th className="py-3 px-4">Bank UTR / Ref</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4 text-right">Debit (DR)</th>
                <th className="py-3 px-4 text-right">Credit (CR)</th>
                <th className="py-3 px-4 text-right">Closing Balance</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEntries.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-blue-50/40 transition-colors group"
                >
                  <td className="py-3 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                    {row.date}
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <div className="font-semibold text-slate-900 truncate">
                      {row.description}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <span>{row.counterparty}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px] text-slate-600">
                    <div className="flex items-center gap-1">
                      <span>{row.utr}</span>
                      <button
                        onClick={() => copyToClipboard(row.utr, 'UTR')}
                        className="text-slate-300 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Copy UTR"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {row.mode}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right font-mono font-bold text-rose-600">
                    {row.type === 'DR' ? `₹${row.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '—'}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right font-mono font-bold text-emerald-600">
                    {row.type === 'CR' ? `+₹${row.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '—'}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right font-mono font-bold text-slate-900">
                    ₹{row.runningBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => setSelectedTransaction(row)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 font-semibold text-[11px] transition-colors cursor-pointer"
                    >
                      View Advice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Advice Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                  <FileText className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Official Bank Credit/Debit Advice</h3>
                  <p className="text-[11px] text-slate-500 font-mono">UTR: {selectedTransaction.utr}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="text-center py-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-xs text-slate-500 font-medium block">Transaction Amount</span>
                <span className={`text-2xl font-black font-mono ${selectedTransaction.type === 'CR' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {selectedTransaction.type === 'CR' ? '+' : '-'}₹{selectedTransaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold mt-1 bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3 h-3" /> Confirmed & Settled
                </span>
              </div>

              <div className="space-y-2 text-xs border border-slate-100 rounded-lg p-3 bg-slate-50/50">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Date & Time</span>
                  <span className="font-mono font-semibold text-slate-800">{selectedTransaction.date}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Bank UTR Number</span>
                  <span className="font-mono font-bold text-blue-600">{selectedTransaction.utr}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Payment Rails</span>
                  <span className="font-semibold text-slate-800">{selectedTransaction.mode}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Counterparty</span>
                  <span className="font-semibold text-slate-800">{selectedTransaction.counterparty}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Account / VPA Ref</span>
                  <span className="font-mono text-slate-700">{selectedTransaction.counterpartyAcc}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Running Account Balance</span>
                  <span className="font-mono font-bold text-slate-900">
                    ₹{selectedTransaction.runningBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    copyToClipboard(selectedTransaction.utr, 'UTR Number');
                    setSelectedTransaction(null);
                  }}
                  className="flex-1 py-2 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  Copy UTR
                </button>
                <button
                  onClick={() => {
                    showToast(`Bank voucher for ${selectedTransaction.utr} downloaded.`, 'success');
                    setSelectedTransaction(null);
                  }}
                  className="flex-1 py-2 rounded-lg text-xs font-bold bg-[#0b63e5] hover:bg-[#094eb8] text-white transition-colors cursor-pointer"
                >
                  Download Voucher
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

