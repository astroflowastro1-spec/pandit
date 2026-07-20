import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Chadhava } from '@/models/Chadhava';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const chadhavaItem = await Chadhava.findById(id);
    if (!chadhavaItem) {
      return NextResponse.json({ success: false, error: 'Chadhava not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: chadhavaItem });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch Chadhava' }, { status: 500 });
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
    const whyThisChadhava = (formData.get("whyThisChadhava") as string) || "";
    const aboutTemple = (formData.get("aboutTemple") as string) || "";
    const benefitsStr = (formData.get("benefits") || "") as string;
    const inclusionsStr = (formData.get("inclusions") || "") as string;
    
    const benefits = benefitsStr.split('\n').map(b => b.trim()).filter(b => b.length > 0);
    const inclusions = inclusionsStr.split('\n').map(i => i.trim()).filter(i => i.length > 0);

    const image = formData.get("image") as File | null;
    const templeImage = formData.get("templeImage") as File | null;
    const sliderImage1 = formData.get("sliderImage1") as File | null;
    const sliderImage2 = formData.get("sliderImage2") as File | null;
    
    // Find existing Chadhava
    const existingChadhava = await Chadhava.findById(id);
    if (!existingChadhava) {
      return NextResponse.json({ success: false, error: 'Chadhava not found' }, { status: 404 });
    }

    let imageSrc = existingChadhava.imageSrc; // keep existing by default

    // If a new image is uploaded
    if (image && image.name && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uniqueName = Date.now() + '-' + image.name.replace(/\s+/g, '-');
      const uploadPath = path.join(process.cwd(), "public", "uploads", uniqueName);
      
      await writeFile(uploadPath, buffer);
      imageSrc = `/uploads/${uniqueName}`;
    }

    let templeImageSrc = existingChadhava.templeImageSrc || "";
    if (templeImage && templeImage.name && templeImage.size > 0) {
      const bytes = await templeImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = Date.now() + '-temple-' + templeImage.name.replace(/\s+/g, '-');
      const uploadPath = path.join(process.cwd(), "public", "uploads", uniqueName);
      await writeFile(uploadPath, buffer);
      templeImageSrc = `/uploads/${uniqueName}`;
    }

    let sliderImage1Src = existingChadhava.sliderImage1Src || "";
    if (sliderImage1 && sliderImage1.name && sliderImage1.size > 0) {
      const bytes = await sliderImage1.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = Date.now() + '-slider1-' + sliderImage1.name.replace(/\s+/g, '-');
      const uploadPath = path.join(process.cwd(), "public", "uploads", uniqueName);
      await writeFile(uploadPath, buffer);
      sliderImage1Src = `/uploads/${uniqueName}`;
    }

    let sliderImage2Src = existingChadhava.sliderImage2Src || "";
    if (sliderImage2 && sliderImage2.name && sliderImage2.size > 0) {
      const bytes = await sliderImage2.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = Date.now() + '-slider2-' + sliderImage2.name.replace(/\s+/g, '-');
      const uploadPath = path.join(process.cwd(), "public", "uploads", uniqueName);
      await writeFile(uploadPath, buffer);
      sliderImage2Src = `/uploads/${uniqueName}`;
    }

    // Determine slug (only update if title changed and it's fundamentally different)
    // For safety, we can just keep the old slug, or generate a new one if it's explicitly needed.
    // Let's keep the old slug to avoid breaking existing links unless we want to rebuild it.
    // We will keep the old slug.

    // Parse Packages if they are provided, else keep existing
    // We can just re-build them.
    const package1Title = formData.get("package1Title") as string || "Offer Peacock Feather on Gyaras-Baras";
    const package2Title = formData.get("package2Title") as string || "Special Combo Chadhava";
    const package3Title = formData.get("package3Title") as string || "Khatu Shyam Panch Mahabhent Sankalp";

    const indiaIndPrice = Number(formData.get("indiaIndividualPrice")) || 51;
    const indiaCouplePrice = Number(formData.get("indiaCouplePrice")) || 101;
    const indiaFamilyPrice = Number(formData.get("indiaFamilyPrice")) || 501;
    
    const nriIndPrice = Number(formData.get("nriIndividualPrice")) || 501;
    const nriCouplePrice = Number(formData.get("nriCouplePrice")) || 1100;
    const nriFamilyPrice = Number(formData.get("nriFamilyPrice")) || 2100;

    let pkg1ImageSrc = existingChadhava.packages?.india?.[0]?.imageSrc || "";
    const p1Img = formData.get("package1Image") as File | null;
    if (p1Img && p1Img.size > 0) {
      const bytes = await p1Img.arrayBuffer();
      const uniqueName = Date.now() + '-p1-' + p1Img.name.replace(/\s+/g, '-');
      await writeFile(path.join(process.cwd(), "public", "uploads", uniqueName), Buffer.from(bytes));
      pkg1ImageSrc = `/uploads/${uniqueName}`;
    }

    let pkg2ImageSrc = existingChadhava.packages?.india?.[1]?.imageSrc || "";
    const p2Img = formData.get("package2Image") as File | null;
    if (p2Img && p2Img.size > 0) {
      const bytes = await p2Img.arrayBuffer();
      const uniqueName = Date.now() + '-p2-' + p2Img.name.replace(/\s+/g, '-');
      await writeFile(path.join(process.cwd(), "public", "uploads", uniqueName), Buffer.from(bytes));
      pkg2ImageSrc = `/uploads/${uniqueName}`;
    }

    let pkg3ImageSrc = existingChadhava.packages?.india?.[2]?.imageSrc || "";
    const p3Img = formData.get("package3Image") as File | null;
    if (p3Img && p3Img.size > 0) {
      const bytes = await p3Img.arrayBuffer();
      const uniqueName = Date.now() + '-p3-' + p3Img.name.replace(/\s+/g, '-');
      await writeFile(path.join(process.cwd(), "public", "uploads", uniqueName), Buffer.from(bytes));
      pkg3ImageSrc = `/uploads/${uniqueName}`;
    }

    const buildPackageList = (indPrice: number, couplePrice: number, familyPrice: number) => ([
      {
        id: "package1",
        title: package1Title,
        price: indPrice,
        description: "",
        features: ["Sankalp with 1 Name & Gotra", "Video Clip via WhatsApp", "Dry Fruits (100g) + Deity Photo"],
        tag: "Popular",
        tagColor: "bg-blue-600",
        imageSrc: pkg1ImageSrc
      },
      {
        id: "package2",
        title: package2Title,
        price: couplePrice,
        description: "",
        features: ["Sankalp with 2 Names & Gotra", "Full Video Clip via WhatsApp", "Aashirwad Box"],
        tag: "Best Value",
        tagColor: "bg-[#FF7F3F]",
        imageSrc: pkg2ImageSrc
      },
      {
        id: "package3",
        title: package3Title,
        price: familyPrice,
        description: "",
        features: ["Maha Sankalp with up to 4 Names & Gotras", "Detailed Video & Live Photo", "Aashirwad Box"],
        tag: "Recommended",
        tagColor: "bg-emerald-600",
        imageSrc: pkg3ImageSrc
      }
    ]);

    const packages = {
      india: buildPackageList(indiaIndPrice, indiaCouplePrice, indiaFamilyPrice),
      nri: buildPackageList(nriIndPrice, nriCouplePrice, nriFamilyPrice),
    };

    const updatedChadhava = await Chadhava.findByIdAndUpdate(
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
        whyThisChadhava,
        aboutTemple,
        templeImageSrc,
        benefits,
        inclusions,
        packages,
      },
      { new: true }
    );
    
    return NextResponse.json({ success: true, data: updatedChadhava });
  } catch (error: any) {
    console.error("Failed to update Chadhava:", error);
    return NextResponse.json({ success: false, error: 'Failed to update Chadhava' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const chadhavaItem = await Chadhava.findByIdAndDelete(id);
    if (!chadhavaItem) {
      return NextResponse.json({ success: false, error: 'Chadhava not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete Chadhava' }, { status: 500 });
  }
}
