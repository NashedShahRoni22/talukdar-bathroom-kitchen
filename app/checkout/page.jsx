'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { useApp } from '@/components/context/AppContext';

export default function CheckoutPage() {
  const { cartItems } = useApp();
  const router = useRouter();
  const [shippingMeta, setShippingMeta] = useState({
    zip: '',
    country: 'Australia',
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      router.replace('/');
    }
  }, [cartItems, router]);

  if (cartItems.length === 0) return null;

  return (
    <main className="min-h-screen pt-28 pb-20 bg-[#faf8f5] dark:bg-[#060b20] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-center sm:gap-4"
        >
          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:flex-nowrap sm:gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-gray-700"
            >
              <ArrowLeft size={15} />
              Back to store
            </Link>
            <div className="hidden h-4 w-px bg-gray-300 dark:bg-[#2a3460] sm:block" />
            <h1
              className="text-2xl font-bold text-brand-navy dark:text-[#f0ebe3] md:text-3xl"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Checkout
            </h1>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 sm:ml-auto">
            <Shield size={14} />
            Secure &amp; Encrypted
          </div>
        </motion.div>

        {/* Main layout: form left, order right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-[#0d1333] rounded-2xl p-8 shadow-sm"
          >
            <CheckoutForm onShippingMetaChange={setShippingMeta} />
          </motion.div>

          {/* Right — Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
              <div className="bg-white dark:bg-[#0d1333] rounded-2xl p-6 shadow-sm">
              <OrderSummary shippingZip={shippingMeta.zip} shippingCountry={shippingMeta.country} />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
