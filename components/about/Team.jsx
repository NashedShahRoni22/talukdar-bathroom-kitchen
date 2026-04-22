'use client';

import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const team = [
  {
    name: 'Rajesh Talukdar',
    role: 'Founder & CEO',
    bio: 'Visionary leader with 20+ years in luxury design industry.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    name: 'Priya Sharma',
    role: 'Chief Design Officer',
    bio: 'Award-winning designer specializing in luxury bathroom spaces.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    name: 'Anil Kumar',
    role: 'Head of Operations',
    bio: 'Expert in supply chain and quality assurance systems.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  }
];

export default function Team() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 md:py-32 bg-[#f7f5f2] dark:bg-[#0f1219] transition-colors duration-300">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-[#785d32]">
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4 text-[#050a30] dark:text-[#f0ebe3]" style={{ fontFamily: 'var(--font-playfair)' }}>
            Talented Minds, Passionate Hearts
          </h2>
          <div className="w-16 h-1 rounded-full mx-auto" style={{ backgroundColor: '#785d32' }}></div>
          <p className="text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
            Our diverse team brings together expertise in design, craftsmanship, technology, and customer service.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {team.map((member, index) => (
            <motion.div key={index} variants={itemVariants} className="min-w-0">
              <div className="dark:bg-[#162235] rounded overflow-hidden group h-full">
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050a30]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#050a30] dark:text-[#f0ebe3] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#785d32] mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {member.bio}
                  </p>

                  {/* Social Links (Hover) */}
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href="#" className="p-2 rounded-lg bg-[#e8d9c4] dark:bg-[#2a3550] hover:bg-[#785d32] transition-colors">
                      <Linkedin size={18} className="text-[#050a30] dark:text-[#c4a97e] hover:text-white" />
                    </a>
                    <a href="#" className="p-2 rounded-lg bg-[#e8d9c4] dark:bg-[#2a3550] hover:bg-[#785d32] transition-colors">
                      <Twitter size={18} className="text-[#050a30] dark:text-[#c4a97e] hover:text-white" />
                    </a>
                    <a href="#" className="p-2 rounded-lg bg-[#e8d9c4] dark:bg-[#2a3550] hover:bg-[#785d32] transition-colors">
                      <Mail size={18} className="text-[#050a30] dark:text-[#c4a97e] hover:text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
