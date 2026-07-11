"use client";

import { motion } from "framer-motion";
import { FiUsers, FiMap, FiGlobe, FiAward } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";

const stats = [
  { label: "Happy Devotees", value: 5000000, suffix: "+", icon: FiUsers },
  { label: "Sacred Temples", value: 500, suffix: "+", icon: FiMap },
  { label: "Countries Served", value: 50, suffix: "+", icon: FiGlobe },
  { label: "Pujas Completed", value: 100000, suffix: "+", icon: FiAward },
];

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [inView, from, to, duration]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num;
  };

  return <span ref={nodeRef}>{formatNumber(count)}</span>;
}

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-bg-base relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-primary font-medium tracking-wider uppercase mb-2 text-sm flex items-center gap-2"
            >
              <span className="w-8 h-px bg-brand-primary" /> Why Trust Us
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight"
            >
              The Most Trusted <br /> Spiritual Platform
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 text-lg mb-10 leading-relaxed"
            >
              We bring the divine right to your home. With a network of verified 
              pandits and direct associations with the most ancient temples, we 
              ensure absolute authenticity and devotion in every service.
            </motion.p>
            
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-subtle text-brand-primary flex items-center justify-center mb-4">
                    <stat.icon size={24} />
                  </div>
                  <div className="font-serif font-bold text-4xl text-gray-900 mb-1 flex items-baseline">
                    <Counter from={0} to={stat.value} />
                    <span className="text-brand-primary text-2xl ml-1">{stat.suffix}</span>
                  </div>
                  <p className="text-gray-500 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Abstract Graphic Right Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-[3rem] bg-gradient-to-tr from-brand-subtle to-white border border-gray-100 shadow-2xl overflow-hidden flex items-center justify-center p-8"
          >
            {/* Concentric Circles / Mandala concept */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0iI0U2N0UyMiIgZmlsbC1vcGFjaXR5PSIwLjE1Ii8+PC9zdmc+')] opacity-60" />
            
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="relative w-full aspect-square max-w-[400px] border border-brand-primary/20 rounded-full flex items-center justify-center"
            >
              <div className="w-[80%] h-[80%] border border-brand-secondary/30 rounded-full flex items-center justify-center">
                <div className="w-[60%] h-[60%] bg-gradient-to-tr from-brand-primary to-brand-accent rounded-full shadow-[0_0_50px_rgba(230,126,34,0.4)] flex items-center justify-center text-white">
                  <FiAward size={64} className="opacity-80" />
                </div>
              </div>
              
              {/* Orbiting Elements */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-brand-primary">
                <FiMap size={20} />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-brand-primary">
                <FiUsers size={20} />
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
