"use client";

import { useCart } from "@/context/CartContext";
import { useCountry } from "@/context/CountryContext";
import SafeImage from "@/components/ui/SafeImage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiTrash2, FiChevronLeft, FiShoppingBag, FiLock, FiCheck } from "react-icons/fi";
import { FaCcVisa, FaCcMastercard, FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProductCartClient() {
  const { cartItems, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart();
  const { formatPrice } = useCountry();
  const router = useRouter();

  if (totalItems === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20 px-4 pt-32">
        <div className="w-24 h-24 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-6">
          <FiShoppingBag size={40} />
        </div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md text-center">Looks like you haven't added anything to your cart yet. Explore our premium spiritual collection.</p>
        <Link 
          href="/" 
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-0.5"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  // Calculate taxes if required (Assuming GST is included in price for simplicity, or we can add it)
  // Let's add 18% GST just like the Puja booking if needed, or assume it's included.
  // The ProductInfo page says "Inclusive of GST" for products, so we'll treat totalPrice as final.
  
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-black text-gray-900 flex items-center gap-3">
            Your Cart <span className="text-orange-500 text-2xl">({totalItems})</span>
          </h1>
          <Link href="/" className="hidden md:flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors">
            <FiChevronLeft /> Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-8 space-y-6">
                {cartItems.map((item, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={item.id} 
                    className={`flex flex-col sm:flex-row gap-6 ${index !== cartItems.length - 1 ? 'border-b border-gray-100 pb-6' : ''}`}
                  >
                    {/* Item Image */}
                    <div className="w-full sm:w-[140px] aspect-square rounded-2xl overflow-hidden relative bg-gray-50 border border-gray-100 shrink-0">
                      <SafeImage 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <Link href={`/product/${item.slug}`} className="text-lg font-bold text-gray-900 hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                            {item.title}
                          </Link>
                          <div className="text-xl font-black text-gray-900 mt-2">
                            {formatPrice(item.price)}
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 p-2 bg-gray-50 hover:bg-red-50 rounded-full transition-colors shrink-0"
                          title="Remove item"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 mt-6 sm:mt-0">
                        <div className="flex items-center border border-gray-200 rounded-lg h-10 bg-white">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors font-medium"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors font-medium"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-sm font-bold text-gray-500">
                          Total: <span className="text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-xl shadow-orange-500/5 border border-orange-100/50 sticky top-32">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-gray-600 font-medium">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="text-gray-900 font-bold">{formatPrice(totalPrice)}</span>
                </div>
                
                <div className="flex justify-between items-center text-gray-600 font-medium bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                  <span className="text-emerald-700 flex items-center gap-1.5"><FiCheck /> Shipping</span>
                  <span className="text-emerald-700 font-bold uppercase tracking-wider text-xs">Free</span>
                </div>
                
                <div className="flex justify-between items-center text-gray-600 font-medium text-sm">
                  <span>GST (18%)</span>
                  <span>{formatPrice(totalPrice * 0.18)}</span>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-gray-200 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-gray-900 text-lg">Total</span>
                  <span className="font-black text-3xl text-orange-600 leading-none">{formatPrice(totalPrice * 1.18)}</span>
                </div>
              </div>

              <button 
                onClick={() => router.push("/checkout")}
                className="w-full bg-[#117B50] hover:bg-[#0D6240] text-white font-extrabold text-[15px] tracking-wide py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <FiLock size={18} /> Proceed to Checkout
              </button>

              <div className="mt-6 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <span>Safe & Secure Payments</span>
                </div>
                <div className="flex gap-2 opacity-60">
                  {/* Payment Icons */}
                  <div className="w-10 h-6 bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden p-1 text-blue-800">
                    <FaCcVisa size={24} />
                  </div>
                  <div className="w-10 h-6 bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden p-1 text-red-500">
                    <FaCcMastercard size={24} />
                  </div>
                  <div className="w-10 h-6 bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden p-1 text-green-700">
                    <FaCreditCard size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
