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
    <main className="min-h-screen pt-28 pb-14 bg-[#f8f5ef] dark:bg-[#060b20] transition-colors duration-300">
      <section className="max-w-md mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[#e8dfd1] dark:border-[#1c2444] bg-white dark:bg-[#0e1430] p-6 sm:p-8 shadow-[0_18px_45px_rgba(5,10,48,0.12)]"
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
            <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-brand-navy dark:text-[#f0ebe3]">Email Address</span>
                <div className="mt-1.5 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-gray-200 dark:border-[#2a3460] bg-white dark:bg-[#111840] pl-10 pr-4 py-3 text-sm text-brand-navy dark:text-[#f0ebe3] focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-brand-navy text-white py-3 font-semibold hover:bg-brand-gold transition-colors disabled:opacity-70"
              >
                Send OTP
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-brand-navy dark:text-[#f0ebe3]">One-Time Password</span>
                <div className="mt-1.5 relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    required
                    className="w-full rounded-xl border border-gray-200 dark:border-[#2a3460] bg-white dark:bg-[#111840] pl-10 pr-4 py-3 text-sm text-brand-navy dark:text-[#f0ebe3] tracking-[0.3em] focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-brand-navy text-white py-3 font-semibold hover:bg-brand-gold transition-colors disabled:opacity-70"
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
