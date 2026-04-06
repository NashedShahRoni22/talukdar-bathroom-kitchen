"use client";

import { useGetData } from "@/components/helpers/useGetData";
import Loader from "@/components/loader/Loader";
import ProductDetails from "@/components/product/ProductDetails";

export default function ProductPageClient({ slug, initialProduct = null }) {
  const shouldFetch = !initialProduct && Boolean(slug);

  const { data, isLoading, isError } = useGetData(
    shouldFetch ? `product/${slug}` : "product/placeholder",
    {},
    {
      enabled: shouldFetch,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
    },
  );

  const fetched = data?.data ?? data;
  const product = initialProduct || fetched;

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !product?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-brand-navy pt-20">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Product Not Found</h1>
          <p className="text-slate-600 dark:text-[#9fa8cc]">The product you are looking for is unavailable right now.</p>
        </div>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
