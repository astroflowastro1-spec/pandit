"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiTrash2, FiUsers, FiDollarSign, FiCopy } from "react-icons/fi";

export default function AffiliatesDashboard() {
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/affiliates")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAffiliates(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleToggleActive = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
      const res = await fetch(`/api/admin/affiliates/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setAffiliates(affiliates.map((a) => (a._id === id ? { ...a, status: newStatus } : a)));
      }
    } catch (err) {
      console.error(err);
      alert("Error toggling status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this Affiliate? This action cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/affiliates/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setAffiliates(affiliates.filter((a) => a._id !== id));
      } else {
        alert("Failed to delete Affiliate");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting Affiliate");
    }
  };

  const handleCopyLink = (code: string, id: string) => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}?ref=${code}`;
    
    navigator.clipboard.writeText(link).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(err => {
      console.error("Failed to copy link", err);
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Affiliate Management</h1>
          <p className="text-gray-500 mt-1">Manage your affiliates and their commission structures.</p>
        </div>
        <Link
          href="/admin/add-affiliate"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <FiPlus />
          Add Affiliate
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading affiliates...</div>
      ) : affiliates.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUsers className="text-2xl" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No affiliates found</h3>
          <p className="text-gray-500 mb-6">Get started by onboarding your first affiliate partner.</p>
          <Link
            href="/admin/add-affiliate"
            className="text-blue-600 font-medium hover:underline"
          >
            Add your first Affiliate &rarr;
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 font-medium text-gray-600">Name & Code</th>
                <th className="px-6 py-4 font-medium text-gray-600">Contact</th>
                <th className="px-6 py-4 font-medium text-gray-600">Commission</th>
                <th className="px-6 py-4 font-medium text-gray-600">Wallet</th>
                <th className="px-6 py-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {affiliates.map((affiliate) => (
                <tr
                  key={affiliate._id}
                  className="border-b border-gray-100 hover:bg-gray-50/50"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{affiliate.name}</p>
                    <button
                      onClick={() => handleCopyLink(affiliate.affiliateCode, affiliate._id)}
                      className="text-xs text-blue-600 font-bold bg-blue-50 hover:bg-blue-100 transition-colors inline-flex items-center gap-1.5 px-2 py-1 rounded mt-1 cursor-pointer"
                      title="Click to copy affiliate tracking link"
                    >
                      {affiliate.affiliateCode}
                      {copiedId === affiliate._id ? (
                        <span className="text-green-600 text-[10px]">Copied URL!</span>
                      ) : (
                        <FiCopy className="opacity-70" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{affiliate.email}</p>
                    <p className="text-sm text-gray-600">{affiliate.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 font-medium">
                      {affiliate.commissionConfig.commissionType === 'PERCENTAGE' 
                        ? `${affiliate.commissionConfig.value}%` 
                        : `₹${affiliate.commissionConfig.value}`}
                    </p>
                    <p className="text-xs text-gray-500">{affiliate.commissionConfig.scope}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-green-600 flex items-center gap-1">
                      <FiDollarSign />
                      {affiliate.walletBalance}
                    </p>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <button
                      onClick={() => handleToggleActive(affiliate._id, affiliate.status)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                        affiliate.status === 'Active' ? "bg-green-500" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      role="switch"
                      aria-checked={affiliate.status === 'Active'}
                    >
                      <span className="sr-only">Toggle active status</span>
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          affiliate.status === 'Active' ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span className={`text-xs font-bold w-12 ${affiliate.status === 'Active' ? "text-green-600" : "text-gray-500"}`}>
                      {affiliate.status}
                    </span>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <Link href={`/admin/edit-affiliate/${affiliate._id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(affiliate._id)} 
                      className="text-red-500 hover:text-red-700 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                      title="Delete Affiliate"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
