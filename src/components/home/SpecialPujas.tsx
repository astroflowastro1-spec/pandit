"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiCalendar, FiArrowRight } from "react-icons/fi";
import { GoHome } from "react-icons/go";

const pujas = [
  {
    id: 1,
    imageSrc: "/Gupt Navratri  Maa Jwala ji Pooja.jpeg",
    badge: "",
    badgeColor: "bg-[#F3912E]", // Orange badge
    redSubtitle: "GUPT NAVRATRI MAA JWALA JI POOJA",
    title: "Gupt Navratri Maa Jwala ji Pooja",
    slug: "gupt-navratri-maa-jwala-ji-pooja",
    description: "Seek blessings from Maa Jwala ji during Gupt Navratri for spiritual growth, prosperity, and fulfillment of desires.",
    location: "Jawala Ji Temple, Himachal Pradesh",
    date: "21 July 2026, Tuesday",
  },
  {
    id: 2,
    imageSrc: "/Gupt Navratri  Maa Chhinmastika Pooja.jpeg",
    badge: "",
    badgeColor: "bg-[#F3912E]", 
    redSubtitle: "GUPT NAVRATRI MAA CHHINMASTIKA POOJA",
    title: "Gupt Navratri Maa Chhinmastika Pooja",
    slug: "gupt-navratri-maa-chhinmastika-pooja",
    description: "Blessings from Maa Chhinmastika for Victory over Enemies, success in life, and removal of obstacles",
    location: "Jawala Ji Temple, Himachal Pradesh",
    date: "22 July 2026, Wednesday",
  },
  {
    id: 3,
    imageSrc: "/Gupt Navratri Maa Banglamukhi Laal Mirchi Havan.jpeg",
    badge: "",
    badgeColor: "bg-[#D97706]", // Darker yellow/orange
    redSubtitle: "GUPT NAVRATRI MAA BANGLAMUKHI LAAL MIRCHI HAVAN",
    title: "Gupt Navratri Maa Banglamukhi Laal Mirchi Havan",
    slug: "gupt-navratri-maa-banglamukhi-laal-mirchi-havan",
    description: "Blessings from Maa Banglamukhi for victory over enemies, success in legal matters, and removal of obstacles.",
    location: "Maa Banglamukhi Shidhpeedh Naalkheda",
    date: "23 July 2026, Thursday",
  }
];

export default function SpecialPujas() {
  return (
    <section className="w-full pt-16 pb-6 bg-white flex flex-col items-center">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#374151] mb-4">
            <span className="text-[#8B5CF6]">Mere Pandit Ji</span> Special Pujas
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg">
            Begin 2026 with faith - get special pujas performed in your name at India's powerful temples to achieve peace and protection for your family.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {pujas.map((puja) => (
            <motion.div 
              key={puja.id} 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="bg-white rounded-[20px] shadow-[0_4px_20px_rgb(0,0,0,0.08)] overflow-hidden flex flex-col transition-transform hover:-translate-y-1 duration-300"
            >
              
              {/* Image Section */}
              <Link href={`/puja/${puja.slug}`} className="relative w-full h-[220px] block group overflow-hidden cursor-pointer">
                <Image 
                  src={puja.imageSrc} 
                  alt={puja.title} 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Top Left Badge */}
                {puja.badge && (
                  <div className="absolute top-4 left-4">
                    <span className={`text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md ${puja.badgeColor}`}>
                      <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                      </span>
                      {puja.badge}
                    </span>
                  </div>
                )}
              </Link>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Pink Subtitle */}
                <h4 className="text-[#D11A60] text-[11px] sm:text-[12px] font-bold tracking-[0.1em] uppercase mb-4 text-center">
                  {puja.redSubtitle}
                </h4>
                
                {/* Title */}
                <Link href={`/puja/${puja.slug}`}>
                  <h3 className="text-[19px] sm:text-[21px] leading-tight font-extrabold text-gray-900 mb-4 hover:text-[#D11A60] transition-colors cursor-pointer">
                    {puja.title}
                  </h3>
                </Link>
                
                {/* Description */}
                <p className="text-gray-600 text-[15px] mb-6 leading-relaxed">
                  {puja.description}
                </p>
                
                <div className="flex flex-col flex-grow">
                  {/* Location */}
                  <div className="flex items-center gap-3.5 mb-3 text-gray-600">
                    <GoHome className="text-[22px] flex-shrink-0 text-[#E87A25]" />
                    <span className="text-[15px] font-medium">{puja.location}</span>
                  </div>
                  
                  {/* Date */}
                  <div className="flex items-center gap-3.5 mb-6 text-gray-600">
                    <FiCalendar className="text-[22px] flex-shrink-0 text-[#E87A25]" />
                    <span className="text-[15px] font-medium">{puja.date}</span>
                  </div>
                  
                  {/* Button */}
                  <Link href={`/puja/${puja.slug}`} className="mt-auto w-full bg-[#0E7A53] hover:bg-[#0B6343] text-white font-bold text-sm py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors uppercase tracking-wide">
                    Participate
                    <FiArrowRight className="text-lg" />
                  </Link>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <div className="flex justify-center">
          <Link href="/puja" className="text-[#F26622] font-bold text-lg flex items-center gap-2 hover:text-[#D95B1E] transition-colors">
            View All Pujas
            <FiArrowRight />
          </Link>
        </div>

      </div>
    </section>
  );
}
