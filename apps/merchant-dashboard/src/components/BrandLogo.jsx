import React from 'react';

export const BrandLogo = ({ collapsed = false, className = '' }) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Unique BuimbPay Fintech Mark */}
      <svg
        width={32}
        height={32}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-200 hover:scale-105"
      >
        <defs>
          <linearGradient id="db-buimb-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B63E5" />
            <stop offset="50%" stopColor="#0051C6" />
            <stop offset="100%" stopColor="#082A66" />
          </linearGradient>
          <linearGradient id="db-cyan-flow" x1="10" y1="6" x2="30" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#0B63E5" />
          </linearGradient>
          <linearGradient id="db-emerald-pulse" x1="12" y1="18" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>

        <rect x="2" y="2" width="32" height="32" rx="9" fill="url(#db-buimb-bg)" />
        <circle cx="28" cy="8" r="8" fill="#00D2FF" opacity="0.18" />
        <rect x="9.5" y="8" width="4.5" height="20" rx="1.5" fill="#FFFFFF" />

        <path
          d="M13 8H21.5C24.5376 8 27 10.2386 27 13C27 15.7614 24.5376 18 21.5 18H13V8Z"
          fill="url(#db-cyan-flow)"
        />
        <path
          d="M14 10.5H20.5C22.1569 10.5 23.5 11.6193 23.5 13C23.5 14.3807 22.1569 15.5 20.5 15.5H14V10.5Z"
          fill="#082A66"
        />

        <path
          d="M13 17H22.5C25.8137 17 28.5 19.4624 28.5 22.5C28.5 25.5376 25.8137 28 22.5 28H13V17Z"
          fill="url(#db-emerald-pulse)"
        />
        <path
          d="M14 19.5H21.5C23.1569 19.5 24.5 20.8431 24.5 22.5C24.5 24.1569 23.1569 25.5 21.5 25.5H14V19.5Z"
          fill="#082A66"
        />

        <path
          d="M19 16L22.5 17.5L19 19V16Z"
          fill="#FFFFFF"
        />
      </svg>

      {!collapsed && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center tracking-tight text-base font-black leading-none">
            <span className="text-white tracking-tight">Buimb</span>
            <span className="text-[#38BDF8] tracking-tight ml-0.5">Pay</span>
            <span className="ml-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
              Dashboard
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium mt-1 truncate">
            Merchant Operating System
          </span>
        </div>
      )}
    </div>
  );
};
