import dbConnect from "@/lib/dbConnect";
import { Chadhava } from "@/models/Chadhava";
import { notFound } from "next/navigation";
import ChadhavaDetailsClient from "@/components/chadhava/ChadhavaDetailsClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  await dbConnect();
  const { slug } = await params;
  const item = await Chadhava.findOne({ slug });
  
  if (!item) {
    return { title: 'Chadhava Not Found' };
  }
  
  return {
    title: `${item.title} - Online Booking | Mere Pandit Ji`,
    description: item.description,
  };
}

export default async function ChadhavaDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  await dbConnect();
  const { slug } = await params;
  
  // Fetch raw Chadhava from DB
  const rawChadhava = await Chadhava.findOne({ slug }).lean();

  if (!rawChadhava) {
    notFound();
  }

  // Serialize Mongoose object to plain JSON object so it can be passed to Client Component
  const chadhavaData = {
    _id: rawChadhava._id.toString(),
    title: rawChadhava.title,
    slug: rawChadhava.slug,
    redSubtitle: rawChadhava.redSubtitle,
    description: rawChadhava.description,
    location: rawChadhava.location,
    date: rawChadhava.date,
    imageSrc: rawChadhava.imageSrc,
    sliderImage1Src: rawChadhava.sliderImage1Src || "",
    sliderImage2Src: rawChadhava.sliderImage2Src || "",
    subtitle: rawChadhava.subtitle || "",
    whyThisPuja: rawChadhava.whyThisPuja || "",
    aboutTemple: rawChadhava.aboutTemple || "",
    templeImageSrc: rawChadhava.templeImageSrc || "",
    benefits: rawChadhava.benefits || [],
    inclusions: rawChadhava.inclusions || [],
    packages: rawChadhava.packages ? JSON.parse(JSON.stringify(rawChadhava.packages)) : null,
    badge: rawChadhava.badge || "",
    badgeColor: rawChadhava.badgeColor || "bg-[#F3912E]",
  };

  return <ChadhavaDetailsClient Chadhava={chadhavaData} />;
}
