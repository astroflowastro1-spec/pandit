"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import SafeImage from "@/components/ui/SafeImage";
import { FiHeart, FiShare2, FiMaximize2, FiPlayCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  product: any;
  allImages: string[];
}

export default function ProductGallery({ product, allImages }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(allImages[0] || "");
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col gap-6 select-none w-full relative">
      


      {/* Floating Badges */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
        <span className="bg-[#FAF7F2]/90 backdrop-blur-md border border-[#F3E8D6] text-gray-900 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
          ✨ Bestseller
        </span>
        {product.stock < 10 && (
          <span className="bg-red-500/90 backdrop-blur-md text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
            🔥 Limited Stock
          </span>
        )}
      </div>

      {/* Main Image Container */}
      <div 
        className="relative w-full aspect-square rounded-[24px] overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-crosshair group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsLightboxOpen(true)}
      >
        <SafeImage 
          src={mainImage} 
          alt={product.title}
          fill
          className={`object-cover transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />
        
        {/* Zoomed Image Overlay */}
        <div 
          className={`absolute inset-0 bg-white transition-opacity duration-300 ${isZoomed ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}
          style={{
            backgroundImage: `url(${mainImage})`,
            backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
            backgroundSize: '250%',
            backgroundRepeat: 'no-repeat',
          }}
        />

        <div className="absolute bottom-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 hover:bg-black/70">
            <FiMaximize2 className="w-4 h-4" /> Click to enlarge
          </button>
        </div>
      </div>
      
      {/* Thumbnails Row */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x items-center">
        {allImages.map((img, idx) => (
          <button 
            key={idx} 
            onClick={() => setMainImage(img)}
            className={`relative w-20 h-24 md:w-24 md:h-28 flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 snap-center
              ${mainImage === img 
                ? 'border-2 border-orange-500 opacity-100 shadow-md scale-100' 
                : 'border-2 border-transparent opacity-60 hover:opacity-100 hover:border-gray-200 scale-95 hover:scale-100'
              }`}
          >
            <SafeImage src={img} alt={`${product.title} - view ${idx+1}`} fill className="object-cover" />
          </button>
        ))}

      </div>

      {allImages.length > 1 && (
        <div className="text-center text-xs text-gray-400 font-medium tracking-widest uppercase mt-2">
          {allImages.length} Images
        </div>
      )}

      {/* Lightbox Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-xl flex flex-col"
            >
              <div className="flex justify-end p-6">
                <button 
                  onClick={() => setIsLightboxOpen(false)}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 relative w-full max-w-5xl mx-auto flex items-center justify-center p-8">
                <div className="relative w-full h-full">
                  <SafeImage src={mainImage} alt="Enlarged view" fill className="object-contain" />
                </div>
              </div>
              <div className="p-8 flex justify-center gap-4 overflow-x-auto">
                {allImages.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setMainImage(img)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${mainImage === img ? 'border-orange-500' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                    <SafeImage src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  );
}
