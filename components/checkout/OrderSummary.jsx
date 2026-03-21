'use client';

import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useApp } from '@/components/context/AppContext';
import { getOrderTotalsForAustralia, parseAuPostcode } from '@/lib/auShipping';

export default function OrderSummary({ shippingZip, shippingCountry = 'Australia' }) {
  const { cartItems, cartTotal, cartCount, removeFromCart, updateQuantity } = useApp();

  const totals = getOrderTotalsForAustralia({
    subtotal: cartTotal,
    destinationPostcode: shippingZip,
  });

  const shipping = totals.shippingCharge;
  const tax = totals.tax;
  const grandTotal = totals.total;
  const hasValidAusPostcode = shippingCountry === 'Australia' && !!parseAuPostcode(shippingZip);

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
          {cartItems.length === 0 ? (
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
            cartItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex gap-3 p-4 bg-white dark:bg-[#111840] rounded-xl border border-gray-100 dark:border-[#1c2444] shadow-sm dark:shadow-none"
              >
                {/* Image */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: '#785d32' }}
                  >
                    {item.category}
                  </span>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-[#f0ebe3] leading-tight line-clamp-2 mt-0.5">
                    {item.name}
                  </h4>
                  <p className="text-sm font-bold mt-1 text-brand-navy dark:text-[#f0ebe3]">
                    ${item.price.toFixed(2)}
                  </p>

                  {/* Controls row */}
                  <div className="flex items-center justify-between mt-2">
                    {/* Qty */}
                    <div
                      className="flex items-center rounded-lg overflow-hidden border"
                      style={{ borderColor: '#e8d9c4' }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="cursor-pointer w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-[#1a2340] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="w-7 text-center text-sm font-semibold text-gray-700 dark:text-[#f0ebe3]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="cursor-pointer w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-[#1a2340] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={11} />
                      </button>
                    </div>

                    {/* Line total + remove */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-brand-navy dark:text-[#f0ebe3]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={13} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Pricing Breakdown */}
      {cartItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-5 space-y-3 text-sm bg-[#faf8f5] dark:bg-[#0d1333]"
        >
          <div className="flex justify-between text-gray-500 dark:text-[#9fa8cc]">
            <span>
              Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </span>
            <span className="font-medium text-gray-700 dark:text-[#f0ebe3]">${cartTotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-500 dark:text-[#9fa8cc]">
            <span>Shipping</span>
            {!hasValidAusPostcode ? (
              <span className="font-medium text-amber-600">Enter postcode</span>
            ) : (
              <span className="font-medium text-gray-700 dark:text-[#f0ebe3]">${shipping.toFixed(2)}</span>
            )}
          </div>

          <div className="flex justify-between text-gray-500 dark:text-[#9fa8cc]">
            <span>GST (10%)</span>
            <span className="font-medium text-gray-700 dark:text-[#f0ebe3]">${tax.toFixed(2)}</span>
          </div>

          {hasValidAusPostcode && (
            <p className="text-xs text-gray-500 dark:text-[#9fa8cc] font-medium">
              Delivery estimate from NSW 2000 to {shippingZip} ({totals.shippingMeta.zone} zone)
            </p>
          )}

          <div
            className="border-t pt-3 flex justify-between font-bold text-base border-brand-pale dark:border-[#2a3460] text-brand-navy dark:text-[#f0ebe3]"
          >
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </motion.div>
      )}

      {cartTotal > 0 && !hasValidAusPostcode && (
        <p className="mt-3 text-xs text-gray-400 text-center">
          Enter a valid Australian postcode in shipping details to calculate delivery.
        </p>
      )}
    </div>
  );
}
