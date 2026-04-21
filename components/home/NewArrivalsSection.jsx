'use client';

import { useGetData } from '@/components/helpers/useGetData';
import ProductSection from './ProductSection';
import Loader from '@/components/loader/Loader';

export default function NewArrivalsSection() {
  const { data, isLoading, isError } = useGetData('new-arrivals');

  if (isLoading) return <div className="flex justify-center py-20"><Loader /></div>;
  if (isError || !data?.data) return null;

  return (
    <ProductSection
      title="New Arrivals"
      subtitle="Latest Additions"
      id="new-arrivals"
      products={data.data}
    />
  );
}
