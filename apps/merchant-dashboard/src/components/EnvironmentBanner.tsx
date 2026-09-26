import React, { useState } from 'react';
import { ShieldCheck, X, CheckCircle2, Clock } from 'lucide-react';

interface EnvironmentBannerProps {
  onOpenChecklist?: () => void;
}

export const EnvironmentBanner: React.FC<EnvironmentBannerProps> = () => {
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [showEnvDetailsModal, setShowEnvDetailsModal] = useState(false);

  const checks = [
    { title: 'Regulatory Compliance Architecture Review', status: 'COMPLETE', category: 'Legal & RBI' },
    { title: 'Zero-PAN Card Security & Tokenisation Specification', status: 'COMPLETE', category: 'PCI-DSS' },
    { title: 'Simulated Banking Rail & MockProvider Verification', status: 'COMPLETE', category: 'Core Payments' },
    { title: 'HMAC Webhook Signature Replay-Defense Testing', status: 'COMPLETE', category: 'API Security' },
    { title: 'Double-Entry Ledger & Cryptographic Chain Verification', status: 'COMPLETE', category: 'Financial Audit' },
    { title: 'Incident Response & Fallback Protocols Scaffolding', status: 'COMPLETE', category: 'DevSecOps' },
    { title: 'Scheduled Commercial Bank Nodal Escrow Execution', status: 'PENDING', category: 'Banking Partner' },
    { title: 'Independent PCI-DSS Level 1 QSA Audit Assessment', status: 'PENDING', category: 'Security QSA' },
    { title: 'Production Core Banking Terminal Allocation', status: 'PENDING', category: 'Banking Partner' },
    { title: 'Reserve Bank of India (RBI) PA Final Authorisation', status: 'PENDING', category: 'Regulatory' },
  ];

  const completedCount = checks.filter((c) => c.status === 'COMPLETE').length;
  const progressPercent = Math.round((completedCount / checks.length) * 100);

  return (
    <div className="space-y-4">
      {/* 1. Level 1: Compact Top Environment Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)] text-xs">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#C98A2E]/10 text-[#C98A2E] font-mono font-bold text-[10px] tracking-wider border border-[#C98A2E]">
            <span className="w-1.5 h-1.5 bg-[#C98A2E]" />
            SANDBOX
          </span>
          <span className="text-[#8FA396]">
            Test transactions only / Real money payment processing remains deactivated
          </span>
        </div>

        <button
          onClick={() => setShowEnvDetailsModal(true)}
          className="text-[#C9A227] hover:underline font-bold transition-colors inline-flex items-center gap-1 text-[11px]"
        >
          View environment details
        </button>
      </div>

      {/* 2. Level 2: Production Readiness Status Panel */}
      <div className="p-5 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
            <h3 className="text-sm font-bold text-[#EDE7D6] tracking-tight">Production Readiness</h3>
            <span className="px-2 py-0.5 rounded-[2px] text-[10px] font-mono font-bold text-[#C9A227] border border-[#C9A227]">
              {completedCount} of {checks.length} checks complete
            </span>
          </div>
          <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
          <p className="text-xs text-[#8FA396] leading-relaxed mt-1">
            Complete the required compliance, security, banking, and operational milestones before requesting live payment gateway access.
          </p>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Subtle Progress Gauge */}
          <div className="flex flex-col items-end gap-1 min-w-[120px]">
            <div className="flex items-center justify-between w-full text-[11px] text-[#8FA396] font-mono">
              <span>Progress</span>
              <span className="font-bold text-[#EDE7D6] tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#131B17] border border-[rgba(237,231,214,0.08)]">
              <div
                className="h-full bg-[#C9A227] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setShowChecklistModal(true)}
            className="px-3.5 py-2 rounded-[4px] bg-[#131B17] hover:bg-[#243831] text-[#EDE7D6] text-xs font-bold border border-[rgba(237,231,214,0.12)] transition-colors"
          >
            View checklist
          </button>
        </div>
      </div>

      {/* Production Readiness Checklist Modal */}
      {showChecklistModal && (
        <div className="fixed inset-0 bg-[#131B17]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1D2E28] border border-[rgba(237,231,214,0.15)] rounded-[4px] w-full max-w-2xl p-6 space-y-6 max-h-[90vh] flex flex-col text-[#EDE7D6]">
            <div className="flex items-center justify-between border-b border-[rgba(237,231,214,0.08)] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#EDE7D6]">Production Readiness Audit Checklist</h3>
                <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
                <p className="text-xs text-[#8FA396] mt-1">
                  Governed by Reserve Bank of India (RBI) PA guidelines & PCI-DSS standards
                </p>
              </div>
              <button
                onClick={() => setShowChecklistModal(false)}
                className="p-1.5 rounded-[4px] text-[#8FA396] hover:text-[#EDE7D6] hover:bg-[#131B17] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {checks.map((check, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#131B17] border border-[rgba(237,231,214,0.08)] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    {check.status === 'COMPLETE' ? (
                      <CheckCircle2 className="w-4 h-4 text-[#4E8B6F] flex-shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 text-[#C98A2E] flex-shrink-0" />
                    )}
                    <div>
                      <div className="font-semibold text-[#EDE7D6]">{check.title}</div>
                      <div className="text-[10px] text-[#8FA396]">{check.category}</div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-[2px] text-[10px] font-mono font-bold border ${
                      check.status === 'COMPLETE'
                        ? 'border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5'
                        : 'border-[#C98A2E] text-[#C98A2E] bg-[#C98A2E]/5'
                    }`}
                  >
                    {check.status === 'COMPLETE' ? 'Completed' : 'Action Pending'}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[rgba(237,231,214,0.08)] text-xs">
              <span className="text-[#8FA396]">
                Live terminal activation requires 100% completion & signed Escrow deed.
              </span>
              <button
                onClick={() => setShowChecklistModal(false)}
                className="px-4 py-2 rounded-[4px] bg-[#C9A227] hover:bg-[#DBB53B] text-[#131B17] font-bold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Environment Details Modal */}
      {showEnvDetailsModal && (
        <div className="fixed inset-0 bg-[#131B17]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1D2E28] border border-[rgba(237,231,214,0.15)] rounded-[4px] w-full max-w-md p-6 space-y-5 text-[#EDE7D6]">
            <div className="flex items-center justify-between border-b border-[rgba(237,231,214,0.08)] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#EDE7D6]">Sandbox Environment Details</h3>
                <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
              </div>
              <button
                onClick={() => setShowEnvDetailsModal(false)}
                className="text-[#8FA396] hover:text-[#EDE7D6]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#131B17] border border-[rgba(237,231,214,0.08)] space-y-1">
                <span className="text-[#8FA396]">Current Mode</span>
                <div className="font-bold text-[#C98A2E]">Certified Development Sandbox</div>
              </div>
              <div className="p-3 bg-[#131B17] border border-[rgba(237,231,214,0.08)] space-y-1">
                <span className="text-[#8FA396]">Provider Rail</span>
                <div className="font-semibold text-[#EDE7D6]">MockProvider (In-Memory Simulator)</div>
              </div>
              <div className="p-3 bg-[#131B17] border border-[rgba(237,231,214,0.08)] space-y-1">
                <span className="text-[#8FA396]">Production Gateway Status</span>
                <div className="font-bold text-[#B0503F]">Strictly Deactivated (Zero Live Processing)</div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowEnvDetailsModal(false)}
                className="px-4 py-1.5 rounded-[4px] bg-[#131B17] text-[#EDE7D6] text-xs font-semibold hover:bg-[#243831] border border-[rgba(237,231,214,0.08)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
