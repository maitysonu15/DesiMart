import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Header({ currentView, navigateTo, onSearch, onOpenCart, onOpenProfile }) {
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

  const handleCartClick = () => {
    if (onOpenCart) {
      onOpenCart();
    } else {
      navigateTo('cart');
    }
  };

  const handleProfileClick = (tab = 'details') => {
    if (onOpenProfile) {
      onOpenProfile(tab);
    } else {
      navigateTo('login');
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <button className="brand-wrap" onClick={() => navigateTo('home')}>
          <div className="brand-icon-box">🛒</div>
          <div className="brand-title-box">
            <span className="brand-main-title">Desimart</span>
            <span className="brand-tagline">FRESH &amp; FAST GROCERY</span>
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
              className="nav-link-btn nav-auth-btn"
              onClick={() => navigateTo('login')}
            >
              Sign In
            </button>
          ) : (
            <div className="nav-user-badge-group">
              <button
                type="button"
                className="nav-user-pill"
                onClick={() => handleProfileClick('details')}
                title="View Profile & Account Settings"
              >
                <span className="nav-user-avatar">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : '👤'}
                </span>
                <span className="nav-user-name">
                  Hi, {currentUser.name.split(' ')[0]}
                </span>
              </button>

              <button
                className="nav-link-btn logout-tab-btn"
                onClick={logout}
                title="Sign out of account"
              >
                Logout
              </button>
            </div>
          )}

          {/* Cart Pill Button */}
          <button
            className="cart-pill-btn"
            onClick={handleCartClick}
          >
            🛒 Cart <span className="cart-badge-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
