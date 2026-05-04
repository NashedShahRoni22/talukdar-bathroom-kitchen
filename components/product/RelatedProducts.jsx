"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "@/components/products/ProductCard";

export default function RelatedProducts({ products }) {
  const swiperRef = useRef(null);

  if (!products || products.length === 0) return null;

  return (
    <section className="mt-12 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6"
      >
        <div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#050a30] dark:text-[#f0ebe3]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Related Products
          </h2>
          <div className="w-14 h-[3px] rounded-full mt-2 bg-[#785d32]" />
        </div>

        {/* nav arrows */}
        <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-auto">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous"
            className="
              w-9 h-9 rounded-full
              border border-[#050a30]/20 dark:border-white/20
              flex items-center justify-center
              text-[#050a30] dark:text-white
              bg-white dark:bg-white/5
              hover:bg-[#050a30] hover:text-white hover:border-[#050a30]
              dark:hover:bg-white dark:hover:text-[#050a30]
              active:scale-95
              transition-all duration-200
              cursor-pointer
            "
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next"
            className="
              w-9 h-9 rounded-full
              border border-[#050a30]/20 dark:border-white/20
              flex items-center justify-center
              text-[#050a30] dark:text-white
              bg-white dark:bg-white/5
              hover:bg-[#050a30] hover:text-white hover:border-[#050a30]
              dark:hover:bg-white dark:hover:text-[#050a30]
              active:scale-95
              transition-all duration-200
              cursor-pointer
            "
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </motion.div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Autoplay, Pagination]}
        spaceBetween={12}
        slidesPerView={1.2}
        centeredSlides={false}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={products.length > 4}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 16 },
          640: { slidesPerView: 2.5, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1280: { slidesPerView: 4, spaceBetween: 24 },
        }}
        className="pb-2 product-swiper"
      >
        {products.map((p, index) => (
          <SwiperSlide key={`${p.id}-${index}`} className="!h-auto pb-4">
            <ProductCard p={p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}