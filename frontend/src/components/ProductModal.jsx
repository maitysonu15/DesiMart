import React from 'react';
import ProductArtwork from './ProductArtwork';

export default function ProductModal({
  product,
  onClose,
  cartItem,
  onAddToCart,
  onUpdateQty
}) {
  if (!product) return null;

  const inCartQty = cartItem ? cartItem.qty : 0;
  const discountPercent = product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="product-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="product-modal-grid">
          {/* Visual section */}
          <div className="modal-visual-pane">
            <ProductArtwork category={product.category} name={product.name} />
            <div className="modal-guarantee-badges">
              <span>🌱 100% Genuine</span>
              <span>⚡ Same Day Delivery</span>
              <span>🔄 7-Day Returns</span>
            </div>
          </div>

          {/* Details section */}
          <div className="modal-info-pane">
            <div className="modal-category-tag">
              {product.category.replace('-', ' ').toUpperCase()}
            </div>

            <h2 className="modal-product-title">{product.name}</h2>

            <div className="modal-rating-row">
              <span className="star-tag">★ {product.rating}</span>
              <span className="rating-text">{product.reviews} verified buyer ratings</span>
              <span className="stock-pill in-stock">● In Stock ({product.stock} units)</span>
            </div>

            <div className="modal-price-box">
              <span className="modal-price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.mrp > product.price && (
                <>
                  <span className="modal-mrp">₹{product.mrp.toLocaleString('en-IN')}</span>
                  <span className="modal-save-pill">Save {discountPercent}%</span>
                </>
              )}
            </div>

            <p className="modal-desc">{product.description}</p>

            <div className="modal-highlights">
              <h4>Why you'll love it:</h4>
              <ul>
                <li>✓ Direct from trusted farms and certified manufacturers</li>
                <li>✓ Temperature-controlled hygienic packaging</li>
                <li>✓ Zero chemical preservatives or artificial additives</li>
                <li>✓ Eligible for Free Express Delivery above ₹499</li>
              </ul>
            </div>

            <div className="modal-action-row">
              {inCartQty === 0 ? (
                <button 
                  type="button" 
                  className="btn btn-primary btn-lg full-width"
                  onClick={() => onAddToCart(product)}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M2 3h3l2.6 11.6a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 7H6" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="10" cy="20" r="1.6" />
                    <circle cx="18" cy="20" r="1.6" />
                  </svg>
                  <span>Add to Desimart Basket</span>
                </button>
              ) : (
                <div className="modal-qty-container">
                  <span className="qty-label">In Basket:</span>
                  <div className="qty-stepper large">
                    <button 
                      type="button" 
                      className="qty-btn"
                      onClick={() => onUpdateQty(product.id, inCartQty - 1)}
                    >
                      −
                    </button>
                    <span className="qty-value">{inCartQty}</span>
                    <button 
                      type="button" 
                      className="qty-btn"
                      onClick={() => onUpdateQty(product.id, inCartQty + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
