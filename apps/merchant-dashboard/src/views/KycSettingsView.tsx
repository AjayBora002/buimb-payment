import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, AlertCircle, Building2, Landmark, FileText } from 'lucide-react';

export const KycSettingsView: React.FC = () => {
  const steps = [
    {
      title: 'Sandbox Integration & Test Transactions',
      description: 'Test API keys generated, simulated orders created and successfully captured via MockProvider.',
      status: 'COMPLETED',
    },
    {
      title: 'Business KYC & Legal Document Due Diligence',
      description: 'PAN, Certificate of Incorporation, Board Resolution and Beneficial Ownership verified.',
      status: 'VERIFIED',
    },
    {
      title: 'Escrow Account Agreement & Settlement Mandate',
      description: 'Nodal / Escrow account arrangement with partner schedule commercial bank per RBI guidelines.',
      status: 'IN_PROGRESS',
    },
    {
      title: 'PCI-DSS Level 1 Audit & External Penetration Testing',
      description: 'Card data environment isolation, TLS 1.3 enforcement, zero-cardholder-data-storage verification.',
      status: 'IN_PROGRESS',
    },
    {
      title: 'Live Production Gateway Activation',
      description: 'Final security, legal, and operational sign-off to switch PAYMENT_PRODUCTION_ENABLED to true.',
      status: 'PENDING',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#EDE7D6] tracking-tight">Settings & KYC Due Diligence</h2>
        <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
        <p className="text-xs text-[#8FA396] mt-1.5">
          Regulatory compliance status, business identification, and production enablement roadmap
        </p>
      </div>

      {/* Compliance Roadmap Card */}
      <div className="p-6 rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08] space-y-6">
        <div className="flex items-center justify-between border-b border-[#EDE7D6]/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-[2px] bg-[#131B17] text-[#C9A227] border border-[#EDE7D6]/[0.12]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#EDE7D6]">Production Enablement Roadmap</h3>
              <p className="text-xs text-[#8FA396]">
                To accept real customer payments in India, all 5 compliance and banking milestones must be approved.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-[2px] font-mono text-xs font-bold border border-[#C98A2E] text-[#C98A2E] bg-[#C98A2E]/5">
            Current Stage: Milestones 3 & 4
          </span>
        </div>

        {/* Steps Timeline */}
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3.5">
              <div className="mt-0.5">
                {step.status === 'COMPLETED' || step.status === 'VERIFIED' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#4E8B6F]" />
                ) : step.status === 'IN_PROGRESS' ? (
                  <Clock className="w-4 h-4 text-[#C98A2E] animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-none border border-[#EDE7D6]/[0.2] bg-[#131B17]" />
                )}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#EDE7D6]">{step.title}</span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-[2px] border ${
                      step.status === 'COMPLETED' || step.status === 'VERIFIED'
                        ? 'border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5'
                        : step.status === 'IN_PROGRESS'
                        ? 'border-[#C98A2E] text-[#C98A2E] bg-[#C98A2E]/5'
                        : 'border-[#EDE7D6]/[0.15] text-[#8FA396] bg-[#131B17]'
                    }`}
                  >
                    {step.status}
                  </span>
                </div>
                <p className="text-xs text-[#8FA396]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business Details & Bank Account Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Entity */}
        <div className="p-5 rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08] space-y-4">
          <div className="flex items-center gap-2 text-[#EDE7D6] font-semibold text-sm">
            <Building2 className="w-4 h-4 text-[#C9A227]" />
            Registered Business Entity
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-[#EDE7D6]/[0.08] pb-2">
              <span className="text-[#8FA396]">Legal Entity Name</span>
              <span className="text-[#EDE7D6] font-medium">Buimb Technologies Private Limited</span>
            </div>
            <div className="flex justify-between border-b border-[#EDE7D6]/[0.08] pb-2">
              <span className="text-[#8FA396]">Business Structure</span>
              <span className="text-[#EDE7D6] font-medium">Private Limited Company</span>
            </div>
            <div className="flex justify-between border-b border-[#EDE7D6]/[0.08] pb-2">
              <span className="text-[#8FA396]">Company PAN</span>
              <span className="font-mono text-[#EDE7D6]">AAACB••••F</span>
            </div>
            <div className="flex justify-between border-b border-[#EDE7D6]/[0.08] pb-2">
              <span className="text-[#8FA396]">GSTIN</span>
              <span className="font-mono text-[#EDE7D6]">27AAACB1234F1Z5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8FA396]">Corporate Identity Number (CIN)</span>
              <span className="font-mono text-[#EDE7D6]">U72200MH2024PTC123456</span>
            </div>
          </div>
        </div>

        {/* Primary Settlement Account */}
        <div className="p-5 rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08] space-y-4">
          <div className="flex items-center gap-2 text-[#EDE7D6] font-semibold text-sm">
            <Landmark className="w-4 h-4 text-[#4E8B6F]" />
            Settlement Bank Account
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-[#EDE7D6]/[0.08] pb-2">
              <span className="text-[#8FA396]">Bank Name</span>
              <span className="text-[#EDE7D6] font-medium">HDFC Bank Limited</span>
            </div>
            <div className="flex justify-between border-b border-[#EDE7D6]/[0.08] pb-2">
              <span className="text-[#8FA396]">Account Type</span>
              <span className="text-[#EDE7D6] font-medium">Current Account</span>
            </div>
            <div className="flex justify-between border-b border-[#EDE7D6]/[0.08] pb-2">
              <span className="text-[#8FA396]">Account Number</span>
              <span className="font-mono text-[#EDE7D6]">•••• •••• •••• 9102</span>
            </div>
            <div className="flex justify-between border-b border-[#EDE7D6]/[0.08] pb-2">
              <span className="text-[#8FA396]">IFSC Code</span>
              <span className="font-mono text-[#EDE7D6]">HDFC0000128</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8FA396]">Penny Drop Verification</span>
              <span className="text-[#4E8B6F] font-semibold flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Name Match Confirmed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
