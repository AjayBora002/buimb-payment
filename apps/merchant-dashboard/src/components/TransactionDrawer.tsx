import React from 'react';
import {
  X,
  Copy,
  CheckCircle2,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { useToast } from './Toast.js';

export interface TransactionRecord {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  amount: string;
  amountRaw: number;
  currency: string;
  method: string;
  methodType: 'UPI' | 'CARD' | 'NETBANKING';
  methodDetail: string;
  status: 'CAPTURED' | 'PROCESSING' | 'FAILED' | 'REFUNDED' | 'DISPUTED';
  createdAt: string;
  arn?: string;
  steps: string[];
}

interface TransactionDrawerProps {
  transaction: TransactionRecord | null;
  onClose: () => void;
  onInitiateRefund?: (tx: TransactionRecord) => void;
}

export const TransactionDrawer: React.FC<TransactionDrawerProps> = ({
  transaction,
  onClose,
  onInitiateRefund,
}) => {
  const { showToast } = useToast();

  if (!transaction) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard`, 'success');
  };

  const getStatusBadge = (status: TransactionRecord['status']) => {
    switch (status) {
      case 'CAPTURED':
        return 'border-[#4E8B6F] text-[#4E8B6F] bg-[#4E8B6F]/5';
      case 'PROCESSING':
        return 'border-[#C98A2E] text-[#C98A2E] bg-[#C98A2E]/5';
      case 'FAILED':
        return 'border-[#B0503F] text-[#B0503F] bg-[#B0503F]/5';
      case 'REFUNDED':
        return 'border-[#8FA396] text-[#8FA396] bg-transparent';
      case 'DISPUTED':
        return 'border-[#C98A2E] text-[#C98A2E] bg-[#C98A2E]/5';
      default:
        return 'border-[#8FA396] text-[#8FA396] bg-transparent';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#131B17]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#131B17] border-l border-[rgba(237,231,214,0.12)] flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
          <div>
            {/* Header */}
            <div className="p-6 border-b border-[rgba(237,231,214,0.08)] bg-[#1D2E28] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#8FA396] uppercase block">
                  Sandbox Transaction Detail
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="text-sm font-mono font-bold text-[#EDE7D6]">{transaction.id}</h3>
                  <button
                    onClick={() => copyToClipboard(transaction.id, 'Payment ID')}
                    className="p-1 rounded-[2px] text-[#8FA396] hover:text-[#EDE7D6] hover:bg-[#131B17] transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-[4px] text-[#8FA396] hover:text-[#EDE7D6] hover:bg-[#131B17] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-xs">
              {/* Gross Amount & Status */}
              <div className="p-4 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#8FA396]">Gross Amount</span>
                  <div className="text-2xl font-bold font-mono text-[#EDE7D6] tabular-nums mt-0.5">
                    {transaction.amount}
                  </div>
                  <span className="text-[10px] font-mono text-[#8FA396]">Currency: {transaction.currency}</span>
                </div>
                <div className="text-right space-y-1">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-[2px] font-mono text-xs font-bold border ${getStatusBadge(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                  <div className="text-[10px] font-mono text-[#8FA396]">Simulated Auth</div>
                </div>
              </div>

              {/* State Machine Transition Timeline */}
              <div className="space-y-2">
                <div>
                  <h4 className="text-xs font-bold text-[#EDE7D6] uppercase">
                    State Machine Lifecycle
                  </h4>
                  <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
                </div>
                <div className="p-4 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)] space-y-3">
                  {['CREATED', 'PROCESSING', 'AUTHORISED', 'CAPTURED'].map((step, idx) => {
                    const isDone = transaction.steps.includes(step);
                    return (
                      <div key={step} className="flex items-start gap-3 relative">
                        {idx < 3 && (
                          <div
                            className={`absolute left-2 top-4 w-0.5 h-6 ${
                              isDone ? 'bg-[#4E8B6F]' : 'bg-[rgba(237,231,214,0.1)]'
                            }`}
                          />
                        )}
                        <div
                          className={`w-4 h-4 rounded-[2px] flex items-center justify-center flex-shrink-0 z-10 ${
                            isDone
                              ? 'bg-[#4E8B6F] text-[#131B17]'
                              : 'bg-[#131B17] text-[#8FA396] border border-[rgba(237,231,214,0.1)]'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-2.5 h-2.5" />}
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                          <span className={`font-mono text-[11px] ${isDone ? 'text-[#EDE7D6] font-semibold' : 'text-[#8FA396]'}`}>
                            {step}
                          </span>
                          <span className="text-[10px] font-mono text-[#8FA396]">
                            {isDone ? 'Complete' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Metadata Attributes */}
              <div className="space-y-2">
                <div>
                  <h4 className="text-xs font-bold text-[#EDE7D6] uppercase">
                    Transaction Metadata
                  </h4>
                  <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
                </div>
                <div className="p-4 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)] divide-y divide-[rgba(237,231,214,0.06)]">
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-[#8FA396]">Order ID</span>
                    <div className="flex items-center gap-1.5 font-mono text-[#EDE7D6]">
                      {transaction.orderId}
                      <button
                        onClick={() => copyToClipboard(transaction.orderId, 'Order ID')}
                        className="text-[#8FA396] hover:text-[#EDE7D6]"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-[#8FA396]">Customer</span>
                    <div className="text-right">
                      <div className="text-[#EDE7D6] font-semibold">{transaction.customerName}</div>
                      <div className="text-[11px] font-mono text-[#8FA396]">{transaction.customerEmail}</div>
                    </div>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-[#8FA396]">Instrument / Rail</span>
                    <div className="text-right">
                      <div className="text-[#EDE7D6] font-semibold">{transaction.method}</div>
                      <div className="text-[11px] text-[#8FA396]">{transaction.methodDetail}</div>
                    </div>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-[#8FA396]">Created At</span>
                    <span className="font-mono text-[#EDE7D6] tabular-nums">{transaction.createdAt}</span>
                  </div>

                  {transaction.arn && (
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-[#8FA396]">Bank ARN</span>
                      <span className="font-mono text-[#C9A227]">{transaction.arn}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-[rgba(237,231,214,0.08)] bg-[#1D2E28] flex gap-3">
            {transaction.status === 'CAPTURED' && (
              <button
                onClick={() => onInitiateRefund?.(transaction)}
                className="flex-1 py-2 px-3 rounded-[4px] bg-[#131B17] hover:bg-[#243831] text-[#EDE7D6] font-semibold flex items-center justify-center gap-1.5 border border-[rgba(237,231,214,0.1)] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#C9A227]" />
                Initiate Refund
              </button>
            )}
            <button
              onClick={onClose}
              className="py-2 px-4 rounded-[4px] bg-[#C9A227] hover:bg-[#DBB53B] text-[#131B17] font-bold transition-colors border border-[#B08C1E]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
