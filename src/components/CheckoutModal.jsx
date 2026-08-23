import React, { useState, useEffect } from 'react';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onPlaceOrder,
  user
}) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        phone: user.phone || prev.phone
      }));
    }
  }, [user]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = subtotal >= 499 || subtotal === 0 ? 0 : 40;
  const finalTotal = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onPlaceOrder({
        id: `DESI-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cartItems],
        total: finalTotal,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        shipping: { ...formData },
        status: 'Confirmed - Out for Packing'
      });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="checkout-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-header">
          <h2>Secure Desimart Checkout</h2>
          <button type="button" className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-grid">
            {/* Delivery address */}
            <div className="checkout-section">
              <h3>📍 1. Delivery Address</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Street Address / House No.</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Flat 101, Sunflower Apartments"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Mumbai"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. 400001"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="checkout-section">
              <h3>💳 2. Payment Options</h3>
              <div className="payment-options-list">
                <label className={`payment-card ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod" 
                    checked={formData.paymentMethod === 'cod'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  />
                  <div className="payment-details">
                    <strong>Cash on Delivery (COD)</strong>
                    <span>Pay at your doorstep via Cash or UPI QR scan</span>
                  </div>
                </label>

                <label className={`payment-card ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="upi" 
                    checked={formData.paymentMethod === 'upi'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  />
                  <div className="payment-details">
                    <strong>UPI (Google Pay / PhonePe / Paytm)</strong>
                    <span>Instant, zero fee payment</span>
                  </div>
                </label>

                <label className={`payment-card ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="card" 
                    checked={formData.paymentMethod === 'card'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  />
                  <div className="payment-details">
                    <strong>Credit / Debit Card / Net Banking</strong>
                    <span>All major Indian banks supported</span>
                  </div>
                </label>
              </div>

              {/* Order summary box */}
              <div className="checkout-order-summary">
                <div className="order-summary-header">
                  <span>Order Total ({cartItems.length} items)</span>
                  <strong>₹{finalTotal.toLocaleString('en-IN')}</strong>
                </div>
                <p className="checkout-note">
                  🔒 Safe &amp; Encrypted 256-bit payment demonstration.
                </p>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg full-width btn-place-order"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Placing Order...' : `Confirm & Place Order (₹${finalTotal.toLocaleString('en-IN')})`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
