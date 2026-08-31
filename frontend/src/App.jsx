import { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { WishlistProvider } from './context/WishlistContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Toast from './components/layout/Toast';
import CartDrawer from './components/layout/CartDrawer';
import ProfileModal from './components/layout/ProfileModal';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import OffersPage from './pages/OffersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrdersPage from './pages/OrdersPage';
import InfoPage from './pages/InfoPage';
import AuthPage from './pages/AuthPage';

import './index.css';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [activeProductId, setActiveProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [infoPageKey, setInfoPageKey] = useState('help');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileInitialTab, setProfileInitialTab] = useState('details');

  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (id) => {
    setActiveProductId(id);
    navigateTo('details');
  };

  const handleSelectCategory = (catName) => {
    setSelectedCategory(catName);
    navigateTo('products');
  };

  const handleInfoPageClick = (pageKey) => {
    setInfoPageKey(pageKey);
    navigateTo('info');
  };

  const handleHeaderSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory('all');
    navigateTo('products');
  };

  const handleOpenCartDrawer = () => {
    setIsCartDrawerOpen(true);
  };

  const handleCloseCartDrawer = () => {
    setIsCartDrawerOpen(false);
  };

  const handleOpenProfile = (tab = 'details') => {
    setProfileInitialTab(tab);
    setIsProfileModalOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <ToastProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <OrderProvider>
              <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Toast />

                {/* Cart Drawer */}
                <CartDrawer
                  isOpen={isCartDrawerOpen}
                  onClose={handleCloseCartDrawer}
                  navigateTo={navigateTo}
                />

                {/* User Profile & Wishlist Modal */}
                <ProfileModal
                  isOpen={isProfileModalOpen}
                  onClose={handleCloseProfile}
                  navigateTo={navigateTo}
                  initialTab={profileInitialTab}
                />

                <Header
                  currentView={currentView}
                  navigateTo={navigateTo}
                  onSearch={handleHeaderSearch}
                  onOpenCart={handleOpenCartDrawer}
                  onOpenProfile={handleOpenProfile}
                />

                <main style={{ flex: 1 }}>
                  {currentView === 'home' && (
                    <HomePage
                      navigateTo={navigateTo}
                      onViewDetails={handleViewDetails}
                      onSelectCategory={handleSelectCategory}
                      onOpenCart={handleOpenCartDrawer}
                      onOpenProfile={() => handleOpenProfile('details')}
                    />
                  )}

                  {currentView === 'products' && (
                    <ProductsPage
                      initialCategory={selectedCategory}
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                      onViewDetails={handleViewDetails}
                    />
                  )}

                  {currentView === 'offers' && (
                    <OffersPage
                      onViewDetails={handleViewDetails}
                      navigateTo={navigateTo}
                    />
                  )}

                  {currentView === 'details' && (
                    <ProductDetailPage
                      productId={activeProductId}
                      navigateTo={navigateTo}
                      onViewDetails={handleViewDetails}
                    />
                  )}

                  {currentView === 'cart' && (
                    <CartPage navigateTo={navigateTo} />
                  )}

                  {currentView === 'checkout' && (
                    <CheckoutPage navigateTo={navigateTo} />
                  )}

                  {currentView === 'success' && (
                    <OrderSuccessPage navigateTo={navigateTo} />
                  )}

                  {currentView === 'orders' && (
                    <OrdersPage navigateTo={navigateTo} />
                  )}

                  {currentView === 'info' && (
                    <InfoPage
                      pageKey={infoPageKey}
                      navigateTo={navigateTo}
                    />
                  )}

                  {currentView === 'login' && (
                    <AuthPage isRegister={false} navigateTo={navigateTo} />
                  )}

                  {currentView === 'register' && (
                    <AuthPage isRegister={true} navigateTo={navigateTo} />
                  )}
                </main>

                <Footer
                  navigateTo={navigateTo}
                  onCategoryClick={handleSelectCategory}
                  onInfoPageClick={handleInfoPageClick}
                />
              </div>
            </OrderProvider>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
