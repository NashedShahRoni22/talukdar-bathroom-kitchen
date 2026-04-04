"use client";

import { useState } from "react";
import Image from "next/image";
import {
  SlidersHorizontal,
  X,
  ChevronRight,
  LayoutGrid,
  List,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/products/ProductCard";
import ProductListCard from "@/components/products/ProductListCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import ProductListCardSkeleton from "@/components/products/ProductListCardSkeleton";
import { useGetData } from "../../components/helpers/useGetData";

const PRODUCTS = [
  {
    id: 1,
    name: "Marble Elegance Sink",
    price: 2500,
    category: "Fixtures",
    type: "Sink",
    brand: "Kohler",
    colour: "White",
    range: "Luxury",
    availability: "In Stock",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=90",
  },
  {
    id: 2,
    name: "Onyx Basin Collection",
    price: 3200,
    category: "Vanities",
    type: "Sink",
    brand: "Duravit",
    colour: "Black",
    range: "Modern",
    availability: "Pre-Order",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=90",
  },
  {
    id: 3,
    name: "Brushed Gold Faucet",
    price: 890,
    category: "Faucets",
    type: "Faucet",
    brand: "Hansgrohe",
    colour: "Gold",
    range: "Modern",
    availability: "In Stock",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=90",
  },
  {
    id: 4,
    name: "Freestanding Bathtub",
    price: 5800,
    category: "Fixtures",
    type: "Bathtub",
    brand: "TOTO",
    colour: "White",
    range: "Luxury",
    availability: "Ships in 2 Weeks",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&q=90",
  },
  {
    id: 5,
    name: "Rain Shower System",
    price: 1650,
    category: "Fixtures",
    type: "Shower",
    brand: "Grohe",
    colour: "Chrome",
    range: "Eco",
    availability: "In Stock",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=90",
  },
  {
    id: 7,
    name: "Matte Black Towel Rail",
    price: 320,
    category: "Accessories",
    type: "Faucet",
    brand: "Grohe",
    colour: "Black",
    range: "Classic",
    availability: "In Stock",
    rating: 3,
    image:
      "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=1200&q=90",
  },
  {
    id: 8,
    name: "Terrazzo Wash Basin",
    price: 2900,
    category: "Vanities",
    type: "Sink",
    brand: "Duravit",
    colour: "White",
    range: "Modern",
    availability: "Ships in 2 Weeks",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=1200&q=90",
  },
];

const FILTER_OPTIONS = {
  Type: ["All", "Sink", "Faucet", "Shower", "Bathtub", "Cabinet"],
  Brand: ["All", "Grohe", "Hansgrohe", "Kohler", "TOTO", "Duravit"],
  Colour: ["All", "White", "Black", "Gold", "Chrome", "Bronze"],
  Range: ["All", "Classic", "Modern", "Luxury", "Eco"],
  Availability: ["All", "In Stock", "Pre-Order", "Ships in 2 Weeks"],
};

function FilterControls({ filters, setFilter }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {Object.entries(FILTER_OPTIONS).map(([key, opts]) => (
        <label key={key} className="block">
          <span className="mb-1 block text-xs font-semibold text-slate-600 dark:text-[#9fa8cc]">
            {key}
          </span>
          <select
            value={filters[key]}
            onChange={(e) => setFilter(key, e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 dark:border-[#2a3460] dark:bg-[#11193a] dark:text-brand-pale"
          >
            {opts.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Shop Page
───────────────────────────────────────────── */
export default function ShopPage() {
  // get products
  const { data: productsData, isLoading } = useGetData("products");
  const products = productsData?.data;
  console.log("products:", products);

  const [filters, setFilters] = useState({
    Type: "All",
    Brand: "All",
    Colour: "All",
    Range: "All",
    Availability: "All",
  });
  const [viewMode, setViewMode] = useState("grid");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const setFilter = (key, val) => {
    setFilters((f) => ({ ...f, [key]: val }));
    setCurrentPage(1);
  };

  const activeFilters = Object.entries(filters).filter(([, v]) => v !== "All");

  const filtered = PRODUCTS.filter((p) => {
    const typeMatch = filters.Type === "All" || p.type === filters.Type;
    const brandMatch = filters.Brand === "All" || p.brand === filters.Brand;
    const colourMatch = filters.Colour === "All" || p.colour === filters.Colour;
    const rangeMatch = filters.Range === "All" || p.range === filters.Range;
    const availabilityMatch =
      filters.Availability === "All" || p.availability === filters.Availability;

    return (
      typeMatch && brandMatch && colourMatch && rangeMatch && availabilityMatch
    );
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filtered.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="min-h-screen bg-stone-50 font-[Raleway] pt-20 dark:bg-brand-navy">
      <header className="relative h-55 overflow-hidden sm:h-65">
        <Image
          src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1400&q=90"
          alt="Bathroom"
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
            Bathroom Collections
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-white/80 sm:text-sm"
          >
            <span>Home</span>
            <ChevronRight size={13} />
            <span className="text-brand-gold">Bathrooms</span>
          </motion.div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <section className="sticky top-20 z-40 mb-5 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-md backdrop-blur-sm sm:p-5 dark:border-[#1c2444] dark:bg-[#0a0f2e]/95">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-brand-gold">
              <SlidersHorizontal size={16} />
              <span className="text-xs font-bold uppercase tracking-[0.14em]">
                Filters
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-[#2a3460] dark:text-brand-pale dark:hover:border-[#3a4876] dark:hover:text-white lg:hidden"
              >
                <SlidersHorizontal size={15} />
                Filters
              </button>

              <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-[#1c2444] dark:bg-[#11193a]">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
                    viewMode === "grid"
                      ? "bg-brand-navy text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 dark:text-[#9fa8cc] dark:hover:text-white"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={16} />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
                    viewMode === "list"
                      ? "bg-brand-navy text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 dark:text-[#9fa8cc] dark:hover:text-white"
                  }`}
                  aria-label="List view"
                >
                  <List size={16} />
                  <span className="hidden sm:inline">List</span>
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <FilterControls filters={filters} setFilter={setFilter} />
          </div>

          {activeFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {activeFilters.map(([key, val]) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 rounded-full bg-brand-gold/10 px-3 py-1 text-xs font-semibold text-brand-gold"
                >
                  {key}: {val}
                  <button
                    type="button"
                    onClick={() => setFilter(key, "All")}
                    className="rounded-full p-0.5 text-brand-gold transition hover:bg-brand-gold/20"
                    aria-label={`Remove ${key} filter`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={() =>
                  setFilters({
                    Type: "All",
                    Brand: "All",
                    Colour: "All",
                    Range: "All",
                    Availability: "All",
                  })
                }
                className="rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-500 hover:text-slate-900 dark:border-[#2a3460] dark:text-[#9fa8cc] dark:hover:border-[#3a4876] dark:hover:text-white"
              >
                Clear all
              </button>
            </div>
          )}
        </section>

        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between">
            <p className="text-sm font-medium text-slate-600 dark:text-[#9fa8cc]">
              {isLoading ? "Loading products..." : `Showing ${startIdx + 1}–${Math.min(startIdx + itemsPerPage, filtered.length)} of ${filtered.length} products`}
            </p>
          </div>

          {isLoading ? (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <ProductListCardSkeleton key={index} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products?.map((p, index) => (
                    <ProductCard key={index} p={p} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {products?.map((p, index) => (
                    <ProductListCard key={index} p={p} />
                  ))}
                </div>
              )}
            </>
          )}

          {!isLoading && filtered.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-8 text-center text-sm text-slate-600 dark:border-[#2a3460] dark:bg-[#0a0f2e] dark:text-[#9fa8cc]">
              No products match the selected filters.
            </div>
          )}

          {/* Desktop Pagination */}
          {filtered.length > 0 && (
            <div className="mt-8 flex items-center justify-center gap-2 hidden md:flex">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-300 p-2 text-slate-600 transition hover:border-slate-400 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#2a3460] dark:text-brand-pale dark:hover:border-[#3a4876] dark:hover:bg-[#11193a]"
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-10 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                        currentPage === page
                          ? "bg-brand-navy text-white shadow-md"
                          : "border border-gray-300 text-slate-600 hover:border-slate-400 hover:bg-gray-100 dark:border-[#2a3460] dark:text-brand-pale dark:hover:border-[#3a4876] dark:hover:bg-[#11193a]"
                      }`}
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-300 p-2 text-slate-600 transition hover:border-slate-400 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#2a3460] dark:text-brand-pale dark:hover:border-[#3a4876] dark:hover:bg-[#11193a]"
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </section>
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
                <h2 className="text-base font-bold text-brand-navy">
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

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <FilterControls filters={filters} setFilter={setFilter} />
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-gray-200 p-4 dark:border-[#1c2444]">
                <button
                  type="button"
                  onClick={() =>
                    setFilters({
                      Type: "All",
                      Brand: "All",
                      Colour: "All",
                      Range: "All",
                      Availability: "All",
                    })
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-[#2a3460] dark:text-brand-pale"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white"
                >
                  Show {filtered.length}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
