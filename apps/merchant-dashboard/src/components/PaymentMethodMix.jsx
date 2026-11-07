import React from 'react';
import { Smartphone, CreditCard, Building2, Wallet } from 'lucide-react';
export const PaymentMethodMix = () => {
    const methods = [
        { name: 'UPI', percentage: 68, amount: '₹2,33,138.00', color: '#0D6EFD', icon: Smartphone },
        { name: 'Cards', percentage: 22, amount: '₹75,427.00', color: '#10B981', icon: CreditCard },
        { name: 'Net Banking', percentage: 7, amount: '₹23,999.00', color: '#8B5CF6', icon: Building2 },
        { name: 'Wallets', percentage: 3, amount: '₹10,286.00', color: '#F59E0B', icon: Wallet },
    ];
    return (<div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Payment Method Mix</h3>
          <p className="text-xs text-slate-500 mt-0.5">Distribution across customer instruments</p>
        </div>
        <span className="text-xs font-mono font-bold text-blue-600">4 Active Rails</span>
      </div>

      {/* Stacked Horizontal Progress Bar */}
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex gap-0.5 p-0.5 border border-slate-200">
        {methods.map((m) => (<div key={m.name} className="h-full rounded-full transition-all duration-300" style={{ width: `${m.percentage}%`, backgroundColor: m.color }} title={`${m.name}: ${m.percentage}%`}/>))}
      </div>

      {/* Method List */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {methods.map((m) => {
            const Icon = m.icon;
            return (<div key={m.name} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: m.color }}/>
                <span className="font-semibold text-slate-800">{m.name}</span>
              </div>
              <div className="text-right">
                <span className="font-bold font-mono text-slate-900">{m.percentage}%</span>
                <span className="block text-[10px] font-mono text-slate-400">{m.amount}</span>
              </div>
            </div>);
        })}
      </div>
    </div>);
};
