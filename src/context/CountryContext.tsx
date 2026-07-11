"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type CountryType = "india" | "other" | null;

interface CountryContextType {
  country: CountryType;
  setCountry: (country: "india" | "other") => void;
  currencySymbol: string;
  isReady: boolean;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<CountryType>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("user_country") as CountryType;
    if (saved) {
      setCountryState(saved);
    }
    setIsReady(true);
  }, []);

  const setCountry = (c: "india" | "other") => {
    setCountryState(c);
    localStorage.setItem("user_country", c);
  };

  const currencySymbol = country === "other" ? "$" : "₹";

  return (
    <CountryContext.Provider value={{ country, setCountry, currencySymbol, isReady }}>
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
