"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiCheck, FiShield, FiLock, FiChevronLeft } from "react-icons/fi";
import { useCountry } from "@/context/CountryContext";

export default function CartClient() {
  const router = useRouter();
  const { countryData, formatPrice } = useCountry();
  const [booking, setBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("pending_booking");
    if (data) {
      setBooking(JSON.parse(data));
    } else {
      router.push("/");
    }
  }, [router]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsLoading(true);
    
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setIsLoading(false);
      return;
    }

    try {
      const gstAmount = Math.round(booking.packagePrice * 0.18);
      const totalAmount = booking.packagePrice + gstAmount;

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          currency: booking.currencyCode || "INR",
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
        description: `Booking for ${booking.pujaTitle}`,
        order_id: order.id,
        prefill: {
          name: booking.customerName,
          contact: booking.customerPhone,
        },
        notes: {
          gotra: booking.customerGotra,
          member2Name: booking.member2Name || "",
          member3Name: booking.member3Name || "",
          member4Name: booking.member4Name || "",
        },
        theme: {
          color: "#117B50",
        },
        handler: async function (response: any) {
          // Payment Success
          try {
            await fetch("/api/save-booking", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                ...booking,
                totalPaid: totalAmount,
                date: new Date().toISOString()
              })
            });
          } catch (e) {
            console.error("Failed to save to sheet", e);
          }

          localStorage.removeItem("pending_booking");
          router.push("/success");
        },
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

  if (!booking) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div></div>;

  const gstAmount = Math.round(booking.packagePrice * 0.18);
  const totalAmount = booking.packagePrice + gstAmount;

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 font-medium transition-colors"
        >
          <FiChevronLeft size={20} /> Back
        </button>

        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 font-serif">Review & Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Puja Summary */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100 flex items-center gap-2">
                <span className="text-xl">🕉️</span> Puja Details
              </h2>
              
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Puja Name</p>
                  <p className="font-bold text-gray-900 text-lg">{booking.pujaTitle}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100/50">
                    <p className="text-xs font-bold text-orange-600/70 uppercase tracking-wider mb-1">Location</p>
                    <p className="font-bold text-gray-900 text-sm">{booking.pujaLocation}</p>
                  </div>
                  <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100/50">
                    <p className="text-xs font-bold text-orange-600/70 uppercase tracking-wider mb-1">Date</p>
                    <p className="font-bold text-gray-900 text-sm">{booking.pujaDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Devotee Summary */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100 flex items-center gap-2">
                <span className="text-xl">👤</span> Devotee Details
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                    {booking.member2Name ? "Devotee Names" : "Full Name"}
                  </p>
                  <p className="font-bold text-gray-900">{booking.customerName}</p>
                  {booking.member2Name && <p className="font-bold text-gray-900">{booking.member2Name}</p>}
                  {booking.member3Name && <p className="font-bold text-gray-900">{booking.member3Name}</p>}
                  {booking.member4Name && <p className="font-bold text-gray-900">{booking.member4Name}</p>}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Gotra</p>
                  <p className="font-bold text-gray-900">{booking.customerGotra || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">WhatsApp</p>
                  <p className="font-bold text-gray-900 flex items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-4 h-4" />
                    +91 {booking.customerPhone}
                  </p>
                </div>
              </div>
            </div>
            
          </div>

          {/* Pricing Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[24px] p-6 shadow-xl shadow-orange-500/5 border border-[#F26622]/20 sticky top-32">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="font-bold text-gray-900 block">{booking.packageTitle}</span>
                    <span className="text-xs font-medium text-gray-500">Selected Package</span>
                  </div>
                  <span className="font-black text-gray-900 text-lg whitespace-nowrap">{formatPrice(booking.packagePrice)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600 font-bold bg-gray-50 p-3 rounded-xl">
                  <span>Taxes & Fees (18% GST)</span>
                  <span>+ {formatPrice(gstAmount)}</span>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-gray-500 text-sm mb-1">Total Amount</span>
                  <span className="font-black text-3xl text-[#F26622] leading-none">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full bg-[#117B50] hover:bg-[#0D6240] disabled:bg-[#117B50]/70 text-white font-extrabold text-[15px] tracking-wide py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FiLock size={18} /> Proceed to Pay
                  </>
                )}
              </button>

              {process.env.NODE_ENV === "development" && (
                <button
                  onClick={async () => {
                    setIsLoading(true);
                    try {
                      const mockResponse = {
                        razorpay_payment_id: `pay_mock_${Date.now()}`,
                        razorpay_order_id: `order_mock_${Date.now()}`
                      };
                      await fetch("/api/save-booking", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          paymentId: mockResponse.razorpay_payment_id,
                          orderId: mockResponse.razorpay_order_id,
                          signature: "mock_signature",
                          ...booking,
                          totalPaid: totalAmount,
                          date: new Date().toISOString()
                        })
                      });
                      localStorage.removeItem("pending_booking");
                      router.push("/success");
                    } catch (e) {
                      console.error("Mock payment failed", e);
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  disabled={isLoading}
                  className="w-full mt-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-[15px] tracking-wide py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center"
                >
                  ⚠️ [DEV] Simulate Payment Success
                </button>
              )}

              <div className="mt-5 bg-gray-50 rounded-xl p-3 flex items-center justify-center gap-2 text-xs text-gray-600 font-bold">
                <FiShield className="text-emerald-500 text-base" /> 100% Safe & Secure Payments
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
