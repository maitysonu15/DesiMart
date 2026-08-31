import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function CartPage({ navigateTo }) {
  const {
    products,
    cart,
    updateCartQty,
    removeFromCart,
    applyPromo,
    removePromo,
    promoApplied,
    getCartTotals
  } = useCart();

  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const [promoInput, setPromoInput] = useState('');

  if (cart.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '50px', paddingBottom: '70px' }}>
        <div className="empty-state-card">
          <div className="empty-state-icon">🛒</div>
          <h2 className="empty-state-title">Your Cart is Empty</h2>
          <p className="empty-state-sub">Explore our 17 departments and add fresh items to your shopping cart.</p>
          <button className="hero-btn-primary" onClick={() => navigateTo('products')}>
            Start Shopping →
          </button>
        </div>
      </div>
    );
  }

  const totals = getCartTotals();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    applyPromo(promoInput.trim() || 'DESI10');
  };

  const handleCheckoutClick = () => {
    if (!currentUser) {
      showToast('Please login or register to complete your checkout.', 'error');
      navigateTo('login');
      return;
    }
    navigateTo('checkout');
  };

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '60px' }}>
      <div className="section-head">
        <div>
          <h2>Your Shopping Cart ({cart.length} item{cart.length === 1 ? '' : 's'})</h2>
        </div>
      </div>

      <div className="cart-layout">
        <div>
          {cart.map((c) => {
            const p = products.find((x) => x.id === c.productId);
            if (!p) return null;

            const subtotal = p.price * c.quantity;
            const maxStock = p.stock;

            return (
              <div key={p.id} className="cart-item">
                <div className="thumb">{p.emoji}</div>
                <div>
                  <div className="name">{p.name}</div>
                  <div className="price">₹{p.price.toLocaleString('en-IN')} each</div>
                </div>

                <div className="qty-control">
                  <button onClick={() => updateCartQty(p.id, -1)}>−</button>
                  <span>{c.quantity}</span>
                  <button
                    onClick={() => updateCartQty(p.id, 1)}
                    disabled={c.quantity >= maxStock}
                  >
                    +
                  </button>
                </div>

                <div className="subtotal">₹{subtotal.toLocaleString('en-IN')}</div>

                <button className="remove-btn" onClick={() => removeFromCart(p.id)}>
                  Remove
                </button>
              </div>
            );
          })}

          <button
            className="btn btn-ghost"
            style={{ marginTop: '14px' }}
            onClick={() => navigateTo('products')}
          >
            ← Continue Shopping
          </button>
        </div>

        {/* Summary Card */}
        <div className="summary-card">
          <h3>Order Summary</h3>

          {promoApplied ? (
            <div className="promo-applied-badge" style={{ marginBottom: '16px' }}>
              <span>🎉 <strong>DESI10</strong> Applied (10% OFF)</span>
              <button
                type="button"
                className="promo-remove-btn"
                onClick={() => {
                  removePromo();
                  setPromoInput('');
                }}
              >
                ✕ Remove
              </button>
            </div>
          ) : (
            <form className="promo-row" onSubmit={handleApplyPromo}>
              <input
                type="text"
                placeholder="Promo code (try DESI10)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-accent btn-sm"
              >
                Apply
              </button>
            </form>
          )}

          <div className="summary-row">
            <span>Subtotal</span>
            <span className="val">₹{totals.subtotal.toLocaleString('en-IN')}</span>
          </div>

          {totals.couponDiscount > 0 && (
            <div className="summary-row green-text" style={{ color: '#16A34A', fontWeight: 700 }}>
              <span>Coupon Discount (DESI10)</span>
              <span className="val">−₹{totals.couponDiscount.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span className="val">
              {totals.delivery === 0 ? 'FREE' : `₹${totals.delivery}`}
            </span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span className="val">₹{totals.total.toLocaleString('en-IN')}</span>
          </div>

          <button
            className="btn btn-primary btn-block"
            style={{ marginTop: '18px' }}
            onClick={handleCheckoutClick}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
