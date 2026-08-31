import React from 'react';
import ProductArtwork from './ProductArtwork';

export default function ProductCard({
  product,
  cartItem,
  onAddToCart,
  onUpdateQty,
  onQuickView
}) {
  const discountPercent = product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0;

  const inCartQty = cartItem ? cartItem.qty : 0;

  return (
    <article className="product-card">
      {/* Visual Container */}
      <div 
        className="product-card-visual" 
        onClick={() => onQuickView(product)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${product.name}`}
      >
        <ProductArtwork category={product.category} name={product.name} />
        
        {/* Badges */}
        <div className="product-card-badges">
          {product.badge && (
            <span className="card-badge tag-highlight">{product.badge}</span>
          )}
          {discountPercent > 0 && (
            <span className="card-badge discount-tag">-{discountPercent}%</span>
          )}
        </div>

        {/* Quick View Hover Overlay */}
        <div className="quick-view-overlay">
          <span>Quick View 🔍</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="product-card-body">
        {/* Rating and Stock */}
        <div className="card-meta-row">
          <div className="card-rating">
            <span className="star-icon">★</span>
            <span className="rating-num">{product.rating}</span>
            <span className="review-count">({product.reviews})</span>
          </div>
          <span className={`stock-status ${product.stock <= 15 ? 'low' : ''}`}>
            {product.stock <= 15 ? `Only ${product.stock} left` : 'In Stock'}
          </span>
        </div>

        {/* Product Title */}
        <h3 
          className="product-title"
          onClick={() => onQuickView(product)}
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Snippet */}
        <p className="product-snippet">{product.description}</p>

        {/* Price Row */}
        <div className="product-price-row">
          <div className="price-group">
            <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
            {product.mrp > product.price && (
              <span className="original-mrp">₹{product.mrp.toLocaleString('en-IN')}</span>
            )}
          </div>
        </div>

        {/* Action Button: Add to Cart or Stepper */}
        <div className="product-card-action">
          {inCartQty === 0 ? (
            <button 
              type="button" 
              className="btn btn-add-cart"
              onClick={() => onAddToCart(product)}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>Add to Cart</span>
            </button>
          ) : (
            <div className="qty-stepper">
              <button 
                type="button" 
                className="qty-btn"
                onClick={() => onUpdateQty(product.id, inCartQty - 1)}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="qty-value">{inCartQty}</span>
              <button 
                type="button" 
                className="qty-btn"
                onClick={() => onUpdateQty(product.id, inCartQty + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
