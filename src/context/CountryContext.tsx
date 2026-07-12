"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type CountryType = "india" | "other" | null;

interface CountryContextType {
  country: CountryType;
  setCountry: (country: "india" | "other") => void;
  currencySymbol: string;
  isReady: boolean;
  hasSubmittedDetails: boolean;
  submitDetails: (name: string, phone: string) => void;
  detectedCountry: "india" | "other" | null;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<CountryType>(null);
  const [detectedCountry, setDetectedCountry] = useState<"india" | "other" | null>(null);
  const [hasSubmittedDetails, setHasSubmittedDetails] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedCountry = localStorage.getItem("user_country") as CountryType;
    const savedDetails = localStorage.getItem("user_details");
    
    if (savedDetails && savedCountry) {
      setCountryState(savedCountry);
      setHasSubmittedDetails(true);
      setIsReady(true);
    } else {
      // Auto-detect based on IP just to pre-fill or suggest
      fetch('https://ipapi.co/json/')
        .then(res => {
          if (!res.ok) throw new Error('Rate limited or blocked');
          return res.json();
        })
        .then(data => {
          if (data && data.country_code) {
            const detected = data.country_code === 'IN' ? 'india' : 'other';
            setDetectedCountry(detected);
          }
        })
        .catch(err => {
          // Gracefully handle ad-blockers or network errors without spamming console
          setDetectedCountry('india'); // Fallback to India if failed
        })
        .finally(() => {
          setIsReady(true);
        });
    }
  }, []);

  const setCountry = (c: "india" | "other") => {
    setCountryState(c);
    localStorage.setItem("user_country", c);
  };

  const submitDetails = (name: string, phone: string) => {
    localStorage.setItem("user_details", JSON.stringify({ name, phone }));
    const finalCountry = detectedCountry || "india";
    setCountry(finalCountry);
    setHasSubmittedDetails(true);
  };

  const currencySymbol = country === "other" ? "$" : "₹";

  return (
    <CountryContext.Provider value={{ country, setCountry, currencySymbol, isReady, hasSubmittedDetails, submitDetails, detectedCountry }}>
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
