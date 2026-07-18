"use client";

import { useState, useEffect, useRef } from "react";
import SafeImage from "@/components/ui/SafeImage";
import HowItWorks from "@/components/ui/HowItWorks";
import Link from "next/link";
import { FiCalendar, FiMapPin, FiCheck, FiChevronRight, FiChevronLeft, FiShield, FiVideo, FiGift, FiClock, FiChevronDown, FiChevronUp, FiStar } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { useCountry } from "@/context/CountryContext";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface PackageType {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  tag?: string;
  tagColor?: string;
  priceConverted?: number;
  originalPriceConverted?: number;
  imageSrc?: string;
}

interface ChadhavaDetailsClientProps {
  Chadhava: {
    _id: string;
    title: string;
    slug: string;
    redSubtitle: string;
    description: string;
    location: string;
    date: string;
    imageSrc: string;
    sliderImage1Src?: string;
    sliderImage2Src?: string;
    subtitle?: string;
    whyThisChadhava?: string;
    aboutTemple?: string;
    templeImageSrc?: string;
    benefits?: string[];
    inclusions?: string[];
    packages?: {
      india: PackageType[];
      nri: PackageType[];
    } | null;
    badge?: string;
    badgeColor?: string;
  };
}

const fallbackIndia = [
  {
    id: "individual",
    title: "Individual Chadhava",
    price: 851,
    originalPrice: 1500,
    description: "Chadhava will be performed with your Name and Gotra. Video recording of Sankalp & Havan will be shared.",
    features: [
      "Sankalp with 1 Name & Gotra",
      "Chadhava Video Clip via WhatsApp",
      "Dry Fruits Prasad (100g) + Deity Photo"
    ],
    tag: "Popular",
    tagColor: "bg-blue-600"
  },
  {
    id: "family",
    title: "Family Chadhava (Up to 4 Members)",
    price: 1501,
    originalPrice: 2500,
    description: "Chadhava performed for the entire family. Detailed Sankalp with all names. Premium Aashirwad Box sent to your home.",
    features: [
      "Sankalp with up to 4 Names & Gotras",
      "Full Chadhava Video Clip via WhatsApp",
      "Aashirwad Box (Prasad, Kalava, Sindoor, Deity Photo)"
    ],
    tag: "Best Value",
    tagColor: "bg-[#FF7F3F]"
  },
  {
    id: "havan",
    title: "Special Maha Havan (Joint)",
    price: 2501,
    originalPrice: 4500,
    description: "Special Havan performed for health, wealth & protection from evil eye. Ultimate Aashirwad Box + energized Yantra.",
    features: [
      "Maha Sankalp with Family Names & Gotras",
      "Detailed Video & Live Sankalp Photo",
      "Maha Prasad Box (Prasad, Energized Yantra, Kalava, Janeu, Diya)"
    ],
    tag: "Recommended",
    tagColor: "bg-emerald-600"
  }
];

const fallbackNri = [
  {
    id: "individual",
    title: "Individual Chadhava",
    price: 501,
    description: "Chadhava will be performed with your Name and Gotra. Video recording of Sankalp & Havan will be shared.",
    features: [
      "Sankalp with 1 Name & Gotra",
      "Chadhava Video Clip via WhatsApp",
      "Dry Fruits Prasad (100g) + Deity Photo"
    ],
    tag: "Popular",
    tagColor: "bg-blue-600"
  },
  {
    id: "family",
    title: "Family Chadhava (Up to 4 Members)",
    price: 1100,
    description: "Chadhava performed for the entire family. Detailed Sankalp with all names. Premium Aashirwad Box sent to your home.",
    features: [
      "Sankalp with up to 4 Names & Gotras",
      "Full Chadhava Video Clip via WhatsApp",
      "Aashirwad Box (Prasad, Kalava, Sindoor, Deity Photo)"
    ],
    tag: "Best Value",
    tagColor: "bg-[#FF7F3F]"
  },
  {
    id: "havan",
    title: "Special Maha Havan (Joint)",
    price: 2100,
    description: "Special Havan performed for health, wealth & protection from evil eye. Ultimate Aashirwad Box + energized Yantra.",
    features: [
      "Maha Sankalp with Family Names & Gotras",
      "Detailed Video & Live Sankalp Photo",
      "Maha Prasad Box (Prasad, Energized Yantra, Kalava, Janeu, Diya)"
    ],
    tag: "Recommended",
    tagColor: "bg-emerald-600"
  }
];

export default function ChadhavaDetailsClient({ Chadhava }: ChadhavaDetailsClientProps) {
  const router = useRouter();
  const { countryData, convertFromINR, formatPrice, country, currencySymbol } = useCountry();
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [activePricingTab, setActivePricingTab] = useState<"india" | "nri">("india");
  const [isPackagePopupOpen, setIsPackagePopupOpen] = useState(false);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<PackageType | null>(null);
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const [whatsappName, setWhatsappName] = useState("");
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [whatsappGotra, setWhatsappGotra] = useState("");
  const [member2Name, setMember2Name] = useState("");
  const [member3Name, setMember3Name] = useState("");
  const [member4Name, setMember4Name] = useState("");
  const [detailsError, setDetailsError] = useState("");

  useEffect(() => {
    if (!isDetailsPopupOpen) {
      setMember2Name("");
      setMember3Name("");
      setMember4Name("");
    }
  }, [isDetailsPopupOpen]);

  useEffect(() => {
    if (country) {
      setActivePricingTab(country === "india" ? "india" : "nri");
    }
  }, [country]);
  const [activeTab, setActiveTab] = useState("about");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const packagesRef = useRef<HTMLDivElement>(null);

  // Scrollspy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      const sections = ["about", "benefits", "process", "temple", "packages", "reviews", "faqs"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // account for header + sticky tab bar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Countdown timer logic
  useEffect(() => {
    /**
     * Parse all dates from a string like "14th July / 12th August 2026"
     * and return the FIRST one that is still in the future.
     * Falls back to the last date if all are past.
     */
    const parseNextUpcomingDate = (dateStr: string): Date | null => {
      try {
        // Extract year from anywhere in the full string
        const yearMatch = dateStr.match(/\b(20\d{2})\b/);
        const year = yearMatch ? yearMatch[1] : new Date().getFullYear().toString();

        // Split on "/" to get each date segment
        const segments = dateStr.split('/').map(s => s.trim());

        const now = new Date().getTime();
        let lastValidDate: Date | null = null;

        for (const segment of segments) {
          // Strip ordinal suffixes: 14th → 14, 2nd → 2, etc.
          let clean = segment.replace(/(\d+)(st|nd|rd|th)/gi, '$1');

          // Append year if not already in this segment
          if (!clean.match(/\b20\d{2}\b/)) {
            clean = `${clean} ${year}`;
          }

          const parsed = new Date(clean);
          if (isNaN(parsed.getTime())) continue;

          lastValidDate = parsed;

          // Return the first date that is still in the future
          if (parsed.getTime() > now) {
            return parsed;
          }
        }

        // All dates are past — return last one (timer will show 0)
        return lastValidDate;
      } catch {
        return null;
      }
    };

    const calculateTimeLeft = () => {
      try {
        const targetDate = parseNextUpcomingDate(Chadhava.date);
        if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        const now = new Date().getTime();
        const difference = targetDate.getTime() - now;

        if (difference <= 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } catch (e) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [Chadhava.date]);

  const scrollToPackages = () => {
    packagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // India → use india packages (INR, no conversion)
  // Abroad → use nri packages (also stored in INR), convert to local currency
  const getPackagesList = (): PackageType[] => {
    const isIndia = countryData.code === 'IN';
    const sourcePackages: any[] = Chadhava.packages
      ? (isIndia ? Chadhava.packages.india : Chadhava.packages.nri)
      : (isIndia ? fallbackIndia : fallbackNri);

    return sourcePackages.map((pkg: any) => ({
      ...pkg,
      // convertFromINR handles INR→INR (no-op) and INR→foreign currency
      priceConverted: convertFromINR(pkg.price),
      originalPriceConverted: pkg.originalPrice ? convertFromINR(pkg.originalPrice) : undefined,
    }));
  };

  const currentPackages = getPackagesList();

  const selectedPackagesInCart = currentPackages.filter(pkg => cartItems[pkg.id] > 0);
  const isCouple = selectedPackagesInCart.some(pkg => pkg.id === 'couple' || pkg.title?.toLowerCase().includes('couple'));
  const isFamily = selectedPackagesInCart.some(pkg => pkg.id === 'family' || pkg.id === 'havan' || pkg.title?.toLowerCase().includes('family') || pkg.title?.toLowerCase().includes('havan'));

  const totalItems = Object.values(cartItems).reduce((a, b) => a + b, 0);
  const totalPrice = currentPackages.reduce((acc, pkg) => acc + (pkg.priceConverted || pkg.price) * (cartItems[pkg.id] || 0), 0);

  const handleUpdateQuantity = (pkgId: string, delta: number) => {
    setCartItems(prev => {
      const current = prev[pkgId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [pkgId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [pkgId]: next };
    });
  };

  // Dynamic benefits list
  const benefitsList = Chadhava.benefits && Chadhava.benefits.length > 0 ? Chadhava.benefits : [
    "Destruction of negative influences and enemy effects",
    "Spiritual strength and inner awakening",
    "Fulfilment of sincere desires and prayers",
    "Protection, courage and renewed confidence",
    "Blessings believed to reach even from a distance, in one's name"
  ];

  const sliderImages = [Chadhava.imageSrc, Chadhava.sliderImage1Src, Chadhava.sliderImage2Src].filter(Boolean) as string[];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  // Auto-slide effect
  useEffect(() => {
    if (sliderImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000); // Change image every 4 seconds
    
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <div className="bg-white min-h-screen font-sans pt-[72px]">
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
        
        {/* Top Grid: Image Card (Left) & Info Block (Right) - Exactly matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 pt-6">
          
          {/* Left Column - Deity Image Card */}
          <div className="lg:col-span-7 lg:mt-7">
            <div className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.05)] border border-gray-100 p-0">
              
              {/* Image Section */}
              <div className="relative w-full aspect-[4/3] sm:aspect-video md:aspect-auto md:h-[480px] overflow-hidden group">
                <SafeImage 
                  src={sliderImages[currentSlide]} 
                  alt={Chadhava.title} 
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-left md:object-center transition-opacity duration-500"
                  priority
                />
                
                {sliderImages.length > 1 && (
                  <>
                    {/* Prev Slide Arrow Button */}
                    <button 
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg text-gray-800 hover:bg-white hover:scale-105 transition-all z-10 opacity-0 group-hover:opacity-100"
                    >
                      <FiChevronLeft size={22} />
                    </button>
                    {/* Next Slide Arrow Button */}
                    <button 
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg text-gray-800 hover:bg-white hover:scale-105 transition-all z-10 opacity-0 group-hover:opacity-100"
                    >
                      <FiChevronRight size={22} />
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {sliderImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? "bg-white w-4" : "bg-white/50"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>

          {/* Right Column - Booking Info */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <div>
              {/* Pink Header Badge */}
              <span className="text-[#D11A60] text-xs font-black tracking-widest uppercase block mb-3 leading-snug">
                {Chadhava.redSubtitle}
              </span>
              
              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950 leading-snug tracking-tight mb-2">
                {Chadhava.title}
              </h1>
              
              {/* Subtitle */}
              <p className="text-gray-500 text-sm md:text-base font-semibold leading-relaxed mb-6">
                {Chadhava.subtitle || "for Supreme Protection, Severe Enemy Defeat and Karmic Darkness Removal"}
              </p>
            </div>

            {/* Location & Date */}
            <div className="space-y-3.5 border-b border-gray-100 pb-6 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <GoHome className="text-lg text-[#E87A25] flex-shrink-0 mt-0.5" />
                <span className="font-semibold text-gray-800 leading-snug">{Chadhava.location}</span>
              </div>
              
              <div className="flex items-start gap-3">
                <FiCalendar className="text-lg text-[#E87A25] flex-shrink-0 mt-0.5" />
                <span className="font-semibold text-gray-800 leading-snug">{Chadhava.date}</span>
              </div>
            </div>

            {/* Timer Block - No outer border card, matched styling */}
            <div className="space-y-2.5">
              <p className="text-gray-700 text-sm font-extrabold">
                Chadhava booking will close in :
              </p>
              
              <div className="flex items-center gap-2">
                {/* Days */}
                <div className="bg-[#FFF4EB] border border-[#F3912E]/10 rounded-lg px-3 py-1.5 flex items-baseline gap-1 shadow-sm">
                  <span className="font-extrabold text-[#E67E22] text-lg leading-none">{timeLeft.days}</span>
                  <span className="text-[10px] font-black text-[#E67E22] uppercase tracking-wider">Days</span>
                </div>
                
                {/* Hours */}
                <div className="bg-[#FFF4EB] border border-[#F3912E]/10 rounded-lg px-3 py-1.5 flex items-baseline gap-1 shadow-sm">
                  <span className="font-extrabold text-[#E67E22] text-lg leading-none">{timeLeft.hours}</span>
                  <span className="text-[10px] font-black text-[#E67E22] uppercase tracking-wider">Hours</span>
                </div>
                
                {/* Mins */}
                <div className="bg-[#FFF4EB] border border-[#F3912E]/10 rounded-lg px-3 py-1.5 flex items-baseline gap-1 shadow-sm">
                  <span className="font-extrabold text-[#E67E22] text-lg leading-none">{timeLeft.minutes}</span>
                  <span className="text-[10px] font-black text-[#E67E22] uppercase tracking-wider">Mins</span>
                </div>
                
                {/* Secs */}
                <div className="bg-[#FFF4EB] border border-[#F3912E]/10 rounded-lg px-3 py-1.5 flex items-baseline gap-1 shadow-sm">
                  <span className="font-extrabold text-[#E67E22] text-lg leading-none">{timeLeft.seconds}</span>
                  <span className="text-[10px] font-black text-[#E67E22] uppercase tracking-wider">Secs</span>
                </div>
              </div>
            </div>

            {/* Ratings and Devotees Row - 7 avatars and dotted ratings text */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <div className="flex -space-x-2">
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm" src="https://randomuser.me/api/portraits/men/32.jpg" alt="devotee" width={28} height={28} />
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm" src="https://randomuser.me/api/portraits/men/46.jpg" alt="devotee" width={28} height={28} />
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm" src="https://randomuser.me/api/portraits/women/44.jpg" alt="devotee" width={28} height={28} />
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm" src="https://randomuser.me/api/portraits/men/62.jpg" alt="devotee" width={28} height={28} />
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm" src="https://randomuser.me/api/portraits/men/22.jpg" alt="devotee" width={28} height={28} />
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm" src="https://randomuser.me/api/portraits/women/24.jpg" alt="devotee" width={28} height={28} />
                <img className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm" src="https://randomuser.me/api/portraits/men/52.jpg" alt="devotee" width={28} height={28} />
              </div>
              <span className="text-xs md:text-sm font-extrabold text-[#FF7F3F] flex items-center gap-1">
                <span>★ 4.9</span>
                <span className="border-b border-dashed border-[#FF7F3F] pb-0.5 cursor-pointer">(7K+ ratings)</span>
              </span>
            </div>

            <p className="text-[13px] md:text-sm text-gray-500 font-semibold leading-relaxed">
              Till now <span className="text-[#FF7F3F] font-black">3,00,000+ Devotees</span> have participated in Chadhavas conducted by Mere Pandit Ji Seva.
            </p>

            {/* Participate Button - Shopify Green matching screenshot */}
            <button 
              onClick={() => setIsPackagePopupOpen(true)}
              className="w-full bg-[#008060] hover:bg-[#00664d] text-white text-[15px] font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
            >
              Choose an offering <span className="text-lg leading-none"> </span>
            </button>

          </div>

        </div>

        {/* How this works section */}
        <HowItWorks type="Chadhava" />

        {/* Navigation Tabs Bar */}
        <div className="sticky top-[70px] md:top-[80px] bg-white z-30 border-t border-b border-gray-100 py-3.5 mb-10 -mx-4 px-4 md:mx-0 md:px-0 shadow-sm">
          <div className="flex items-center justify-start md:justify-center gap-6 md:gap-12 overflow-x-auto scrollbar-none">
            {[
              { id: "about", label: "About Chadhava" },
              { id: "benefits", label: "Benefits" },
              { id: "process", label: "Process" },
              { id: "temple", label: "Temple Details" },
              { id: "packages", label: "Packages" },
              { id: "reviews", label: "Reviews" },
              { id: "faqs", label: "FAQs" }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`text-[13px] md:text-sm font-extrabold pb-1.5 relative whitespace-nowrap transition-colors ${
                    isActive ? "text-[#E67E22]" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E67E22] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Middle Section: Description & Significance (See More) */}
        <div id="about" className="scroll-mt-28 border-t border-gray-100 pt-10 mb-12">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6 flex items-start gap-2 leading-relaxed">
            <span>⚔️</span>
            <span>
              During the highly spiritually potent Gupt Navratri, participate in the rare Tri Maha Shakti Chadhava and Homam of Mahakali, Kaal Bhairav, and Mahadev to invoke one of the strongest forms of divine protection described in Sanatan Dharma.
            </span>
          </h2>
          
          <div className="relative">
            <div className={`transition-all duration-300 overflow-hidden ${showFullDesc ? 'max-h-none' : 'max-h-[140px]'}`}>
              {/* Question Subtitle in screenshot style */}
              <div className="flex items-center gap-2 mb-4 text-[#6B46C1] font-bold text-sm md:text-[15px]">
                <span>-</span>
                <span className="text-[#805AD5] text-base">📅</span>
                <span>Why is Gupt Navratri considered the most powerful time for protection sadhana?</span>
              </div>
              
              <p className="whitespace-pre-line leading-relaxed text-gray-500 font-medium text-[14px] md:text-[15px]">{Chadhava.whyThisChadhava || Chadhava.description}</p>
            </div>
            
            {/* Fade overlay for collapsed text */}
            {!showFullDesc && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            )}
          </div>

          <button 
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="mt-3 text-[#E67E22] hover:text-[#d35400] text-sm font-extrabold flex items-center gap-1 transition-colors"
          >
            <span>{showFullDesc ? "See Less" : "See More"}</span>
            <FiChevronDown className={`transition-transform duration-200 ${showFullDesc ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* About Temple Section */}
        {Chadhava.aboutTemple && (
          <div id="temple" className="scroll-mt-28 border-t border-gray-100 pt-10 mb-12">
            <h2 className="text-xl md:text-2xl font-black text-gray-955 mb-6 flex items-center gap-2.5">
              <span>🕌</span> About Temple
            </h2>
            <div className="bg-[#FFFDF6] border border-[#F3912E]/5 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {Chadhava.templeImageSrc && (
                  <div className="md:col-span-5 relative w-full h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-sm">
                    <SafeImage 
                      src={Chadhava.templeImageSrc} 
                      alt="Temple" 
                      fill
                      sizes="(max-width: 768px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className={Chadhava.templeImageSrc ? "md:col-span-7" : "md:col-span-12"}>
                  <p className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-line">
                    {Chadhava.aboutTemple}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Benefits Section */}
        <div id="benefits" className="scroll-mt-28 border-t border-gray-100 pt-10 mb-16">
          <h2 className="text-[22px] md:text-2xl font-black text-gray-955 mb-8 tracking-tight">Chadhava Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {benefitsList.map((benefit, index) => (
              <div key={index} className="bg-[#FCFBF9] p-6 rounded-[20px] shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FFF5EE] flex items-center justify-center">
                  <span className="text-xl drop-shadow-sm">🌸</span>
                </div>
                <h3 className="font-extrabold text-gray-900 text-[15px] md:text-base leading-snug">{benefit}</h3>
                <span className="text-[#F1592A] hover:underline text-[13px] font-bold cursor-pointer mt-1">Read more</span>
              </div>
            ))}
          </div>
        </div>

        {/* What Your Chadhava Includes */}
        {Chadhava.inclusions && Chadhava.inclusions.length > 0 && (
          <div className="border-t border-gray-100 pt-10 mb-16">
            <h2 className="text-2xl font-black text-gray-955 mb-8">What Your Chadhava Includes</h2>
            <div className="bg-[#F6FAF8] border border-emerald-100/55 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {Chadhava.inclusions.map((inc, index) => {
                  let icon = "✅";
                  if (inc.toLowerCase().includes("sankalp")) icon = "🙏";
                  else if (inc.toLowerCase().includes("video") || inc.toLowerCase().includes("whatsapp")) icon = "📱";
                  else if (inc.toLowerCase().includes("prasad") || inc.toLowerCase().includes("delivery")) icon = "🎁";
                  else if (inc.toLowerCase().includes("offering") || inc.toLowerCase().includes("flame")) icon = "🔥";
                  
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md flex-shrink-0 border border-gray-50">
                        <span className="text-lg">{icon}</span>
                      </div>
                      <div>
                        <p className="text-gray-800 font-extrabold text-sm md:text-[15px] leading-snug">{inc}</p>
                        <p className="text-gray-500 text-xs mt-1">Included in all package selections.</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Process Section */}
        <div id="process" className="scroll-mt-28 border-t border-gray-100 pt-10 mb-16">
          <h2 className="text-2xl font-black text-gray-955 mb-8">Chadhava Process</h2>
          
          <div className="relative border-l-2 border-orange-100 ml-4 space-y-8">
            <div className="relative pl-8">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#FF7F3F] ring-4 ring-orange-100" />
              <h3 className="font-bold text-gray-900 text-base md:text-lg">1. Provide Name & Gotra</h3>
              <p className="text-gray-500 text-xs md:text-sm mt-1">Submit your name, gotra, and specific wishes during booking checkout.</p>
            </div>
            
            <div className="relative pl-8">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#FF7F3F] ring-4 ring-orange-100" />
              <h3 className="font-bold text-gray-900 text-base md:text-lg">2. Havan & Sankalp is Performed</h3>
              <p className="text-gray-500 text-xs md:text-sm mt-1">Pandit ji will chant your name & gotra live in the temple for the customized sankalp.</p>
            </div>
            
            <div className="relative pl-8">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#FF7F3F] ring-4 ring-orange-100" />
              <h3 className="font-bold text-gray-900 text-base md:text-lg">3. Get Video Update</h3>
              <p className="text-gray-500 text-xs md:text-sm mt-1">A video recording of your sankalp & core Chadhava rituals will be sent to your WhatsApp.</p>
            </div>
            
            <div className="relative pl-8">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#FF7F3F] ring-4 ring-orange-100" />
              <h3 className="font-bold text-gray-900 text-base md:text-lg">4. Prasad Delivery</h3>
              <p className="text-gray-500 text-xs md:text-sm mt-1">Maha Prasad and energized sacred items (Aashirwad Box) will be shipped directly to your home.</p>
            </div>
          </div>
        </div>

        {/* Packages Section (target of button scroll) */}
        <div id="packages" ref={packagesRef} className="scroll-mt-28 border-t border-gray-100 pt-10 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-black text-gray-955">Choose an offering</h2>
          </div>
          
          <div className="flex flex-col space-y-0 divide-y divide-gray-100">
            {currentPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                className="py-6 flex flex-col sm:flex-row gap-6 justify-between items-start transition-colors hover:bg-gray-50/50 -mx-4 px-4 rounded-xl"
              >
                {/* Left side: Content */}
                <div className="flex-1 pr-0 sm:pr-8">
                  <h3 className="font-bold text-[17px] text-gray-900 mb-2">
                    {pkg.title}
                  </h3>
                  

                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[#117B50]">
                      {formatPrice(pkg.priceConverted || pkg.price)}
                    </span>
                    {(pkg.originalPriceConverted || pkg.originalPrice) && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(pkg.originalPriceConverted || pkg.originalPrice || 0)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right side: Image & Button */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="w-[100px] h-[100px] bg-[#F5F9F6] rounded-xl overflow-hidden relative shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center justify-center p-2">
                    {/* Fallback image if no package-specific image exists, using the main Chadhava image */}
                    <SafeImage 
                      src={pkg.imageSrc || Chadhava.imageSrc}
                      alt={pkg.title}
                      fill
                      sizes="100px"
                      className="object-cover opacity-90"
                    />
                  </div>
                  {cartItems[pkg.id] > 0 ? (
                    <div className="w-full bg-[#117B50] text-white text-[13px] font-bold py-1.5 px-4 rounded-lg flex items-center justify-between">
                      <button onClick={() => handleUpdateQuantity(pkg.id, -1)} className="px-2 hover:bg-[#0D6240] rounded">-</button>
                      <span>{cartItems[pkg.id]}</span>
                      <button onClick={() => handleUpdateQuantity(pkg.id, 1)} className="px-2 hover:bg-[#0D6240] rounded">+</button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleUpdateQuantity(pkg.id, 1)}
                      className="w-full bg-white text-[#117B50] hover:bg-[#117B50] hover:text-white border border-[#117B50] text-[13px] font-bold py-1.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>+</span> Add
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div id="reviews" className="scroll-mt-28 border-t border-gray-100 pt-10 mb-16">
          <h2 className="text-2xl font-black text-gray-955 mb-8 flex items-center gap-2">
            <span>⭐</span> Customer Reviews
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Ramesh Sharma",
                location: "Delhi, India",
                rating: 5,
                date: "04 July 2026",
                comment: "Highly satisfied with the booking. Got the video updates and the Prasad box arrived within a week. Very transparent and spiritual experience!"
              },
              {
                name: "Meera Patel",
                location: "London, UK",
                rating: 5,
                date: "28 June 2026",
                comment: "Blessed to have performed the Chadhava through Mere Pandit Ji from abroad. The Sankalp video was clear and my family felt deeply connected."
              },
              {
                name: "Amit Verma",
                location: "Mumbai, India",
                rating: 5,
                date: "15 June 2026",
                comment: "Genuine and professional service. The packaging of the Prasad was premium, and the Pandit ji chanted our names and gotra very clearly in the video."
              }
            ].map((rev, index) => (
              <div key={index} className="bg-[#FFFDFB] p-6 rounded-2xl border border-orange-50/50 shadow-[0_4px_12px_rgba(0,0,0,0.01)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <FiStar key={i} className="fill-amber-500 text-amber-500 w-4 h-4" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{rev.comment}"</p>
                </div>
                <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm">{rev.name}</h4>
                    <p className="text-[11px] text-gray-400 font-semibold">{rev.location}</p>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Section */}
        <div id="faqs" className="scroll-mt-28 border-t border-gray-100 pt-10 mb-16">
          <h2 className="text-2xl font-black text-gray-955 mb-8 flex items-center gap-2">
            <span>❓</span> Frequently Asked Questions
          </h2>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                question: "How will the Chadhava be performed?",
                answer: "The Chadhava will be performed by experienced Pandits at the Jwala Ji Temple in Kangra, Himachal Pradesh. It includes a custom Havan and personal Sankalp where your name and gotra are chanted."
              },
              {
                question: "Do I need to be physically present at the temple?",
                answer: "No, physical presence is not required. The Chadhava is performed on your behalf (Online Chadhava Seva). A custom Sankalp video recording and the complete Chadhava video will be shared with you on WhatsApp."
              },
              {
                question: "What details do I need to share for booking?",
                answer: "During booking checkout, you will need to provide the names, gotras, and specific wishes of the family members participating in the Chadhava."
              },
              {
                question: "When and how will I get the Prasad?",
                answer: "Prasad (including dynamic dry fruits, deity photo, energized Kalava, and sacred elements) is packed securely and dispatched via courier. It reaches your address within 7-10 working days of the Chadhava date."
              }
            ].map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-extrabold text-gray-955 hover:bg-gray-50 transition-colors focus:outline-none"
                  >
                    <span className="text-sm md:text-base">{faq.question}</span>
                    {isOpen ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-gray-500 text-sm leading-relaxed border-t border-gray-50 bg-[#FAFBFD]/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Package Selection Modal */}
      <AnimatePresence>
        {isPackagePopupOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPackagePopupOpen(false)}
              className="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-[#F9FAFB] rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-white border-b border-gray-100 p-5 flex items-center justify-between sticky top-0 z-10">
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <span>🎁</span> Choose an offering
                </h2>
                <button 
                  onClick={() => setIsPackagePopupOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col space-y-0 divide-y divide-gray-100">
                  {currentPackages.map((pkg) => (
                    <div 
                      key={pkg.id} 
                      className="py-4 flex flex-col sm:flex-row gap-4 justify-between items-start transition-colors hover:bg-gray-50/50"
                    >
                      <div className="flex-1 pr-0 sm:pr-6">
                        <h3 className="font-bold text-[16px] text-gray-900 mb-1.5">
                          {pkg.title}
                        </h3>

                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-[#117B50]">
                            {formatPrice(pkg.priceConverted || pkg.price)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-2 shrink-0">
                        <div className="w-[80px] h-[80px] bg-[#F5F9F6] rounded-xl overflow-hidden relative shadow-sm border border-gray-100 p-1">
                          <SafeImage 
                            src={pkg.imageSrc || Chadhava.imageSrc}
                            alt={pkg.title}
                            fill
                            sizes="80px"
                            className="object-cover opacity-90"
                          />
                        </div>
                        {cartItems[pkg.id] > 0 ? (
                          <div className="w-full bg-[#117B50] text-white text-[13px] font-bold py-1 px-3 rounded-lg flex items-center justify-between">
                            <button onClick={() => handleUpdateQuantity(pkg.id, -1)} className="px-2 hover:bg-[#0D6240] rounded">-</button>
                            <span>{cartItems[pkg.id]}</span>
                            <button onClick={() => handleUpdateQuantity(pkg.id, 1)} className="px-2 hover:bg-[#0D6240] rounded">+</button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleUpdateQuantity(pkg.id, 1)}
                            className="w-full bg-white text-[#117B50] hover:bg-[#117B50] hover:text-white border border-[#117B50] text-xs font-bold py-1 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
                          >
                            <span>+</span> Add
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sticky Footer inside Modal */}
              {totalItems > 0 && (
                <div className="p-4 bg-white border-t border-gray-100 mt-auto sticky bottom-0 z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
                  <button 
                    onClick={() => {
                      setIsPackagePopupOpen(false);
                      setIsDetailsPopupOpen(true);
                    }}
                    className="w-full bg-[#117B50] hover:bg-[#0D6240] text-white text-[15px] font-bold py-3.5 px-5 rounded-xl flex items-center justify-between transition-all shadow-[0_4px_15px_rgba(17,123,80,0.2)]"
                  >
                    <div className="flex items-center gap-2">
                      <span>{totalItems} Offerings</span>
                      <span>•</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Continue</span>
                      <span>→</span>
                    </div>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Details Popup */}
        {isDetailsPopupOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailsPopupOpen(false)}
              className="absolute inset-0 bg-[#0B1120]/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-white border-b border-gray-100 p-4 flex items-center gap-3">
                <button 
                  onClick={() => {
                    setIsDetailsPopupOpen(false);
                    setIsPackagePopupOpen(true);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiChevronLeft size={24} className="text-gray-800" />
                </button>
                <h2 className="text-lg font-bold text-gray-900">Fill your details for Chadhava</h2>
              </div>

              {/* Form Content */}
              <div className="p-5 space-y-5 overflow-y-auto flex-1">
                <div>
                  <h3 className="font-bold text-[#002D5B] text-sm mb-1.5">Enter Your Whatsapp Mobile Number</h3>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    Your Chadhava booking updates like Chadhava Photos, Videos and other details will be sent on WhatsApp on below number.
                  </p>
                  
                  <div className="relative">
                    <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] text-gray-400 z-10">Your mobile Number</label>
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all bg-white relative">
                      <div className="pl-3 pr-2 py-3 flex items-center gap-1.5 text-gray-500 border-r border-gray-200">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
                        <span className="text-sm font-medium">+91</span>
                      </div>
                      <input 
                        type="tel"
                        value={whatsappPhone}
                        onChange={(e) => {
                          setWhatsappPhone(e.target.value);
                          setDetailsError("");
                        }}
                        className="w-full py-3 px-3 text-sm focus:outline-none text-gray-900 font-medium"
                      />
                    </div>
                  </div>
                  {detailsError && detailsError.includes("phone") && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">{detailsError}</p>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-[#002D5B] text-sm mb-2">
                    {isCouple || isFamily ? "Enter Member 1 Name" : "Enter Your Name"}
                  </h3>
                  <div className="relative">
                    <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] text-gray-400 z-10">
                      {isCouple || isFamily ? "Member 1 full Name" : "Your full Name"}
                    </label>
                    <input 
                      type="text"
                      value={whatsappName}
                      onChange={(e) => {
                        setWhatsappName(e.target.value);
                        setDetailsError("");
                      }}
                      className="w-full border border-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm font-medium text-gray-900"
                    />
                  </div>
                  {detailsError && detailsError.includes("name") && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">{detailsError}</p>
                  )}
                </div>

                {(isCouple || isFamily) && (
                  <div>
                    <h3 className="font-bold text-[#002D5B] text-sm mb-2">Enter Member 2 Name</h3>
                    <div className="relative">
                      <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] text-gray-400 z-10">Member 2 full Name</label>
                      <input 
                        type="text"
                        value={member2Name}
                        onChange={(e) => {
                          setMember2Name(e.target.value);
                          setDetailsError("");
                        }}
                        className="w-full border border-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm font-medium text-gray-900"
                      />
                    </div>
                    {detailsError && detailsError.includes("Member 2") && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{detailsError}</p>
                    )}
                  </div>
                )}

                {isFamily && (
                  <>
                    <div>
                      <h3 className="font-bold text-[#002D5B] text-sm mb-2">Enter Member 3 Name (Optional)</h3>
                      <div className="relative">
                        <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] text-gray-400 z-10">Member 3 full Name</label>
                        <input 
                          type="text"
                          value={member3Name}
                          onChange={(e) => setMember3Name(e.target.value)}
                          className="w-full border border-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm font-medium text-gray-900"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-[#002D5B] text-sm mb-2">Enter Member 4 Name (Optional)</h3>
                      <div className="relative">
                        <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] text-gray-400 z-10">Member 4 full Name</label>
                        <input 
                          type="text"
                          value={member4Name}
                          onChange={(e) => setMember4Name(e.target.value)}
                          className="w-full border border-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm font-medium text-gray-900"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <h3 className="font-bold text-[#002D5B] text-sm mb-2">Enter Your Gotra (Optional)</h3>
                  <div className="relative">
                    <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] text-gray-400 z-10">Your Gotra</label>
                    <input 
                      type="text"
                      value={whatsappGotra}
                      onChange={(e) => setWhatsappGotra(e.target.value)}
                      placeholder="e.g. Kashyap, Bharadwaj"
                      className="w-full border border-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm font-medium text-gray-900"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (whatsappPhone.length < 10) {
                      setDetailsError("Please enter valid phone number");
                      return;
                    }
                    if (!whatsappName.trim()) {
                      setDetailsError("Please enter valid name");
                      return;
                    }
                    if ((isCouple || isFamily) && !member2Name.trim()) {
                      setDetailsError("Please enter Member 2 Name");
                      return;
                    }
                    // Handle Next Step
                      const packageTitles = currentPackages
                        .filter(pkg => cartItems[pkg.id] > 0)
                        .map(pkg => `${pkg.title} (x${cartItems[pkg.id]})`)
                        .join(', ');

                      const bookingData = {
                        pujaTitle: Chadhava.title,
                        pujaDate: Chadhava.date,
                        pujaLocation: Chadhava.location,
                        packageId: "multiple",
                        packageTitle: packageTitles,
                        packagePrice: totalPrice,
                        currency: currencySymbol,
                        currencyCode: countryData.currencyCode,
                        customerName: whatsappName,
                        customerPhone: whatsappPhone,
                        customerGotra: whatsappGotra || "Not specified",
                        member2Name: (isCouple || isFamily) ? member2Name.trim() : undefined,
                        member3Name: isFamily && member3Name.trim() ? member3Name.trim() : undefined,
                        member4Name: isFamily && member4Name.trim() ? member4Name.trim() : undefined,
                      };
                    localStorage.setItem("pending_booking", JSON.stringify(bookingData));
                    router.push("/cart");
                  }}
                  className={`w-full py-3.5 rounded-lg font-bold text-[15px] transition-all ${
                    whatsappPhone.length >= 10 && 
                    whatsappName.trim().length > 0 &&
                    ((!(isCouple || isFamily)) || member2Name.trim().length > 0)
                      ? "bg-[#8A9FB4] text-white hover:bg-[#728599]"
                      : "bg-[#A8B7C7] text-white/90 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Sticky Bottom Cart Bar */}
      {totalItems > 0 && !isPackagePopupOpen && !isDetailsPopupOpen && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-[999]">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => {
                setIsPackagePopupOpen(false);
                setIsDetailsPopupOpen(true);
              }}
              className="w-full bg-[#117B50] hover:bg-[#0D6240] text-white text-[15px] font-bold py-3.5 px-5 rounded-xl flex items-center justify-between transition-all shadow-[0_4px_15px_rgba(17,123,80,0.2)]"
            >
              <div className="flex items-center gap-2">
                <span>{totalItems} Offerings</span>
                <span>•</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Next</span>
                <span>→</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
