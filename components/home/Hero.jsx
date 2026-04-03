"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useGetData } from "../helpers/useGetData";
import Loader from "../loader/Loader";
import Link from "next/link";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [textKey, setTextKey] = useState(0);
  const swiperRef = useRef(null);

  const { data, isLoading, error } = useGetData(
    "sliders",
    {},
    {
      staleTime: 10 * 60 * 1000,
      gcTime: 20 * 60 * 1000,
      retry: 1,
    },
  );
  const sliders = data?.data;
  // console.log("sliders data", sliders);
  useEffect(() => {
    // Trigger mount animation
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
    setTextKey((k) => k + 1);
  };

  if (isLoading || error || !sliders?.length) return <Loader />;

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* ── Desktop: stacked blurred bg images ── */}
      <div className="hidden md:block absolute inset-0 z-0">
        {sliders.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          >
            <div
              className={`absolute inset-0 ${i === activeIndex ? "bg-kenburns" : ""}`}
            >
              <Image
                src={slide.background_image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 hero-gradient" />
          </div>
        ))}
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden md:flex relative z-10 h-full pt-16">
        {/* Left: Text */}
        <div
          className={`flex flex-col justify-center w-[42%] pl-12 xl:pl-20 2xl:pl-28 pr-6 text-white ${mounted ? "mount-bg" : "opacity-0"}`}
        >
          {/* Label */}
          <div key={`label-${textKey}`} className="hero-label">
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-5 inline-flex items-center gap-3"
              style={{ color: "#e8d9c4" }}
            >
              <span className="inline-block w-8 h-px bg-current opacity-60" />
              Welcome to Talukdar
            </span>
          </div>

          {/* Title */}
          <h1
            key={`title-${textKey}`}
            className="hero-title font-bold leading-tight mb-4"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)",
            }}
          >
            {sliders?.[activeIndex]?.title}
          </h1>

          {/* Divider line */}
          <div
            key={`div-${textKey}`}
            className="hero-divider w-16 h-0.5 mb-5"
            style={{ background: "#785d32" }}
          />

          {/* Subtitle */}
          <p
            key={`sub-${textKey}`}
            className="hero-sub text-gray-300 mb-10 max-w-sm leading-relaxed text-base"
          >
            {sliders?.[activeIndex]?.sub_title}
          </p>

          {/* Buttons */}
          <div
            key={`btns-${textKey}`}
            className="hero-btns flex flex-wrap gap-4"
          >
            {/* <Link href={sliders?.[activeIndex]?.link}> */}
            <button
              className="btn-shop px-8 py-3.5 rounded-lg font-semibold text-white flex items-center gap-2 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]"
              style={{ backgroundColor: "#785d32" }}
              // onClick={() => window.open(sliders?.[activeIndex]?.link, "_self")}
              onClick={() =>
                window.open(sliders?.[activeIndex]?.link, "_blank")
              }
            >
              <span className="btn-shimmer" />
              Shop Now
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            {/* </Link> */}
          </div>

          {/* Slide counter */}
          <div
            key={`counter-${textKey}`}
            className="hero-label mt-14 flex items-center gap-3"
          >
            <span
              className="text-2xl font-bold tabular-nums"
              style={{ color: "#e8d9c4", fontFamily: "var(--font-playfair)" }}
            >
              0{activeIndex + 1}
            </span>
            <span className="text-gray-500 text-sm">/ 0{sliders.length}</span>
          </div>
        </div>

        {/* Right: Card slider */}
        <div
          className={`flex-1 h-full flex items-center overflow-hidden ${mounted ? "mount-cards" : "opacity-0"}`}
        >
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Pagination]}
            slidesPerView={2.2}
            // centeredSlides={true}
            spaceBetween={18}
            loop={true}
            slideToClickedSlide={true}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              el: ".hero-pagination",
              bulletClass: "hero-bullet",
              bulletActiveClass: "hero-bullet-active",
            }}
            onSlideChange={handleSlideChange}
            className="hero-cards w-full h-[82vh]"
          >
            {sliders.map((slide, i) => (
              <SwiperSlide key={i} className="hero-card-slide">
                <div className="card-float w-full h-full relative">
                  <Image
                    src={slide.thumbnail_image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 30vw, 26vw"
                  />
                  {/* Card overlay label on active */}
                  <div
                    className="absolute inset-x-0 bottom-0 p-5 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                      opacity: i === activeIndex ? 1 : 0,
                    }}
                  >
                    <p
                      className="text-white font-semibold text-sm tracking-wide"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {slide.title}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Desktop pagination — centered bottom */}
      <div
        className={`hero-pagination hidden md:flex absolute bottom-7 left-1/2 -translate-x-1/2 z-20 gap-2 items-center ${mounted ? "mount-nav" : "opacity-0"}`}
      />

      {/* ── Mobile / Tablet ── */}
      <div className="md:hidden w-full h-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="hero-mobile w-full h-full"
        >
          {sliders.map((slide, i) => (
            <SwiperSlide key={i} className="relative">
              <Image
                src={slide.background_image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/65" />
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center text-white px-6 pt-16 pb-14">
                <span
                  className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 inline-flex items-center gap-2"
                  style={{ color: "#e8d9c4" }}
                >
                  <span className="inline-block w-5 h-px bg-current opacity-60" />
                  Welcome to Talukdar
                </span>
                <h1
                  className="font-bold leading-tight mb-3"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(2rem, 9vw, 3rem)",
                  }}
                >
                  {slide.title}
                </h1>
                <div
                  className="w-10 h-0.5 mb-4 mx-auto"
                  style={{ background: "#785d32" }}
                />
                <p className="text-gray-300 mb-8 text-sm max-w-xs leading-relaxed">
                  {slide.sub_title}
                </p>
                <div className="flex gap-3 flex-wrap justify-center">
                  {/* <Link href={slide.link}> */}
                  <button
                    // onClick={() => window.open(sliders?.link, "_self")}
                    onClick={() => window.open(sliders?.link, "_blank")}
                    className="btn-shop px-6 py-3 rounded-lg font-semibold text-white flex items-center gap-2 text-sm"
                    style={{ backgroundColor: "#785d32" }}
                  >
                    <span className="btn-shimmer" />
                    Shop Now <ArrowRight size={16} />
                  </button>
                  {/* </Link> */}
                  {/* <button className="btn-learn px-6 py-3 rounded-lg font-semibold border-2 border-white text-white text-sm">
                      <span>Learn More</span>
                    </button> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
