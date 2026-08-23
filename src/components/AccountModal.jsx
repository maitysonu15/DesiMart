import React, { useState } from 'react';

export default function AccountModal({
  isOpen,
  onClose,
  onOpenOrders,
  orderCount,
  user,
  onLogin,
  onLogout
}) {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'addresses'
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    emailOrPhone: '',
    password: ''
  });

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const identifier = loginForm.emailOrPhone || 'user@desimart.in';
    const displayName = identifier.includes('@') ? identifier.split('@')[0] : 'User';
    onLogin({
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
      email: identifier.includes('@') ? identifier : `${identifier}@desimart.in`,
      phone: !identifier.includes('@') ? identifier : '+91 98765 00000',
      memberSince: 'August 2026'
    });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    onLogin({
      name: signupForm.name || 'User',
      email: signupForm.email || 'user@desimart.in',
      phone: signupForm.phone || '+91 98765 00000',
      memberSince: 'August 2026'
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="account-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="account-modal-header">
          <div className="account-header-title">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
            <h2>{user ? 'My Desimart Account' : (authMode === 'login' ? 'Sign In / Log In' : 'Create an Account')}</h2>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        <div className="account-modal-body">
          {user ? (
            /* Logged-In User Profile Dashboard */
            <div className="account-logged-in">
              <div className="account-tabs">
                <button 
                  type="button" 
                  className={`account-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  👤 Profile &amp; Details
                </button>
                <button 
                  type="button" 
                  className={`account-tab-btn ${activeTab === 'addresses' ? 'active' : ''}`}
                  onClick={() => setActiveTab('addresses')}
                >
                  📍 Saved Addresses
                </button>
                <button 
                  type="button" 
                  className="account-tab-btn"
                  onClick={() => {
                    onClose();
                    onOpenOrders();
                  }}
                >
                  📦 My Orders {orderCount > 0 ? `(${orderCount})` : ''}
                </button>
              </div>

              {activeTab === 'profile' && (
                <div className="account-tab-content">
                  <div className="profile-badge-card">
                    <div className="profile-avatar">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="profile-meta">
                      <h3>{user.name}</h3>
                      <p>{user.email} · {user.phone}</p>
                      <span className="member-tag">🌿 Desimart Member (Joined {user.memberSince})</span>
                    </div>
                  </div>

                  <div className="profile-quick-stats">
                    <div className="stat-card">
                      <span className="stat-icon">🛍️</span>
                      <div>
                        <strong>{orderCount} Orders</strong>
                        <p>Placed with Desimart</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <span className="stat-icon">⚡</span>
                      <div>
                        <strong>Free Delivery</strong>
                        <p>Active on &gt; ₹499</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <span className="stat-icon">🛡️</span>
                      <div>
                        <strong>Buyer Protection</strong>
                        <p>7-Day Easy Returns</p>
                      </div>
                    </div>
                  </div>

                  <div className="account-actions-bottom">
                    <button 
                      type="button" 
                      className="btn-logout"
                      onClick={onLogout}
                    >
                      🚪 Log Out
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="account-tab-content">
                  <div className="addresses-list">
                    <div className="address-item-card">
                      <div className="address-head">
                        <span className="address-label">Primary Address</span>
                        <span className="default-badge">Active</span>
                      </div>
                      <p className="address-text">Add your delivery address during checkout to save it here for fast 1-click re-orders.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged-Out Authentication Form: Sign In / Log In or Sign Up */
            <div className="account-auth-container">
              {/* Toggle Tab between Sign In / Log In and Sign Up */}
              <div className="auth-switcher-tabs">
                <button
                  type="button"
                  className={`auth-switch-btn ${authMode === 'login' ? 'active' : ''}`}
                  onClick={() => setAuthMode('login')}
                >
                  Sign In / Log In
                </button>
                <button
                  type="button"
                  className={`auth-switch-btn ${authMode === 'signup' ? 'active' : ''}`}
                  onClick={() => setAuthMode('signup')}
                >
                  Create Account (Sign Up)
                </button>
              </div>

              {authMode === 'login' ? (
                /* Sign In / Log In Form */
                <form onSubmit={handleLoginSubmit} className="login-form">
                  <div className="auth-form-intro">
                    <h3>Welcome back!</h3>
                    <p>Enter your details to access your account, past orders, and saved preferences.</p>
                  </div>

                  <div className="form-group">
                    <label>Email or Mobile Number</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Enter your email or 10-digit mobile" 
                      value={loginForm.emailOrPhone}
                      onChange={(e) => setLoginForm({ ...loginForm, emailOrPhone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input 
                      type="password" 
                      required 
                      placeholder="Enter your password" 
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary full-width btn-lg">
                    Sign In / Log In
                  </button>

                  <div className="auth-footer-prompt">
                    <span>Don't have an account?</span>{' '}
                    <button type="button" className="auth-link-inline" onClick={() => setAuthMode('signup')}>
                      Create one now
                    </button>
                  </div>
                </form>
              ) : (
                /* Sign Up Form */
                <form onSubmit={handleSignupSubmit} className="login-form">
                  <div className="auth-form-intro">
                    <h3>Create your Desimart Account</h3>
                    <p>Join Desimart to unlock exclusive member discounts and quick checkout.</p>
                  </div>

                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Rahul Sharma" 
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="e.g. rahul@gmail.com" 
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="e.g. 9876543210" 
                      value={signupForm.phone}
                      onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input 
                      type="password" 
                      required 
                      placeholder="Create a strong password" 
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary full-width btn-lg">
                    Create Desimart Account
                  </button>

                  <div className="auth-footer-prompt">
                    <span>Already have an account?</span>{' '}
                    <button type="button" className="auth-link-inline" onClick={() => setAuthMode('login')}>
                      Sign In here
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
