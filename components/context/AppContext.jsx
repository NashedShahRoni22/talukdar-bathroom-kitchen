"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useGetData } from "../helpers/useGetData";
import { usePostData } from "../helpers/usePostData";
import { useDeleteDataWithToken } from "../helpers/useDeleteData";
import { useQueryClient } from "@tanstack/react-query";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authReady, setAuthReady] = useState(false);
  const [guestToken, setGuestToken] = useState(null);
  const queryClient = useQueryClient();

  // Generate or retrieve guest token
  const generateGuestToken = () => {
    let storedGuestToken = localStorage.getItem("guest_token");
    if (!storedGuestToken) {
      storedGuestToken = crypto.randomUUID();
      localStorage.setItem("guest_token", storedGuestToken);
    }
    return storedGuestToken;
  };
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
      if (savedToken) setAuthToken(savedToken);
      const savedEmail = localStorage.getItem("talukdar-auth-email");
      if (savedEmail) setAuthEmail(savedEmail);
      const generatedGuestToken = generateGuestToken();
      setGuestToken(generatedGuestToken);
    } catch {
      setAuthToken(null);
      setAuthEmail("");
    } finally {
      setAuthReady(true);
    }
  }, []);

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

  // Cart API: guest
  const postCartGuest = usePostData("add-to-cart-guest");
  const deleteItem = useDeleteDataWithToken();
  const guestCartQueryKey = [`guest-cart?guest_token=${guestToken}`];

  const addToCartDBGuest = async (
    productVariantId,
    quantity = 1,
    type = "increment",
  ) => {
    if (!guestToken) {
      toast.error("Cart session not ready yet. Please try again.");
      return false;
    }

    if (!productVariantId) {
      toast.error("This product is currently unavailable.");
      return false;
    }

    const formData = new FormData();
    formData.append("guest_token", guestToken);
    formData.append("product_variant_id", String(productVariantId));
    formData.append("quantity", String(quantity));
    formData.append("type", type);

    try {
      await toast.promise(postCartGuest.mutateAsync(formData), {
        loading: "Updating cart...",
        success: "Cart Updated!",
        error: (err) => err.message || "Failed to add product to cart",
      });

      await queryClient.invalidateQueries({
        queryKey: guestCartQueryKey,
      });

      return true;
    } catch {
      return false;
    }
  };

  const removeFromCartDBGuest = async (cartId, options = {}) => {
    const { silent = false } = options;

    try {
      if (silent) {
        await deleteItem.mutateAsync({
          endpoint: `guest-cart/${cartId}`,
          guestToken,
        });
      } else {
        await toast.promise(
          deleteItem.mutateAsync({
            endpoint: `guest-cart/${cartId}`,
            guestToken,
          }),
          {
            loading: "Removing item from cart...",
            success: "Item removed from cart!",
            error: (err) => err.message || "Failed to remove item",
          },
        );
      }

      queryClient.invalidateQueries({
        queryKey: [`guest-cart?guest_token=${guestToken}`],
      });
      return true;
    } catch {
      return false;
    }
  };

  // get cart data Guest
  const { data: cartDataGuest, isLoading: isCartLoading } = useGetData(
    `guest-cart?guest_token=${guestToken}`,
    {},
    { enabled: !!guestToken },
  );
  const cartDBGuest = Array.isArray(cartDataGuest?.data)
    ? cartDataGuest.data
    : [];

  const totalDBGuest = Number(cartDataGuest?.meta?.sub_total || 0);
  const cartDBCountGuest = cartDBGuest.length;
  const cartReady = Boolean(guestToken) && !isCartLoading;

  const updateQuantityDBGuest = async (item, quantity) => {
    if (!item) return;

    const productVariantId = item.product_variant_id;
    const currentQuantity = Number(item.quantity);
    if (!productVariantId || !Number.isFinite(currentQuantity)) return;

    if (quantity < 1) {
      const cartId = item.cart_id;
      if (!cartId) return;
      await removeFromCartDBGuest(cartId);
      return;
    }

    const delta = quantity - currentQuantity;
    if (delta === 0) return;

    await addToCartDBGuest(
      productVariantId,
      Math.abs(delta),
      delta > 0 ? "increment" : "decrement",
    );
  };

  return (
    <AppContext.Provider
      value={{
        cartReady,
        isCartOpen,
        isDark,
        toggleCart,
        toggleTheme,
        openCart,
        closeCart,
        cartDBGuest,
        totalDBGuest,
        cartDBCountGuest,
        removeFromCartDBGuest,
        updateQuantityDBGuest,
        authToken,
        authEmail,
        authReady,
        isAuthenticated,
        requestOtp,
        verifyOtp,
        logout,
        addToCartDBGuest,
      }}
    >
      {children}
      <Toaster
        position="top-center"
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
