import Link from "next/link";
import Image from "next/image";
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const footerLinks = {
  services: [
    { name: "Book a Puja", href: "#" },
    { name: "Offer Chadhava", href: "#" },
    { name: "Astrology Services", href: "#" },
    { name: "Hindu Literature", href: "#" },
    { name: "Devotional Music", href: "#" },
  ],
  quickLinks: [
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
  support: [
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Refund Policy", href: "/refund" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] text-gray-300 pt-20 pb-10 border-t border-[#1E293B]">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 pr-0 lg:pr-10">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative h-12 w-48 bg-white/5 rounded-lg p-1 transition-colors hover:bg-white/10">
                <Image 
                  src="/logo.avif" 
                  alt="Mere Pandit Ji" 
                  fill 
                  className="object-contain object-left px-2" 
                />
              </div>
            </Link>
            <p className="mb-8 leading-relaxed text-[15px] text-gray-400">
              India's largest devotional platform. We are committed to building the most trusted destination that serves the devotional needs of millions of devotees in India and abroad.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: FiFacebook, href: "https://www.facebook.com/merepanditjii" },
                { Icon: FiTwitter, href: "https://x.com/merepanditjii" },
                { Icon: FiInstagram, href: "https://www.instagram.com/merepanditjii/" },
                { Icon: FiYoutube, href: "https://www.youtube.com/@MerePanditJi" },
              ].map((social, idx) => (
                <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center hover:bg-[#F26622] hover:text-white transition-all shadow-sm">
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Cols */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-1 after:bg-[#F26622] after:rounded-full">
              Our Services
            </h4>
            <ul className="flex flex-col gap-3.5 text-[15px]">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-[#F26622] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-1 after:bg-[#F26622] after:rounded-full">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3.5 text-[15px]">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-[#F26622] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-1 after:bg-[#F26622] after:rounded-full">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-4 text-[15px]">
              <li className="flex items-start gap-3 text-gray-400">
                <FiMapPin className="text-[#F26622] shrink-0 mt-1" size={18} />
                <span>SCO 35, Second Floor, Balaji Complex, Dhakoli, Zirakpur – 140603, Mohali, Punjab</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FiPhone className="text-[#F26622] shrink-0" size={18} />
                <span>+91 7696705550</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FiMail className="text-[#F26622] shrink-0" size={18} />
                <span>info.merepanditji@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#1E293B] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Mere Pandit Ji (Powered by Digital Disha Astro Spiritual LLP). All Rights Reserved</p>
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.support.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-gray-300 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
