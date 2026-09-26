import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SettlementOverviewCardProps {
  onNavigate?: (tab: string) => void;
}

export const SettlementOverviewCard: React.FC<SettlementOverviewCardProps> = ({ onNavigate }) => {
  return (
    <div className="p-6 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)] flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#EDE7D6]">Settlement Overview</h3>
          <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
          <p className="text-xs text-[#8FA396] mt-1">Nodal Escrow disbursement forecast</p>
        </div>
        <span className="px-2 py-0.5 rounded-[2px] text-[10px] font-mono font-bold text-[#4E8B6F] border border-[#4E8B6F] bg-[#4E8B6F]/5">
          BATCH READY
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-[#131B17] border border-[rgba(237,231,214,0.08)] space-y-1">
          <span className="text-[11px] text-[#8FA396]">Upcoming batch amount</span>
          <div className="text-lg font-bold font-mono text-[#EDE7D6] tabular-nums">₹3,41,200.00</div>
          <span className="text-[10px] text-[#8FA396] block font-mono">Net of 1.7% MDR + GST</span>
        </div>

        <div className="p-3 bg-[#131B17] border border-[rgba(237,231,214,0.08)] space-y-1">
          <span className="text-[11px] text-[#8FA396]">Expected transfer date</span>
          <div className="text-sm font-semibold font-mono text-[#EDE7D6]">Tomorrow, 06:00 IST</div>
          <span className="text-[10px] text-[#4E8B6F] flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3 h-3" /> T+1 Banking Cycle
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-[#131B17] border border-[rgba(237,231,214,0.08)] text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#4E8B6F]" />
          <div>
            <span className="text-[#EDE7D6] font-semibold">Reconciliation Status</span>
            <div className="text-[10px] text-[#8FA396]">0 exceptions / Balanced with Escrow Bank</div>
          </div>
        </div>

        <button
          onClick={() => onNavigate?.('settlements')}
          className="text-[#C9A227] hover:underline text-xs font-bold transition-colors"
        >
          View settlements
        </button>
      </div>
    </div>
  );
};
