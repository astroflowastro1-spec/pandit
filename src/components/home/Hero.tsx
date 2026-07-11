"use client";

import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import clsx from "clsx";

const slides = [
  {
    id: 1,
    imageSrc: "/desktopbanner.jpeg",
    title1: "Mere Pandit Ji Special ",
    title2: "Puja",
    title2Color: "text-[#FFB800]",
    description: "Invoke peace, prosperity, and happiness for your family through online pujas at India's sacred temples — from the comfort of your home.",
    buttonText: "Book Puja",
  },
  {
    id: 2,
    imageSrc: "/desktopbanner2.jpeg",
    title1: "Mere Pandit Ji Special ",
    title2: "Chadhava",
    title2Color: "text-[#FFB800]",
    description: "Now offer your prayers and sacred offerings to your beloved deities at renowned temples across India — from your home. Seek divine blessings on Mere Pandit Ji.",
    buttonText: "Book Chadhava",
  },
  {
    id: 3,
    imageSrc: "/desktopbanner3.jpeg",
    title1: "Mere Pandit Ji Special ",
    title2: "Astrology",
    title2Color: "text-[#FFB800]",
    description: "Consult with India's top astrologers online. Get accurate predictions and remedies for your life problems from the comfort of your home.",
    buttonText: "Consult Now",
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] mt-[72px] overflow-hidden group">
      
      {/* Slides Container */}
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative w-full h-full flex-shrink-0">
            {/* Background Image */}
            <Image 
              src={slide.imageSrc} 
              alt={`Banner ${index + 1}`} 
              fill
              className="object-cover object-center"
              priority={index === 0}
            />
            
            {/* Dark Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-center z-20 pointer-events-none">
              <div className="container mx-auto px-12 md:px-24 pointer-events-auto">
                <div className="max-w-[600px] py-12 md:py-0 text-center md:text-left">
                  <h1 className="text-4xl md:text-[52px] font-bold mb-4 leading-tight drop-shadow-lg">
                    <span className="text-white">{slide.title1}</span>
                    <span className={slide.title2Color}>{slide.title2}</span>
                  </h1>
                  <p className="text-white font-medium text-base md:text-lg leading-relaxed mb-8 max-w-[500px] drop-shadow-md">
                    {slide.description}
                  </p>
                  <button className="bg-white text-black font-bold text-sm px-8 py-3 rounded-md hover:bg-gray-100 transition-colors w-[180px] shadow-xl">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white/90 hover:bg-black/60 hover:text-white transition-colors z-20 opacity-0 group-hover:opacity-100"
      >
        <FiChevronLeft size={24} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white/90 hover:bg-black/60 hover:text-white transition-colors z-20 opacity-0 group-hover:opacity-100"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={clsx(
              "transition-all duration-300 rounded-full",
              currentSlide === index 
                ? "w-8 h-2 bg-white shadow-md" 
                : "w-2 h-2 bg-white/50 hover:bg-white/80 shadow-sm"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
