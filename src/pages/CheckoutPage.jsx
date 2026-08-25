import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';

export default function CheckoutPage({ navigateTo }) {
  const { cart, cartCount, getCartTotals, applyPromo, promoApplied } = useCart();
  const { currentUser } = useAuth();
  const { placeOrder } = useOrders();
  const { showToast } = useToast();

  useEffect(() => {
    if (!currentUser) {
      showToast('Please Sign In or Create an Account to proceed to Checkout.', 'error');
      navigateTo('login');
    }
  }, [currentUser]);

  if (!currentUser) return null;

  const totals = getCartTotals();

  // Delivery Address State
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [mobileNumber, setMobileNumber] = useState(currentUser?.mobile || '');
  const [streetAddress, setStreetAddress] = useState(currentUser?.address || '');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  // Payment Option State (Default COD)
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [promoInput, setPromoInput] = useState('');

  const handlePlaceOrderSubmit = (e) => {
    e.preventDefault();
    if (isPlacingOrder) return;

    const errors = {};

    if (!fullName.trim()) errors.fullName = true;
    if (!mobileNumber.trim() || !/^\d{10}$/.test(mobileNumber)) errors.mobileNumber = true;
    if (!streetAddress.trim()) errors.streetAddress = true;
    if (!city.trim()) errors.city = true;
    if (!pincode.trim() || !/^\d{6}$/.test(pincode)) errors.pincode = true;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      showToast('Please fill in all required delivery address fields correctly.', 'error');
      return;
    }

    setIsPlacingOrder(true);

    const customer = {
      fullName,
      mobileNumber,
      streetAddress,
      city,
      pincode,
      paymentMethod
    };

    setTimeout(() => {
      const newOrder = placeOrder({
        customer,
        cartItems: cart,
        totals,
        userEmail: currentUser?.email
      });

      if (newOrder) {
        navigateTo('success');
      } else {
        setIsPlacingOrder(false);
      }
    }, 1200);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    applyPromo(promoInput.trim() || 'DESI10');
  };

  return (
    <div className="checkout-modal-overlay">
      <div className="checkout-modal-card">
        {/* Header */}
        <div className="checkout-modal-header">
          <div className="checkout-header-title">Secure Desimart Checkout</div>
          <button
            className="checkout-close-btn"
            onClick={() => navigateTo('products')}
            aria-label="Close Checkout"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePlaceOrderSubmit} noValidate className="checkout-modal-body">
          <div className="checkout-two-col">
            {/* Left Column: 1. Delivery Address */}
            <div className="checkout-col-section">
              <h3 className="checkout-section-title">
                <span>📍</span> 1. Delivery Address
              </h3>

              <div className={`form-group ${fieldErrors.fullName ? 'invalid' : ''}`}>
                <label className="auth-input-label">Full Name</label>
                <input
                  type="text"
                  className="auth-mint-input"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, fullName: false }));
                  }}
                  placeholder="e.g. John Doe"
                />
                <div className="error-msg">Enter full name.</div>
              </div>

              <div className={`form-group ${fieldErrors.mobileNumber ? 'invalid' : ''}`}>
                <label className="auth-input-label">Mobile Number</label>
                <input
                  type="tel"
                  className="auth-mint-input"
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, mobileNumber: false }));
                  }}
                  placeholder="e.g. 9876543210"
                />
                <div className="error-msg">Enter valid 10-digit mobile number.</div>
              </div>

              <div className={`form-group ${fieldErrors.streetAddress ? 'invalid' : ''}`}>
                <label className="auth-input-label">Street Address / House No.</label>
                <input
                  type="text"
                  className="auth-mint-input"
                  value={streetAddress}
                  onChange={(e) => {
                    setStreetAddress(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, streetAddress: false }));
                  }}
                  placeholder="e.g. Flat 101, Sunflower Apartments"
                />
                <div className="error-msg">Enter street address.</div>
              </div>

              <div className="checkout-city-pincode-grid">
                <div className={`form-group ${fieldErrors.city ? 'invalid' : ''}`}>
                  <label className="auth-input-label">City</label>
                  <input
                    type="text"
                    className="auth-mint-input"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      setFieldErrors((prev) => ({ ...prev, city: false }));
                    }}
                    placeholder="e.g. Mumbai"
                  />
                  <div className="error-msg">Enter city.</div>
                </div>

                <div className={`form-group ${fieldErrors.pincode ? 'invalid' : ''}`}>
                  <label className="auth-input-label">Pincode</label>
                  <input
                    type="text"
                    className="auth-mint-input"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value);
                      setFieldErrors((prev) => ({ ...prev, pincode: false }));
                    }}
                    placeholder="e.g. 400001"
                  />
                  <div className="error-msg">Enter 6-digit pincode.</div>
                </div>
              </div>
            </div>

            {/* Right Column: 2. Payment Options & Promo Code */}
            <div className="checkout-col-section">
              <h3 className="checkout-section-title">
                <span>💳</span> 2. Payment Options & Coupons
              </h3>

              <div className="checkout-payment-methods-wrap">
                {/* 1. COD */}
                <div
                  className={`checkout-payment-card ${paymentMethod === 'cod' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <div className="payment-card-radio">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                  </div>
                  <div className="payment-card-info">
                    <div className="payment-card-title">Cash on Delivery (COD)</div>
                    <div className="payment-card-sub">Pay at your doorstep via Cash or UPI QR scan</div>
                  </div>
                </div>

                {/* 2. UPI */}
                <div
                  className={`checkout-payment-card ${paymentMethod === 'upi' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <div className="payment-card-radio">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                    />
                  </div>
                  <div className="payment-card-info">
                    <div className="payment-card-title">UPI (Google Pay / PhonePe / Paytm)</div>
                    <div className="payment-card-sub">Instant, zero fee payment</div>
                  </div>
                </div>

                {/* 3. Card / Net Banking */}
                <div
                  className={`checkout-payment-card ${paymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="payment-card-radio">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                  </div>
                  <div className="payment-card-info">
                    <div className="payment-card-title">Credit / Debit Card / Net Banking</div>
                    <div className="payment-card-sub">All major Indian banks supported</div>
                  </div>
                </div>
              </div>

              {/* Promo / Coupon Box */}
              <div className="drawer-promo-box" style={{ marginBottom: '16px' }}>
                {promoApplied ? (
                  <div className="promo-applied-badge">
                    <span>🎉 <strong>DESI10</strong> Applied — 10% Discount Active!</span>
                  </div>
                ) : (
                  <div className="drawer-promo-row">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. DESI10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="drawer-promo-input"
                    />
                    <button
                      type="button"
                      className="drawer-promo-btn"
                      onClick={handleApplyCoupon}
                    >
                      Apply Coupon
                    </button>
                  </div>
                )}
              </div>

              {/* Order Total Mint Box */}
              <div className="checkout-total-mint-box">
                <div className="total-mint-row">
                  <span className="lbl">Order Total ({cartCount} items)</span>
                  <span className="val">₹{totals.total.toLocaleString('en-IN')}</span>
                </div>
                <div className="security-note">
                  🔒 Safe & Encrypted 256-bit payment demonstration.
                </div>
              </div>

              {/* Confirm Order Button with Loading State */}
              <button
                type="submit"
                className="checkout-confirm-btn"
                disabled={isPlacingOrder}
                style={{ opacity: isPlacingOrder ? 0.75 : 1 }}
              >
                {isPlacingOrder
                  ? '⏳ Waiting for place order...'
                  : `Confirm Order (₹${totals.total.toLocaleString('en-IN')})`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
