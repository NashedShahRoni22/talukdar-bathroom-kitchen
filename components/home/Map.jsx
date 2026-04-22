'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Map() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-[#111b2d] scroll-mt-20 transition-colors duration-300">
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
            Get in Touch
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-3 mb-4 text-[#050a30] dark:text-[#f0ebe3]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Visit Our Showroom
          </h2>
          <div
            className="w-16 h-1 rounded-full mx-auto"
            style={{ backgroundColor: '#785d32' }}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Map */}
          <motion.div
            variants={itemVariants}
            className="rounded overflow-hidden h-96 md:h-full min-h-96"
          >
            <iframe
              width="100%"
              height="100%"
              frameBorder={0}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1234567890"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            {/* Address */}
            <div className="flex gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: '#050a30' }}
              >
                <MapPin size={24} />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-[#050a30] dark:text-[#f0ebe3]">
                  Our Showroom
                </h3>
                <p className="text-gray-600 dark:text-[#9fa8cc]">
                  123 Design Street<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: '#785d32' }}
              >
                <Phone size={24} />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-[#050a30] dark:text-[#f0ebe3]">
                  Phone
                </h3>
                <p className="text-gray-600 dark:text-[#9fa8cc]">
                  +1 (555) 123-4567<br />
                  +1 (555) 987-6543
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: '#050a30' }}
              >
                <Mail size={24} />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-[#050a30] dark:text-[#f0ebe3]">
                  Email
                </h3>
                <p className="text-gray-600 dark:text-[#9fa8cc]">
                  info@talukdar.com<br />
                  support@talukdar.com
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: '#785d32' }}
              >
                <Clock size={24} />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-[#050a30] dark:text-[#f0ebe3]">
                  Hours
                </h3>
                <p className="text-gray-600 dark:text-[#9fa8cc]">
                  Monday - Friday: 10 AM - 6 PM<br />
                  Saturday: 11 AM - 5 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
