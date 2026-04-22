import { useApp } from "@/components/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavRoom() {
  const { roomCategories } = useApp();
  const [activeRoom, setActiveRoom] = useState(roomCategories[0]?.id || null);

  const activeRoomData = roomCategories.find((cat) => cat.id === activeRoom);

  return (
    <div className="flex gap-6 p-4">
      {/* Left Sidebar - Room Tabs */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="group flex flex-col gap-2"
      >
        {roomCategories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => setActiveRoom(cat.id)}
            className={`flex items-center gap-2 px-3 py-2 relative transition-colors duration-200 text-sm font-medium whitespace-nowrap ${
              activeRoom === cat.id
                ? "text-[#050a30] dark:text-[#f0ebe3]"
                : "text-[#050a30]/60 dark:text-[#f0ebe3]/60"
            }`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={cat.icon}
              alt={cat.name}
              width={40}
              height={40}
              className="rounded flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
            />
            <span>{cat.name}</span>

            {/* Active indicator */}
            {activeRoom === cat.id && (
              <motion.div
                layoutId="room-indicator"
                className="absolute left-0 top-0 bottom-0 w-1 bg-[#785d32]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Divider */}
      <motion.div
        className="h-full w-0.5 bg-[#c4a97e]"
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Right Content - Subcategories */}
      {activeRoomData && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRoom}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 overflow-hidden"
          >
            <div className="mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-[#050a30] dark:text-[#f0ebe3]">
                {activeRoomData.name}
              </h3>
            </div>
            <div className="flex flex-wrap gap-4">
              {activeRoomData.children.map((subcat) => (
                <Link
                  key={subcat.id}
                  href={`/shop/${activeRoomData.slug}/${subcat.slug}`}
                  className="group/item p-4 flex flex-col items-center transition-all duration-300"
                >
                  <div className="relative w-24 h-24 overflow-hidden rounded">
                    <Image
                      src={subcat.icon}
                      alt={subcat.name}
                      fill
                      className="object-cover group-hover/item:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-sm mt-3 text-[#050a30] dark:text-[#f0ebe3]/80 group-hover/item:text-[#050a30] dark:group-hover/item:text-[#f0ebe3] transition-colors duration-300">{subcat.name}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
