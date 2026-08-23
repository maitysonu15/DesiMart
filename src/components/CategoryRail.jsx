import React, { useState } from 'react';
import { CATEGORIES } from '../data/catalog';

export default function CategoryRail({ 
  selectedCategory, 
  onSelectCategory, 
  productCounts 
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`category-rail ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="rail-head">
        <div className="rail-title-group">
          <svg className="rail-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
          <span className="rail-heading">Categories</span>
        </div>
        <button 
          type="button" 
          className="rail-toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand Category Rail" : "Collapse Category Rail"}
          aria-label={isCollapsed ? "Expand categories" : "Collapse categories"}
        >
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {isCollapsed ? (
              <path d="M6 3 L11 8 L6 13 M13 3 V13" />
            ) : (
              <path d="M10 3 L5 8 L10 13 M3 3 V13" />
            )}
          </svg>
        </button>
      </div>

      <div className="rail-body">
        <ul className="rail-list">
          <li key="all">
            <button 
              type="button"
              className={`rail-item ${!selectedCategory ? 'active' : ''}`}
              onClick={() => onSelectCategory(null)}
              title="All products"
            >
              <span className="rail-cat-icon">🏬</span>
              <span className="rail-cat-text">All Aisles</span>
              <span className="rail-cat-count">{productCounts.all || 0}</span>
            </button>
          </li>
          {CATEGORIES.map((cat) => {
            const count = productCounts[cat.slug] || 0;
            const isActive = selectedCategory === cat.slug;
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  className={`rail-item ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectCategory(cat.slug)}
                  title={cat.name}
                >
                  <span className="rail-cat-icon">{cat.icon}</span>
                  <span className="rail-cat-text">{cat.name}</span>
                  <span className="rail-cat-count">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
