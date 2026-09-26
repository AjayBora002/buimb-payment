import React from 'react';
import { Smartphone, CreditCard, Building2, Wallet } from 'lucide-react';

export const PaymentMethodMix: React.FC = () => {
  const methods = [
    { name: 'UPI', percentage: 68, amount: '₹10,08,100', color: '#C9A227', icon: Smartphone },
    { name: 'Cards', percentage: 22, amount: '₹3,26,150', color: '#4E8B6F', icon: CreditCard },
    { name: 'Net Banking', percentage: 7, amount: '₹1,03,775', color: '#C98A2E', icon: Building2 },
    { name: 'Wallets', percentage: 3, amount: '₹44,475', color: '#8FA396', icon: Wallet },
  ];

  return (
    <div className="p-6 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)] flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#EDE7D6]">Payment Method Mix</h3>
          <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
          <p className="text-xs text-[#8FA396] mt-1">Distribution across customer instruments</p>
        </div>
        <span className="text-xs font-mono font-bold text-[#C9A227]">4 Active Rails</span>
      </div>

      {/* Stacked Horizontal Progress Bar (Rule style) */}
      <div className="h-2 w-full bg-[#131B17] flex gap-0.5 border border-[rgba(237,231,214,0.08)]">
        {methods.map((m) => (
          <div
            key={m.name}
            className="h-full transition-all duration-300"
            style={{ width: `${m.percentage}%`, backgroundColor: m.color }}
            title={`${m.name}: ${m.percentage}%`}
          />
        ))}
      </div>

      {/* Method List */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {methods.map((m) => {
          return (
            <div
              key={m.name}
              className="p-2.5 bg-[#131B17] border border-[rgba(237,231,214,0.08)] flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 flex-shrink-0"
                  style={{ backgroundColor: m.color }}
                />
                <span className="font-semibold text-[#EDE7D6]">{m.name}</span>
              </div>
              <div className="text-right">
                <span className="font-bold font-mono text-[#EDE7D6] tabular-nums">{m.percentage}%</span>
                <span className="block text-[10px] font-mono text-[#8FA396] tabular-nums">{m.amount}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
