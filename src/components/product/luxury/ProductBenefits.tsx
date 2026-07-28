"use client";

import { motion } from "framer-motion";

const defaultBenefits = [
  { icon: "✨", title: "Attracts Positivity", desc: "Radiates gentle, calming energy." },
  { icon: "🧘", title: "Emotional Healing", desc: "Helps balance the inner chakras." },
  { icon: "❤️", title: "Spiritual Growth", desc: "Deepens your meditative state." },
  { icon: "🌸", title: "Natural Harmony", desc: "Brings peace to your surroundings." }
];

export default function ProductBenefits({ description }: { description: string }) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6"
          >
            The Essence of Purity
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap"
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {defaultBenefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#FAF7F2] rounded-3xl p-8 flex flex-col items-center text-center group hover:bg-white hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 border border-transparent hover:border-orange-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-bl-[100px] -mr-16 -mt-16 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              
              <span className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 origin-bottom">{benefit.icon}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif">{benefit.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
