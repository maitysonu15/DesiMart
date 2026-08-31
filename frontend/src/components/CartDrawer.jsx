import React, { useEffect } from 'react';
import ProductArtwork from './ProductArtwork';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onProceedCheckout,
  onClearCart
}) {
  const FREE_DELIVERY_THRESHOLD = 499;
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalMrp = cartItems.reduce((acc, item) => acc + (item.mrp || item.price) * item.qty, 0);
  const totalSavings = totalMrp - subtotal;
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : 40;
  const finalTotal = subtotal + deliveryFee;

  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
  const amountNeededForFree = FREE_DELIVERY_THRESHOLD - subtotal;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-container">
      {/* Backdrop */}
      <div className="cart-backdrop" onClick={onClose} />

      {/* Slide Drawer */}
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping Cart">
        <div className="cart-header">
          <div className="cart-header-title">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M2 3h3l2.6 11.6a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 7H6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="20" r="1.6" />
              <circle cx="18" cy="20" r="1.6" />
            </svg>
            <h2>My Desimart Basket ({cartItems.reduce((a, b) => a + b.qty, 0)})</h2>
          </div>
          <button 
            type="button" 
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="delivery-progress-card">
          {subtotal >= FREE_DELIVERY_THRESHOLD ? (
            <p className="delivery-success-text">
              🎉 <strong>You get FREE Express Delivery!</strong>
            </p>
          ) : (
            <p className="delivery-needed-text">
              Add <strong>₹{amountNeededForFree}</strong> more to unlock <strong>FREE Delivery!</strong>
            </p>
          )}
          <div className="delivery-progress-track">
            <div 
              className="delivery-progress-fill" 
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <span className="cart-empty-icon">🛒</span>
              <h3>Your basket is empty</h3>
              <p>Looks like you haven't added any fresh goodies to your basket yet.</p>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={onClose}
              >
                Browse Aisles
              </button>
            </div>
          ) : (
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item-row">
                  <div className="cart-item-thumb">
                    <ProductArtwork category={item.category} name={item.name} />
                  </div>

                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <div className="cart-item-price-row">
                      <span className="item-unit-price">₹{item.price}</span>
                      {item.mrp > item.price && (
                        <span className="item-unit-mrp">₹{item.mrp}</span>
                      )}
                    </div>

                    <div className="cart-item-bottom">
                      <div className="qty-stepper small">
                        <button 
                          type="button" 
                          className="qty-btn"
                          onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        >
                          −
                        </button>
                        <span className="qty-value">{item.qty}</span>
                        <button 
                          type="button" 
                          className="qty-btn"
                          onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>

                      <span className="item-line-total">
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </span>

                      <button 
                        type="button" 
                        className="cart-item-del-btn"
                        onClick={() => onRemoveItem(item.id)}
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-bill-summary">
              <div className="bill-row">
                <span>Items Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {totalSavings > 0 && (
                <div className="bill-row savings">
                  <span>Total Discount Saved</span>
                  <span>-₹{totalSavings.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="bill-row">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? <strong className="green-text">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div className="bill-divider" />
              <div className="bill-row total">
                <strong>To Pay</strong>
                <strong className="grand-total">₹{finalTotal.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <button 
              type="button" 
              className="btn btn-primary btn-lg full-width btn-checkout"
              onClick={onProceedCheckout}
            >
              <span>Proceed to Checkout</span>
              <span>₹{finalTotal.toLocaleString('en-IN')} →</span>
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
