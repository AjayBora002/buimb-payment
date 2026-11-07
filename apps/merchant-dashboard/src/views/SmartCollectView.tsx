import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Copy,
  CheckCircle2,
  Search,
  ExternalLink,
  ShieldCheck,
  ArrowDownLeft,
  QrCode,
  Download,
} from 'lucide-react';
import { useToast } from '../components/Toast.js';

interface VirtualAccount {
  id: string;
  customerName: string;
  vanNumber: string;
  ifsc: string;
  bankName: string;
  virtualUpi: string;
  totalReceived: string;
  status: 'ACTIVE' | 'CLOSED';
  createdAt: string;
}

export const SmartCollectView: React.FC = () => {
  const { showToast } = useToast();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [customerName, setCustomerName] = useState('Zenith Enterprises Ltd');
  const [customerEmail, setCustomerEmail] = useState('finance@zenithenterprises.com');

  const [virtualAccounts, setVirtualAccounts] = useState<VirtualAccount[]>([
    {
      id: 'va_Nx98811Klp01',
      customerName: 'Zenith Enterprises Ltd',
      vanNumber: 'BUIMPBORA892019',
      ifsc: 'ICIC0000104',
      bankName: 'ICICI Bank Nodal',
      virtualUpi: 'bora.zenith@icici',
      totalReceived: '₹2,45,000.00',
      status: 'ACTIVE',
      createdAt: '3 days ago',
    },
    {
      id: 'va_Nx87722Mlo02',
      customerName: 'Apex Logistics LLP',
      vanNumber: 'BUIMPBORA892020',
      ifsc: 'ICIC0000104',
      bankName: 'ICICI Bank Nodal',
      virtualUpi: 'bora.apex@icici',
      totalReceived: '₹5,12,800.00',
      status: 'ACTIVE',
      createdAt: '1 week ago',
    },
    {
      id: 'va_Nx76633Nmn03',
      customerName: 'Nexus Cloud Infrastructure',
      vanNumber: 'BUIMPBORA892021',
      ifsc: 'ICIC0000104',
      bankName: 'ICICI Bank Nodal',
      virtualUpi: 'bora.nexus@icici',
      totalReceived: '₹1,20,000.00',
      status: 'ACTIVE',
      createdAt: '2 weeks ago',
    },
  ]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard`, 'success');
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const rand = Math.floor(100000 + Math.random() * 900000);
    const slug = customerName.toLowerCase().replace(/[^a-z0-9]+/g, '');
    const newVA: VirtualAccount = {
      id: `va_${Math.random().toString(36).substring(2, 14)}`,
      customerName,
      vanNumber: `BUIMPBORA${rand}`,
      ifsc: 'ICIC0000104',
      bankName: 'ICICI Bank Nodal',
      virtualUpi: `bora.${slug.substring(0, 10)}@icici`,
      totalReceived: '₹0.00',
      status: 'ACTIVE',
      createdAt: 'Just now',
    };
    setVirtualAccounts([newVA, ...virtualAccounts]);
    setShowCreateModal(false);
    showToast(`Created Virtual Account for ${customerName}`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Smart Collect (Virtual Accounts)</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
              NEFT / RTGS / IMPS Reconciliation
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Assign dedicated Virtual Account Numbers (VAN) & Virtual UPI IDs to customers for 100% automated ledger matching.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm shadow-blue-600/30 self-start"
        >
          <Plus className="w-4 h-4" />
          + Create Virtual Account
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500">Active Virtual Accounts</span>
          <div className="text-2xl font-bold text-slate-900">{virtualAccounts.length}</div>
          <span className="text-[11px] text-emerald-600 font-semibold">100% automated NEFT matching</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500">Total B2B Collections</span>
          <div className="text-2xl font-bold text-slate-900 font-mono">₹8,77,800.00</div>
          <span className="text-[11px] text-slate-400">Zero manual UTR reconciliation needed</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500">Bank Integration Partner</span>
          <div className="text-lg font-bold text-blue-600 flex items-center gap-1.5">
            <Building2 className="w-4 h-4" /> ICICI Bank Nodal API
          </div>
          <span className="text-[11px] text-slate-400">Real-time webhook notifications</span>
        </div>
      </div>

      {/* Virtual Accounts Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Assigned Customer Virtual Accounts</h3>
          <span className="text-xs text-slate-500 font-medium">{virtualAccounts.length} Virtual Accounts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider bg-slate-50">
                <th className="py-2.5 px-4">Customer Name</th>
                <th className="py-2.5 px-4">Virtual Account (VAN)</th>
                <th className="py-2.5 px-4">IFSC Code</th>
                <th className="py-2.5 px-4">Virtual UPI ID</th>
                <th className="py-2.5 px-4">Total Collected</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {virtualAccounts.map((va) => (
                <tr key={va.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{va.customerName}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 font-mono font-bold text-blue-600">
                      <span>{va.vanNumber}</span>
                      <button
                        onClick={() => copyToClipboard(va.vanNumber, 'VAN')}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{va.ifsc}</td>
                  <td className="py-3 px-4 font-mono text-slate-700">{va.virtualUpi}</td>
                  <td className="py-3 px-4 font-bold font-mono text-emerald-600">{va.totalReceived}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {va.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => showToast(`Simulated test NEFT credit of ₹50,000 to ${va.vanNumber}`, 'success')}
                      className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-[11px] transition-colors"
                    >
                      Simulate NEFT
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Create Dedicated Virtual Account</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer / Business Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer Billing Email
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-800">Generated Virtual Rails:</div>
                <div>• Unique Account: BUIMPBORA•••••• (ICICI Bank)</div>
                <div>• Dedicated UPI: bora.customer@icici</div>
                <div>• Instant Webhook: <span className="font-mono text-blue-600">virtual_account.credited</span></div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                >
                  Generate Virtual Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
