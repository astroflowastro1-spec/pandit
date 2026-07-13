"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const videoReviews = [
  {
    videoId: "MxQ_GS7Ej6c",
    name: "Achutam Nair",
    location: "Bangalore",
    initials: "AN"
  },
  {
    videoId: "CMFB1JbdiOs",
    name: "Abhishek Singh",
    location: "Bangalore",
    initials: "AS"
  },
  {
    videoId: "x4e5XxKxvfs",
    name: "Amrita Singh",
    location: "Mumbai",
    initials: "AS"
  },
  {
    videoId: "eZG6lv7TUd8",
    name: "Arvind Tode",
    location: "Mumbai",
    initials: "AT"
  },
  {
    videoId: "wO_g6zGZ7GU",
    name: "Devotee",
    location: "India",
    initials: "D"
  }
];

export default function Reviews() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F26622]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />

      <style>{`
        .reviews-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #D1D5DB;
          opacity: 1;
          margin: 0 6px !important;
        }
        .reviews-swiper .swiper-pagination-bullet-active {
          background: #F26622;
        }
        .reviews-swiper .swiper-button-next,
        .reviews-swiper .swiper-button-prev {
          color: #F26622;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        .reviews-swiper .swiper-button-next:after,
        .reviews-swiper .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }
      `}</style>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 font-serif"
          >
            Previous Pooja
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-500 text-lg"
          >
            Read to what our beloved devotees have to say about Mere Pandit Ji.
          </motion.p>
        </div>

        <div className="relative max-w-[1400px] mx-auto">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={true}
            className="reviews-swiper !pb-16 !px-4"
          >
            {videoReviews.map((review, index) => (
              <SwiperSlide key={index} className="h-auto group">
                <div className="rounded-2xl overflow-hidden shadow-md aspect-video bg-gray-100 relative transition-transform duration-300 group-hover:-translate-y-1">
                  <iframe
                    className="w-full h-full absolute inset-0"
                    src={`https://www.youtube.com/embed/${review.videoId}?rel=0`}
                    title={`Video Testimonial by ${review.name}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
