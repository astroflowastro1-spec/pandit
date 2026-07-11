"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FiStar } from "react-icons/fi";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Aarti Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    text: "The online Rudrabhishek puja was conducted with such devotion and authenticity. I felt completely connected despite being miles away. Highly recommended for NRIs and busy professionals.",
    initials: "AS"
  },
  {
    name: "Vikram Singh",
    location: "Delhi",
    rating: 5,
    text: "Excellent service! The pandit ji was highly knowledgeable and explained the significance of every mantra. The platform is very easy to use and completely transparent.",
    initials: "VS"
  },
  {
    name: "Priya Patel",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    text: "I booked a Navchandi Yagya for my new business. The arrangement, the live stream quality, and the overall spiritual vibe were unmatched. Will definitely use again.",
    initials: "PP"
  },
  {
    name: "Rahul Verma",
    location: "Bangalore, Karnataka",
    rating: 5,
    text: "Beautiful experience! The daily panchang and astrology services are very accurate. The UI is so premium and calming to look at every morning.",
    initials: "RV"
  }
];

export default function Reviews() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-primary font-medium tracking-wider uppercase mb-2 text-sm flex items-center justify-center gap-2"
          >
            <span className="w-8 h-px bg-brand-primary" /> Testimonials <span className="w-8 h-px bg-brand-primary" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6"
          >
            Words from Devotees
          </motion.h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="!pb-16"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="h-full bg-bg-base/50 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="flex text-brand-accent mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <FiStar key={i} fill="currentColor" size={20} />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed italic mb-8 flex-1 text-lg">
                  "{review.text}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white font-serif font-bold text-lg shadow-md">
                    {review.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
