'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Homeowner',
    company: 'Manhattan',
    content:
      'The quality and elegance of Talukdar products transformed our bathroom into a spa-like sanctuary. The attention to detail is remarkable!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&q=90',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Interior Designer',
    company: 'Chen Design Studio',
    content:
      'Working with Talukdar has been seamless. Their luxury collection perfectly elevates any modern kitchen design.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&q=90',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Williams',
    role: 'Real Estate Developer',
    company: 'Premium Properties Inc',
    content:
      'Talukdar fixtures are our go-to choice for high-end properties. Clients consistently praise the luxury aesthetic and durability.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop&q=90',
    rating: 5,
  },
  {
    id: 4,
    name: 'James Rivera',
    role: 'Architect',
    company: 'Rivera & Partners',
    content:
      'Unmatched craftsmanship. Every piece integrates flawlessly into our architectural visions. Talukdar is our only recommendation for luxury builds.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&q=90',
    rating: 5,
  },
];

export default function Testimonials() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Trusted by Luxury<br className="hidden sm:block" /> Enthusiasts
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

        {/* ── Swiper ── */}
        <Swiper
          onSwiper={(s) => { swiperRef.current = s; }}
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
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0.45, y: isActive ? 0 : 12 }}
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
                        <Image src={t.image} alt={t.name} fill className="object-cover" quality={90} />
                      </div>
                      <div className="sm:text-center">
                        <p className="font-bold text-sm sm:text-base text-[#050a30] dark:text-[#f0ebe3] leading-tight">
                          {t.name}
                        </p>
                        <p className="text-xs font-semibold text-[#785d32] dark:text-[#c4a97e] mt-0.5">
                          {t.role}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-[#9fa8cc]">{t.company}</p>
                        <div className="flex gap-0.5 mt-2 sm:justify-center">
                          {[...Array(t.rating)].map((_, i) => (
                            <span key={i} className="text-sm text-[#785d32]">★</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block w-px self-stretch bg-[#785d32]/15" />

                    {/* Quote text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-[#c4b89a] leading-relaxed italic">
                        &ldquo;{t.content}&rdquo;
                      </p>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '4rem' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="h-[2px] rounded-full mt-6 bg-[#785d32]"
                      />
                    </div>
                  </div>
                </motion.div>
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
                backgroundColor: i === activeIndex ? '#785d32' : '#d1d5db',
              }}
            />
          ))}
        </div>

        {/* ── Trust indicator ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-gray-500 dark:text-[#9fa8cc] mt-8"
        >
          Trusted by{' '}
          <span className="font-bold text-[#050a30] dark:text-[#f0ebe3]">500+</span>{' '}
          satisfied customers worldwide
        </motion.p>

      </div>
    </section>
  );
}