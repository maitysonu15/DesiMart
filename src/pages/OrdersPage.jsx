import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';

export default function OrdersPage({ navigateTo }) {
  const { currentUser } = useAuth();
  const { getUserOrders } = useOrders();

  if (!currentUser) {
    return (
      <div className="container" style={{ paddingTop: '50px', paddingBottom: '70px' }}>
        <div className="empty-state-card">
          <div className="empty-state-icon">👤</div>
          <h2 className="empty-state-title">Please Sign In</h2>
          <p className="empty-state-sub">Sign In or Create an Account to view your order history and live delivery tracking.</p>
          <button className="hero-btn-primary" onClick={() => navigateTo('login')}>
            Sign In to Your Account →
          </button>
        </div>
      </div>
    );
  }

  const userOrders = getUserOrders(currentUser.email);

  if (userOrders.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '50px', paddingBottom: '70px' }}>
        <div className="empty-state-card">
          <div className="empty-state-icon">📦</div>
          <h2 className="empty-state-title">No Orders Placed Yet</h2>
          <p className="empty-state-sub">Your completed purchases and live order tracking will appear here. Start exploring our aisles!</p>
          <button className="hero-btn-primary" onClick={() => navigateTo('products')}>
            Start Shopping →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '60px' }}>
      <div className="section-head">
        <div>
          <h2>My Order History ({userOrders.length})</h2>
          <p>Track your active shipments and view past invoices.</p>
        </div>
      </div>

      <div>
        {userOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-card-head">
              <div>
                <div className="order-id">{order.id}</div>
                <div className="order-date">Placed on {order.date}</div>
              </div>

              <span className={`order-status ${order.status}`}>
                {order.status}
              </span>
            </div>

            <div className="order-items-list">
              {order.items.map((item, idx) => (
                <span key={idx}>
                  {item.emoji} {item.name} × {item.quantity}
                  {idx < order.items.length - 1 ? ' | ' : ''}
                </span>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px dashed var(--border)',
                paddingTop: '12px',
                marginTop: '10px'
              }}
            >
              <div style={{ fontSize: '0.82rem', color: 'var(--ink-dim)' }}>
                Ship to: {order.customer.name}, {order.customer.city}
              </div>
              <div className="order-total">Total Paid: ₹{order.total.toLocaleString('en-IN')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
