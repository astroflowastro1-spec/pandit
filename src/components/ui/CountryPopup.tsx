"use client";

import { useCountry } from "@/context/CountryContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FiUser, FiPhone, FiChevronDown, FiSearch, FiGlobe } from "react-icons/fi";
import { SUPPORTED_COUNTRIES } from "@/lib/countries";

export default function CountryPopup() {
  const { isReady, hasSubmittedDetails, submitDetails, countryData, setCountryCode } = useCountry();
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  
  // For country dropdown
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");

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

  const filteredCountries = SUPPORTED_COUNTRIES.filter(
    c => c.name.toLowerCase().includes(search.toLowerCase()) || 
         c.currencyCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] bg-[#0B1120]/80 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[24px] p-8 max-w-md w-full shadow-2xl relative overflow-visible"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F26622]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          
          <div className="text-center relative z-10 mb-8">
            <div className="w-16 h-16 bg-[#FFF4EB] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#F26622]/20">
              <FiGlobe className="text-3xl text-[#F26622]" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2 font-serif">Choose Your Country</h2>
            <p className="text-gray-500 text-sm">Select your country to see pricing in your local currency. We also need your details for the spiritual journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
            
            <div className="space-y-1.5 relative">
              <label className="text-xs font-bold text-gray-700 ml-1">Your Country</label>
              <div 
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:border-[#F26622] transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{countryData.flag}</span>
                  <span className="text-sm font-medium text-gray-900">{countryData.name} ({countryData.currencyCode})</span>
                </div>
                <FiChevronDown className={`text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </div>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-gray-100">
                      <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Search..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#F26622]"
                        />
                      </div>
                    </div>
                    <div className="max-h-48 overflow-y-auto p-2">
                      {filteredCountries.map(c => (
                        <div
                          key={c.code}
                          onClick={() => {
                            setCountryCode(c.code);
                            setShowDropdown(false);
                            setSearch("");
                          }}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${countryData.code === c.code ? 'bg-orange-50 text-[#F26622]' : 'hover:bg-gray-50 text-gray-700'}`}
                        >
                          <span className="text-lg">{c.flag}</span>
                          <span className="text-sm font-medium flex-1">{c.name}</span>
                          <span className="text-xs font-bold text-gray-400">{c.currencyCode}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
