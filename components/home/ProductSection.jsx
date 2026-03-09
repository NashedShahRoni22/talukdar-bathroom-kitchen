'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';

export default function ProductSection({ title, subtitle, products, id }) {
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

  return (
    <section id={id} className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: '#785d32' }}
          >
            {subtitle || 'Premium Collection'}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-3 mb-4"
            style={{ color: '#050a30', fontFamily: 'var(--font-playfair)' }}
          >
            {title}
          </h2>
          <div
            className="w-16 h-1 rounded-full mx-auto"
            style={{ backgroundColor: '#785d32' }}
          />
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg font-semibold text-white inline-flex items-center gap-2 transition-all"
            style={{ backgroundColor: '#050a30' }}
          >
            View All Products
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
