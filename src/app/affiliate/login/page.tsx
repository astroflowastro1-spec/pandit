"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AffiliateLogin() {
  const [email, setEmail] = useState("");
  const [affiliateCode, setAffiliateCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/affiliate/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, affiliateCode }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem("pndit_affiliate", JSON.stringify(data.data));
        router.push("/affiliate/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Affiliate Portal</h1>
          <p className="text-gray-500">Sign in to manage your referrals and commissions.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Affiliate Code</label>
            <input
              type="text"
              required
              value={affiliateCode}
              onChange={(e) => setAffiliateCode(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all uppercase"
              placeholder="e.g. ABC123"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
            }`}
          >
            {loading ? "Signing in..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
