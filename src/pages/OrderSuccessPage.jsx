import React from 'react';
import { useOrders } from '../context/OrderContext';

export default function OrderSuccessPage({ navigateTo }) {
  const { lastOrder } = useOrders();

  const customerName = lastOrder?.customer?.fullName || lastOrder?.customer?.name || 'Valued Customer';
  const street = lastOrder?.customer?.streetAddress || '';
  const city = lastOrder?.customer?.city || '';
  const pincode = lastOrder?.customer?.pincode || lastOrder?.customer?.pin || '';
  const fullAddress = [street, city, pincode].filter(Boolean).join(', ');

  return (
    <div className="container" style={{ paddingTop: '50px', paddingBottom: '80px' }}>
      <div className="order-success-card">
        <div className="success-icon-badge">🎉</div>

        <h1 className="success-card-title">Order Placed Successfully!</h1>
        <p className="success-card-sub">
          Thank you for shopping with DesiMart! Your order has been confirmed and is being prepared for fast express delivery.
        </p>

        {lastOrder ? (
          <div className="order-receipt-box">
            <div className="receipt-row">
              <span className="receipt-lbl">Order Reference ID:</span>
              <span className="receipt-val green">{lastOrder.id}</span>
            </div>

            <div className="receipt-row">
              <span className="receipt-lbl">Total Amount Paid:</span>
              <span className="receipt-val">₹{lastOrder.total.toLocaleString('en-IN')}</span>
            </div>

            <div className="receipt-row">
              <span className="receipt-lbl">Payment Method:</span>
              <span className="receipt-val uppercase">{lastOrder.customer?.paymentMethod || 'COD'}</span>
            </div>

            <div className="receipt-address-box">
              <span className="receipt-lbl">📍 Delivery Address:</span>
              <div className="receipt-address-text">
                <strong>{customerName}</strong>
                <div>{fullAddress || 'Standard Delivery Address'}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="order-receipt-box">
            <div className="receipt-row">
              <span className="receipt-lbl">Order Status:</span>
              <span className="receipt-val green">Confirmed & Processing</span>
            </div>
          </div>
        )}

        <div className="success-actions-row">
          <button className="hero-btn-primary" onClick={() => navigateTo('orders')}>
            View My Orders
          </button>
          <button
            className="hero-btn-secondary"
            style={{ color: '#15803D', borderColor: '#16A34A' }}
            onClick={() => navigateTo('products')}
          >
            Continue Shopping →
          </button>
        </div>
      </div>
    </div>
  );
}
