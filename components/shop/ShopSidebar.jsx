"use client";

import { useApp } from "@/components/context/AppContext";
import { Check } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

export default function ShopSidebar({ filters, setFilters }) {
  const { categories, brands } = useApp();
  const [expandedParents, setExpandedParents] = useState(new Set());

  // Parent categories have parent: null
  const parentCategories = useMemo(() => {
    return categories?.filter((cat) => !cat.parent) || [];
  }, [categories]);

  // Initialize expanded parents based on current filter selections
  useEffect(() => {
    const newExpanded = new Set();
    parentCategories.forEach((parentCat) => {
      if (filters.category_ids.includes(parentCat.id)) {
        newExpanded.add(parentCat.id);
      }
    });
    setExpandedParents(newExpanded);
  }, [filters.category_ids, parentCategories]);

  const handleCategoryChange = (id, childIds = []) => {
    setFilters((prev) => {
      const isSelected = prev.category_ids.includes(id);
      
      let newIds;
      if (isSelected) {
        // When unselecting, remove the category, and if it's a parent, remove its children too
        newIds = prev.category_ids.filter((cId) => cId !== id && !childIds.includes(cId));
      } else {
        newIds = [...prev.category_ids, id];
      }
      return { ...prev, category_ids: newIds, page: 1 };
    });

    // Auto-expand parent when selected, auto-collapse when unselected
    const isParent = parentCategories.some((p) => p.id === id);
    if (isParent) {
      const newExpanded = new Set(expandedParents);
      if (!expandedParents.has(id)) {
        newExpanded.add(id);
      } else {
        newExpanded.delete(id);
      }
      setExpandedParents(newExpanded);
    }
  };

  const handleBrandChange = (id) => {
    setFilters((prev) => ({
      ...prev,
      brand_id: prev.brand_id === id.toString() ? "" : id.toString(), // toggle
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
        <div className="flex flex-col space-y-0">
          {parentCategories?.map((parentCat) => {
            const childCategories = parentCat.child || [];
            const isExpanded = expandedParents.has(parentCat.id);

            return (
              <div key={parentCat.id}>
                {/* Parent Category */}
                <div className="flex items-center border-b border-gray-100 dark:border-[#2a3460]">
                  {/* Checkbox and Parent Info */}
                  <label className="flex flex-1 cursor-pointer items-center gap-3 px-0 py-2.5 text-sm text-slate-600 transition hover:text-brand-gold dark:text-[#9fa8cc] dark:hover:text-brand-gold">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                        filters.category_ids.includes(parentCat.id)
                          ? "border-brand-gold bg-brand-gold text-white"
                          : "border-gray-300 dark:border-[#2a3460]"
                      }`}
                    >
                      {filters.category_ids.includes(parentCat.id) && <Check size={14} />}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={filters.category_ids.includes(parentCat.id)}
                      onChange={() => handleCategoryChange(parentCat.id, childCategories.map(c => c.id))}
                    />
                    <span className="flex-1 text-left font-medium">{parentCat.name}</span>
                    <span className="text-xs text-gray-400 dark:text-[#5a6591]">
                      ({parentCat.total_products || 0})
                    </span>
                  </label>
                </div>

                {/* Child Categories */}
                {isExpanded && childCategories.length > 0 && (
                  <div className="bg-gray-50/50 dark:bg-[#0d1333]/30">
                    {childCategories.map((childCat) => (
                      <label
                        key={childCat.id}
                        className="flex cursor-pointer items-center gap-3 border-b border-gray-100 px-0 py-2.5 pl-8 text-sm text-slate-600 transition hover:text-brand-gold dark:border-[#2a3460] dark:text-[#9fa8cc] dark:hover:text-brand-gold"
                      >
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                            filters.category_ids.includes(childCat.id)
                              ? "border-brand-gold bg-brand-gold text-white"
                              : "border-gray-300 dark:border-[#2a3460]"
                          }`}
                        >
                          {filters.category_ids.includes(childCat.id) && <Check size={14} />}
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={filters.category_ids.includes(childCat.id)}
                          onChange={() => handleCategoryChange(childCat.id)}
                        />
                        <span className="flex-1">{childCat.name}</span>
                        <span className="text-xs text-gray-400 dark:text-[#5a6591]">
                          ({childCat.total_products || 0})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-navy dark:text-brand-pale">
          Brands
        </h3>
        <div className="flex flex-col space-y-0">
          {brands?.map((brand) => (
            <label
              key={brand.id}
              className="flex cursor-pointer items-center gap-3 border-b border-gray-100 px-0 py-2.5 text-sm text-slate-600 transition hover:text-brand-gold dark:border-[#2a3460] dark:text-[#9fa8cc] dark:hover:text-brand-gold"
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                  filters.brand_id && (filters.brand_id === brand.id || filters.brand_id === brand.id.toString())
                    ? "border-brand-gold bg-brand-gold text-white"
                    : "border-gray-300 dark:border-[#2a3460]"
                }`}
              >
                {filters.brand_id && (filters.brand_id === brand.id || filters.brand_id === brand.id.toString()) && <Check size={14} />}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={filters.brand_id ? (filters.brand_id === brand.id || filters.brand_id === brand.id.toString()) : false}
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
