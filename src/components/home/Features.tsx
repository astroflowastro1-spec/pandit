"use client";

import { motion } from "framer-motion";
import { FaBell, FaBook, FaMusic, FaStarOfDavid, FaOm } from "react-icons/fa6";

export default function Features() {
  const features = [
    {
      id: 1,
      icon: <FaBell className="text-[#FCD34D] text-2xl" />,
      bg: "bg-[#1E293B]",
      title: "Divine Temple",
      description: "Set up your temple on your phone, dedicated to your beloved deities and seek their blessings, anytime, anywhere.",
    },
    {
      id: 2,
      icon: <FaBook className="text-[#FDBA74] text-2xl" />,
      bg: "bg-[#78350F]",
      title: "Hindu Literature",
      description: "Get specially curated books, articles and videos based on Sanatan Dharma",
    },
    {
      id: 3,
      icon: <FaMusic className="text-white text-2xl" />,
      bg: "bg-[#0D9488]",
      title: "Devotional Music",
      description: "Get access to 5000+ Ad-Free Devotional Music. Listen to Aartis, Mantras, Bhajans, Chalisas and immerse yourself in the divine energy.",
    },
    {
      id: 4,
      icon: <FaStarOfDavid className="text-[#FEF08A] text-2xl" />,
      bg: "bg-[#EA580C]",
      title: "Panchang, Horoscope & Festivals",
      description: "Get regular updates on Daily Horoscope, Panchang, and upcoming Fasts- Festivals.",
    },
    {
      id: 5,
      icon: <span className="text-[#6B21A8] text-2xl font-bold font-sans leading-none mt-1">卐</span>,
      bg: "bg-[#F59E0B]",
      title: "Puja and Chadhava Seva",
      description: "Book personalized Puja and Chadhava Seva in your and your family,s name at 1000+ renowned temples across India.",
    },
    {
      id: 6,
      icon: <FaOm className="text-[#FEF08A] text-2xl" />,
      bg: "bg-[#EA580C]",
      title: "Sanatani Community",
      description: "Be a part of India's largest devotional community and connect with Sanatanis worldwide.",
    },
  ];

  return (
    <section className="w-full py-16 bg-white flex flex-col items-center">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
            One App for all your devotional needs
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-[17px]">
            Mere Pandit Ji brings these amazing features for you, get these features for free and start your devotional journey now.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12"
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.id} 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="flex flex-col"
            >
              {/* Icon Box */}
              <div className={`w-[52px] h-[52px] ${feature.bg} rounded-xl flex items-center justify-center mb-5 shadow-sm`}>
                {feature.icon}
              </div>
              
              {/* Text Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
