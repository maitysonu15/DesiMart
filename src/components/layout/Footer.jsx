import React from 'react';

export default function Footer({ navigateTo, onCategoryClick, onInfoPageClick }) {
  return (
    <>
      {/* Sleek Horizontal 4-Column Trust Strip */}
      <section className="trust-strip-wrapper">
        <div className="container">
          <div className="trust-grid">
            {/* 1. Express Delivery */}
            <div className="trust-item-card">
              <div className="trust-icon-box">🚚</div>
              <div>
                <div className="trust-item-title">Express Delivery</div>
                <div className="trust-item-sub">Same-day in metros, free over ₹499</div>
              </div>
            </div>

            {/* 2. 100% Authentic Quality */}
            <div className="trust-item-card">
              <div className="trust-icon-box">🛡️</div>
              <div>
                <div className="trust-item-title">100% Authentic Quality</div>
                <div className="trust-item-sub">Direct from verified farmers & brands</div>
              </div>
            </div>

            {/* 3. Secure Checkout */}
            <div className="trust-item-card">
              <div className="trust-icon-box">🔒</div>
              <div>
                <div className="trust-item-title">Secure Checkout</div>
                <div className="trust-item-sub">UPI, Cards & Cash on Delivery</div>
              </div>
            </div>

            {/* 4. Easy 7-Day Returns */}
            <div className="trust-item-card">
              <div className="trust-icon-box">🔄</div>
              <div>
                <div className="trust-item-title">Easy 7-Day Returns</div>
                <div className="trust-item-sub">No questions asked doorstep pickup</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Site Footer */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <div className="brand-name" style={{ color: '#fff', fontSize: '1.4rem' }}>
              Desi<span style={{ color: 'var(--marigold)' }}>Mart</span>
            </div>
            <p className="footer-tagline">
              Your Desi Shopping Destination — Bringing quality products to every Indian home.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <button onClick={() => navigateTo('home')}>Home</button>
              </li>
              <li>
                <button onClick={() => navigateTo('products')}>All Products</button>
              </li>
              <li>
                <button onClick={() => navigateTo('offers')}>Festive Offers 🔥</button>
              </li>
              <li>
                <button onClick={() => navigateTo('cart')}>Shopping Cart</button>
              </li>
            </ul>
          </div>

          <div>
            <h4>Top Categories</h4>
            <ul>
              <li>
                <button onClick={() => onCategoryClick('Electronics')}>Electronics</button>
              </li>
              <li>
                <button onClick={() => onCategoryClick('Fashion')}>Fashion & Apparel</button>
              </li>
              <li>
                <button onClick={() => onCategoryClick('Home & Kitchen')}>Home & Kitchen</button>
              </li>
              <li>
                <button onClick={() => onCategoryClick('Grocery & Staples')}>Grocery & Staples</button>
              </li>
              <li>
                <button onClick={() => onCategoryClick('Beauty')}>Beauty & Wellness</button>
              </li>
            </ul>
          </div>

          <div>
            <h4>Customer Support</h4>
            <ul>
              <li>
                <button onClick={() => onInfoPageClick('help')}>Help & FAQ</button>
              </li>
              <li>
                <button onClick={() => onInfoPageClick('contact')}>Contact Us</button>
              </li>
              <li>
                <button onClick={() => onInfoPageClick('shipping-returns')}>Shipping & Returns</button>
              </li>
              <li>
                <button onClick={() => onInfoPageClick('privacy')}>Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => onInfoPageClick('credits')}>Photo Credits</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} DesiMart Retail Pvt Ltd. Built as a full-stack student project.</p>
        </div>
      </footer>
    </>
  );
}
