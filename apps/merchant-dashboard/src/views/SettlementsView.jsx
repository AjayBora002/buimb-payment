import React, { useState, useEffect, useCallback } from 'react';
import { Landmark, CheckCircle2, Clock, AlertTriangle, X, ChevronRight, RefreshCw, Info, Zap, } from 'lucide-react';
import { apiClient } from '../lib/api-client.js';
export function formatPaiseToInr(paise) {
    if (paise === undefined || paise === null || paise === '')
        return '₹0.00';
    try {
        const numericPaise = typeof paise === 'bigint' ? Number(paise) : Number(paise);
        if (isNaN(numericPaise))
            return '₹0.00';
        const rupees = numericPaise / 100;
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(rupees);
    }
    catch {
        return '₹0.00';
    }
}
export function maskAccountNumber(accountNumber) {
    if (!accountNumber)
        return '•••• •••• ••••';
    const clean = accountNumber.trim();
    if (clean.length <= 4)
        return `•••• •••• ${clean}`;
    return `•••• •••• ${clean.slice(-4)}`;
}
export function formatDateTime(isoString) {
    if (!isoString)
        return '—';
    try {
        const d = new Date(isoString);
        if (isNaN(d.getTime()))
            return isoString;
        return d.toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    }
    catch {
        return isoString;
    }
}
function getStatusBadge(status) {
    switch (status) {
        case 'SETTLED':
            return (<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold bg-[#4E8B6F]/15 text-[#4E8B6F] border border-[#4E8B6F]/30">
          <CheckCircle2 className="w-3 h-3"/>
          SETTLED
        </span>);
        case 'PROCESSING':
            return (<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold bg-[#C98A2E]/15 text-[#C98A2E] border border-[#C98A2E]/30">
          <Clock className="w-3 h-3"/>
          PROCESSING
        </span>);
        case 'FAILED':
            return (<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold bg-[#B0503F]/15 text-[#B0503F] border border-[#B0503F]/30">
          <AlertTriangle className="w-3 h-3"/>
          FAILED
        </span>);
        case 'PENDING':
        default:
            return (<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold bg-[#3867D6]/15 text-[#6B95FF] border border-[#3867D6]/30">
          <Clock className="w-3 h-3"/>
          PENDING
        </span>);
    }
}
export const SettlementsView = () => {
    const [settlements, setSettlements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nextCursor, setNextCursor] = useState(null);
    // Detail Drawer State
    const [selectedSettlementId, setSelectedSettlementId] = useState(null);
    const [settlementDetail, setSettlementDetail] = useState(null);
    const [isDetailLoading, setIsDetailLoading] = useState(false);
    const [detailError, setDetailError] = useState(null);
    // Instant Settlement State
    const [isInstantLoading, setIsInstantLoading] = useState(false);
    const [instantSuccess, setInstantSuccess] = useState(null);
    const handleInstantSettlement = async () => {
        setIsInstantLoading(true);
        try {
            const res = await apiClient.post('/v1/settlements/instant');
            setInstantSuccess(res);
            await fetchSettlements();
        }
        catch (err) {
            alert(err?.message || 'Failed to trigger instant settlement');
        }
        finally {
            setIsInstantLoading(false);
        }
    };
    const fetchSettlements = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await apiClient.get('/v1/settlements');
            setSettlements(res?.items ?? []);
            setNextCursor(res?.nextCursor ?? null);
        }
        catch {
            // Empty-on-error behavior: fail gracefully to empty list
            setSettlements([]);
            setNextCursor(null);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchSettlements();
    }, [fetchSettlements]);
    // Fetch full settlement details when a row is selected
    const handleOpenDetail = useCallback(async (id) => {
        setSelectedSettlementId(id);
        setIsDetailLoading(true);
        setDetailError(null);
        try {
            const detail = await apiClient.get(`/v1/settlements/${id}`);
            setSettlementDetail(detail);
        }
        catch (err) {
            setDetailError(err?.message || 'Unable to retrieve settlement detail');
            setSettlementDetail(null);
        }
        finally {
            setIsDetailLoading(false);
        }
    }, []);
    const handleCloseDetail = useCallback(() => {
        setSelectedSettlementId(null);
        setSettlementDetail(null);
        setDetailError(null);
    }, []);
    // Compute aggregate totals for summary cards from loaded data
    const totalSettledPaise = settlements
        .filter((s) => s.status === 'SETTLED')
        .reduce((sum, s) => sum + (BigInt(s.netAmount || '0')), 0n);
    const pendingBatchPaise = settlements
        .filter((s) => s.status === 'PROCESSING' || s.status === 'PENDING')
        .reduce((sum, s) => sum + (BigInt(s.netAmount || '0')), 0n);
    const primaryBank = settlements[0]?.bankAccount;
    return (<div className="space-y-6 max-w-7xl">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-xl font-black text-[#0c2340] tracking-tight">Settlements & Escrow Balance</h2>
          <p className="text-xs text-slate-500 mt-1">
            Automated T+1 daily settlement cycles credited directly to your verified bank account via RBI Section 40 Escrow rails.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleInstantSettlement} disabled={isInstantLoading} className="px-3.5 py-2 rounded-lg bg-[#0b63e5] hover:bg-[#0957cb] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-50">
            <Zap className={`w-3.5 h-3.5 ${isInstantLoading ? 'animate-spin' : 'fill-amber-300 text-amber-300'}`}/>
            {isInstantLoading ? 'Processing Settlement…' : 'Instant Settlement (T+0)'}
          </button>
          <button onClick={fetchSettlements} disabled={isLoading} className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50">
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`}/>
            Refresh
          </button>
        </div>
      </div>

      {/* Instant Settlement Success Banner */}
      {instantSuccess && (<div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start justify-between text-xs animate-in fade-in shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4"/>
            </div>
            <div>
              <div className="font-bold text-emerald-900">
                ₹{instantSuccess.netAmountRupees} Instantly Credited to {instantSuccess.destinationBank}
              </div>
              <div className="text-slate-600 font-mono text-[11px] mt-0.5">
                IMPS UTR: <span className="text-emerald-700 font-bold">{instantSuccess.utr}</span> · Settlement ID: {instantSuccess.settlementId}
              </div>
            </div>
          </div>
          <button onClick={() => setInstantSuccess(null)} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-4 h-4"/>
          </button>
        </div>)}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-semibold text-slate-500">Total Settled Payouts</div>
          <div className="text-2xl font-black font-mono text-slate-900">
            {isLoading ? '••••••••' : formatPaiseToInr(totalSettledPaise.toString())}
          </div>
          <div className="text-xs text-emerald-600 font-bold font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            100% On-Time T+1 Cycle
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-semibold text-slate-500">Pending Cycle Net</div>
          <div className="text-2xl font-black font-mono text-blue-600">
            {isLoading ? '••••••••' : formatPaiseToInr(pendingBatchPaise.toString())}
          </div>
          <div className="text-xs text-slate-500 font-medium">Scheduled for next batch window</div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-semibold text-slate-500">Designated Settlement Account</div>
          <div className="text-sm font-bold text-slate-900">
            {primaryBank?.bankName || 'Verified Corporate Escrow'}
          </div>
          <div className="text-xs text-slate-600 font-mono">
            A/C: {maskAccountNumber(primaryBank?.accountNumber)} {primaryBank?.ifscCode ? `· IFSC: ${primaryBank.ifscCode}` : ''}
          </div>
        </div>
      </div>

      {/* Settlements Table Container */}
      <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs" data-testid="settlements-table">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Settlement Batch</th>
              <th className="py-3 px-4">Cycle Period</th>
              <th className="py-3 px-4">Gross Captured</th>
              <th className="py-3 px-4">MDR Fees</th>
              <th className="py-3 px-4">GST Tax</th>
              <th className="py-3 px-4">Net Payout</th>
              <th className="py-3 px-4">Bank Destination</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {isLoading ? (
        // Loading Skeleton Rows
        Array.from({ length: 4 }).map((_, i) => (<tr key={i} className="animate-pulse">
                  <td className="py-4 px-4"><div className="h-3 w-24 bg-slate-200 rounded"/></td>
                  <td className="py-4 px-4"><div className="h-3 w-32 bg-slate-200 rounded"/></td>
                  <td className="py-4 px-4"><div className="h-3 w-20 bg-slate-200 rounded"/></td>
                  <td className="py-4 px-4"><div className="h-3 w-16 bg-slate-200 rounded"/></td>
                  <td className="py-4 px-4"><div className="h-3 w-16 bg-slate-200 rounded"/></td>
                  <td className="py-4 px-4"><div className="h-3 w-24 bg-slate-200 rounded"/></td>
                  <td className="py-4 px-4"><div className="h-3 w-28 bg-slate-200 rounded"/></td>
                  <td className="py-4 px-4"><div className="h-4 w-18 bg-slate-200 rounded"/></td>
                  <td className="py-4 px-4 text-right"><div className="h-3 w-12 bg-slate-200 rounded ml-auto"/></td>
                </tr>))) : settlements.length === 0 ? (
        // Empty State
        <tr>
                <td colSpan={9} className="py-12 text-center text-[#64748b]" data-testid="empty-settlements">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Landmark className="w-8 h-8 text-[#64748b]/50"/>
                    <span className="font-semibold text-sm text-[#0f172a]">No Settlements Recorded</span>
                    <span className="text-xs text-[#64748b]">
                      Captured payments will accumulate and settle in the next automated daily batch.
                    </span>
                  </div>
                </td>
              </tr>) : (settlements.map((s) => (<tr key={s.id} onClick={() => handleOpenDetail(s.id)} className="hover:bg-slate-50/70 transition-colors cursor-pointer group" data-testid={`settlement-row-${s.id}`}>
                  <td className="py-3.5 px-4 font-mono text-blue-600 font-bold group-hover:text-blue-700 transition-colors">
                    {s.id}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {formatDateTime(s.periodStart)} → {formatDateTime(s.periodEnd)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-900 font-mono">
                    {formatPaiseToInr(s.grossAmount)}
                  </td>
                  <td className="py-3.5 px-4 text-rose-600 font-mono">
                    -{formatPaiseToInr(s.feeAmount)}
                  </td>
                  <td className="py-3.5 px-4 text-rose-600 font-mono">
                    -{formatPaiseToInr(s.taxAmount)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-900 font-black font-mono">
                    {formatPaiseToInr(s.netAmount)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    <div className="font-semibold">{s.bankAccount?.bankName || 'HDFC Escrow'}</div>
                    <div className="font-mono text-[10px] text-slate-500">
                      {maskAccountNumber(s.bankAccount?.accountNumber)}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(s.status)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center text-blue-600 text-xs font-bold group-hover:translate-x-0.5 transition-transform">
                      Details <ChevronRight className="w-3.5 h-3.5 ml-0.5"/>
                    </span>
                  </td>
                </tr>)))}
          </tbody>
        </table>

        {/* Deferred Cursor Pagination Footer Notice */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-600"/>
            <span>
              Showing {settlements.length} settlement batches. (Cursor pagination via <code className="font-mono text-slate-800">nextCursor</code> is explicitly deferred to v1.1).
            </span>
          </div>
          {nextCursor && (<span className="font-mono text-[10px] text-slate-500">
              nextCursor: {nextCursor.slice(0, 16)}…
            </span>)}
        </div>
      </div>

      {/* Slide-over Detail Drawer */}
      {selectedSettlementId && (<div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end transition-opacity" data-testid="settlement-detail-drawer" onClick={handleCloseDetail}>
          <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full shadow-2xl overflow-y-auto flex flex-col text-slate-900" onClick={(e) => e.stopPropagation()}>
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold tracking-tight text-[#0c2340]">Settlement Details</h3>
                  {settlementDetail && getStatusBadge(settlementDetail.status)}
                </div>
                <div className="text-xs font-mono text-slate-500 mt-1">
                  ID: {selectedSettlementId}
                </div>
              </div>
              <button onClick={handleCloseDetail} data-testid="close-detail-drawer" className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5"/>
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-6 flex-1">
              {isDetailLoading ? (<div className="py-20 flex flex-col items-center justify-center space-y-3 text-slate-400">
                  <RefreshCw className="w-6 h-6 animate-spin text-blue-600"/>
                  <span className="text-xs font-mono">Loading settlement breakdown…</span>
                </div>) : detailError ? (<div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
                  <div className="font-bold text-[#0f172a]">Error Loading Detail</div>
                  <div className="text-[#0f172a]/80">{detailError}</div>
                </div>) : settlementDetail ? (<>
                  {/* Financial Breakdown Table */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
                      Accounting Breakdown
                    </h4>
                    <div className="bg-[#f8fafc]/60 border border-[#0f172a]/[0.08] rounded-[4px] divide-y divide-[#0f172a]/[0.06] text-xs">
                      <div className="p-3 flex justify-between items-center">
                        <span className="text-[#64748b]">Gross Captured Sales</span>
                        <span className="font-mono text-[#0f172a] font-semibold">
                          {formatPaiseToInr(settlementDetail.grossAmount)}
                        </span>
                      </div>
                      <div className="p-3 flex justify-between items-center">
                        <span className="text-[#64748b]">MDR Platform Fees</span>
                        <span className="font-mono text-[#B0503F]">
                          -{formatPaiseToInr(settlementDetail.feeAmount)}
                        </span>
                      </div>
                      <div className="p-3 flex justify-between items-center">
                        <span className="text-[#64748b]">GST on Platform Fees (18%)</span>
                        <span className="font-mono text-[#B0503F]">
                          -{formatPaiseToInr(settlementDetail.taxAmount)}
                        </span>
                      </div>
                      {settlementDetail.refundDeductions && settlementDetail.refundDeductions !== '0' && (<div className="p-3 flex justify-between items-center">
                          <span className="text-[#64748b]">Refund Deductions</span>
                          <span className="font-mono text-[#B0503F]">
                            -{formatPaiseToInr(settlementDetail.refundDeductions)}
                          </span>
                        </div>)}
                      {settlementDetail.adjustmentAmount && settlementDetail.adjustmentAmount !== '0' && (<div className="p-3 flex justify-between items-center">
                          <span className="text-[#64748b]">Reserve / Dispute Adjustments</span>
                          <span className="font-mono text-[#C98A2E]">
                            {formatPaiseToInr(settlementDetail.adjustmentAmount)}
                          </span>
                        </div>)}
                      <div className="p-3 bg-[#0b63e5]/5 flex justify-between items-center border-t border-[#0b63e5]/20">
                        <span className="font-bold text-[#0f172a]">Net Payout Deposited</span>
                        <span className="font-mono text-[#0b63e5] text-base font-bold">
                          {formatPaiseToInr(settlementDetail.netAmount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bank & Payout Reference Information */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
                      Bank & Wire Details
                    </h4>
                    <div className="bg-[#f8fafc]/60 border border-[#0f172a]/[0.08] rounded-[4px] p-3 text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#64748b]">Bank Name</span>
                        <span className="font-semibold text-[#0f172a]">
                          {settlementDetail.bankAccount?.bankName || 'Verified Escrow Bank'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#64748b]">Account Number</span>
                        <span className="font-mono text-[#0f172a]">
                          {maskAccountNumber(settlementDetail.bankAccount?.accountNumber)}
                        </span>
                      </div>
                      {settlementDetail.bankAccount?.ifscCode && (<div className="flex justify-between">
                          <span className="text-[#64748b]">IFSC Code</span>
                          <span className="font-mono text-[#0f172a]">
                            {settlementDetail.bankAccount.ifscCode}
                          </span>
                        </div>)}
                      <div className="flex justify-between">
                        <span className="text-[#64748b]">Provider UTR / Reference</span>
                        <span className="font-mono text-[#0f172a]">
                          {settlementDetail.providerRef || 'Pending Bank Payout UTR'}
                        </span>
                      </div>
                      {settlementDetail.notes && (<div className="flex justify-between">
                          <span className="text-[#64748b]">Notes</span>
                          <span className="text-[#0f172a] text-right">{settlementDetail.notes}</span>
                        </div>)}
                      <div className="flex justify-between">
                        <span className="text-[#64748b]">Settlement Timestamp</span>
                        <span className="font-mono text-[#0f172a]">
                          {formatDateTime(settlementDetail.settledAt || settlementDetail.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Itemized Transactions Breakdown */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
                        Itemized Transactions ({settlementDetail.items?.length ?? 0})
                      </h4>
                    </div>

                    {!settlementDetail.items || settlementDetail.items.length === 0 ? (<div className="bg-[#f8fafc]/60 border border-[#0f172a]/[0.08] rounded-[4px] p-4 text-center text-xs text-[#64748b]">
                        No itemized sub-records attached to this cycle batch.
                      </div>) : (<div className="bg-[#f8fafc]/60 border border-[#0f172a]/[0.08] rounded-[4px] overflow-hidden">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-[#0f172a]/[0.08] text-[#64748b] font-medium text-[11px]">
                              <th className="py-2.5 px-3">Type</th>
                              <th className="py-2.5 px-3">Reference / Description</th>
                              <th className="py-2.5 px-3 text-right">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#0f172a]/[0.06]">
                            {settlementDetail.items.map((item) => (<tr key={item.id} className="hover:bg-[#0f172a]/[0.02]">
                                <td className="py-2 px-3">
                                  <span className="inline-block px-1.5 py-0.5 rounded-[2px] font-mono text-[9px] font-bold bg-[#0f172a]/10 text-[#0f172a]">
                                    {item.type}
                                  </span>
                                </td>
                                <td className="py-2 px-3 text-[#64748b] text-[11px] truncate max-w-[200px]">
                                  {item.description || item.paymentIntentId || item.id}
                                </td>
                                <td className="py-2 px-3 text-right font-mono font-medium text-[#0f172a]">
                                  {formatPaiseToInr(item.amount)}
                                </td>
                              </tr>))}
                          </tbody>
                        </table>
                      </div>)}
                  </div>
                </>) : null}
            </div>
          </div>
        </div>)}
    </div>);
};
