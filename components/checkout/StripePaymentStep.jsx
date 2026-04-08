'use client';

import { useState } from 'react';
import { PaymentElement, useElements, useStripe, Elements } from '@stripe/react-stripe-js';
import { Loader2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Link from 'next/link';

function PaymentForm({ onBack, orderTotal }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmPayment = async () => {
    if (!stripe || !elements) {
      toast.error('Payment form is still loading. Please wait a moment.');
      return;
    }

    setIsSubmitting(true);

    try {
      const returnUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/payment?status=processing`
        : '/payment?status=processing';

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
      });

      if (error) {
        toast.error(error.message || 'Payment could not be completed.');
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      toast.error(err?.message || 'An unexpected error occurred.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0d1333] rounded-2xl p-8 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <h2
          className="text-2xl font-bold text-brand-navy dark:text-[#f0ebe3]"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Complete Payment
        </h2>
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-[#9fa8cc] dark:hover:text-[#f0ebe3] transition-colors disabled:opacity-50"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      <div className="mb-6 rounded-xl border border-gray-200 p-6 dark:border-[#2a3460]">
        <PaymentElement options={{ layout: 'tabs' }} />
      </div>

      <motion.button
        type="button"
        onClick={handleConfirmPayment}
        disabled={isSubmitting || !stripe || !elements}
        whileHover={isSubmitting ? {} : { scale: 1.02 }}
        whileTap={isSubmitting ? {} : { scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-navy py-4 font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Confirming payment...
          </>
        ) : (
          'Complete Payment'
        )}
      </motion.button>

      <p className="mt-4 text-xs text-center text-gray-500 dark:text-[#9fa8cc]">
        Your payment details are secure and encrypted. You will be redirected after confirmation.
      </p>
    </div>
  );
}

export default function StripePaymentStep({ clientSecret, stripePromise, onBack, orderTotal }) {
  if (!clientSecret || !stripePromise) {
    return (
      <div className="bg-white dark:bg-[#0d1333] rounded-2xl p-8 shadow-sm text-center">
        <p className="text-gray-600 dark:text-[#9fa8cc]">Loading payment form...</p>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: { theme: 'stripe' },
      }}
    >
      <PaymentForm onBack={onBack} orderTotal={orderTotal} />
    </Elements>
  );
}
