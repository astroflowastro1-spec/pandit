"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    name: "Achutam Nair",
    location: "Bangalore",
    videoId: "MxQ_GS7Ej6c",
    avatar: "/desktopbanner.jpeg",
  },
  {
    id: 2,
    name: "Abhishek Singh",
    location: "Bangalore",
    videoId: "CMFB1JbdiOs",
    avatar: "/desktopbanner2.jpeg",
  },
  {
    id: 3,
    name: "Amrita Singh",
    location: "Mumbai",
    videoId: "x4e5XxKxvfs",
    avatar: "/desktopbanner3.jpeg",
  },
  {
    id: 4,
    name: "Arvind Tode",
    location: "Mumbai",
    videoId: "eZG6lv7TUd8",
    avatar: "/desktopbanner.jpeg",
  },
  {
    id: 5,
    name: "Sneha Sharma",
    location: "Delhi",
    videoId: "wO_g6zGZ7GU",
    avatar: "/desktopbanner2.jpeg",
  }
];

export default function ReviewsSlider() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  
  const [isInit, setIsInit] = useState(false);

  return (
    <section className="w-full pt-8 pb-16 bg-[#F9FAFB] flex flex-col items-center">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
            Previous Pujas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Read to what our beloved devotees have to say about Mere Pandit Ji.
          </p>
        </motion.div>

        {/* Slider Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{
              el: paginationRef.current,
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-gray-300 !opacity-100 !w-2.5 !h-2.5 !mx-1.5 transition-all',
              bulletActiveClass: '!bg-[#F26622] !scale-125'
            }}
            onInit={(swiper) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              swiper.params.pagination.el = paginationRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
              swiper.pagination.init();
              swiper.pagination.update();
              setIsInit(true);
            }}
            className="!pb-6"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto pb-4">
                <div className="flex flex-col gap-4">
                  
                  {/* Video Card */}
                  <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-gray-100 shadow-md">
                    <iframe
                      className="w-full h-full absolute inset-0"
                      src={`https://www.youtube.com/embed/${review.videoId}?rel=0`}
                      title={`Video Testimonial by ${review.name}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-3 px-1 mt-2">
                    <div className="w-11 h-11 rounded-full overflow-hidden relative flex-shrink-0 shadow-sm border border-gray-200">
                      <Image 
                        src={review.avatar} 
                        alt={review.name} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-[15px] leading-tight">
                        {review.name}
                      </h4>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {review.location}
                      </p>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation & Pagination */}
          <div className={`flex items-center justify-center gap-4 mt-8 ${!isInit ? 'invisible' : 'visible'}`}>
            <button 
              ref={prevRef}
              className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white hover:bg-[#F26622] transition-colors disabled:opacity-50 disabled:hover:bg-gray-300 cursor-pointer z-10"
            >
              <FiChevronLeft size={20} />
            </button>
            
            <div ref={paginationRef} className="flex items-center justify-center !w-auto"></div>
            
            <button 
              ref={nextRef}
              className="w-8 h-8 rounded-full bg-[#F26622] flex items-center justify-center text-white hover:bg-[#D95B1E] transition-colors disabled:opacity-50 disabled:bg-gray-300 disabled:hover:bg-gray-300 cursor-pointer z-10"
            >
              <FiChevronRight size={20} />
            </button>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
