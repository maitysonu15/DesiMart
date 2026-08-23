import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';
import { useCart } from './CartContext';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const { showToast } = useToast();
  const { products, updateStockOnOrder, clearCart } = useCart();
  const [orders, setOrders] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [orderCounter, setOrderCounter] = useState(10001);

  const placeOrder = ({ customer, cartItems, totals, userEmail }) => {
    // 1. Validate cart non-empty
    if (!cartItems || cartItems.length === 0) {
      showToast('Your cart is empty.', 'error');
      return null;
    }

    // 2. Validate stock for every item
    for (const c of cartItems) {
      const p = products.find((x) => x.id === c.productId);
      if (!p || p.stock < c.quantity) {
        showToast(`Sorry, "${p ? p.name : 'an item'}" does not have enough stock available.`, 'error');
        return null;
      }
    }

    // 3. Build unique Order ID
    const orderId = `DM-${orderCounter}`;
    setOrderCounter((prev) => prev + 1);

    const orderRecord = {
      id: orderId,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      customer,
      items: cartItems.map((c) => {
        const p = products.find((x) => x.id === c.productId);
        return {
          productId: p.id,
          name: p.name,
          price: p.price,
          quantity: c.quantity,
          emoji: p.emoji
        };
      }),
      subtotal: totals.subtotal,
      delivery: totals.delivery,
      discount: totals.discount,
      total: totals.total,
      status: 'Pending',
      userEmail
    };

    // 4. Record order & update stock
    setOrders((prev) => [orderRecord, ...prev]);
    setLastOrder(orderRecord);
    updateStockOnOrder(cartItems);
    clearCart();

    showToast('Order placed successfully!', 'success');
    return orderRecord;
  };

  const getUserOrders = (userEmail) => {
    if (!userEmail) return [];
    return orders.filter((o) => o.userEmail === userEmail);
  };

  return (
    <OrderContext.Provider value={{ orders, lastOrder, placeOrder, getUserOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
