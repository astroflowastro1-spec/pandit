"use client";

import { useEffect, useState } from "react";
import { FiDollarSign, FiClock, FiCheckCircle } from "react-icons/fi";

export default function AffiliatePayouts() {
  const [affiliate, setAffiliate] = useState<any>(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [requestAmount, setRequestAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("pndit_affiliate");
    if (stored) {
      const parsed = JSON.parse(stored);
      setAffiliate(parsed);
      fetch(`/api/affiliate/stats?id=${parsed.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setWalletBalance(data.data.walletBalance);
          }
        });
    }
  }, []);

  const handleRequestPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const amount = Number(requestAmount);
    if (amount <= 0 || amount > walletBalance) {
      setMessage("Invalid amount");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/affiliate/payouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ affiliateId: affiliate.id, amount })
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Payout requested successfully!");
        setWalletBalance(prev => prev - amount);
        setRequestAmount("");
      } else {
        setMessage(data.message || "Failed to request payout");
      }
    } catch (err) {
      setMessage("Error requesting payout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Payouts & Wallet</h1>
        <p className="text-gray-500 mt-2 text-lg">Manage your earnings and request withdrawals.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-gray-500 font-medium mb-1">Available Balance</p>
          <h2 className="text-4xl font-bold text-green-600">₹{walletBalance.toFixed(2)}</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900">Request Withdrawal</h2>
        </div>
        <div className="p-8">
          {message && (
            <div className={`p-4 rounded-lg mb-6 text-sm font-medium border ${message.includes("success") ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleRequestPayout} className="max-w-md space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Amount (₹)</label>
              <input
                type="number"
                required
                min="1"
                max={walletBalance}
                step="0.01"
                value={requestAmount}
                onChange={(e) => setRequestAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="0.00"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading || walletBalance <= 0 || !requestAmount}
              className={`w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all ${
                loading || walletBalance <= 0 || !requestAmount ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
              }`}
            >
              {loading ? "Processing..." : "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
