import React from 'react';
import ProductArtwork from './ProductArtwork';

export default function OrdersModal({
  isOpen,
  onClose,
  orders = [],
  onKeepShopping
}) {
  if (!isOpen) return null;

  const handleKeepShoppingClick = () => {
    onClose();
    if (onKeepShopping) {
      onKeepShopping();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="orders-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="orders-header">
          <div className="orders-header-title">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <h2>My Desimart Orders {orders.length > 0 ? `(${orders.length})` : ''}</h2>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        <div className="orders-body">
          {orders.length === 0 ? (
            <div className="empty-orders-state">
              <div className="empty-order-icon-wrapper">
                <span className="empty-icon">📦</span>
              </div>
              <h3>No Orders Placed Yet</h3>
              <p>You haven't placed any orders yet. Explore our fresh grocery aisles, electronics, and daily essentials.</p>
              <button 
                type="button" 
                className="btn btn-primary btn-lg btn-keep-shopping"
                onClick={handleKeepShoppingClick}
              >
                <span>🛍️ Keep Shopping</span>
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-card-head">
                    <div>
                      <span className="order-id-badge">Order #{order.id}</span>
                      <span className="order-date-text">{order.date}</span>
                    </div>
                    <div className="order-status-badge">
                      <span className="status-dot">●</span>
                      <span>{order.status}</span>
                    </div>
                  </div>

                  <div className="order-items-preview">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item-chip">
                        <div className="order-chip-art">
                          <ProductArtwork category={item.category} name={item.name} />
                        </div>
                        <div className="order-chip-info">
                          <span className="order-chip-name">{item.name}</span>
                          <span className="order-chip-qty">Qty: {item.qty} × ₹{item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-card-foot">
                    <div className="order-shipping-summary">
                      <span>Delivering to: <strong>{order.shipping?.name || 'Customer'}</strong>, {order.shipping?.city} ({order.shipping?.pincode})</span>
                    </div>
                    <div className="order-total-summary">
                      <span>Total:</span>
                      <strong>₹{order.total.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
