"use client";

import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/components/context/AppContext";
import Link from "next/link";

export default function CartItem({ item }) {
  const { removeFromCartDBGuest, updateQuantityDBGuest } = useApp();

  const cartId = item.cart_id;
  const quantity = Number(item.quantity);
  const price = Number(item.price);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30, height: 0 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4 py-4 border-b border-gray-100 dark:border-[#1c2444]"
    >
      {/* Product Image */}
      <Link
        href={`/product/${item.slug}`}
        className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100"
      >
        <Image
          src={item.thumbnail_image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Link href={`/product/${item.slug}`}>
          <h4 className="text-sm font-semibold text-gray-800 dark:text-[#e8d9c4] leading-tight line-clamp-2 mt-0.5">
            {item.name} ({item.variant})
          </h4>
        </Link>

        <p className="text-sm font-bold mt-1 text-[#050a30] dark:text-[#e8d9c4]">
          ${price.toFixed(2)}
        </p>

        <div className="flex items-center justify-between mt-2">
          {/* Quantity Controls */}
          <div
            className="flex items-center rounded-lg overflow-hidden border"
            style={{ borderColor: "#e8d9c4" }}
          >
            <button
              onClick={() => updateQuantityDBGuest(item, quantity - 1)}
              className="cursor-pointer w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-[#1a2340] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-gray-700 dark:text-[#e8d9c4]">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantityDBGuest(item, quantity + 1)}
              className="cursor-pointer w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-[#1a2340] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Line Total */}
            <span className="text-sm font-bold text-[#050a30] dark:text-[#e8d9c4]">
              ${Number(item.sub_total).toFixed(2)}
            </span>
            {/* Remove Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => removeFromCartDBGuest(cartId)}
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
