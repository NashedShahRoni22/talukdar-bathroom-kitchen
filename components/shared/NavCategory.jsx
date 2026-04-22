import { useApp } from "@/components/context/AppContext";
import Image from "next/image";
import Link from "next/link";

export default function NavCategory() {
  const { categories } = useApp();
  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((cat) => (
        <Link key={cat.id} href={`/shop/${cat.slug}`} className="group/item p-4 flex flex-col items-center transition-all duration-300">
          <div className="relative w-24 h-24 overflow-hidden rounded">
            <Image 
              src={cat.icon} 
              alt={cat.name} 
              fill
              className="object-cover group-hover/item:scale-110 transition-transform duration-300" 
            />
          </div>
          <p className="text-sm mt-3 text-[#050a30] dark:text-[#f0ebe3]/80 group-hover/item:text-[#050a30] dark:group-hover/item:text-[#f0ebe3] transition-colors duration-300">{cat.name}</p>
        </Link>
      ))}
    </div>
  );
}
