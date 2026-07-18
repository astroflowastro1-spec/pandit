"use client";

import { useEffect, useState } from "react";
import SafeImage from "@/components/ui/SafeImage";
import Link from "next/link";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading products...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Products</h1>
          <p className="text-gray-500">View and manage all homepage slider products.</p>
        </div>
        <Link 
          href="/admin/add-product"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <FiPlus /> Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
              <tr>
                <th className="px-6 py-4 font-semibold">Image</th>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price (INR)</th>
                <th className="px-6 py-4 font-semibold">Price (USD)</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No products found. Add your first product!
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <SafeImage src={product.imageSrc} alt={product.title} fill sizes="80px" className="object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{product.title}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">{product.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {product.category || "General"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-emerald-600">
                      ₹{product.priceInr}
                    </td>
                    <td className="px-6 py-4 font-bold text-emerald-600">
                      ${product.priceUsd}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-red-500 hover:text-red-700 p-2 ml-2 transition-colors">
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
