import React from 'react';
import { useOrders } from '../context/OrderContext';

export default function OrderSuccessPage({ navigateTo }) {
  const { lastOrder } = useOrders();

  return (
    <div className="container">
      <div className="success-wrap">
        <div className="success-check">✓</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for shopping with DesiMart. Your order has been registered.</p>

        {lastOrder ? (
          <>
            <div className="success-order-id">
              <span className="lbl">Order Reference ID</span>
              <span className="val">{lastOrder.id}</span>
            </div>

            <div className="success-order-id">
              <span className="lbl">Total Amount Paid</span>
              <span className="val">₹{lastOrder.total.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ fontSize: '0.86rem', color: 'var(--ink-dim)', marginBottom: '20px' }}>
              Delivering to <strong>{lastOrder.customer.name}</strong> at {lastOrder.customer.city}, {lastOrder.customer.state} ({lastOrder.customer.pin})
            </div>
          </>
        ) : (
          <div className="success-order-id">
            <span className="lbl">Order Status</span>
            <span className="val">Confirmed</span>
          </div>
        )}

        <div className="success-actions">
          <button className="btn btn-primary" onClick={() => navigateTo('home')}>
            Continue Shopping
          </button>
          <button className="btn btn-outline" onClick={() => navigateTo('orders')}>
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
}
