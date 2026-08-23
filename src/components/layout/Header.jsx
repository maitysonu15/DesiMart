import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Header({ currentView, navigateTo, onSearch }) {
  const { currentUser, logout } = useAuth();
  const { cartCount } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
    navigateTo('products');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <button className="brand-wrap" onClick={() => navigateTo('home')}>
          <div className="brand-icon-box">🛒</div>
          <div className="brand-title-box">
            <span className="brand-main-title">Desimart</span>
            <span className="brand-tagline">FRESH & FAST GROCERY</span>
          </div>
        </button>

        {/* Centered Pill Search Bar */}
        <form className="header-search-form" onSubmit={handleSearchSubmit}>
          <span className="header-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search groceries, electronics, fresh veggies, snacks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* Navigation Items */}
        <div className="nav-links-wrap">
          <button
            className={`nav-link-btn ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => navigateTo('home')}
          >
            Home
          </button>

          <button
            className={`nav-link-btn ${currentView === 'products' ? 'active' : ''}`}
            onClick={() => navigateTo('products')}
          >
            Shop Aisles ∨
          </button>

          <button
            className="deals-pill-btn"
            onClick={() => navigateTo('offers')}
          >
            🔥 Deals
          </button>

          <button
            className={`nav-link-btn ${currentView === 'orders' ? 'active' : ''}`}
            onClick={() => {
              if (!currentUser) navigateTo('login');
              else navigateTo('orders');
            }}
          >
            Orders
          </button>

          {!currentUser ? (
            <button
              className="nav-link-btn"
              onClick={() => navigateTo('login')}
            >
              Sign In
            </button>
          ) : (
            <button
              className="nav-link-btn"
              onClick={logout}
              title="Click to logout"
            >
              Hi, {currentUser.name.split(' ')[0]} (Logout)
            </button>
          )}

          {/* Cart Pill Button */}
          <button
            className="cart-pill-btn"
            onClick={() => navigateTo('cart')}
          >
            🛒 Cart <span className="cart-badge-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
