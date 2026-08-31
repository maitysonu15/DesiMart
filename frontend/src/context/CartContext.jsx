import { createContext, useContext, useState } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';
import { useToast } from './ToastContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { showToast } = useToast();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [promoApplied, setPromoApplied] = useState(false);

  const addToCart = (productId, qty = 1, silent = false) => {
    const product = products.find((p) => p.id === productId);
    if (!product || product.stock <= 0) {
      showToast('Sorry, this product is out of stock.', 'error');
      return false;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      const currentQty = existing ? existing.quantity : 0;
      const newQty = Math.min(product.stock, currentQty + qty);

      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: newQty } : item
        );
      } else {
        return [...prev, { productId, quantity: newQty }];
      }
    });

    if (!silent) {
      showToast(`Added "${product.name}" to cart.`, 'success');
    }
    return true;
  };

  const updateCartQty = (productId, delta) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCart((prev) =>
      prev.map((item) => {
        if (item.productId === productId) {
          const newQty = Math.min(product.stock, Math.max(1, item.quantity + delta));
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    showToast('Item removed from cart.', '');
  };

  const clearCart = () => {
    setCart([]);
    setPromoApplied(false);
  };

  const applyPromo = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'DESI10') {
      setPromoApplied(true);
      showToast('Discount approved! 10% OFF applied.', 'success');
      return true;
    } else {
      showToast('Invalid promo code. Try DESI10.', 'error');
      return false;
    }
  };

  const removePromo = () => {
    setPromoApplied(false);
    showToast('Discount removed.', '');
  };

  const getCartTotals = () => {
    let subtotal = 0;
    let mrpTotal = 0;

    cart.forEach((c) => {
      const p = products.find((x) => x.id === c.productId);
      if (p) {
        subtotal += p.price * c.quantity;
        mrpTotal += (p.originalPrice || p.price) * c.quantity;
      }
    });

    const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 49;
    const couponDiscount = promoApplied ? Math.round(subtotal * 0.10) : 0;
    const mrpSavings = Math.max(0, mrpTotal - subtotal);
    const total = Math.max(0, subtotal + delivery - couponDiscount);

    return { subtotal, delivery, couponDiscount, mrpSavings, total };
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const updateStockOnOrder = (orderedItems) => {
    setProducts((prev) =>
      prev.map((p) => {
        const item = orderedItems.find((o) => o.productId === p.id);
        if (item) {
          return { ...p, stock: Math.max(0, p.stock - item.quantity) };
        }
        return p;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        cartCount,
        promoApplied,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        applyPromo,
        removePromo,
        getCartTotals,
        updateStockOnOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
