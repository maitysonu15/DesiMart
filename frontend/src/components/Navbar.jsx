import React, { useState } from 'react';
import Logo from './Logo';
import { CATEGORIES } from '../data/catalog';

export default function Navbar({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onOpenOrders,
  onOpenAccount,
  selectedCategory,
  onSelectCategory,
  onSelectOffers,
  isOffersActive,
  orderCount,
  user
}) {
  const [isMegaOpen, setIsMegaOpen] = useState(false);

  return (
    <header className="site-header">
      {/* Top Banner Bar */}
      <div className="topbar">
        <div className="container topbar-inner">
          <p className="topbar-tag">
            <span className="sparkle">✨</span> Free delivery over ₹499 · 7-day easy returns · Cash on delivery available
          </p>
          <div className="topbar-links">
            <button 
              type="button" 
              className="topbar-btn ghost"
              onClick={onOpenOrders}
            >
              <span>My Orders {orderCount > 0 ? `(${orderCount})` : ''}</span>
            </button>
            <button 
              type="button" 
              className="topbar-btn solid"
              onClick={onOpenAccount}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
              <span>{user ? user.name : 'Sign In / Log In'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container header-inner">
        <div className="header-left">
          {/* Desimart Logo */}
          <button 
            type="button"
            className="brand-link" 
            onClick={() => {
              onSelectCategory(null);
            }}
          >
            <Logo size={42} />
          </button>
        </div>

        {/* Live Search Bar */}
        <div className="search-wrapper">
          <div className="search-bar">
            <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input 
              type="search"
              placeholder="Search groceries, electronics, fresh veggies, snacks..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search products"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="search-clear-btn"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="main-nav">
          <button 
            type="button" 
            className={`nav-link ${!selectedCategory && !isOffersActive ? 'active' : ''}`}
            onClick={() => onSelectCategory(null)}
          >
            Home
          </button>

          {/* Mega Menu Dropdown for Categories */}
          <div 
            className="nav-shop-container"
            onMouseEnter={() => setIsMegaOpen(true)}
            onMouseLeave={() => setIsMegaOpen(false)}
          >
            <button 
              type="button" 
              className={`nav-link shop-trigger ${selectedCategory ? 'active' : ''}`}
              onClick={() => setIsMegaOpen(!isMegaOpen)}
            >
              <span>Shop Aisles</span>
              <svg className="chev" viewBox="0 0 12 8" width="10" height="7">
                <path d="M1 1.5 L6 6.5 L11 1.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {isMegaOpen && (
              <div className="mega-menu" role="menu">
                <div className="mega-header">
                  <span>Shop by Department</span>
                  <button 
                    type="button" 
                    className="mega-all-link"
                    onClick={() => {
                      onSelectCategory(null);
                      setIsMegaOpen(false);
                    }}
                  >
                    All products →
                  </button>
                </div>
                <div className="mega-grid">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      className={`mega-item ${selectedCategory === cat.slug ? 'active' : ''}`}
                      onClick={() => {
                        onSelectCategory(cat.slug);
                        setIsMegaOpen(false);
                      }}
                    >
                      <span className="mega-icon">{cat.icon}</span>
                      <span className="mega-name">{cat.name}</span>
                    </button>
                  ))}
                </div>
                <div className="mega-footer">
                  <button 
                    type="button" 
                    className="mega-tag-btn"
                    onClick={() => {
                      onSelectOffers();
                      setIsMegaOpen(false);
                    }}
                  >
                    🏷️ Today's Offers — Under ₹500
                  </button>
                </div>
              </div>
            )}
          </div>

          <button 
            type="button" 
            className={`nav-link ${isOffersActive ? 'active' : ''}`}
            onClick={onSelectOffers}
          >
            <span className="offer-tag-badge">🔥 Deals</span>
          </button>

          <button 
            type="button" 
            className="nav-link orders-nav-link"
            onClick={onOpenOrders}
          >
            Orders
          </button>

          <button 
            type="button" 
            className="nav-link"
            onClick={onOpenAccount}
          >
            {user ? 'Account' : 'Sign In'}
          </button>

          {/* Cart Trigger */}
          <button 
            type="button" 
            className="cart-trigger-btn"
            onClick={onOpenCart}
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <svg className="cart-svg-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M2 3h3l2.6 11.6a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 7H6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="20" r="1.6" />
              <circle cx="18" cy="20" r="1.6" />
            </svg>
            <span className="cart-text">Cart</span>
            <span className="cart-badge-count" key={cartCount}>
              {cartCount}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
