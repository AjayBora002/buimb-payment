import React, { useState } from 'react';
import { Download, Calendar, FileCheck, } from 'lucide-react';
import { useToast } from '../components/Toast.jsx';
export const ReportsView = () => {
    const { showToast } = useToast();
    const [dateRange, setDateRange] = useState('Past 30 Days (Sep 01 - Sep 30, 2026)');
    const templates = [
        {
            id: 'payments-report',
            name: 'Payments & Transactions Master Report',
            desc: 'Complete ledger of all customer payments with gateway fee, GST, VPA/Card BIN, RRN, and settlement status.',
            category: 'Transactions',
            format: 'CSV',
            lastGenerated: 'Today, 14:30',
        },
        {
            id: 'settlements-report',
            name: 'Settlement Reconciliation Ledger',
            desc: 'Line-by-line settlement credit breakdown matching bank statement UTRs and escrow transfers.',
            category: 'Settlements',
            format: 'CSV',
            lastGenerated: 'Yesterday',
        },
        {
            id: 'refunds-report',
            name: 'Refunds & Adjustments Report',
            desc: 'All processed refunds, instant payout deductions, reversal ARN references, and customer identifiers.',
            category: 'Refunds',
            format: 'CSV',
            lastGenerated: '3 days ago',
        },
        {
            id: 'gst-tax-invoice',
            name: 'Monthly GST Tax Invoices (Form GSTR-1)',
            desc: 'Monthly tax invoice detailing MDR processing fees and 18% CGST/SGST/IGST breakdown for Input Tax Credit (ITC).',
            category: 'Tax & Compliance',
            format: 'XLSX',
            lastGenerated: 'Sep 01, 2026',
        },
        {
            id: 'disputes-report',
            name: 'Chargebacks & Representment Summary',
            desc: 'Log of all bank dispute claims, customer reasons, evidence submission dates, and won/lost determinations.',
            category: 'Risk',
            format: 'CSV',
            lastGenerated: '1 week ago',
        },
    ];
    const handleDownload = (t) => {
        showToast(`Generating & downloading ${t.name} (${t.format})...`, 'success');
    };
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Reports Center</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Automated Financial Exports
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Download comprehensive audit reports for accounting, tax filings, and bank reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400"/>
            <span className="font-medium">{dateRange}</span>
          </div>
        </div>
      </div>

      {/* Templates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((t) => (<div key={t.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                  {t.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {t.format}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {t.name}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Last run: {t.lastGenerated}</span>
              <button onClick={() => handleDownload(t)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm shadow-blue-600/20">
                <Download className="w-3.5 h-3.5"/>
                Download {t.format}
              </button>
            </div>
          </div>))}
      </div>

      {/* Scheduled Reports Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-600"/>
            <h4 className="text-sm font-bold text-slate-900">Daily Automated Email Reports</h4>
          </div>
          <p className="text-xs text-slate-500">
            Send daily settlement summaries and monthly GST invoices automatically to <span className="font-semibold text-slate-700">finance@boraenterprises.in</span>
          </p>
        </div>

        <button onClick={() => showToast('Scheduled daily dispatch preferences saved', 'success')} className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold self-start sm:self-center transition-colors">
          Configure Schedule
        </button>
      </div>
    </div>);
};
