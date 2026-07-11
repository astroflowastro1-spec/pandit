"use client";

import { CountryProvider } from "@/context/CountryContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CountryProvider>
      {children}
    </CountryProvider>
  );
}
