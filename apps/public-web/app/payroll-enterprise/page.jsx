'use client';
import Link from 'next/link';
import { CheckCircle, Shield, Zap, Users, ArrowRight, Building2, FileText, BarChart3, Lock, Globe, Briefcase, HeadphonesIcon, Settings } from 'lucide-react';

export const metadata = {
  title: 'Payroll for Enterprises – 500+ Employees | BuimbPay',
  description: 'Enterprise-grade payroll automation for large organisations. HRMS integration (SAP, Workday, Darwinbox), multi-state compliance, group insurance, perquisites, and dedicated SLA-backed support.',
};

const FEATURES = [
  { icon: Users, title: 'Unlimited Employees', desc: 'Process payroll for 500 to 50,000+ employees across multiple entities and locations from a unified dashboard.', color: 'blue' },
  { icon: Settings, title: 'HRMS Integrations', desc: 'Native connectors for SAP SuccessFactors, Workday, Darwinbox, Zoho People, and BambooHR. Bi-directional sync.', color: 'violet' },
  { icon: Globe, title: 'Multi-State PT Compliance', desc: 'Automatic Professional Tax (PT) computation across all 28 states. State-wise challan generation and filing.', color: 'teal' },
  { icon: FileText, title: 'Group Insurance & Perquisites', desc: 'Manage Mediclaim, term life, ESOP valuations, company cars, and other perquisites with Form 12BA generation.', color: 'amber' },
  { icon: BarChart3, title: 'Advanced Analytics', desc: 'CTC variance analysis, headcount trends, attrition cost, payroll-to-revenue ratio, and audit-ready MIS reports.', color: 'rose' },
  { icon: HeadphonesIcon, title: 'Dedicated SPOC + SLA', desc: 'Named Customer Success Manager, 4-hour SLA for critical issues, and 24×7 payroll helpdesk for HR teams.', color: 'green' },
];

const ENTERPRISE_COMPLIANCE = [
  'TDS computation under New & Old Tax Regime — Form 16 / 16A bulk generation',
  'EPFO ECR challan generation with UAN linking and PF passbook sync',
  'ESIC monthly returns with IP number management',
  'Professional Tax (PT) across all states — auto rate updates',
  'Labour Welfare Fund (LWF) — state-specific deductions',
  'Full & Final Settlement with gratuity, leave encashment, and bonus computation',
  'Form 24Q quarterly TDS return filing via TRACES',
  'Multi-entity consolidation for group companies and subsidiaries',
];

const INTEGRATIONS = [
  { name: 'SAP SuccessFactors', category: 'HRMS' },
  { name: 'Workday', category: 'HRMS' },
  { name: 'Darwinbox', category: 'HRMS' },
  { name: 'Zoho People', category: 'HRMS' },
  { name: 'BambooHR', category: 'HRMS' },
  { name: 'Oracle HCM', category: 'HRMS' },
  { name: 'Tally ERP 9', category: 'Accounting' },
  { name: 'SAP Finance', category: 'Accounting' },
  { name: 'QuickBooks', category: 'Accounting' },
  { name: 'Netsuite', category: 'ERP' },
  { name: 'Microsoft Dynamics', category: 'ERP' },
  { name: 'Salesforce', category: 'CRM' },
];

const colorMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', hover: 'group-hover:bg-blue-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', hover: 'group-hover:bg-amber-600' },
  green: { bg: 'bg-emerald-50', text: 'text-emerald-600', hover: 'group-hover:bg-emerald-600' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-600', hover: 'group-hover:bg-violet-600' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', hover: 'group-hover:bg-rose-600' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', hover: 'group-hover:bg-teal-600' },
};

export default function PayrollEnterprisePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0C1938] text-white pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-emerald-900/40 border border-emerald-700/50 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Building2 className="w-3.5 h-3.5" /> Enterprise Payroll — 500+ Employees
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl mb-5">
            Payroll built for<br />
            <span className="text-[#10B981]">large enterprises</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-8 leading-relaxed">
            Run error-free payroll for thousands of employees across multiple states and entities. Deep HRMS integrations, automated statutory compliance, and a dedicated SLA-backed support team — so your HR never loses sleep over payday.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-emerald-500 text-white font-bold px-7 py-3.5 rounded-lg transition-colors text-sm shadow-lg">
              Talk to Enterprise Sales <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/payroll" className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-200 font-semibold px-7 py-3.5 rounded-lg transition-colors text-sm">
              Payroll for Startups & SMEs
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: '50,000+', label: 'Max employees' },
              { val: '28', label: 'States covered' },
              { val: '4-hr', label: 'SLA response' },
              { val: '99.9%', label: 'Uptime SLA' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-emerald-400">{s.val}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SME vs Enterprise comparison */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">How Enterprise Payroll differs from Startup Payroll</h2>
          <p className="text-slate-500 text-center mb-10">Different scale, different complexity — purpose-built for each</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-4 py-3 rounded-tl-xl font-semibold">Feature</th>
                  <th className="text-center px-4 py-3 font-semibold">Startups & SMEs</th>
                  <th className="text-center px-4 py-3 rounded-tr-xl font-semibold text-emerald-400">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Employee count', 'Up to 500', '500 – 50,000+'],
                  ['HRMS integration', 'Basic (import/export)', 'Real-time bi-directional sync'],
                  ['Multi-entity support', '—', '✓ Group consolidation'],
                  ['Perquisites & ESOP', 'Basic', 'Full Form 12BA & 3922'],
                  ['Group insurance', '—', '✓ Mediclaim & term life'],
                  ['Dedicated SPOC', '—', '✓ Named CSM + 4-hr SLA'],
                  ['Custom MIS reports', 'Standard only', '✓ Fully customisable'],
                  ['Audit & forensics', '—', '✓ Payroll audit logs'],
                  ['On-premise / private cloud', '—', '✓ Available on request'],
                ].map(([feature, sme, ent], i) => (
                  <tr key={feature} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 font-medium text-slate-700 border-b border-slate-100">{feature}</td>
                    <td className="px-4 py-3 text-center text-slate-500 border-b border-slate-100">{sme}</td>
                    <td className="px-4 py-3 text-center font-semibold text-emerald-700 border-b border-slate-100">{ent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Enterprise-grade capabilities</h2>
          <p className="text-slate-500 text-center mb-10">Everything you need to manage payroll at scale — with zero margin for error</p>
          <div className="grid md:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => {
              const c = colorMap[color];
              return (
                <div key={title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm group hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.text} ${c.hover} group-hover:text-white flex items-center justify-center mb-4 transition-colors`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1 text-sm">{title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-16 bg-[#0C1938] text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-900/40 border border-emerald-700/50 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <Shield className="w-3.5 h-3.5" /> Statutory Compliance
            </div>
            <h2 className="text-3xl font-extrabold mb-4">Zero compliance<br />penalties. Guaranteed.</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              BuimbPay's compliance engine auto-updates to every EPFO circular, ESIC notification, and Income Tax amendment — so your team never misses a deadline.
            </p>
            <Link href="/compliance" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold text-sm">
              View Full Compliance Coverage <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ul className="space-y-3">
            {ENTERPRISE_COMPLIANCE.map(c => (
              <li key={c} className="flex gap-3 items-start">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Integrates with your enterprise stack</h2>
          <p className="text-slate-500 text-center mb-10">Pre-built connectors for leading HRMS, ERP, and accounting systems</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {INTEGRATIONS.map(int => (
              <div key={int.name} className="bg-white rounded-xl border border-slate-100 p-3 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-xs font-bold text-slate-800">{int.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{int.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-emerald-700 to-teal-800 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-4">Ready to transform enterprise payroll?</h2>
          <p className="text-emerald-100 mb-8">Talk to our enterprise team for a custom demo and pricing tailored to your headcount and needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-8 py-3.5 rounded-lg transition-colors shadow-lg">
              Request Enterprise Demo
            </Link>
            <Link href="/pricing" className="border border-emerald-400 hover:border-white text-white font-semibold px-8 py-3.5 rounded-lg transition-colors">
              View Enterprise Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
