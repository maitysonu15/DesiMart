import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/common/ProductCard';

export default function ProductDetailPage({ productId, navigateTo, onViewDetails }) {
  const { products, addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
        <div className="empty-state">
          <h3>Product Not Found</h3>
          <p>The product you are looking for may have been updated or removed.</p>
          <button className="btn btn-primary" onClick={() => navigateTo('products')}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const inStock = product.stock > 0;
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleQuantityChange = (delta) => {
    setQty((prev) => Math.min(product.stock, Math.max(1, prev + delta)));
  };

  const handleBuyNow = () => {
    addToCart(product.id, qty, true);
    navigateTo('cart');
  };

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '60px' }}>
      <div className="breadcrumb">
        <button onClick={() => navigateTo('products')}>← Back to Products</button>
      </div>

      <div className="details-wrap">
        <div className="details-image">{product.emoji}</div>

        <div>
          <div className="details-cat">{product.category}</div>
          <h1 className="details-title">{product.name}</h1>
          <div className="details-price">₹{product.price.toLocaleString('en-IN')}</div>
          <div className="details-rating">
            ★★★★☆ {product.rating.toFixed(1)} <span className="count">({product.reviews} reviews)</span>
          </div>

          <p className="details-desc">{product.description}</p>

          <div className={`details-stock ${inStock ? 'ok' : 'low'}`}>
            {inStock ? `${product.stock} units left in stock` : 'Currently out of stock'}
          </div>

          {inStock ? (
            <>
              <div className="qty-row">
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Quantity:</span>
                <div className="qty-control">
                  <button onClick={() => handleQuantityChange(-1)}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => handleQuantityChange(1)}>+</button>
                </div>
              </div>

              <div className="details-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(product.id, qty)}
                >
                  Add to Cart
                </button>
                <button className="btn btn-accent" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>
            </>
          ) : (
            <button className="btn btn-ghost" disabled>
              Out of Stock
            </button>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="block" style={{ marginTop: '40px' }}>
          <div className="section-head">
            <div>
              <h2>Related in {product.category}</h2>
            </div>
          </div>

          <div className="product-grid">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
