'use client';

import { useGetData } from '@/components/helpers/useGetData';
import ProductSection from './ProductSection';
import Loader from '@/components/loader/Loader';

export default function BestSellingSection() {
  const { data, isLoading, isError } = useGetData('best-selling');

  if (isLoading) return <div className="flex justify-center py-20"><Loader /></div>;
  if (isError || !data?.data) return null;

  return (
    <ProductSection
      title="Best Selling"
      subtitle="Customer Favorites"
      id="best-selling"
      products={data.data}
    />
  );
}
