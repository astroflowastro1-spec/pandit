"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SafeImage from "@/components/ui/SafeImage";

export default function StickyBuyBar({ product, formattedPrice }: { product: any, formattedPrice: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 600px (approx past the main add to cart)
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-10px_40px_rgb(0,0,0,0.05)] py-3 px-4 md:px-8 hidden md:block"
        >
          <div className="container mx-auto max-w-7xl flex justify-between items-center">
            
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-16 rounded-md overflow-hidden bg-gray-100">
                <SafeImage src={product.imageSrc} alt={product.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 font-serif truncate max-w-[200px] lg:max-w-md">{product.title}</span>
                <span className="text-xs text-orange-600 font-medium">★★★★★ 4.9 (124)</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-xl font-black text-gray-900">
                {formattedPrice}
              </div>
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgb(234,88,12,0.25)] hover:shadow-[0_8px_20px_rgb(234,88,12,0.35)] hover:-translate-y-0.5 whitespace-nowrap">
                Add to Cart
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
