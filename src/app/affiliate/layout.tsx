"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiGrid, FiLink, FiDollarSign, FiLogOut } from "react-icons/fi";

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  const [affiliate, setAffiliate] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // If it's the login page, don't check for auth
    if (pathname === '/affiliate/login') return;

    const stored = localStorage.getItem("pndit_affiliate");
    if (!stored) {
      router.push("/affiliate/login");
    } else {
      try {
        setAffiliate(JSON.parse(stored));
      } catch (e) {
        router.push("/affiliate/login");
      }
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("pndit_affiliate");
    router.push("/affiliate/login");
  };

  // Render just the children if we are on the login page
  if (pathname === '/affiliate/login') {
    return <>{children}</>;
  }

  // Prevent rendering protected content before affiliate is loaded
  if (!affiliate) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-blue-600">Affiliate Portal</h2>
          <p className="text-xs text-gray-500 mt-1 font-medium bg-gray-100 inline-block px-2 py-0.5 rounded">
            CODE: {affiliate.affiliateCode}
          </p>
        </div>
        
        <nav className="p-4 space-y-2 flex-1">
          <Link
            href="/affiliate/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              pathname === "/affiliate/dashboard"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <FiGrid className="text-lg" />
            Dashboard
          </Link>
          <Link
            href="/affiliate/links"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              pathname === "/affiliate/links"
                ? "bg-purple-50 text-purple-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <FiLink className="text-lg" />
            Referral Links
          </Link>
          <Link
            href="/affiliate/payouts"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              pathname === "/affiliate/payouts"
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <FiDollarSign className="text-lg" />
            Payouts & Wallet
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <FiLogOut className="text-lg" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden flex flex-col">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between md:hidden">
          <h2 className="text-xl font-bold text-blue-600">Portal</h2>
          <button onClick={handleLogout} className="text-sm font-medium text-gray-500">Logout</button>
        </header>
        <div className="p-8 pb-20 max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
