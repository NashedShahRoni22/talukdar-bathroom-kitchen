"use client";

import { useApp } from "@/components/context/AppContext";
import { Check } from "lucide-react";

export default function ShopSidebar({ filters, setFilters }) {
  const { categories, brands } = useApp();

  const handleCategoryChange = (id) => {
    setFilters((prev) => {
      const isSelected = prev.category_ids.includes(id);
      const newIds = isSelected
        ? prev.category_ids.filter((cId) => cId !== id)
        : [...prev.category_ids, id];
      return { ...prev, category_ids: newIds, page: 1 };
    });
  };

  const handleBrandChange = (id) => {
    setFilters((prev) => ({
      ...prev,
      brand_id: prev.brand_id === id ? "" : id, // toggle
      page: 1,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category_ids: [],
      brand_id: "",
      orderByPrice: "0",
      lowest_price: "",
      highest_price: "",
      page: 1,
      rows: 12,
    });
  };

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-navy dark:text-brand-pale">
          Categories
        </h3>
        <div className="flex flex-col space-y-2">
          {categories?.map((cat) => (
            <label
              key={cat.id}
              className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 transition hover:text-brand-gold dark:text-[#9fa8cc] dark:hover:text-brand-gold"
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                  filters.category_ids.includes(cat.id)
                    ? "border-brand-gold bg-brand-gold text-white"
                    : "border-gray-300 dark:border-[#2a3460]"
                }`}
              >
                {filters.category_ids.includes(cat.id) && <Check size={14} />}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={filters.category_ids.includes(cat.id)}
                onChange={() => handleCategoryChange(cat.id)}
              />
              <span className="flex-1">{cat.name}</span>
              <span className="text-xs text-gray-400 dark:text-[#5a6591]">
                ({cat.total_products || 0})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-navy dark:text-brand-pale">
          Brands
        </h3>
        <div className="flex flex-col space-y-2">
          {brands?.map((brand) => (
            <label
              key={brand.id}
              className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 transition hover:text-brand-gold dark:text-[#9fa8cc] dark:hover:text-brand-gold"
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                  filters.brand_id === brand.id
                    ? "border-brand-gold bg-brand-gold text-white"
                    : "border-gray-300 dark:border-[#2a3460]"
                }`}
              >
                {filters.brand_id === brand.id && <div className="h-2 w-2 rounded-full bg-white" />}
              </div>
              <input
                type="radio"
                name="brand"
                className="hidden"
                checked={filters.brand_id === brand.id}
                onChange={() => handleBrandChange(brand.id)}
              />
              <span className="flex-1">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-navy dark:text-brand-pale">
          Price Range
        </h3>
        <div className="flex items-center gap-4">
          <input
            type="number"
            placeholder="Min"
            value={filters.lowest_price}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, lowest_price: e.target.value, page: 1 }))
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 dark:border-[#2a3460] dark:bg-[#11193a] dark:text-brand-pale"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.highest_price}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, highest_price: e.target.value, page: 1 }))
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 dark:border-[#2a3460] dark:bg-[#11193a] dark:text-brand-pale"
          />
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="w-full rounded-lg bg-gray-100 py-3 text-sm font-semibold text-slate-600 transition hover:bg-gray-200 dark:bg-[#11193a] dark:text-[#9fa8cc] dark:hover:bg-[#1a2340] dark:hover:text-white"
      >
        Clear All Filters
      </button>
    </div>
  );
}
