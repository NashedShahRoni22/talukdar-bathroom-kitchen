"use client";

import { motion } from "framer-motion";

export default function OrderCardSkeleton({ index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.45, 0.75, 0.45] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.05 }}
      className="rounded border border-[#e8dfd1] dark:border-[#1c2444] bg-white dark:bg-[#0e1430] p-5 sm:p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-3 w-24 rounded-full bg-[#ece3d5] dark:bg-[#1c2444]" />
          <div className="h-5 w-44 rounded-full bg-[#ece3d5] dark:bg-[#1c2444]" />
        </div>
        <div className="h-4 w-28 rounded-full bg-[#ece3d5] dark:bg-[#1c2444]" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="h-7 w-28 rounded-full bg-[#ece3d5] dark:bg-[#1c2444]" />
        <div className="h-4 w-40 rounded-full bg-[#ece3d5] dark:bg-[#1c2444]" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-[#eee4d4] bg-[#faf8f5] p-4 dark:border-[#1c2444] dark:bg-[#09102a]">
          <div className="h-4 w-28 rounded-full bg-[#ece3d5] dark:bg-[#1c2444]" />
          <div className="mt-4 space-y-3">
            <div className="h-20 rounded-xl bg-white shadow-sm dark:bg-[#0e1430]" />
            <div className="h-20 rounded-xl bg-white shadow-sm dark:bg-[#0e1430]" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-40 rounded-2xl border border-[#eee4d4] bg-[#faf8f5] dark:border-[#1c2444] dark:bg-[#09102a]" />
          <div className="h-40 rounded-2xl border border-[#eee4d4] bg-[#faf8f5] dark:border-[#1c2444] dark:bg-[#09102a]" />
        </div>
      </div>
    </motion.div>
  );
}
