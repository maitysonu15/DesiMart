import React from 'react';

export function DesimartLogoMark({ size = 44, className = "" }) {
  return (
    <svg 
      className={`desimart-logo-mark ${className}`}
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      role="img" 
      aria-label="Desimart Logo"
    >
      <defs>
        <linearGradient id="desiGreenSweep" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#86efac" />
        </linearGradient>
        <linearGradient id="desiGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#15803d" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Cart Background Subtle Badge */}
      <rect width="94" height="94" x="3" y="3" rx="22" fill="#0d281a" />
      <rect width="94" height="94" x="3" y="3" rx="22" fill="url(#desiGlow)" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.3" />

      <g fill="none" stroke="url(#desiGreenSweep)" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Handle post: Top hook and left cart boundary */}
        <path d="M26 20 H36 C40 20 42 23 42 27 V63" />

        {/* Shopping Basket Outline */}
        <path d="M42 34 H82 C85.5 34 87.5 37 86.5 40.5 L81.5 59.5 C80.5 62.5 77.5 64.5 74 64.5 H42" />

        {/* Capital Letter "D" nestled inside the half of the basket */}
        {/* Outer spine and bowl of D */}
        <path 
          d="M52 38 V60 M52 38 H64 C71 38 75 42.5 75 49 C75 55.5 71 60 64 60 H52" 
          strokeWidth="4.4" 
          stroke="url(#desiGreenSweep)" 
          strokeLinecap="round"
        />
        {/* Inner glow line for D for extra pop */}
        <path 
          d="M57 44 H63 C66 44 68.5 46 68.5 49 C68.5 52 66 54 63 54 H57 V44 Z" 
          fill="url(#desiGreenSweep)" 
          fillOpacity="0.18" 
          stroke="url(#desiGreenSweep)" 
          strokeWidth="2" 
        />

        {/* Speed streak lines behind trolley */}
        <path d="M12 33 H26" strokeWidth="3" strokeOpacity="0.8" />
        <path d="M8 43 H22" strokeWidth="3" strokeOpacity="0.9" />
        <path d="M14 53 H25" strokeWidth="3" strokeOpacity="0.7" />

        {/* Basket Wheels */}
        <circle cx="51" cy="74" r="4.6" fill="#16a34a" />
        <circle cx="72" cy="74" r="4.6" fill="#16a34a" />
        <path d="M36 74 H44" strokeWidth="3" />
        <path d="M58 74 H65" strokeWidth="3" />
      </g>
    </svg>
  );
}

export default function Logo({ size = 42, showText = true }) {
  return (
    <div className="brand-logo-container">
      <DesimartLogoMark size={size} />
      {showText && (
        <div className="brand-text-group">
          <span className="brand-title">
            <span className="brand-main">Desimart</span>
          </span>
          <span className="brand-subtitle">Fresh &amp; Fast Grocery</span>
        </div>
      )}
    </div>
  );
}
