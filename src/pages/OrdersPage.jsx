import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';

export default function OrdersPage({ navigateTo }) {
  const { currentUser } = useAuth();
  const { getUserOrders } = useOrders();

  if (!currentUser) {
    return (
      <div className="container" style={{ paddingTop: '50px', paddingBottom: '70px' }}>
        <div className="empty-state">
          <h3>Please Login</h3>
          <p>Login to view your order history and live delivery tracking.</p>
          <button className="btn btn-primary" onClick={() => navigateTo('login')}>
            Login to Your Account
          </button>
        </div>
      </div>
    );
  }

  const userOrders = getUserOrders(currentUser.email);

  if (userOrders.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '50px', paddingBottom: '70px' }}>
        <div className="empty-state">
          <div className="emoji">📦</div>
          <h3>No Orders Placed Yet</h3>
          <p>Your completed purchases and order status will appear here.</p>
          <button className="btn btn-primary" onClick={() => navigateTo('products')}>
            Start Shopping
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
                justify: 'space-between',
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
