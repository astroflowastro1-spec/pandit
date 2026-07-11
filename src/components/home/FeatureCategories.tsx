"use client";

import { motion } from "framer-motion";
import { FiSun, FiMap, FiCalendar, FiBookOpen, FiMusic, FiStar, FiHeart, FiGift } from "react-icons/fi";
import { IconType } from "react-icons";

const categories: { name: string; icon: IconType; desc: string; color: string }[] = [
  { name: "Online Puja", icon: FiSun, desc: "Perform authentic rituals online", color: "from-orange-400 to-brand-primary" },
  { name: "Temple Darshan", icon: FiMap, desc: "Visit sacred temples virtually", color: "from-brand-secondary to-yellow-500" },
  { name: "Daily Panchang", icon: FiCalendar, desc: "Auspicious timings & dates", color: "from-amber-400 to-brand-accent" },
  { name: "Bhajan & Aarti", icon: FiMusic, desc: "Listen to divine melodies", color: "from-red-400 to-orange-500" },
  { name: "Chalisa", icon: FiBookOpen, desc: "Read sacred texts & hymns", color: "from-rose-400 to-red-500" },
  { name: "Astrology", icon: FiStar, desc: "Get expert horoscope reading", color: "from-purple-400 to-brand-primary" },
  { name: "Donation", icon: FiHeart, desc: "Contribute to sacred causes", color: "from-pink-400 to-rose-500" },
  { name: "Festivals", icon: FiGift, desc: "Celebrate upcoming festivals", color: "from-green-400 to-emerald-500" },
];

export default function FeatureCategories() {
  return (
    <section className="py-24 bg-white relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4"
          >
            Explore Spiritual Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Discover our wide range of digital and physical spiritual offerings designed for your inner peace.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl blur-xl transition-opacity duration-500" />
              
              <div className="relative h-full p-6 md:p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-brand-primary/30 transition-all duration-300 transform group-hover:-translate-y-2 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${category.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon size={28} />
                </div>
                <h3 className="font-serif font-semibold text-xl text-gray-900 mb-2 group-hover:text-brand-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
