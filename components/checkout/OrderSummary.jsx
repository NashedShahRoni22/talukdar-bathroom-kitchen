'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useApp } from '@/components/context/AppContext';
import { getCouponAdjustedTotal } from '@/lib/coupon';

const BASE_URL = process.env.NEXT_PUBLIC_TALUKDAR_API_BASE_URL;

export default function OrderSummary({
  shippingZip,
  shippingCountry = 'Australia',
  couponMeta = null,
  onCouponMetaChange,
  shippingCost = null,
}) {
  const {
    cartDBGuest,
    totalDBGuest,
    cartDBCountGuest,
    guestToken,
  } = useApp();

  const [couponCode, setCouponCode] = useState(couponMeta?.coupon_code || '');
  const [isCouponApplied, setIsCouponApplied] = useState(Boolean(couponMeta?.coupon_code));
  const [isCheckingCoupon, setIsCheckingCoupon] = useState(false);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  useEffect(() => {
    setCouponCode(couponMeta?.coupon_code || '');
    setIsCouponApplied(Boolean(couponMeta?.coupon_code));
  }, [couponMeta]);

  useEffect(() => {
    const checkCouponApplied = async () => {
      if (!guestToken || !BASE_URL) return;

      setIsCheckingCoupon(true);
      try {
        const normalizedBaseUrl = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
        const checkCouponUrl = `${normalizedBaseUrl}check-if-coupon-applied`;
        const formData = new FormData();
        formData.append('guest_token', guestToken);

        const res = await fetch(checkCouponUrl, {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) return;

        const data = await res.json();
        if (data?.status === 'success' && data?.data?.coupon_code) {
          onCouponMetaChange?.(data.data);
          setCouponCode(data.data.coupon_code);
          setIsCouponApplied(true);
        }
      } catch {
        // Do not block checkout for coupon pre-check failures.
      } finally {
        setIsCheckingCoupon(false);
      }
    };

    checkCouponApplied();
  }, [guestToken, onCouponMetaChange]);

  const subtotal = Number(totalDBGuest);
  const shipping = shippingCost !== null && !isNaN(Number(shippingCost)) ? Number(shippingCost) : 0;
  
  // Calculate tax (10% GST)
  const tax = (subtotal + shipping) * 0.1;
  
  // Calculate totals
  const total = subtotal + shipping + tax;
  const discountedTotals = getCouponAdjustedTotal(total, couponMeta);
  const grandTotal = discountedTotals.totalAfterDiscount;
  const couponDiscount = discountedTotals.discountAmount;
  
  const hasValidZip = shippingCountry === 'Australia' && /^\d{4}$/.test(shippingZip);
  const showPendingShipping = !hasValidZip || shippingCost === null;

  const handleApplyCoupon = async () => {
    const trimmedCode = couponCode.trim();

    if (!trimmedCode) {
      toast.error('Enter a coupon code first.');
      return;
    }

    if (!guestToken) {
      toast.error('Guest session not ready. Please wait a moment.');
      return;
    }

    if (!BASE_URL) {
      toast.error('Missing API base URL configuration.');
      return;
    }

    setIsApplyingCoupon(true);

    try {
      const normalizedBaseUrl = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
      const applyCouponUrl = `${normalizedBaseUrl}apply-coupon`;

      const formData = new FormData();
      formData.append('coupon_code', trimmedCode);
      formData.append('guest_token', guestToken);

      const res = await fetch(applyCouponUrl, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.status !== 'success') {
        throw new Error(data?.message || 'Failed to apply coupon.');
      }

      onCouponMetaChange?.(data.data || null);
      setCouponCode(data?.data?.coupon_code || trimmedCode);
      setIsCouponApplied(true);
      toast.success(data?.message || 'Coupon applied successfully!');
    } catch (err) {
      toast.error(err?.message || 'Could not apply coupon.');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  return (
    <div className="sticky top-28">
      {/* Header */}
      <h2
        className="text-xl font-bold mb-6 text-brand-navy dark:text-[#f0ebe3]"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Your Order
      </h2>

      {/* Items List */}
      <div className="space-y-3 mb-6 max-h-[46vh] overflow-y-auto pr-1 scrollbar-thin">
        <AnimatePresence mode="popLayout">
          {cartDBGuest.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-12 text-center rounded-xl bg-[#faf8f5] dark:bg-[#0d1333]"
            >
              <ShoppingBag size={40} style={{ color: '#e8d9c4' }} className="mb-3" />
              <p className="text-sm text-gray-400">Your cart is empty</p>
              <Link
                href="/"
                className="mt-4 text-sm font-semibold underline"
                style={{ color: '#785d32' }}
              >
                Continue Shopping
              </Link>
            </motion.div>
          ) : (
            cartDBGuest.map((item, index) => {
              const cartId = item.cart_id;
              const quantity = Number(item.quantity);
              const price = Number(item.price);
              const lineTotal = Number.isFinite(price * quantity) ? price * quantity : 0;

              return (
                <motion.div
                  key={cartId ?? index}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-3 p-4 bg-white dark:bg-[#111840] rounded-xl border border-gray-100 dark:border-[#1c2444] shadow-sm dark:shadow-none"
                >
                  {/* Image */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    <Image src={item.thumbnail_image} alt={item.name} fill className="object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-[#f0ebe3] leading-tight line-clamp-2 mt-0.5">
                      {item.name}
                    </h4>
                    <p className="text-sm font-bold mt-1 text-brand-navy dark:text-[#f0ebe3]">
                      Unit: ${price.toFixed(2)}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-500 dark:text-[#9fa8cc]">
                        Qty: {quantity}
                      </span>
                      <span className="font-bold text-brand-navy dark:text-[#f0ebe3]">
                        Total: ${lineTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {cartDBGuest.length > 0 && (
        <div className="mb-4 space-y-3 rounded-xl border border-gray-200 p-4 dark:border-[#2a3460]">
          <h3 className="text-sm font-bold uppercase tracking-widest text-brand-navy dark:text-[#f0ebe3]">
            Coupon
          </h3>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              disabled={isCouponApplied || isCheckingCoupon || isApplyingCoupon}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 transition-colors focus:border-brand-navy focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 dark:border-[#2a3460] dark:bg-[#111840] dark:text-[#f0ebe3]"
            />

            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={isCouponApplied || isCheckingCoupon || isApplyingCoupon}
              className="rounded-lg bg-brand-navy px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isCheckingCoupon ? 'Checking...' : isApplyingCoupon ? 'Applying...' : isCouponApplied ? 'Applied' : 'Apply'}
            </button>
          </div>

          {isCouponApplied && couponMeta ? (
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-300">
              Coupon applied: {couponMeta.coupon_code} ({couponMeta.discount}
              {String(couponMeta.discount_type || '').toLowerCase() === 'percentage' ? '%' : ' off'})
            </p>
          ) : null}
        </div>
      )}

      {cartDBGuest.length > 0 && couponDiscount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm dark:border-emerald-500/30 dark:bg-emerald-500/10"
        >
          <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-300">
            <span>
              Coupon ({couponMeta?.coupon_code || 'Applied'})
            </span>
            <span className="font-semibold">- ${couponDiscount.toFixed(2)}</span>
          </div>
          <p className="mt-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            Coupon applied successfully.
          </p>
        </motion.div>
      )}

      {/* Pricing Breakdown */}
      {cartDBGuest.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-5 space-y-3 text-sm bg-[#faf8f5] dark:bg-[#0d1333]"
        >
          <div className="flex justify-between text-gray-500 dark:text-[#9fa8cc]">
            <span>
              Subtotal ({cartDBCountGuest} {cartDBCountGuest === 1 ? 'item' : 'items'})
            </span>
            <span className="font-medium text-gray-700 dark:text-[#f0ebe3]">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-500 dark:text-[#9fa8cc]">
            <span>Shipping</span>
            {!hasValidZip ? (
              <span className="font-medium text-amber-600">Enter valid postcode</span>
            ) : shippingCost === null ? (
              <span className="font-medium text-gray-500">Calculating...</span>
            ) : (
              <span className="font-medium text-gray-700 dark:text-[#f0ebe3]">${shipping.toFixed(2)}</span>
            )}
          </div>

          <div className="flex justify-between text-gray-500 dark:text-[#9fa8cc]">
            <span>GST (10%)</span>
            {showPendingShipping ? (
               <span className="font-medium text-gray-400">—</span>
            ) : (
               <span className="font-medium text-gray-700 dark:text-[#f0ebe3]">${tax.toFixed(2)}</span>
            )}
          </div>

          <div
            className="border-t pt-3 flex justify-between font-bold text-base border-brand-pale dark:border-[#2a3460] text-brand-navy dark:text-[#f0ebe3]"
          >
            <span>Total</span>
            {showPendingShipping ? (
               <span className="text-gray-400 font-medium">Pending shipping</span>
            ) : (
               <span>${grandTotal.toFixed(2)}</span>
            )}
          </div>
        </motion.div>
      )}

      {subtotal > 0 && !hasValidZip && (
        <p className="mt-3 text-xs text-gray-400 text-center">
          Enter a valid Australian postcode in shipping details to calculate delivery.
        </p>
      )}
    </div>
  );
}
