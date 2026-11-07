import React, { useState } from 'react';
import { X, Copy, CheckCircle2, RotateCcw, FileCode, } from 'lucide-react';
import { useToast } from './Toast.jsx';
export const TransactionDrawer = ({ transaction, onClose, onInitiateRefund, }) => {
    const { showToast } = useToast();
    const [showJson, setShowJson] = useState(false);
    const [showRefundConfirm, setShowRefundConfirm] = useState(false);
    if (!transaction)
        return null;
    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        showToast(`Copied ${label} to clipboard`, 'success');
    };
    const mdrFee = (transaction.amountRaw * 0.02).toFixed(2);
    const gstOnFee = (parseFloat(mdrFee) * 0.18).toFixed(2);
    const netSettled = (transaction.amountRaw - parseFloat(mdrFee) - parseFloat(gstOnFee)).toFixed(2);
    return (<div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={onClose}/>

      {/* Slide-over Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 flex flex-col justify-between overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-200">
          <div>
            {/* Header */}
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block tracking-wider">
                  Payment Details
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-base font-bold font-mono text-slate-900">{transaction.id}</span>
                  <button onClick={() => copyToClipboard(transaction.id, 'Payment ID')} className="text-slate-400 hover:text-slate-700 transition-colors">
                    <Copy className="w-3.5 h-3.5"/>
                  </button>
                </div>
              </div>

              <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors">
                <X className="w-4 h-4"/>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6">
              {/* Main Amount & Status Banner */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Captured Amount</span>
                  <div className="text-2xl font-bold font-mono text-slate-900">{transaction.amount}</div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${transaction.status === 'CAPTURED'
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            : transaction.status === 'PROCESSING'
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : transaction.status === 'FAILED'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                  {transaction.status === 'CAPTURED' && <CheckCircle2 className="w-3 h-3"/>}
                  {transaction.status}
                </span>
              </div>

              {/* Payment Timeline Steps */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Payment Lifecycle Timeline
                </h4>
                <div className="space-y-2 pl-2 border-l-2 border-slate-200 text-xs">
                  {transaction.steps.map((step, idx) => (<div key={step} className="relative pl-4">
                      <span className="absolute -left-[17px] top-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-white"/>
                      <div className="font-bold text-slate-800">{step}</div>
                      <div className="text-[10px] text-slate-400">Step {idx + 1} processed successfully</div>
                    </div>))}
                </div>
              </div>

              {/* Customer & Order Details */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Customer & Order
                </h4>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Customer Name:</span>
                    <span className="font-semibold text-slate-900">{transaction.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email Address:</span>
                    <span className="font-semibold text-slate-900">{transaction.customerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Order ID:</span>
                    <span className="font-mono font-bold text-blue-600">{transaction.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payment Instrument:</span>
                    <span className="font-semibold text-slate-900">{transaction.methodDetail}</span>
                  </div>
                </div>
              </div>

              {/* Fee & GST Breakdown */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  MDR Fee & Settlement Calculation
                </h4>
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-600">
                    <span>Gross Amount:</span>
                    <span>₹{transaction.amountRaw.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Gateway Fee (2.0% MDR):</span>
                    <span className="text-rose-600">- ₹{mdrFee}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GST (18% on fee):</span>
                    <span className="text-rose-600">- ₹{gstOnFee}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between text-slate-900 font-bold text-sm">
                    <span>Net Settled Amount:</span>
                    <span className="text-emerald-600">₹{netSettled}</span>
                  </div>
                </div>
              </div>

              {/* Gateway References */}
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs space-y-1">
                <div className="text-slate-500">Bank Reference (RRN / ARN):</div>
                <div className="font-mono font-bold text-blue-900 flex items-center justify-between">
                  <span>{transaction.arn || 'ARN99281029381'}</span>
                  <button onClick={() => copyToClipboard(transaction.arn || 'ARN99281029381', 'ARN')} className="text-blue-600 hover:text-blue-800">
                    <Copy className="w-3 h-3"/>
                  </button>
                </div>
              </div>

              {/* Raw JSON Toggle */}
              <div>
                <button onClick={() => setShowJson(!showJson)} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-medium transition-colors">
                  <FileCode className="w-3.5 h-3.5"/>
                  {showJson ? 'Hide Raw API JSON' : 'Inspect Raw API Payload'}
                </button>
                {showJson && (<pre className="mt-2 p-3 bg-slate-900 text-slate-200 rounded-lg text-[10px] font-mono overflow-x-auto">
                    {JSON.stringify(transaction, null, 2)}
                  </pre>)}
              </div>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <button onClick={() => setShowRefundConfirm(true)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all shadow-xs">
              <RotateCcw className="w-3.5 h-3.5"/>
              Issue Refund
            </button>

            <button onClick={onClose} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs">
              Done
            </button>
          </div>
        </div>
      </div>

      {/* Refund Confirmation Modal */}
      {showRefundConfirm && (<div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-600">
              <RotateCcw className="w-5 h-5"/>
              <h3 className="text-sm font-bold text-slate-900">Confirm Instant Refund</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to refund <span className="font-bold font-mono text-slate-900">{transaction.amount}</span> to <span className="font-semibold text-slate-900">{transaction.customerName}</span>? Funds will be credited back via original payment rail within 1-2 hours.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowRefundConfirm(false)} className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200">
                Cancel
              </button>
              <button onClick={() => {
                setShowRefundConfirm(false);
                onInitiateRefund?.(transaction);
            }} className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs">
                Proceed Refund
              </button>
            </div>
          </div>
        </div>)}
    </div>);
};
