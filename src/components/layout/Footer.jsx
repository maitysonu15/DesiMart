import React from 'react';

export default function Footer({ navigateTo, onCategoryClick, onInfoPageClick }) {
  return (
    <>
      {/* Trust Strip */}
      <section className="block" style={{ background: 'var(--paper)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-head" style={{ marginBottom: '20px' }}>
            <h2>Why Choose DesiMart?</h2>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="emoji">✅</div>
              <h3>100% Quality Products</h3>
              <p>Every product is handpicked and quality checked for genuine standards.</p>
            </div>
            <div className="why-card">
              <div className="emoji">💰</div>
              <h3>Affordable Pricing</h3>
              <p>Fair everyday prices across festive picks and daily essential grocery.</p>
            </div>
            <div className="why-card">
              <div className="emoji">🚚</div>
              <h3>Express Dispatch</h3>
              <p>Quick dispatch with live order tracking straight to your doorstep.</p>
            </div>
            <div className="why-card">
              <div className="emoji">🔒</div>
              <h3>Secure Checkout</h3>
              <p>Protected transactions with encrypted payment processing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
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
                <button onClick={() => onCategoryClick('Grocery')}>Grocery & Staples</button>
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
