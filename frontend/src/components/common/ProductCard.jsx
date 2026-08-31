import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product, onViewDetails }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [imgError, setImgError] = useState(false);

  const inStock = product.stock > 0;
  const isLowStock = inStock && product.stock <= 15;
  const isFav = isInWishlist(product.id);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id, product.name);
  };

  return (
    <div className="product-card-v2">
      {/* Top Image Container Header */}
      <div className="card-thumb-header" onClick={() => onViewDetails(product.id)} style={{ cursor: 'pointer' }}>
        {product.badgeText && (
          <span className="card-badge-top">{product.badgeText}</span>
        )}

        {product.discountPercent > 0 && (
          <span className="card-badge-discount">-{product.discountPercent}%</span>
        )}

        {/* Heart Wishlist Button */}
        <button
          className={`card-heart-btn ${isFav ? 'active' : ''}`}
          onClick={handleHeartClick}
          title={isFav ? 'Remove from Wishlist' : 'Save to Wishlist'}
          aria-label="Wishlist toggle"
        >
          {isFav ? '❤️' : '🤍'}
        </button>

        {product.image && !imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="card-real-img"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <span className="card-icon-art">{product.emoji}</span>
        )}
      </div>

      {/* Card Content Body */}
      <div className="card-body-content">
        {/* Rating & Stock Status */}
        <div className="card-rating-row">
          <span className="card-rating-val">
            ★ {product.rating.toFixed(1)} <span className="card-rating-count">({product.reviews})</span>
          </span>

          <span className={`card-stock-label ${inStock ? (isLowStock ? 'low-stock' : 'in-stock') : ''}`}>
            {inStock ? (isLowStock ? `Only ${product.stock} left` : 'In Stock') : 'Out of Stock'}
          </span>
        </div>

        {/* Title */}
        <div
          className="card-product-title"
          onClick={() => onViewDetails(product.id)}
          style={{ cursor: 'pointer' }}
        >
          {product.name}
        </div>

        {/* Short Description */}
        <div className="card-product-desc">{product.description}</div>

        {/* Price Row */}
        <div className="card-price-row">
          <span className="card-main-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="card-original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>

        {/* Add to Cart Outline Button */}
        <button
          className="card-add-btn"
          disabled={!inStock}
          onClick={() => addToCart(product.id, 1)}
        >
          + Add to Cart
        </button>
      </div>
    </div>
  );
}
