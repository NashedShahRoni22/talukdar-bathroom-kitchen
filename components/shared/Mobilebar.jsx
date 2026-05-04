import { motion } from "framer-motion";
import { X, Search, Sun, Moon, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import logo from "@/public/images/logo.png";
import { useApp } from "@/components/context/AppContext";

export default function Mobilebar({
  menuItems,
  socialLinks,
  pathname,
  setIsOpen,
  onSearchClick,
}) {
  const { isDark, toggleTheme, isAuthenticated } = useApp();

  const isActive = (item) =>
    (item.href === "/" && pathname === "/") ||
    (item.href !== "/" && pathname.startsWith(item.href));

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
      animate={{
        opacity: 1,
        clipPath: "circle(170% at calc(100% - 44px) 44px)",
      }}
      exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-60 flex flex-col md:hidden overflow-hidden bg-gradient-to-b from-[#050a30] to-[#0a0f3d]"
    >
      {/* Header with Logo and Actions */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 shrink-0 border-b border-white/5"
      >
        <Image
          src={logo}
          alt="Talukdar Logo"
          width={100}
          height={48}
          className="object-contain brightness-0 invert w-24 sm:w-32 h-auto"
          priority
        />
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors active:scale-90"
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
                  <Sun size={18} className="text-brand-gold" />
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
                  <Moon size={18} className="text-brand-navy" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Account Button */}
          <Link
            href={isAuthenticated ? "/profile" : "/login"}
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors relative"
            aria-label="Account"
          >
            <UserRound size={18} className="text-white" />
            {isAuthenticated && (
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-brand-gold" />
            )}
          </Link>

          {/* Close Button */}
          <motion.button
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors active:scale-90 ml-2"
            aria-label="Close menu"
          >
            <X size={22} className="text-white" />
          </motion.button>
        </div>
      </motion.header>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/5"
      >
        <motion.button
          onClick={() => {
            setIsOpen(false);
            onSearchClick?.();
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-brand-gold/30 bg-brand-gold/5 hover:bg-brand-gold/10 hover:border-brand-gold/50 transition-all active:scale-95"
        >
          <Search size={18} className="text-brand-gold flex-shrink-0" />
          <span className="text-brand-pale font-medium text-sm sm:text-base">
            Search Products
          </span>
        </motion.button>
      </motion.div>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col overflow-y-auto py-2 px-4 sm:px-6">
        {menuItems.map((item, i) => {
          const active = isActive(item);
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.3 + i * 0.06,
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-3 sm:py-4 px-3 sm:px-4 rounded-lg transition-all ${
                  active
                    ? "bg-brand-gold/15 border-l-2 sm:border-l-3 border-brand-gold"
                    : "hover:bg-white/5 border-l-2 sm:border-l-3 border-transparent"
                }`}
              >
                <span
                  className={`text-xl sm:text-2xl font-bold transition-colors ${
                    active ? "text-brand-pale" : "text-white group-hover:text-brand-pale"
                  }`}
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {item.label}
                </span>
                <motion.span
                  initial={false}
                  animate={{ opacity: active ? 1 : 0, x: active ? 0 : -8 }}
                  transition={{ duration: 0.2 }}
                  className="text-brand-gold text-lg sm:text-xl flex-shrink-0"
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.3 }}
        className="border-t border-white/5 bg-gradient-to-t from-[#0a0f3d] via-[#050a30] to-transparent px-4 sm:px-6 py-4 sm:py-6 shrink-0"
      >
        {/* Social Links */}
        <div className="mb-5 sm:mb-6">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3 sm:mb-4 font-semibold">
            Connect With Us
          </p>
          <div className="flex gap-3 sm:gap-4">
            {socialLinks.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 flex items-center justify-center hover:border-brand-gold hover:bg-brand-gold/15 transition-all"
                aria-label={label}
              >
                <Icon size={16} className="text-white" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-white/30 text-xs leading-relaxed pt-3 sm:pt-4 border-t border-white/5">
          <p>
            &copy; {new Date().getFullYear()} Talukdar Bathroom &amp; Kitchens
          </p>
          <p className="text-white/20 text-xs mt-1">All Rights Reserved.</p>
        </div>
      </motion.footer>
    </motion.div>
  );
}
