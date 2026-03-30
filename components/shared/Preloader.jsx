'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const BRAND_TEXT = 'Smart Kitchen & Bath';
const letters = BRAND_TEXT.split('');

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
    }, 2600);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-linear-to-br from-[#02061d] via-brand-navy to-[#09184d]"
        >
          <div className="pointer-events-none absolute -left-20 -top-10 h-72 w-72 rounded-full bg-brand-gold/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-brand-pale/20 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-gold/70 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-brand-gold/70 to-transparent" />

          <div className="relative px-6 text-center">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mb-8 h-0.5 w-36 origin-center bg-linear-to-r from-transparent via-brand-gold to-transparent"
            />

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.045,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="relative text-3xl font-semibold uppercase tracking-[0.12em] text-white sm:text-5xl"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {letters.map((char, index) => (
                <motion.span
                  key={`${char}-${index}`}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}

              <motion.span
                initial={{ x: '-120%' }}
                animate={{ x: '140%' }}
                transition={{ delay: 0.9, duration: 1.1, ease: 'easeInOut' }}
                className="pointer-events-none absolute inset-y-0 w-16 bg-linear-to-r from-transparent via-white/65 to-transparent blur-sm"
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-3 text-xs tracking-[0.22em] uppercase text-brand-pale/90 sm:text-sm"
            >
              Crafting Elegant Living Spaces
            </motion.p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '10rem' }}
              transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-7 h-1 rounded-full bg-linear-to-r from-brand-gold/50 via-brand-gold to-brand-gold/50"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
