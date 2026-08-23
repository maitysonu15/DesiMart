import React from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/common/ProductCard';

export default function OffersPage({ onViewDetails, navigateTo }) {
  const { products } = useCart();
  const offerItems = products.filter((p) => p.isOffer || p.price <= 500);

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '60px' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, var(--green-tint), #FFF3D6)',
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
        <div style={{ marginTop: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              background: 'var(--paper)',
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border)'
            }}
          >
            Use Code: DESI10
          </span>
          <span style={{ fontSize: '0.88rem', color: 'var(--green-dark)', fontWeight: 600 }}>
            Extra 10% OFF at Checkout!
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
