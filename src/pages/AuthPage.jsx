import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthPage({ isRegister = false, navigateTo }) {
  const { login, register } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regErrors, setRegErrors] = useState({});

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError(true);
      return;
    }

    const success = login(loginEmail, loginPassword);
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
    if (regPassword.length < 6) errors.password = true;
    if (regConfirm !== regPassword || !regConfirm) errors.confirm = true;

    if (Object.keys(errors).length > 0) {
      setRegErrors(errors);
      return;
    }

    const success = register(regName, regEmail, regPassword);
    if (success) {
      setLoginEmail(regEmail);
      navigateTo('login');
    }
  };

  if (isRegister) {
    return (
      <div className="container" style={{ paddingTop: '50px', paddingBottom: '70px' }}>
        <div className="auth-wrap">
          <h2>Create Account</h2>
          <p className="sub">Join DesiMart in seconds for faster checkout</p>

          <form onSubmit={handleRegisterSubmit} novalidate>
            <div className={`form-group ${regErrors.name ? 'invalid' : ''}`}>
              <label>Full Name</label>
              <input
                type="text"
                value={regName}
                onChange={(e) => {
                  setRegName(e.target.value);
                  setRegErrors((prev) => ({ ...prev, name: false }));
                }}
                placeholder="Priya Sharma"
              />
              <div className="error-msg">Please enter your full name.</div>
            </div>

            <div className={`form-group ${regErrors.email ? 'invalid' : ''}`}>
              <label>Email Address</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => {
                  setRegEmail(e.target.value);
                  setRegErrors((prev) => ({ ...prev, email: false }));
                }}
                placeholder="priya@example.com"
              />
              <div className="error-msg">Enter a valid email address.</div>
            </div>

            <div className={`form-group ${regErrors.password ? 'invalid' : ''}`}>
              <label>Password</label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => {
                  setRegPassword(e.target.value);
                  setRegErrors((prev) => ({ ...prev, password: false }));
                }}
                placeholder="At least 6 characters"
              />
              <div className="error-msg">Password must be at least 6 characters.</div>
            </div>

            <div className={`form-group ${regErrors.confirm ? 'invalid' : ''}`}>
              <label>Confirm Password</label>
              <input
                type="password"
                value={regConfirm}
                onChange={(e) => {
                  setRegConfirm(e.target.value);
                  setRegErrors((prev) => ({ ...prev, confirm: false }));
                }}
                placeholder="Re-enter password"
              />
              <div className="error-msg">Passwords do not match.</div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            Already have an account?{' '}
            <button onClick={() => navigateTo('login')}>Login</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '50px', paddingBottom: '70px' }}>
      <div className="auth-wrap">
        <h2>Welcome Back</h2>
        <p className="sub">Login to continue shopping on DesiMart</p>

        <div className="demo-hint">
          Demo Account — user@desimart.com / password123
        </div>

        <form onSubmit={handleLoginSubmit} novalidate>
          <div className={`form-group ${loginError ? 'invalid' : ''}`}>
            <label>Email Address</label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => {
                setLoginEmail(e.target.value);
                setLoginError(false);
              }}
              placeholder="user@desimart.com"
            />
            <div className="error-msg">Enter a valid email address.</div>
          </div>

          <div className={`form-group ${loginError ? 'invalid' : ''}`}>
            <label>Password</label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => {
                setLoginPassword(e.target.value);
                setLoginError(false);
              }}
              placeholder="password123"
            />
            <div className="error-msg">Incorrect email or password.</div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{' '}
          <button onClick={() => navigateTo('register')}>Create Account</button>
        </div>
      </div>
    </div>
  );
}
