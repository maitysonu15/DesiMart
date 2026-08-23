import React from 'react';
import { CATEGORIES } from '../data/catalog';

export default function CategoryBar({ 
  selectedCategory, 
  onSelectCategory,
  onSelectOffers,
  isOffersActive,
  productCounts 
}) {
  return (
    <div className="category-horizontal-bar">
      <div className="category-scroll-container">
        {/* All Products */}
        <button
          type="button"
          className={`cat-pill-btn ${!selectedCategory && !isOffersActive ? 'active' : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          <span className="cat-pill-icon">🏬</span>
          <span className="cat-pill-name">All Aisles</span>
          <span className="cat-pill-count">{productCounts.all || 0}</span>
        </button>

        {/* Deals Under 500 */}
        <button
          type="button"
          className={`cat-pill-btn special ${isOffersActive ? 'active' : ''}`}
          onClick={onSelectOffers}
        >
          <span className="cat-pill-icon">🏷️</span>
          <span className="cat-pill-name">Deals &lt; ₹500</span>
        </button>

        {/* Individual Categories */}
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.slug && !isOffersActive;
          const count = productCounts[cat.slug] || 0;
          return (
            <button
              key={cat.id}
              type="button"
              className={`cat-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.slug)}
            >
              <span className="cat-pill-icon">{cat.icon}</span>
              <span className="cat-pill-name">{cat.name}</span>
              {count > 0 && <span className="cat-pill-count">{count}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
