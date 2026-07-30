"use client";

import { useCountry } from "@/context/CountryContext";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

// Luxury Components
import ProductGallery from "./luxury/ProductGallery";
import ProductInfo from "./luxury/ProductInfo";
import ProductCertifications from "./luxury/ProductCertifications";
import RelatedProducts from "./luxury/RelatedProducts";
import StickyBuyBar from "./luxury/StickyBuyBar";

export default function ProductDetailsClient({ product }: { product: any }) {
  const { convertPrice, formatPrice, isReady, countryData } = useCountry();

  const isIndia = isReady && countryData?.currencyCode === 'INR';

  const price = isReady 
    ? (isIndia ? product.priceInr : convertPrice(product.priceUsd)) 
    : product.priceInr;
    
  // If original price is not set in DB, assume a 25% markup to show a discount (price * 1.33 gives a 25% discount, price / 0.75)
  const defaultOrigInr = product.originalPriceInr || Math.round(product.priceInr / 0.75);
  const defaultOrigUsd = product.originalPriceUsd || Math.round(product.priceUsd / 0.75);

  const originalPrice = isReady 
    ? (isIndia 
        ? defaultOrigInr 
        : convertPrice(defaultOrigUsd))
    : defaultOrigInr;
    
  const formattedPrice = isReady ? formatPrice(price) : `₹${price}`;
  const formattedOriginalPrice = originalPrice ? (isReady ? formatPrice(originalPrice) : `₹${originalPrice}`) : null;

  const allImages = [product.imageSrc, ...(product.galleryImages || [])];

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Top Breadcrumb */}
      <div className="pt-28 pb-8 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <nav className="flex text-xs font-bold text-gray-400 items-center space-x-2 tracking-widest uppercase">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <FiChevronRight className="w-3 h-3" />
            <Link href="/shop" className="hover:text-orange-600 transition-colors">Products</Link>
            <FiChevronRight className="w-3 h-3" />
            <span className="text-gray-900">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* 1. Hero Section */}
      <section className="bg-white pb-24 rounded-b-[40px] shadow-sm relative z-10">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left 50% */}
            <div className="lg:col-span-6">
              <ProductGallery product={product} allImages={allImages} />
            </div>

            {/* Right 50% */}
            <div className="lg:col-span-6">
              <ProductInfo 
                product={product} 
                formattedPrice={formattedPrice} 
                formattedOriginalPrice={formattedOriginalPrice}
                rawPrice={price}
                rawOriginalPrice={originalPrice}
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* 2. Certifications */}
      <ProductCertifications />


      {/* 7. Related Products */}
      <RelatedProducts currentCategory={product.category} />

      {/* 8. Sticky Bottom Bar */}
      <StickyBuyBar product={product} formattedPrice={formattedPrice} rawPrice={price} />
      
    </div>
  );
}
