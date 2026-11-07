import React from 'react';

interface BrandLogoProps {
  collapsed?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ collapsed = false, className = '' }) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Razorpay authentic forward-slanted geometric mark */}
      <div className="relative w-8 h-8 rounded-lg bg-[#0b63e5] flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/30 group">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 transition-transform duration-200 group-hover:scale-105"
        >
          <path
            d="M22.436 0.5L10.526 8.273L6.082 17.057L13.762 12.044L22.436 0.5Z"
            fill="#FFFFFF"
          />
          <path
            d="M14.193 15.35L6.403 20.438L0 24.5L10.155 22.428L14.193 15.35Z"
            fill="#60A5FA"
          />
        </svg>
      </div>

      {!collapsed && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center tracking-tight text-base font-black leading-none">
            <span className="text-white italic tracking-tighter">Buimb-Pay</span>
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
