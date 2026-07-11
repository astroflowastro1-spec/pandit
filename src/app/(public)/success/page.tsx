"use client";

import Link from "next/link";
import { FiCheckCircle, FiMessageCircle, FiVideo, FiTruck, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFD] pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100"
        >
          {/* Header Area */}
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10"
            >
              <FiCheckCircle className="text-emerald-500 w-12 h-12" />
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3 font-serif relative z-10">
              Booking Confirmed!
            </h1>
            <p className="text-emerald-50 font-medium relative z-10">
              Thank you for choosing Mere Pandit Ji. Your puja details have been securely recorded.
            </p>
          </div>

          {/* Next Steps Area */}
          <div className="p-8 md:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6 font-serif flex items-center gap-2">
              <span className="text-2xl">✨</span> What happens next?
            </h2>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              
              {/* Step 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-[#E8F5E9] text-emerald-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <FiMessageCircle size={20} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-1">WhatsApp Confirmation</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">Our team will reach out to you on your provided WhatsApp number to confirm your details.</p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-[#FFF3E0] text-orange-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="text-xl">🙏</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-1">Live Sankalp</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">Pandit ji will perform the Puja and take Sankalp using your name and gotra on the auspicious day.</p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-[#E3F2FD] text-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <FiVideo size={20} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-1">Puja Video</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">A personalized video recording of your Sankalp and Puja will be shared with you securely.</p>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-[#FCE4EC] text-pink-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <FiTruck size={20} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-1">Prasad Delivery</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">The energized Prasad will be carefully packed and shipped directly to your home address.</p>
                </div>
              </motion.div>

            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-100">
              <Link 
                href="/"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 px-6 rounded-xl transition-all text-center"
              >
                Return to Home
              </Link>
              <Link 
                href="/"
                className="flex-1 bg-[#F26622] hover:bg-[#D95B1E] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-orange-500/30 text-center flex items-center justify-center gap-2"
              >
                Explore More Pujas <FiArrowRight />
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
