"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useCountry } from "@/context/CountryContext";
import { FiCheck, FiShield, FiLock, FiChevronLeft } from "react-icons/fi";

export default function CheckoutClient() {
  const router = useRouter();
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  const { formatPrice, countryData } = useCountry();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (totalItems === 0) {
      router.push("/cart");
    }
  }, [totalItems, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in all required shipping details.");
      return;
    }

    setIsLoading(true);
    
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          currency: countryData.currencyCode || "INR",
        }),
      });

      const order = await response.json();

      if (!order || !order.id) {
        alert("Server error. Are you online?");
        setIsLoading(false);
        return;
      }

      const options = {
        key: "rzp_live_SdjD9XSXUW7XLr",
        amount: order.amount,
        currency: order.currency,
        name: "Mere Pandit Ji",
        description: `Order for ${totalItems} items`,
        order_id: order.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        },
        theme: {
          color: "#000000",
        },
        handler: async function (response: any) {
          // Payment Success
          // We should ideally call a save-product-order endpoint here, but for now we'll simulate success.
          try {
            await fetch("/api/save-product-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                items: cartItems,
                shippingInfo: formData,
                totalPaid: totalPrice,
                date: new Date().toISOString()
              })
            }).catch(e => console.error(e));
          } catch (e) {
            console.error("Failed to save to sheet", e);
          }

          clearCart();
          router.push("/success");
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong with the payment!");
    } finally {
      setIsLoading(false);
    }
  };

  if (totalItems === 0) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 font-medium transition-colors"
        >
          <FiChevronLeft size={20} /> Back to Cart
        </button>

        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 font-serif">Checkout</h1>

        <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Shipping Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Shipping Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                  <input 
                    required
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 py-3 px-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium text-gray-900"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                  <input 
                    required
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 py-3 px-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium text-gray-900"
                    placeholder="10 digit mobile number"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 py-3 px-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium text-gray-900"
                    placeholder="For order tracking updates"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Address *</label>
                  <input 
                    required
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 py-3 px-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium text-gray-900"
                    placeholder="House No, Building, Street, Area"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">City *</label>
                  <input 
                    required
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 py-3 px-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium text-gray-900"
                    placeholder="City / Town"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">State *</label>
                    <input 
                      required
                      type="text" 
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full border border-gray-300 py-3 px-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium text-gray-900"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Pincode *</label>
                    <input 
                      required
                      type="text" 
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full border border-gray-300 py-3 px-4 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium text-gray-900"
                      placeholder="6 digit PIN"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[24px] p-6 shadow-xl shadow-gray-200/50 border border-gray-200 sticky top-32">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div>
                      <span className="font-bold text-gray-900 block line-clamp-1">{item.title}</span>
                      <span className="text-xs font-medium text-gray-500">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-gray-900 whitespace-nowrap">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-100 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Shipping</span>
                  <span className="text-emerald-600 uppercase text-xs font-bold tracking-wider">Free</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>GST</span>
                  <span>Inclusive</span>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-gray-500 text-sm mb-1">Total to Pay</span>
                  <span className="font-black text-3xl text-gray-900 leading-none">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#111111] hover:bg-[#000000] disabled:bg-gray-400 text-white font-extrabold text-[15px] tracking-wide py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FiLock size={18} /> Pay Now
                  </>
                )}
              </button>

              <div className="mt-5 bg-gray-50 rounded-xl p-3 flex items-center justify-center gap-2 text-xs text-gray-600 font-bold">
                <FiShield className="text-emerald-500 text-base" /> 100% Safe & Secure Payments
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
