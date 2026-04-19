'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const preloaderRef = useRef(null);
  const kLogoRef = useRef(null);
  const bLogoRef = useRef(null);
  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);
  const dividerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const preloaderEl = preloaderRef.current;
    const kLogoEl = kLogoRef.current;
    const bLogoEl = bLogoRef.current;
    const topTextEl = topTextRef.current;
    const bottomTextEl = bottomTextRef.current;
    const dividerEl = dividerRef.current;

    if (!preloaderEl || !kLogoEl || !bLogoEl || !topTextEl || !bottomTextEl || !dividerEl) {
      document.body.style.overflow = '';
      return;
    }

    gsap.set(kLogoEl, { autoAlpha: 0, x: -54, y: 28, rotate: -5, scale: 0.92 });
    gsap.set(bLogoEl, { autoAlpha: 0, x: 54, y: 28, rotate: 5, scale: 0.92 });
    gsap.set(topTextEl, { autoAlpha: 0, y: 24, clipPath: 'inset(0% 100% 0% 0%)' });
    gsap.set(bottomTextEl, { autoAlpha: 0, y: 20, clipPath: 'inset(0% 100% 0% 0%)' });
    gsap.set(dividerEl, { autoAlpha: 0, scaleX: 0, transformOrigin: 'left center' });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to([kLogoEl, bLogoEl], {
      autoAlpha: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      duration: 0.9,
      stagger: 0.08,
    })
      .to(
        topTextEl,
        {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.85,
        },
        '-=0.5'
      )
      .to(
        dividerEl,
        {
          autoAlpha: 1,
          scaleX: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.45'
      )
      .to(
        bottomTextEl,
        {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.8,
        },
        '-=0.3'
      )
      .to(
        [kLogoEl, bLogoEl, topTextEl, bottomTextEl],
        {
          y: -2,
          duration: 0.36,
          yoyo: true,
          repeat: 1,
          ease: 'sine.inOut',
        },
        '+=0.18'
      )
      .to(preloaderEl, {
        autoAlpha: 0,
        duration: 0.72,
        ease: 'power2.inOut',
        delay: 0.6,
        onComplete: () => {
          setIsVisible(false);
          document.body.style.overflow = '';
        },
      });

    return () => {
      document.body.style.overflow = '';
      tl.kill();
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-linear-to-br from-[#02061d] via-brand-navy to-[#09184d]"
    >
      <div className="pointer-events-none absolute -left-20 -top-10 h-72 w-72 rounded-full bg-brand-gold/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-brand-pale/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-[min(86vw,820px)] items-center justify-center gap-2 sm:gap-3">
        <div className="flex gap-5 items-center">
          <div ref={kLogoRef} className="w-11 sm:w-14 md:w-16 lg:w-18 shrink-0">
            <Image
              src="/images/Loader/k.svg"
              alt="K logo mark"
              width={226}
              height={543}
              priority
              className="h-auto w-full object-contain"
            />
          </div>

          <div ref={bLogoRef} className="w-10.5 sm:w-13.5 md:w-15.5 lg:w-17.5 shrink-0">
            <Image
              src="/images/Loader/b.svg"
              alt="B logo mark"
              width={218}
              height={544}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <div ref={topTextRef} className="w-[clamp(90px,26vw,220px)] sm:w-[clamp(120px,30vw,280px)] md:w-[clamp(150px,34vw,350px)] lg:w-[clamp(180px,36vw,390px)]">
            <Image
              src="/images/Loader/top.svg"
              alt="SMART"
              width={960}
              height={215}
              priority
              className="h-auto w-full object-contain"
            />
          </div>

          <div ref={dividerRef} className="my-1 h-px w-[clamp(84px,24vw,205px)] sm:w-[clamp(112px,28vw,255px)] md:w-[clamp(140px,32vw,320px)] lg:w-[clamp(165px,34vw,355px)] bg-linear-to-r from-brand-gold/20 via-brand-gold to-brand-gold/20" />

          <div ref={bottomTextRef} className="w-[clamp(84px,24vw,205px)] sm:w-[clamp(112px,28vw,255px)] md:w-[clamp(140px,32vw,320px)] lg:w-[clamp(165px,34vw,355px)]">
            <Image
              src="/images/Loader/bottom.svg"
              alt="Kitchen and Bath"
              width={912}
              height={65}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
