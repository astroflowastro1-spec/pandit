import dbConnect from "@/lib/dbConnect";
import { Puja } from "@/models/Puja";
import { notFound } from "next/navigation";
import PujaDetailsClient from "@/components/puja/PujaDetailsClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  await dbConnect();
  const { slug } = await params;
  const puja = await Puja.findOne({ slug });
  
  if (!puja) {
    return { title: 'Puja Not Found' };
  }
  
  return {
    title: `${puja.title} - Online Booking | Mere Pandit Ji`,
    description: puja.description,
  };
}

export default async function PujaDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  await dbConnect();
  const { slug } = await params;
  
  // Fetch raw puja from DB
  const rawPuja = await Puja.findOne({ slug }).lean();

  if (!rawPuja) {
    notFound();
  }

  // Serialize Mongoose object to plain JSON object so it can be passed to Client Component
  const puja = {
    _id: rawPuja._id.toString(),
    title: rawPuja.title,
    slug: rawPuja.slug,
    redSubtitle: rawPuja.redSubtitle,
    description: rawPuja.description,
    location: rawPuja.location,
    date: rawPuja.date,
    imageSrc: rawPuja.imageSrc,
    sliderImage1Src: rawPuja.sliderImage1Src || "",
    sliderImage2Src: rawPuja.sliderImage2Src || "",
    subtitle: rawPuja.subtitle || "",
    whyThisPuja: rawPuja.whyThisPuja || "",
    aboutTemple: rawPuja.aboutTemple || "",
    templeImageSrc: rawPuja.templeImageSrc || "",
    benefits: rawPuja.benefits || [],
    inclusions: rawPuja.inclusions || [],
    packages: rawPuja.packages ? JSON.parse(JSON.stringify(rawPuja.packages)) : null,
    badge: rawPuja.badge || "",
    badgeColor: rawPuja.badgeColor || "bg-[#F3912E]",
  };

  return <PujaDetailsClient puja={puja} />;
}
