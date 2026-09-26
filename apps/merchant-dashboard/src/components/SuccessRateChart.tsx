import React from 'react';
import { CheckCircle2, AlertOctagon, RotateCcw, Clock } from 'lucide-react';

export const SuccessRateChart: React.FC = () => {
  const metrics = [
    { label: 'Captured', rate: '99.1%', count: '1,248', color: '#4E8B6F', border: 'border-[#4E8B6F]', icon: CheckCircle2 },
    { label: 'Processing', rate: '0.5%', count: '6', color: '#C98A2E', border: 'border-[#C98A2E]', icon: Clock },
    { label: 'Failed', rate: '0.3%', count: '4', color: '#B0503F', border: 'border-[#B0503F]', icon: AlertOctagon },
    { label: 'Refunded', rate: '0.1%', count: '2', color: '#8FA396', border: 'border-[#8FA396]', icon: RotateCcw },
  ];

  // Daily success rates for the mini-trend line
  const rates = [98.4, 98.8, 99.0, 98.9, 99.2, 99.1, 99.1];
  const width = 300;
  const height = 90;
  const padding = 10;
  const minRate = 97.5;
  const maxRate = 100;

  const points = rates.map((r, i) => {
    const x = padding + (i / (rates.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((r - minRate) / (maxRate - minRate)) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="p-6 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)] flex flex-col justify-between space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#EDE7D6]">Payment Success Rate</h3>
            <span className="px-1.5 py-0.5 rounded-[2px] text-[10px] font-mono font-bold text-[#4E8B6F] border border-[#4E8B6F]">
              OPTIMAL (99.1%)
            </span>
          </div>
          <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />
          <div className="text-xs text-[#8FA396] mt-1">
            Simulated gateway authorisation rate over 30 days
          </div>
        </div>
      </div>

      {/* Mini Trend Line */}
      <div className="p-3 bg-[#131B17] border border-[rgba(237,231,214,0.08)]">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#8FA396] mb-2">
          <span>7-day Authorization Stability</span>
          <span className="font-bold text-[#4E8B6F] tabular-nums">99.10% avg</span>
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16 overflow-visible">
          <polyline
            fill="none"
            stroke="#4E8B6F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
          {rates.map((r, i) => {
            const x = padding + (i / (rates.length - 1)) * (width - 2 * padding);
            const y = height - padding - ((r - minRate) / (maxRate - minRate)) * (height - 2 * padding);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill="#131B17"
                stroke="#4E8B6F"
                strokeWidth="1.5"
              />
            );
          })}
        </svg>
      </div>

      {/* Status Breakdown Stamps */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className={`p-3 bg-[#131B17] border ${m.border} flex items-center justify-between text-xs`}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-3.5 h-3.5" style={{ color: m.color }} />
                <div>
                  <div className="text-[#8FA396] text-[11px]">{m.label}</div>
                  <div className="font-bold font-mono text-[#EDE7D6] tabular-nums">{m.count}</div>
                </div>
              </div>
              <span className="font-bold font-mono tabular-nums text-xs" style={{ color: m.color }}>
                {m.rate}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
