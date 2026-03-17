'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ProductCard from '@/components/products/ProductCard';

export default function ProductSection({ title, subtitle, products, id }) {
  const swiperRef = useRef(null);
  const surfaceClass = id === 'kitchens'
    ? 'bg-[#f7f5f2] dark:bg-[#0f1219]'
    : 'bg-white dark:bg-[#111b2d]';

  return (
    <section
      id={id}
      className={`py-12 sm:py-16 lg:py-20 ${surfaceClass} scroll-mt-20 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-10"
        >
          {/* Left: title */}
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#785d32] dark:text-[#c4a97e]">
              {subtitle || 'Premium Collection'}
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 text-[#050a30] dark:text-[#f0ebe3]"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {title}
            </h2>
            <div className="w-14 h-[3px] rounded-full mt-3 bg-[#785d32]" />
          </div>

          {/* Right: nav arrows + View All */}
          <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-auto">
            {/* Prev */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous"
              className="
                w-9 h-9 sm:w-10 sm:h-10 rounded-full
                border border-[#050a30]/20 dark:border-white/20
                flex items-center justify-center
                text-[#050a30] dark:text-white
                bg-white dark:bg-white/5
                hover:bg-[#050a30] hover:text-white hover:border-[#050a30]
                dark:hover:bg-white dark:hover:text-[#050a30]
                active:scale-95
                transition-all duration-200 shadow-sm
              "
            >
              <ChevronLeft size={16} strokeWidth={2.5} className="sm:hidden" />
              <ChevronLeft size={18} strokeWidth={2.5} className="hidden sm:block" />
            </button>

            {/* Next */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next"
              className="
                w-9 h-9 sm:w-10 sm:h-10 rounded-full
                border border-[#050a30]/20 dark:border-white/20
                flex items-center justify-center
                text-[#050a30] dark:text-white
                bg-white dark:bg-white/5
                hover:bg-[#050a30] hover:text-white hover:border-[#050a30]
                dark:hover:bg-white dark:hover:text-[#050a30]
                active:scale-95
                transition-all duration-200 shadow-sm
              "
            >
              <ChevronRight size={16} strokeWidth={2.5} className="sm:hidden" />
              <ChevronRight size={18} strokeWidth={2.5} className="hidden sm:block" />
            </button>

            {/* View All */}
            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.96 }}
              className="
                cursor-pointer
                px-4 py-2 sm:px-7 sm:py-2.5
                rounded-lg font-semibold text-sm sm:text-base text-white
                inline-flex items-center gap-1.5 sm:gap-2
                bg-[#050a30] dark:bg-[#785d32]
                hover:bg-[#785d32] dark:hover:bg-[#a07840]
                transition-colors duration-200
              "
            >
              <span className="hidden xs:inline">View All</span>
              <span className="xs:hidden">All</span>
              <ArrowRight size={16} className="sm:hidden" />
              <ArrowRight size={18} className="hidden sm:block" />
            </motion.button>
          </div>
        </motion.div>

        {/* ── Slider ── */}
        <Swiper
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          modules={[Autoplay, Pagination]}
          spaceBetween={12}
          slidesPerView={1.2}
          centeredSlides={false}
          pagination={{ clickable: true, el: '#product-pagination' }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          breakpoints={{
            480:  { slidesPerView: 2,   spaceBetween: 16 },
            640:  { slidesPerView: 2.5, spaceBetween: 20 },
            768:  { slidesPerView: 3,   spaceBetween: 20 },
            1024: { slidesPerView: 3,   spaceBetween: 24 },
            1280: { slidesPerView: 4,   spaceBetween: 24 },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={`${product.id}-${index}`} className='pb-2'>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination dots */}
        <div id="product-pagination" className="flex justify-center gap-1.5 mt-5 sm:mt-6" />

      </div>
    </section>
  );
}