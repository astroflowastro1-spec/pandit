import dbConnect from "@/lib/dbConnect";
import { Chadhava } from "@/models/Chadhava";
import ChadhavaClient from "@/components/chadhava/ChadhavaClient";

export const metadata = {
  title: "Chadhava & Divine Offerings | Mere Pandit Ji",
  description: "Offer sacred chadhava to the divine directly from your home.",
};

export default function ChadhavaPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-[72px]">
      {/* Hero Section */}
      <section className="bg-[#0B1120] text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF7F3F]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-white">
            Sacred Chadhava & Spiritual Offerings
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Choose from a wide variety of authentic divine items, carefully energized by our expert Pandits. We ensure completely secure packaging and global delivery right to your doorstep.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <ChadhavaClient />
    </main>
  );
}
