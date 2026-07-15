"use client";

import { useEffect, useState } from "react";
import { FiSearch, FiCalendar, FiPhone, FiInfo, FiTrendingUp, FiDollarSign, FiActivity, FiTrash2, FiMessageCircle, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

interface BookingType {
  _id: string;
  paymentId: string;
  orderId: string;
  pujaTitle: string;
  pujaDate: string;
  pujaLocation: string;
  packageId: string;
  packageTitle: string;
  packagePrice: number;
  currency: string;
  currencyCode: string;
  customerName: string;
  customerPhone: string;
  customerGotra: string;
  member2Name?: string;
  member3Name?: string;
  member4Name?: string;
  totalPaid: number;
  date: string;
  createdAt: string;
  whatsappSent: boolean;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<BookingType | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null); // ID of booking to delete
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setLoading(true);
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBookings(data.data);
          setFilteredBookings(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load bookings", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter((b) => {
        return (
          b.customerName.toLowerCase().includes(term) ||
          b.customerPhone.toLowerCase().includes(term) ||
          b.customerGotra.toLowerCase().includes(term) ||
          b.pujaTitle.toLowerCase().includes(term) ||
          b.packageTitle.toLowerCase().includes(term) ||
          (b.paymentId && b.paymentId.toLowerCase().includes(term))
        );
      });
      setFilteredBookings(filtered);
    }
  }, [searchTerm, bookings]);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
        setFilteredBookings((prev) => prev.filter((b) => b._id !== id));
        if (selectedBooking?._id === id) setSelectedBooking(null);
      } else {
        alert("Failed to delete: " + data.error);
      }
    } catch (err) {
      alert("Error deleting booking.");
    }
    setDeleting(false);
    setDeleteConfirm(null);
  };

  // Metrics
  const totalPaidSum = bookings.reduce((sum, b) => sum + (b.totalPaid || b.packagePrice || 0), 0);
  const totalCount = bookings.length;
  const whatsappSentCount = bookings.filter((b) => b.whatsappSent).length;

  // Format price helper
  const formatPaidPrice = (amount: number, code: string = "INR") => {
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: code,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      return `${code} ${amount}`;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Bookings & Customers</h1>
        <p className="text-gray-500 mt-1">Monitor orders, customer details, gotra entries, and payment history.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 text-xl font-bold shrink-0">
            <FiActivity />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Bookings</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{totalCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 text-xl font-bold shrink-0">
            <FiDollarSign />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Revenue</p>
            <p className="text-2xl font-black text-gray-900 mt-1">
              {formatPaidPrice(totalPaidSum)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-xl font-bold shrink-0">
            <FiTrendingUp />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Order Value</p>
            <p className="text-2xl font-black text-gray-900 mt-1">
              {totalCount > 0 ? formatPaidPrice(Math.round(totalPaidSum / totalCount)) : "₹0"}
            </p>
          </div>
        </div>

        {/* WhatsApp Sent Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 text-xl font-bold shrink-0">
            <FiMessageCircle />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">WhatsApp Sent</p>
            <p className="text-2xl font-black text-gray-900 mt-1">
              {whatsappSentCount} <span className="text-sm font-semibold text-gray-400">/ {totalCount}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex items-center gap-3">
        <FiSearch className="text-gray-400 text-xl shrink-0" />
        <input
          type="text"
          placeholder="Search by customer name, phone, gotra, puja/chadhava, or payment ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent py-1 font-medium"
        />
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="text-center py-20 text-gray-500 font-medium">Loading bookings data...</div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-500 text-sm">
            {searchTerm ? "Try searching with a different term." : "No customer bookings have been recorded in MongoDB yet."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-250 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Puja / Chadhava</th>
                  <th className="px-6 py-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Package Details</th>
                  <th className="px-6 py-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Total Paid</th>
                  <th className="px-6 py-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Date & Payment ID</th>
                  <th className="px-6 py-4 font-bold text-gray-600 text-xs uppercase tracking-wider text-center">WhatsApp</th>
                  <th className="px-6 py-4 font-bold text-gray-600 text-xs uppercase tracking-wider text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Customer */}
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-extrabold text-gray-900 text-sm">{booking.customerName}</p>
                        <p className="text-xs text-gray-500 font-medium mt-1 flex items-center gap-1.5">
                          <FiPhone className="text-gray-400" /> +91 {booking.customerPhone}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Gotra: <span className="font-bold text-orange-600">{booking.customerGotra}</span></p>
                      </div>
                    </td>

                    {/* Puja Title */}
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-bold text-gray-900 text-sm line-clamp-1">{booking.pujaTitle}</p>
                        <p className="text-[11px] text-gray-500 font-medium mt-1 flex items-center gap-1">
                          <FiCalendar className="text-gray-400" /> {booking.pujaDate}
                        </p>
                      </div>
                    </td>

                    {/* Package */}
                    <td className="px-6 py-5">
                      <div>
                        <span className="inline-block bg-blue-50 text-blue-700 text-[10px] font-black uppercase px-2 py-0.5 rounded-md mb-1.5">
                          {booking.packageId}
                        </span>
                        <p className="font-semibold text-gray-800 text-xs line-clamp-1">{booking.packageTitle}</p>
                        {(booking.member2Name || booking.member3Name || booking.member4Name) && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider">Devotees:</span>
                            {[booking.customerName, booking.member2Name, booking.member3Name, booking.member4Name].filter(Boolean).map((name, idx) => (
                              <span key={idx} className="text-[9px] font-bold bg-gray-100 text-gray-600 px-1.5 py-0.2 rounded-md">
                                {name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Paid */}
                    <td className="px-6 py-5 font-black text-gray-900 text-sm">
                      {formatPaidPrice(booking.totalPaid || booking.packagePrice, booking.currencyCode)}
                    </td>

                    {/* Date / Payment ID */}
                    <td className="px-6 py-5">
                      <div>
                        <p className="text-xs text-gray-600 font-semibold">
                          {booking.date ? new Date(booking.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          }) : new Date(booking.createdAt).toLocaleDateString("en-IN")}
                        </p>
                        <p className="text-[10px] text-gray-400 font-mono mt-1 select-all">Pay ID: {booking.paymentId}</p>
                      </div>
                    </td>

                    {/* WhatsApp Status */}
                    <td className="px-6 py-5 text-center">
                      {booking.whatsappSent ? (
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-black px-2.5 py-1 rounded-full border border-green-200">
                          <FiCheckCircle className="text-xs" /> Sent
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-[10px] font-black px-2.5 py-1 rounded-full border border-red-200">
                          <FiAlertCircle className="text-xs" /> Not Sent
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-1.5 px-3 rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <FiInfo /> View
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(booking._id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs py-1.5 px-3 rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-gray-150 p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTrash2 className="text-red-600 text-2xl" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Delete Booking?</h3>
            <p className="text-gray-500 text-sm mb-6">Yeh booking permanently delete ho jayegi. Kya aap sure hain?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-sm py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm py-3 rounded-xl transition-colors disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-150 flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg">Order Details</h3>
                <p className="text-[10px] text-gray-400 font-mono mt-0.5">Order ID: {selectedBooking.orderId}</p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold w-8 h-8 rounded-full bg-gray-200/50 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* WhatsApp Status Banner */}
              <div className={`rounded-xl px-4 py-3 flex items-center gap-3 border ${selectedBooking.whatsappSent ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <FiMessageCircle className={`text-lg ${selectedBooking.whatsappSent ? 'text-green-600' : 'text-red-500'}`} />
                <div>
                  <p className={`text-xs font-extrabold ${selectedBooking.whatsappSent ? 'text-green-700' : 'text-red-700'}`}>
                    WhatsApp Confirmation: {selectedBooking.whatsappSent ? '✅ Sent Successfully' : '❌ Not Sent'}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    {selectedBooking.whatsappSent
                      ? `Message sent to +91 ${selectedBooking.customerPhone}`
                      : 'Message could not be delivered to customer'}
                  </p>
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Customer & Devotee Information</h4>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs font-bold text-gray-500">Full Name</span>
                    <span className="text-xs font-extrabold text-gray-900 text-right">{selectedBooking.customerName}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs font-bold text-gray-500">WhatsApp Mobile</span>
                    <span className="text-xs font-extrabold text-gray-900 text-right">+91 {selectedBooking.customerPhone}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs font-bold text-gray-500">Gotra</span>
                    <span className="text-xs font-extrabold text-orange-600 text-right">{selectedBooking.customerGotra}</span>
                  </div>

                  {(selectedBooking.member2Name || selectedBooking.member3Name || selectedBooking.member4Name) && (
                    <div className="border-t border-gray-200 pt-3 mt-1 space-y-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Additional Devotees</p>
                      {selectedBooking.member2Name && (
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-500">Member 2</span>
                          <span className="text-xs font-extrabold text-gray-900">{selectedBooking.member2Name}</span>
                        </div>
                      )}
                      {selectedBooking.member3Name && (
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-500">Member 3</span>
                          <span className="text-xs font-extrabold text-gray-900">{selectedBooking.member3Name}</span>
                        </div>
                      )}
                      {selectedBooking.member4Name && (
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-500">Member 4</span>
                          <span className="text-xs font-extrabold text-gray-900">{selectedBooking.member4Name}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Puja Info */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Puja / Chadhava Details</h4>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs font-bold text-gray-500">Offer Title</span>
                    <span className="text-xs font-extrabold text-gray-900 text-right max-w-[250px]">{selectedBooking.pujaTitle}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs font-bold text-gray-500">Ritual Location</span>
                    <span className="text-xs font-extrabold text-gray-900 text-right">{selectedBooking.pujaLocation}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs font-bold text-gray-500">Scheduled Date</span>
                    <span className="text-xs font-extrabold text-gray-900 text-right">{selectedBooking.pujaDate}</span>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Payment Summary</h4>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs font-bold text-gray-500">Selected Package</span>
                    <span className="text-xs font-extrabold text-gray-900 text-right">{selectedBooking.packageTitle}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs font-bold text-gray-500">Package ID</span>
                    <span className="text-xs font-extrabold text-blue-700 text-right uppercase">{selectedBooking.packageId}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4 border-t border-gray-200 pt-3 mt-1">
                    <span className="text-xs font-extrabold text-gray-900">Total Paid</span>
                    <span className="text-sm font-black text-emerald-600">
                      {formatPaidPrice(selectedBooking.totalPaid || selectedBooking.packagePrice, selectedBooking.currencyCode)}
                    </span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[10px] font-bold text-gray-500">Payment ID</span>
                    <span className="text-[10px] font-mono text-gray-600 select-all">{selectedBooking.paymentId}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[10px] font-bold text-gray-500">Order Timestamp</span>
                    <span className="text-[10px] font-semibold text-gray-600">
                      {new Date(selectedBooking.createdAt).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
              <button
                onClick={() => setDeleteConfirm(selectedBooking._id)}
                className="bg-red-50 hover:bg-red-100 text-red-600 font-extrabold text-xs py-2 px-4 rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                <FiTrash2 /> Delete Booking
              </button>
              <button
                onClick={() => setSelectedBooking(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-2 px-5 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
