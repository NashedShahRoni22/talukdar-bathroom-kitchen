'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10"
        style={{ backgroundColor: '#785d32' }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10"
        style={{ backgroundColor: '#050a30' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span
            className="text-sm font-semibold tracking-widest uppercase inline-block mb-4"
            style={{ color: '#785d32' }}
          >
            Ready to Transform Your Space?
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: '#050a30', fontFamily: 'var(--font-playfair)' }}
          >
            Schedule Your Free Consultation
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let our luxury design consultants help you create the bathroom or kitchen of your
            dreams. Expert guidance, premium products, exceptional results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg font-semibold text-white text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-2xl"
              style={{ backgroundColor: '#050a30' }}
            >
              <Calendar size={20} />
              Book Consultation
              <ArrowRight size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg font-semibold border-2 text-lg transition-all hover:shadow-lg"
              style={{
                borderColor: '#785d32',
                color: '#050a30',
                backgroundColor: '#e8d9c4',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#785d32')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e8d9c4')}
            >
              View Catalog
            </motion.button>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-sm"
          >
            {['Free Consultation', 'Expert Design Team', 'Luxury Guarantee'].map((badge, i) => (
              <div key={i} className="flex items-center gap-2" style={{ color: '#050a30' }}>
                <span className="font-bold" style={{ color: '#785d32' }}>
                  ✓
                </span>
                {badge}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
