import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export const SandboxBanner: React.FC = () => {
  return (
    <div className="bg-[#131B17] border-b border-[rgba(237,231,214,0.12)] px-4 py-2 text-xs flex items-center justify-between text-[#EDE7D6]">
      <div className="flex items-center gap-2">
        <span className="bg-[#C9A227] text-[#131B17] font-mono font-bold px-2 py-0.5 rounded-[2px] text-[10px] tracking-wider uppercase">
          SANDBOX MODE
        </span>
        <span className="font-medium text-[#EDE7D6]/90">
          Simulated transactions only. Real money processing remains strictly disabled.
        </span>
      </div>
      <div className="flex items-center gap-4 text-[#8FA396]">
        <span className="flex items-center gap-1 font-mono text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4E8B6F]" />
          PCI & Regulatory Compliance In Progress
        </span>
        <a
          href="#settings-kyc"
          className="text-[#C9A227] hover:underline font-mono text-xs font-semibold"
        >
          View Checklist
        </a>
      </div>
    </div>
  );
};
