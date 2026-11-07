import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useToast } from './Toast.jsx';
export const SettlementOverviewCard = ({ onNavigate }) => {
    const { showToast } = useToast();
    return (<div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Settlement Overview</h3>
          <p className="text-xs text-slate-500 mt-0.5">Escrow bank payout forecast & UTR matching</p>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
          T+1 SCHEDULE
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
          <span className="text-[11px] text-slate-500">Upcoming payout batch</span>
          <div className="text-xl font-bold font-mono text-slate-900">₹84,200.00</div>
          <span className="text-[10px] text-slate-400 block font-mono">Net of 2.0% MDR + GST</span>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
          <span className="text-[11px] text-slate-500">Deposit bank account</span>
          <div className="text-xs font-bold text-slate-800">HDFC Bank •••• 4891</div>
          <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3 h-3"/> Penny Drop Verified
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600"/>
          <div>
            <span className="text-slate-800 font-semibold">Bank Escrow Balanced</span>
            <div className="text-[10px] text-slate-500">Zero variance across clearing cycles</div>
          </div>
        </div>

        <button onClick={() => onNavigate?.('settlements')} className="text-blue-600 hover:text-blue-700 text-xs font-bold flex items-center gap-1 transition-colors">
          View Settlements
          <ArrowRight className="w-3.5 h-3.5"/>
        </button>
      </div>
    </div>);
};
