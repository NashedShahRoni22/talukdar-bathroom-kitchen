'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  {
    title: 'Luxury Bathrooms',
    description: 'Statement bathtubs, spa showers, and designer fittings.',
    itemCount: '120+ products',
    href: '/shop',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&h=1100&fit=crop&q=80&auto=format',
  },
  {
    title: 'Modern Kitchens',
    description: 'Clean lines, smart storage, and elevated utility zones.',
    itemCount: '95+ products',
    href: '/shop',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1400&h=1000&fit=crop&q=80&auto=format',
  },
  {
    title: 'Faucets & Mixers',
    description: 'Brushed brass, matte black, and timeless chrome finishes.',
    itemCount: '70+ products',
    href: '/shop',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=1000&fit=crop&q=80&auto=format',
  },
  {
    title: 'Vanities & Basins',
    description: 'Double vanity systems and sculptural basin collections.',
    itemCount: '85+ products',
    href: '/shop',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=1000&fit=crop&q=80&auto=format',
  },
  {
    title: 'Tiles & Surfaces',
    description: 'Textured stone, polished porcelain, and feature walls.',
    itemCount: '110+ products',
    href: '/shop',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1500&h=1000&fit=crop&q=80&auto=format',
  },
];

function CategoryCard({ category, index, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className={className}
    >
      <Link
        href={category.href}
        className="group relative isolate block h-full overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_35px_rgba(5,10,48,0.09)] transition-transform duration-300 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_14px_40px_rgba(0,0,0,0.35)]"
      >
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/10 dark:from-black/85 dark:via-black/35" />
        <div className="absolute inset-0 bg-linear-to-br from-brand-navy/45 via-transparent to-brand-gold/20 dark:from-brand-navy/55" />

        <div className="absolute inset-x-0 top-0 z-10 p-4 sm:p-5">
          <span className="inline-flex rounded-full border border-white/45 bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            {category.itemCount}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <div className="rounded-xl border border-white/25 bg-black/35 p-4 backdrop-blur-sm transition-colors duration-300 group-hover:bg-black/45 dark:border-white/20">
            <h3
              className="text-xl font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-2xl"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {category.title}
            </h3>
            <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-white/90 sm:text-[15px]">
              {category.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#f2e5d4] transition-transform duration-300 group-hover:translate-x-1">
              Explore Category
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CategorySpotlight() {
  const desktopClasses = [
    // Card 1 — Luxury Bathrooms: left tall, rows 1–2
    'min-h-[20rem] md:col-span-2 lg:col-span-3 lg:row-start-1 lg:row-span-2 lg:min-h-[28rem]',
    // Card 2 — Modern Kitchens: top center wide, row 1
    'min-h-[14rem] md:col-span-2 lg:col-span-6 lg:col-start-4 lg:row-start-1 lg:row-span-1 lg:min-h-[13.5rem]',
    // Card 3 — Faucets & Mixers: bottom center-left, row 2
    'min-h-[14rem] md:col-span-1 lg:col-span-3 lg:col-start-4 lg:row-start-2 lg:row-span-1 lg:min-h-[13.5rem]',
    // Card 4 — Vanities & Basins: bottom center-right, row 2
    'min-h-[14rem] md:col-span-1 lg:col-span-3 lg:col-start-7 lg:row-start-2 lg:row-span-1 lg:min-h-[13.5rem]',
    // Card 5 — Tiles & Surfaces: right tall, rows 1–2 ✅ row-start-1 anchors it correctly
    'min-h-[20rem] md:col-span-2 lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:row-span-2 lg:min-h-[28rem]',
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#f7f4ef] via-white to-[#f8f8f8] py-16 sm:py-20 dark:bg-linear-to-b dark:from-[#04071f] dark:via-[#060b2e] dark:to-[#04071f]">
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#d6c4ab]/35 blur-3xl dark:bg-brand-gold/25" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand-pale/45 blur-3xl dark:bg-brand-pale/15" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between"
        >
          <div className="motion-safe:animate-[fadeSlideUp_.55s_cubic-bezier(.22,1,.36,1)_both]">
            <span className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-gold dark:text-brand-pale">
              Curated Categories
            </span>
            <h2
              className="mt-3 text-3xl font-semibold leading-tight text-[#0a133f] sm:text-4xl lg:text-5xl dark:text-white"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Build Spaces With Character
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-[#3b4466] sm:text-base dark:text-white/80">
            Discover handpicked product families crafted for bold transformations in bathrooms and kitchens.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[13.5rem]"
        >
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              category={category}
              index={index}
              className={desktopClasses[index]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}