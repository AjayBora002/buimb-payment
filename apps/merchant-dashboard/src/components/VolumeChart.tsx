import React, { useState } from 'react';

export const VolumeChart: React.FC = () => {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [hoveredPoint, setHoveredPoint] = useState<{
    date: string;
    successful: string;
    failed: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // 14 data points for clean curvature
  const dataPoints = [
    { date: 'Sep 09', amount: 32000, failed: 1200, count: 42 },
    { date: 'Sep 10', amount: 48000, failed: 2100, count: 68 },
    { date: 'Sep 11', amount: 41000, failed: 950, count: 53 },
    { date: 'Sep 12', amount: 65000, failed: 3400, count: 89 },
    { date: 'Sep 13', amount: 59000, failed: 1100, count: 74 },
    { date: 'Sep 14', amount: 82000, failed: 1800, count: 112 },
    { date: 'Sep 15', amount: 76000, failed: 2400, count: 98 },
    { date: 'Sep 16', amount: 95000, failed: 1300, count: 135 },
    { date: 'Sep 17', amount: 88000, failed: 2900, count: 119 },
    { date: 'Sep 18', amount: 112000, failed: 1600, count: 154 },
    { date: 'Sep 19', amount: 104000, failed: 2200, count: 141 },
    { date: 'Sep 20', amount: 128000, failed: 1900, count: 172 },
    { date: 'Sep 21', amount: 135000, failed: 2700, count: 186 },
    { date: 'Sep 22', amount: 148250, failed: 2100, count: 204 },
  ];

  const maxAmount = 160000;
  const svgWidth = 600;
  const svgHeight = 200;
  const paddingX = 20;
  const paddingY = 20;

  const getCoordinates = () => {
    return dataPoints.map((pt, i) => {
      const x = paddingX + (i / (dataPoints.length - 1)) * (svgWidth - 2 * paddingX);
      const y = svgHeight - paddingY - (pt.amount / maxAmount) * (svgHeight - 2 * paddingY);
      return { x, y, pt };
    });
  };

  const coords = getCoordinates();
  const pathD = coords.reduce((acc, c, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`, '');
  const areaD = `${pathD} L ${coords[coords.length - 1].x} ${svgHeight - paddingY} L ${coords[0].x} ${svgHeight - paddingY} Z`;

  return (
    <div className="p-6 bg-[#1D2E28] border border-[rgba(237,231,214,0.08)] flex flex-col justify-between relative space-y-4">
      {/* Header & Range Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#EDE7D6]">Payment Volume</h3>
            <span className="px-1.5 py-0.5 rounded-[2px] text-[10px] font-mono text-[#8FA396] border border-[rgba(237,231,214,0.12)]">
              Sandbox
            </span>
          </div>
          <div className="w-8 h-0.5 bg-[#C9A227] mt-1" />

          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold font-mono text-[#C9A227] tabular-nums tracking-tight">
              ₹14,82,500.00
            </span>
            <span className="text-xs font-mono font-bold text-[#4E8B6F] flex items-center gap-0.5">
              +18.2%
            </span>
            <span className="text-xs font-mono text-[#8FA396]">(30d trend)</span>
          </div>
        </div>

        {/* Time Filters */}
        <div className="flex items-center p-0.5 bg-[#131B17] rounded-[4px] border border-[rgba(237,231,214,0.08)] text-xs">
          {(['7d', '30d', '90d'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-2.5 py-1 rounded-[2px] font-mono text-[11px] font-semibold transition-colors ${
                range === r
                  ? 'bg-[#C9A227] text-[#131B17]'
                  : 'text-[#8FA396] hover:text-[#EDE7D6]'
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full h-[210px] select-none pt-2">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={svgWidth - paddingX}
            y2={paddingY}
            stroke="rgba(237,231,214,0.06)"
            strokeDasharray="2 2"
          />
          <line
            x1={paddingX}
            y1={svgHeight / 2}
            x2={svgWidth - paddingX}
            y2={svgHeight / 2}
            stroke="rgba(237,231,214,0.06)"
            strokeDasharray="2 2"
          />
          <line
            x1={paddingX}
            y1={svgHeight - paddingY}
            x2={svgWidth - paddingX}
            y2={svgHeight - paddingY}
            stroke="rgba(237,231,214,0.12)"
          />

          {/* Area Fill: Flat hairline tint without gradient */}
          <path d={areaD} fill="rgba(201, 162, 39, 0.08)" />

          {/* Line Stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="#C9A227"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Data Points */}
          {coords.map((c, i) => (
            <circle
              key={i}
              cx={c.x}
              cy={c.y}
              r={hoveredPoint?.date === c.pt.date ? 5 : 3}
              fill="#131B17"
              stroke="#C9A227"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={() =>
                setHoveredPoint({
                  date: c.pt.date,
                  successful: `₹${c.pt.amount.toLocaleString('en-IN')}`,
                  failed: `₹${c.pt.failed.toLocaleString('en-IN')}`,
                  count: c.pt.count,
                  x: c.x,
                  y: c.y,
                })
              }
              onMouseLeave={() => setHoveredPoint(null)}
            />
          ))}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute z-30 pointer-events-none p-3 rounded-[4px] bg-[#131B17] border border-[rgba(237,231,214,0.15)] text-xs space-y-1 transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(hoveredPoint.x / svgWidth) * 100}%`,
              top: `${(hoveredPoint.y / svgHeight) * 100 - 12}%`,
            }}
          >
            <div className="text-[11px] font-mono font-bold text-[#EDE7D6] border-b border-[rgba(237,231,214,0.08)] pb-1">
              {hoveredPoint.date} (Simulated)
            </div>
            <div className="flex items-center justify-between gap-4 text-[#8FA396]">
              <span>Captured:</span>
              <span className="font-mono font-bold text-[#4E8B6F] tabular-nums">{hoveredPoint.successful}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-[#8FA396]">
              <span>Failed:</span>
              <span className="font-mono text-[#B0503F] tabular-nums">{hoveredPoint.failed}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-[#8FA396] text-[10px] font-mono">
              <span>Count:</span>
              <span>{hoveredPoint.count} txns</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Dates */}
      <div className="flex justify-between text-[11px] font-mono text-[#8FA396] px-2 pt-2 border-t border-[rgba(237,231,214,0.08)]">
        <span>Sep 09, 2026</span>
        <span>Sep 15, 2026</span>
        <span>Today (Sep 22)</span>
      </div>
    </div>
  );
};
