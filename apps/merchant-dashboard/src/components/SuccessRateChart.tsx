import React from 'react';
import { CheckCircle2, AlertOctagon, RotateCcw, Clock } from 'lucide-react';

export const SuccessRateChart: React.FC = () => {
  const metrics = [
    { label: 'Captured', rate: '99.1%', count: '1,248', color: '#10B981', bg: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
    { label: 'Processing', rate: '0.5%', count: '6', color: '#F59E0B', bg: 'bg-amber-50 text-amber-700', icon: Clock },
    { label: 'Failed', rate: '0.3%', count: '4', color: '#EF4444', bg: 'bg-rose-50 text-rose-700', icon: AlertOctagon },
    { label: 'Refunded', rate: '0.1%', count: '2', color: '#64748B', bg: 'bg-slate-100 text-slate-700', icon: RotateCcw },
  ];

  // Daily success rates
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
    <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">Success Rate</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              OPTIMAL (99.1%)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Gateway authorization stability over 30 days
          </p>
        </div>
      </div>

      {/* Mini Trend Line */}
      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>7-day Authorization Stability</span>
          <span className="font-bold text-emerald-600 font-mono">99.10% avg</span>
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-14 overflow-visible">
          <polyline
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
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
                r="3.5"
                className="fill-white stroke-emerald-600 stroke-2"
              />
            );
          })}
        </svg>
      </div>

      {/* Status Breakdown List */}
      <div className="space-y-2">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className={`p-1 rounded ${m.bg}`}>
                  <Icon className="w-3 h-3" />
                </span>
                <span className="font-medium text-slate-700">{m.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-500">{m.count}</span>
                <span className="font-bold font-mono text-slate-900 w-12 text-right">{m.rate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
