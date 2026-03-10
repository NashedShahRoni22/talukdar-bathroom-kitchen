'use client';

import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useApp } from '@/components/context/AppContext';

export default function OrderSummary() {
  const { cartItems, cartTotal, cartCount, removeFromCart, updateQuantity } = useApp();

  const shipping = cartTotal > 5000 ? 0 : 250;
  const tax = cartTotal * 0.10;
  const grandTotal = cartTotal + shipping + tax;

  return (
    <div className="sticky top-28">
      {/* Header */}
      <h2
        className="text-xl font-bold mb-6 text-[#050a30] dark:text-[#f0ebe3]"
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
                  <p className="text-sm font-bold mt-1 text-[#050a30] dark:text-[#f0ebe3]">
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
                      <span className="text-sm font-bold text-[#050a30] dark:text-[#f0ebe3]">
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
            {shipping === 0 ? (
              <span className="font-semibold text-green-500">Free</span>
            ) : (
              <span className="font-medium text-gray-700 dark:text-[#f0ebe3]">${shipping.toFixed(2)}</span>
            )}
          </div>

          <div className="flex justify-between text-gray-500 dark:text-[#9fa8cc]">
            <span>Tax (10%)</span>
            <span className="font-medium text-gray-700 dark:text-[#f0ebe3]">${tax.toFixed(2)}</span>
          </div>

          {shipping === 0 && (
            <p className="text-xs text-green-600 font-medium">
              ✓ You qualify for free shipping on orders over $5,000
            </p>
          )}

          <div
            className="border-t pt-3 flex justify-between font-bold text-base border-[#e8d9c4] dark:border-[#2a3460] text-[#050a30] dark:text-[#f0ebe3]"
          >
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </motion.div>
      )}

      {/* Free shipping nudge */}
      {cartTotal > 0 && cartTotal < 5000 && (
        <p className="mt-3 text-xs text-gray-400 text-center">
          Add{' '}
          <span className="font-semibold" style={{ color: '#785d32' }}>
            ${(5000 - cartTotal).toFixed(2)}
          </span>{' '}
          more for free shipping
        </p>
      )}
    </div>
  );
}
