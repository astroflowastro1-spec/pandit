import Hero from "@/components/home/Hero";
import TrustBanner from "@/components/home/TrustBanner";
import SpecialPujas from "@/components/home/SpecialPujas";
import ReviewsSlider from "@/components/home/ReviewsSlider";
import Stats from "@/components/home/Stats";
import Features from "@/components/home/Features";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBanner />
      <SpecialPujas />
      <ReviewsSlider />
      <Stats />
      <Features />
    </>
  );
}
