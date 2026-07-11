"use client";

import { CountryProvider } from "@/context/CountryContext";
import CountryPopup from "@/components/ui/CountryPopup";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CountryProvider>
      {children}
      <CountryPopup />
    </CountryProvider>
  );
}
