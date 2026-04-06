"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Autoplay } from "swiper/modules";
import { Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductGallery({ images, productName, activeImage }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const mainSwiperRef = useRef(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [isMainBeginning, setIsMainBeginning] = useState(true);
  const [isMainEnd, setIsMainEnd] = useState(false);
  const [isThumbsBeginning, setIsThumbsBeginning] = useState(true);
  const [isThumbsEnd, setIsThumbsEnd] = useState(false);

  useEffect(() => {
    // When the variant changes the activeImage, slide to the new index
    if (activeImage && mainSwiperRef.current && mainSwiperRef.current.swiper) {
      const idx = images.findIndex((img) => img === activeImage);
      if (idx !== -1) {
        mainSwiperRef.current.swiper.slideTo(idx);
      }
    }
  }, [activeImage, images]);

  if (!images || images.length === 0) return null;

  const slides = images.map((src) => ({ src }));

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image View */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-[#1c2444] dark:bg-[#0d1333] group">
        <div className="relative aspect-square w-full group">
          <Swiper
            ref={mainSwiperRef}
            spaceBetween={10}
            navigation={false}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Thumbs]}
            className="h-full w-full"
            onSlideChange={(swiper) => {
              setLightboxIndex(swiper.activeIndex);
              setIsMainBeginning(swiper.isBeginning);
              setIsMainEnd(swiper.isEnd);
            }}
            onInit={(swiper) => {
              setIsMainBeginning(swiper.isBeginning);
              setIsMainEnd(swiper.isEnd);
            }}
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div 
                  className="relative h-full w-full select-none cursor-zoom-in"
                  onClick={() => setOpenLightbox(true)}
                >
                  <Image
                    src={img}
                    alt={`${productName || "Product"} image ${idx + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    quality={90}
                    priority={idx === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation for Main Gallery */}
          <button
            type="button"
            onClick={() => mainSwiperRef.current?.swiper?.slidePrev()}
            disabled={isMainBeginning}
            className="absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-brand-navy/90 text-white shadow-md backdrop-blur-sm transition-all hover:bg-brand-gold hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-0 sm:h-10 sm:w-10 sm:opacity-0 sm:group-hover:opacity-100 dark:bg-[#2a3460]/90 dark:hover:bg-brand-gold"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} className="mr-0.5" />
          </button>
          
          <button
            type="button"
            onClick={() => mainSwiperRef.current?.swiper?.slideNext()}
            disabled={isMainEnd}
            className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-brand-navy/90 text-white shadow-md backdrop-blur-sm transition-all hover:bg-brand-gold hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-0 sm:h-10 sm:w-10 sm:opacity-0 sm:group-hover:opacity-100 dark:bg-[#2a3460]/90 dark:hover:bg-brand-gold"
            aria-label="Next image"
          >
            <ChevronRight size={20} className="ml-0.5" />
          </button>
          
          <button 
            type="button"
            className="absolute bottom-4 right-4 z-10 rounded-full bg-white/80 p-2 text-brand-navy shadow hover:bg-white transition-all sm:opacity-0 sm:group-hover:opacity-100 dark:bg-[#111b44]/80 dark:text-white dark:hover:bg-[#111b44] backdrop-blur-sm hover:scale-105 active:scale-95"
            onClick={() => setOpenLightbox(true)}
            aria-label="View Fullscreen"
          >
            <Maximize2 size={24} />
          </button>
        </div>
      </div>

      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        index={lightboxIndex}
        slides={slides}
        // plugins={[Zoom]}
        controller={{ closeOnBackdropClick: true }}
      />

      {/* Thumbnails Navigation */}
      <div className="relative w-full pb-4 group">
        <Swiper
          onSwiper={(swiper) => {
            setThumbsSwiper(swiper);
            setIsThumbsBeginning(swiper.isBeginning);
            setIsThumbsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsThumbsBeginning(swiper.isBeginning);
            setIsThumbsEnd(swiper.isEnd);
          }}
          spaceBetween={12}
          slidesPerView="auto"
          freeMode={true}
          navigation={false}
          watchSlidesProgress={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          modules={[FreeMode, Thumbs, Autoplay]}
          className="thumbs-swiper"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={`thumb-${idx}`} className="!w-20 !h-20 sm:!w-24 sm:!h-24 md:!w-24 md:!h-24">
              <button
                type="button"
                className="relative h-full w-full overflow-hidden rounded-xl border-2 border-transparent transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-500 aria-pressed:border-brand-gold"
                aria-label={`Select product image ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${productName || "Product"} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="120px"
                  quality={80}
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        {images.length > 4 && (
          <div className="absolute inset-y-0 left-0 right-0 top-0 bottom-4 pointer-events-none flex justify-between items-center z-10 px-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={() => thumbsSwiper?.slidePrev()}
              disabled={isThumbsBeginning}
              className="pointer-events-auto flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-md backdrop-blur-sm transition-all hover:bg-brand-gold hover:text-white disabled:opacity-0 dark:bg-[#111b44]/90 dark:text-white"
            >
              <ChevronLeft size={16} strokeWidth={3} className="mr-0.5" />
            </button>

            <button
              type="button"
              onClick={() => thumbsSwiper?.slideNext()}
              disabled={isThumbsEnd}
              className="pointer-events-auto flex h-8 w-8 translate-x-1/2 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-md backdrop-blur-sm transition-all hover:bg-brand-gold hover:text-white disabled:opacity-0 dark:bg-[#111b44]/90 dark:text-white"
            >
              <ChevronRight size={16} strokeWidth={3} className="ml-0.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}