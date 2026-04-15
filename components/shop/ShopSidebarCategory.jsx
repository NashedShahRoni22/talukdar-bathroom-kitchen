"use client";

import { Check } from "lucide-react";

export default function ShopSidebarCategory({ categoryFilters, filters, setFilters }) {
  const handleAttributeValueChange = (attributeId, valueId) => {
    setFilters((prev) => {
      const newAttributeValues = [...prev.attribute_values];
      const valueKey = `${attributeId}_${valueId}`;
      const index = newAttributeValues.indexOf(valueKey);

      if (index > -1) {
        newAttributeValues.splice(index, 1);
      } else {
        newAttributeValues.push(valueKey);
      }

      return { ...prev, attribute_values: newAttributeValues, page: 1 };
    });
  };

  const handleBrandChange = (brandId) => {
    setFilters((prev) => ({
      ...prev,
      brand_id: prev.brand_id === brandId ? "" : brandId,
      page: 1,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      attribute_values: [],
      brand_id: "",
      orderByPrice: "0",
      lowest_price: "",
      highest_price: "",
      page: 1,
      rows: 12,
    });
  };

  if (!categoryFilters || categoryFilters.length === 0) {
    return (
      <div className="space-y-8">
        <p className="text-sm text-slate-500 dark:text-[#9fa8cc]">No filters available</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Dynamic Filters from API */}
      {categoryFilters.map((filter) => {
        if (filter.type === "brand") {
          return (
            <div key={filter.id}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-navy dark:text-brand-pale">
                {filter.name}
              </h3>
              <div className="flex flex-col space-y-2">
                {filter.values.map((brand) => (
                  <label
                    key={brand.id}
                    className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 transition hover:text-brand-gold dark:text-[#9fa8cc] dark:hover:text-brand-gold"
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                        filters.brand_id === String(brand.id)
                          ? "border-brand-gold bg-brand-gold text-white"
                          : "border-gray-300 dark:border-[#2a3460]"
                      }`}
                    >
                      {filters.brand_id === String(brand.id) && (
                        <div className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="brand"
                      className="hidden"
                      checked={filters.brand_id === String(brand.id)}
                      onChange={() => handleBrandChange(String(brand.id))}
                    />
                    <span className="flex-1">{brand.value}</span>
                    {brand.count !== undefined && (
                      <span className="text-xs text-gray-400 dark:text-[#5a6591]">
                        ({brand.count})
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          );
        }

        // Attribute filters (Color, Size, etc.)
        return (
          <div key={filter.id}>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-navy dark:text-brand-pale">
              {filter.name}
            </h3>
            <div className="flex flex-col space-y-2">
              {filter.values.map((value) => {
                const valueKey = `${filter.id}_${value.id}`;
                const isSelected = filters.attribute_values.includes(valueKey);

                return (
                  <label
                    key={value.id}
                    className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 transition hover:text-brand-gold dark:text-[#9fa8cc] dark:hover:text-brand-gold"
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                        isSelected
                          ? "border-brand-gold bg-brand-gold text-white"
                          : "border-gray-300 dark:border-[#2a3460]"
                      }`}
                    >
                      {isSelected && <Check size={14} />}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isSelected}
                      onChange={() =>
                        handleAttributeValueChange(filter.id, value.id)
                      }
                    />

                    {/* Show color/attribute visually if image exists */}
                    {value.image && (
                      <div
                        className="h-4 w-4 rounded-full border border-gray-300 dark:border-[#2a3460]"
                        style={{ backgroundColor: value.value }}
                        title={value.value}
                      />
                    )}

                    <span className="flex-1">{value.value}</span>
                    {value.count !== undefined && (
                      <span className="text-xs text-gray-400 dark:text-[#5a6591]">
                        ({value.count})
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}

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
              setFilters((prev) => ({
                ...prev,
                lowest_price: e.target.value,
                page: 1,
              }))
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 dark:border-[#2a3460] dark:bg-[#11193a] dark:text-brand-pale"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.highest_price}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                highest_price: e.target.value,
                page: 1,
              }))
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
