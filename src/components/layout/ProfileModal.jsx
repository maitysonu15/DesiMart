import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProfileModal({ isOpen, onClose, navigateTo, initialTab = 'details' }) {
  const { currentUser } = useAuth();
  const { products, addToCart } = useCart();
  const { wishlistIds, toggleWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-card profile-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="auth-modal-header">
          <div className="auth-modal-header-title">
            <span style={{ fontSize: '1.2rem' }}>👤</span>
            <span>User Profile & Wishlist</span>
          </div>
          <button className="auth-modal-close-btn" onClick={onClose} aria-label="Close Profile">
            ✕
          </button>
        </div>

        <div className="auth-modal-body">
          {/* Segmented Tab Bar */}
          <div className="auth-tab-track">
            <button
              className={`auth-tab-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              My Profile Details
            </button>

            <button
              className={`auth-tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              My Wishlist ({wishlistIds.length})
            </button>
          </div>

          {/* TAB 1: PROFILE DETAILS */}
          {activeTab === 'details' ? (
            <div style={{ marginTop: '20px' }}>
              <div className="profile-user-hero-badge">
                <div className="user-avatar-circle">
                  {currentUser ? currentUser.name.charAt(0).toUpperCase() : 'G'}
                </div>
                <div>
                  <div className="user-display-name">
                    {currentUser ? currentUser.name : 'Guest User'}
                  </div>
                  <div className="user-status-pill">
                    {currentUser ? 'VERIFIED MEMBER' : 'GUEST SESSION'}
                  </div>
                </div>
              </div>

              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <div className="info-lbl">📱 Mobile Number</div>
                  <div className="info-val">
                    {currentUser?.mobile || '9876543210'}
                  </div>
                </div>

                <div className="profile-info-item">
                  <div className="info-lbl">✉️ Email Address</div>
                  <div className="info-val">
                    {currentUser?.email || 'user@desimart.com'}
                  </div>
                </div>

                <div className="profile-info-item full-width">
                  <div className="info-lbl">📍 Default Delivery Address</div>
                  <div className="info-val">
                    {currentUser?.address || 'Flat 101, Sunflower Apartments, Andheri West, Mumbai - 400053'}
                  </div>
                </div>
              </div>

              <div className="profile-quick-stats-row">
                <div className="stat-card-box">
                  <div className="stat-num">{wishlistIds.length}</div>
                  <div className="stat-lbl">Saved Items</div>
                </div>
                <div className="stat-card-box">
                  <div className="stat-num">Fast ⚡</div>
                  <div className="stat-lbl">Express Delivery</div>
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2: MY WISHLIST */
            <div style={{ marginTop: '18px' }}>
              <div className="auth-form-heading">My Saved Wishlist</div>
              <p className="auth-form-subheading">
                Items saved in your wishlist to buy in the future.
              </p>

              {wishlistProducts.length === 0 ? (
                <div className="empty-wishlist-box">
                  <div className="empty-wishlist-icon">❤️</div>
                  <div className="empty-wishlist-title">Your Wishlist is Empty</div>
                  <p className="empty-wishlist-sub">
                    Click the heart icon on any product to save items here for future orders.
                  </p>
                  <button
                    className="auth-submit-btn"
                    onClick={() => {
                      onClose();
                      navigateTo('products');
                    }}
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                <div className="wishlist-modal-scroll">
                  {wishlistProducts.map((p) => (
                    <div key={p.id} className="wishlist-item-row">
                      <div className="wishlist-item-thumb">
                        {p.image ? <img src={p.image} alt={p.name} /> : <span>{p.emoji}</span>}
                      </div>

                      <div className="wishlist-item-info">
                        <div className="wishlist-item-title">{p.name}</div>
                        <div className="wishlist-item-price">₹{p.price.toLocaleString('en-IN')}</div>
                      </div>

                      <div className="wishlist-item-actions">
                        <button
                          className="wishlist-add-cart-btn"
                          onClick={() => {
                            addToCart(p.id, 1);
                          }}
                        >
                          + Cart
                        </button>

                        <button
                          className="wishlist-remove-btn"
                          onClick={() => toggleWishlist(p.id, p.name)}
                          title="Remove from wishlist"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
