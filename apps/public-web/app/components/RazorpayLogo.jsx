import React from 'react';
export function RazorpayLogo({ className = '', size = 28, textColor = 'text-white', showSubtitle = false, }) {
    return (<div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Razorpay signature forward-leaning slanted polygon mark */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
        <path d="M22.436 0.5L10.526 8.273L6.082 17.057L13.762 12.044L22.436 0.5Z" fill="#0B63E5"/>
        <path d="M14.193 15.35L6.403 20.438L0 24.5L10.155 22.428L14.193 15.35Z" fill="#3395FF"/>
      </svg>

      <div className="flex items-center gap-1.5">
        <span className={`text-2xl font-black italic tracking-tighter ${textColor}`}>
          Buimb-Pay
        </span>
        {showSubtitle && (<span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
            Sovereign
          </span>)}
      </div>
    </div>);
}
export const BuimbPayLogo = RazorpayLogo;
