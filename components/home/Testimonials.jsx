'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Homeowner',
    company: 'Manhattan',
    content:
      'The quality and elegance of Talukdar products transformed our bathroom into a spa-like sanctuary. The attention to detail is remarkable!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Interior Designer',
    company: 'Chen Design Studio',
    content:
      'Working with Talukdar has been seamless. Their luxury collection perfectly elevates any modern kitchen design.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Williams',
    role: 'Real Estate Developer',
    company: 'Premium Properties Inc',
    content:
      'Talukdar fixtures are our go-to choice for high-end properties. Clients consistently praise the luxury aesthetic and durability.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="py-16 md:py-20 bg-linear-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-10 right-5 w-72 h-72 rounded-full opacity-5"
        style={{ backgroundColor: '#785d32' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: '#785d32' }}
          >
            Testimonials
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold mt-3 mb-4"
            style={{ color: '#050a30', fontFamily: 'var(--font-playfair)' }}
          >
            Trusted by Luxury Enthusiasts
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            See how our clients transformed their spaces with Talukdar&apos;s premium collections
          </p>
          <div
            className="w-16 h-1 rounded-full mx-auto mt-6"
            style={{ backgroundColor: '#785d32' }}
          />
        </motion.div>

        {/* Testimonial Cards Carousel */}
        <div className="relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-8 border border-gray-100">
                {/* Left: Image & Info */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-full md:w-1/3 flex flex-col items-center text-center shrink-0"
                >
                  <div className="relative w-24 h-24 mb-4">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover rounded-full border-4 border-gray-200"
                    />
                  </div>

                  <h3 className="text-lg font-bold" style={{ color: '#050a30' }}>
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-sm font-semibold" style={{ color: '#785d32' }}>
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-xs text-gray-600">{testimonials[currentIndex].company}</p>

                  {/* Rating */}
                  <div className="flex gap-1 mt-3">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <span key={i} className="text-lg" style={{ color: '#785d32' }}>
                        ★
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Right: Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full md:w-2/3"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <Quote size={28} style={{ color: '#785d32', opacity: 0.3 }} />
                  </div>

                  <p className="text-base md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                    &ldquo;{testimonials[currentIndex].content}&rdquo;
                  </p>

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="h-1 rounded-full"
                    style={{ backgroundColor: '#785d32' }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8 md:mt-12">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={prev}
            className="p-3 rounded-full transition-all shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#050a30', color: 'white' }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className="h-2 rounded-full transition-all"
                animate={{
                  width: index === currentIndex ? 32 : 8,
                  backgroundColor: index === currentIndex ? '#785d32' : '#d1d5db',
                }}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={next}
            className="p-3 rounded-full transition-all shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#785d32', color: 'white' }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-600">
            Trusted by{' '}
            <span className="font-bold" style={{ color: '#050a30' }}>
              500+
            </span>{' '}
            satisfied customers worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}
