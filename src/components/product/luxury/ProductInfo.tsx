"use client";

import { FiStar, FiShoppingCart, FiCreditCard, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";

interface ProductInfoProps {
  product: any;
  formattedPrice: string;
  formattedOriginalPrice: string | null;
}

export default function ProductInfo({ product, formattedPrice, formattedOriginalPrice }: ProductInfoProps) {
  return (
    <div className="flex flex-col h-full font-sans">
      
      {/* Category & Title */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <span className="inline-block text-[10px] font-bold text-orange-600 tracking-[0.2em] uppercase mb-4">
          {product.category}
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-[54px] font-medium text-[#1A1A1A] leading-[1.1] mb-6 font-serif tracking-tight">
          {product.title}
        </h1>
        
        {/* Engagement Stats */}
        <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-1.5">
            <div className="flex text-orange-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar key={star} className="fill-current w-4 h-4" />
              ))}
            </div>
            <span className="text-gray-900 border-b border-gray-900 leading-none pb-0.5 hover:text-orange-600 hover:border-orange-600 transition-colors cursor-pointer">124 Reviews</span>
          </div>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span className="text-green-600 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            34 Live Viewers
          </span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>🔥 2k+ Sold</span>
        </div>
      </motion.div>

      {/* Pricing Section - Premium Info Chips */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 p-6 bg-white rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col gap-4"
      >
        <div className="flex items-end gap-4">
          <span className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            {formattedPrice}
          </span>
          {formattedOriginalPrice && (
            <div className="flex flex-col pb-1">
              <span className="text-lg text-gray-400 line-through font-medium">
                {formattedOriginalPrice}
              </span>
              <span className="text-xs font-bold text-red-500 tracking-wide uppercase">
                Save 25%
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-emerald-100">
            Inclusive of GST
          </span>
          <span className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-blue-100">
            Free Shipping
          </span>
          <span className="bg-orange-50 text-orange-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-orange-100">
            7 Day Returns
          </span>
        </div>
      </motion.div>


      {/* Short Description */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 prose prose-sm text-gray-600 line-clamp-4"
      >
        <p className="leading-relaxed whitespace-pre-wrap">{product.description}</p>
      </motion.div>

      {/* Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-10 flex flex-col gap-4"
      >
        {/* Quantity (Mock) & Add to Cart */}
        <div className="flex gap-4">
          <div className="flex items-center border border-gray-200 rounded-xl h-14 bg-white px-2">
            <button className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 rounded-lg transition-colors font-medium">-</button>
            <span className="w-8 text-center font-semibold text-gray-900">1</span>
            <button className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 rounded-lg transition-colors font-medium">+</button>
          </div>
          
          <button className="flex-1 bg-gray-900 hover:bg-black text-white font-medium h-14 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-[0_8px_20px_rgb(0,0,0,0.15)] hover:shadow-[0_12px_25px_rgb(0,0,0,0.25)] hover:-translate-y-0.5 group overflow-hidden relative">
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-600 rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
            <FiShoppingCart size={20} className="relative z-10" />
            <span className="relative z-10">Add to Cart</span>
          </button>
        </div>
        
        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold h-14 rounded-xl transition-all duration-300 shadow-[0_8px_20px_rgb(234,88,12,0.25)] hover:shadow-[0_12px_25px_rgb(234,88,12,0.35)] hover:-translate-y-0.5">
          Buy It Now
        </button>
      </motion.div>

      {/* Premium Trust Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3"
      >
        {[
          { title: "100% Authentic", desc: "Certified Products", icon: "💎" },
          { title: "Energized", desc: "By Expert Pandits", icon: "✨" },
          { title: "Secure Payment", desc: "256-bit SSL", icon: "🔒" },
          { title: "Fast Delivery", desc: "Global Shipping", icon: "✈️" },
          { title: "Easy Returns", desc: "7-Day Policy", icon: "🔄" },
          { title: "24/7 Support", desc: "Always Here", icon: "🎧" }
        ].map((trust, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-xl p-3 flex flex-col gap-1 items-center text-center shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
            <span className="text-xl mb-1">{trust.icon}</span>
            <span className="text-[11px] font-bold text-gray-900 uppercase tracking-wide leading-tight">{trust.title}</span>
            <span className="text-[10px] text-gray-500 leading-tight">{trust.desc}</span>
          </div>
        ))}
      </motion.div>

    </div>
  );
}
