"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FiMapPin, FiCalendar, FiClock, FiCheckCircle } from "react-icons/fi";
import { useCountry } from "@/context/CountryContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const pujas = [
  {
    title: "Maha Rudrabhishek Puja",
    temple: "Kashi Vishwanath, Varanasi",
    date: "15 Aug 2026",
    priceInr: "2,100",
    priceUsd: "51",
    benefits: ["Health & Wealth", "Removes Obstacles", "Inner Peace"],
    gradient: "from-orange-500 to-brand-primary",
  },
  {
    title: "Navchandi Yagya",
    temple: "Kamakhya Devi, Guwahati",
    date: "22 Aug 2026",
    priceInr: "5,100",
    priceUsd: "101",
    benefits: ["Protection", "Prosperity", "Success"],
    gradient: "from-brand-secondary to-red-500",
  },
  {
    title: "Satyanarayan Katha",
    temple: "Tirupati Balaji",
    date: "30 Aug 2026",
    priceInr: "1,100",
    priceUsd: "31",
    benefits: ["Family Harmony", "Business Growth"],
    gradient: "from-amber-500 to-yellow-600",
  },
];

export default function FeaturedPuja() {
  const { country, currencySymbol } = useCountry();
  return (
    <section className="py-24 bg-bg-base relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMiIgZmlsbD0iI0U2N0UyMiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-50" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-primary font-medium tracking-wider uppercase mb-2 text-sm flex items-center gap-2"
            >
              <span className="w-8 h-px bg-brand-primary" /> Exclusive Pujas
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold text-gray-900"
            >
              Featured Spiritual Ceremonies
            </motion.h2>
          </div>
          
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-brand-primary font-medium hover:text-brand-dark transition-colors flex items-center gap-2"
          >
            View All Pujas <FiCheckCircle />
          </motion.button>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.5 },
            1280: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          className="!pb-16"
        >
          {pujas.map((puja, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="h-full bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col">
                
                {/* Visual Header */}
                <div className={`h-48 relative bg-gradient-to-br ${puja.gradient} p-6 flex flex-col justify-between text-white overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  
                  {/* Decorative Mandala SVG */}
                  <svg className="absolute -right-16 -top-16 w-64 h-64 text-white/20 animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0L55 40L95 20L65 50L95 80L55 60L50 100L45 60L5 80L35 50L5 20L45 40Z" />
                  </svg>

                  <div className="relative z-10 flex justify-between items-start">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/30">
                      Limited Seats
                    </span>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="font-serif font-bold text-2xl mb-1">{puja.title}</h3>
                    <p className="flex items-center gap-1.5 text-white/90 text-sm">
                      <FiMapPin /> {puja.temple}
                    </p>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-center pb-6 border-b border-gray-100 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-10 h-10 rounded-full bg-brand-subtle flex items-center justify-center text-brand-primary">
                        <FiCalendar size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Date</p>
                        <p className="font-semibold text-gray-900">{puja.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 font-medium">Starting from</p>
                      <p className="font-serif font-bold text-xl text-brand-primary">
                        {currencySymbol}{country === "india" ? puja.priceInr : (country === "other" ? puja.priceUsd : puja.priceInr)}
                      </p>
                    </div>
                  </div>

                  <div className="mb-8 flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Key Benefits</p>
                    <ul className="space-y-2">
                      {puja.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                          <FiCheckCircle className="text-brand-secondary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Timer & CTA */}
                  <div className="bg-bg-subtle rounded-2xl p-4 mb-4 flex items-center justify-between text-brand-dark">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <FiClock className="animate-pulse" /> Bookings close in
                    </div>
                    <div className="font-mono font-bold tracking-tight">02d : 14h : 30m</div>
                  </div>

                  <button className="w-full py-4 bg-gray-900 text-white rounded-xl font-medium shadow-md hover:bg-brand-primary transition-colors hover:shadow-brand-primary/30 hover:shadow-lg active:scale-95">
                    Book Now
                  </button>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
