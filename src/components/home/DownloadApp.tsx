"use client";

import { motion } from "framer-motion";
import { FiSmartphone, FiDownloadCloud } from "react-icons/fi";
import { FaGooglePlay, FaApple } from "react-icons/fa";

export default function DownloadApp() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-brand-dark rounded-[3rem] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between shadow-2xl">
          
          {/* Background Decorative Patterns */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-[#5a2a0a]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-brand-primary/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
          
          <div className="relative z-10 p-10 md:p-16 lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-accent font-medium tracking-wider uppercase mb-4 text-sm flex items-center gap-2"
            >
              <FiSmartphone size={18} /> Available on iOS & Android
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight"
            >
              Carry Your <span className="text-brand-accent">Spiritual World</span> With You
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-lg mb-10 leading-relaxed"
            >
              Download the SriDevotion app to book pujas, track your astrological panchang daily, 
              listen to soothing bhajans, and connect with divine energy anytime, anywhere.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-xl font-medium shadow-xl hover:scale-105 transition-transform">
                <FaApple size={24} />
                <div className="text-left">
                  <div className="text-[10px] uppercase text-gray-500 font-bold leading-none mb-1">Download on the</div>
                  <div className="text-lg leading-none font-bold">App Store</div>
                </div>
              </button>
              <button className="flex items-center justify-center gap-3 bg-gray-900 text-white border border-gray-700 px-8 py-4 rounded-xl font-medium shadow-xl hover:scale-105 transition-transform">
                <FaGooglePlay size={24} className="text-brand-accent" />
                <div className="text-left">
                  <div className="text-[10px] uppercase text-gray-400 font-bold leading-none mb-1">Get it on</div>
                  <div className="text-lg leading-none font-bold">Google Play</div>
                </div>
              </button>
            </motion.div>
          </div>
          
          <div className="relative z-10 lg:w-1/2 flex justify-center lg:justify-end p-10 lg:p-0">
            {/* Phone Mockup Abstract Replacement */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative w-[300px] h-[600px] bg-white rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden lg:mr-20 lg:translate-y-16"
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl z-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-subtle to-orange-50 z-0" />
              
              <div className="relative z-10 p-6 pt-16 flex flex-col gap-4">
                <div className="w-full h-40 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary shadow-md flex items-center justify-center text-white">
                  <FiDownloadCloud size={40} className="opacity-50" />
                </div>
                <div className="w-3/4 h-6 bg-gray-200 rounded-md" />
                <div className="w-1/2 h-4 bg-gray-100 rounded-md mb-4" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-gray-100 rounded-xl" />
                  <div className="aspect-square bg-gray-100 rounded-xl" />
                  <div className="aspect-square bg-gray-100 rounded-xl" />
                  <div className="aspect-square bg-gray-100 rounded-xl" />
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
