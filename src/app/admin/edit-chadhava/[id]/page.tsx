"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function EditChadhavaPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    title: "",
    redSubtitle: "",
    description: "",
    location: "",
    date: "",
    badge: "",
    badgeColor: "bg-[#F3912E]",
    subtitle: "",
    whyThisChadhava: "",
    aboutTemple: "",
    benefits: "",
    inclusions: "",
    package1Title: "Offer Peacock Feather on Gyaras-Baras",
    package2Title: "Special Combo Chadhava — Morpankh and 1 Havan Ahuti",
    package3Title: "Khatu Shyam Panch Mahabhent Sankalp",
    indiaIndividualPrice: "51",
    indiaCouplePrice: "101",
    indiaFamilyPrice: "501",
    nriIndividualPrice: "501",
    nriCouplePrice: "1100",
    nriFamilyPrice: "2100",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [sliderImage1File, setSliderImage1File] = useState<File | null>(null);
  const [sliderImage1Preview, setSliderImage1Preview] = useState<string | null>(null);

  const [sliderImage2File, setSliderImage2File] = useState<File | null>(null);
  const [sliderImage2Preview, setSliderImage2Preview] = useState<string | null>(null);

  const [templeImageFile, setTempleImageFile] = useState<File | null>(null);
  const [templeImagePreview, setTempleImagePreview] = useState<string | null>(null);

  const [package1ImageFile, setPackage1ImageFile] = useState<File | null>(null);
  const [package1ImagePreview, setPackage1ImagePreview] = useState<string | null>(null);

  const [package2ImageFile, setPackage2ImageFile] = useState<File | null>(null);
  const [package2ImagePreview, setPackage2ImagePreview] = useState<string | null>(null);

  const [package3ImageFile, setPackage3ImageFile] = useState<File | null>(null);
  const [package3ImagePreview, setPackage3ImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/chadhava/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const Chadhava = data.data;
          setFormData({
            title: Chadhava.title || "",
            redSubtitle: Chadhava.redSubtitle || "",
            description: Chadhava.description || "",
            location: Chadhava.location || "",
            date: Chadhava.date || "",
            badge: Chadhava.badge || "",
            badgeColor: Chadhava.badgeColor || "bg-[#F3912E]",
            subtitle: Chadhava.subtitle || "",
            whyThisChadhava: Chadhava.whyThisChadhava || "",
            aboutTemple: Chadhava.aboutTemple || "",
            benefits: Array.isArray(Chadhava.benefits) ? Chadhava.benefits.join('\n') : "",
            inclusions: Array.isArray(Chadhava.inclusions) ? Chadhava.inclusions.join('\n') : "",
            package1Title: Chadhava.packages?.india?.[0]?.title || "Offer Peacock Feather on Gyaras-Baras",
            package2Title: Chadhava.packages?.india?.[1]?.title || "Special Combo Chadhava — Morpankh and 1 Havan Ahuti",
            package3Title: Chadhava.packages?.india?.[2]?.title || "Khatu Shyam Panch Mahabhent Sankalp",
            indiaIndividualPrice: Chadhava.packages?.india?.[0]?.price?.toString() || "51",
            indiaCouplePrice: Chadhava.packages?.india?.[1]?.price?.toString() || "101",
            indiaFamilyPrice: Chadhava.packages?.india?.[2]?.price?.toString() || "501",
            nriIndividualPrice: Chadhava.packages?.nri?.[0]?.price?.toString() || "501",
            nriCouplePrice: Chadhava.packages?.nri?.[1]?.price?.toString() || "1100",
            nriFamilyPrice: Chadhava.packages?.nri?.[2]?.price?.toString() || "2100",
          });
          setImagePreview(Chadhava.imageSrc || null);
          setSliderImage1Preview(Chadhava.sliderImage1Src || null);
          setSliderImage2Preview(Chadhava.sliderImage2Src || null);
          setTempleImagePreview(Chadhava.templeImageSrc || null);
          setPackage1ImagePreview(Chadhava.packages?.india?.[0]?.imageSrc || null);
          setPackage2ImagePreview(Chadhava.packages?.india?.[1]?.imageSrc || null);
          setPackage3ImagePreview(Chadhava.packages?.india?.[2]?.imageSrc || null);
          setTempleImagePreview(Chadhava.templeImageSrc || null);
        }
        setFetching(false);
      })
      .catch(err => {
        console.error(err);
        setFetching(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSlider1FileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSliderImage1File(file);
      setSliderImage1Preview(URL.createObjectURL(file));
    }
  };

  const handleSlider2FileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSliderImage2File(file);
      setSliderImage2Preview(URL.createObjectURL(file));
    }
  };

  const handleTempleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTempleImageFile(file);
      setTempleImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePackage1FileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPackage1ImageFile(file);
      setPackage1ImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePackage2FileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPackage2ImageFile(file);
      setPackage2ImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePackage3FileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPackage3ImageFile(file);
      setPackage3ImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value as string);
      });
      if (imageFile) {
        form.append("image", imageFile);
      }
      if (sliderImage1File) {
        form.append("sliderImage1", sliderImage1File);
      }
      if (sliderImage2File) {
        form.append("sliderImage2", sliderImage2File);
      }
      if (templeImageFile) {
        form.append("templeImage", templeImageFile);
      }
      if (package1ImageFile) {
        form.append("package1Image", package1ImageFile);
      }
      if (package2ImageFile) {
        form.append("package2Image", package2ImageFile);
      }
      if (package3ImageFile) {
        form.append("package3Image", package3ImageFile);
      }

      const res = await fetch(`/api/chadhava/${id}`, {
        method: "PUT",
        body: form,
      });
      
      const data = await res.json();
      
      if (data.success) {
        alert("Chadhava updated successfully!");
        router.push("/admin/chadhava");
      } else {
        alert("Failed to update Chadhava: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-8 text-center text-gray-500">Loading Chadhava data...</div>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Chadhava</h1>
      <p className="text-gray-500 mb-8">Update the details for this online Chadhava offering.</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Chadhava Title *</label>
            <input
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Gupt Navratri Maa Jwala ji Pooja"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Red Subtitle *</label>
            <input
              required
              type="text"
              name="redSubtitle"
              value={formData.redSubtitle}
              onChange={handleChange}
              placeholder="e.g. GUPT NAVRATRI MAA JWALA JI POOJA"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all uppercase"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Detailed description of the Chadhava benefits..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
            <input
              required
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Jawala Ji Temple, Himachal Pradesh"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time *</label>
            <input
              required
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="e.g. 21 July 2026, Tuesday"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Chadhava Image (Leave empty to keep current)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Preview" className="w-full max-w-sm rounded-lg border border-gray-200" />
              </div>
            )}
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Slider Image 2 (Leave empty to keep current)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleSlider1FileChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {sliderImage1Preview && (
              <div className="mt-4">
                <img src={sliderImage1Preview} alt="Preview 2" className="w-full rounded-lg border border-gray-200" />
              </div>
            )}
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Slider Image 3 (Leave empty to keep current)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleSlider2FileChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {sliderImage2Preview && (
              <div className="mt-4">
                <img src={sliderImage2Preview} alt="Preview 3" className="w-full rounded-lg border border-gray-200" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text (Optional)</label>
            <input
              type="text"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              placeholder="e.g. 10% OFF"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Badge Color</label>
            <select
              name="badgeColor"
              value={formData.badgeColor}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="bg-[#F3912E]">Orange (Default)</option>
              <option value="bg-[#D97706]">Dark Orange</option>
              <option value="bg-red-500">Red</option>
              <option value="bg-green-600">Green</option>
              <option value="bg-blue-600">Blue</option>
            </select>
          </div>
          
          <div className="md:col-span-2 pt-4 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Detailed Content Settings</h3>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Grey Subtitle (Below Title)</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="e.g. for Supreme Protection, Severe Enemy Defeat and Karmic Darkness Removal"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Why This Chadhava (Detailed Description)</label>
            <textarea
              name="whyThisChadhava"
              value={formData.whyThisChadhava}
              onChange={handleChange}
              rows={4}
              placeholder="Detailed answer to why this Chadhava is performed..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">About Temple Details</label>
            <textarea
              name="aboutTemple"
              value={formData.aboutTemple}
              onChange={handleChange}
              rows={3}
              placeholder="Details about the temple where Chadhava is performed..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y mb-4"
            ></textarea>

            <label className="block text-sm font-medium text-gray-700 mb-1">Temple Image (Left Side Image)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleTempleFileChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {templeImagePreview && (
              <div className="mt-4">
                <img src={templeImagePreview} alt="Temple Preview" className="w-48 rounded-lg border border-gray-200" />
              </div>
            )}
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Chadhava Benefits (One per line)</label>
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              rows={5}
              placeholder="Destruction of negative influences...&#10;Spiritual strength and inner awakening..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
            ></textarea>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Inclusions (One per line)</label>
            <textarea
              name="inclusions"
              value={formData.inclusions}
              onChange={handleChange}
              rows={5}
              placeholder="Chadhava Sankalp with Name & Gotra&#10;Video recording sent via WhatsApp..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
            ></textarea>
          </div>

          {/* Pricing Settings */}
          <div className="md:col-span-2 pt-4 border-t border-gray-100 mt-2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Pricing & Packages</h3>
          </div>

          {/* India Pricing */}
          <div className="md:col-span-1 bg-orange-50/50 p-5 rounded-xl border border-orange-100">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">🇮🇳 India Pricing (₹)</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Package 1 Title</label>
                <input
                  type="text"
                  name="package1Title"
                  value={formData.package1Title}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-sm mb-2"
                />
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Package 1 Price</label>
                <input
                  type="number"
                  name="indiaIndividualPrice"
                  value={formData.indiaIndividualPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-sm mb-2"
                />
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Package 1 Image</label>
                <input
                  type="file"
                  name="package1Image"
                  accept="image/*"
                  onChange={handlePackage1FileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {package1ImagePreview && (
                  <div className="mt-2 relative w-16 h-16 rounded overflow-hidden border border-gray-200">
                    <img src={package1ImagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="pt-2 border-t border-orange-200">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Package 2 Title</label>
                <input
                  type="text"
                  name="package2Title"
                  value={formData.package2Title}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-sm mb-2"
                />
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Package 2 Price</label>
                <input
                  type="number"
                  name="indiaCouplePrice"
                  value={formData.indiaCouplePrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-sm mb-2"
                />
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Package 2 Image</label>
                <input
                  type="file"
                  name="package2Image"
                  accept="image/*"
                  onChange={handlePackage2FileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {package2ImagePreview && (
                  <div className="mt-2 relative w-16 h-16 rounded overflow-hidden border border-gray-200">
                    <img src={package2ImagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="pt-2 border-t border-orange-200">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Package 3 Title</label>
                <input
                  type="text"
                  name="package3Title"
                  value={formData.package3Title}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-sm mb-2"
                />
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Package 3 Price</label>
                <input
                  type="number"
                  name="indiaFamilyPrice"
                  value={formData.indiaFamilyPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-sm mb-2"
                />
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Package 3 Image</label>
                <input
                  type="file"
                  name="package3Image"
                  accept="image/*"
                  onChange={handlePackage3FileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {package3ImagePreview && (
                  <div className="mt-2 relative w-16 h-16 rounded overflow-hidden border border-gray-200">
                    <img src={package3ImagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* NRI Pricing */}
          <div className="md:col-span-1 bg-blue-50/50 p-5 rounded-xl border border-blue-100">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">🌎 Abroad/NRI Pricing (C$)</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Individual Package Price</label>
                <input
                  type="number"
                  name="nriIndividualPrice"
                  value={formData.nriIndividualPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Couple Package Price</label>
                <input
                  type="number"
                  name="nriCouplePrice"
                  value={formData.nriCouplePrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Family Package Price</label>
                <input
                  type="number"
                  name="nriFamilyPrice"
                  value={formData.nriFamilyPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? "Updating..." : "Update Chadhava"}
          </button>
        </div>
      </form>
    </div>
  );
}
