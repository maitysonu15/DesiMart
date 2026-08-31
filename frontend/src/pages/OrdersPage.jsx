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

      <div style={{ marginTop: '20px' }}>
        {userOrders.map((order) => {
          const name = order.customer?.fullName || order.customer?.name || currentUser.name || 'Valued Customer';
          const street = order.customer?.streetAddress || '';
          const city = order.customer?.city || '';
          const pin = order.customer?.pincode || order.customer?.pin || '';
          const addressStr = [street, city, pin].filter(Boolean).join(', ');

          return (
            <div key={order.id} className="order-history-card">
              {/* Order Card Top Header Bar */}
              <div className="order-history-header">
                <div>
                  <div className="order-history-id">Order Ref: <strong>{order.id}</strong></div>
                  <div className="order-history-date">📅 Placed on {order.date}</div>
                </div>

                <div className="order-status-badge">
                  <span className="status-dot"></span>
                  <span>CONFIRMED & PROCESSING</span>
                </div>
              </div>

              {/* Order Items List Grid */}
              <div className="order-history-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item-pill">
                    <span className="item-emoji">{item.emoji || '🛍️'}</span>
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">× {item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Order Footer Row */}
              <div className="order-history-footer">
                <div className="order-shipping-text">
                  📍 <strong>Ship to:</strong> {name} {addressStr ? `(${addressStr})` : ''}
                </div>
                <div className="order-total-badge">
                  Total Paid: <strong>₹{order.total.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
