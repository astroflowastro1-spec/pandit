"use client";

import { CountryProvider } from "@/context/CountryContext";
import { CartProvider } from "@/context/CartContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CountryProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </CountryProvider>
  );
}
