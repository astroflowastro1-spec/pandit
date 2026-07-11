"use client";

import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";

export default function Newsletter() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative rounded-[3rem] bg-gradient-to-br from-brand-subtle to-orange-50 border border-brand-primary/10 p-10 md:p-20 text-center overflow-hidden">
          
          {/* Abstract SVG Background Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-[50px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-accent/10 rounded-full blur-[60px] translate-x-1/3 translate-y-1/3" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6"
            >
              Get Daily Spiritual Wisdom
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 text-lg mb-10"
            >
              Subscribe to our newsletter and receive daily panchang, astrological updates, and spiritual stories directly in your inbox.
            </motion.p>
            
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-white border border-gray-200 rounded-full px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary shadow-sm"
                required
              />
              <button 
                type="submit" 
                className="bg-brand-primary hover:bg-brand-dark text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2"
              >
                Subscribe <FiSend />
              </button>
            </motion.form>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xs text-gray-400 mt-6"
            >
              We respect your privacy. No spam, ever.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
