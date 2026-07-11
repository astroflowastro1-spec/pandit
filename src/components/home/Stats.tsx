"use client";

import { motion } from "framer-motion";

export default function Stats() {
  return (
    <section className="w-full py-12 bg-[#121B2A] text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-5/12 flex flex-col pt-1"
          >
            <h4 className="text-[#60A5FA] font-bold text-[15px] mb-3">
              Trusted by Over 30 Million Devotees
            </h4>
            <h2 className="text-[32px] md:text-[40px] leading-[1.2] font-bold mb-4">
              India's Largest Devotional Platform
            </h2>
            <p className="text-gray-300 text-base md:text-[17px] leading-relaxed">
              We are committed to building the most trusted destination that serves the devotional needs of millions of devotees in India and abroad, providing them the access they always wanted.
            </p>
          </motion.div>

          {/* Right Column (Grid) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8"
          >
            
            {/* Stat 1 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="flex flex-col"
            >
              <div className="w-[48px] h-[48px] bg-[#22334F] rounded-xl flex items-center justify-center mb-3 shadow-sm overflow-hidden p-2">
                 <img src="https://www.srimandir.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fic_stat_01.2f98b129.svg&w=128&q=75" alt="Devotees" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-[20px] font-bold mb-1.5">30M+ Devotees</h3>
              <p className="text-gray-400 text-[14.5px] leading-relaxed">
                have trusted us in their devotional journey
              </p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="flex flex-col"
            >
              <div className="w-[48px] h-[48px] bg-[#22334F] rounded-xl flex items-center justify-center mb-3 shadow-sm overflow-hidden p-2">
                 <img src="https://www.srimandir.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fic_stat_02.57aa5413.svg&w=128&q=75" alt="Rating" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-[20px] font-bold mb-1.5">4.5 star rating</h3>
              <p className="text-gray-400 text-[14.5px] leading-relaxed">
                Over 1 Lakh devotees express their love for us on playstore
              </p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="flex flex-col"
            >
              <div className="w-[48px] h-[48px] bg-[#22334F] rounded-xl flex items-center justify-center mb-3 shadow-sm overflow-hidden p-2">
                 <img src="https://www.srimandir.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fic_globe.c1613912.svg&w=128&q=75" alt="Countries" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-[20px] font-bold mb-1.5">30+ Countries</h3>
              <p className="text-gray-400 text-[14.5px] leading-relaxed">
                We help devotees globally reconnect with their devotional heritage
              </p>
            </motion.div>

            {/* Stat 4 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="flex flex-col"
            >
              <div className="w-[48px] h-[48px] bg-[#22334F] rounded-xl flex items-center justify-center mb-3 shadow-sm overflow-hidden p-2">
                 <img src="https://www.srimandir.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fic_stat_04.dc6fde4f.svg&w=128&q=75" alt="Services" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-[20px] font-bold mb-1.5">3M+ Services</h3>
              <p className="text-gray-400 text-[14.5px] leading-relaxed">
                Millions of devotees have commenced Pooja and Chadhava at famous temples of India with us to seek God's grace.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
