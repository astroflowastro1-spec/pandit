"use client";

import { motion } from "framer-motion";

const certs = [
  { icon: "📜", title: "Authenticity Certificate", desc: "Included with every purchase" },
  { icon: "🔬", title: "Lab Tested", desc: "100% genuine and verified" },
  { icon: "🕉️", title: "Pandit Verified", desc: "Consecrated using Vedic rituals" },
  { icon: "🌿", title: "Natural Stone", desc: "Ethically sourced from nature" }
];

export default function ProductCertifications() {
  return (
    <section className="py-20 bg-white border-y border-[#EAE3D5]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {certs.map((cert, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center gap-3 group"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-2xl shadow-sm border border-[#EAE3D5] group-hover:scale-110 transition-transform duration-300">
                {cert.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1">{cert.title}</h4>
                <p className="text-xs text-gray-500">{cert.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
