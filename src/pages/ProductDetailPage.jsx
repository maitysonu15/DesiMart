import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/common/ProductCard';

export default function ProductDetailPage({ productId, navigateTo, onViewDetails }) {
  const { products, addToCart } = useCart();
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [qty, setQty] = useState(1);
  const [imgError, setImgError] = useState(false);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
        <div className="empty-state">
          <h3>Product Not Found</h3>
          <p>The product you are looking for may have been updated or removed.</p>
          <button className="auth-submit-btn" style={{ maxWidth: '200px' }} onClick={() => navigateTo('products')}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const inStock = product.stock > 0;
  const isFav = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleQuantityChange = (delta) => {
    setQty((prev) => Math.min(product.stock, Math.max(1, prev + delta)));
  };

  const handleAddToCart = () => {
    addToCart(product.id, qty);
  };

  const handleBuyNow = () => {
    addToCart(product.id, qty);
    if (!currentUser) {
      showToast('Please Sign In or Create an Account to complete your purchase.', 'error');
      navigateTo('login');
    } else {
      navigateTo('checkout');
    }
  };

  return (
    <div className="container" style={{ paddingTop: '28px', paddingBottom: '60px' }}>
      {/* Back to Products Link matching mockup */}
      <button className="pdp-back-btn" onClick={() => navigateTo('products')}>
        ← Back to Products
      </button>

      {/* 2-Column Split Layout matching mockup (media_1787570599220.png) */}
      <div className="pdp-split-container">
        {/* Left Column: Soft Mint Image Container Card */}
        <div className="pdp-image-box" style={{ position: 'relative' }}>
          <button
            className={`card-heart-btn ${isFav ? 'active' : ''}`}
            onClick={() => toggleWishlist(product.id, product.name)}
            title={isFav ? 'Remove from Wishlist' : 'Save to Wishlist'}
            style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}
          >
            {isFav ? '❤️' : '🤍'}
          </button>

          {product.image && !imgError ? (
            <img
              src={product.image}
              alt={product.name}
              className="pdp-real-photo"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="pdp-emoji-art">{product.emoji}</span>
          )}
        </div>

        {/* Right Column: Product Information & CTAs */}
        <div className="pdp-info-content">
          <div className="pdp-category-tag">{product.category.toUpperCase()}</div>

          <h1 className="pdp-title">{product.name}</h1>

          <div className="pdp-price">
            ₹{product.price.toLocaleString('en-IN')}
            {product.originalPrice && (
              <span className="pdp-orig-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>

          <div className="pdp-rating">
            <span className="stars">★★★★☆</span>{' '}
            <span className="val">{product.rating.toFixed(1)}</span>{' '}
            <span className="reviews">({product.reviews} reviews)</span>
          </div>

          <p className="pdp-desc">{product.description}</p>

          <div className={`pdp-stock-status ${inStock ? 'in-stock' : 'out-of-stock'}`}>
            {inStock ? `${product.stock} units in stock` : 'Currently out of stock'}
          </div>

          {inStock ? (
            <>
              {/* Mint Quantity Control */}
              <div className="pdp-qty-wrap">
                <span className="qty-lbl">Quantity:</span>
                <div className="qty-picker-mint">
                  <button onClick={() => handleQuantityChange(-1)}>−</button>
                  <span className="qty-val">{qty}</span>
                  <button onClick={() => handleQuantityChange(1)}>+</button>
                </div>
              </div>

              {/* Action Buttons Row matching mockup */}
              <div className="pdp-actions-row">
                <button className="pdp-add-cart-btn" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button className="pdp-buy-now-btn" onClick={handleBuyNow}>
                  Buy Now
                </button>
                <button
                  className="pdp-wishlist-pill-btn"
                  onClick={() => toggleWishlist(product.id, product.name)}
                >
                  {isFav ? '❤️ Saved' : '🤍 Wishlist'}
                </button>
              </div>
            </>
          ) : (
            <button className="pdp-add-cart-btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
              Out of Stock
            </button>
          )}
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: '50px' }}>
          <div className="section-main-header">
            <div className="section-title-wrap">
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
