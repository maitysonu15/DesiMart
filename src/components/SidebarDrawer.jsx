import React, { useEffect } from 'react';
import { CATEGORIES } from '../data/catalog';
import Logo from './Logo';

export default function SidebarDrawer({ 
  isOpen, 
  onClose, 
  selectedCategory, 
  onSelectCategory,
  onSelectOffers,
  onOpenCart,
  onOpenOrders,
  cartCount,
  orderCount
}) {
  // Prevent body scrolling when sidebar drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`drawer-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Slide-out Sidebar from Top Left */}
      <aside 
        className={`sidebar-drawer ${isOpen ? 'open' : ''}`}
        aria-label="Side Navigation"
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer-header">
          <Logo size={36} />
          <button 
            type="button" 
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close sidebar"
            title="Close menu"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          {/* Quick Action Badges */}
          <div className="drawer-shortcuts">
            <button 
              className={`shortcut-pill ${!selectedCategory ? 'active' : ''}`}
              onClick={() => { onSelectCategory(null); onClose(); }}
            >
              <span>🏬</span> All Store
            </button>
            <button 
              className="shortcut-pill special"
              onClick={() => { onSelectOffers(); onClose(); }}
            >
              <span>🏷️</span> Offers &lt; ₹500
            </button>
            <button 
              className="shortcut-pill"
              onClick={() => { onOpenCart(); onClose(); }}
            >
              <span>🛒</span> Cart ({cartCount})
            </button>
            <button 
              className="shortcut-pill"
              onClick={() => { onOpenOrders(); onClose(); }}
            >
              <span>📦</span> Orders ({orderCount})
            </button>
          </div>

          <div className="drawer-divider" />

          {/* Category List */}
          <div className="drawer-section">
            <h3 className="drawer-heading">Browse Categories</h3>
            <ul className="drawer-cat-list">
              <li key="all-cats">
                <button
                  type="button"
                  className={`drawer-cat-item ${!selectedCategory ? 'selected' : ''}`}
                  onClick={() => {
                    onSelectCategory(null);
                    onClose();
                  }}
                >
                  <span className="drawer-cat-icon">🏬</span>
                  <span className="drawer-cat-title">All Aisles</span>
                  <span className="drawer-cat-arrow">→</span>
                </button>
              </li>
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.slug;
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      className={`drawer-cat-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        onSelectCategory(cat.slug);
                        onClose();
                      }}
                    >
                      <span className="drawer-cat-icon">{cat.icon}</span>
                      <span className="drawer-cat-title">{cat.name}</span>
                      <span className="drawer-cat-arrow">→</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="drawer-divider" />

          {/* Perks & Service */}
          <div className="drawer-perks">
            <div className="perk-row">
              <span className="perk-icon">⚡</span>
              <div>
                <strong>Express Delivery</strong>
                <p>Free on all orders above ₹499</p>
              </div>
            </div>
            <div className="perk-row">
              <span className="perk-icon">🛡️</span>
              <div>
                <strong>100% Quality Guaranteed</strong>
                <p>Easy 7-day hassle free returns</p>
              </div>
            </div>
            <div className="perk-row">
              <span className="perk-icon">📞</span>
              <div>
                <strong>24x7 Customer Support</strong>
                <p>support@desimart.in · 1800-DESI-MART</p>
              </div>
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <p>© 2026 Desimart Grocery Ltd.</p>
        </div>
      </aside>
    </>
  );
}
