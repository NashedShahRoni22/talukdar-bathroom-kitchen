'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useApp } from '@/components/context/AppContext';

export default function ProductListCard({ product }) {
  const { addToCart } = useApp();

  function handleAddToCart() {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      rating: product.rating,
    });
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-[#1c2444] dark:bg-[#0a0f2e]"
    >
      <div className="flex items-stretch">
        <div className="relative w-28 shrink-0 sm:w-44 md:w-56">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 112px, (max-width: 768px) 176px, 224px"
            className="object-cover"
          />
          <span className="absolute left-2 top-2 rounded-full bg-brand-navy px-2 py-1 text-[10px] font-semibold text-white sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
            {product.category}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-3 sm:gap-4 sm:p-5">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 dark:text-brand-pale sm:text-lg">{product.name}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-slate-600 dark:text-[#9fa8cc] sm:mt-2 sm:text-sm">
              Premium quality fixture with durable construction and elegant finish for modern bathrooms.
            </p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-base font-bold text-brand-navy dark:text-[#f0ebe3] sm:text-2xl">${product.price.toFixed(2)}</p>
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-lg bg-brand-gold px-3 py-2 text-xs font-semibold text-white transition hover:brightness-90 sm:px-4 sm:text-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
