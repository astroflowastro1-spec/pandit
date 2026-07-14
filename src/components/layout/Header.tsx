"use client";

import { useState } from "react";
import { FiChevronDown, FiUser, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import CountrySelector from "./CountrySelector";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Puja", href: "/puja" },
  { name: "Chadhava", href: "/chadhava" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-40">
            <Image src="/logo.avif" alt="Mere Pandit Ji" fill className="object-contain object-left" priority />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "text-[15px] font-semibold transition-colors hover:text-[#FF7F3F]",
                pathname === link.href ? "text-[#FF7F3F]" : "text-gray-900"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <CountrySelector />
          <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors">
            <FiUser size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="xl:hidden text-gray-800 p-2"
          onClick={() => setMobileMenuOpen(true)}
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col xl:hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 h-[72px]">
            <div className="flex items-center">
              <div className="relative h-10 w-40">
                <Image src="/logo.avif" alt="Mere Pandit Ji" fill className="object-contain object-left" priority />
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-600"
            >
              <FiX size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "text-lg font-medium px-2 py-2 rounded-lg",
                  pathname === link.href ? "text-[#FF7F3F] bg-orange-50" : "text-gray-800"
                )}
              >
                {link.name}
              </Link>
            ))}
            {/* Country Selector in Mobile Menu */}
            <div className="px-2 pt-2 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Currency</p>
              <CountrySelector />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
