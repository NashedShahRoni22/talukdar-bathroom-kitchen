'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/components/context/AppContext';

export default function ProductCard({ p }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { addToCart } = useApp();

  function handleAddToCart() {
    addToCart({ id: p?.id, name: p?.name, price: p?.price, image: p?.thumbnail_image, category: p?.category, rating: p?.rating });
  }

  return (
    <Link href={`/product/${p?.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="bg-white dark:bg-[#0a0f2e] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full cursor-pointer"
      >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <Image
          src={p?.thumbnail_image}
          alt={p?.name}
          fill
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
          quality={90}
        />

        {/* Overlay Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer p-3 rounded-full text-white transition-colors"
            style={{ backgroundColor: '#785d32' }}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart size={20} fill={isFavorite ? 'white' : 'none'} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer p-3 rounded-full text-white transition-colors"
            style={{ backgroundColor: '#050a30' }}
          >
            <Eye size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer p-3 rounded-full text-white transition-colors"
            style={{ backgroundColor: '#785d32' }}
            onClick={handleAddToCart}
          >
            <ShoppingCart size={20} />
          </motion.button>
        </motion.div>

        {/* Category Badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-semibold"
          style={{ backgroundColor: '#050a30' }}
        >
          {p?.category || "Category"}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 dark:text-[#e8d9c4] text-sm mb-2 line-clamp-2">{p?.name}</h3>


        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#050a30] dark:text-[#f0ebe3]">
            ${p?.base_price}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="cursor-pointer px-4 py-2 rounded-lg text-white font-semibold text-sm transition-all"
            style={{ backgroundColor: '#785d32' }}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
      </motion.div>
    </Link>
  );
}
