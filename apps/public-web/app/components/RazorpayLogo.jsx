import React from 'react';

/**
 * BuimbPay Brand Identity Logo Mark
 * Unique fintech emblem: Interlocking B-monogram with dual payment arcs & forward settlement spark.
 */
export function BuimbPayMark({ size = 28, className = '' }) {
  const s = size;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 ${className}`}
      aria-label="BuimbPay Logo"
    >
      <defs>
        <linearGradient id="buimb-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B63E5" />
          <stop offset="50%" stopColor="#0051C6" />
          <stop offset="100%" stopColor="#082A66" />
        </linearGradient>
        <linearGradient id="buimb-cyan-flow" x1="10" y1="6" x2="30" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#0B63E5" />
        </linearGradient>
        <linearGradient id="buimb-emerald-pulse" x1="12" y1="18" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <filter id="buimb-shadow" x="-10%" y="-10%" width="125%" height="125%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#0B63E5" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Modern Squircle Badge */}
      <rect x="2" y="2" width="32" height="32" rx="9" fill="url(#buimb-bg)" filter="url(#buimb-shadow)" />

      {/* Sub-surface circuit glow */}
      <circle cx="28" cy="8" r="8" fill="#00D2FF" opacity="0.18" />

      {/* Left Vertical Foundation Pillar */}
      <rect x="9.5" y="8" width="4.5" height="20" rx="1.5" fill="#FFFFFF" />

      {/* Top Arc (Cyan Flow) */}
      <path
        d="M13 8H21.5C24.5376 8 27 10.2386 27 13C27 15.7614 24.5376 18 21.5 18H13V8Z"
        fill="url(#buimb-cyan-flow)"
      />
      {/* Top inner counter */}
      <path
        d="M14 10.5H20.5C22.1569 10.5 23.5 11.6193 23.5 13C23.5 14.3807 22.1569 15.5 20.5 15.5H14V10.5Z"
        fill="#082A66"
      />

      {/* Bottom Arc (Emerald Flow) */}
      <path
        d="M13 17H22.5C25.8137 17 28.5 19.4624 28.5 22.5C28.5 25.5376 25.8137 28 22.5 28H13V17Z"
        fill="url(#buimb-emerald-pulse)"
      />
      {/* Bottom inner counter */}
      <path
        d="M14 19.5H21.5C23.1569 19.5 24.5 20.8431 24.5 22.5C24.5 24.1569 23.1569 25.5 21.5 25.5H14V19.5Z"
        fill="#082A66"
      />

      {/* Forward Instant Settlement Chevron */}
      <path
        d="M19 16L22.5 17.5L19 19V16Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function RazorpayLogo({
  className = '',
  size = 28,
  textColor = 'text-white',
  showSubtitle = false,
}) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Unique BuimbPay Fintech Mark */}
      <BuimbPayMark size={size} />

      <div className="flex items-center tracking-tight">
        <span className={`text-xl sm:text-2xl font-black tracking-tight ${textColor}`}>
          Buimb
        </span>
        <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0B63E5]">
          Pay
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-0.5 mb-2.5 animate-pulse" />
        {showSubtitle && (
          <span className="ml-2 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
            Sovereign PA
          </span>
        )}
      </div>
    </div>
  );
}

export const BuimbPayLogo = RazorpayLogo;
