"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetData } from "@/components/helpers/useGetData";
import ShopSidebarCategory from "@/components/shop/ShopSidebarCategory";
import ShopTopbar from "@/components/shop/ShopTopbar";
import ShopProducts from "@/components/shop/ShopProducts";

export default function CategoryShopPage() {
  const params = useParams();
  const slug = params.slug;

  const [filters, setFilters] = useState({
    search: "",
    attribute_values: [],
    brand_id: "",
    orderByPrice: "0",
    lowest_price: "",
    highest_price: "",
    page: 1,
    rows: 12,
  });

  const [viewMode, setViewMode] = useState("grid");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Fetch category filters
  const { data: filtersData, isLoading: filtersLoading } = useGetData(
    `products/categories/${slug}/filters`
  );
  
  const categoryFilters = filtersData?.data;
  const categoryName = categoryFilters?.category_name;

  // Fetch products for this category with applied filters
  const productParams = useMemo(() => {
    const params = {
      search: filters.search || undefined,
      orderByPrice: filters.orderByPrice !== "0" ? filters.orderByPrice : undefined,
      lowest_price: filters.lowest_price || undefined,
      highest_price: filters.highest_price || undefined,
      page: filters.page,
      rows: filters.rows,
    };

    // Add attribute values if any are selected
    if (filters.attribute_values.length > 0) {
      params.attribute_values = filters.attribute_values;
    }

    // Add brand if selected
    if (filters.brand_id) {
      params.brand_id = filters.brand_id;
    }

    // Remove undefined values
    Object.keys(params).forEach(
      (key) => params[key] === undefined && delete params[key]
    );

    return params;
  }, [filters]);

  const { data: productsData, isLoading } = useGetData(
    `products/category/${slug}`,
    productParams
  );
  
  const products = productsData?.data;
  const meta = productsData?.meta;

  return (
    <div className="min-h-screen bg-stone-50 font-[Raleway] pt-20 dark:bg-brand-navy">
      <header className="relative h-55 overflow-hidden sm:h-65">
        <Image
          src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1400&q=90"
          alt="Category"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.4]"
          quality={90}
        />
        <div className="absolute inset-0 bg-linear-to-br from-brand-navy/70 to-brand-gold/45" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center font-[Playfair_Display] text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl"
          >
            {categoryName || "Loading..."}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-white/80 sm:text-sm"
          >
            <span>Home</span>
            <ChevronRight size={13} />
            <span>Shop</span>
            <ChevronRight size={13} />
            <span>{categoryName || "Category"}</span>
          </motion.div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <ShopTopbar
          filters={filters}
          setFilters={setFilters}
          viewMode={viewMode}
          setViewMode={setViewMode}
          setIsMobileFiltersOpen={setIsMobileFiltersOpen}
        />

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="hidden lg:block w-70 shrink-0 sticky top-24">
            {filtersLoading ? (
              <div className="space-y-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-[#1a2340] rounded w-1/2" />
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div key={j} className="h-3 bg-gray-100 dark:bg-[#131b36] rounded" />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <ShopSidebarCategory
                categoryFilters={categoryFilters?.filters}
                filters={filters}
                setFilters={setFilters}
              />
            )}
          </div>

          <ShopProducts
            products={products}
            meta={meta}
            isLoading={isLoading}
            viewMode={viewMode}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </main>

      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
              aria-label="Close filters"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed right-0 top-0 z-50 flex h-dvh w-[88%] max-w-sm flex-col bg-white shadow-2xl dark:bg-[#0a0f2e] lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-[#1c2444]">
                <h2 className="text-base font-bold text-brand-navy dark:text-brand-pale">
                  Filter Products
                </h2>
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="rounded-md p-2 text-slate-600 transition hover:bg-gray-100 hover:text-slate-900 dark:text-[#9fa8cc] dark:hover:bg-[#11193a] dark:hover:text-white"
                  aria-label="Close filter drawer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6">
                {filtersLoading ? (
                  <div className="space-y-8">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="space-y-4">
                        <div className="h-4 bg-gray-200 dark:bg-[#1a2340] rounded w-1/2" />
                        {Array.from({ length: 3 }).map((_, j) => (
                          <div key={j} className="h-3 bg-gray-100 dark:bg-[#131b36] rounded" />
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <ShopSidebarCategory
                    categoryFilters={categoryFilters?.filters}
                    filters={filters}
                    setFilters={setFilters}
                  />
                )}
              </div>

              <div className="border-t border-gray-200 p-4 dark:border-[#1c2444]">
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white shadow-md"
                >
                  View Results
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
