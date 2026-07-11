"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import clsx from "clsx";

const faqs = [
  {
    question: "How do I book an online Puja?",
    answer: "Booking is very simple. Browse through our Featured Pujas or use the search feature. Select your desired Puja, choose an available date, and proceed to checkout. You will receive a confirmation with the live stream link and details."
  },
  {
    question: "Is the online Puja authentic and performed by qualified Pandits?",
    answer: "Absolutely. All our Pandits are highly verified, Vedic scholars with years of experience. We ensure every ritual strictly follows the authentic Shastras."
  },
  {
    question: "How do I receive the Prasad?",
    answer: "After the Puja is successfully completed, the consecrated Prasad is carefully packed and shipped directly to your registered address via our secure delivery partners within 5-7 business days."
  },
  {
    question: "Can I cancel or reschedule a booking?",
    answer: "Yes, you can cancel or reschedule your booking up to 48 hours before the scheduled time for a full refund or adjustment. Check our refund policy for more details."
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, we use industry-standard 256-bit SSL encryption. We do not store your credit card details, and all transactions are processed through highly secure payment gateways."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-bg-base relative">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-primary font-medium tracking-wider uppercase mb-2 text-sm flex items-center justify-center gap-2"
          >
            <span className="w-8 h-px bg-brand-primary" /> Questions? <span className="w-8 h-px bg-brand-primary" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={clsx(
                "border rounded-2xl overflow-hidden transition-all duration-300",
                activeIndex === index ? "bg-white border-brand-primary/30 shadow-lg shadow-brand-primary/5" : "bg-white/50 border-gray-200 hover:border-gray-300"
              )}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className={clsx("font-serif font-semibold text-lg pr-4", activeIndex === index ? "text-brand-primary" : "text-gray-900")}>
                  {faq.question}
                </span>
                <div className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0",
                  activeIndex === index ? "bg-brand-primary text-white rotate-180" : "bg-gray-100 text-gray-500"
                )}>
                  <FiChevronDown />
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
