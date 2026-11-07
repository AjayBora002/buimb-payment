import React, { useState } from 'react';
import { Plus, Copy, ExternalLink, } from 'lucide-react';
import { useToast } from '../components/Toast.jsx';
export const PaymentPagesView = () => {
    const { showToast } = useToast();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [pageTitle, setPageTitle] = useState('Fintech Engineering Masterclass 2026');
    const [pageCategory, setPageCategory] = useState('Event Registration');
    const [pageAmount, setPageAmount] = useState('2999');
    const [pages, setPages] = useState([
        {
            id: 'page_Nx8811Kkp201',
            title: 'Fintech Engineering Masterclass 2026',
            slug: 'fintech-masterclass',
            category: 'Education & Events',
            amount: '₹2,999.00',
            totalCollected: '₹1,49,950.00',
            paymentsCount: 50,
            status: 'ACTIVE',
            createdAt: '3 days ago',
        },
        {
            id: 'page_Nx7722Jjo102',
            title: 'DevOps & Cloud Annual Retainer',
            slug: 'cloud-retainer',
            category: 'Professional Services',
            amount: '₹25,000.00',
            totalCollected: '₹1,00,000.00',
            paymentsCount: 4,
            status: 'ACTIVE',
            createdAt: '1 week ago',
        },
        {
            id: 'page_Nx6633Hhn003',
            title: 'Bengaluru Tech Relief Fund Donation',
            slug: 'relief-fund',
            category: 'Donations & NGO',
            amount: 'Customer Specified',
            totalCollected: '₹82,400.00',
            paymentsCount: 88,
            status: 'ACTIVE',
            createdAt: '2 weeks ago',
        },
    ]);
    const copyLink = (slug) => {
        navigator.clipboard.writeText(`https://rzp.io/l/${slug}`);
        showToast(`Copied page URL (https://rzp.io/l/${slug})`, 'success');
    };
    const handleCreatePage = (e) => {
        e.preventDefault();
        const id = `page_${Math.random().toString(36).substring(2, 14)}`;
        const slug = pageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const newPage = {
            id,
            title: pageTitle,
            slug,
            category: pageCategory,
            amount: pageAmount ? `₹${parseFloat(pageAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : 'Customer Specified',
            totalCollected: '₹0.00',
            paymentsCount: 0,
            status: 'ACTIVE',
            createdAt: 'Just now',
        };
        setPages([newPage, ...pages]);
        setShowCreateModal(false);
        showToast(`Payment Page published at rzp.io/l/${slug}`, 'success');
    };
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Payment Pages</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              No-Code Storefront
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Build beautiful hosted checkout storefronts with custom fields, zero coding required.
          </p>
        </div>

        <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm shadow-blue-600/30 self-start">
          <Plus className="w-4 h-4"/>
          + Create Payment Page
        </button>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {pages.map((p) => (<div key={p.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
            <div className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                  {p.category}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/>
                  {p.status}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {p.title}
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-0.5">rzp.io/l/{p.slug}</div>
              </div>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Unit Price</span>
                  <span className="font-bold text-slate-800 font-mono">{p.amount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Total Revenue</span>
                  <span className="font-bold text-emerald-600 font-mono">{p.totalCollected}</span>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">{p.paymentsCount} paid orders</span>
              <div className="flex items-center gap-1">
                <button onClick={() => copyLink(p.slug)} className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-white transition-colors" title="Copy Page URL">
                  <Copy className="w-3.5 h-3.5"/>
                </button>
                <a href={`http://localhost:3000/l/${p.slug}`} target="_blank" rel="noreferrer" className="p-1.5 rounded-md text-blue-600 hover:text-blue-700 hover:bg-white transition-colors" title="Open Preview">
                  <ExternalLink className="w-3.5 h-3.5"/>
                </a>
              </div>
            </div>
          </div>))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (<div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Create BuimbPay Payment Page</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Page Title / Product Name
                </label>
                <input type="text" required value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"/>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select value={pageCategory} onChange={(e) => setPageCategory(e.target.value)} className="w-full h-9 px-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500">
                    <option>Education & Events</option>
                    <option>Product Sale</option>
                    <option>Donations & NGO</option>
                    <option>Professional Services</option>
                    <option>SaaS & Memberships</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Amount (INR)
                  </label>
                  <input type="number" placeholder="Leave empty for customer choice" value={pageAmount} onChange={(e) => setPageAmount(e.target.value)} className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500"/>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-800">Form Fields Included:</div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 text-[11px]">Customer Name *</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 text-[11px]">Email Address *</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 text-[11px]">Phone (+91) *</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 text-[11px]">GSTIN / Business Name</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm">
                  Publish Payment Page
                </button>
              </div>
            </form>
          </div>
        </div>)}
    </div>);
};
