'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&h=900&fit=crop"
          alt="Luxury Bathroom"
          fill
          className="object-cover w-full h-full"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white max-w-2xl px-4"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm md:text-base font-semibold tracking-widest uppercase"
          style={{ color: '#e8d9c4' }}
        >
          Welcome to Talukdar
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold my-6 leading-tight"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Luxury Bathrooms & Kitchens
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-200 mb-8"
        >
          Transform your spaces with premium design and exceptional craftsmanship
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all"
            style={{ backgroundColor: '#785d32' }}
          >
            Shop Now
            <ArrowRight size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all"
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <motion.div className="w-1 h-2 rounded-full" style={{ backgroundColor: '#e8d9c4' }} />
        </div>
      </motion.div>
    </section>
  );
}
