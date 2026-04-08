'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Clock3, HelpCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const BASE_URL = process.env.NEXT_PUBLIC_TALUKDAR_API_BASE_URL;

function getStatusCopy(status) {
  switch (status) {
    case 'processing':
      return {
        title: 'Payment processing',
        description: 'Your payment is being confirmed. Keep this page open while Stripe finalizes the transaction.',
        tone: 'processing',
        icon: Clock3,
      };
    case 'failed':
      return {
        title: 'Payment failed',
        description: 'The payment could not be completed. Please review the details below and try again.',
        tone: 'failed',
        icon: XCircle,
      };
    case 'cancelled':
      return {
        title: 'Payment cancelled',
        description: 'The payment flow was closed before completion. You can return to checkout and try again.',
        tone: 'cancelled',
        icon: HelpCircle,
      };
    case 'succeeded':
      return {
        title: 'Payment successful',
        description: 'Stripe confirmed the payment successfully.',
        tone: 'succeeded',
        icon: CheckCircle2,
      };
    default:
      return {
        title: 'Payment update',
        description: 'Stripe returned to the payment page with the latest transaction details.',
        tone: 'processing',
        icon: Clock3,
      };
  }
}

function PaymentPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get('status') || 'processing';
  const message = searchParams.get('message') || '';
  const paymentIntent = searchParams.get('payment_intent') || searchParams.get('paymentIntent') || '';
  const paymentIntentClientSecret =
    searchParams.get('payment_intent_client_secret') || searchParams.get('paymentIntentClientSecret') || '';
  const redirectStatus = searchParams.get('redirect_status') || '';

  const [isVerifying, setIsVerifying] = useState(false);
  const [snapshot] = useState(() => {
    try {
      const stored = sessionStorage.getItem('talukdar-payment-snapshot');
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
        if (redirectStatus === 'succeeded' && paymentIntent) {
          setIsVerifying(true);

          if (!BASE_URL) {
            console.error('Missing API base URL');
            return;
          }

          const normalizedUrl = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
          const verifyUrl = `${normalizedUrl}payment/verify`;

          const formData = new FormData();
          formData.append('payment_intent', paymentIntent);

          const res = await fetch(verifyUrl, {
            method: 'POST',
            body: formData,
          });

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData?.message || `Server error: ${res.status}`);
          }

          const data = await res.json();
          toast.success(data?.message || 'Payment verified successfully!');
        } else if (['cancelled', 'failed'].includes(redirectStatus)) {
          setIsVerifying(true);

          const orderId = sessionStorage.getItem('talukdar-order-id');
          if (!orderId) {
            console.warn('No order_id found in sessionStorage');
            return;
          }

          if (!BASE_URL) {
            console.error('Missing API base URL');
            return;
          }

          const normalizedUrl = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
          const cancelUrl = `${normalizedUrl}payment/cancel`;

          const formData = new FormData();
          formData.append('order_id', orderId);

          const res = await fetch(cancelUrl, {
            method: 'POST',
            body: formData,
          });

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData?.message || `Server error: ${res.status}`);
          }

          const data = await res.json();
          toast.info(data?.message || 'Payment cancelled.');
        }
      } catch (err) {
        console.error('Payment status handling error:', err);
        toast.error(err?.message || 'An error occurred while processing your payment.');
      } finally {
        setIsVerifying(false);
      }
    };

    handlePaymentStatus();
  }, [redirectStatus, paymentIntent]);

  const statusCopy = useMemo(() => getStatusCopy(status), [status]);
  const StatusIcon = statusCopy.icon;

  return (
    <main className="min-h-screen bg-[#faf8f5] pt-28 pb-20 transition-colors duration-300 dark:bg-[#060b20]">
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
          className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_30px_70px_rgba(5,10,48,0.08)] dark:border-[#1c2444] dark:bg-[#0d1333]"
        >
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-8 sm:p-10">
              <div
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                  statusCopy.tone === 'succeeded'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300'
                    : statusCopy.tone === 'failed'
                      ? 'bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300'
                      : statusCopy.tone === 'cancelled'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300'
                        : 'bg-brand-gold/10 text-brand-navy dark:text-[#f0ebe3]'
                }`}
              >
                <StatusIcon size={16} />
                {statusCopy.title}
              </div>

              <h1
                className="mt-6 text-3xl font-bold text-brand-navy dark:text-[#f0ebe3] md:text-5xl"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 dark:text-[#9fa8cc] sm:text-base">
                {message || statusCopy.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="rounded-xl border border-gray-200 bg-transparent px-6 py-3.5 text-sm font-bold text-brand-navy transition-all hover:bg-gray-50 focus:ring-2 focus:ring-brand-gold/50 dark:border-[#2a3460] dark:text-[#f0ebe3] dark:hover:bg-[#111840]"
                >
                  Continue shopping
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-100 bg-[#faf8f5] p-8 dark:border-[#1c2444] dark:bg-[#09102a] sm:p-10 lg:border-l lg:border-t-0">
              <h2 className="text-lg font-semibold text-brand-navy dark:text-[#f0ebe3]">Order details</h2>
              
              <div className="mt-6 space-y-3 rounded-2xl border border-gray-200 bg-white p-6 text-sm dark:border-[#243051] dark:bg-[#0d1333] shadow-sm">
                <div className="flex items-center justify-between gap-4 py-1">
                  <span className="text-gray-500 dark:text-[#9fa8cc]">Order ID</span>
                  <span className="font-semibold text-brand-navy dark:text-[#f0ebe3]">{snapshot?.order?.order_id || '—'}</span>
                </div>
                <div className="flex items-center justify-between gap-4 py-1">
                  <span className="text-gray-500 dark:text-[#9fa8cc]">Customer Name</span>
                  <span className="font-semibold text-brand-navy dark:text-[#f0ebe3]">{snapshot?.order?.customerName || '—'}</span>
                </div>
                <div className="flex items-center justify-between gap-4 py-1">
                  <span className="text-gray-500 dark:text-[#9fa8cc]">Customer Email</span>
                  <span className="font-semibold text-brand-navy dark:text-[#f0ebe3]">{snapshot?.order?.customerEmail || '—'}</span>
                </div>
                <div className="flex items-center justify-between gap-4 py-1">
                  <span className="text-gray-500 dark:text-[#9fa8cc]">Shipping Postcode</span>
                  <span className="font-semibold text-brand-navy dark:text-[#f0ebe3]">{snapshot?.order?.shippingZip || '—'}</span>
                </div>
                
                {snapshot?.order?.coupon_code && (
                  <div className="flex items-center justify-between gap-4 py-1">
                    <span className="text-gray-500 dark:text-[#9fa8cc]">Coupon Applied</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{snapshot.order.coupon_code}</span>
                  </div>
                )}
                
                {snapshot?.order?.discount > 0 && (
                  <div className="flex items-center justify-between gap-4 py-1">
                    <span className="text-gray-500 dark:text-[#9fa8cc]">Discount</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">-${snapshot.order.discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="my-2 border-t border-gray-100 dark:border-[#243051]"></div>
                
                <div className="flex items-center justify-between gap-4 pt-1">
                  <span className="font-medium text-gray-700 dark:text-[#c8cfef]">Total</span>
                  <span className="text-lg font-bold text-brand-navy dark:text-[#f0ebe3]">
                    {snapshot?.order?.total ? `AUD $${Number(snapshot.order.total).toFixed(2)}` : '—'}
                  </span>
                </div>
              </div>

              {snapshot?.createdAt && (
                <div className="mt-4 text-center text-xs text-gray-400 dark:text-[#6b7498]">
                  Order placed on {new Date(snapshot.createdAt).toLocaleString(undefined, {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
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

import { Suspense } from 'react';

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading payment details...
      </div>
    }>
      <PaymentPageContent />
    </Suspense>
  );
}
