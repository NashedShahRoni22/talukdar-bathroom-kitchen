'use client';

import { motion } from 'framer-motion';
import { Heart, Zap, Shield, Target, Users, Leaf } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Quality Craftsmanship',
    description: 'Each product is handpicked and rigorously tested to meet our strict standards of excellence.',
  },
  {
    icon: Zap,
    title: 'Innovation First',
    description: 'We stay ahead of design trends, blending timeless aesthetics with modern technology.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'Your satisfaction is our priority. We listen, adapt, and deliver beyond expectations.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'We care for the environment by choosing eco-friendly materials and processes.',
  },
  {
    icon: Shield,
    title: 'Reliability',
    description: 'With lifetime warranties and 24/7 support, we stand by our products forever.',
  },
  {
    icon: Target,
    title: 'Precision',
    description: 'Every detail is meticulously designed for perfect functionality and aesthetics.',
  },
];

export default function Values() {
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
    <section className="py-20 md:py-32 bg-[#f7f5f2] dark:bg-[#0f1219] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-[#785d32]">
            Core Values
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4 text-[#050a30] dark:text-[#f0ebe3]" style={{ fontFamily: 'var(--font-playfair)' }}>
            What Drives Us
          </h2>
          <div className="w-16 h-1 rounded-full mx-auto" style={{ backgroundColor: '#785d32' }}></div>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-white dark:bg-[#162235] rounded-lg p-8 h-full shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#785d32]">
                  <div className="h-16 w-16 rounded-lg flex items-center justify-center mb-6 transition-all bg-[#e8d9c4] dark:bg-[#2a3550] group-hover:bg-[#785d32]">
                    <Icon size={32} className="text-[#050a30] dark:text-[#c4a97e] group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-[#050a30] dark:text-[#f0ebe3]">
                    {value.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
