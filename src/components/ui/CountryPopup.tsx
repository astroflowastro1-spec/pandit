"use client";

import { useCountry } from "@/context/CountryContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FiUser, FiPhone } from "react-icons/fi";

export default function CountryPopup() {
  const { isReady, hasSubmittedDetails, submitDetails } = useCountry();
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isReady || hasSubmittedDetails) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Please fill in all details to continue.");
      return;
    }
    submitDetails(name, phone);
  };

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
              <span className="text-3xl">🙏</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2 font-serif">Welcome to Mere Pandit Ji</h2>
            <p className="text-gray-500 text-sm">Please enter your details to personalize your spiritual journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 ml-1">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F26622] focus:ring-1 focus:ring-[#F26622] transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 ml-1">Phone Number</label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F26622] focus:ring-1 focus:ring-[#F26622] transition-all text-sm"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full mt-6 bg-[#F26622] hover:bg-[#D95B1E] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/30 active:scale-[0.98]"
            >
              Continue to Website
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
