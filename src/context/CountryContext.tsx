"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { SUPPORTED_COUNTRIES, getCountryByCode, CountryData } from "@/lib/countries";

interface CountryContextType {
  countryData: CountryData;
  setCountryCode: (code: string) => void;
  isReady: boolean;
  hasSubmittedDetails: boolean;
  submitDetails: (name: string, phone: string) => void;
  rates: Record<string, number> | null;
  convertPrice: (baseUsdPrice: number) => number;
  formatPrice: (price: number) => string;
  // Legacy aliases for components that haven't been refactored yet
  country: "india" | "other" | null; 
  currencySymbol: string;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [countryCode, setCountryCodeState] = useState<string>("IN");
  const [hasSubmittedDetails, setHasSubmittedDetails] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [rates, setRates] = useState<Record<string, number> | null>(null);

  const fetchRates = async () => {
    try {
      const res = await fetch('/api/exchange-rates');
      const data = await res.json();
      if (data.success && data.rates) {
        setRates(data.rates);
      }
    } catch (err) {
      console.error("Failed to fetch rates:", err);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  useEffect(() => {
    const savedCode = localStorage.getItem("user_country_code");
    const savedDetails = localStorage.getItem("user_details");
    
    if (savedDetails && savedCode) {
      setCountryCodeState(savedCode);
      setHasSubmittedDetails(true);
      setIsReady(true);
    } else {
      // Auto-detect based on IP
      fetch('https://ipapi.co/json/')
        .then(res => {
          if (!res.ok) throw new Error('Rate limited or blocked');
          return res.json();
        })
        .then(data => {
          if (data && data.country_code) {
            // Check if we support this country, otherwise fallback to US
            const exists = SUPPORTED_COUNTRIES.find(c => c.code === data.country_code);
            setCountryCodeState(exists ? data.country_code : "IN");
          }
        })
        .catch(err => {
          setCountryCodeState("IN");
        })
        .finally(() => {
          setIsReady(true);
        });
    }
  }, []);

  const setCountryCode = (code: string) => {
    setCountryCodeState(code);
    localStorage.setItem("user_country_code", code);
  };

  const submitDetails = (name: string, phone: string) => {
    localStorage.setItem("user_details", JSON.stringify({ name, phone }));
    setHasSubmittedDetails(true);
  };

  const countryData = getCountryByCode(countryCode);

  const convertPrice = useCallback((baseUsdPrice: number) => {
    if (!rates || !rates[countryData.currencyCode]) {
      // Fallback manual rates or return original if not loaded
      if (countryData.currencyCode === 'INR') return baseUsdPrice * 83.5;
      return baseUsdPrice;
    }
    return baseUsdPrice * rates[countryData.currencyCode];
  }, [rates, countryData]);

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: countryData.currencyCode,
      maximumFractionDigits: 0,
    }).format(price);
  }, [countryData]);

  // Legacy mappings for older components
  const legacyCountry = countryCode === "IN" ? "india" : "other";

  return (
    <CountryContext.Provider value={{ 
      countryData, 
      setCountryCode, 
      isReady, 
      hasSubmittedDetails, 
      submitDetails,
      rates,
      convertPrice,
      formatPrice,
      country: legacyCountry,
      currencySymbol: countryData.currencySymbol
    }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
}
