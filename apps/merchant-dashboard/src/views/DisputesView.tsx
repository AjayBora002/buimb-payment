import React, { useState } from 'react';
import {
  AlertTriangle,
  Upload,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { useToast } from '../components/Toast.js';

interface Dispute {
  id: string;
  paymentId: string;
  amount: string;
  reason: string;
  bankName: string;
  status: 'ACTION_REQUIRED' | 'UNDER_REVIEW' | 'WON' | 'LOST';
  respondBy: string;
  customerEmail: string;
  createdAt: string;
}

export const DisputesView: React.FC = () => {
  const { showToast } = useToast();
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [evidenceNote, setEvidenceNote] = useState('');
  const [evidenceFile, setEvidenceFile] = useState<string | null>('delivery_proof_courier_signed.pdf');

  const [disputes, setDisputes] = useState<Dispute[]>([
    {
      id: 'disp_Nx89911Klp01',
      paymentId: 'pay_Nx89911Klp01',
      amount: '₹4,500.00',
      reason: 'Fraudulent - Cardholder claims transaction was not authorized',
      bankName: 'HDFC Bank Ltd',
      status: 'ACTION_REQUIRED',
      respondBy: 'In 3 days (Oct 01, 2026)',
      customerEmail: 'cardholder.alert@hdfcbank.net',
      createdAt: 'Yesterday',
    },
    {
      id: 'disp_Nx78822Mlo02',
      paymentId: 'pay_Nx78822Mlo02',
      amount: '₹1,250.00',
      reason: 'Product not received or delivered damaged',
      bankName: 'ICICI Bank Ltd',
      status: 'UNDER_REVIEW',
      respondBy: 'Submitted on Sep 26',
      customerEmail: 'customer.support@icicibank.com',
      createdAt: '4 days ago',
    },
    {
      id: 'disp_Nx67733Nmn03',
      paymentId: 'pay_Nx67733Nmn03',
      amount: '₹8,900.00',
      reason: 'Cardholder unrecognized charge',
      bankName: 'State Bank of India',
      status: 'WON',
      respondBy: 'Closed on Sep 20',
      customerEmail: 'sbi.disputes@sbi.co.in',
      createdAt: '10 days ago',
    },
  ]);

  const handleSubmitEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDispute) return;
    setDisputes(
      disputes.map((d) => (d.id === selectedDispute.id ? { ...d, status: 'UNDER_REVIEW', respondBy: 'Submitted today' } : d))
    );
    setSelectedDispute(null);
    showToast('Evidence package submitted to Issuing Bank representment queue', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Disputes & Chargebacks</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              Bank Representment
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage customer chargebacks, contest fraudulent claims, and submit proof of delivery to card networks.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500">Active Disputes</span>
          <div className="text-2xl font-bold text-amber-600">1 Action Required</div>
          <span className="text-[11px] text-slate-400">Respond within 3 business days</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500">Chargeback Win Rate</span>
          <div className="text-2xl font-bold text-emerald-600">85.7%</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Exceeds Visa/Mastercard industry avg</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-medium text-slate-500">Dispute Ratio</span>
          <div className="text-2xl font-bold text-slate-900 font-mono">0.08%</div>
          <span className="text-[11px] text-slate-400">Well below Visa 0.9% threshold</span>
        </div>
      </div>

      {/* Disputes Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Chargeback Cases</h3>
          <span className="text-xs text-slate-500">{disputes.length} Total Cases</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider bg-slate-50">
                <th className="py-2.5 px-4">Dispute ID</th>
                <th className="py-2.5 px-4">Payment ID</th>
                <th className="py-2.5 px-4">Amount</th>
                <th className="py-2.5 px-4">Reason / Claim</th>
                <th className="py-2.5 px-4">Issuing Bank</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Deadline</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {disputes.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{d.id}</td>
                  <td className="py-3 px-4 font-mono text-blue-600">{d.paymentId}</td>
                  <td className="py-3 px-4 font-bold font-mono text-rose-600">{d.amount}</td>
                  <td className="py-3 px-4 max-w-xs truncate text-slate-600" title={d.reason}>
                    {d.reason}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{d.bankName}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        d.status === 'ACTION_REQUIRED'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                          : d.status === 'UNDER_REVIEW'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : d.status === 'WON'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {d.status === 'ACTION_REQUIRED' && <AlertTriangle className="w-2.5 h-2.5" />}
                      {d.status === 'WON' && <CheckCircle2 className="w-2.5 h-2.5" />}
                      {d.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{d.respondBy}</td>
                  <td className="py-3 px-4 text-right">
                    {d.status === 'ACTION_REQUIRED' ? (
                      <button
                        onClick={() => setSelectedDispute(d)}
                        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition-all shadow-xs"
                      >
                        Submit Evidence
                      </button>
                    ) : (
                      <button
                        onClick={() => showToast(`Viewing evidence file for ${d.id}`, 'info')}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors"
                      >
                        View Case
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evidence Submission Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Submit Chargeback Evidence</h3>
                <span className="text-[11px] text-slate-400 font-mono">{selectedDispute.id} · {selectedDispute.amount}</span>
              </div>
              <button onClick={() => setSelectedDispute(null)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitEvidence} className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  Cardholder Dispute Claim:
                </div>
                <p className="text-[11px] text-amber-800">{selectedDispute.reason}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Merchant Explanation / Defense Statement
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detail the fulfillment timeline, customer communications, IP confirmation..."
                  value={evidenceNote}
                  onChange={(e) => setEvidenceNote(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Supporting Document Package (PDF / PNG)
                </label>
                <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-lg flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-slate-700">{evidenceFile}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Selected new file: invoice_receipt.pdf', 'info')}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Change File
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedDispute(null)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                >
                  Submit to Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
