"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { useCountry } from "@/context/CountryContext";
import { SUPPORTED_COUNTRIES } from "@/lib/countries";
import { motion, AnimatePresence } from "framer-motion";

export default function CountrySelector() {
  const { countryData, setCountryCode, isReady } = useCountry();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = SUPPORTED_COUNTRIES.filter(
    c => c.name.toLowerCase().includes(search.toLowerCase()) || 
         c.currencyCode.toLowerCase().includes(search.toLowerCase())
  );

  if (!isReady) {
    return (
      <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 min-w-[100px] h-9 bg-gray-50 animate-pulse">
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border border-gray-200 hover:border-[#FF7F3F] hover:bg-orange-50 rounded-lg px-3 py-1.5 transition-all h-9"
      >
        <span className="text-base leading-none">{countryData.flag}</span>
        <span className="text-sm font-medium text-gray-700">{countryData.currencyCode}</span>
        <FiChevronDown className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
          >
            <div className="p-3 border-b border-gray-100 bg-gray-50/50">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search country..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF7F3F] focus:ring-1 focus:ring-[#FF7F3F] transition-all"
                />
              </div>
            </div>
            
            <div className="max-h-64 overflow-y-auto p-2 scrollbar-thin">
              {filteredCountries.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">No countries found</div>
              ) : (
                filteredCountries.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCountryCode(c.code);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                      countryData.code === c.code 
                        ? "bg-orange-50 text-[#FF7F3F]" 
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{c.flag}</span>
                      <span className="text-sm font-medium">{c.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-400">{c.currencyCode}</span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
