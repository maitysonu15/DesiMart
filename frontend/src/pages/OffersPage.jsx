import { useCart } from '../context/CartContext';
import ProductCard from '../components/common/ProductCard';

export default function OffersPage({ onViewDetails }) {
  const { products, applyPromo, removePromo, promoApplied } = useCart();
  const offerItems = products.filter((p) => p.isOffer || p.price <= 500);

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '60px' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #DCFCE7, #FFF3D6)',
          border: '1px solid #CFE6D6',
          borderRadius: 'var(--radius-lg)',
          padding: '30px',
          marginBottom: '32px'
        }}
      >
        <span className="hero-eyebrow">🔥 Festive Savings Corridor</span>
        <h1 style={{ marginTop: '8px', marginBottom: '8px' }}>Budget Deals Under ₹500</h1>
        <p style={{ color: 'var(--ink-dim)', maxWidth: '560px' }}>
          Discover exceptional festive values across daily essentials, spices, stationery, accessories, and beauty items.
        </p>
        <div style={{ marginTop: '16px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => (promoApplied ? removePromo() : applyPromo('DESI10'))}
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              background: promoApplied ? '#15803D' : '#FFFFFF',
              color: promoApplied ? '#FFFFFF' : '#15803D',
              padding: '8px 18px',
              borderRadius: '999px',
              border: '1.5px solid #16A34A',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              transition: 'all 0.15s ease'
            }}
          >
            {promoApplied ? '✓ Code DESI10 Applied (Click to Remove)' : 'Use Code: DESI10'}
          </button>
          <span style={{ fontSize: '0.9rem', color: '#166534', fontWeight: 700 }}>
            {promoApplied ? '🎉 10% Discount Active! Click button to remove.' : '👈 Click to apply Extra 10% OFF at Checkout!'}
          </span>
        </div>
      </div>

      <div className="section-head">
        <div>
          <h2>Exclusive Deal Listings ({offerItems.length})</h2>
          <p>Hand-curated festive bargains for smart shoppers.</p>
        </div>
      </div>

      <div className="product-grid">
        {offerItems.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
}
