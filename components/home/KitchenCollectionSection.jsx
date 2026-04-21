'use client';

import { useGetData } from '@/components/helpers/useGetData';
import ProductSection from './ProductSection';
import Loader from '@/components/loader/Loader';

export default function KitchenCollectionSection() {
  const { data, isLoading, isError } = useGetData('products/category/kitchen-collection');

  if (isLoading) return <div className="flex justify-center py-20"><Loader /></div>;
  if (isError || !data?.data) return null;

  return (
    <ProductSection
      title="Kitchen Collections"
      subtitle="Luxury Kitchens"
      id="kitchens"
      products={data.data}
    />
  );
}
