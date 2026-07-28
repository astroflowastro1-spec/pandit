"use client";

import { motion } from "framer-motion";
import SafeImage from "@/components/ui/SafeImage";
import { FiHeart, FiEye, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";

export default function RelatedProducts({ currentCategory }: { currentCategory?: string }) {
  // Mock data for related products
  const related = [
    { id: 1, title: "Amethyst Healing Wand", price: "₹850", image: "https://res.cloudinary.com/dpvytn6q2/image/upload/v1727764789/sodalite-crystal-pendant_z8wqjg.jpg", category: "Crystal" },
    { id: 2, title: "Clear Quartz Point", price: "₹500", image: "https://res.cloudinary.com/dpvytn6q2/image/upload/v1727764789/sodalite-crystal-pendant_z8wqjg.jpg", category: "Crystal" },
    { id: 3, title: "7 Chakra Bracelet", price: "₹350", image: "https://res.cloudinary.com/dpvytn6q2/image/upload/v1727764789/sodalite-crystal-pendant_z8wqjg.jpg", category: "Bracelet" },
    { id: 4, title: "Gomati Chakra", price: "₹250", image: "https://res.cloudinary.com/dpvytn6q2/image/upload/v1727764789/sodalite-crystal-pendant_z8wqjg.jpg", category: "Yantra" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex justify-between items-end mb-12 border-b border-[#EAE3D5] pb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">You May Also Like</h2>
            <p className="text-gray-500 font-medium">Curated pieces that complement your choice.</p>
          </div>
          <Link href="/shop" className="hidden md:inline-block text-orange-600 font-bold hover:text-orange-700 underline underline-offset-4 transition-colors">
            View All Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {related.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/5] bg-white rounded-[24px] overflow-hidden mb-4 shadow-sm border border-[#EAE3D5]">
                <SafeImage 
                  src={item.image} 
                  alt={item.title} 
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
              </div>

              <div className="flex flex-col text-center mt-2">
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1.5">{item.category}</span>
                <h3 className="text-lg font-serif font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-1">{item.title}</h3>
                <span className="text-gray-500 font-medium">{item.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
