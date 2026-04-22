"use client";

import { Suspense } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
} from "lucide-react";
import { useApp } from "../../components/context/AppContext";

const BASE_URL = process.env.NEXT_PUBLIC_TALUKDAR_API_BASE_URL;

export default function PaymentPage() {
  const { guestToken } = useApp();

  function PaymentPageContent() {
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const paymentIntent = searchParams.get("payment_intent");
    const redirectStatus = searchParams.get("redirect_status") || "";

    const [isVerifying, setIsVerifying] = useState(false);
    const [snapshot] = useState(() => {
      try {
        const stored = sessionStorage.getItem("talukdar-payment-snapshot");
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    });

    // Handle payment verification/cancellation
    useEffect(() => {
      const handlePaymentStatus = async () => {
        if (isVerifying) return;

        try {
          if (redirectStatus === "succeeded" && paymentIntent) {
            setIsVerifying(true);

            if (!BASE_URL) {
              console.error("Missing API base URL");
              return;
            }

            const normalizedUrl = BASE_URL.endsWith("/")
              ? BASE_URL
              : `${BASE_URL}/`;
            const verifyUrl = `${normalizedUrl}payment/verify`;

            const formData = new FormData();
            formData.append("payment_intent", paymentIntent);
            formData.append("guest_token", guestToken);

            const res = await fetch(verifyUrl, {
              method: "POST",
              body: formData,
            });

            if (!res.ok) {
              const errorData = await res.json().catch(() => ({}));
              throw new Error(
                errorData?.message || `Server error: ${res.status}`,
              );
            }

            // Payment verified successfully
            queryClient.refetchQueries({
              queryKey: [`guest-cart?guest_token=${guestToken}`],
            });
          } else if (["cancelled", "failed"].includes(redirectStatus)) {
            setIsVerifying(true);

            const orderId = sessionStorage.getItem("talukdar-order-id");
            if (!orderId) {
              console.warn("No order_id found in sessionStorage");
              return;
            }

            if (!BASE_URL) {
              console.error("Missing API base URL");
              return;
            }

            const normalizedUrl = BASE_URL.endsWith("/")
              ? BASE_URL
              : `${BASE_URL}/`;
            const cancelUrl = `${normalizedUrl}payment/cancel`;

            const formData = new FormData();
            formData.append("order_id", orderId);

            const res = await fetch(cancelUrl, {
              method: "POST",
              body: formData,
            });

            if (!res.ok) {
              const errorData = await res.json().catch(() => ({}));
              throw new Error(
                errorData?.message || `Server error: ${res.status}`,
              );
            }
          }
        } catch (err) {
          console.error("Payment status handling error:", err);
        } finally {
          setIsVerifying(false);
        }
      };

      handlePaymentStatus();
    }, [redirectStatus, paymentIntent]);

    return (
      <main className="min-h-screen bg-white pt-28 pb-20 transition-colors duration-300 dark:bg-[#060b20]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-between gap-4"
          >
            <Link
              href="/shop"
              className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-[#9fa8cc] dark:hover:text-[#f0ebe3]"
            >
              <ArrowLeft size={15} />
              Continue shopping
            </Link>
            <span className="rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-navy dark:text-[#f0ebe3]">
              Payment
            </span>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded border border-white/70 bg-white dark:border-[#1c2444] dark:bg-[#0d1333]"
          >
            <div className="grid gap-0 lg:grid-cols-1">
              <div className="border-t border-gray-100 bg-[#faf8f5] p-8 dark:border-[#1c2444] dark:bg-[#09102a] sm:p-10">
                <h2 className="text-lg font-semibold text-brand-navy dark:text-[#f0ebe3]">
                  Order details
                </h2>

                <div className="mt-6 space-y-3 rounded border border-gray-200 bg-white p-6 text-sm dark:border-[#243051] dark:bg-[#0d1333">
                  <div className="flex items-center justify-between gap-4 py-1">
                    <span className="text-gray-500 dark:text-[#9fa8cc]">
                      Order ID
                    </span>
                    <span className="font-semibold text-brand-navy dark:text-[#f0ebe3]">
                      {snapshot?.order?.order_id || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-1">
                    <span className="text-gray-500 dark:text-[#9fa8cc]">
                      Customer Name
                    </span>
                    <span className="font-semibold text-brand-navy dark:text-[#f0ebe3]">
                      {snapshot?.order?.customerName || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-1">
                    <span className="text-gray-500 dark:text-[#9fa8cc]">
                      Customer Email
                    </span>
                    <span className="font-semibold text-brand-navy dark:text-[#f0ebe3]">
                      {snapshot?.order?.customerEmail || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-1">
                    <span className="text-gray-500 dark:text-[#9fa8cc]">
                      Shipping Postcode
                    </span>
                    <span className="font-semibold text-brand-navy dark:text-[#f0ebe3]">
                      {snapshot?.order?.shippingZip || "—"}
                    </span>
                  </div>

                  {snapshot?.order?.coupon_code && (
                    <div className="flex items-center justify-between gap-4 py-1">
                      <span className="text-gray-500 dark:text-[#9fa8cc]">
                        Coupon Applied
                      </span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {snapshot.order.coupon_code}
                      </span>
                    </div>
                  )}

                  {snapshot?.order?.discount > 0 && (
                    <div className="flex items-center justify-between gap-4 py-1">
                      <span className="text-gray-500 dark:text-[#9fa8cc]">
                        Discount
                      </span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        -${snapshot.order.discount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="my-2 border-t border-gray-100 dark:border-[#243051]"></div>

                  <div className="flex items-center justify-between gap-4 pt-1">
                    <span className="font-medium text-gray-700 dark:text-[#c8cfef]">
                      Total
                    </span>
                    <span className="text-lg font-bold text-brand-navy dark:text-[#f0ebe3]">
                      {snapshot?.order?.total
                        ? `AUD $${Number(snapshot.order.total).toFixed(2)}`
                        : "—"}
                    </span>
                  </div>
                </div>

                {snapshot?.createdAt && (
                  <div className="mt-4 text-center text-xs text-gray-400 dark:text-[#6b7498]">
                    Order placed on{" "}
                    {new Date(snapshot.createdAt).toLocaleString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    );
  }
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-500">
          Loading payment details...
        </div>
      }
    >
      <PaymentPageContent />
    </Suspense>
  );
}
