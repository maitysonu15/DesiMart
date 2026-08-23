import React, { useState, useEffect, useMemo } from 'react';
import { CATEGORIES, PRODUCTS } from './data/catalog';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryBar from './components/CategoryBar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrdersModal from './components/OrdersModal';
import AccountModal from './components/AccountModal';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';
import Toast from './components/Toast';
import './App.css';

export default function App() {
  // Filter & Search State
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOffersActive, setIsOffersActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // User State (null by default = not logged in)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('desimart_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Cart State (Persisted in localStorage, start clean)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('desimart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders State (Start completely EMPTY with 0 orders)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('desimart_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Filter out any older mock demo order
        const realOrders = Array.isArray(parsed) 
          ? parsed.filter(o => o.id !== 'DESI-849201') 
          : [];
        return realOrders;
      }
      return [];
    } catch {
      return [];
    }
  });

  // Toast Notification
  const [toast, setToast] = useState({ message: '', visible: false, type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, visible: true, type });
    setTimeout(() => {
      setToast({ message: '', visible: false, type: 'success' });
    }, 3200);
  };

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('desimart_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sync Orders to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('desimart_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Sync User to LocalStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('desimart_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('desimart_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // Auth Operations
  const handleLogin = (userData) => {
    setUser(userData);
    setIsAccountOpen(false);
    showToast(`👋 Welcome, ${userData.name}! You are now logged in.`, 'success');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAccountOpen(false);
    showToast('You have been logged out from Desimart.', 'info');
  };

  // Cart Operations
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`Added "${product.name}" to your basket!`);
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) => 
      prev.map((item) => item.id === productId ? { ...item, qty: newQty } : item)
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => {
      const removed = prev.find((i) => i.id === productId);
      if (removed) {
        showToast(`Removed "${removed.name}" from basket`, 'info');
      }
      return prev.filter((item) => item.id !== productId);
    });
  };

  const handlePlaceOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setIsOrdersOpen(true);
    showToast(`🎉 Order #${order.id} placed successfully!`, 'success');
  };

  // Category & Offers Handlers
  const handleSelectCategory = (catSlug) => {
    setSelectedCategory(catSlug);
    setIsOffersActive(false);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectOffers = () => {
    setIsOffersActive(true);
    setSelectedCategory(null);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Keep Shopping / Go to Home
  const handleKeepShopping = () => {
    setSelectedCategory(null);
    setIsOffersActive(false);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compute Product Counts per Category
  const productCounts = useMemo(() => {
    const counts = { all: PRODUCTS.length };
    CATEGORIES.forEach((c) => {
      counts[c.slug] = PRODUCTS.filter((p) => p.category === c.slug).length;
    });
    return counts;
  }, []);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory && p.category !== selectedCategory) return false;
      // Offers filter (under ₹500)
      if (isOffersActive && p.price > 500) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchTags = p.tags && p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchCat && !matchDesc && !matchTags) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.reviews || 0) - (a.reviews || 0);
    });
  }, [selectedCategory, isOffersActive, searchQuery, sortBy]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const currentCatObj = CATEGORIES.find((c) => c.slug === selectedCategory);

  return (
    <div className="app-container">
      {/* Toast Notification */}
      <Toast message={toast.message} visible={toast.visible} type={toast.type} />

      {/* Main Header */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onSelectOffers={handleSelectOffers}
        isOffersActive={isOffersActive}
        orderCount={orders.length}
        user={user}
      />

      {/* Hero Showcase */}
      {!searchQuery && !selectedCategory && !isOffersActive && (
        <Hero 
          onSelectCategory={handleSelectCategory}
          onSelectOffers={handleSelectOffers}
        />
      )}

      {/* Main Full-Width Content Layout */}
      <main className="container main-layout-full" id="products-section">
        {/* Horizontal Category Navigation Bar */}
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onSelectOffers={handleSelectOffers}
          isOffersActive={isOffersActive}
          productCounts={productCounts}
        />

        <section className="product-view-section">
          {/* List Header / Title / Sort Controls */}
          <div className="list-toolbar">
            <div className="list-title-box">
              <h2 className="section-title">
                {searchQuery ? (
                  <>Search results for <span className="highlight">"{searchQuery}"</span></>
                ) : isOffersActive ? (
                  <>🏷️ Today's Offers <span className="sub-badge">Under ₹500</span></>
                ) : currentCatObj ? (
                  <>{currentCatObj.icon} {currentCatObj.name}</>
                ) : (
                  <>🏬 All Aisles &amp; Daily Essentials</>
                )}
              </h2>
              <p className="item-count-text">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="sort-box">
              <label htmlFor="sort-select">Sort by:</label>
              <select 
                id="sort-select"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-dropdown"
              >
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips (if any) */}
          {(selectedCategory || isOffersActive || searchQuery) && (
            <div className="active-filters-bar">
              <span className="filters-label">Active Filters:</span>
              {selectedCategory && (
                <span className="filter-tag">
                  {currentCatObj?.icon} {currentCatObj?.name}
                  <button type="button" onClick={() => setSelectedCategory(null)}>✕</button>
                </span>
              )}
              {isOffersActive && (
                <span className="filter-tag">
                  🏷️ Under ₹500 Deals
                  <button type="button" onClick={() => setIsOffersActive(false)}>✕</button>
                </span>
              )}
              {searchQuery && (
                <span className="filter-tag">
                  🔍 "{searchQuery}"
                  <button type="button" onClick={() => setSearchQuery('')}>✕</button>
                </span>
              )}
              <button 
                type="button" 
                className="clear-all-filters-btn"
                onClick={() => {
                  setSelectedCategory(null);
                  setIsOffersActive(false);
                  setSearchQuery('');
                }}
              >
                Reset All
              </button>
            </div>
          )}

          {/* Full-width Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid full-width-grid">
              {filteredProducts.map((product) => {
                const cartItem = cartItems.find((i) => i.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    cartItem={cartItem}
                    onAddToCart={handleAddToCart}
                    onUpdateQty={handleUpdateQty}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="empty-results-box">
              <span className="empty-emoji">🔍</span>
              <h3>No matching products found</h3>
              <p>We couldn't find anything matching your search. Try checking spelling or explore other aisles.</p>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleKeepShopping}
              >
                View All Desimart Products
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Trust & Guarantee Section */}
      <TrustSection />

      {/* Footer */}
      <Footer 
        onSelectCategory={handleSelectCategory}
        onSelectOffers={handleSelectOffers}
      />

      {/* Quick View Product Modal */}
      {quickViewProduct && (
        <ProductModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          cartItem={cartItems.find((i) => i.id === quickViewProduct.id)}
          onAddToCart={handleAddToCart}
          onUpdateQty={handleUpdateQty}
        />
      )}

      {/* Account Modal (Sign In / Log In / Sign Up / Profile) */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onOpenOrders={() => {
          setIsAccountOpen(false);
          setIsOrdersOpen(true);
        }}
        orderCount={orders.length}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onClearCart={() => setCartItems([])}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onPlaceOrder={handlePlaceOrder}
        user={user}
      />

      {/* Orders History Modal */}
      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        onKeepShopping={handleKeepShopping}
      />
    </div>
  );
}
