"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiUploadCloud, FiSave, FiImage, FiFileText } from "react-icons/fi";

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  // Single Upload State
  const [image, setImage] = useState<File | null>(null);
  
  // Bulk Upload State
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isBulkUploading, setIsBulkUploading] = useState(false);
  const [bulkStatus, setBulkStatus] = useState("");

  const handleSingleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      if (image) {
        formData.set("image", image);
      }

      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add product");
      }

      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBulkUpload = async () => {
    if (!csvFile) {
      setBulkStatus("Please select a CSV file first");
      return;
    }
    
    setIsBulkUploading(true);
    setBulkStatus("Uploading and processing CSV...");
    
    try {
      const formData = new FormData();
      formData.append("file", csvFile);
      
      const response = await fetch("/api/products/bulk", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Bulk upload failed");
      }
      
      setBulkStatus(`Success! Added ${data.count} products.`);
      setCsvFile(null);
      setTimeout(() => {
        router.push("/admin/products");
      }, 1500);
    } catch (err: any) {
      setBulkStatus(`Error: ${err.message}`);
    } finally {
      setIsBulkUploading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
        <p className="text-gray-500">Add a product manually or upload a CSV file.</p>
      </div>
      


      {/* Manual Upload Form */}
      <form onSubmit={handleSingleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Manual Product Entry</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-gray-700">Product Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="e.g. 5 Mukhi Rudraksha"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-gray-700">Description <span className="text-red-500">*</span></label>
            <textarea
              name="description"
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="Detailed description of the product..."
            ></textarea>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-gray-700">Category</label>
            <select
              name="category"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors bg-white"
            >
              <option value="Rudraksha">Rudraksha</option>
              <option value="Yantra">Yantra</option>
              <option value="Chadhava">Chadhava</option>
              <option value="Literature">Hindu Literature</option>
              <option value="General">General</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Price (INR) <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="priceInr"
              required
              min="0"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="e.g. 500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Price (USD - Base for Global) <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="priceUsd"
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="e.g. 10"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Original Price (INR - Optional Strike-through)</label>
            <input
              type="number"
              name="originalPriceInr"
              min="0"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="e.g. 800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Original Price (USD - Optional Strike-through)</label>
            <input
              type="number"
              name="originalPriceUsd"
              min="0"
              step="0.01"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="e.g. 15"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-gray-700 mb-2 block">Product Image <span className="text-red-500">*</span></label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors">
              <input
                type="file"
                accept="image/*"
                required
                className="hidden"
                id="product-image"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
              <label htmlFor="product-image" className="cursor-pointer flex flex-col items-center">
                <FiImage className="w-12 h-12 text-gray-400 mb-3" />
                <span className="text-sm font-medium text-blue-600 mb-1">
                  {image ? image.name : "Click to upload product image"}
                </span>
                <span className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-8 rounded-xl transition-colors flex items-center justify-center gap-2 mt-8 text-lg"
        >
          {isSubmitting ? "Saving Product..." : <><FiSave /> Save Product</>}
        </button>
      </form>
    </div>
  );
}
