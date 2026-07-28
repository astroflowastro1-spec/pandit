"use client";

import { useEffect, useState } from "react";
import SafeImage from "@/components/ui/SafeImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useCountry } from "@/context/CountryContext";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductsSlider() {
  const [products, setProducts] = useState<any[]>([]);
  const { convertPrice, formatPrice, isReady, countryData } = useCountry();

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
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif text-center">
            Divine Products & Chadhava
          </h2>
          <div className="w-20 h-1 bg-orange-500 rounded-full"></div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={28}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}
          className="pb-20 px-4 !pt-4 !pb-16 products-swiper"
        >
          {products.map((product) => {
            const isIndia = isReady && countryData.currencyCode === 'INR';
            
            const price = isReady 
              ? (isIndia ? product.priceInr : convertPrice(product.priceUsd)) 
              : product.priceInr;
              
            const originalPrice = isReady 
              ? (isIndia 
                  ? product.originalPriceInr 
                  : (product.originalPriceUsd ? convertPrice(product.originalPriceUsd) : null))
              : product.originalPriceInr;
              
            const formattedPrice = isReady ? formatPrice(price) : `₹${price}`;
            const formattedOriginalPrice = originalPrice ? (isReady ? formatPrice(originalPrice) : `₹${originalPrice}`) : null;

            return (
              <SwiperSlide key={product._id} className="h-auto">
                <Link href={`/product/${product.slug}`} className="block h-full">
                  <div className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 border border-gray-100 transition-all duration-300 h-full flex flex-col group cursor-pointer">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#F8F9FA] mb-5">
                      <SafeImage 
                        src={product.imageSrc} 
                        alt={product.title} 
                        fill 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                      />
                      
                      {formattedOriginalPrice && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm z-20 tracking-wider">
                          SALE
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {product.category}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-gray-900 text-[17px] leading-snug mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                        {product.title}
                      </h3>
                      
                      <p className="text-[13px] text-gray-500 mb-6 line-clamp-2 flex-1 leading-relaxed">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                          {formattedOriginalPrice && (
                            <span className="text-xs text-gray-400 line-through mb-0.5">
                              {formattedOriginalPrice}
                            </span>
                          )}
                          <span className="text-xl font-black text-gray-900 tracking-tight">
                            {formattedPrice}
                          </span>
                        </div>
                        
                        <button className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300">
                          <FiShoppingCart size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
