"use client";

import { motion } from "framer-motion";
import { FiMapPin, FiArrowRight } from "react-icons/fi";

const temples = [
  {
    name: "Kashi Vishwanath",
    location: "Varanasi, Uttar Pradesh",
    desc: "One of the twelve Jyotirlingas, the holiest of Shiva temples.",
    color: "from-blue-500/20 to-purple-500/20",
    bg: "bg-gradient-to-br from-indigo-900 to-purple-900"
  },
  {
    name: "Badrinath Temple",
    location: "Badrinath, Uttarakhand",
    desc: "A Hindu temple dedicated to Lord Vishnu situated in the town of Badrinath.",
    color: "from-orange-500/20 to-red-500/20",
    bg: "bg-gradient-to-br from-orange-900 to-red-900"
  },
  {
    name: "Tirupati Balaji",
    location: "Tirumala, Andhra Pradesh",
    desc: "A landmark Vaishnavite temple dedicated to Lord Venkateswara.",
    color: "from-amber-500/20 to-orange-500/20",
    bg: "bg-gradient-to-br from-amber-700 to-yellow-900"
  },
];

export default function PopularTemples() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6"
          >
            Divine Destinations
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg"
          >
            Explore the most sacred temples of Bharat and book exclusive Darshan and Pujas from your home.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {temples.map((temple, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className={`relative h-[400px] rounded-3xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-500 ${temple.bg} flex flex-col justify-end p-8`}>
                
                {/* Abstract Pattern overlay instead of image */}
                <div className={`absolute inset-0 bg-gradient-to-br ${temple.color} opacity-50 mix-blend-overlay group-hover:scale-110 transition-transform duration-700 ease-out`} />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 text-white/80 text-sm mb-3 font-medium">
                    <FiMapPin className="text-brand-accent" /> {temple.location}
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white mb-3">{temple.name}</h3>
                  <p className="text-white/70 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                    {temple.desc}
                  </p>
                  
                  <div className="flex items-center gap-2 text-brand-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    Explore Temple <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-4 border-2 border-brand-primary text-brand-primary rounded-full font-medium hover:bg-brand-primary hover:text-white transition-colors">
            View All Temples
          </button>
        </div>
      </div>
    </section>
  );
}
