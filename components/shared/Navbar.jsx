'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, Sun, Moon, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/public/images/logo.png';
import logoWhite from '@/public/images/logo-white.png';
import { useApp } from '@/components/context/AppContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled;
  const { cartCount, toggleCart, isDark, toggleTheme } = useApp();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Youtube, href: '#', label: 'YouTube' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent border-b border-transparent shadow-none'
            : 'bg-white dark:bg-[#0a0f2e] border-b border-gray-100 dark:border-[#1c2444] shadow-sm dark:shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src={isTransparent ? logoWhite : isDark ? logoWhite : logo}
                alt="Talukdar Logo"
                width={140}
                height={70}
                className="object-contain transition-all"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-9">
              {menuItems.map((item) => {
                const isActive = 
                  (item.href === '/' && pathname === '/') ||
                  (item.href.startsWith('/') && pathname === item.href);
                
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-base font-medium transition-all duration-200 relative pb-1 ${
                      isTransparent ? 'text-white' : 'text-brand-navy dark:text-brand-pale'
                    } ${isActive ? 'text-[#c4a97e]' : 'hover:text-[#c4a97e]'}`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c4a97e]"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`cursor-pointer p-2.5 rounded-xl transition-colors ${
                    isTransparent ? 'hover:bg-white/10' : 'hover:bg-gray-100 dark:hover:bg-[#1a2340]'
                  }`}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.span
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      <Sun size={19} className="text-[#e8d9c4]" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      <Moon size={19} className={isTransparent ? 'text-white' : 'text-brand-navy'} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className={`cursor-pointer p-2.5 rounded-xl transition-colors relative ${
                    isTransparent ? 'hover:bg-white/10' : 'hover:bg-gray-100 dark:hover:bg-[#1a2340]'
                  }`}
                aria-label="Open cart"
              >
                <ShoppingCart size={19} className={isTransparent ? 'text-white' : 'text-brand-navy dark:text-brand-pale'} />
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
                className={`md:hidden cursor-pointer p-2.5 rounded-xl transition-colors ${
                    isTransparent ? 'hover:bg-white/10' : 'hover:bg-gray-100 dark:hover:bg-[#1a2340]'
                  }`}
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} className={isTransparent ? 'text-white' : 'text-brand-navy dark:text-brand-pale'} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ opacity: 1, clipPath: 'circle(170% at calc(100% - 44px) 44px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col md:hidden overflow-hidden"
            style={{ backgroundColor: '#050a30' }}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-5 shrink-0">
              <Image
                src={logo}
                alt="Talukdar Logo"
                width={120}
                height={56}
                className="object-contain brightness-0 invert"
              />
              <motion.button
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer p-3 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X size={26} color="white" />
              </motion.button>
            </div>

            {/* Gold Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="h-px mx-6 origin-left shrink-0"
              style={{ backgroundColor: '#785d32' }}
            />

            {/* Menu Items */}
            <div className="flex-1 flex flex-col justify-center px-8 overflow-hidden">
              {menuItems.map((item, i) => {
                const isActive = 
                  (item.href === '/' && pathname === '/') ||
                  (item.href.startsWith('/') && pathname === item.href);
                
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between py-4 border-b transition-all ${
                        isActive 
                          ? 'border-[#785d32] text-[#e8d9c4]' 
                          : 'border-white/10 hover:border-[#785d32]/60'
                      }`}
                    >
                      <span
                        className={`text-3xl font-bold transition-colors ${
                          isActive 
                            ? 'text-[#e8d9c4]' 
                            : 'text-white group-hover:text-[#e8d9c4]'
                        }`}
                        style={{ fontFamily: 'var(--font-playfair)' }}
                      >
                        {item.label}
                      </span>
                      <span className={`text-xl transition-opacity ${
                        isActive 
                          ? 'text-[#785d32] opacity-100' 
                          : 'text-[#785d32] opacity-0 group-hover:opacity-100'
                      }`}>
                        →
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom: Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="px-8 pb-10 pt-6 border-t border-white/10 shrink-0"
            >
              <p className="text-white/40 text-xs uppercase tracking-widest mb-5">Follow Us</p>
              <div className="flex gap-4 mb-6">
                {socialLinks.map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:border-[#785d32] hover:bg-[#785d32]/20 transition-all"
                    aria-label={label}
                  >
                    <Icon size={18} color="white" />
                  </motion.a>
                ))}
              </div>
              <p className="text-white/30 text-xs">
                &copy; {new Date().getFullYear()} Talukdar Bathroom &amp; Kitchens
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
