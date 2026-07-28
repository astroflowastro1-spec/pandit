"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/ui/SafeImage";
import { useCountry } from "@/context/CountryContext";
import { FiShoppingCart, FiHeart, FiEye } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ShopClient() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { convertPrice, formatPrice, isReady, countryData } = useCountry();
  const isIndia = isReady && countryData?.currencyCode === 'INR';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getPrice = (product: any) => {
    if (!isReady) return product.priceInr;
    return isIndia ? product.priceInr : convertPrice(product.priceUsd);
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">


        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product, idx) => {
              const price = getPrice(product);
              const formattedPrice = isReady ? formatPrice(price) : `₹${price}`;

              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group flex flex-col"
                >
                  <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] bg-[#FAF7F2] rounded-[24px] overflow-hidden mb-4 shadow-sm border border-[#EAE3D5]">
                    <SafeImage 
                      src={product.imageSrc} 
                      alt={product.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    
                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2">
                      <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                        <button className="w-full bg-white/95 backdrop-blur-sm hover:bg-orange-600 hover:text-white text-gray-900 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm text-sm">
                          <FiShoppingCart /> Quick Add
                        </button>
                      </div>
                    </div>

                    <button className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white shadow-sm transition-all opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 duration-300">
                      <FiHeart className="w-4 h-4" />
                    </button>
                    <button className="absolute top-16 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-white shadow-sm transition-all opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 duration-300 delay-75">
                      <FiEye className="w-4 h-4" />
                    </button>
                  </Link>

                  <div className="flex flex-col text-center mt-2 px-2">
                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1.5">{product.category}</span>
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="text-lg font-serif font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-1 truncate">{product.title}</h3>
                    </Link>
                    <span className="text-gray-500 font-medium">{formattedPrice}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}
