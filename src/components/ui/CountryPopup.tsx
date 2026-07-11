"use client";

import { useCountry } from "@/context/CountryContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function CountryPopup() {
  const { country, setCountry, isReady } = useCountry();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isReady || country !== null) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] bg-[#0B1120]/80 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[24px] p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F26622]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          
          <div className="text-center relative z-10 mb-8">
            <div className="w-16 h-16 bg-[#FFF4EB] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#F26622]/20">
              <span className="text-3xl">🌍</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2 font-serif">Select Your Location</h2>
            <p className="text-gray-500 text-sm">Please select your country to see accurate pricing and available services.</p>
          </div>

          <div className="space-y-3 relative z-10">
            <button 
              onClick={() => setCountry("india")}
              className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-[#F26622] hover:bg-[#FFF4EB] transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇮🇳</span>
                <span className="font-bold text-gray-900">India</span>
              </div>
              <span className="text-gray-400 group-hover:text-[#F26622] font-bold">₹ INR →</span>
            </button>
            
            <button 
              onClick={() => setCountry("other")}
              className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-[#F26622] hover:bg-[#FFF4EB] transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌎</span>
                <span className="font-bold text-gray-900">Other Country</span>
              </div>
              <span className="text-gray-400 group-hover:text-[#F26622] font-bold">$ USD →</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
