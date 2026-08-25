import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function CartDrawer({ isOpen, onClose, navigateTo }) {
  const {
    products,
    cart,
    cartCount,
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

  if (!isOpen) return null;

  const totals = getCartTotals();

  // Free delivery threshold: ₹499
  const freeDeliveryThreshold = 499;
  const isFreeDelivery = totals.subtotal >= freeDeliveryThreshold || cart.length === 0;
  const amountNeededForFree = Math.max(0, freeDeliveryThreshold - totals.subtotal);
  const progressPercent = Math.min(100, Math.round((totals.subtotal / freeDeliveryThreshold) * 100));

  const handleCheckoutClick = () => {
    if (!currentUser) {
      showToast('Please login or register to complete your checkout.', 'error');
      onClose();
      navigateTo('login');
      return;
    }
    onClose();
    navigateTo('checkout');
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const codeToUse = promoInput.trim() || 'DESI10';
    applyPromo(codeToUse);
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-drawer-header-title">
            <span style={{ fontSize: '1.2rem' }}>🛒</span>
            <span>My Desimart Basket ({cartCount})</span>
          </div>
          <button className="cart-drawer-close-btn" onClick={onClose} aria-label="Close Basket">
            ✕
          </button>
        </div>

        {/* Free Delivery Progress Bar Banner */}
        <div className="delivery-banner-wrap">
          {cart.length === 0 ? (
            <div className="delivery-banner-text">
              Add <strong>₹499</strong> more to unlock <strong>FREE Delivery!</strong>
            </div>
          ) : isFreeDelivery ? (
            <div className="delivery-banner-text free-unlocked">
              🎉 You get <strong>FREE Express Delivery!</strong>
            </div>
          ) : (
            <div className="delivery-banner-text">
              Add <strong>₹{amountNeededForFree.toLocaleString('en-IN')}</strong> more to unlock <strong>FREE Delivery!</strong>
            </div>
          )}

          <div className="delivery-progress-track">
            <div
              className={`delivery-progress-bar ${isFreeDelivery ? 'full' : ''}`}
              style={{ width: `${cart.length === 0 ? 0 : (isFreeDelivery ? 100 : progressPercent)}%` }}
            />
          </div>
        </div>

        {/* Drawer Body: Empty or Itemized */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            /* EMPTY BASKET VIEW */
            <div className="cart-drawer-empty">
              <div className="cart-empty-icon">🛒</div>
              <div className="cart-empty-heading">Your basket is empty</div>
              <p className="cart-empty-sub">
                Looks like you haven't added any fresh goodies to your basket yet.
              </p>
              <button
                className="cart-browse-btn"
                onClick={() => {
                  onClose();
                  navigateTo('products');
                }}
              >
                Browse Aisles
              </button>
            </div>
          ) : (
            /* ITEMIZED CART ITEMS VIEW */
            <div className="cart-drawer-items-list">
              {cart.map((c) => {
                const p = products.find((x) => x.id === c.productId);
                if (!p) return null;

                const itemSubtotal = p.price * c.quantity;

                return (
                  <div key={p.id} className="cart-drawer-item">
                    {/* Item Thumbnail */}
                    <div className="cart-item-thumb">
                      {p.image ? (
                        <img src={p.image} alt={p.name} />
                      ) : (
                        <span>{p.emoji}</span>
                      )}
                    </div>

                    {/* Item Info & Qty */}
                    <div className="cart-item-info">
                      <div className="cart-item-title">{p.name}</div>
                      <div className="cart-item-price-row">
                        <span className="cart-item-price">₹{p.price.toLocaleString('en-IN')}</span>
                        {p.originalPrice && (
                          <span className="cart-item-orig-price">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>

                      {/* Mint Quantity Picker */}
                      <div className="qty-picker-mint">
                        <button onClick={() => updateCartQty(p.id, -1)}>−</button>
                        <span className="qty-val">{c.quantity}</span>
                        <button
                          onClick={() => updateCartQty(p.id, 1)}
                          disabled={c.quantity >= p.stock}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal & Trash */}
                    <div className="cart-item-right">
                      <div className="cart-item-subtotal">₹{itemSubtotal.toLocaleString('en-IN')}</div>
                      <button
                        className="cart-trash-btn"
                        onClick={() => removeFromCart(p.id)}
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer (Only Non-Empty) */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Promo / Coupon Box */}
            <form onSubmit={handleApplyCoupon} className="drawer-promo-box">
              {promoApplied ? (
                <div className="promo-applied-badge">
                  <span>🎉 <strong>DESI10</strong> Applied (10% OFF)</span>
                  <button
                    type="button"
                    className="promo-remove-btn"
                    onClick={() => {
                      removePromo();
                      setPromoInput('');
                    }}
                    title="Remove coupon discount"
                  >
                    ✕ Remove
                  </button>
                </div>
              ) : (
                <div className="drawer-promo-row">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. DESI10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="drawer-promo-input"
                  />
                  <button type="submit" className="drawer-promo-btn">
                    Apply
                  </button>
                </div>
              )}
            </form>

            <div className="cart-summary-line">
              <span>Items Subtotal</span>
              <span className="val">₹{totals.subtotal.toLocaleString('en-IN')}</span>
            </div>

            {totals.couponDiscount > 0 && (
              <div className="cart-summary-line green-text">
                <span>Coupon Discount (DESI10)</span>
                <span className="val">−₹{totals.couponDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}

            {totals.mrpSavings > 0 && (
              <div className="cart-summary-line green-text" style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                <span>MRP Product Savings</span>
                <span className="val">−₹{totals.mrpSavings.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="cart-summary-line">
              <span>Delivery Fee</span>
              <span className="val green-text">
                {totals.delivery === 0 ? 'FREE' : `₹${totals.delivery}`}
              </span>
            </div>

            <div className="cart-total-to-pay-row">
              <span className="to-pay-lbl">To Pay</span>
              <span className="to-pay-val">₹{totals.total.toLocaleString('en-IN')}</span>
            </div>

            {/* Split CTA Checkout Button */}
            <button className="checkout-split-btn" onClick={handleCheckoutClick}>
              <span>Proceed to Checkout</span>
              <span>₹{totals.total.toLocaleString('en-IN')} →</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
