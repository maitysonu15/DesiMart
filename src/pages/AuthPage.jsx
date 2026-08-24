import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function AuthPage({ isRegister = false, navigateTo }) {
  const { login, register } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState(isRegister ? 'register' : 'login');

  useEffect(() => {
    setActiveTab(isRegister ? 'register' : 'login');
  }, [isRegister]);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Register multi-step state (1: Details, 2: OTP, 3: Password)
  const [regStep, setRegStep] = useState(1);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [regErrors, setRegErrors] = useState({});

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginIdentifier || !loginPassword) {
      setLoginError(true);
      return;
    }

    const success = login(loginIdentifier, loginPassword);
    if (success) {
      showToast('Welcome back to DesiMart!', 'success');
      navigateTo('products');
    } else {
      setLoginError(true);
    }
  };

  // STEP 1: Submit Details & Generate OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    const errors = {};

    if (!regName.trim()) errors.name = true;
    if (!regEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) errors.email = true;
    if (!regMobile.trim() || !/^\d{10}$/.test(regMobile)) errors.mobile = true;

    if (Object.keys(errors).length > 0) {
      setRegErrors(errors);
      return;
    }

    // Generate random 4-digit OTP
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setEnteredOtp('');
    setRegErrors({});
    setRegStep(2);
    showToast(`OTP sent to ${regMobile} and ${regEmail}`, 'success');
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (enteredOtp.trim() !== generatedOtp) {
      setRegErrors({ otp: true });
      showToast('Invalid OTP. Please check the code and try again.', 'error');
      return;
    }

    setRegErrors({});
    setRegStep(3);
    showToast('OTP verified successfully! Now set your password.', 'success');
  };

  // STEP 3: Set Password & Finalize Account
  const handleFinalizeRegister = (e) => {
    e.preventDefault();
    const errors = {};

    if (!regPassword || regPassword.length < 6) errors.password = true;
    if (regPassword !== confirmPassword) errors.confirmPassword = true;

    if (Object.keys(errors).length > 0) {
      setRegErrors(errors);
      return;
    }

    const success = register(regName, regEmail, regPassword, regMobile);
    if (success) {
      navigateTo('products');
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
              onClick={() => {
                setActiveTab('login');
                setLoginError(false);
                setRegErrors({});
                setRegStep(1);
              }}
            >
              Sign In / Log In
            </button>

            <button
              className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('register');
                setLoginError(false);
                setRegErrors({});
                setRegStep(1);
              }}
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
            /* CREATE ACCOUNT MULTI-STEP FORM */
            <div style={{ marginTop: '18px' }}>
              {/* Step Progress Bar */}
              <div className="reg-step-indicator-bar">
                <div className={`reg-step-pill ${regStep >= 1 ? 'active' : ''}`}>1. Details</div>
                <div className="step-connector">→</div>
                <div className={`reg-step-pill ${regStep >= 2 ? 'active' : ''}`}>2. OTP</div>
                <div className="step-connector">→</div>
                <div className={`reg-step-pill ${regStep >= 3 ? 'active' : ''}`}>3. Password</div>
              </div>

              {/* STEP 1: Enter Name, Email & Mobile */}
              {regStep === 1 && (
                <form onSubmit={handleSendOtp} noValidate>
                  <div className="auth-form-heading">Create your Desimart Account</div>
                  <p className="auth-form-subheading">
                    Enter your contact details to receive a 4-digit OTP verification code.
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

                  <button type="submit" className="auth-submit-btn">
                    Send OTP Verification Code →
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

              {/* STEP 2: Enter & Verify OTP */}
              {regStep === 2 && (
                <form onSubmit={handleVerifyOtp} noValidate>
                  <div className="auth-form-heading">Verify OTP Code</div>
                  <p className="auth-form-subheading">
                    We sent a 4-digit OTP to <strong>{regMobile}</strong> / <strong>{regEmail}</strong>.
                  </p>

                  {/* Demo OTP Banner */}
                  <div className="otp-demo-hint-box">
                    <span>📩 Demo OTP Code: <strong>{generatedOtp}</strong></span>
                    <button
                      type="button"
                      className="otp-resend-btn"
                      onClick={() => {
                        const code = Math.floor(1000 + Math.random() * 9000).toString();
                        setGeneratedOtp(code);
                        showToast(`New OTP sent: ${code}`, 'success');
                      }}
                    >
                      Resend OTP
                    </button>
                  </div>

                  <div className={`form-group ${regErrors.otp ? 'invalid' : ''}`}>
                    <label className="auth-input-label">Enter 4-Digit OTP</label>
                    <input
                      type="text"
                      maxLength={4}
                      className="auth-mint-input otp-digit-input"
                      value={enteredOtp}
                      onChange={(e) => {
                        setEnteredOtp(e.target.value);
                        setRegErrors((prev) => ({ ...prev, otp: false }));
                      }}
                      placeholder="e.g. 4821"
                      autoFocus
                    />
                    <div className="error-msg">Invalid OTP code. Please enter {generatedOtp}.</div>
                  </div>

                  <button type="submit" className="auth-submit-btn">
                    Verify OTP →
                  </button>

                  <div className="auth-footer-prompt">
                    Need to change details?{' '}
                    <button
                      type="button"
                      className="auth-link-action"
                      onClick={() => setRegStep(1)}
                    >
                      Go back to Step 1
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Create Password & Complete Setup */}
              {regStep === 3 && (
                <form onSubmit={handleFinalizeRegister} noValidate>
                  <div className="auth-form-heading">Create Password</div>
                  <p className="auth-form-subheading">
                    Set a secure password for <strong>{regEmail}</strong> to finish creating your account.
                  </p>

                  <div className={`form-group ${regErrors.password ? 'invalid' : ''}`}>
                    <label className="auth-input-label">Create Password</label>
                    <input
                      type="password"
                      className="auth-mint-input"
                      value={regPassword}
                      onChange={(e) => {
                        setRegPassword(e.target.value);
                        setRegErrors((prev) => ({ ...prev, password: false }));
                      }}
                      placeholder="At least 6 characters"
                    />
                    <div className="error-msg">Password must be at least 6 characters.</div>
                  </div>

                  <div className={`form-group ${regErrors.confirmPassword ? 'invalid' : ''}`}>
                    <label className="auth-input-label">Confirm Password</label>
                    <input
                      type="password"
                      className="auth-mint-input"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setRegErrors((prev) => ({ ...prev, confirmPassword: false }));
                      }}
                      placeholder="Re-enter your password"
                    />
                    <div className="error-msg">Passwords do not match.</div>
                  </div>

                  <button type="submit" className="auth-submit-btn">
                    Complete Account Setup
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
