import React from 'react';
import Link from 'next/link';
import {
  Briefcase, ArrowRight, CheckCircle2, Users, FileText, Calculator,
  Globe, Shield, BadgeCheck, Clock, Zap, BarChart3, Settings,
} from 'lucide-react';

const PLAN_TIERS = [
  {
    name: 'Startup',
    price: '₹1,499',
    per: '/month up to 25 employees',
    color: 'blue',
    features: [
      'Salary disbursement via NEFT/IMPS',
      'Payslip generation & email delivery',
      'PF / ESI / PT auto-calculation',
      'Form 16 generation (annual)',
      'Basic TDS computation',
      'Employee self-service portal',
    ],
  },
  {
    name: 'Growth',
    price: '₹4,999',
    per: '/month up to 200 employees',
    color: 'indigo',
    highlight: true,
    features: [
      'Everything in Startup +',
      'Reimbursement workflows',
      'New vs Old Tax Regime comparison',
      'Contractor / freelancer payments',
      'GSTR filing helpers',
      'HR letter generation',
      'Attendance & Leave management',
      'CTC structuring tool',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    per: '201+ employees',
    color: 'purple',
    features: [
      'Everything in Growth +',
      'HRMS integration (Zoho, BambooHR)',
      'Multi-location payroll',
      'Gratuity & bonus calculations',
      'Statutory audit support',
      'Dedicated payroll manager',
      '4-hour SLA on queries',
      'Custom API access',
    ],
  },
];

const COMPLIANCE = [
  { label: 'Provident Fund (PF)', law: 'EPF & MP Act, 1952', auto: true },
  { label: 'Employee State Insurance (ESI)', law: 'ESI Act, 1948', auto: true },
  { label: 'Professional Tax (PT)', law: 'State-specific', auto: true },
  { label: 'TDS on Salary', law: 'Section 192 ITA', auto: true },
  { label: 'Labour Welfare Fund (LWF)', law: 'State-specific', auto: true },
  { label: 'Gratuity Act', law: 'Payment of Gratuity Act, 1972', auto: false },
];

export default function PayrollPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/8 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-semibold mb-6">
              <Briefcase className="w-3.5 h-3.5" /> Payroll & Compliance
            </div>
            <h1 className="text-5xl font-black tracking-tight leading-tight mb-6">
              Payroll that files<br />
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                itself.
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Run fully compliant payroll in 5 clicks. Auto-compute PF, ESI, TDS, and PT. Disburse salaries, generate payslips, and file challans — all automated.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="http://localhost:5173" target="_blank" rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all">
                Start Payroll Free <ArrowRight className="w-4 h-4" />
              </a>
              <Link href="/contact" className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all">
                Talk to Payroll Expert
              </Link>
            </div>
            <div className="flex flex-wrap gap-5 mt-6 text-xs text-slate-400">
              {['Auto PF / ESI / TDS', '5-click payroll run', 'ESIC challan filing', 'Form 16 generation'].map(f => (
                <span key={f} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />{f}</span>
              ))}
            </div>
          </div>

          {/* Payroll Run Preview */}
          <div className="bg-[#070B16] rounded-3xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-white">September 2026 Payroll</div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">✓ Filed</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Gross Salary', value: '₹24,50,000' },
                { label: 'PF (Employer)', value: '₹2,10,600' },
                { label: 'TDS Deducted', value: '₹1,82,400' },
                { label: 'Net Disbursed', value: '₹20,57,000' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-900/60 rounded-xl p-3 border border-slate-800">
                  <div className="text-xs text-slate-500">{label}</div>
                  <div className="text-base font-black text-white">{value}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="text-xs text-slate-400 font-semibold">Compliance Filings</div>
              {[
                { name: 'EPFO ECR Challan', status: 'Filed', color: 'text-emerald-400' },
                { name: 'ESIC Monthly Return', status: 'Filed', color: 'text-emerald-400' },
                { name: 'TDS Return (24Q)', status: 'Due Oct 31', color: 'text-amber-400' },
                { name: 'Professional Tax', status: 'Filed', color: 'text-emerald-400' },
              ].map(({ name, status, color }) => (
                <div key={name} className="flex items-center justify-between text-xs bg-slate-900/40 rounded-lg px-3 py-2">
                  <span className="text-slate-300">{name}</span>
                  <span className={`font-semibold ${color}`}>{status}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-800 text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              168 employees paid · 0 errors · All challans auto-filed
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Table */}
      <section className="border-t border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">Fully statutory compliant. Always.</h2>
            <p className="text-slate-400">Every compliance obligation automatically computed, filed, and tracked.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-400 uppercase">Compliance</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-400 uppercase">Governing Act</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-slate-400 uppercase">Auto-filed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {COMPLIANCE.map(({ label, law, auto }) => (
                  <tr key={label} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">{label}</td>
                    <td className="py-3 px-4 text-slate-400 text-xs">{law}</td>
                    <td className="py-3 px-4">
                      {auto
                        ? <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold"><CheckCircle2 className="w-3.5 h-3.5" />Auto-computed & filed</span>
                        : <span className="text-slate-500 text-xs">Manual (guided workflow)</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-slate-800 py-20 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">Simple, transparent pricing</h2>
            <p className="text-slate-400">No per-employee surprise fees. Flat monthly pricing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLAN_TIERS.map(({ name, price, per, features, color, highlight }) => (
              <div key={name}
                className={`p-6 rounded-2xl border transition-all space-y-5 ${highlight ? 'bg-indigo-500/5 border-indigo-500/30 relative' : 'bg-slate-900/50 border-slate-800'}`}>
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                    MOST POPULAR
                  </div>
                )}
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{name}</div>
                  <div className="text-3xl font-black text-white">{price}</div>
                  <div className="text-xs text-slate-500">{per}</div>
                </div>
                <ul className="space-y-2">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${highlight ? 'text-indigo-400' : 'text-emerald-400'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="http://localhost:5173" target="_blank" rel="noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${highlight ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}`}>
                  Get Started <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 py-20 text-center">
        <h2 className="text-4xl font-black text-white mb-4">Run your first payroll in 10 minutes</h2>
        <p className="text-slate-400 mb-8">Import employees from Excel. We handle the rest.</p>
        <a href="http://localhost:5173" target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/30 transition-all">
          Start Free Trial <ArrowRight className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
}
