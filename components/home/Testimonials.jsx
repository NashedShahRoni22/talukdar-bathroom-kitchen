"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { useGetData } from "../helpers/useGetData";
import TestimonialCard from "./TestimonialCard";
import TestimonialCardSkeleton from "./TestimonialCardSkeleton";

export default function Testimonials() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: testimonialsData, isLoading } = useGetData(
    "testimonials",
    {},
    { staleTime: 10 * 60 * 1000, gcTime: 15 * 60 * 1000, retry: 1 },
  );
  const testimonials = testimonialsData?.data || [];
  const skeletonItems = [1, 2];

  return (
    <section className="relative py-16 md:py-24 bg-white dark:bg-[#111b2d] overflow-hidden transition-colors duration-300">
      {/* ── Decorative blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-[0.06] bg-[#785d32] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-[0.06] bg-[#050a30] dark:opacity-[0.15] blur-3xl" />
        {/* top-right quote watermark */}
        <Quote
          size={320}
          className="absolute -top-8 -right-8 opacity-[0.03] dark:opacity-[0.04] text-[#785d32]"
          strokeWidth={1}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14"
        >
          <div>
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#785d32] dark:text-[#c4a97e]">
              Testimonials
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 text-[#050a30] dark:text-[#f0ebe3]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Trusted by Luxury
              <br className="hidden sm:block" /> Enthusiasts
            </h2>
            <div className="w-14 h-[3px] rounded-full mt-4 bg-[#785d32]" />
          </div>

          {/* Nav controls */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous"
              className="
                w-10 h-10 rounded-full flex items-center justify-center
                border border-[#050a30]/20 dark:border-white/20
                text-[#050a30] dark:text-white bg-white dark:bg-white/5
                hover:bg-[#050a30] hover:text-white hover:border-[#050a30]
                dark:hover:bg-white dark:hover:text-[#050a30]
                active:scale-95 transition-all duration-200 shadow-sm
              "
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next"
              className="
                w-10 h-10 rounded-full flex items-center justify-center
                border border-[#050a30]/20 dark:border-white/20
                text-[#050a30] dark:text-white bg-white dark:bg-white/5
                hover:bg-[#050a30] hover:text-white hover:border-[#050a30]
                dark:hover:bg-white dark:hover:text-[#050a30]
                active:scale-95 transition-all duration-200 shadow-sm
              "
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </motion.div>

        {isLoading ? (
          <>
            {/* Testimonials skeleton cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {skeletonItems.map((item) => (
                <TestimonialCardSkeleton key={item} />
              ))}
            </div>
          </>
        ) : testimonials.length ? (
          <>
            {/* ── Swiper ── */}
            <Swiper
              onSwiper={(s) => {
                swiperRef.current = s;
              }}
              onSlideChange={(s) => setActiveIndex(s.realIndex)}
              modules={[Autoplay, Pagination, EffectCoverflow]}
              effect="coverflow"
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 80,
                modifier: 2.5,
                slideShadows: false,
              }}
              centeredSlides
              slidesPerView={1}
              spaceBetween={24}
              loop
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              breakpoints={{
                768: { slidesPerView: 1.4 },
                1024: { slidesPerView: 1.6 },
              }}
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id}>
                  {({ isActive }) => (
                    <TestimonialCard testimonial={t} isActive={isActive} />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* ── Dot indicators ── */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width: i === activeIndex ? 32 : 8,
                    backgroundColor: i === activeIndex ? "#785d32" : "#d1d5db",
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-sm text-gray-500 dark:text-[#9fa8cc] mt-8">
            Testimonials are not available right now. Please check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
