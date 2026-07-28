"use client";

import { motion } from "framer-motion";
import { FiStar, FiCheckCircle } from "react-icons/fi";

const reviews = [
  {
    name: "Priya S.",
    date: "2 months ago",
    rating: 5,
    text: "The energy from this pendant is incredibly soothing. I wear it every day during my meditation and I can definitely feel a sense of calm.",
    verified: true,
  },
  {
    name: "Rohan M.",
    date: "3 months ago",
    rating: 5,
    text: "Beautifully crafted and packaged with such care. The certificate of authenticity gave me peace of mind. Highly recommended.",
    verified: true,
  },
  {
    name: "Anjali K.",
    date: "4 months ago",
    rating: 4,
    text: "Very elegant piece. The stone is natural and has a lovely weight to it. Shipping took a little longer than expected but worth the wait.",
    verified: true,
  }
];

export default function ProductReviews() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Customer Reviews</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="flex text-orange-400 text-xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar key={star} className="fill-current w-6 h-6" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">4.9/5</span>
            <span className="text-gray-500">(124 reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Rating Distribution */}
          <div className="lg:col-span-4">
            <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#EAE3D5]">
              <h3 className="text-lg font-bold text-gray-900 mb-6 font-serif">Rating Distribution</h3>
              <div className="flex flex-col gap-3">
                {[
                  { stars: 5, pct: 90 },
                  { stars: 4, pct: 8 },
                  { stars: 3, pct: 2 },
                  { stars: 2, pct: 0 },
                  { stars: 1, pct: 0 }
                ].map((row) => (
                  <div key={row.stars} className="flex items-center gap-4">
                    <div className="flex items-center gap-1 w-12 text-sm text-gray-600 font-medium">
                      {row.stars} <FiStar className="fill-current text-orange-400 w-3 h-3" />
                    </div>
                    <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-orange-400 rounded-full"
                      />
                    </div>
                    <div className="w-8 text-right text-sm text-gray-500">{row.pct}%</div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 bg-white border border-gray-200 hover:border-gray-900 text-gray-900 font-bold py-3 rounded-xl transition-colors text-sm">
                Write a Review
              </button>
            </div>
          </div>

          {/* Review List */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {reviews.map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900">{review.name}</span>
                      {review.verified && (
                        <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                          <FiCheckCircle className="w-3 h-3" /> Verified Buyer
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">{review.date}</div>
                  </div>
                  <div className="flex text-orange-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">{review.text}</p>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-4">
                  <button className="text-xs text-gray-400 hover:text-gray-900 font-medium transition-colors">Helpful (12)</button>
                  <button className="text-xs text-gray-400 hover:text-gray-900 font-medium transition-colors">Report</button>
                </div>
              </motion.div>
            ))}
            <div className="text-center pt-4">
              <button className="text-orange-600 font-bold hover:text-orange-700 underline underline-offset-4 text-sm transition-colors">
                View all 124 reviews
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
