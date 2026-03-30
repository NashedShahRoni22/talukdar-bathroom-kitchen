'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, KeyRound, Mail } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/components/context/AppContext';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/profile';

  const { requestOtp, verifyOtp, authReady, isAuthenticated } = useApp();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('email');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (authReady && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [authReady, isAuthenticated, redirectTo, router]);

  function handleSendOtp(e) {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!isEmail) return;

    setIsSubmitting(true);
    const ok = requestOtp(normalizedEmail);
    if (ok) setStep('otp');
    setIsSubmitting(false);
  }

  function handleVerifyOtp(e) {
    e.preventDefault();

    if (otp.trim().length !== 6) return;

    setIsSubmitting(true);
    const ok = verifyOtp(email, otp);
    if (ok) router.push(redirectTo);
    setIsSubmitting(false);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#f7f2ea] via-[#fbfaf8] to-[#efe6d8] px-4 pt-24 pb-8 transition-colors duration-300 dark:bg-linear-to-br dark:from-[#050a20] dark:via-[#070e2d] dark:to-[#0b153d] sm:px-6">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-brand-navy/15 blur-3xl dark:bg-brand-pale/10" />

      <section className="relative mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-md items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_22px_60px_rgba(5,10,48,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0d1435]/80 dark:shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-8"
        >
          <p className="text-xs font-semibold tracking-[0.24em] uppercase text-brand-gold">Account Access</p>
          <h1
            className="mt-3 text-3xl font-semibold text-brand-navy dark:text-[#f0ebe3]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Login With OTP
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-[#9fa8cc]">
            Enter your email to receive a one-time password.
          </p>

          {step === 'email' ? (
            <form onSubmit={handleSendOtp} className="mt-6 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-brand-navy dark:text-[#f0ebe3]">Email Address</span>
                <div className="mt-2 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-pale/70 text-brand-navy dark:bg-brand-gold/20 dark:text-brand-pale">
                    <Mail size={15} />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-2xl border border-[#e6dece] bg-white/95 pl-14 pr-4 py-3.5 text-sm text-brand-navy placeholder:text-[#8e95a8] shadow-[0_8px_24px_rgba(5,10,48,0.06)] transition-all focus:outline-none focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/15 dark:border-[#2a3460] dark:bg-[#111840]/90 dark:text-[#f0ebe3]"
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-navy py-3.5 font-semibold text-white shadow-[0_14px_28px_rgba(5,10,48,0.28)] transition-all hover:-translate-y-0.5 hover:bg-brand-gold hover:shadow-[0_16px_30px_rgba(120,93,50,0.35)] disabled:opacity-70"
              >
                Send OTP
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="mt-6 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-brand-navy dark:text-[#f0ebe3]">One-Time Password</span>
                <div className="mt-2 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-pale/70 text-brand-navy dark:bg-brand-gold/20 dark:text-brand-pale">
                    <KeyRound size={15} />
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    required
                    className="w-full rounded-2xl border border-[#e6dece] bg-white/95 pl-14 pr-4 py-3.5 text-sm tracking-[0.3em] text-brand-navy placeholder:text-[#8e95a8] shadow-[0_8px_24px_rgba(5,10,48,0.06)] transition-all focus:outline-none focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/15 dark:border-[#2a3460] dark:bg-[#111840]/90 dark:text-[#f0ebe3]"
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-navy py-3.5 font-semibold text-white shadow-[0_14px_28px_rgba(5,10,48,0.28)] transition-all hover:-translate-y-0.5 hover:bg-brand-gold hover:shadow-[0_16px_30px_rgba(120,93,50,0.35)] disabled:opacity-70"
              >
                Verify & Login
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => setStep('email')}
                className="w-full text-sm font-medium text-brand-gold hover:opacity-80"
              >
                Use another email
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </main>
  );
}
