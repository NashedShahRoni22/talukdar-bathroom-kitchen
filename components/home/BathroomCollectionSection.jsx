'use client';

import { useGetData } from '@/components/helpers/useGetData';
import ProductSection from './ProductSection';
import Loader from '@/components/loader/Loader';

export default function BathroomCollectionSection() {
  const { data, isLoading, isError } = useGetData('products/category/bathroom-collection');

  if (isLoading) return <div className="flex justify-center py-20"><Loader /></div>;
  if (isError || !data?.data) return null;

  return (
    <ProductSection
      title="Bathroom Collections"
      subtitle="Premium Bathroom"
      id="bathrooms"
      products={data.data}
    />
  );
}
