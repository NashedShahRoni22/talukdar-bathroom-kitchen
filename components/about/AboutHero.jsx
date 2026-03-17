'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop',
    title: 'Luxury Bathrooms',
  },
  {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    title: 'Modern Kitchens',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    title: 'Elegant Spaces',
  },
];

export default function AboutHero() {
  const swiperRef = useRef(null);

  return (
    <section className="relative bg-[#f7f5f2] dark:bg-[#0f1219] text-[#050a30] dark:text-white overflow-hidden pt-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-20 left-10 w-80 h-80 bg-[#785d32] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#c4a97e] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center py-12 md:py-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-semibold tracking-widest uppercase text-[#785d32] flex items-center gap-2 justify-center md:justify-start"
            >
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.span>
              Our Story
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold mt-4 mb-6 text-[#050a30] dark:text-white leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Crafting Luxury, <br /> Creating Sanctuaries
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-700 dark:text-[#e8d9c4] max-w-2xl mb-8 font-light"
            >
              Discover how Talukdar transforms spaces into works of art with premium bathroom and kitchen fixtures that define luxury living.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(120, 93, 50, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-[#785d32] hover:bg-[#6a5028] text-white font-semibold rounded-lg transition-all duration-300"
              >
                Explore Products
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, borderColor: '#c4a97e' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-[#c4a97e] text-[#c4a97e] hover:bg-[#c4a97e] hover:text-[#050a30] font-semibold rounded-lg transition-all duration-300"
              >
                Contact Us
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Swiper Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex items-center justify-center"
          >
            <div className="relative w-full flex justify-center">
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                centeredSlidesBounds={true}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={{
                  el: '.swiper-pagination',
                  clickable: true,
                  dynamicBullets: true,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                className="w-full flex justify-center"
                style={{ maxWidth: '500px' }}
              >
                {heroImages.map((image, index) => (
                  <SwiperSlide key={index} style={{ width: '450px' }}>
                    <motion.div
                      className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-2xl mx-auto"
                    >
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050a30]/60 to-transparent flex items-end p-6">
                        <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
                          {image.title}
                        </h3>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Arrows */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 p-3 rounded-full bg-[#785d32] hover:bg-[#6a5028] text-white transition-all duration-300 shadow-lg dark:bg-[#785d32] dark:hover:bg-[#c4a97e]"
                aria-label="Previous slide"
              >
                <ChevronLeft size={28} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 p-3 rounded-full bg-[#785d32] hover:bg-[#6a5028] text-white transition-all duration-300 shadow-lg dark:bg-[#785d32] dark:hover:bg-[#c4a97e]"
                aria-label="Next slide"
              >
                <ChevronRight size={28} />
              </motion.button>

              {/* Pagination Dots */}
              <div className="swiper-pagination absolute bottom-0 left-1/2 -translate-x-1/2 pt-8"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <ArrowDown size={24} className="text-[#785d32] dark:text-[#c4a97e]" />
      </motion.div>

      {/* Custom Swiper Pagination Styles */}
      <style jsx>{`
        :global(.swiper-pagination-bullet) {
          background-color: #785d32 !important;
          width: 10px !important;
          height: 10px !important;
          opacity: 0.6 !important;
          margin: 0 6px !important;
        }

        :global(.dark .swiper-pagination-bullet) {
          background-color: #c4a97e !important;
        }

        :global(.swiper-pagination-bullet-active) {
          opacity: 1 !important;
          background-color: #6a5028 !important;
        }

        :global(.dark .swiper-pagination-bullet-active) {
          background-color: #f0ebe3 !important;
        }
      `}</style>
    </section>
  );
}
