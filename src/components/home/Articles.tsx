"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiTag } from "react-icons/fi";

const articles = [
  {
    title: "Significance of Navratri: 9 Days of Divine Energy",
    date: "12 Sep 2026",
    category: "Festivals",
    desc: "Discover the deep spiritual meaning behind the 9 days of Navratri and how to invoke the Goddess.",
    gradient: "from-pink-500/20 to-red-500/20",
    bg: "bg-gradient-to-br from-pink-900 to-red-900"
  },
  {
    title: "How to Create a Sacred Space in Your Modern Home",
    date: "05 Sep 2026",
    category: "Spiritual Living",
    desc: "A comprehensive guide on Vastu principles and aesthetic choices for your home mandir.",
    gradient: "from-amber-500/20 to-orange-500/20",
    bg: "bg-gradient-to-br from-amber-700 to-orange-900"
  },
  {
    title: "Understanding Astrology: Planets and Your Destiny",
    date: "28 Aug 2026",
    category: "Astrology",
    desc: "Learn how the alignment of planets at your birth influences your spiritual and material journey.",
    gradient: "from-indigo-500/20 to-purple-500/20",
    bg: "bg-gradient-to-br from-indigo-900 to-purple-900"
  }
];

export default function Articles() {
  return (
    <section className="py-24 bg-bg-base relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-primary font-medium tracking-wider uppercase mb-2 text-sm flex items-center gap-2"
            >
              <span className="w-8 h-px bg-brand-primary" /> Wisdom & Stories
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold text-gray-900"
            >
              Spiritual Journal
            </motion.h2>
          </div>
          
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-brand-primary font-medium hover:text-brand-dark transition-colors flex items-center gap-2"
          >
            Read All Articles <FiArrowRight />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-brand-primary/20 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Abstract Image Replacement */}
              <div className={`h-56 relative ${article.bg} overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient} mix-blend-overlay group-hover:scale-110 transition-transform duration-700`} />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4">
                  <span className="flex items-center gap-1.5 text-brand-primary bg-brand-subtle px-3 py-1 rounded-full">
                    <FiTag /> {article.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiCalendar /> {article.date}
                  </span>
                </div>
                
                <h3 className="font-serif font-bold text-2xl text-gray-900 mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-6 line-clamp-2 flex-1">
                  {article.desc}
                </p>
                
                <div className="flex items-center gap-2 text-brand-primary font-medium mt-auto">
                  Read More <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
