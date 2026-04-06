'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/components/context/AppContext';
import CartItem from './CartItem';

export default function CartSidebar() {
  const { isCartOpen, closeCart, cartDBGuest, cartDBCountGuest, totalDBGuest } = useApp();
  const router = useRouter();

  const subtotal = Number.isFinite(Number(totalDBGuest)) ? Number(totalDBGuest) : 0;

  function goToCheckout() {
    closeCart();
    router.push('/checkout');
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Sidebar Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-white dark:bg-[#0a0f2e] z-50 flex flex-col shadow-2xl dark:shadow-none"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b border-[#e8d9c4] dark:border-[#1c2444] shrink-0"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={22} className="text-[#050a30] dark:text-[#e8d9c4]" />
                <h2
                  className="text-xl font-bold text-[#050a30] dark:text-[#e8d9c4]"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Your Cart
                </h2>
                {cartDBCountGuest > 0 && (
                  <span
                    className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center"
                    style={{ backgroundColor: '#785d32' }}
                  >
                    {cartDBCountGuest}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={closeCart}
                  className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-[#1a2340] rounded-lg transition-colors"
                  aria-label="Close cart"
                >
                  <X size={20} className="text-[#050a30] dark:text-[#e8d9c4]" />
                </button>
              </div>
            </div>

            {/* Cart Items — Scrollable */}
            <div className="flex-1 overflow-y-auto px-6">
              {cartDBGuest.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <ShoppingBag size={72} className="mx-auto mb-5" style={{ color: '#e8d9c4' }} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-500 dark:text-[#9fa8cc] mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-gray-400 dark:text-[#6b7498] mb-8 max-w-[220px]">
                    Discover our luxury bathroom & kitchen collections
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeCart}
                    className="cursor-pointer px-7 py-2.5 rounded-lg text-white text-sm font-semibold transition-all"
                    style={{ backgroundColor: '#785d32' }}
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {cartDBGuest.map((item, index) => (
                    <CartItem
                      key={item?.id ?? item?.guest_cart_id ?? item?.cart_id ?? index}
                      item={item}
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer — Subtotal & Actions */}
            {cartDBGuest.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-[#e8d9c4] dark:border-[#1c2444] px-6 py-6 shrink-0 bg-[#faf8f5] dark:bg-[#060b20]"
              >
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-500 dark:text-[#9fa8cc]">
                    Subtotal ({cartDBCountGuest} {cartDBCountGuest === 1 ? 'item' : 'items'})
                  </span>
                  <span className="text-2xl font-bold text-[#050a30] dark:text-[#e8d9c4]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 dark:text-[#6b7498] mb-5">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={goToCheckout}
                  className="cursor-pointer w-full py-4 rounded-lg text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                  style={{ backgroundColor: '#050a30' }}
                >
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </motion.button>

                {/* Continue Shopping */}
                <button
                  onClick={closeCart}
                  className="cursor-pointer w-full mt-3 py-3 rounded-lg font-semibold text-sm border-2 border-[#785d32] text-[#785d32] transition-colors hover:bg-[#785d32] hover:text-white"
                >
                  Continue Shopping
                </button>
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
