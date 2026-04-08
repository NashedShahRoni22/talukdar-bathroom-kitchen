'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import StripePaymentStep from '@/components/checkout/StripePaymentStep';
import { useApp } from '@/components/context/AppContext';

export default function CheckoutPage() {
  const { cartDBGuest, cartReady } = useApp();
  const router = useRouter();
  const [step, setStep] = useState(1); // 1 = Information, 2 = Payment
  const [shippingMeta, setShippingMeta] = useState({
    zip: '',
    country: 'Australia',
  });
  const [couponMeta, setCouponMeta] = useState(null);
  const [shippingCost, setShippingCost] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [stripePromise, setStripePromise] = useState(null);

  // Initialize Stripe
  useEffect(() => {
    const initStripe = async () => {
      const { loadStripe } = await import('@stripe/stripe-js');
      const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      setStripePromise(promise);
    };
    initStripe();
  }, []);

  // Fetch shipping cost when zip changes with a debounce
  useEffect(() => {
    const fetchShippingCost = async () => {
      // Only fetch if exactly 4 digits
      if (!shippingMeta.zip || shippingMeta.zip.length !== 4) {
        setShippingCost(null);
        return;
      }

      try {
        const baseUrl = process.env.NEXT_PUBLIC_TALUKDAR_API_BASE_URL;
        if (!baseUrl) return;

        const normalizedUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        const url = `${normalizedUrl}get-shipping-cost?post_code=${encodeURIComponent(shippingMeta.zip)}`;

        const res = await fetch(url);
        if (!res.ok) {
           setShippingCost(null);
           return;
        }

        const data = await res.json();
        // Fallbacks for common API response structures
        const price = data?.data?.shipping_charge;

        if (price != null && !isNaN(Number(price))) {
          setShippingCost(Number(price));
        } else {
          setShippingCost(null);
        }
      } catch (err) {
        console.error('Failed to fetch shipping cost:', err);
        setShippingCost(null);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchShippingCost();
    }, 600);

    return () => clearTimeout(debounceTimer);
  }, [shippingMeta.zip]);

  useEffect(() => {
    if (cartReady && cartDBGuest.length === 0) {
      router.replace('/');
    }
  }, [cartDBGuest, cartReady, router]);

  const handleCheckoutFormSubmit = useCallback((clientSecret) => {
    setClientSecret(clientSecret);
    setStep(2);
  }, []);

  const handleBackToForm = useCallback(() => {
    setStep(1);
    setClientSecret('');
  }, []);

  if (!cartReady) return null;
  if (cartDBGuest.length === 0) return null;

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
              Checkout {step === 2 && '- Payment'}
            </h1>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 sm:ml-auto">
            <Shield size={14} />
            Secure &amp; Encrypted
          </div>
        </motion.div>

        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-8 flex items-center justify-center gap-4"
        >
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-colors ${
            step === 1 
              ? 'bg-brand-navy text-white' 
              : 'bg-emerald-500 text-white'
          }`}>
            {step === 1 ? '1' : '✓'}
          </div>
          <div className={`h-1.5 w-12 transition-colors ${
            step === 2 ? 'bg-brand-navy' : 'bg-gray-300 dark:bg-[#2a3460]'
          }`} />
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-colors ${
            step === 2 
              ? 'bg-brand-navy text-white' 
              : 'bg-gray-300 dark:bg-[#2a3460] text-gray-600 dark:text-[#9fa8cc]'
          }`}>
            2
          </div>
          <span className="text-xs text-gray-500 dark:text-[#9fa8cc] ml-2">
            {step === 1 ? 'Information' : 'Payment'}
          </span>
        </motion.div>

        {/* Step 1: Information Form */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
            {/* Left — Form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white dark:bg-[#0d1333] rounded-2xl p-8 shadow-sm"
            >
              <CheckoutForm 
                onShippingMetaChange={setShippingMeta} 
                couponMeta={couponMeta}
                shippingCost={shippingCost}
                onSubmit={handleCheckoutFormSubmit}
              />
            </motion.div>

            {/* Right — Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-[#0d1333] rounded-2xl p-6 shadow-sm">
                <OrderSummary
                  shippingZip={shippingMeta.zip}
                  shippingCountry={shippingMeta.country}
                  couponMeta={couponMeta}
                  onCouponMetaChange={setCouponMeta}
                  shippingCost={shippingCost}
                />
              </div>
            </motion.div>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && clientSecret && stripePromise && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <StripePaymentStep 
              clientSecret={clientSecret}
              stripePromise={stripePromise}
              onBack={handleBackToForm}
              orderTotal={shippingCost}
            />
          </motion.div>
        )}
      </div>
    </main>
  );
}
