import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mere Pandit Ji | Premium Spiritual Journey",
  description: "Experience the divine with premium spiritual services, puja, and temple darshan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="antialiased min-h-screen flex flex-col relative selection:bg-brand-primary selection:text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
