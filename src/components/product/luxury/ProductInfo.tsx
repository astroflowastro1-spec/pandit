"use client";

import { useState } from "react";
import { FiStar, FiShoppingCart, FiCreditCard, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useCountry } from "@/context/CountryContext";

interface ProductInfoProps {
  product: any;
  formattedPrice: string;
  formattedOriginalPrice: string | null;
  rawPrice: number;
  rawOriginalPrice: number | null;
}

export default function ProductInfo({ product, formattedPrice, formattedOriginalPrice, rawPrice, rawOriginalPrice }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      slug: product.slug,
      title: product.title,
      price: rawPrice,
      image: product.imageSrc || product.images?.[0] || "",
      quantity: quantity
    });
    router.push("/cart");
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

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
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-semibold text-[#1A1A1A] leading-[1.2] mb-5 font-serif tracking-tight">
          {product.title}
        </h1>


      </motion.div>

      {/* Pricing Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 flex flex-col gap-4"
      >
        {/* Dynamic Discount Calc */}
        {(() => {
          const savingsPercent = rawOriginalPrice && rawOriginalPrice > rawPrice 
            ? Math.round(((rawOriginalPrice - rawPrice) / rawOriginalPrice) * 100) 
            : 0;

          return (
            <div className="flex items-end gap-4">
              <span className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                {formattedPrice}
              </span>
              {formattedOriginalPrice && savingsPercent > 0 && (
                <div className="flex flex-col pb-1">
                  <span className="text-lg text-gray-400 line-through font-medium">
                    {formattedOriginalPrice}
                  </span>
                  <span className="text-xs font-bold text-red-500 tracking-wide uppercase">
                    Save {savingsPercent}%
                  </span>
                </div>
              )}
            </div>
          );
        })()}
      </motion.div>


      {/* Short Description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 text-sm text-gray-600 leading-relaxed line-clamp-4"
      >
        <p className="whitespace-pre-wrap">{product.description}</p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-10 flex flex-col gap-4"
      >
        {/* Quantity & Buy It Now */}
        <div className="flex gap-4">
          <div className="flex items-center border border-gray-200 rounded-xl h-14 bg-white px-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 rounded-lg transition-colors font-medium"
            >
              -
            </button>
            <span className="w-8 text-center font-semibold text-gray-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 rounded-lg transition-colors font-medium"
            >
              +
            </button>
          </div>

          <button
            onClick={handleBuyNow}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold h-14 rounded-xl transition-all duration-300 shadow-[0_8px_20px_rgb(234,88,12,0.25)] hover:shadow-[0_12px_25px_rgb(234,88,12,0.35)] hover:-translate-y-0.5"
          >
            Buy It Now
          </button>
        </div>
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
          { title: "Ritual Video Proof", desc: "Shared With You", icon: "🎥" },
          { title: "Secure Payment", desc: "256-bit SSL", icon: "🔒" },
          { title: "Fast Delivery", desc: "Global Shipping", icon: "✈️" },
          { title: "Expert Verified", desc: "Tested Quality", icon: "✅" },
          { title: "Mantra Infused", desc: "For Positivity", icon: "🕉️" }
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
