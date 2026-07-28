"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiImage } from "react-icons/fi";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    priceInr: "",
    priceUsd: "",
    originalPriceInr: "",
    originalPriceUsd: "",
  });
  
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [existingGalleryImages, setExistingGalleryImages] = useState<string[]>([]);
  const [newGalleryImages, setNewGalleryImages] = useState<File[]>([]);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const product = data.data;
          setFormData({
            title: product.title || "",
            description: product.description || "",
            category: product.category || "General",
            priceInr: product.priceInr?.toString() || "",
            priceUsd: product.priceUsd?.toString() || "",
            originalPriceInr: product.originalPriceInr?.toString() || "",
            originalPriceUsd: product.originalPriceUsd?.toString() || "",
          });
          setImagePreview(product.imageSrc || null);
          setExistingGalleryImages(product.galleryImages || []);
        } else {
          setError(data.error || "Failed to load product");
        }
        setFetching(false);
      })
      .catch(err => {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product");
        setFetching(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value as string);
      });
      
      if (image) {
        form.append("image", image);
      }
      
      form.append("existingGalleryImages", JSON.stringify(existingGalleryImages));
      
      newGalleryImages.forEach(file => {
        form.append("newGalleryImages", file);
      });

      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: form,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to update product");
      }

      alert("Product updated successfully!");
      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (fetching) {
    return <div className="p-8 text-center text-gray-500">Loading product data...</div>;
  }

  return (
    <div className="space-y-12 pb-20 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Product</h1>
        <p className="text-gray-500">Update the details of your product.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Product Details</h2>
        
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
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="e.g. 5 Mukhi Rudraksha"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-gray-700">Description <span className="text-red-500">*</span></label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
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
              value={formData.category}
              onChange={handleChange}
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
              value={formData.priceInr}
              onChange={handleChange}
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
              value={formData.priceUsd}
              onChange={handleChange}
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
              value={formData.originalPriceInr}
              onChange={handleChange}
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
              value={formData.originalPriceUsd}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="e.g. 15"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-gray-700 mb-2 block">Product Image (Leave empty to keep current)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="product-image"
                onChange={handleFileChange}
              />
              <label htmlFor="product-image" className="cursor-pointer flex flex-col items-center">
                <FiImage className="w-12 h-12 text-gray-400 mb-3" />
                <span className="text-sm font-medium text-blue-600 mb-1">
                  {image ? image.name : "Click to upload a new product image"}
                </span>
                <span className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</span>
              </label>
            </div>
            {imagePreview && (
              <div className="mt-4 flex justify-center">
                <img src={imagePreview} alt="Preview" className="h-32 object-contain rounded-lg border border-gray-200" />
              </div>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-gray-700 mb-2 block">Gallery Images</label>
            
            {/* Existing Gallery Images */}
            {existingGalleryImages.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Current Gallery Images:</p>
                <div className="flex flex-wrap gap-4">
                  {existingGalleryImages.map((imgUrl, idx) => (
                    <div key={idx} className="relative group">
                      <img src={imgUrl} alt={`Gallery ${idx}`} className="h-24 w-24 object-cover rounded-lg border border-gray-200" />
                      <button
                        type="button"
                        onClick={() => setExistingGalleryImages(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Gallery Images */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="gallery-images"
                onChange={(e) => {
                  if (e.target.files) {
                    setNewGalleryImages(Array.from(e.target.files));
                  }
                }}
              />
              <label htmlFor="gallery-images" className="cursor-pointer flex flex-col items-center">
                <FiImage className="w-12 h-12 text-gray-400 mb-3" />
                <span className="text-sm font-medium text-blue-600 mb-1">
                  {newGalleryImages.length > 0 ? `${newGalleryImages.length} new images selected` : "Click to upload more gallery images"}
                </span>
                <span className="text-xs text-gray-500">Multiple images allowed</span>
              </label>
            </div>
            
            {newGalleryImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {newGalleryImages.map((file, index) => (
                  <div key={index} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-200">
                    + {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
          >
            {isSubmitting ? "Updating..." : <><FiSave /> Update Product</>}
          </button>
        </div>
      </form>
    </div>
  );
}
