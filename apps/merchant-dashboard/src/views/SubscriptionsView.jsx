import React, { useState } from 'react';
import { Plus, CheckCircle2, ShieldCheck, } from 'lucide-react';
export const SubscriptionsView = () => {
    const [filter, setFilter] = useState('ALL');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [notification, setNotification] = useState(null);
    const [subscriptions, setSubscriptions] = useState([
        {
            id: 'sub_live_891204',
            customer: 'Aditya Birla (aditya@finserve.in)',
            plan: 'Enterprise Cloud Tier',
            amount: '₹4,999.00',
            interval: 'Monthly',
            mandateType: 'UPI AutoPay (NPCI)',
            mandateUmn: 'NPCI2983109283@upi',
            status: 'ACTIVE',
            nextDebit: '2026-10-01',
            preDebitNotificationSent: true,
        },
        {
            id: 'sub_live_891203',
            customer: 'Kavita Menon (kavita@healthtech.co)',
            plan: 'Growth SaaS Plan',
            amount: '₹1,499.00',
            interval: 'Monthly',
            mandateType: 'eNACH (HDFC Bank)',
            mandateUmn: 'NACH7728190019',
            status: 'ACTIVE',
            nextDebit: '2026-10-05',
            preDebitNotificationSent: false,
        },
        {
            id: 'sub_live_891202',
            customer: 'Suresh Rao (suresh@logisticshub.com)',
            plan: 'Starter Telemetry Tier',
            amount: '₹499.00',
            interval: 'Monthly',
            mandateType: 'Card Recurring (ICICI Visa)',
            mandateUmn: 'TOK_491823901',
            status: 'PAUSED',
            nextDebit: 'Paused by merchant',
            preDebitNotificationSent: false,
        },
        {
            id: 'sub_live_891201',
            customer: 'Pooja Agarwal (pooja@retailmart.io)',
            plan: 'Enterprise Cloud Tier',
            amount: '₹4,999.00',
            interval: 'Monthly',
            mandateType: 'UPI AutoPay (GPay)',
            mandateUmn: 'NPCI9918204918@okaxis',
            status: 'CANCELLED',
            nextDebit: 'Mandate Revoked',
            preDebitNotificationSent: false,
        },
    ]);
    const [form, setForm] = useState({
        customer: '',
        plan: 'Pro Tier',
        amount: '1999',
        interval: 'Monthly',
        mandateType: 'UPI AutoPay (NPCI)',
    });
    const handleCreate = (e) => {
        e.preventDefault();
        const newSub = {
            id: `sub_test_${Math.random().toString(36).substring(2, 8)}`,
            customer: form.customer || 'New Subscriber (subscriber@example.com)',
            plan: form.plan,
            amount: `₹${Number(form.amount).toLocaleString('en-IN')}.00`,
            interval: form.interval,
            mandateType: form.mandateType,
            mandateUmn: `NPCI_${Math.floor(10000000 + Math.random() * 90000000)}@upi`,
            status: 'ACTIVE',
            nextDebit: '2026-10-01',
            preDebitNotificationSent: true,
        };
        setSubscriptions([newSub, ...subscriptions]);
        setShowCreateModal(false);
        setNotification(`Subscription created with RBI-compliant e-mandate for ${newSub.customer}`);
        setTimeout(() => setNotification(null), 4000);
    };
    const filtered = subscriptions.filter((s) => filter === 'ALL' || s.status === filter);
    return (<div className="space-y-6">
      {notification && (<div className="p-3.5 rounded-none bg-[#4E8B6F]/10 border border-[#4E8B6F]/40 text-[#4E8B6F] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#4E8B6F]"/>
          {notification}
        </div>)}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#0f172a] tracking-tight">Recurring Subscriptions & Mandates</h2>
          <div className="w-8 h-0.5 bg-[#0b63e5] mt-1"/>
          <p className="text-xs text-[#64748b] mt-1.5">
            Manage automated recurring billing via UPI AutoPay, eNACH, and RBI-mandated Standing Instructions
          </p>
        </div>

        <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 rounded-[4px] bg-[#0b63e5] hover:bg-[#d8b030] text-[#f8fafc] text-xs font-semibold flex items-center gap-2 transition-colors">
          <Plus className="w-3.5 h-3.5"/>
          Create Subscription Plan
        </button>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-none bg-[white] border border-[#0f172a]/[0.08]">
          <div className="text-[#64748b] text-xs font-medium">Active Mandates</div>
          <div className="text-xl font-bold font-mono text-[#0f172a] mt-1">1,420</div>
          <div className="text-[11px] text-[#4E8B6F] font-mono mt-0.5">99.2% execution success</div>
        </div>
        <div className="p-4 rounded-none bg-[white] border border-[#0f172a]/[0.08]">
          <div className="text-[#64748b] text-xs font-medium">Monthly Recurring (MRR)</div>
          <div className="text-xl font-bold font-mono text-[#0b63e5] mt-1">₹42,85,000</div>
          <div className="text-[11px] text-[#64748b] font-mono mt-0.5">+14.6% vs last cycle</div>
        </div>
        <div className="p-4 rounded-none bg-[white] border border-[#0f172a]/[0.08]">
          <div className="text-[#64748b] text-xs font-medium">RBI 24hr Pre-Debit Alerts</div>
          <div className="text-xl font-bold font-mono text-[#4E8B6F] mt-1">100% Compliant</div>
          <div className="text-[11px] text-[#64748b] mt-0.5">SMS & Email dispatch active</div>
        </div>
        <div className="p-4 rounded-none bg-[white] border border-[#0f172a]/[0.08]">
          <div className="text-[#64748b] text-xs font-medium">Dunning & Smart Retry</div>
          <div className="text-xl font-bold font-mono text-[#0f172a] mt-1">Active</div>
          <div className="text-[11px] text-[#64748b] mt-0.5">Exponential backoff configured</div>
        </div>
      </div>

      {/* RBI Mandatory Banner */}
      <div className="p-3.5 rounded-none bg-[#f8fafc] border border-[#0b63e5]/40 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[#0b63e5] mt-0.5 flex-shrink-0"/>
        <div className="text-xs text-[#0f172a]">
          <strong className="text-[#0b63e5]">RBI e-Mandate Directive:</strong> All debits exceeding ₹15,000 require additional factor authentication (AFA). Automatic pre-debit notifications are triggered 24 hours prior to every scheduled execution.
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#0f172a]/[0.08] pb-2">
        {['ALL', 'ACTIVE', 'PAUSED', 'CANCELLED'].map((tab) => (<button key={tab} onClick={() => setFilter(tab)} className={`px-3 py-1.5 rounded-[4px] text-xs font-semibold transition-colors ${filter === tab
                ? 'bg-[#0b63e5] text-[#f8fafc]'
                : 'text-[#64748b] hover:text-[#0f172a]'}`}>
            {tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>))}
      </div>

      {/* Subscriptions Table */}
      <div className="rounded-none bg-[white] border border-[#0f172a]/[0.08] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#0f172a]/[0.08] bg-[#f8fafc]/60 text-[#64748b] font-medium">
              <th className="py-3.5 px-4">Subscription ID</th>
              <th className="py-3.5 px-4">Customer</th>
              <th className="py-3.5 px-4">Plan</th>
              <th className="py-3.5 px-4">Amount</th>
              <th className="py-3.5 px-4">Mandate Type</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Next Scheduled Debit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0f172a]/[0.08]">
            {filtered.map((sub) => (<tr key={sub.id} className="hover:bg-[#0f172a]/[0.02] transition-colors">
                <td className="py-3.5 px-4 font-mono text-[#0f172a] font-medium">{sub.id}</td>
                <td className="py-3.5 px-4 text-[#0f172a] font-medium">{sub.customer}</td>
                <td className="py-3.5 px-4 text-[#64748b]">{sub.plan}</td>
                <td className="py-3.5 px-4 text-[#0f172a] font-semibold font-mono">
                  {sub.amount} <span className="text-[10px] text-[#64748b] font-normal">/{sub.interval.toLowerCase()}</span>
                </td>
                <td className="py-3.5 px-4 text-[#64748b]">
                  <div>{sub.mandateType}</div>
                  <div className="font-mono text-[10px] text-[#64748b]/70">{sub.mandateUmn}</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold ${sub.status === 'ACTIVE'
                ? 'border border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5'
                : sub.status === 'PAUSED'
                    ? 'border border-[#C98A2E] text-[#C98A2E] bg-[#C98A2E]/5'
                    : 'border border-[#B0503F] text-[#B0503F] bg-[#B0503F]/5'}`}>
                    {sub.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#64748b] font-mono">{sub.nextDebit}</td>
              </tr>))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showCreateModal && (<div className="fixed inset-0 bg-[#f8fafc]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-[white] border border-[#0f172a]/[0.12] rounded-none w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div>
              <h3 className="text-base font-bold text-[#0f172a]">Create Recurring Plan & Mandate</h3>
              <div className="w-8 h-0.5 bg-[#0b63e5] mt-1"/>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#64748b] mb-1 font-medium">Customer Name & Email</label>
                <input type="text" placeholder="e.g. Rahul Sharma (rahul@startup.in)" value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} className="w-full bg-[#f8fafc] border border-[#0f172a]/[0.12] rounded-[4px] px-3 py-2 text-[#0f172a] focus:outline-none focus:border-[#0b63e5]" required/>
              </div>
              <div>
                <label className="block text-[#64748b] mb-1 font-medium">Plan Name</label>
                <input type="text" value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })} className="w-full bg-[#f8fafc] border border-[#0f172a]/[0.12] rounded-[4px] px-3 py-2 text-[#0f172a] focus:outline-none focus:border-[#0b63e5]"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#64748b] mb-1 font-medium">Debit Amount (₹)</label>
                  <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="w-full bg-[#f8fafc] border border-[#0f172a]/[0.12] rounded-[4px] px-3 py-2 text-[#0f172a] focus:outline-none focus:border-[#0b63e5]"/>
                </div>
                <div>
                  <label className="block text-[#64748b] mb-1 font-medium">Cycle</label>
                  <select value={form.interval} onChange={(e) => setForm({ ...form, interval: e.target.value })} className="w-full bg-[#f8fafc] border border-[#0f172a]/[0.12] rounded-[4px] px-3 py-2 text-[#0f172a] focus:outline-none focus:border-[#0b63e5]">
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Yearly</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[#64748b] mb-1 font-medium">Mandate Instrument</label>
                <select value={form.mandateType} onChange={(e) => setForm({ ...form, mandateType: e.target.value })} className="w-full bg-[#f8fafc] border border-[#0f172a]/[0.12] rounded-[4px] px-3 py-2 text-[#0f172a] focus:outline-none focus:border-[#0b63e5]">
                  <option>UPI AutoPay (NPCI)</option>
                  <option>eNACH (National Automated Clearing House)</option>
                  <option>Card Recurring (RBI Tokenised)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#0f172a]/[0.08]">
              <button type="button" onClick={() => setShowCreateModal(false)} className="px-3 py-1.5 rounded-[4px] bg-[#f8fafc] text-[#64748b] text-xs font-medium hover:text-[#0f172a] transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-4 py-1.5 rounded-[4px] bg-[#0b63e5] text-[#f8fafc] text-xs font-semibold hover:bg-[#d8b030] transition-colors">
                Initiate Mandate
              </button>
            </div>
          </form>
        </div>)}
    </div>);
};
