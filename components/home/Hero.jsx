'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    title: 'Smart Kitchens',
    subtitle: 'Transform your spaces with premium design and exceptional craftsmanship',
    bg: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&h=900&fit=crop',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&h=880&fit=crop',
  },
  {
    title: 'Luxury Bathrooms',
    subtitle: 'Elegant fixtures and timeless designs for your perfect sanctuary',
    bg: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&h=900&fit=crop',
    img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700&h=880&fit=crop',
  },
  {
    title: 'Modern Designs',
    subtitle: 'Where contemporary style meets functional excellence',
    bg: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1600&h=900&fit=crop',
    img: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=700&h=880&fit=crop',
  },
  {
    title: 'Elegant Spaces',
    subtitle: 'Redefining luxury living with timeless craftsmanship',
    bg: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&h=900&fit=crop',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&h=880&fit=crop',
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* ─── Desktop: Stacked background images (opacity-transition) ─── */}
      <div className="hidden md:block absolute inset-0 z-0">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          >
            <Image
              src={slide.bg}
              alt={slide.title}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
            {/* Left-heavy dark gradient so text stays readable */}
            <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/10" />
          </div>
        ))}
      </div>

      {/* ─── Desktop layout ─── */}
      <div className="hidden md:flex relative z-10 h-full pt-16">

        {/* Left: Text */}
        <div className="flex flex-col justify-center w-[42%] pl-12 xl:pl-20 2xl:pl-28 pr-6 text-white">
          <span
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-5"
            style={{ color: '#e8d9c4' }}
          >
            Welcome to Talukdar
          </span>

          <h1
            className="font-bold leading-tight mb-5 transition-all duration-500"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
            }}
          >
            {slides[activeIndex].title}
          </h1>

          <p className="text-gray-300 mb-10 max-w-sm leading-relaxed text-base">
            {slides[activeIndex].subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              className="px-8 py-3.5 rounded-lg font-semibold text-white flex items-center gap-2 hover:brightness-110 transition-all shadow-lg"
              style={{ backgroundColor: '#785d32' }}
            >
              Shop Now <ArrowRight size={18} />
            </button>
            <button className="px-8 py-3.5 rounded-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Right: Card slider */}
        <div className="flex-1 h-full flex items-center overflow-hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={2.2}
            centeredSlides={true}
            spaceBetween={18}
            loop={true}
            slideToClickedSlide={true}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              el: '.hero-pagination',
              bulletClass: 'hero-bullet',
              bulletActiveClass: 'hero-bullet-active',
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="hero-cards w-full h-[82vh]"
          >
            {slides.map((slide, i) => (
              <SwiperSlide key={i} className="hero-card-slide relative">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 30vw, 26vw"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Desktop pagination dots — centered at bottom */}
      <div className="hero-pagination hidden md:flex absolute bottom-7 left-1/2 -translate-x-1/2 z-20 gap-2" />

      {/* ─── Mobile / Tablet: Full-screen Swiper ─── */}
      <div className="md:hidden w-full h-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="hero-mobile w-full h-full"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i} className="relative">
              <Image
                src={slide.bg}
                alt={slide.title}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/65" />

              {/* Mobile text overlay */}
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center text-white px-6 pt-16 pb-14">
                <span
                  className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
                  style={{ color: '#e8d9c4' }}
                >
                  Welcome to Talukdar
                </span>
                <h1
                  className="font-bold leading-tight mb-4"
                  style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 9vw, 3rem)' }}
                >
                  {slide.title}
                </h1>
                <p className="text-gray-300 mb-8 text-sm max-w-xs leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="flex gap-3 flex-wrap justify-center">
                  <button
                    className="px-6 py-3 rounded-lg font-semibold text-white flex items-center gap-2 text-sm"
                    style={{ backgroundColor: '#785d32' }}
                  >
                    Shop Now <ArrowRight size={16} />
                  </button>
                  <button className="px-6 py-3 rounded-lg font-semibold border-2 border-white text-white text-sm hover:bg-white hover:text-gray-900 transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  );
}
