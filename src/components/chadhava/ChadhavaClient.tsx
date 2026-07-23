"use client";

import { useEffect, useState } from "react";
import SafeImage from "@/components/ui/SafeImage";
import Link from "next/link";
import { FiCalendar, FiArrowRight } from "react-icons/fi";
import { GoHome } from "react-icons/go";

export interface IChadhava {
  _id: string;
  slug: string;
  imageSrc: string;
  badge?: string;
  badgeColor?: string;
  redSubtitle: string;
  title: string;
  description: string;
  location: string;
  date: string;
}

export default function ChadhavaClient() {
  const [ChadhavaClient, setChadhavaClient] = useState<IChadhava[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/chadhava")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setChadhavaClient(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
            Sacred Chadhava
          </h2>
          <p className="text-gray-700 text-[17px] max-w-5xl mb-8">
            Book Chadhava online with your name and gotra, receive the Chadhava video, and gain blessings from the Divine.
          </p>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ChadhavaClient.map((Chadhava) => (
              <div 
                key={Chadhava._id} 
                className="bg-white rounded-[20px] shadow-[0_4px_24px_rgb(0,0,0,0.06)] overflow-hidden flex flex-col transition-transform hover:-translate-y-1 duration-300 border border-gray-100"
              >
              
              {/* Image Section */}
              <Link href={`/chadhava/${Chadhava.slug}`} className="relative w-full h-[220px] block group overflow-hidden cursor-pointer">
                <SafeImage 
                  src={Chadhava.imageSrc} 
                  alt={Chadhava.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Bottom Center Overlapping Badge */}
                {Chadhava.badge && (
                  <div className="absolute -bottom-3.5 left-0 right-0 flex justify-center z-10">
                    <span className={`text-white text-[11px] font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-md ${Chadhava.badgeColor}`}>
                      <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                      </span>
                      {Chadhava.badge}
                    </span>
                  </div>
                )}
              </Link>

              {/* Content Section */}
              <div className="pt-10 px-6 pb-6 flex flex-col flex-grow">
                {/* Pink Subtitle */}
                <h4 className="text-[#D11A60] text-[11px] sm:text-[12px] font-bold tracking-[0.1em] uppercase mb-4 text-center">
                  {Chadhava.redSubtitle}
                </h4>
                
                {/* Title */}
                <Link href={`/chadhava/${Chadhava.slug}`}>
                  <h3 className="text-[19px] sm:text-[21px] leading-tight font-extrabold text-gray-900 mb-4 hover:text-[#D11A60] transition-colors cursor-pointer">
                    {Chadhava.title}
                  </h3>
                </Link>
                
                {/* Description */}
                <p className="text-gray-600 text-[15px] mb-6 leading-relaxed">
                  {Chadhava.description}
                </p>
                
                <div className="flex flex-col flex-grow">
                  {/* Location */}
                  <div className="flex items-start gap-3.5 pt-4 pb-3 text-gray-600 border-t border-gray-100">
                    <GoHome className="text-[20px] flex-shrink-0 text-[#E87A25] mt-0.5" />
                    <span className="text-[14px] font-medium leading-snug">{Chadhava.location}</span>
                  </div>
                  
                  {/* Date */}
                  <div className="flex items-start gap-3.5 pb-6 text-gray-600">
                    <FiCalendar className="text-[20px] flex-shrink-0 text-[#E87A25] mt-0.5" />
                    <span className="text-[14px] font-medium leading-snug">{Chadhava.date}</span>
                  </div>
                  
                  {/* Push button to bottom if description is short */}
                  <div className="mt-auto pt-2">
                    <Link href={`/chadhava/${Chadhava.slug}`} className="w-full bg-[#117B50] hover:bg-[#0D6240] text-white text-[13px] font-bold tracking-widest uppercase py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                      PARTICIPATE <FiArrowRight className="text-[16px]" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
        )}

      </div>
    </section>
  );
}
