"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaPlay } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    name: "Achutam Nair",
    location: "Bangalore",
    quote: "",
    thumbnail: "/desktopbanner.jpeg", 
    avatar: "/desktopbanner.jpeg",
    isVideoLayout: true,
  },
  {
    id: 2,
    name: "Abhishek Singh",
    location: "Bangalore",
    quote: '"Mere Pandit Ji App got me involved without any kind of burden"',
    thumbnail: "/desktopbanner2.jpeg",
    avatar: "/desktopbanner2.jpeg",
  },
  {
    id: 3,
    name: "Amrita Singh",
    location: "Mumbai",
    quote: '"Ab yeh mera mandir hai, ab mai yaha roz puja karungi"',
    thumbnail: "/desktopbanner3.jpeg",
    avatar: "/desktopbanner3.jpeg",
  },
  {
    id: 4,
    name: "Arvind Tode",
    location: "Mumbai",
    quote: '"I found it very user-friendly"',
    thumbnail: "/desktopbanner.jpeg",
    avatar: "/desktopbanner.jpeg",
  },
  {
    id: 5,
    name: "Sneha Sharma",
    location: "Delhi",
    quote: '"A wonderful experience that brought peace to my home."',
    thumbnail: "/desktopbanner2.jpeg",
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
            Reviews & Ratings
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
              // Re-assign navigation/pagination refs after init
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
                  
                  {/* Thumbnail Card */}
                  {review.isVideoLayout ? (
                    <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-black shadow-md border-4 border-black">
                      <Image 
                        src={review.thumbnail} 
                        alt="Video Thumbnail" 
                        fill
                        className="object-cover opacity-80"
                      />
                      {/* Fake Video UI Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-end p-3">
                         <div className="w-full h-1 bg-white/30 rounded-full mb-2">
                            <div className="w-1/3 h-full bg-[#F26622] rounded-full relative">
                               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
                            </div>
                         </div>
                         <div className="flex justify-between items-center text-white text-[10px] font-medium">
                            <div className="flex items-center gap-2">
                               <FaPlay className="text-white text-xs" />
                               <span>0:00 / 1:00</span>
                            </div>
                            <span>🔈 ⛶</span>
                         </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <button className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center hover:bg-[#F26622]/80 transition-colors">
                            <FaPlay className="text-white ml-1" />
                         </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden flex shadow-md group cursor-pointer">
                      <div className="w-[45%] h-full relative">
                        <Image 
                          src={review.thumbnail} 
                          alt={review.name} 
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="w-[55%] h-full bg-[#F26622] p-4 flex flex-col justify-center items-center text-center relative transition-colors group-hover:bg-[#E0571B]">
                        <p className="text-white font-medium text-[13px] leading-snug mb-3 italic">
                          {review.quote}
                        </p>
                        <div className="bg-white text-[#F26622] text-[10px] font-bold px-3 py-1 rounded-sm shadow-sm">
                          {review.name}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                          <FaPlay className="text-white text-3xl drop-shadow-lg" />
                        </div>
                      </div>
                      {/* Permanent subtle play button icon like in screenshot */}
                      <FaPlay className="absolute top-1/2 left-[72%] -translate-x-1/2 -translate-y-1/2 text-white text-2xl opacity-90 drop-shadow-md z-10 pointer-events-none group-hover:opacity-0 transition-opacity" />
                    </div>
                  )}

                  {/* User Info */}
                  <div className="flex items-center gap-3 px-1">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0 shadow-sm border border-gray-200">
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
