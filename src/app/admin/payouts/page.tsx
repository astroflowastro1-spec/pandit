"use client";

import { useEffect, useState } from "react";
import { FiDollarSign, FiCheck, FiX } from "react-icons/fi";

export default function AdminPayouts() {
  const [payouts, setPayouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/payouts")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPayouts(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAction = async (id: string, status: string) => {
    if (!window.confirm(`Are you sure you want to mark this payout as ${status}?`)) return;

    try {
      const res = await fetch(`/api/admin/payouts`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setPayouts(payouts.map((p) => (p._id === id ? data.data : p)));
      } else {
        alert(data.message || `Failed to mark as ${status}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error updating payout");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payout Requests</h1>
          <p className="text-gray-500 mt-1">Review and process affiliate withdrawal requests.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading payout requests...</div>
      ) : payouts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiDollarSign className="text-2xl" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No payout requests</h3>
          <p className="text-gray-500 mb-6">Affiliate withdrawal requests will appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 font-medium text-gray-600">Affiliate</th>
                <th className="px-6 py-4 font-medium text-gray-600">Amount</th>
                <th className="px-6 py-4 font-medium text-gray-600">Date Requested</th>
                <th className="px-6 py-4 font-medium text-gray-600">Status</th>
                <th className="px-6 py-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout) => (
                <tr
                  key={payout._id}
                  className="border-b border-gray-100 hover:bg-gray-50/50"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{payout.affiliateId?.name || 'Unknown'}</p>
                    <p className="text-sm text-gray-500">{payout.affiliateId?.email || 'N/A'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-lg font-bold text-green-600">₹{payout.amount}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{new Date(payout.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      payout.status === 'APPROVED' ? "bg-green-100 text-green-700" :
                      payout.status === 'REJECTED' ? "bg-red-100 text-red-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {payout.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    {payout.status === 'PENDING' ? (
                      <>
                        <button 
                          onClick={() => handleAction(payout._id, 'APPROVED')}
                          className="flex items-center gap-1 bg-green-50 text-green-600 hover:bg-green-100 px-3 py-1.5 rounded-md font-medium transition-colors text-sm"
                        >
                          <FiCheck /> Approve
                        </button>
                        <button 
                          onClick={() => handleAction(payout._id, 'REJECTED')}
                          className="flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-md font-medium transition-colors text-sm"
                        >
                          <FiX /> Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-sm text-gray-400 italic">Processed</span>
                    )}
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
