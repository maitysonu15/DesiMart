import React from 'react';
import { CATEGORY_ARTWORK, TINT_GRADIENTS } from '../data/catalog';

const FALLBACK_ART = {
  strokes: ["M10 16 h28 l-3 24 h-22 z", "M17 16 a7 7 0 0 1 14 0"],
  fills: [],
};

export default function ProductArtwork({ category, name = "Product", className = "" }) {
  const art = CATEGORY_ARTWORK[category] || FALLBACK_ART;
  const gradient = TINT_GRADIENTS[category] || { start: "#065f46", end: "#10b981", accent: "#a7f3d0" };
  const gradId = `art-grad-${category || 'default'}`;

  return (
    <div className={`product-art-wrapper ${className}`}>
      <svg 
        className="product-art-svg" 
        viewBox="0 0 200 150" 
        preserveAspectRatio="xMidYMid slice"
        role="img" 
        aria-label={name}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={gradient.start} />
            <stop offset="100%" stopColor={gradient.end} />
          </linearGradient>
          <radialGradient id={`glow-${gradId}`} cx="0.25" cy="0.2" r="0.8">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Card Background Tint */}
        <rect width="200" height="150" fill={`url(#${gradId})`} />
        <rect width="200" height="150" fill={`url(#glow-${gradId})`} />

        {/* Ambient Gloss Highlight Rays */}
        <path d="M0 0 H96 L28 150 H0 Z" fill="#ffffff" opacity="0.08" />
        <path d="M104 0 H140 L72 150 H36 Z" fill="#ffffff" opacity="0.04" />

        {/* Centered Vector Illustration */}
        <g transform="translate(62.8, 37.8) scale(1.55)">
          {/* Soft Shadow */}
          <ellipse cx="24" cy="46" rx="17" ry="2.6" fill="#000000" opacity="0.22" />

          {/* Solid Fills */}
          {art.fills && art.fills.map((d, idx) => (
            <path key={`f-${idx}`} d={d} fill="#ffffff" opacity="0.94" />
          ))}

          {/* Stroke Outlines */}
          <g fill="none" stroke="#ffffff" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.98">
            {art.strokes && art.strokes.map((d, idx) => (
              <path key={`s-${idx}`} d={d} />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
