"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const tabs = [
  { id: "description", label: "Description" },
  { id: "how-to-use", label: "How to Use" },
  { id: "care", label: "Care Instructions" },
  { id: "shipping", label: "Shipping & Returns" },
  { id: "faq", label: "FAQs" }
];

export default function ProductTabs({ product }: { product: any }) {
  const [activeTab, setActiveTab] = useState("description");

  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose prose-lg text-gray-600 max-w-none leading-relaxed">
            <p className="whitespace-pre-wrap">{product.description}</p>
          </div>
        );
      case "how-to-use":
        return (
          <div className="prose prose-lg text-gray-600 max-w-none leading-relaxed">
            <ul className="list-disc pl-5 space-y-3">
              <li>Cleanse the product with sage or sound vibrations before first use.</li>
              <li>Set a clear intention while holding it in your hands.</li>
              <li>Keep it in your sacred space or wear it close to your heart chakra.</li>
            </ul>
          </div>
        );
      case "care":
        return (
          <div className="prose prose-lg text-gray-600 max-w-none leading-relaxed">
            <ul className="list-disc pl-5 space-y-3">
              <li>Avoid prolonged exposure to direct sunlight.</li>
              <li>Do not use harsh chemicals; wipe gently with a soft cloth.</li>
              <li>Cleanse its energy under the light of the full moon every month.</li>
            </ul>
          </div>
        );
      case "shipping":
        return (
          <div className="prose prose-lg text-gray-600 max-w-none leading-relaxed">
            <p><strong>Free Global Shipping:</strong> We offer complimentary secure shipping worldwide.</p>
            <p><strong>Dispatch Time:</strong> Orders are dispatched within 24 hours of consecration by our Pandits.</p>
            <p><strong>Returns:</strong> Hassle-free 7-day return policy if the seal remains intact.</p>
          </div>
        );
      case "faq":
        return (
          <div className="space-y-6">
            {[
              { q: "Is this 100% natural?", a: "Yes, all our stones and items are 100% natural and ethically sourced." },
              { q: "Is it energized before shipping?", a: "Absolutely. Every item goes through a rigorous consecration process by expert Pandits." }
            ].map((faq, idx) => (
              <div key={idx}>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        {/* Tab Headers */}
        <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 mb-12 relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-6 text-sm md:text-base font-medium whitespace-nowrap transition-colors relative ${
                activeTab === tab.id ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
