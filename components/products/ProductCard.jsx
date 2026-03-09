'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/components/context/AppContext';

export default function ProductCard({ id, name, price, image, category, rating }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { addToCart } = useApp();

  function handleAddToCart() {
    addToCart({ id, name, price, image, category, rating });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
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
            className="p-3 rounded-full text-white transition-colors"
            style={{ backgroundColor: '#785d32' }}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart size={20} fill={isFavorite ? 'white' : 'none'} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full text-white transition-colors"
            style={{ backgroundColor: '#050a30' }}
          >
            <Eye size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full text-white transition-colors"
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
          {category}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">{name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
          <span className="text-xs text-gray-600 ml-2">({rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold" style={{ color: '#050a30' }}>
            ${price.toFixed(2)}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="px-4 py-2 rounded-lg text-white font-semibold text-sm transition-all"
            style={{ backgroundColor: '#785d32' }}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
