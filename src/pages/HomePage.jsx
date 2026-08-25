import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/common/ProductCard';

export default function HomePage({ navigateTo, onViewDetails, onOpenProfile }) {
  const { products } = useCart();
  const { currentUser } = useAuth();
  const { wishlistCount } = useWishlist();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState('popular');

  const getProductCountForCat = (catName) => {
    return products.filter((p) => p.category === catName).length;
  };

  let displayedProducts = products.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'deals') return p.isOffer || p.price <= 500;
    return p.category === activeCategory;
  });

  if (sortOption === 'popular') {
    displayedProducts.sort((a, b) => b.reviews - a.reviews);
  } else if (sortOption === 'price-asc') {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    displayedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'rating') {
    displayedProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="container" style={{ paddingBottom: '60px' }}>
      {/* Hero Banner */}
      <div className="hero-card">
        {/* Top Right User Profile Box */}
        <div
          className="hero-profile-card-topright"
          onClick={currentUser ? onOpenProfile : () => navigateTo('login')}
          title={currentUser ? "Click to view full Profile & Wishlist details" : "Click to Sign In or Create Account"}
        >
          <div className="hero-profile-avatar">
            {currentUser ? currentUser.name.charAt(0).toUpperCase() : '👤'}
          </div>
          <div className="hero-profile-info">
            <div className="hero-profile-name">
              {currentUser ? currentUser.name : 'Guest User'}
            </div>
            <div className="hero-profile-sub">
              {currentUser ? (
                `📱 ${currentUser.mobile || 'No Mobile'} • ✉️ ${currentUser.email}`
              ) : (
                '🔑 Not Signed In'
              )}
            </div>
            <div className="hero-profile-address">
              {currentUser ? (
                `📍 ${currentUser.address || 'Click to set delivery address'}`
              ) : (
                '👉 Click here to Sign In or Register'
              )}
            </div>
            <div className="hero-profile-wishlist-badge">
              ❤️ Wishlist: <strong>{wishlistCount} saved items</strong>
            </div>
          </div>
        </div>

        <div className="hero-top-badge">
          🌾 100% Fresh & Authentic | Delivered directly from farmers & verified hubs
        </div>

        <h1 className="hero-main-title">
          Everything you need, <span className="mint-text">in one basket.</span>
        </h1>

        <p className="hero-subtitle">
          Explore farm-fresh groceries, everyday staples, gadgets, home essentials & fashion at unbeatable Desimart prices with same-day express delivery.
        </p>

        <div className="hero-cta-group">
          <button className="hero-btn-primary" onClick={() => navigateTo('products')}>
            Start Shopping →
          </button>
          <button className="hero-btn-secondary" onClick={() => navigateTo('offers')}>
            ⚡ Today's Offers &lt; ₹500
          </button>
        </div>

        {/* Popular Aisles Strip */}
        <div className="popular-aisles-section">
          <div className="popular-aisles-title">POPULAR AISLES:</div>
          <div className="popular-aisles-scroll">
            {CATEGORIES.slice(0, 8).map((cat) => (
              <button
                key={cat.id}
                className="aisle-chip"
                onClick={() => setActiveCategory(cat.name)}
              >
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Aisle Filter Bar */}
      <div className="aisle-filter-bar">
        <button
          className={`filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          <span>🛍️</span> All Aisles <span className="pill-count-badge">({products.length})</span>
        </button>

        <button
          className={`filter-pill deals-accent ${activeCategory === 'deals' ? 'active' : ''}`}
          onClick={() => setActiveCategory('deals')}
        >
          <span>🏷️</span> Deals &lt; ₹500
        </button>

        {CATEGORIES.map((cat) => {
          const count = getProductCountForCat(cat.name);
          return (
            <button
              key={cat.id}
              className={`filter-pill ${activeCategory === cat.name ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.name)}
            >
              <span>{cat.icon}</span> {cat.name} <span className="pill-count-badge">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Section Title & Sort Dropdown */}
      <div className="section-main-header">
        <div className="section-title-wrap">
          <h2>
            <span>🛍️</span> All Aisles & Daily Essentials
          </h2>
          <p>Showing {displayedProducts.length} products</p>
        </div>

        <div className="sort-select-box">
          <label>Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="product-grid">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
}
