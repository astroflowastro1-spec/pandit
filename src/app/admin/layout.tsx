"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiPlusSquare, FiList } from "react-icons/fi";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#2563EB]">Pndit Admin</h2>
        </div>
        <nav className="p-4 space-y-2">
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              pathname === "/admin"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <FiList className="text-lg" />
            All Pujas
          </Link>
          <Link
            href="/admin/add-puja"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              pathname === "/admin/add-puja"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <FiPlusSquare className="text-lg" />
            Add New Puja
          </Link>

          <Link
            href="/admin/chadhava"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors mt-4 border-t pt-6 border-gray-100 ${
              pathname === "/admin/chadhava"
                ? "bg-purple-50 text-purple-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <FiList className="text-lg" />
            All Chadhava
          </Link>
          <Link
            href="/admin/add-chadhava"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              pathname === "/admin/add-chadhava"
                ? "bg-purple-50 text-purple-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <FiPlusSquare className="text-lg" />
            Add New Chadhava
          </Link>


          <Link
            href="/admin/bookings"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors mt-4 border-t pt-6 border-gray-100 ${
              pathname === "/admin/bookings"
                ? "bg-[#FEF3C7] text-[#D97706]"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <FiList className="text-lg" />
            Bookings & Orders
          </Link>

          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors mt-8"
          >
            <FiHome className="text-lg" />
            Back to Website
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
