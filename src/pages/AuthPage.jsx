import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthPage({ isRegister = false, navigateTo }) {
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState(isRegister ? 'register' : 'login');

  useEffect(() => {
    setActiveTab(isRegister ? 'register' : 'login');
  }, [isRegister]);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regErrors, setRegErrors] = useState({});

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginIdentifier || !loginPassword) {
      setLoginError(true);
      return;
    }

    const success = login(loginIdentifier, loginPassword);
    if (success) {
      navigateTo('products');
    } else {
      setLoginError(true);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!regName.trim()) errors.name = true;
    if (!regEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) errors.email = true;
    if (!regMobile.trim() || !/^\d{10}$/.test(regMobile)) errors.mobile = true;
    if (regPassword.length < 6) errors.password = true;

    if (Object.keys(errors).length > 0) {
      setRegErrors(errors);
      return;
    }

    const success = register(regName, regEmail, regPassword);
    if (success) {
      setLoginIdentifier(regEmail);
      setActiveTab('login');
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-card">
        {/* Header Bar */}
        <div className="auth-modal-header">
          <div className="auth-modal-header-title">
            <span style={{ fontSize: '1.1rem' }}>👤</span>
            <span>{activeTab === 'login' ? 'Sign In / Log In' : 'Create an Account'}</span>
          </div>
          <button
            className="auth-modal-close-btn"
            onClick={() => navigateTo('home')}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <div className="auth-modal-body">
          {/* Segmented Tab Switcher */}
          <div className="auth-tab-track">
            <button
              className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Sign In / Log In
            </button>

            <button
              className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Create Account (Sign Up)
            </button>
          </div>

          {/* SIGN IN FORM */}
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} noValidate style={{ marginTop: '20px' }}>
              <div className="auth-form-heading">Welcome back!</div>
              <p className="auth-form-subheading">
                Enter your details to access your account, past orders, and saved preferences.
              </p>

              <div className="demo-hint" style={{ marginBottom: '16px' }}>
                Demo Account — user@desimart.com / password123
              </div>

              <div className={`form-group ${loginError ? 'invalid' : ''}`}>
                <label className="auth-input-label">Email or Mobile Number</label>
                <input
                  type="text"
                  className="auth-mint-input"
                  value={loginIdentifier}
                  onChange={(e) => {
                    setLoginIdentifier(e.target.value);
                    setLoginError(false);
                  }}
                  placeholder="Enter your email or 10-digit mobile"
                />
                <div className="error-msg">Enter a valid email or 10-digit mobile number.</div>
              </div>

              <div className={`form-group ${loginError ? 'invalid' : ''}`}>
                <label className="auth-input-label">Password</label>
                <input
                  type="password"
                  className="auth-mint-input"
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setLoginError(false);
                  }}
                  placeholder="Enter your password"
                />
                <div className="error-msg">Enter your valid password.</div>
              </div>

              <button type="submit" className="auth-submit-btn">
                Sign In / Log In
              </button>

              <div className="auth-footer-prompt">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="auth-link-action"
                  onClick={() => setActiveTab('register')}
                >
                  Create one now
                </button>
              </div>
            </form>
          ) : (
            /* CREATE ACCOUNT FORM */
            <form onSubmit={handleRegisterSubmit} noValidate style={{ marginTop: '20px' }}>
              <div className="auth-form-heading">Create your Desimart Account</div>
              <p className="auth-form-subheading">
                Join Desimart to unlock exclusive member discounts and quick checkout.
              </p>

              <div className={`form-group ${regErrors.name ? 'invalid' : ''}`}>
                <label className="auth-input-label">Full Name</label>
                <input
                  type="text"
                  className="auth-mint-input"
                  value={regName}
                  onChange={(e) => {
                    setRegName(e.target.value);
                    setRegErrors((prev) => ({ ...prev, name: false }));
                  }}
                  placeholder="e.g. Rahul Sharma"
                />
                <div className="error-msg">Please enter your full name.</div>
              </div>

              <div className={`form-group ${regErrors.email ? 'invalid' : ''}`}>
                <label className="auth-input-label">Email Address</label>
                <input
                  type="email"
                  className="auth-mint-input"
                  value={regEmail}
                  onChange={(e) => {
                    setRegEmail(e.target.value);
                    setRegErrors((prev) => ({ ...prev, email: false }));
                  }}
                  placeholder="e.g. rahul@gmail.com"
                />
                <div className="error-msg">Enter a valid email address.</div>
              </div>

              <div className={`form-group ${regErrors.mobile ? 'invalid' : ''}`}>
                <label className="auth-input-label">Mobile Number</label>
                <input
                  type="tel"
                  className="auth-mint-input"
                  value={regMobile}
                  onChange={(e) => {
                    setRegMobile(e.target.value);
                    setRegErrors((prev) => ({ ...prev, mobile: false }));
                  }}
                  placeholder="e.g. 9876543210"
                />
                <div className="error-msg">Enter a valid 10-digit mobile number.</div>
              </div>

              <div className={`form-group ${regErrors.password ? 'invalid' : ''}`}>
                <label className="auth-input-label">Password</label>
                <input
                  type="password"
                  className="auth-mint-input"
                  value={regPassword}
                  onChange={(e) => {
                    setRegPassword(e.target.value);
                    setRegErrors((prev) => ({ ...prev, password: false }));
                  }}
                  placeholder="Create a strong password"
                />
                <div className="error-msg">Password must be at least 6 characters.</div>
              </div>

              <button type="submit" className="auth-submit-btn">
                Create Desimart Account
              </button>

              <div className="auth-footer-prompt">
                Already have an account?{' '}
                <button
                  type="button"
                  className="auth-link-action"
                  onClick={() => setActiveTab('login')}
                >
                  Sign In here
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
