'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Hydrate cart from localStorage on first mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('talukdar-cart');
      if (stored) setCartItems(JSON.parse(stored));
    } catch {
      setCartItems([]);
    }
  }, []);

  // Persist cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem('talukdar-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart(product) {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      toast('Already in cart', { icon: '🛒' });
      return;
    }
    toast.success(`${product.name} added to cart!`);
    setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
  }

  function removeFromCart(id) {
    const item = cartItems.find((i) => i.id === id);
    if (item) toast.error(`${item.name} removed from cart`);
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }

  function clearCart() {
    setCartItems([]);
    toast('Cart cleared', { icon: '🗑️' });
  }

  function toggleCart() {
    setIsCartOpen((prev) => !prev);
  }

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  return (
    <AppContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        isCartOpen,
        toggleCart,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: '#050a30',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '8px',
            padding: '12px 16px',
          },
          success: {
            iconTheme: { primary: '#785d32', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#e05252', secondary: '#fff' },
          },
        }}
      />
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}
