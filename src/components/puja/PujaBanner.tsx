"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const banners = [
  "/pujapagebaner.jpeg",
  "/pujapagebaner2.jpeg",
  "/pujapagebaner3.jpeg",
  "/pujapagebaner4.jpeg",
];

export default function PujaBanner() {
  return (
    <section className="w-full bg-white pt-4 pb-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h1 className="text-2xl md:text-[28px] font-bold text-center text-gray-900 mb-6 md:mb-8 tracking-tight">
          Perform Puja as per Vedic rituals at Famous Hindu Temples in India
        </h1>
        
        <div className="w-full max-w-[1024px] mx-auto relative rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: "swiper-pagination-bullet-active !bg-white !w-2.5 !h-2.5",
              bulletClass: "swiper-pagination-bullet !bg-white/60 !opacity-100 !w-2 !h-2 !mx-1.5 transition-all",
            }}
            className="w-full aspect-[16/9] md:aspect-[3/1] lg:aspect-[3.5/1]"
          >
            {banners.map((src, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-full relative">
                  <Image
                    src={src}
                    alt={`Puja Banner ${index + 1}`}
                    fill
                    className="object-cover object-center"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
