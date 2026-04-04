"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useGetData } from "../helpers/useGetData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authReady, setAuthReady] = useState(false);
  // get categories
  const { data:categoriesData } = useGetData("categories");
  const categories = categoriesData?.data;

  // Hydrate cart from localStorage on first mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("talukdar-cart");
      if (stored) setCartItems(JSON.parse(stored));
    } catch {
      setCartItems([]);
    }
  }, []);

  // Persist cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem("talukdar-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Hydrate theme preference on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("talukdar-theme");
      if (saved === "dark") {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      }
    } catch {}
  }, []);

  // Hydrate auth state on mount
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("talukdar-auth-token");
      const savedEmail = localStorage.getItem("talukdar-auth-email");
      if (savedToken) setAuthToken(savedToken);
      if (savedEmail) setAuthEmail(savedEmail);
    } catch {
      setAuthToken(null);
      setAuthEmail("");
    } finally {
      setAuthReady(true);
    }
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  function addToCart(product) {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      toast("Already in cart", { icon: "🛒" });
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
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  function clearCart() {
    setCartItems([]);
    toast("Cart cleared", { icon: "🗑️" });
  }

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("talukdar-theme", next ? "dark" : "light");
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

  function requestOtp(email) {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      toast.error("Please enter your email first");
      return false;
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = String(Date.now() + 5 * 60 * 1000);

    try {
      localStorage.setItem("talukdar-otp-email", normalizedEmail);
      localStorage.setItem("talukdar-otp-code", otp);
      localStorage.setItem("talukdar-otp-expiry", expiresAt);
      toast.success(`OTP sent. Demo code: ${otp}`);
      return true;
    } catch {
      toast.error("Unable to start OTP login right now");
      return false;
    }
  }

  function verifyOtp(email, otp) {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedOtp = otp.trim();

    try {
      const savedEmail = localStorage.getItem("talukdar-otp-email") || "";
      const savedOtp = localStorage.getItem("talukdar-otp-code") || "";
      const savedExpiry = Number(
        localStorage.getItem("talukdar-otp-expiry") || 0,
      );

      if (!savedEmail || !savedOtp || !savedExpiry) {
        toast.error("No OTP request found. Please request a new OTP.");
        return false;
      }

      if (Date.now() > savedExpiry) {
        toast.error("OTP expired. Please request a new OTP.");
        return false;
      }

      if (normalizedEmail !== savedEmail || normalizedOtp !== savedOtp) {
        toast.error("Invalid OTP or email. Please try again.");
        return false;
      }

      const token = `talukdar_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      setAuthToken(token);
      setAuthEmail(normalizedEmail);

      localStorage.setItem("talukdar-auth-token", token);
      localStorage.setItem("talukdar-auth-email", normalizedEmail);
      localStorage.removeItem("talukdar-otp-email");
      localStorage.removeItem("talukdar-otp-code");
      localStorage.removeItem("talukdar-otp-expiry");

      toast.success("Login successful");
      return true;
    } catch {
      toast.error("Unable to verify OTP right now");
      return false;
    }
  }

  function logout() {
    setAuthToken(null);
    setAuthEmail("");
    try {
      localStorage.removeItem("talukdar-auth-token");
      localStorage.removeItem("talukdar-auth-email");
    } catch {}
    toast("Logged out", { icon: "👋" });
  }

  const isAuthenticated = Boolean(authToken);

  return (
    <AppContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        isCartOpen,
        isDark,
        toggleCart,
        toggleTheme,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        authToken,
        authEmail,
        authReady,
        isAuthenticated,
        requestOtp,
        verifyOtp,
        logout,
      }}
    >
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#050a30",
            color: "#fff",
            fontSize: "14px",
            borderRadius: "8px",
            padding: "12px 16px",
          },
          success: {
            iconTheme: { primary: "#785d32", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#e05252", secondary: "#fff" },
          },
        }}
      />
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
