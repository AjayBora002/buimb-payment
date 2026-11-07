import React, { useState } from 'react';
export const VolumeChart = () => {
    const [range, setRange] = useState('30d');
    const [hoveredPoint, setHoveredPoint] = useState(null);
    // 14 data points
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
    return (<div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between relative space-y-4">
      {/* Header & Range Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">Payment Volume Trend</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Live Gateway Feed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Daily gross collections processed across all payment methods
          </p>
        </div>

        {/* Range Buttons */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-xs font-semibold self-start sm:self-auto">
          {['7d', '30d', '90d'].map((r) => (<button key={r} onClick={() => setRange(r)} className={`px-3 py-1 rounded-md transition-all ${range === r
                ? 'bg-white text-blue-600 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'}`}>
              {r.toUpperCase()}
            </button>))}
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative w-full overflow-hidden pt-2">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-48 overflow-visible">
          <defs>
            <linearGradient id="buimbpayVolumeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0D6EFD" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#0D6EFD" stopOpacity="0.0"/>
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((pct) => {
            const y = svgHeight - paddingY - pct * (svgHeight - 2 * paddingY);
            return (<line key={pct} x1={paddingX} y1={y} x2={svgWidth - paddingX} y2={y} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4"/>);
        })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#buimbpayVolumeGrad)"/>

          {/* Main Trend Line */}
          <path d={pathD} fill="none" stroke="#0D6EFD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>

          {/* Interactive Data Points */}
          {coords.map((c, i) => (<g key={i}>
              <circle cx={c.x} cy={c.y} r="4" className="fill-white stroke-blue-600 stroke-2 hover:r-6 transition-all cursor-pointer" onMouseEnter={() => setHoveredPoint({
                date: c.pt.date,
                successful: `₹${c.pt.amount.toLocaleString('en-IN')}`,
                failed: `₹${c.pt.failed.toLocaleString('en-IN')}`,
                count: c.pt.count,
                x: c.x,
                y: c.y,
            })}/>
            </g>))}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (<div className="absolute z-20 pointer-events-none p-3 bg-slate-900 text-white rounded-lg shadow-xl text-xs space-y-1 transform -translate-x-1/2 -translate-y-full" style={{
                left: `${(hoveredPoint.x / svgWidth) * 100}%`,
                top: `${(hoveredPoint.y / svgHeight) * 100}%`,
            }}>
            <div className="font-bold text-slate-200 border-b border-slate-700 pb-1 flex justify-between gap-4">
              <span>{hoveredPoint.date}</span>
              <span className="text-slate-400 font-normal">{hoveredPoint.count} txns</span>
            </div>
            <div className="text-emerald-400 font-mono font-bold">
              Captured: {hoveredPoint.successful}
            </div>
          </div>)}
      </div>

      {/* Footer Metrics */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"/> Gross Volume
        </span>
        <span className="font-mono text-slate-700 font-semibold">Peak Day: Sep 22 (₹1,48,250.00)</span>
      </div>
    </div>);
};
