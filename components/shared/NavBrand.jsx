import { useApp } from "@/components/context/AppContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavBrand() {
  const { brands, setShopFilters } = useApp();
  const router = useRouter();

  const handleBrandClick = (brandId) => {
    setShopFilters({
      search: "",
      category_ids: [],
      brand_id: brandId.toString(),
      orderByPrice: "0",
      lowest_price: "",
      highest_price: "",
      page: 1,
      rows: 12,
    });
    router.push("/shop");
  };

  return (
    <div className="flex flex-wrap gap-4">
      {brands.map((brand) => (
        <button 
          key={brand.id} 
          onClick={() => handleBrandClick(brand.id)} 
          className="group/item p-4 flex flex-col items-center transition-all duration-300 cursor-pointer"
        >
          <div className="relative w-24 h-24 overflow-hidden rounded">
            <Image 
              src={brand.logo} 
              alt={brand.name} 
              fill
              className="object-cover group-hover/item:scale-110 transition-transform duration-300" 
            />
          </div>
          <p className="text-sm mt-3 text-[#050a30] dark:text-[#f0ebe3]/80 group-hover/item:text-[#050a30] dark:group-hover/item:text-[#f0ebe3] transition-colors duration-300">{brand.name}</p>
        </button>
      ))}
    </div>
  );
}
