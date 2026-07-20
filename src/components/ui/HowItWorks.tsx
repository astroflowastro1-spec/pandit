import SafeImage from "@/components/ui/SafeImage";

interface HowItWorksProps {
  type?: "Puja" | "Chadhava";
}

export default function HowItWorks({ type = "Puja" }: HowItWorksProps) {
  const steps = [
    { icon: "/members.webp", title: "Members & Gotra Details" },
    { icon: "/confirm.webp", title: `Confirm ${type} Booking` },
    { icon: "/mantra.webp", title: `${type} Update` },
    { icon: "/puja-video.webp", title: `${type} Video` },
  ];

  return (
    <div className="w-full mb-10 mt-6">
      <h3 className="text-[19px] md:text-xl font-bold text-gray-900 mb-4 px-1">How this works</h3>
      
      {/* Scrollable container for mobile */}
      <div className="w-full bg-[#FFF4EB] py-6 md:py-8 md:rounded-2xl overflow-x-auto scrollbar-none border-y md:border border-orange-50 shadow-sm">
        <div className="flex items-center justify-between min-w-[600px] md:min-w-0 px-4 md:px-10 lg:px-16">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-1 justify-center group">
              
              <div className="flex flex-col items-center w-full max-w-[140px] text-center">
                <div className="relative w-[60px] h-[60px] md:w-[76px] md:h-[76px] mb-3 md:mb-3.5 transform transition-transform group-hover:scale-105 shrink-0">
                  <SafeImage src={step.icon} alt={step.title} fill className="object-contain drop-shadow-sm" />
                </div>
                <p className="text-[12px] md:text-[14px] font-semibold text-gray-700 leading-snug">{step.title}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex flex-shrink-0 w-[40px] md:w-[60px] lg:w-[80px] justify-center items-center px-1">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#E87A25] opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
