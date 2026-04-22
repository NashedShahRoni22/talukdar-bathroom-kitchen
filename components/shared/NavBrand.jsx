import { useApp } from "@/components/context/AppContext";
import Image from "next/image";
import Link from "next/link";

export default function NavBrand() {
  const { brands } = useApp();
  
  return (
    <div className="flex flex-wrap gap-4">
      {brands.map((brand) => (
        <Link key={brand.id} href={`/shop/brand/${brand.slug}`} className="group/item p-4 flex flex-col items-center transition-all duration-300">
          <div className="relative w-24 h-24 overflow-hidden rounded">
            <Image 
              src={brand.logo} 
              alt={brand.name} 
              fill
              className="object-cover group-hover/item:scale-110 transition-transform duration-300" 
            />
          </div>
          <p className="text-sm mt-3 text-[#050a30] dark:text-[#f0ebe3]/80 group-hover/item:text-[#050a30] dark:group-hover/item:text-[#f0ebe3] transition-colors duration-300">{brand.name}</p>
        </Link>
      ))}
    </div>
  );
}
