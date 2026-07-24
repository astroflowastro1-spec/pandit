"use client";

import { useEffect, useState } from "react";
import { FiCopy, FiCheckCircle } from "react-icons/fi";

export default function AffiliateLinks() {
  const [pujas, setPujas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [affiliateCode, setAffiliateCode] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("pndit_affiliate");
    if (stored) {
      setAffiliateCode(JSON.parse(stored).affiliateCode);
    }

    fetch("/api/pujas")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPujas(data.data.filter((p: any) => p.isActive !== false));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCopy = (slug: string, id: string) => {
    // Generate the full URL with the affiliate code
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/puja/${slug}?ref=${affiliateCode}`;
    
    navigator.clipboard.writeText(link).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleGenerateCustomLink = () => {
    let base = customUrl.trim();
    if (!base) base = window.location.origin;
    
    // Add protocol if missing
    if (!/^https?:\/\//i.test(base)) {
      base = 'https://' + base;
    }

    try {
      const url = new URL(base);
      url.searchParams.set('ref', affiliateCode);
      navigator.clipboard.writeText(url.toString()).then(() => {
        setCopiedId("custom");
        setTimeout(() => setCopiedId(null), 2000);
      });
    } catch (e) {
      alert("Please enter a valid URL");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Referral Links</h1>
        <p className="text-gray-500 mt-2 text-lg">Generate and copy your unique tracking links to share.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Custom Link Generator</h2>
        <p className="text-sm text-gray-500 mb-4">Paste any page link from our website (like the Home Page) to instantly convert it into your tracking link.</p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="e.g. https://merepanditji.org/"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
          />
          <button 
            onClick={handleGenerateCustomLink}
            className={`flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${
              copiedId === "custom"
                ? "bg-green-100 text-green-700"
                : "bg-gray-900 hover:bg-gray-800 text-white shadow-sm"
            }`}
          >
            {copiedId === "custom" ? (
              <><FiCheckCircle className="text-lg" /> Copied!</>
            ) : (
              <><FiCopy className="text-lg" /> Generate & Copy</>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900">Available Products</h2>
        </div>
        
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading products...</div>
        ) : pujas.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No active products found to promote.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {pujas.map(puja => (
              <div key={puja._id} className="p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-gray-50/50 transition-colors">
                {puja.imageSrc && (
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                    <img src={puja.imageSrc} alt={puja.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{puja.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{puja.location}</p>
                  
                  <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg font-mono text-sm text-gray-600 max-w-lg mx-auto md:mx-0 overflow-hidden text-ellipsis">
                    <span className="truncate">https://merepanditji.org/puja/{puja.slug}?ref={affiliateCode}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => handleCopy(puja.slug, puja._id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                      copiedId === puja._id
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    }`}
                  >
                    {copiedId === puja._id ? (
                      <>
                        <FiCheckCircle className="text-lg" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <FiCopy className="text-lg" />
                        Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
