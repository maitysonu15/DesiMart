import React from 'react';

export default function TrustSection() {
  const trustItems = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
      title: "Express Delivery",
      subtitle: "Same-day in metros, free over ₹499"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: "100% Authentic Quality",
      subtitle: "Direct from verified farmers & brands"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      title: "Secure Checkout",
      subtitle: "UPI, Cards & Cash on Delivery"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
      ),
      title: "Easy 7-Day Returns",
      subtitle: "No questions asked doorstep pickup"
    }
  ];

  return (
    <section className="trust-section">
      <div className="container trust-inner-grid">
        {trustItems.map((item, idx) => (
          <div key={idx} className="trust-card">
            <div className="trust-icon-box">{item.icon}</div>
            <div className="trust-text">
              <h3 className="trust-title">{item.title}</h3>
              <p className="trust-desc">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
