import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

export default function ProfileModal({ isOpen, onClose, navigateTo, initialTab = 'details' }) {
  const { currentUser, updateUserProfile } = useAuth();
  const { products, addToCart } = useCart();
  const { wishlistIds, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState(initialTab);

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState(currentUser?.address || '');

  if (!isOpen) return null;

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!addressInput.trim()) {
      showToast('Please enter a valid delivery address.', 'error');
      return;
    }
    updateUserProfile({ address: addressInput.trim() });
    setIsEditingAddress(false);
    showToast('Default delivery address updated successfully!', 'success');
  };

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
              {currentUser ? (
                /* AUTHENTICATED USER DETAILS */
                <>
                  <div className="profile-user-hero-badge">
                    <div className="user-avatar-circle">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="user-display-name">{currentUser.name}</div>
                      <div className="user-status-pill">VERIFIED MEMBER</div>
                    </div>
                  </div>

                  <div className="profile-info-grid">
                    <div className="profile-info-item">
                      <div className="info-lbl">📱 Mobile Number</div>
                      <div className="info-val">{currentUser.mobile || 'Not provided'}</div>
                    </div>

                    <div className="profile-info-item">
                      <div className="info-lbl">✉️ Email Address</div>
                      <div className="info-val">{currentUser.email}</div>
                    </div>

                    <div className="profile-info-item full-width">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <div className="info-lbl">📍 Default Delivery Address</div>
                        {!isEditingAddress && (
                          <button
                            type="button"
                            onClick={() => {
                              setAddressInput(currentUser.address || '');
                              setIsEditingAddress(true);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#16A34A',
                              fontWeight: 700,
                              fontSize: '0.82rem',
                              cursor: 'pointer'
                            }}
                          >
                            ✏️ Edit Address
                          </button>
                        )}
                      </div>

                      {isEditingAddress ? (
                        <form onSubmit={handleSaveAddress} style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                          <input
                            type="text"
                            className="auth-mint-input"
                            style={{ flex: 1, padding: '8px 12px', fontSize: '0.86rem' }}
                            value={addressInput}
                            onChange={(e) => setAddressInput(e.target.value)}
                            placeholder="Enter street, city & pincode"
                          />
                          <button type="submit" className="auth-submit-btn" style={{ width: 'auto', padding: '8px 16px', fontSize: '0.84rem' }}>
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost"
                            style={{ padding: '8px 12px', fontSize: '0.84rem' }}
                            onClick={() => setIsEditingAddress(false)}
                          >
                            Cancel
                          </button>
                        </form>
                      ) : (
                        <div className="info-val">
                          {currentUser.address || 'Address set during checkout'}
                        </div>
                      )}
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
                </>
              ) : (
                /* UNAUTHENTICATED GUEST PROMPT */
                <div style={{ textAlign: 'center', padding: '24px 12px 12px' }}>
                  <div className="empty-wishlist-icon">👤</div>
                  <div className="empty-wishlist-title">Guest Session — Not Signed In</div>
                  <p className="empty-wishlist-sub" style={{ maxWidth: '340px', margin: '8px auto 20px' }}>
                    You are currently shopping as a guest. Please Sign In or Create an Account to save your details and wishlist across devices.
                  </p>

                  <button
                    className="auth-submit-btn"
                    onClick={() => {
                      onClose();
                      navigateTo('login');
                    }}
                  >
                    Sign In / Create Account →
                  </button>
                </div>
              )}
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
