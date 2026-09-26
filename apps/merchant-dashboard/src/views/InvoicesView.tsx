import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Download,
  Send,
  Eye,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  X,
  Building,
} from 'lucide-react';
import { useToast } from '../components/Toast.js';

interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerGstin: string;
  subtotal: string;
  gstAmount: string;
  totalAmount: string;
  totalRaw: number;
  issueDate: string;
  dueDate: string;
  status: 'PAID' | 'ISSUED' | 'OVERDUE' | 'DRAFT';
}

export const InvoicesView: React.FC = () => {
  const { showToast } = useToast();
  const [filter, setFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [invoices, setInvoices] = useState<InvoiceItem[]>([
    {
      id: 'inv_91823901',
      invoiceNumber: 'INV-2026-0042',
      customerName: 'TechVanguard Solutions Pvt Ltd',
      customerGstin: '27AABCU9603R1ZM',
      subtotal: '₹1,50,000.00',
      gstAmount: '₹27,000.00',
      totalAmount: '₹1,77,000.00',
      totalRaw: 177000,
      issueDate: '2026-09-15',
      dueDate: '2026-09-30',
      status: 'ISSUED',
    },
    {
      id: 'inv_91823902',
      invoiceNumber: 'INV-2026-0041',
      customerName: 'Nexus Retail Logistics Ltd',
      customerGstin: '29AAACN8821Q1ZK',
      subtotal: '₹84,000.00',
      gstAmount: '₹15,120.00',
      totalAmount: '₹99,120.00',
      totalRaw: 99120,
      issueDate: '2026-09-10',
      dueDate: '2026-09-25',
      status: 'PAID',
    },
    {
      id: 'inv_91823903',
      invoiceNumber: 'INV-2026-0040',
      customerName: 'AeroCloud Analytics Inc',
      customerGstin: '33AABCA1122P1Z5',
      subtotal: '₹42,000.00',
      gstAmount: '₹7,560.00',
      totalAmount: '₹49,560.00',
      totalRaw: 49560,
      issueDate: '2026-08-20',
      dueDate: '2026-09-05',
      status: 'OVERDUE',
    },
  ]);

  const [form, setForm] = useState({
    customerName: '',
    customerGstin: '',
    itemDesc: 'Cloud Payment Infrastructure License',
    hsnCode: '998313',
    amount: '50000',
    dueDate: '2026-10-15',
  });

  const handleDownloadPdf = (invNumber: string) => {
    showToast(`Generating GST tax invoice PDF for ${invNumber}...`, 'info');
    setTimeout(() => {
      showToast(`Downloaded ${invNumber}.pdf`, 'success');
    }, 1200);
  };

  const handleSendInvoice = (invNumber: string) => {
    showToast(`Invoice ${invNumber} emailed with payment link`, 'success');
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const subtotalNum = Number(form.amount);
    const gstNum = subtotalNum * 0.18;
    const totalNum = subtotalNum + gstNum;
    const invNum = `INV-2026-00${Math.floor(45 + Math.random() * 50)}`;

    const newInv: InvoiceItem = {
      id: `inv_${Math.random().toString(36).substring(2, 10)}`,
      invoiceNumber: invNum,
      customerName: form.customerName || 'New B2B Client',
      customerGstin: form.customerGstin || '27AABCU1234A1Z9',
      subtotal: `₹${subtotalNum.toLocaleString('en-IN')}.00`,
      gstAmount: `₹${gstNum.toLocaleString('en-IN')}.00`,
      totalAmount: `₹${totalNum.toLocaleString('en-IN')}.00`,
      totalRaw: totalNum,
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: form.dueDate,
      status: 'ISSUED',
    };

    setInvoices([newInv, ...invoices]);
    setShowCreateModal(false);
    showToast(`Created GST Tax Invoice ${invNum}`, 'success');
  };

  const filteredInvoices = invoices.filter((i) => {
    const matchFilter = filter === 'ALL' || i.status === filter;
    const matchSearch =
      i.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#EDE7D6] tracking-tight">Invoices & B2B Billing</h2>
          <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
          <p className="text-xs text-[#8FA396] mt-1.5">
            Issue GST-compliant e-invoices with embedded payment links and automatic ledger reconciliation
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 rounded-[4px] bg-[#C9A227] hover:bg-[#d8b030] text-[#131B17] text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Create Tax Invoice
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08]">
          <span className="text-xs text-[#8FA396]">Total Invoiced (30D)</span>
          <div className="text-2xl font-bold font-mono text-[#EDE7D6] mt-1">₹3,25,680.00</div>
          <span className="text-[11px] text-[#8FA396]">Including 18% IGST/CGST</span>
        </div>

        <div className="p-4 rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08]">
          <span className="text-xs text-[#8FA396]">Paid Invoices</span>
          <div className="text-2xl font-bold font-mono text-[#4E8B6F] mt-1">₹99,120.00</div>
          <span className="text-[11px] text-[#4E8B6F]">Settled directly to Escrow</span>
        </div>

        <div className="p-4 rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08]">
          <span className="text-xs text-[#8FA396]">Pending Collection</span>
          <div className="text-2xl font-bold font-mono text-[#C9A227] mt-1">₹1,77,000.00</div>
          <span className="text-[11px] text-[#8FA396]">Due within 15 days</span>
        </div>

        <div className="p-4 rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08]">
          <span className="text-xs text-[#8FA396]">Overdue Invoices</span>
          <div className="text-2xl font-bold font-mono text-[#B0503F] mt-1">₹49,560.00</div>
          <span className="text-[11px] text-[#B0503F]">1 invoice overdue</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-4 rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {['ALL', 'ISSUED', 'PAID', 'OVERDUE', 'DRAFT'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-[4px] text-xs font-semibold transition-colors ${
                filter === st
                  ? 'bg-[#C9A227] text-[#131B17]'
                  : 'text-[#8FA396] hover:text-[#EDE7D6]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#8FA396] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search invoice number, client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 h-8 bg-[#131B17] border border-[#EDE7D6]/[0.12] rounded-[4px] pl-8 pr-3 text-xs text-[#EDE7D6] placeholder:text-[#8FA396]/60 focus:outline-none focus:border-[#C9A227]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#EDE7D6]/[0.08] bg-[#131B17]/60 text-[#8FA396] font-medium">
              <th className="py-3.5 px-4">Invoice #</th>
              <th className="py-3.5 px-4">Client / GSTIN</th>
              <th className="py-3.5 px-4">Subtotal + GST (18%)</th>
              <th className="py-3.5 px-4">Total Amount</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Due Date</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDE7D6]/[0.08]">
            {filteredInvoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-[#EDE7D6]/[0.02] transition-colors">
                <td className="py-3.5 px-4 font-mono font-medium text-[#EDE7D6]">{inv.invoiceNumber}</td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-[#EDE7D6]">{inv.customerName}</div>
                  <div className="text-[10px] text-[#8FA396] font-mono">GSTIN: {inv.customerGstin}</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-[#EDE7D6] font-mono">{inv.subtotal}</span>
                  <span className="text-[10px] text-[#8FA396] block font-mono">+ {inv.gstAmount} GST</span>
                </td>
                <td className="py-3.5 px-4 font-bold font-mono text-[#EDE7D6]">{inv.totalAmount}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border ${
                      inv.status === 'PAID'
                        ? 'border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5'
                        : inv.status === 'ISSUED'
                        ? 'border-[#C9A227] text-[#C9A227] bg-[#C9A227]/5'
                        : 'border-[#B0503F] text-[#B0503F] bg-[#B0503F]/5'
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#8FA396] font-mono">{inv.dueDate}</td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleDownloadPdf(inv.invoiceNumber)}
                      className="p-1.5 rounded-[4px] text-[#8FA396] hover:text-[#EDE7D6] hover:bg-[#131B17] transition-colors"
                      title="Download PDF Invoice"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleSendInvoice(inv.invoiceNumber)}
                      className="p-1.5 rounded-[4px] text-[#8FA396] hover:text-[#C9A227] hover:bg-[#131B17] transition-colors"
                      title="Send via Email / SMS"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-[#131B17]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateInvoice}
            className="bg-[#1D2E28] border border-[#EDE7D6]/[0.12] rounded-none w-full max-w-md p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#EDE7D6]/[0.08] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#EDE7D6]">Generate Tax Invoice</h3>
                <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
              </div>
              <button type="button" onClick={() => setShowCreateModal(false)} className="text-[#8FA396] hover:text-[#EDE7D6]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8FA396] mb-1 font-medium">Customer Business Legal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Dynamics Private Limited"
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                  className="w-full bg-[#131B17] border border-[#EDE7D6]/[0.12] rounded-[4px] px-3 py-2 text-[#EDE7D6] focus:outline-none focus:border-[#C9A227]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#8FA396] mb-1 font-medium">Customer GSTIN</label>
                <input
                  type="text"
                  placeholder="e.g. 27AAACU1234A1Z5"
                  value={form.customerGstin}
                  onChange={(e) => setForm({ ...form, customerGstin: e.target.value })}
                  className="w-full bg-[#131B17] border border-[#EDE7D6]/[0.12] rounded-[4px] px-3 py-2 text-[#EDE7D6] font-mono focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8FA396] mb-1 font-medium">Taxable Subtotal (₹)</label>
                  <input
                    type="number"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className="w-full bg-[#131B17] border border-[#EDE7D6]/[0.12] rounded-[4px] px-3 py-2 text-[#EDE7D6] font-mono font-bold focus:outline-none focus:border-[#C9A227]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#8FA396] mb-1 font-medium">HSN / SAC Code</label>
                  <input
                    type="text"
                    value={form.hsnCode}
                    onChange={(e) => setForm({ ...form, hsnCode: e.target.value })}
                    className="w-full bg-[#131B17] border border-[#EDE7D6]/[0.12] rounded-[4px] px-3 py-2 text-[#EDE7D6] font-mono focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8FA396] mb-1 font-medium">Payment Due Date</label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  className="w-full bg-[#131B17] border border-[#EDE7D6]/[0.12] rounded-[4px] px-3 py-2 text-[#EDE7D6] focus:outline-none focus:border-[#C9A227]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#EDE7D6]/[0.08]">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-[4px] bg-[#131B17] text-[#8FA396] text-xs font-medium hover:text-[#EDE7D6] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-[4px] bg-[#C9A227] hover:bg-[#d8b030] text-[#131B17] text-xs font-semibold transition-colors"
              >
                Issue Invoice
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
