import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Puja } from '@/models/Puja';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const puja = await Puja.findById(id);
    if (!puja) {
      return NextResponse.json({ success: false, error: 'Puja not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: puja });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch puja' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const formData = await request.formData();
    
    const title = formData.get("title") as string;
    const redSubtitle = formData.get("redSubtitle") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const date = formData.get("date") as string;
    const badge = formData.get("badge") as string;
    const badgeColor = formData.get("badgeColor") as string;
    
    const subtitle = (formData.get("subtitle") as string) || "";
    const whyThisPuja = (formData.get("whyThisPuja") as string) || "";
    const aboutTemple = (formData.get("aboutTemple") as string) || "";
    const benefitsStr = (formData.get("benefits") || "") as string;
    const inclusionsStr = (formData.get("inclusions") || "") as string;
    
    const benefits = benefitsStr.split('\n').map(b => b.trim()).filter(b => b.length > 0);
    const inclusions = inclusionsStr.split('\n').map(i => i.trim()).filter(i => i.length > 0);

    const image = formData.get("image") as File | null;
    const templeImage = formData.get("templeImage") as File | null;
    const sliderImage1 = formData.get("sliderImage1") as File | null;
    const sliderImage2 = formData.get("sliderImage2") as File | null;
    
    // Find existing puja
    const existingPuja = await Puja.findById(id);
    if (!existingPuja) {
      return NextResponse.json({ success: false, error: 'Puja not found' }, { status: 404 });
    }

    let imageSrc = existingPuja.imageSrc; // keep existing by default

    // If a new image is uploaded
    if (image && image.name && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      imageSrc = await uploadToCloudinary(buffer);
    }

    let templeImageSrc = existingPuja.templeImageSrc || "";
    if (templeImage && templeImage.name && templeImage.size > 0) {
      const bytes = await templeImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      templeImageSrc = await uploadToCloudinary(buffer);
    }

    let sliderImage1Src = existingPuja.sliderImage1Src || "";
    if (sliderImage1 && sliderImage1.name && sliderImage1.size > 0) {
      const bytes = await sliderImage1.arrayBuffer();
      const buffer = Buffer.from(bytes);
      sliderImage1Src = await uploadToCloudinary(buffer);
    }

    let sliderImage2Src = existingPuja.sliderImage2Src || "";
    if (sliderImage2 && sliderImage2.name && sliderImage2.size > 0) {
      const bytes = await sliderImage2.arrayBuffer();
      const buffer = Buffer.from(bytes);
      sliderImage2Src = await uploadToCloudinary(buffer);
    }

    // Determine slug (only update if title changed and it's fundamentally different)
    // For safety, we can just keep the old slug, or generate a new one if it's explicitly needed.
    // Let's keep the old slug to avoid breaking existing links unless we want to rebuild it.
    // We will keep the old slug.

    // Parse Packages if they are provided, else keep existing
    // We can just re-build them.
    const indiaIndPrice = Number(formData.get("indiaIndividualPrice")) || 251;
    const indiaCouplePrice = Number(formData.get("indiaCouplePrice")) || 501;
    const indiaFamilyPrice = Number(formData.get("indiaFamilyPrice")) || 1100;
    
    const nriIndPrice = Number(formData.get("nriIndividualPrice")) || 501;
    const nriCouplePrice = Number(formData.get("nriCouplePrice")) || 1100;
    const nriFamilyPrice = Number(formData.get("nriFamilyPrice")) || 2100;

    const buildPackageList = (indPrice: number, couplePrice: number, familyPrice: number) => ([
      {
        id: "individual",
        title: "Individual Puja",
        price: indPrice,
        description: "Puja will be performed with your Name and Gotra. Video recording of Sankalp & Havan will be shared.",
        features: ["Sankalp with 1 Name & Gotra", "Puja Video Clip via WhatsApp", "Dry Fruits Prasad (100g) + Deity Photo"],
        tag: "Popular",
        tagColor: "bg-blue-600"
      },
      {
        id: "couple",
        title: "Couple Puja",
        price: couplePrice,
        description: "Puja performed for Husband and Wife. Detailed Sankalp with both names. Premium Aashirwad Box sent to your home.",
        features: ["Sankalp with 2 Names & Gotra", "Full Puja Video Clip via WhatsApp", "Aashirwad Box (Prasad, Kalava, Sindoor, Deity Photo)"],
        tag: "Best Value",
        tagColor: "bg-[#FF7F3F]"
      },
      {
        id: "family",
        title: "Family Puja (Up to 4 Members)",
        price: familyPrice,
        description: "Special Havan performed for health, wealth & protection of the entire family. Ultimate Aashirwad Box sent.",
        features: ["Maha Sankalp with up to 4 Names & Gotras", "Detailed Video & Live Sankalp Photo", "Maha Prasad Box (Prasad, Energized Yantra, Kalava, Janeu, Diya)"],
        tag: "Recommended",
        tagColor: "bg-emerald-600"
      }
    ]);

    const packages = {
      india: buildPackageList(indiaIndPrice, indiaCouplePrice, indiaFamilyPrice),
      nri: buildPackageList(nriIndPrice, nriCouplePrice, nriFamilyPrice),
    };

    const updatedPuja = await Puja.findByIdAndUpdate(
      id,
      {
        title,
        redSubtitle,
        description,
        location,
        date,
        badge: badge || "",
        badgeColor: badgeColor || "bg-[#F3912E]",
        imageSrc,
        sliderImage1Src,
        sliderImage2Src,
        subtitle,
        whyThisPuja,
        aboutTemple,
        templeImageSrc,
        benefits,
        inclusions,
        packages,
      },
      { new: true }
    );
    
    return NextResponse.json({ success: true, data: updatedPuja });
  } catch (error: any) {
    console.error("Failed to update puja:", error);
    return NextResponse.json({ success: false, error: 'Failed to update puja' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const puja = await Puja.findByIdAndDelete(id);
    if (!puja) {
      return NextResponse.json({ success: false, error: 'Puja not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete puja' }, { status: 500 });
  }
}
