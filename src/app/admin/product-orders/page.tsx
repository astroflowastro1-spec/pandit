"use client";

import { useEffect, useState } from "react";
import { FiSearch, FiPackage, FiInfo, FiTrendingUp, FiDollarSign, FiActivity, FiTrash2, FiMapPin, FiTruck } from "react-icons/fi";
import SafeImage from "@/components/ui/SafeImage";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderType {
  _id: string;
  orderId: string;
  paymentId: string;
  totalPaid: number;
  status: string;
  shippingInfo: {
    name: string;
    email?: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  createdAt: string;
}

export default function ProductOrdersPage() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    fetch("/api/admin/product-orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.data);
          setFilteredOrders(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load orders", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((o) => {
        return (
          o.shippingInfo.name.toLowerCase().includes(term) ||
          o.shippingInfo.phone.toLowerCase().includes(term) ||
          o.orderId.toLowerCase().includes(term) ||
          o.paymentId.toLowerCase().includes(term) ||
          o.items.some(item => item.title.toLowerCase().includes(term))
        );
      });
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/product-orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o._id !== id));
        setFilteredOrders((prev) => prev.filter((o) => o._id !== id));
        if (selectedOrder?._id === id) setSelectedOrder(null);
      } else {
        alert("Failed to delete: " + data.error);
      }
    } catch (err) {
      alert("Error deleting order.");
    }
    setDeleting(false);
    setDeleteConfirm(null);
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPaid, 0);
  const totalCount = orders.length;
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((acc, item) => acc + item.quantity, 0), 0);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Product Orders</h1>
        <p className="text-gray-500 mt-1">Monitor e-commerce physical product orders and shipping details.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 text-xl font-bold shrink-0">
            <FiActivity />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Orders</p>
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
              {formatPrice(totalRevenue)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-xl font-bold shrink-0">
            <FiPackage />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Items Sold</p>
            <p className="text-2xl font-black text-gray-900 mt-1">
              {totalItemsSold}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex items-center gap-3">
        <FiSearch className="text-gray-400 text-xl shrink-0" />
        <input
          type="text"
          placeholder="Search by customer name, phone, order ID, or product title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent py-1 font-medium"
        />
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="text-center py-20 text-gray-500 font-medium">Loading orders data...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPackage className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No product orders found</h3>
          <p className="text-gray-500 text-sm">
            {searchTerm ? "Try searching with a different term." : "No e-commerce orders have been placed yet."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-250 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Shipping Details</th>
                  <th className="px-6 py-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Items Summary</th>
                  <th className="px-6 py-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Amount Paid</th>
                  <th className="px-6 py-4 font-bold text-gray-600 text-xs uppercase tracking-wider">Status & Date</th>
                  <th className="px-6 py-4 font-bold text-gray-600 text-xs uppercase tracking-wider text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Customer */}
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-extrabold text-gray-900 text-sm">{order.shippingInfo.name}</p>
                        <p className="text-xs text-gray-500 font-medium mt-1">
                          +91 {order.shippingInfo.phone}
                        </p>
                        {order.shippingInfo.email && (
                          <p className="text-[11px] text-gray-400 mt-0.5">{order.shippingInfo.email}</p>
                        )}
                      </div>
                    </td>

                    {/* Shipping Address */}
                    <td className="px-6 py-5">
                      <div className="max-w-[200px]">
                        <p className="font-medium text-gray-700 text-xs line-clamp-2">{order.shippingInfo.address}</p>
                        <p className="text-[11px] text-gray-500 font-medium mt-1">
                          {order.shippingInfo.city}, {order.shippingInfo.state} - <span className="font-bold text-orange-600">{order.shippingInfo.pincode}</span>
                        </p>
                      </div>
                    </td>

                    {/* Items Summary */}
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-bold text-gray-800 text-xs line-clamp-1">{order.items[0]?.title} {order.items.length > 1 ? `& ${order.items.length - 1} more` : ''}</p>
                        <p className="text-[11px] text-gray-400 font-bold mt-1 uppercase tracking-wider bg-gray-100 inline-block px-1.5 py-0.5 rounded">
                          {order.items.reduce((acc, item) => acc + item.quantity, 0)} Items Total
                        </p>
                      </div>
                    </td>

                    {/* Paid */}
                    <td className="px-6 py-5 font-black text-gray-900 text-sm">
                      {formatPrice(order.totalPaid)}
                    </td>

                    {/* Status & Date */}
                    <td className="px-6 py-5">
                      <div>
                        <span className="inline-flex items-center bg-green-50 text-green-700 text-[10px] font-black uppercase px-2 py-0.5 rounded-md mb-1.5 border border-green-200">
                          {order.status || "Paid"}
                        </span>
                        <p className="text-xs text-gray-600 font-semibold">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                          })}
                        </p>
                        <p className="text-[9px] text-gray-400 font-mono mt-1 select-all">ID: {order.orderId}</p>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-1.5 px-3 rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <FiInfo /> View
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

      {/* Booking Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-150 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2"><FiPackage className="text-amber-500" /> Order Details</h3>
                <p className="text-[10px] text-gray-400 font-mono mt-0.5">Order ID: {selectedOrder.orderId}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold w-8 h-8 rounded-full bg-gray-200/50 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Shipping Info */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1"><FiMapPin /> Shipping Details</h4>
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] font-bold text-gray-500 uppercase">Customer Name</span>
                    <span className="text-sm font-extrabold text-gray-900">{selectedOrder.shippingInfo.name}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-gray-500 uppercase">Phone & Email</span>
                    <span className="text-sm font-bold text-gray-700">+91 {selectedOrder.shippingInfo.phone}</span>
                    {selectedOrder.shippingInfo.email && <span className="block text-xs text-gray-500 mt-0.5">{selectedOrder.shippingInfo.email}</span>}
                  </div>
                  <div className="md:col-span-2 mt-2 pt-4 border-t border-gray-200">
                    <span className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Delivery Address</span>
                    <span className="text-sm font-bold text-gray-800 leading-relaxed block">{selectedOrder.shippingInfo.address}</span>
                    <span className="text-sm font-bold text-gray-600 block mt-1">
                      {selectedOrder.shippingInfo.city}, {selectedOrder.shippingInfo.state} - <span className="text-orange-600 font-black">{selectedOrder.shippingInfo.pincode}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1"><FiPackage /> Ordered Items</h4>
                <div className="bg-gray-50 rounded-2xl p-2 border border-gray-100">
                  <div className="divide-y divide-gray-100">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-3 hover:bg-white rounded-xl transition-colors">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                          {item.image && (
                            <SafeImage src={item.image} alt={item.title} fill className="object-cover" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 text-sm line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-500 font-medium">Quantity: <span className="text-gray-900 font-bold">{item.quantity}</span></p>
                        </div>
                        <div className="font-black text-gray-900 text-sm">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1"><FiDollarSign /> Payment Details</h4>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[10px] font-bold text-gray-500">Order ID</span>
                    <span className="text-[10px] font-mono text-gray-600 select-all">{selectedOrder.orderId}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[10px] font-bold text-gray-500">Payment ID</span>
                    <span className="text-[10px] font-mono text-gray-600 select-all">{selectedOrder.paymentId}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[10px] font-bold text-gray-500">Timestamp</span>
                    <span className="text-[10px] font-semibold text-gray-600">
                      {new Date(selectedOrder.createdAt).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between items-start gap-4 border-t border-gray-200 pt-3 mt-1">
                    <span className="text-sm font-extrabold text-gray-900 uppercase">Total Paid</span>
                    <span className="text-xl font-black text-emerald-600">
                      {formatPrice(selectedOrder.totalPaid)}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
              <button
                onClick={() => setDeleteConfirm(selectedOrder._id)}
                className="bg-red-50 hover:bg-red-100 text-red-600 font-extrabold text-xs py-2.5 px-4 rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                <FiTrash2 /> Delete Order
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-gray-900 hover:bg-black text-white font-extrabold text-xs py-2.5 px-6 rounded-xl transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-gray-150 p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTrash2 className="text-red-600 text-2xl" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Delete Order?</h3>
            <p className="text-gray-500 text-sm mb-6">This product order will be permanently deleted. Are you sure?</p>
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
    </div>
  );
}
