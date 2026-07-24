import Hero from "@/components/home/Hero";
import TrustBanner from "@/components/home/TrustBanner";
import SpecialPujas from "@/components/home/SpecialPujas";
import ReviewsSlider from "@/components/home/ReviewsSlider";
import ProductsSlider from "@/components/home/ProductsSlider";
import Stats from "@/components/home/Stats";
import Features from "@/components/home/Features";
import dbConnect from "@/lib/dbConnect";
import { Puja } from "@/models/Puja";

export default async function Home() {
  await dbConnect();
  // Fetch active pujas from DB
  const rawPujas = await Puja.find({ isActive: { $ne: false } }).limit(6).lean();
  
  // Serialize Mongoose objects
  const dynamicPujas = rawPujas.map((p: any) => ({
    id: p._id.toString(),
    title: p.title,
    slug: p.slug,
    redSubtitle: p.redSubtitle || "",
    description: p.description || "",
    location: p.location || "",
    date: p.date || "",
    imageSrc: p.imageSrc || "",
    badge: p.badge || "",
    badgeColor: p.badgeColor || "bg-[#F3912E]",
  }));

  return (
    <>
      <Hero />
      <TrustBanner />
      <SpecialPujas dynamicPujas={dynamicPujas} />
      <ProductsSlider />
      <ReviewsSlider />
      <Stats />
      <Features />
    </>
  );
}
