"use client";

import { useEffect, useState } from "react";
import { FiTrendingUp, FiMousePointer, FiShoppingCart, FiDollarSign } from "react-icons/fi";

export default function AffiliateDashboard() {
  const [stats, setStats] = useState({
    clicks: 0,
    orders: 0,
    revenue: 0,
    commission: 0,
    walletBalance: 0
  });
  const [loading, setLoading] = useState(true);
  const [affiliateName, setAffiliateName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("pndit_affiliate");
    if (stored) {
      const parsed = JSON.parse(stored);
      setAffiliateName(parsed.name);
      
      // Fetch stats for this affiliate
      fetch(`/api/affiliate/stats?id=${parsed.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setStats(data.data);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome, {affiliateName.split(' ')[0]}!</h1>
        <p className="text-gray-500 mt-2 text-lg">Here is how your referrals are performing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <FiMousePointer size={24} />
          </div>
          <div>
            <p className="text-gray-500 font-medium text-sm">Total Clicks</p>
            <p className="text-2xl font-bold text-gray-900">{loading ? "..." : stats.clicks}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <FiShoppingCart size={24} />
          </div>
          <div>
            <p className="text-gray-500 font-medium text-sm">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{loading ? "..." : stats.orders}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <FiTrendingUp size={24} />
          </div>
          <div>
            <p className="text-gray-500 font-medium text-sm">Sales Driven</p>
            <p className="text-2xl font-bold text-gray-900">₹{loading ? "..." : stats.revenue}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <FiDollarSign size={80} />
          </div>
          <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10">
            <FiDollarSign size={24} />
          </div>
          <div className="relative z-10">
            <p className="text-gray-500 font-medium text-sm">Available Wallet</p>
            <p className="text-2xl font-bold text-green-600">₹{loading ? "..." : stats.walletBalance}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center mt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to earn more?</h3>
        <p className="text-gray-500 mb-6">Generate custom referral links for any active Puja and share them on your social media.</p>
        <button 
          onClick={() => window.location.href = '/affiliate/links'}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Generate Referral Links
        </button>
      </div>
    </div>
  );
}
