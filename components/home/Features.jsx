'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, Truck, Award } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Handpicked luxury materials and world-class craftsmanship in every product.',
  },
  {
    icon: Shield,
    title: 'Lifetime Warranty',
    description: 'We stand behind our products with comprehensive lifetime protection.',
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Complimentary installation and delivery for all premium orders.',
  },
  {
    icon: Zap,
    title: 'Expert Support',
    description: '24/7 customer support from our team of luxury design consultants.',
  },
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 bg-[#f7f5f2] dark:bg-[#0f1219] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: '#785d32' }}
          >
            Why Choose Us
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-3 mb-4 text-[#050a30] dark:text-[#f0ebe3]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Excellence in Every Detail
          </h2>
          <div
            className="w-16 h-1 rounded-full mx-auto"
            style={{ backgroundColor: '#785d32' }}
          />
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="h-16 w-16 rounded-lg flex items-center justify-center mb-4 transition-all group-hover:shadow-lg bg-[#e8d9c4] dark:bg-[#1a2340]">
                  <Icon size={28} className="text-[#050a30] dark:text-[#c4a97e]" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-[#050a30] dark:text-[#f0ebe3]">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-[#9fa8cc] text-sm leading-relaxed">{feature.description}</p>
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                  className="h-1 mt-4 rounded-full"
                  style={{ backgroundColor: '#785d32' }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
