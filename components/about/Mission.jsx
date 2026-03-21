'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Mission() {
  return (
    <section className="py-20 md:py-32 bg-white dark:bg-[#111b2d] transition-colors duration-300">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="min-w-0"
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-[#785d32]">
              Who We Are
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6 text-[#050a30] dark:text-[#f0ebe3]" style={{ fontFamily: 'var(--font-playfair)' }}>
              Our Mission
            </h2>
            <div className="w-16 h-1 rounded-full mb-8" style={{ backgroundColor: '#785d32' }}></div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              At Talukdar, our mission is to revolutionize the way people experience their living spaces. We believe that bathrooms and kitchens are not just functional areas—they are personal sanctuaries where moments of peace, luxury, and family memories are created.
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              We are committed to providing premium fixtures and design solutions that combine timeless elegance with modern functionality. Every product in our collection is carefully curated to ensure that your spaces reflect your unique style and aspirations.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: '#785d32' }}></div>
                <div>
                  <h4 className="font-bold text-[#050a30] dark:text-[#f0ebe3] mb-1">Excellence</h4>
                  <p className="text-gray-600 dark:text-gray-400">Uncompromising quality in every product and service we deliver</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: '#785d32' }}></div>
                <div>
                  <h4 className="font-bold text-[#050a30] dark:text-[#f0ebe3] mb-1">Innovation</h4>
                  <p className="text-gray-600 dark:text-gray-400">Bringing cutting-edge design and technology to your spaces</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: '#785d32' }}></div>
                <div>
                  <h4 className="font-bold text-[#050a30] dark:text-[#f0ebe3] mb-1">Sustainability</h4>
                  <p className="text-gray-600 dark:text-gray-400">Crafting products that are beautiful, durable, and eco-conscious</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=700&fit=crop"
              alt="Luxury Bathroom"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050a30]/30 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
