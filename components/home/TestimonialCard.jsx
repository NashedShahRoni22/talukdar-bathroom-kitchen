import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function TestimonialCard({ testimonial, isActive }) {
  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : 0.45,
        y: isActive ? 0 : 12,
      }}
      transition={{ duration: 0.4 }}
      className="
        relative rounded-2xl overflow-hidden
        bg-[#f7f5f0] dark:bg-[#0a0f2e]
        border border-[#e8e0d0] dark:border-[#1c2444]
        p-6 sm:p-8 md:p-10
      "
    >
      {/* Gold accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#785d32] to-transparent" />

      {/* Large quote icon */}
      <Quote
        size={48}
        strokeWidth={1}
        className="absolute top-6 right-6 text-[#785d32] opacity-10"
      />

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center">
        {/* Avatar column */}
        <div className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-3 sm:w-32 shrink-0">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-4 ring-[#785d32]/20">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
              quality={90}
            />
          </div>
          <div className="sm:text-center">
            <p className="font-bold text-sm sm:text-base text-[#050a30] dark:text-[#f0ebe3] leading-tight">
              {testimonial.name}
            </p>
            <p className="text-xs font-semibold text-[#785d32] dark:text-[#c4a97e] mt-0.5">
              {testimonial.designation}
            </p>
            <p className="text-xs text-gray-500 dark:text-[#9fa8cc]">
              {testimonial.company}
            </p>
            <div className="flex gap-0.5 mt-2 sm:justify-center">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-sm text-[#785d32]">
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px self-stretch bg-[#785d32]/15" />

        {/* Quote text */}
        <div className="flex-1 min-w-0">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-[#c4b89a] leading-relaxed italic">
            &ldquo;{testimonial.comment}&rdquo;
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="h-[2px] rounded-full mt-6 bg-[#785d32]"
          />
        </div>
      </div>
    </motion.div>
  );
}
