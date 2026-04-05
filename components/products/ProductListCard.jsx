"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useApp } from "@/components/context/AppContext";

export default function ProductListCard({ p }) {
  const { addToCart } = useApp();

  function handleAddToCart() {
    addToCart({
      id: p?.id,
      name: p?.name,
      price: p?.price,
      image: p?.image,
      category: p?.category,
      rating: p?.rating,
    });
  }

  return (
    <section className="relative">
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-[#1c2444] dark:bg-[#0a0f2e] min-h-48 cursor-pointer"
      >
        <div className="flex items-stretch h-full">
          <div className="relative w-28 shrink-0 sm:w-44 md:w-56">
            <Image
              src={p?.thumbnail_image}
              alt={p?.name}
              fill
              sizes="(max-width: 640px) 112px, (max-width: 768px) 176px, 224px"
              className="object-cover"
              quality={90}
            />
            <span className="absolute left-2 top-2 rounded-full bg-brand-navy px-2 py-1 text-[10px] font-semibold text-white sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
              {p?.category || "Category"}
            </span>
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-3 sm:gap-4 sm:p-5">
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 dark:text-brand-pale sm:text-lg">
                {p?.name}
              </h3>
              <p
                className="mt-1 line-clamp-2 text-xs text-slate-600 dark:text-[#9fa8cc] sm:mt-2 sm:text-sm"
                dangerouslySetInnerHTML={{ __html: p?.short_description }}
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <p className="text-base font-bold text-brand-navy dark:text-[#f0ebe3] sm:text-2xl">
                ${p?.base_price}
              </p>
              <div className="flex gap-1">
                {!p?.variant_available && (
                  <Link
                    href={`/product/${p?.slug}`}
                    className="px-5 py-2 rounded-md text-sm font-medium text-brand-gold bg-brand-navy text-white transition-colors"
                  >
                    View Details
                  </Link>
                )}
                {p?.variant_available ? (
                  <Link
                    href={`/product/${p?.slug}`}
                    className="px-4 py-1.5 rounded-md text-sm font-medium text-white bg-brand-gold transition-colors"
                  >
                    View Options
                  </Link>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="px-5 py-2 rounded-md text-sm font-medium text-white bg-brand-gold transition-colors"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </section>
  );
}
