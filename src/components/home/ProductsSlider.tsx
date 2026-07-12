"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useCountry } from "@/context/CountryContext";
import { FiShoppingCart } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductsSlider() {
  const [products, setProducts] = useState<any[]>([]);
  const { convertPrice, formatPrice, isReady } = useCountry();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 font-serif">
            Divine Products & Chadhava
          </h2>
          <p className="text-gray-500 text-lg">
            Authentic Rudraksha, Yantras, and Spiritual Items shipped globally.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}
          className="pb-16 px-4 !py-4"
        >
          {products.map((product) => {
            const price = isReady ? convertPrice(product.priceUsd) : product.priceInr;
            const originalPrice = isReady 
              ? (product.originalPriceUsd ? convertPrice(product.originalPriceUsd) : null)
              : product.originalPriceInr;
              
            const formattedPrice = isReady ? formatPrice(price) : `₹${price}`;
            const formattedOriginalPrice = originalPrice ? (isReady ? formatPrice(originalPrice) : `₹${originalPrice}`) : null;

            return (
              <SwiperSlide key={product._id} className="h-auto">
                <div className="bg-white rounded-2xl border border-gray-100 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden group">
                  <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                    <Image 
                      src={product.imageSrc} 
                      alt={product.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    {formattedOriginalPrice && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                        SALE
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-2">
                      {product.category}
                    </span>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2 flex-1">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div className="flex flex-col">
                        {formattedOriginalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {formattedOriginalPrice}
                          </span>
                        )}
                        <span className="text-xl font-black text-gray-900">
                          {formattedPrice}
                        </span>
                      </div>
                      
                      <button className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
                        <FiShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
