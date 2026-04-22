'use client';

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavCategory from "./NavCategory";
import NavRoom from "./NavRoom";
import NavBrand from "./NavBrand";

export default function MegaMenu() {
  const [activeTab, setActiveTab] = useState(0);

  const TabButtons = [
    {
      label: "All Category",
      href: "/products/category/bathroom-collection",
      component: NavCategory,
    },
    {
      label: "Shop By Room",
      href: "/best-selling",
      component: NavRoom,
    },
    {
      label: "Shop By Brand",
      href: "/new-arrivals",
      component: NavBrand,
    },
  ];

  const ActiveComponent = TabButtons[activeTab].component;

  return (
    <div className="bg-white dark:bg-[#0f1219] flex gap-16 h-[50vh] overflow-y-auto rounded">
      {/* tab buttons  */}
      <div className="flex flex-col">
        {TabButtons.map((button, index) => (
          <motion.button
            key={button.label}
            onClick={() => setActiveTab(index)}
            className={`py-3 px-4 flex justify-between items-center relative transition-colors duration-200 ${
              activeTab === index
                ? "text-[#050a30] dark:text-[#f0ebe3] bg-white dark:bg-[#1a2340]"
                : "text-[#050a30]/60 dark:text-[#f0ebe3]/60 hover:bg-gray-100 dark:hover:bg-[#1a2340]"
            }`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-medium text-sm">{button.label}</span>
            <motion.span
              animate={{ opacity: activeTab === index ? 1 : 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight
                className={`w-4 h-4 inline-block ml-2 transition-transform duration-200 ${
                  activeTab === index ? "translate-x-1" : ""
                }`}
              />
            </motion.span>

            {/* active indicator */}
            {activeTab === index && (
              <motion.div
                layoutId="active-indicator"
                className="absolute left-0 top-0 bottom-0 w-1 bg-[#785d32]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      <motion.div
        className="h-full w-0.5 bg-[#c4a97e]"
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* tab content  */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
