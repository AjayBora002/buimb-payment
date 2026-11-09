import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, Building2, Landmark } from 'lucide-react';
export const KycSettingsView = () => {
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
    return (<div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-[#0f172a] tracking-tight">Settings & KYC Due Diligence</h2>
        <div className="w-8 h-0.5 bg-[#0b63e5] mt-1"/>
        <p className="text-xs text-[#64748b] mt-1.5">
          Regulatory compliance status, business identification, and production enablement roadmap
        </p>
      </div>

      {/* Compliance Roadmap Card */}
      <div className="p-6 rounded-none bg-[white] border border-[#0f172a]/[0.08] space-y-6">
        <div className="flex items-center justify-between border-b border-[#0f172a]/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-[2px] bg-[#f8fafc] text-[#0b63e5] border border-[#0f172a]/[0.12]">
              <ShieldCheck className="w-5 h-5"/>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0f172a]">Production Enablement Roadmap</h3>
              <p className="text-xs text-[#64748b]">
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
          {steps.map((step, idx) => (<div key={idx} className="flex items-start gap-3.5">
              <div className="mt-0.5">
                {step.status === 'COMPLETED' || step.status === 'VERIFIED' ? (<CheckCircle2 className="w-4 h-4 text-[#4E8B6F]"/>) : step.status === 'IN_PROGRESS' ? (<Clock className="w-4 h-4 text-[#C98A2E] animate-spin"/>) : (<div className="w-4 h-4 rounded-none border border-[#0f172a]/[0.2] bg-[#f8fafc]"/>)}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#0f172a]">{step.title}</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-[2px] border ${step.status === 'COMPLETED' || step.status === 'VERIFIED'
                ? 'border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5'
                : step.status === 'IN_PROGRESS'
                    ? 'border-[#C98A2E] text-[#C98A2E] bg-[#C98A2E]/5'
                    : 'border-[#0f172a]/[0.15] text-[#64748b] bg-[#f8fafc]'}`}>
                    {step.status}
                  </span>
                </div>
                <p className="text-xs text-[#64748b]">{step.description}</p>
              </div>
            </div>))}
        </div>
      </div>

      {/* Business Details & Bank Account Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Entity */}
        <div className="p-5 rounded-none bg-[white] border border-[#0f172a]/[0.08] space-y-4">
          <div className="flex items-center gap-2 text-[#0f172a] font-semibold text-sm">
            <Building2 className="w-4 h-4 text-[#0b63e5]"/>
            Registered Business Entity
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-[#0f172a]/[0.08] pb-2">
              <span className="text-[#64748b]">Legal Entity Name</span>
              <span className="text-[#0f172a] font-medium">Buimb Technologies Private Limited</span>
            </div>
            <div className="flex justify-between border-b border-[#0f172a]/[0.08] pb-2">
              <span className="text-[#64748b]">Business Structure</span>
              <span className="text-[#0f172a] font-medium">Private Limited Company</span>
            </div>
            <div className="flex justify-between border-b border-[#0f172a]/[0.08] pb-2">
              <span className="text-[#64748b]">Company PAN</span>
              <span className="font-mono text-[#0f172a]">AAACB••••F</span>
            </div>
            <div className="flex justify-between border-b border-[#0f172a]/[0.08] pb-2">
              <span className="text-[#64748b]">GSTIN</span>
              <span className="font-mono text-[#0f172a]">27AAACB1234F1Z5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">Corporate Identity Number (CIN)</span>
              <span className="font-mono text-[#0f172a]">U72200MH2024PTC123456</span>
            </div>
          </div>
        </div>

        {/* Primary Settlement Account */}
        <div className="p-5 rounded-none bg-[white] border border-[#0f172a]/[0.08] space-y-4">
          <div className="flex items-center gap-2 text-[#0f172a] font-semibold text-sm">
            <Landmark className="w-4 h-4 text-[#4E8B6F]"/>
            Settlement Bank Account
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-[#0f172a]/[0.08] pb-2">
              <span className="text-[#64748b]">Bank Name</span>
              <span className="text-[#0f172a] font-medium">HDFC Bank Limited</span>
            </div>
            <div className="flex justify-between border-b border-[#0f172a]/[0.08] pb-2">
              <span className="text-[#64748b]">Account Type</span>
              <span className="text-[#0f172a] font-medium">Current Account</span>
            </div>
            <div className="flex justify-between border-b border-[#0f172a]/[0.08] pb-2">
              <span className="text-[#64748b]">Account Number</span>
              <span className="font-mono text-[#0f172a]">•••• •••• •••• 9102</span>
            </div>
            <div className="flex justify-between border-b border-[#0f172a]/[0.08] pb-2">
              <span className="text-[#64748b]">IFSC Code</span>
              <span className="font-mono text-[#0f172a]">HDFC0000128</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">Penny Drop Verification</span>
              <span className="text-[#4E8B6F] font-semibold flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5"/>
                Name Match Confirmed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
