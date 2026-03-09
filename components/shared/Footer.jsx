'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from "@/public/images/logo-white.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
  };

  return (
    <footer style={{ backgroundColor: '#050a30' }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={footerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Image
              src={logo}
              alt="Talukdar Logo"
              width={160}
              height={80}
              className="object-contain mb-4"
            />
            <p className="text-gray-300 text-sm">
              Transform your spaces with premium bathrooms and kitchens. Luxury design meets craftsmanship.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Bathrooms', 'Kitchens', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {['Vanities', 'Faucets', 'Cabinets', 'Fixtures', 'Accessories'].map((product) => (
                <li key={product}>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <Phone size={16} style={{ color: '#785d32' }} />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} style={{ color: '#785d32' }} />
                <span className="text-gray-300 text-sm">info@talukdar.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} style={{ color: '#785d32' }} />
                <span className="text-gray-300 text-sm">123 Design St., NYC</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  variants={iconVariants}
                  whileHover={{ scale: 1.2 }}
                  className="p-2 rounded-lg transition-colors"
                  style={{ backgroundColor: '#785d32' }}
                  title={label}
                >
                  <Icon size={18} className="text-white" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} Talukdar. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
