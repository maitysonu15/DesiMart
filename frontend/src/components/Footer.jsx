import React from 'react';
import Logo from './Logo';
import { CATEGORIES } from '../data/catalog';

export default function Footer({ onSelectCategory, onSelectOffers }) {
  const footerCategories = CATEGORIES.slice(0, 7);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Brand description */}
        <div className="footer-brand-pane">
          <Logo size={42} />
          <p className="footer-about-text">
            Desimart brings farm-fresh fruits, crisp vegetables, authentic Indian pantry staples, electronics, fashion and household essentials right to your doorstep with love and speed.
          </p>
          <div className="footer-badges-strip">
            <span className="pill">🌾 Farm Direct</span>
            <span className="pill">⚡ 10-Minute Express Hubs</span>
            <span className="pill">🇮🇳 Made with Pride in India</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-list">
            <li>
              <button type="button" onClick={() => onSelectCategory(null)}>
                Home &amp; All Aisles
              </button>
            </li>
            <li>
              <button type="button" onClick={onSelectOffers}>
                Today's Best Deals (&lt; ₹500)
              </button>
            </li>
            <li><a href="#products-section">Catalog Directory</a></li>
            <li><a href="#about">About Desimart</a></li>
            <li><a href="#careers">Careers at Desimart</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Popular Aisles</h4>
          <ul className="footer-list">
            {footerCategories.map((cat) => (
              <li key={cat.id}>
                <button type="button" onClick={() => onSelectCategory(cat.slug)}>
                  {cat.icon} {cat.name}
                </button>
              </li>
            ))}
            <li>
              <button type="button" className="footer-all-cats" onClick={() => onSelectCategory(null)}>
                All Aisles →
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="footer-links-col">
          <h4 className="footer-heading">Customer Help</h4>
          <ul className="footer-list">
            <li><a href="#help">Help Centre &amp; FAQs</a></li>
            <li><a href="#shipping">Shipping &amp; Delivery Policies</a></li>
            <li><a href="#returns">7-Day Easy Returns</a></li>
            <li><a href="#privacy">Privacy &amp; Security Terms</a></li>
            <li><a href="#contact">Contact Support: 1800-DESI-MART</a></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom-bar">
        <p className="copyright-text">
          © {new Date().getFullYear()} Desimart Online Supermarket Private Limited. All rights reserved.
        </p>
        <p className="demo-notice-text">
          UPI · Net Banking · Cards · Cash on Delivery — Fast, friendly Indian grocery delivery.
        </p>
      </div>
    </footer>
  );
}
