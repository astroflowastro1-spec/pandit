"use client";

import { motion } from "framer-motion";
import SafeImage from "@/components/ui/SafeImage";

export default function ProductStory({ product }: { product: any }) {
  return (
    <section className="py-32 bg-[#FAF7F2] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Main Story Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl"
          >
            <SafeImage 
              src={product.imageSrc} 
              alt={product.title} 
              fill 
              className="object-cover scale-105 hover:scale-100 transition-transform duration-[10s]" 
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            <span className="text-orange-600 font-bold tracking-[0.2em] uppercase text-sm mb-6">The Heritage</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gray-900 leading-tight mb-8">
              Why Choose <br/>
              <span className="italic text-gray-500 font-light">{product.title}?</span>
            </h2>
            <div className="prose prose-lg text-gray-600 leading-relaxed mb-10">
              <p>
                Every piece in our collection is carefully sourced and hand-selected to ensure it carries the purest vibrations. Our spiritual artifacts are not just objects; they are conduits for divine energy.
              </p>
              <p>
                When you invite this into your life, you are bringing centuries of tradition, meticulous craftsmanship, and the blessings of sacred consecration.
              </p>
            </div>
            
            <div className="flex gap-12 pt-8 border-t border-gray-200">
              <div>
                <div className="text-4xl font-serif text-gray-900 mb-2">100%</div>
                <div className="text-sm font-bold uppercase tracking-widest text-gray-500">Natural</div>
              </div>
              <div>
                <div className="text-4xl font-serif text-gray-900 mb-2">0</div>
                <div className="text-sm font-bold uppercase tracking-widest text-gray-500">Chemicals</div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
