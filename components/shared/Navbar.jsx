'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from "@/public/images/logo.png";
import { useApp } from '@/components/context/AppContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, toggleCart } = useApp();

  const menuItems = [
    { label: 'Home', href: '#' },
    { label: 'Bathrooms', href: '#bathrooms' },
    { label: 'Kitchens', href: '#kitchens' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="fixed top-0 w-full z-50 bg-white shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex justify-between items-center">
          {/* Logo for mobile */}
          <Link href="/" className="flex items-center gap-2 md:hidden">
            <Image
              src={logo}
              alt="Talukdar Logo"
              width={120}
              height={60}
              className="object-contain"
            />
          </Link>

          {/* Logo for desktop */}
          <Link href="/" className="hidden md:flex items-center gap-2">
            <Image
              src={logo}
              alt="Talukdar Logo"
              width={160}
              height={80}
              className="object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm"
                style={{ color: '#050a30' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#785d32')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#050a30')}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search size={20} style={{ color: '#050a30' }} />
            </button>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              aria-label="Open cart"
            >
              <ShoppingCart size={20} style={{ color: '#050a30' }} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                  style={{ backgroundColor: '#785d32' }}
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X size={24} style={{ color: '#050a30' }} />
              ) : (
                <Menu size={24} style={{ color: '#050a30' }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
          variants={menuVariants}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
