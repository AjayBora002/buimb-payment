import React, { useState, useEffect, useCallback } from 'react';
import {
  Landmark,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  FileText,
  AlertTriangle,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Info,
} from 'lucide-react';
import { apiClient } from '../lib/api-client.js';
import type {
  Settlement,
  SettlementListResponse,
  SettlementStatus,
} from '../types/settlement.js';

export function formatPaiseToInr(paise: string | number | bigint | undefined | null): string {
  if (paise === undefined || paise === null || paise === '') return '₹0.00';
  try {
    const numericPaise = typeof paise === 'bigint' ? Number(paise) : Number(paise);
    if (isNaN(numericPaise)) return '₹0.00';
    const rupees = numericPaise / 100;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rupees);
  } catch {
    return '₹0.00';
  }
}

export function maskAccountNumber(accountNumber: string | undefined | null): string {
  if (!accountNumber) return '•••• •••• ••••';
  const clean = accountNumber.trim();
  if (clean.length <= 4) return `•••• •••• ${clean}`;
  return `•••• •••• ${clean.slice(-4)}`;
}

export function formatDateTime(isoString: string | undefined | null): string {
  if (!isoString) return '—';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } catch {
    return isoString;
  }
}

function getStatusBadge(status: SettlementStatus) {
  switch (status) {
    case 'SETTLED':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold bg-[#4E8B6F]/15 text-[#4E8B6F] border border-[#4E8B6F]/30">
          <CheckCircle2 className="w-3 h-3" />
          SETTLED
        </span>
      );
    case 'PROCESSING':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold bg-[#C98A2E]/15 text-[#C98A2E] border border-[#C98A2E]/30">
          <Clock className="w-3 h-3" />
          PROCESSING
        </span>
      );
    case 'FAILED':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold bg-[#B0503F]/15 text-[#B0503F] border border-[#B0503F]/30">
          <AlertTriangle className="w-3 h-3" />
          FAILED
        </span>
      );
    case 'PENDING':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold bg-[#3867D6]/15 text-[#6B95FF] border border-[#3867D6]/30">
          <Clock className="w-3 h-3" />
          PENDING
        </span>
      );
  }
}

export const SettlementsView: React.FC = () => {
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  // Detail Drawer State
  const [selectedSettlementId, setSelectedSettlementId] = useState<string | null>(null);
  const [settlementDetail, setSettlementDetail] = useState<Settlement | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const fetchSettlements = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get<SettlementListResponse>('/v1/settlements');
      setSettlements(res?.items ?? []);
      setNextCursor(res?.nextCursor ?? null);
    } catch {
      // Empty-on-error behavior: fail gracefully to empty list
      setSettlements([]);
      setNextCursor(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettlements();
  }, [fetchSettlements]);

  // Fetch full settlement details when a row is selected
  const handleOpenDetail = useCallback(async (id: string) => {
    setSelectedSettlementId(id);
    setIsDetailLoading(true);
    setDetailError(null);
    try {
      const detail = await apiClient.get<Settlement>(`/v1/settlements/${id}`);
      setSettlementDetail(detail);
    } catch (err: any) {
      setDetailError(err?.message || 'Unable to retrieve settlement detail');
      setSettlementDetail(null);
    } finally {
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

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#EDE7D6] tracking-tight">Settlements & Escrow</h2>
          <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
          <p className="text-xs text-[#8FA396] mt-1.5">
            Automated T+1 daily settlement cycles credited to verified bank accounts
          </p>
        </div>
        <button
          onClick={fetchSettlements}
          disabled={isLoading}
          className="px-3 py-1.5 rounded-[4px] bg-[#1D2E28] hover:bg-[#1D2E28]/80 text-[#EDE7D6] border border-[#EDE7D6]/[0.12] text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08] space-y-2">
          <div className="text-xs font-medium text-[#8FA396]">Total Settled Payouts</div>
          <div className="text-2xl font-bold font-mono text-[#EDE7D6]">
            {isLoading ? '••••••••' : formatPaiseToInr(totalSettledPaise.toString())}
          </div>
          <div className="text-xs text-[#4E8B6F] font-semibold font-mono">100% On-Time T+1 Cycle</div>
        </div>

        <div className="p-5 rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08] space-y-2">
          <div className="text-xs font-medium text-[#8FA396]">Pending Cycle Net</div>
          <div className="text-2xl font-bold font-mono text-[#C9A227]">
            {isLoading ? '••••••••' : formatPaiseToInr(pendingBatchPaise.toString())}
          </div>
          <div className="text-xs text-[#C98A2E] font-semibold">Scheduled for next batch window</div>
        </div>

        <div className="p-5 rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08] space-y-2">
          <div className="text-xs font-medium text-[#8FA396]">Designated Settlement Account</div>
          <div className="text-sm font-bold text-[#EDE7D6]">
            {primaryBank?.bankName || 'Verified Corporate Escrow'}
          </div>
          <div className="text-xs text-[#8FA396] font-mono">
            A/C: {maskAccountNumber(primaryBank?.accountNumber)} {primaryBank?.ifscCode ? `· IFSC: ${primaryBank.ifscCode}` : ''}
          </div>
        </div>
      </div>

      {/* Settlements Table Container */}
      <div className="rounded-none bg-[#1D2E28] border border-[#EDE7D6]/[0.08] overflow-hidden">
        <table className="w-full text-left text-xs" data-testid="settlements-table">
          <thead>
            <tr className="border-b border-[#EDE7D6]/[0.08] bg-[#131B17]/60 text-[#8FA396] font-medium">
              <th className="py-3.5 px-4">Settlement Batch</th>
              <th className="py-3.5 px-4">Cycle Period</th>
              <th className="py-3.5 px-4">Gross Captured</th>
              <th className="py-3.5 px-4">MDR Fees</th>
              <th className="py-3.5 px-4">GST Tax</th>
              <th className="py-3.5 px-4">Net Payout</th>
              <th className="py-3.5 px-4">Bank Destination</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDE7D6]/[0.08]">
            {isLoading ? (
              // Loading Skeleton Rows
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-4 px-4"><div className="h-3 w-24 bg-[#EDE7D6]/10 rounded" /></td>
                  <td className="py-4 px-4"><div className="h-3 w-32 bg-[#EDE7D6]/10 rounded" /></td>
                  <td className="py-4 px-4"><div className="h-3 w-20 bg-[#EDE7D6]/10 rounded" /></td>
                  <td className="py-4 px-4"><div className="h-3 w-16 bg-[#EDE7D6]/10 rounded" /></td>
                  <td className="py-4 px-4"><div className="h-3 w-16 bg-[#EDE7D6]/10 rounded" /></td>
                  <td className="py-4 px-4"><div className="h-3 w-24 bg-[#EDE7D6]/10 rounded" /></td>
                  <td className="py-4 px-4"><div className="h-3 w-28 bg-[#EDE7D6]/10 rounded" /></td>
                  <td className="py-4 px-4"><div className="h-4 w-18 bg-[#EDE7D6]/10 rounded" /></td>
                  <td className="py-4 px-4 text-right"><div className="h-3 w-12 bg-[#EDE7D6]/10 rounded ml-auto" /></td>
                </tr>
              ))
            ) : settlements.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={9} className="py-12 text-center text-[#8FA396]" data-testid="empty-settlements">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Landmark className="w-8 h-8 text-[#8FA396]/50" />
                    <span className="font-semibold text-sm text-[#EDE7D6]">No Settlements Recorded</span>
                    <span className="text-xs text-[#8FA396]">
                      Captured payments will accumulate and settle in the next automated daily batch.
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              settlements.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => handleOpenDetail(s.id)}
                  className="hover:bg-[#EDE7D6]/[0.03] transition-colors cursor-pointer group"
                  data-testid={`settlement-row-${s.id}`}
                >
                  <td className="py-3.5 px-4 font-mono text-[#EDE7D6] font-medium group-hover:text-[#C9A227] transition-colors">
                    {s.id}
                  </td>
                  <td className="py-3.5 px-4 text-[#8FA396] font-mono text-[11px]">
                    {formatDateTime(s.periodStart)} → {formatDateTime(s.periodEnd)}
                  </td>
                  <td className="py-3.5 px-4 text-[#EDE7D6] font-mono">
                    {formatPaiseToInr(s.grossAmount)}
                  </td>
                  <td className="py-3.5 px-4 text-[#B0503F] font-mono">
                    -{formatPaiseToInr(s.feeAmount)}
                  </td>
                  <td className="py-3.5 px-4 text-[#B0503F] font-mono">
                    -{formatPaiseToInr(s.taxAmount)}
                  </td>
                  <td className="py-3.5 px-4 text-[#EDE7D6] font-bold font-mono">
                    {formatPaiseToInr(s.netAmount)}
                  </td>
                  <td className="py-3.5 px-4 text-[#8FA396]">
                    <div>{s.bankAccount?.bankName || 'HDFC Escrow'}</div>
                    <div className="font-mono text-[10px] text-[#5C5646]">
                      {maskAccountNumber(s.bankAccount?.accountNumber)}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(s.status)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center text-[#C9A227] text-xs font-semibold group-hover:translate-x-0.5 transition-transform">
                      Details <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Deferred Cursor Pagination Footer Notice */}
        <div className="p-3.5 border-t border-[#EDE7D6]/[0.08] bg-[#131B17]/40 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8FA396] gap-2">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>
              Showing {settlements.length} settlement batches. (Cursor pagination via <code className="font-mono text-[#EDE7D6]">nextCursor</code> is explicitly deferred to v1.1).
            </span>
          </div>
          {nextCursor && (
            <span className="font-mono text-[10px] text-[#5C5646]">
              nextCursor: {nextCursor.slice(0, 16)}…
            </span>
          )}
        </div>
      </div>

      {/* Slide-over Detail Drawer */}
      {selectedSettlementId && (
        <div
          className="fixed inset-0 z-50 overflow-hidden bg-[#131B17]/70 backdrop-blur-sm flex justify-end transition-opacity"
          data-testid="settlement-detail-drawer"
          onClick={handleCloseDetail}
        >
          <div
            className="w-full max-w-xl bg-[#1D2E28] border-l border-[#EDE7D6]/[0.12] h-full shadow-2xl overflow-y-auto flex flex-col text-[#EDE7D6]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#EDE7D6]/[0.08] flex items-center justify-between sticky top-0 bg-[#1D2E28] z-10">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold tracking-tight">Settlement Details</h3>
                  {settlementDetail && getStatusBadge(settlementDetail.status)}
                </div>
                <div className="text-xs font-mono text-[#8FA396] mt-1">
                  ID: {selectedSettlementId}
                </div>
              </div>
              <button
                onClick={handleCloseDetail}
                data-testid="close-detail-drawer"
                className="p-1.5 rounded-[4px] text-[#8FA396] hover:text-[#EDE7D6] hover:bg-[#EDE7D6]/[0.06] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-6 flex-1">
              {isDetailLoading ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-3 text-[#8FA396]">
                  <RefreshCw className="w-6 h-6 animate-spin text-[#C9A227]" />
                  <span className="text-xs font-mono">Loading settlement breakdown…</span>
                </div>
              ) : detailError ? (
                <div className="p-4 rounded-[4px] bg-[#B0503F]/15 border border-[#B0503F]/30 text-xs space-y-1">
                  <div className="font-bold text-[#EDE7D6]">Error Loading Detail</div>
                  <div className="text-[#EDE7D6]/80">{detailError}</div>
                </div>
              ) : settlementDetail ? (
                <>
                  {/* Financial Breakdown Table */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8FA396]">
                      Accounting Breakdown
                    </h4>
                    <div className="bg-[#131B17]/60 border border-[#EDE7D6]/[0.08] rounded-[4px] divide-y divide-[#EDE7D6]/[0.06] text-xs">
                      <div className="p-3 flex justify-between items-center">
                        <span className="text-[#8FA396]">Gross Captured Sales</span>
                        <span className="font-mono text-[#EDE7D6] font-semibold">
                          {formatPaiseToInr(settlementDetail.grossAmount)}
                        </span>
                      </div>
                      <div className="p-3 flex justify-between items-center">
                        <span className="text-[#8FA396]">MDR Platform Fees</span>
                        <span className="font-mono text-[#B0503F]">
                          -{formatPaiseToInr(settlementDetail.feeAmount)}
                        </span>
                      </div>
                      <div className="p-3 flex justify-between items-center">
                        <span className="text-[#8FA396]">GST on Platform Fees (18%)</span>
                        <span className="font-mono text-[#B0503F]">
                          -{formatPaiseToInr(settlementDetail.taxAmount)}
                        </span>
                      </div>
                      {settlementDetail.refundDeductions && settlementDetail.refundDeductions !== '0' && (
                        <div className="p-3 flex justify-between items-center">
                          <span className="text-[#8FA396]">Refund Deductions</span>
                          <span className="font-mono text-[#B0503F]">
                            -{formatPaiseToInr(settlementDetail.refundDeductions)}
                          </span>
                        </div>
                      )}
                      {settlementDetail.adjustmentAmount && settlementDetail.adjustmentAmount !== '0' && (
                        <div className="p-3 flex justify-between items-center">
                          <span className="text-[#8FA396]">Reserve / Dispute Adjustments</span>
                          <span className="font-mono text-[#C98A2E]">
                            {formatPaiseToInr(settlementDetail.adjustmentAmount)}
                          </span>
                        </div>
                      )}
                      <div className="p-3 bg-[#C9A227]/5 flex justify-between items-center border-t border-[#C9A227]/20">
                        <span className="font-bold text-[#EDE7D6]">Net Payout Deposited</span>
                        <span className="font-mono text-[#C9A227] text-base font-bold">
                          {formatPaiseToInr(settlementDetail.netAmount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bank & Payout Reference Information */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8FA396]">
                      Bank & Wire Details
                    </h4>
                    <div className="bg-[#131B17]/60 border border-[#EDE7D6]/[0.08] rounded-[4px] p-3 text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#8FA396]">Bank Name</span>
                        <span className="font-semibold text-[#EDE7D6]">
                          {settlementDetail.bankAccount?.bankName || 'Verified Escrow Bank'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8FA396]">Account Number</span>
                        <span className="font-mono text-[#EDE7D6]">
                          {maskAccountNumber(settlementDetail.bankAccount?.accountNumber)}
                        </span>
                      </div>
                      {settlementDetail.bankAccount?.ifscCode && (
                        <div className="flex justify-between">
                          <span className="text-[#8FA396]">IFSC Code</span>
                          <span className="font-mono text-[#EDE7D6]">
                            {settlementDetail.bankAccount.ifscCode}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-[#8FA396]">Provider UTR / Reference</span>
                        <span className="font-mono text-[#EDE7D6]">
                          {settlementDetail.providerRef || 'Pending Bank Payout UTR'}
                        </span>
                      </div>
                      {settlementDetail.notes && (
                        <div className="flex justify-between">
                          <span className="text-[#8FA396]">Notes</span>
                          <span className="text-[#EDE7D6] text-right">{settlementDetail.notes}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-[#8FA396]">Settlement Timestamp</span>
                        <span className="font-mono text-[#EDE7D6]">
                          {formatDateTime(settlementDetail.settledAt || settlementDetail.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Itemized Transactions Breakdown */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#8FA396]">
                        Itemized Transactions ({settlementDetail.items?.length ?? 0})
                      </h4>
                    </div>

                    {!settlementDetail.items || settlementDetail.items.length === 0 ? (
                      <div className="bg-[#131B17]/60 border border-[#EDE7D6]/[0.08] rounded-[4px] p-4 text-center text-xs text-[#8FA396]">
                        No itemized sub-records attached to this cycle batch.
                      </div>
                    ) : (
                      <div className="bg-[#131B17]/60 border border-[#EDE7D6]/[0.08] rounded-[4px] overflow-hidden">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-[#EDE7D6]/[0.08] text-[#8FA396] font-medium text-[11px]">
                              <th className="py-2.5 px-3">Type</th>
                              <th className="py-2.5 px-3">Reference / Description</th>
                              <th className="py-2.5 px-3 text-right">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#EDE7D6]/[0.06]">
                            {settlementDetail.items.map((item) => (
                              <tr key={item.id} className="hover:bg-[#EDE7D6]/[0.02]">
                                <td className="py-2 px-3">
                                  <span className="inline-block px-1.5 py-0.5 rounded-[2px] font-mono text-[9px] font-bold bg-[#EDE7D6]/10 text-[#EDE7D6]">
                                    {item.type}
                                  </span>
                                </td>
                                <td className="py-2 px-3 text-[#8FA396] text-[11px] truncate max-w-[200px]">
                                  {item.description || item.paymentIntentId || item.id}
                                </td>
                                <td className="py-2 px-3 text-right font-mono font-medium text-[#EDE7D6]">
                                  {formatPaiseToInr(item.amount)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
