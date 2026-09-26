import React from 'react';

interface FinoraLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export function FinoraLogo({ className = 'w-7 h-7', size = 28, color = '#2B59FF' }: FinoraLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Finora 6-blade curved spiral vortex emblem */}
      <g transform="translate(24, 24)">
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <path
            key={i}
            d="M0 -6 C6 -18 16 -20 20 -15 C23 -10 18 -2 10 3 C4 7 0 5 0 0 Z"
            fill={color === 'currentColor' ? 'currentColor' : color}
            transform={`rotate(${angle})`}
            opacity={0.92}
          />
        ))}
        {/* Central core ring */}
        <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
        <circle cx="0" cy="0" r="2" fill={color === 'currentColor' ? 'currentColor' : color} />
      </g>
    </svg>
  );
}
