import { FaUserGroup } from "react-icons/fa6";
import { MdSecurity } from "react-icons/md";
import { FaMedal } from "react-icons/fa6";

const items = [
  { icon: FaUserGroup, text: "Trusted by 30 million+ people" },
  { icon: MdSecurity, text: "100% Secure" },
  { icon: FaMedal, text: "India's Largest App for Hindu Devotees" },
];

export default function TrustBanner() {
  return (
    <div className="w-full bg-[#F26622] relative flex flex-col items-center">
      <div className="w-full py-4 overflow-hidden flex items-center">
        {/* Continuous marquee animation for all devices */}
        <div className="flex w-max items-center text-white font-medium text-[15px] md:text-base animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
          {/* Duplicate items multiple times for infinite marquee on large desktop screens */}
          {[...items, ...items, ...items, ...items, ...items, ...items].map((item, index) => (
            <div key={index} className="flex items-center gap-2.5 px-6 md:px-8">
              <item.icon className="text-xl" />
              <span className="whitespace-nowrap">{item.text}</span>
              <span className="inline-block ml-6 md:ml-8 text-white/70 font-bold">·</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative bottom border */}
      <div 
        className="w-full h-3 bg-repeat-x"
        style={{
          backgroundImage: `radial-gradient(circle at 10px 10px, transparent 10px, #F26622 11px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: 'top center',
          marginTop: '-4px',
          backgroundColor: 'white'
        }}
      />
    </div>
  );
}
