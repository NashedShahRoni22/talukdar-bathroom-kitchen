'use client';

import Image from 'next/image';
import { Trash2, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/components/context/AppContext';

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useApp();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30, height: 0 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4 py-4 border-b border-gray-100"
    >
      {/* Product Image */}
      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <span
          className="text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: '#785d32' }}
        >
          {item.category}
        </span>
        <h4 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2 mt-0.5">
          {item.name}
        </h4>
        <p className="text-sm font-bold mt-1" style={{ color: '#050a30' }}>
          ${item.price.toFixed(2)}
        </p>

        <div className="flex items-center justify-between mt-2">
          {/* Quantity Controls */}
          <div
            className="flex items-center rounded-lg overflow-hidden border"
            style={{ borderColor: '#e8d9c4' }}
          >
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-gray-700">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Line Total */}
            <span className="text-sm font-bold" style={{ color: '#050a30' }}>
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            {/* Remove Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => removeFromCart(item.id)}
              className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
