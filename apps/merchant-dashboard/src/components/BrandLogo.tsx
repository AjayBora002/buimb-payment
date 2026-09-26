import React from 'react';

interface BrandLogoProps {
  collapsed?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ collapsed = false, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Abstract connected-node "B" payment rail icon in ledger style */}
      <div className="relative w-8 h-8 rounded-[4px] bg-[#131B17] border border-[rgba(19,27,23,0.15)] p-1.5 flex items-center justify-center flex-shrink-0 group">
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#EDE7D6] transition-transform duration-200 group-hover:scale-105"
        >
          {/* Stem node connection rail */}
          <path
            d="M7 5V23"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Top Loop with Flow Dot */}
          <path
            d="M7 5H15.5C18.5 5 20.5 7 20.5 9.5C20.5 12 18.5 14 15.5 14H7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Bottom Loop with Brass Accent */}
          <path
            d="M7 14H16.5C20 14 22 16.2 22 19C22 21.8 19.8 23 16.5 23H7"
            stroke="#C9A227"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Connected Network Nodes */}
          <circle cx="7" cy="5" r="1.8" fill="#EDE7D6" />
          <circle cx="7" cy="14" r="1.8" fill="#EDE7D6" />
          <circle cx="7" cy="23" r="1.8" fill="#EDE7D6" />
          <circle cx="20.5" cy="9.5" r="1.5" fill="#4E8B6F" />
          <circle cx="22" cy="19" r="1.5" fill="#C9A227" />
        </svg>
      </div>

      {!collapsed && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center tracking-tight text-base font-bold leading-none">
            <span className="text-[#131B17]">Buimb</span>
            <span className="text-[#C9A227] font-semibold ml-0.5">Pay</span>
            <span className="ml-2 text-[9px] font-semibold px-1.5 py-0.5 rounded-[2px] bg-[#F6F3EA] border border-[rgba(19,27,23,0.12)] text-[#5C5646]">
              v1.0
            </span>
          </div>
          <span className="text-[10px] text-[#5C5646] font-medium mt-1 truncate">
            Ledger Infrastructure
          </span>
        </div>
      )}
    </div>
  );
};
