import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';

export default function CheckoutPage({ navigateTo }) {
  const { currentUser } = useAuth();
  const { cart, products, getCartTotals } = useCart();
  const { placeOrder } = useOrders();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pin: '',
    address: '',
    city: '',
    state: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name || '',
        email: currentUser.email || ''
      }));
    }
  }, [currentUser]);

  if (cart.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '50px', paddingBottom: '70px' }}>
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Please add products to your cart before proceeding to checkout.</p>
          <button className="btn btn-primary" onClick={() => navigateTo('products')}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const totals = getCartTotals();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true;
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) newErrors.phone = true;
    if (!formData.pin.trim() || !/^\d{6}$/.test(formData.pin)) newErrors.pin = true;
    if (!formData.address.trim()) newErrors.address = true;
    if (!formData.city.trim()) newErrors.city = true;
    if (!formData.state.trim()) newErrors.state = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const orderRecord = placeOrder({
      customer: formData,
      cartItems: cart,
      totals,
      userEmail: currentUser ? currentUser.email : formData.email
    });

    if (orderRecord) {
      navigateTo('success');
    }
  };

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '60px' }}>
      <div className="section-head">
        <div>
          <h2>Checkout & Shipping</h2>
          <p>Provide your delivery details to complete your order.</p>
        </div>
      </div>

      <div className="checkout-layout">
        <div className="checkout-form-card">
          <h3>Delivery Information</h3>

          <form onSubmit={handleSubmit} novalidate>
            <div className="form-grid">
              <div className={`form-group ${errors.name ? 'invalid' : ''}`}>
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Rahul Sharma"
                />
                <div className="error-msg">Full name is required.</div>
              </div>

              <div className={`form-group ${errors.email ? 'invalid' : ''}`}>
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="rahul@example.com"
                />
                <div className="error-msg">Valid email is required.</div>
              </div>

              <div className={`form-group ${errors.phone ? 'invalid' : ''}`}>
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                />
                <div className="error-msg">Enter a valid 10-digit phone number.</div>
              </div>

              <div className={`form-group ${errors.pin ? 'invalid' : ''}`}>
                <label>PIN Code</label>
                <input
                  type="text"
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  placeholder="6-digit PIN code"
                />
                <div className="error-msg">Enter a valid 6-digit PIN code.</div>
              </div>

              <div className={`form-group full ${errors.address ? 'invalid' : ''}`}>
                <label>Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Flat / House No., Colony / Street"
                />
                <div className="error-msg">Address is required.</div>
              </div>

              <div className={`form-group ${errors.city ? 'invalid' : ''}`}>
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Jaipur"
                />
                <div className="error-msg">City is required.</div>
              </div>

              <div className={`form-group ${errors.state ? 'invalid' : ''}`}>
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g. Rajasthan"
                />
                <div className="error-msg">State is required.</div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              style={{ marginTop: '16px' }}
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary Side */}
        <div className="summary-card">
          <h3>Order Items</h3>

          {cart.map((c) => {
            const p = products.find((x) => x.id === c.productId);
            if (!p) return null;
            return (
              <div key={p.id} className="order-line">
                <span>
                  {p.name} <span className="qty">× {c.quantity}</span>
                </span>
                <span>₹{(p.price * c.quantity).toLocaleString('en-IN')}</span>
              </div>
            );
          })}

          <div className="summary-row" style={{ marginTop: '14px' }}>
            <span>Subtotal</span>
            <span className="val">₹{totals.subtotal.toLocaleString('en-IN')}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span className="val">
              {totals.delivery === 0 ? 'FREE' : `₹${totals.delivery}`}
            </span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span className="val">−₹{totals.discount.toLocaleString('en-IN')}</span>
          </div>

          <div className="summary-row total">
            <span>Total Payable</span>
            <span className="val">₹{totals.total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
