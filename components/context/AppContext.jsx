"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useGetData } from "../helpers/useGetData";
import { usePostData } from "../helpers/usePostData";
import { useDeleteDataWithToken } from "../helpers/useDeleteData";
import { usePostDataWithToken } from "../helpers/usePostDataWithToken";
import { useGetDataWithToken } from "../helpers/useGetDataWithToken";
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

  function logout() {
    setAuthToken(null);
    setAuthEmail("");
    try {
      localStorage.removeItem("talukdar-auth-token");
      localStorage.removeItem("talukdar-auth-email");
      localStorage.removeItem("talukdar-user-details");
    } catch {}
    toast("Logged out", { icon: "👋" });
  }

  const isAuthenticated = Boolean(authToken);

  // Cart API: guest
  const postCartGuest = usePostData("add-to-cart-guest");
  const postCartAuth = usePostDataWithToken("add-to-cart");
  const postMergeGuestCart = usePostDataWithToken("add-to-cart-from-guest");
  const deleteItem = useDeleteDataWithToken();
  const guestCartQueryKey = [`guest-cart?guest_token=${guestToken}`];
  const authCartQueryKey = ["cart", authToken];

  const addToCartDBGuest = async (
    productVariantId,
    quantity = 1,
    type = "increment",
  ) => {
    if (!productVariantId) {
      toast.error("This product is currently unavailable.");
      return false;
    }

    if (isAuthenticated && authToken) {
      const formData = new FormData();
      formData.append("product_variant_id", String(productVariantId));
      formData.append("quantity", String(quantity));
      if (type === "decrement") {
        formData.append("type", "decrement");
      }

      try {
        await toast.promise(postCartAuth.mutateAsync({ formData, token: authToken }), {
          loading: "Updating cart...",
          success: "Cart Updated!",
          error: (err) => err.message || "Failed to add product to cart",
        });

        await queryClient.invalidateQueries({ queryKey: authCartQueryKey });
        return true;
      } catch {
        return false;
      }
    }

    if (!guestToken) {
      toast.error("Cart session not ready yet. Please try again.");
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

    if (!cartId) return false;

    const endpoint = isAuthenticated && authToken
      ? `cart/${cartId}`
      : `guest-cart/${cartId}`;
    const mutationPayload = isAuthenticated && authToken
      ? { endpoint, token: authToken }
      : { endpoint, guestToken };

    try {
      if (silent) {
        await deleteItem.mutateAsync(mutationPayload);
      } else {
        await toast.promise(
          deleteItem.mutateAsync(mutationPayload),
          {
            loading: "Removing item from cart...",
            success: "Item removed from cart!",
            error: (err) => err.message || "Failed to remove item",
          },
        );
      }

      if (isAuthenticated && authToken) {
        await queryClient.invalidateQueries({ queryKey: authCartQueryKey });
      } else {
        await queryClient.invalidateQueries({ queryKey: guestCartQueryKey });
      }
      return true;
    } catch {
      return false;
    }
  };
  
  const { data: cartDataGuest, isLoading: isGuestCartLoading } = useGetData(
    `guest-cart?guest_token=${guestToken}`,
    {},
    { enabled: !!guestToken && !isAuthenticated },
  );
  const { data: cartDataAuth, isLoading: isAuthCartLoading } = useGetDataWithToken(
    "cart",
    authToken,
    isAuthenticated,
  );

  const activeCartData = isAuthenticated ? cartDataAuth : cartDataGuest;
  const cartDBGuest = Array.isArray(activeCartData?.data)
    ? activeCartData.data
    : [];

  const totalDBGuest = Number(activeCartData?.meta?.sub_total || 0);
  const cartDBCountGuest = cartDBGuest.length;
  const cartReady = isAuthenticated
    ? !isAuthCartLoading
    : Boolean(guestToken) && !isGuestCartLoading;

  const mergeGuestCartToMain = async (tokenOverride) => {
    const activeToken = tokenOverride || authToken;
    if (!activeToken || !guestToken) return true;

    const formData = new FormData();
    formData.append("guest_token", guestToken);

    try {
      await postMergeGuestCart.mutateAsync({ formData, token: activeToken });
      await queryClient.invalidateQueries({ queryKey: ["cart", activeToken] });
      await queryClient.invalidateQueries({ queryKey: guestCartQueryKey });
      return true;
    } catch {
      return false;
    }
  };

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

  //Wishlist API: auth
  const { data: wishlistData, isLoading: isWishlistLoading } = useGetDataWithToken("wishlist", authToken, isAuthenticated);
  const postWishlist = usePostDataWithToken("wishlist");

  const addToWishlist = async (product_variant_id) => {
    if (!isAuthenticated) {
      toast.error("Please login to manage wishlist");
      return;
    }
    const formData = new FormData();
    formData.append("product_variant_id", product_variant_id);

    try {
      const res = await postWishlist.mutateAsync({ formData, token: authToken });
      if (res?.status === "success") {
        toast.success(res?.message || "Added to wishlist!");
        queryClient.invalidateQueries(["wishlist", authToken]);
      }
    } catch (e) {
      toast.error(e.message || "Failed to add to wishlist");
    }
  };

  const removeFromWishlist = async (wishlist_id) => {
    if (!isAuthenticated) {
      toast.error("Please login to manage wishlist");
      return;
    }
    try {
      const res = await deleteItem.mutateAsync({ endpoint: `wishlist/${wishlist_id}`, token: authToken });
      if (res?.status === "success") {
        toast.success(res?.message || "Removed from wishlist!");
        queryClient.invalidateQueries(["wishlist", authToken]);
      }
    } catch (e) {
      toast.error(e.message || "Failed to remove from wishlist");
    }
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
        setAuthToken,
        setAuthEmail,
        wishlistItems: wishlistData?.data || [],
        isWishlistLoading,
        addToWishlist,
        removeFromWishlist,
        logout,
        addToCartDBGuest,
        mergeGuestCartToMain,
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
