"use client";
import { Sparkles } from 'lucide-react';
import FastMarquee from 'react-fast-marquee';

const lineOne = [
  'Luxury Bathroom Collections',
  'Designer Kitchen Fixtures',
  'Australia-Wide Delivery',
  'Expert Design Consultation',
  'Premium Craftsmanship',
  'Tailored Renovation Solutions',
];

const lineTwo = [
  'Timeless Materials',
  'Handpicked Finishes',
  'Smart Home Integration',
  'Seamless Project Support',
  'Trusted By Homeowners',
  'Elegant Everyday Living',
];

function Track({ items, reverse = false }) {
  return (
    <div className="relative overflow-hidden">
      <FastMarquee
        speed={reverse ? 34 : 28}
        direction={reverse ? 'right' : 'left'}
        autoFill
        gradient={false}
        pauseOnHover
        className="py-1"
      >
        {items.map((label, idx) => (
          <span
            key={`${label}-${idx}`}
            className="mx-2 inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-gold/30 bg-white/70 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-brand-navy uppercase backdrop-blur-sm dark:bg-[#111a3b] dark:text-brand-pale"
          >
            <Sparkles size={14} className="text-brand-gold" />
            {label}
          </span>
        ))}
      </FastMarquee>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="relative overflow-hidden bg-[#f7f4ee] py-10 dark:bg-[#0a0f2e] sm:py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-12 top-0 h-44 w-44 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-brand-pale/20 blur-3xl" />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8">
        {/* <div className="mb-6 text-center sm:mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
            The Talukdar Promise
          </p>
          <h3 className="mt-3 text-2xl font-bold text-brand-navy dark:text-brand-pale sm:text-3xl" style={{ fontFamily: 'var(--font-playfair)' }}>
            Crafted For Sophisticated Australian Homes
          </h3>
        </div> */}

        <div className="space-y-3 sm:space-y-4">
          <Track items={lineOne} />
          <Track items={lineTwo} reverse />
        </div>
      </div>

    </section>
  );
}
