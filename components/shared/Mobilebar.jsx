import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.png";

export default function Mobilebar({
  menuItems,
  socialLinks,
  pathname,
  setIsOpen,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
      animate={{
        opacity: 1,
        clipPath: "circle(170% at calc(100% - 44px) 44px)",
      }}
      exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-60 flex flex-col md:hidden overflow-hidden"
      style={{ backgroundColor: "#050a30" }}
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
        style={{ backgroundColor: "#785d32" }}
      />

      {/* Menu Items */}
      <div className="flex-1 flex flex-col justify-center px-8 overflow-hidden">
        {menuItems.map((item, i) => {
          const isActive =
            (item.href === "/" && pathname === "/") ||
            (item.href.startsWith("/") && pathname === item.href);

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.15 + i * 0.08,
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center justify-between py-4 border-b transition-all ${
                  isActive
                    ? "border-brand-gold text-brand-pale"
                    : "border-white/10 hover:border-brand-gold/60"
                }`}
              >
                <span
                  className={`text-3xl font-bold transition-colors ${
                    isActive
                      ? "text-brand-pale"
                      : "text-white group-hover:text-brand-pale"
                  }`}
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {item.label}
                </span>
                <span
                  className={`text-xl transition-opacity ${
                    isActive
                      ? "text-brand-gold opacity-100"
                      : "text-brand-gold opacity-0 group-hover:opacity-100"
                  }`}
                >
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
        <p className="text-white/40 text-xs uppercase tracking-widest mb-5">
          Follow Us
        </p>
        <div className="flex gap-4 mb-6">
          {socialLinks.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:border-brand-gold hover:bg-brand-gold/20 transition-all"
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
  );
}
