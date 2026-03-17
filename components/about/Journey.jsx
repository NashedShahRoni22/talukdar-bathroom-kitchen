'use client';

import { motion } from 'framer-motion';

const milestones = [
  {
    year: '2010',
    title: 'The Beginning',
    description: 'Founded with a vision to transform bathroom and kitchen spaces into luxury sanctuaries.',
  },
  {
    year: '2015',
    title: 'Expansion',
    description: 'Expanded product range to include premium kitchen fixtures and innovative designs.',
  },
  {
    year: '2018',
    title: 'Award Recognition',
    description: 'Recognized as Best Luxury Fixtures Provider with multiple industry awards.',
  },
  {
    year: '2021',
    title: 'Digital Revolution',
    description: 'Launched online platform and virtual design consultation services nationwide.',
  },
  {
    year: '2023',
    title: 'Sustainability Focus',
    description: 'Committed to eco-friendly practices and sustainable manufacturing processes.',
  },
  {
    year: '2024',
    title: 'Innovation Hub',
    description: 'Opened innovation labs focusing on next-generation smart fixtures and designs.',
  },
];

export default function Journey() {
  return (
    <section className="py-20 md:py-32 bg-white dark:bg-[#111b2d] transition-colors duration-300">
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
            Our Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4 text-[#050a30] dark:text-[#f0ebe3]" style={{ fontFamily: 'var(--font-playfair)' }}>
            From Vision to Reality
          </h2>
          <div className="w-16 h-1 rounded-full mx-auto" style={{ backgroundColor: '#785d32' }}></div>
        </motion.div>

        {/* Timeline */}
        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Vertical Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#785d32] via-[#c4a97e] to-[#785d32]"></div>

          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`md:w-full ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:col-start-2 md:pl-16'}`}
            >
              {/* Timeline Dot */}
              <div className="hidden md:flex absolute left-1/2 top-4 -translate-x-1/2 items-center justify-center">
                <div className="w-6 h-6 rounded-full border-4 border-white dark:border-[#111b2d] bg-[#785d32]"></div>
              </div>

              {/* Content */}
              <div className="bg-[#f9f9f9] dark:bg-[#162235] p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-l-4" style={{ borderColor: '#785d32' }}>
                <span className="text-sm font-bold uppercase tracking-wider text-[#785d32]">
                  {milestone.year}
                </span>
                <h3 className="text-2xl font-bold mt-2 mb-3 text-[#050a30] dark:text-[#f0ebe3]">
                  {milestone.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
