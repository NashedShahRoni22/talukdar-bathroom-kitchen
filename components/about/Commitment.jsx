'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const commitments = [
  'Premium quality products sourced from world-class manufacturers',
  'Expert design consultation and personalized recommendations',
  'Lifetime warranty on all products with free maintenance support',
  '24/7 dedicated customer support via phone, chat, and email',
  'Hassle-free installation and delivery across all regions',
  'Eco-friendly practices and sustainable material sourcing',
];

export default function Commitment() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-[#111b2d] transition-colors duration-300">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-125 rounded overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=700&fit=crop"
              alt="Modern Kitchen"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-navy/30 to-transparent"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="min-w-0"
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-brand-gold">
              Our Commitment
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6 text-brand-navy dark:text-[#f0ebe3]" style={{ fontFamily: 'var(--font-playfair)' }}>
              Excellence You Can Trust
            </h2>
            <div className="w-16 h-1 rounded-full mb-8" style={{ backgroundColor: '#785d32' }}></div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              We stand behind every product and promise with unwavering commitment to your satisfaction. Your dream bathroom and kitchen deserve nothing less than the best.
            </p>

            {/* Commitments List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {commitments.map((commitment, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <CheckCircle size={24} className="text-brand-gold shrink-0 mt-1" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {commitment}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-10"
            >
              <button className="px-8 py-3 bg-brand-gold hover:bg-[#6a5028] text-white font-semibold rounded">
                Start Your Journey With Us
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
