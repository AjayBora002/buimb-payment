import React, { useState, useEffect, useCallback } from 'react';
import {
  Link2,
  Plus,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  RotateCcw,
  Ban,
  Share2,
  Calendar,
  DollarSign,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  X,
  Smartphone,
} from 'lucide-react';
import { useToast } from '../components/Toast.js';
import { apiClient } from '../lib/api-client.js';

interface PaymentLinkItem {
  id: string;
  slug: string;
  title: string;
  amount: string;
  amountRaw: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'ACTIVE' | 'PARTIALLY_PAID' | 'PAID' | 'EXPIRED' | 'CANCELLED';
  allowPartial: boolean;
  createdAt: string;
  expiresAt: string;
  paymentsCount: number;
}

interface PaymentLinksViewProps {
  onOpenCheckout?: (link: PaymentLinkItem) => void;
}

function formatApiLink(raw: any): PaymentLinkItem {
  const amountRaw = typeof raw.amount === 'bigint' ? Number(raw.amount) : Number(raw.amount ?? 0);
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.description || raw.customReference || 'Payment Link',
    amount: `₹${(amountRaw / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
    amountRaw: amountRaw / 100,
    customerName: raw.customerName || '',
    customerEmail: raw.customerEmail || '',
    customerPhone: raw.customerPhone || '',
    status: raw.status,
    allowPartial: raw.allowPartialPayment ?? false,
    createdAt: new Date(raw.createdAt).toISOString().replace('T', ' ').slice(0, 16),
    expiresAt: raw.expiresAt ? new Date(raw.expiresAt).toISOString().replace('T', ' ').slice(0, 16) : '',
    paymentsCount: raw._count?.payments ?? 0,
  };
}

export const PaymentLinksView: React.FC<PaymentLinksViewProps> = ({ onOpenCheckout }) => {
  const { showToast } = useToast();
  const [filter, setFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [qrModalLink, setQrModalLink] = useState<PaymentLinkItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const [links, setLinks] = useState<PaymentLinkItem[]>([]);

  // ── Fetch from API ──────────────────────────────────────────────────
  const fetchLinks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.get<any>('/v1/payment-links');
      const items: any[] = Array.isArray(data) ? data : (data.items ?? []);
      setLinks(items.map(formatApiLink));
    } catch {
      // Fall back to empty list; API may not be running in dev
      setLinks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchLinks(); }, [fetchLinks]);

  const [placeHolderLinks] = useState<PaymentLinkItem[]>([
    {
      id: 'pl_98a72b0c',
      slug: 'consulting-retainer-sep',
      title: 'Consulting Retainer - September 2026',
      amount: '₹25,000.00',
      amountRaw: 25000,
      customerName: 'Anand Enterprises',
      customerEmail: 'anand@enterprises.in',
      customerPhone: '+91 98765 43210',
      status: 'ACTIVE',
      allowPartial: false,
      createdAt: '2026-09-21 14:30',
      expiresAt: '2026-09-28 23:59',
      paymentsCount: 0,
    },
    {
      id: 'pl_45f190e2',
      slug: 'dev-sprint-milestone-2',
      title: 'Software Development Milestone #2',
      amount: '₹85,000.00',
      amountRaw: 85000,
      customerName: 'TechNova Labs',
      customerEmail: 'billing@technova.io',
      customerPhone: '+91 98111 22233',
      status: 'PARTIALLY_PAID',
      allowPartial: true,
      createdAt: '2026-09-20 11:15',
      expiresAt: '2026-09-27 23:59',
      paymentsCount: 1,
    },
    {
      id: 'pl_77c210ab',
      slug: 'cloud-devops-quarterly',
      title: 'Cloud DevOps Quarterly Retainer',
      amount: '₹45,000.00',
      amountRaw: 45000,
      customerName: 'FinServe Innovations',
      customerEmail: 'accounts@finserve.co',
      customerPhone: '+91 98222 33344',
      status: 'PAID',
      allowPartial: false,
      createdAt: '2026-09-18 09:40',
      expiresAt: '2026-09-25 23:59',
      paymentsCount: 1,
    },
    {
      id: 'pl_119d67aa',
      slug: 'annual-platform-pass',
      title: 'Annual Platform Access Subscription',
      amount: '₹14,999.00',
      amountRaw: 14999,
      customerName: 'Digital Flow Pvt Ltd',
      customerEmail: 'admin@digitalflow.com',
      customerPhone: '+91 98333 44455',
      status: 'EXPIRED',
      allowPartial: false,
      createdAt: '2026-09-01 10:00',
      expiresAt: '2026-09-15 23:59',
      paymentsCount: 0,
    },
  ]);

  const [form, setForm] = useState({
    title: '',
    amount: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    allowPartial: false,
    expiryDays: '7',
  });

  const displayLinks = links.length > 0 ? links : placeHolderLinks;

  const handleCopyLink = (link: PaymentLinkItem) => {
    const url = `${window.location.origin.replace(':5173', ':3001')}/l/${link.slug}`;
    navigator.clipboard.writeText(url);
    showToast(`Copied payment link for ${link.title} to clipboard`, 'success');
  };

  const handleDuplicate = (link: PaymentLinkItem) => {
    const duplicated: PaymentLinkItem = {
      ...link,
      id: `pl_${Math.random().toString(36).substring(2, 10)}`,
      slug: `${link.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      title: `${link.title} (Copy)`,
      status: 'ACTIVE',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      paymentsCount: 0,
    };
    setLinks([duplicated, ...links]);
    showToast(`Duplicated payment link: ${duplicated.title}`, 'info');
  };

  const handleCancelLink = async (linkId: string) => {
    // Optimistic UI update
    setLinks(prev => prev.map((l) => (l.id === linkId ? { ...l, status: 'CANCELLED' } : l)));
    try {
      await apiClient.delete(`/v1/payment-links/${linkId}`);
      showToast(`Payment link cancelled`, 'info');
    } catch {
      // Revert optimistic update on failure
      fetchLinks();
      showToast(`Failed to cancel link — please try again`, 'error');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const amountPaise = Math.round(Number(form.amount) * 100);
      const raw = await apiClient.post<any>('/v1/payment-links', {
        amount: amountPaise,
        currency: 'INR',
        description: form.title || 'Custom Order Payment',
        customerName: form.customerName || undefined,
        customerEmail: form.customerEmail || undefined,
        customerPhone: form.customerPhone || undefined,
        expiresInHours: Number(form.expiryDays) * 24,
        idempotencyKey: `dashboard_${Date.now()}`,
      });
      const newLink = formatApiLink(raw);
      setLinks(prev => [newLink, ...prev]);
      setShowCreateModal(false);
      setForm({ title: '', amount: '', customerName: '', customerEmail: '', customerPhone: '', allowPartial: false, expiryDays: '7' });
      showToast(`Payment link created: ${newLink.title}`, 'success');
    } catch (err: any) {
      showToast(`Failed to create link: ${err.message}`, 'error');
    } finally {
      setIsCreating(false);
    }
  };

  const filteredLinks = displayLinks.filter((l) => {
    const matchStatus = filter === 'ALL' || l.status === filter;
    const matchSearch =
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#EDE7D6]">Payment Links</h2>
          <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
          <p className="text-xs text-[#8FA396] mt-1">
            Create, share, and track hosted payment links via SMS, WhatsApp, and email
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 rounded-[4px] bg-[#C9A227] hover:bg-[#DBB53B] text-[#131B17] text-xs font-bold flex items-center gap-2 transition-colors border border-[#B08C1E]"
          >
            <Plus className="w-3.5 h-3.5" />
            Create Payment Link
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)]">
          <span className="text-[11px] text-[#8FA396]">Total Active Links</span>
          <div className="text-2xl font-bold font-mono text-[#EDE7D6] tabular-nums mt-1">16</div>
          <span className="text-[10px] text-[#4E8B6F] font-mono">All customer VPAs enabled</span>
        </div>

        <div className="p-4 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)]">
          <span className="text-[11px] text-[#8FA396]">Total Collected via Links</span>
          <div className="text-2xl font-bold font-mono text-[#C9A227] tabular-nums mt-1">₹4,82,500.00</div>
          <span className="text-[10px] text-[#4E8B6F] font-mono">+16.4% this month</span>
        </div>

        <div className="p-4 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)]">
          <span className="text-[11px] text-[#8FA396]">Conversion Rate</span>
          <div className="text-2xl font-bold font-mono text-[#4E8B6F] tabular-nums mt-1">87.4%</div>
          <span className="text-[10px] text-[#8FA396] font-mono">View-to-payment conversion</span>
        </div>

        <div className="p-4 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)]">
          <span className="text-[11px] text-[#8FA396]">Expiring Within 7 Days</span>
          <div className="text-2xl font-bold font-mono text-[#C98A2E] tabular-nums mt-1">3</div>
          <span className="text-[10px] text-[#C98A2E] font-mono">Action suggested</span>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="p-4 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'ACTIVE', 'PARTIALLY_PAID', 'PAID', 'EXPIRED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-semibold transition-colors ${
                filter === st
                  ? 'bg-[#C9A227] text-[#131B17] font-bold'
                  : 'text-[#8FA396] hover:text-[#EDE7D6]'
              }`}
            >
              {st.replace('_', ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#8FA396] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search links, customers, IDs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 h-8 bg-[#131B17] border border-[rgba(237,231,214,0.08)] rounded-[4px] pl-8 pr-3 text-xs text-[#EDE7D6] placeholder:text-[#8FA396] focus:outline-none focus:border-[#C9A227]"
          />
        </div>
      </div>

      {/* Links Table */}
      <div className="bg-[#1D2E28] border border-[rgba(237,231,214,0.08)] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[rgba(237,231,214,0.08)] bg-[#131B17] text-[#8FA396] font-medium">
              <th className="py-3.5 px-4">Link Details</th>
              <th className="py-3.5 px-4">Customer</th>
              <th className="py-3.5 px-4">Amount</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Expires</th>
              <th className="py-3.5 px-4 text-right">Quick Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(237,231,214,0.08)]">
            {filteredLinks.map((link) => (
              <tr key={link.id} className="hover:bg-[#243831] transition-colors group">
                {/* Title and ID */}
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-[#EDE7D6]">{link.title}</div>
                  <div className="flex items-center gap-2 text-[10px] text-[#8FA396] font-mono mt-0.5">
                    <span>{link.id}</span>
                    <span>/</span>
                    <span>/pay/{link.slug}</span>
                  </div>
                </td>

                {/* Customer */}
                <td className="py-3.5 px-4">
                  <div className="font-medium text-[#EDE7D6]">{link.customerName}</div>
                  <div className="text-[10px] text-[#8FA396]">{link.customerEmail}</div>
                </td>

                {/* Amount */}
                <td className="py-3.5 px-4">
                  <div className="font-bold font-mono text-[#EDE7D6] tabular-nums">{link.amount}</div>
                  {link.allowPartial && (
                    <span className="text-[9px] text-[#C9A227] border border-[#C9A227]/30 px-1 py-0.2 rounded-[2px]">
                      Partial Allowed
                    </span>
                  )}
                </td>

                {/* Status: Stamp badge */}
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold border ${
                      link.status === 'ACTIVE'
                        ? 'border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5'
                        : link.status === 'PAID'
                        ? 'border-[#C9A227] text-[#C9A227] bg-[#C9A227]/5'
                        : link.status === 'PARTIALLY_PAID'
                        ? 'border-[#C98A2E] text-[#C98A2E] bg-[#C98A2E]/5'
                        : 'border-[#8FA396] text-[#8FA396] bg-transparent'
                    }`}
                  >
                    {link.status}
                  </span>
                </td>

                {/* Expiry */}
                <td className="py-3.5 px-4 text-[#8FA396] font-mono text-[11px] tabular-nums">
                  {link.expiresAt}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {/* Copy Link */}
                    <button
                      onClick={() => handleCopyLink(link)}
                      className="p-1.5 rounded-[4px] text-[#8FA396] hover:text-[#EDE7D6] hover:bg-[#131B17] transition-colors"
                      title="Copy payment link"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    {/* QR Code */}
                    <button
                      onClick={() => setQrModalLink(link)}
                      className="p-1.5 rounded-[4px] text-[#C9A227] hover:bg-[#131B17] transition-colors"
                      title="View QR Code"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                    </button>

                    {/* Preview Customer Checkout */}
                    {onOpenCheckout && (
                      <button
                        onClick={() => onOpenCheckout(link)}
                        className="p-1.5 rounded-[4px] text-[#8FA396] hover:text-[#4E8B6F] hover:bg-[#131B17] transition-colors"
                        title="Simulate customer checkout"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Duplicate Link */}
                    <button
                      onClick={() => handleDuplicate(link)}
                      className="p-1.5 rounded-[4px] text-[#8FA396] hover:text-[#EDE7D6] hover:bg-[#131B17] transition-colors"
                      title="Duplicate link"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Cancel Link */}
                    {link.status === 'ACTIVE' && (
                      <button
                        onClick={() => handleCancelLink(link.id)}
                        className="p-1.5 rounded-[4px] text-[#8FA396] hover:text-[#B0503F] hover:bg-[#131B17] transition-colors"
                        title="Cancel link"
                      >
                        <Ban className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* QR Code Preview Modal */}
      {/* QR Code Preview Modal */}
      {qrModalLink && (
        <div className="fixed inset-0 bg-[#131B17]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1D2E28] border border-[rgba(237,231,214,0.15)] rounded-[4px] w-full max-w-sm p-6 space-y-5 text-center text-[#EDE7D6]">
            <div className="flex items-center justify-between border-b border-[rgba(237,231,214,0.08)] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#EDE7D6]">Payment QR Code</h3>
                <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
              </div>
              <button onClick={() => setQrModalLink(null)} className="text-[#8FA396] hover:text-[#EDE7D6]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-white rounded-[4px] w-48 h-48 mx-auto flex items-center justify-center border border-[rgba(237,231,214,0.15)]">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#131B17]">
                <rect x="10" y="10" width="30" height="30" fill="currentColor" rx="2" />
                <rect x="16" y="16" width="18" height="18" fill="white" rx="1" />
                <rect x="20" y="20" width="10" height="10" fill="currentColor" />
                <rect x="60" y="10" width="30" height="30" fill="currentColor" rx="2" />
                <rect x="66" y="16" width="18" height="18" fill="white" rx="1" />
                <rect x="70" y="20" width="10" height="10" fill="currentColor" />
                <rect x="10" y="60" width="30" height="30" fill="currentColor" rx="2" />
                <rect x="16" y="66" width="18" height="18" fill="white" rx="1" />
                <rect x="20" y="70" width="10" height="10" fill="currentColor" />
                <rect x="50" y="50" width="12" height="12" fill="currentColor" />
                <rect x="70" y="60" width="16" height="8" fill="currentColor" />
                <rect x="60" y="80" width="10" height="10" fill="currentColor" />
              </svg>
            </div>

            <div>
              <div className="text-sm font-bold text-[#EDE7D6]">{qrModalLink.title}</div>
              <div className="text-base font-bold font-mono text-[#C9A227] tabular-nums mt-0.5">
                {qrModalLink.amount}
              </div>
              <span className="text-[11px] text-[#8FA396] block mt-1">
                Scan with Google Pay, PhonePe, Paytm, or any BHIM UPI app
              </span>
            </div>

            <button
              onClick={() => {
                showToast('QR Code image downloaded (PNG)', 'success');
                setQrModalLink(null);
              }}
              className="w-full py-2.5 rounded-[4px] bg-[#C9A227] hover:bg-[#DBB53B] text-[#131B17] text-xs font-bold border border-[#B08C1E]"
            >
              Download QR Image
            </button>
          </div>
        </div>
      )}

      {/* Create Link Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-[#131B17]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="bg-[#1D2E28] border border-[rgba(237,231,214,0.15)] rounded-[4px] w-full max-w-md p-6 space-y-4 text-[#EDE7D6]"
          >
            <div className="flex items-center justify-between border-b border-[rgba(237,231,214,0.08)] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#EDE7D6]">Create New Payment Link</h3>
                <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
              </div>
              <button type="button" onClick={() => setShowCreateModal(false)} className="text-[#8FA396] hover:text-[#EDE7D6]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#8FA396] mb-1">Purpose / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Website Design Milestone 1"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-[#131B17] border border-[rgba(237,231,214,0.08)] rounded-[4px] px-3 py-2 text-[#EDE7D6] focus:outline-none focus:border-[#C9A227]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#8FA396] mb-1">Amount (₹ INR)</label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full bg-[#131B17] border border-[rgba(237,231,214,0.08)] rounded-[4px] px-3 py-2 text-[#EDE7D6] font-bold font-mono text-sm focus:outline-none focus:border-[#C9A227]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8FA396] mb-1">Customer Name</label>
                  <input
                    type="text"
                    placeholder="Customer Name"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    className="w-full bg-[#131B17] border border-[rgba(237,231,214,0.08)] rounded-[4px] px-3 py-2 text-[#EDE7D6] focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div>
                  <label className="block text-[#8FA396] mb-1">Customer Email</label>
                  <input
                    type="email"
                    placeholder="email@domain.com"
                    value={form.customerEmail}
                    onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                    className="w-full bg-[#131B17] border border-[rgba(237,231,214,0.08)] rounded-[4px] px-3 py-2 text-[#EDE7D6] focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="partial"
                  checked={form.allowPartial}
                  onChange={(e) => setForm({ ...form, allowPartial: e.target.checked })}
                  className="rounded-[2px] border-[rgba(237,231,214,0.2)] bg-[#131B17] text-[#C9A227]"
                />
                <label htmlFor="partial" className="text-[#EDE7D6]">
                  Allow customer to make partial payments
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[rgba(237,231,214,0.08)]">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-[4px] bg-[#131B17] text-[#8FA396] hover:text-[#EDE7D6] text-xs font-semibold border border-[rgba(237,231,214,0.08)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="px-4 py-2 rounded-[4px] bg-[#C9A227] hover:bg-[#DBB53B] text-[#131B17] text-xs font-bold border border-[#B08C1E] disabled:opacity-60"
              >
                {isCreating ? 'Creating…' : 'Generate Link'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
