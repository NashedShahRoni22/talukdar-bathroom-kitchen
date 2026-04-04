'use client';

import { useEffect, useState } from 'react';
import { useGetData } from '@/components/helpers/useGetData';
import Loader from '@/components/loader/Loader';

export default function ProductPage() {
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    // Extract slug from pathname
    const pathname = window.location.pathname;
    const slugFromPath = pathname.split('/product/')[1];
    setSlug(slugFromPath);
  }, []);

  // Fetch product by slug only when slug is available
  const { data: productData, isLoading, error } = useGetData(
    slug ? `products/${slug}` : 'products/placeholder',
    {},
    {
      enabled: !!slug,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
    }
  );

  const product = productData?.data;

  useEffect(() => {
    console.log('Current Slug:', slug);
  }, [slug]);

  // Log product data to console
  useEffect(() => {
    if (product) {
      console.log('Product Data:', product);
      console.log('Product ID:', product?.id);
      console.log('Product Name:', product?.name);
      console.log('Product Slug:', product?.slug);
      console.log('Product Price:', product?.base_price);
      console.log('Product Description:', product?.description);
    }
  }, [product]);

  if (!slug || isLoading) return <Loader />;

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-brand-navy pt-20">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Product Not Found</h1>
          <p className="text-slate-600 dark:text-[#9fa8cc]">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-brand-navy pt-20">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="w-full aspect-square bg-gray-200 dark:bg-[#1c2444] rounded-lg" />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              {product?.name}
            </h1>

            <p className="text-sm text-slate-600 dark:text-[#9fa8cc] mb-6">
              SKU: {product?.sku || 'N/A'}
            </p>

            <div className="text-4xl font-bold text-brand-gold mb-6">
              ${product?.base_price}
            </div>

            <div className="prose dark:prose-invert max-w-none mb-8">
              <p className="text-slate-700 dark:text-[#e8d9c4] leading-relaxed">
                {product?.short_description || product?.description}
              </p>
            </div>

            <div className="flex gap-4 mb-8">
              <button
                className="flex-1 px-6 py-3 rounded-lg bg-brand-gold text-white font-semibold transition hover:brightness-90"
              >
                Add to Cart
              </button>
              <button
                className="flex-1 px-6 py-3 rounded-lg border-2 border-brand-gold text-brand-gold font-semibold transition hover:bg-brand-gold/10"
              >
                Add to Wishlist
              </button>
            </div>

            {/* Product Meta */}
            <div className="space-y-3 pt-6 border-t border-gray-300 dark:border-[#1c2444]">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-[#9fa8cc]">Category:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{product?.category || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-[#9fa8cc]">Availability:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{product?.availability || 'In Stock'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full Description */}
        {product?.description && (
          <div className="mt-16 pt-8 border-t border-gray-300 dark:border-[#1c2444]">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Description</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-slate-700 dark:text-[#e8d9c4] leading-relaxed">
                {product?.description}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
