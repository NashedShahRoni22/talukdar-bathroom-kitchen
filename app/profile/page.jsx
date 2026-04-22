"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import PrivateRoute from "@/components/route/PrivateRoute";
import { useApp } from "@/components/context/AppContext";
import { useGetDataWithToken } from "@/components/helpers/useGetDataWithToken";
import OrderCard from "@/components/order/OrderCard";
import OrderCardSkeleton from "@/components/order/OrderCardSkeleton";

function getOrderList(response) {
  const source = response?.data ?? response;
  if (Array.isArray(source)) return source;
  if (Array.isArray(source?.orders)) return source.orders;
  if (Array.isArray(source?.data)) return source.data;
  if (source && typeof source === "object") return [source];
  return [];
}

export default function ProfilePage() {
  const { authEmail, authToken, authReady, logout } = useApp();

  const { data: ordersResponse, isLoading } = useGetDataWithToken(
    "orders",
    authToken,
    authReady && Boolean(authToken),
  );

  useEffect(() => {
    if (ordersResponse) {
      console.log("Orders response:", ordersResponse);
    }
  }, [ordersResponse]);

  const orders = useMemo(() => {
    return getOrderList(ordersResponse).map((order, index) => ({
      order_id: order.order_id || order.id || `ORD-${10000 + index}`,
      status: order.status || "Order Pending",
      ordered_at: order.ordered_at || order.created_at || order.date || null,
      order_details: Array.isArray(order.order_details)
        ? order.order_details
        : Array.isArray(order.items)
          ? order.items.map((item) => ({
              product_name: item.product_name || item.name || "Item",
              product_variant: item.product_variant || item.variant || null,
              quantity: Number(item.quantity || 1),
              price: Number(item.price || 0),
              is_combo: Boolean(item.is_combo),
            }))
          : [],
      amount_payable: Number(order.amount_payable ?? order.total ?? 0),
      shipping_cost: Number(order.shipping_cost ?? order.summary?.shippingCharge ?? 0),
      coupon_discount: order.coupon_discount ?? null,
      shipping_address: order.shipping_address || order.shippingAddress || null,
      billing_address: order.billing_address || order.billingAddress || null,
      additional_info: order.additional_info ?? null,
    }));
  }, [ordersResponse]);

  const skeletonOrders = useMemo(
    () => Array.from({ length: 3 }, (_, index) => index),
    [],
  );

  return (
    <PrivateRoute>
      <main className="min-h-screen pt-28 pb-14 bg-white dark:bg-[#060b20] transition-colors duration-300">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header section  */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] uppercase text-brand-gold">
                My Account
              </p>
              <h1
                className="mt-2 text-3xl sm:text-4xl font-semibold text-brand-navy dark:text-[#f0ebe3]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Profile & Orders
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-[#9fa8cc]">
                Signed in as{" "}
                <span className="font-semibold">
                  {authEmail || "user@example.com"}
                </span>
              </p>
            </div>

            <button
              onClick={logout}
              className="self-start md:self-auto px-4 py-2 rounded bg-brand-navy text-white text-sm font-semibold hover:bg-brand-gold transition-colors"
            >
              Logout
            </button>
          </motion.div>

          {/* Order history   */}
          <div className="mt-8 space-y-4">
            {isLoading ? (
              skeletonOrders.map((index) => (
                <OrderCardSkeleton key={`profile-skeleton-${index}`} index={index} />
              ))
            ) : orders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded border border-[#e8dfd1] dark:border-[#1c2444] bg-white dark:bg-[#0e1430] p-8 text-center"
              >
                <Package size={38} className="mx-auto text-brand-gold" />
                <h2 className="mt-4 text-lg font-bold text-brand-navy dark:text-[#f0ebe3]">No orders yet</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-[#9fa8cc]">
                  Your orders will appear here once the API returns data.
                </p>
              </motion.div>
            ) : (
              orders.map((order, index) => (
                <OrderCard key={order.order_id} order={order} index={index} />
              ))
            )}
          </div>
        </section>
      </main>
    </PrivateRoute>
  );
}
