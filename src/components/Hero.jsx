import React from 'react';
import { CATEGORIES } from '../data/catalog';

export default function Hero({ onSelectCategory, onSelectOffers }) {
  const topCategories = CATEGORIES.slice(0, 8);

  return (
    <section className="hero-banner">
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="eyebrow-badge">🌿 100% Fresh &amp; Authentic</span>
          <span className="eyebrow-text">Delivered directly from farmers &amp; verified hubs</span>
        </div>

        <h1 className="hero-title">
          Everything you need, <span className="highlight-green">in one basket.</span>
        </h1>

        <p className="hero-subtitle">
          Explore farm-fresh groceries, everyday staples, gadgets, home essentials &amp; fashion at unbeatable Desimart prices with same-day express delivery.
        </p>

        <div className="hero-cta-group">
          <a href="#products-section" className="btn btn-primary btn-lg">
            <span>Start Shopping</span>
            <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
          <button 
            type="button" 
            className="btn btn-outline btn-lg"
            onClick={onSelectOffers}
          >
            <span>🏷️ Today's Offers &lt; ₹500</span>
          </button>
        </div>
      </div>

      {/* Hero Category Quick Chips */}
      <div className="hero-chips-container">
        <span className="chips-label">Popular Aisles:</span>
        <div className="hero-chips-grid">
          {topCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className="hero-chip-btn"
              onClick={() => onSelectCategory(cat.slug)}
            >
              <span className="chip-icon">{cat.icon}</span>
              <span className="chip-name">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
