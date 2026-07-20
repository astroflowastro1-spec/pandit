import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Chadhava } from '@/models/Chadhava';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    await dbConnect();
    const items = await Chadhava.find({}).sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch chadhava items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    
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
    
    let imageSrc = "";
    let templeImageSrc = "";
    let sliderImage1Src = "";
    let sliderImage2Src = "";

    if (image && image.name) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uniqueName = Date.now() + '-' + image.name.replace(/\s+/g, '-');
      const uploadPath = path.join(process.cwd(), "public", "uploads", uniqueName);
      
      await writeFile(uploadPath, buffer);
      imageSrc = `/uploads/${uniqueName}`;
    } else {
      return NextResponse.json({ success: false, error: 'Image is required' }, { status: 400 });
    }

    if (templeImage && templeImage.name) {
      const bytes = await templeImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = Date.now() + '-temple-' + templeImage.name.replace(/\s+/g, '-');
      const uploadPath = path.join(process.cwd(), "public", "uploads", uniqueName);
      await writeFile(uploadPath, buffer);
      templeImageSrc = `/uploads/${uniqueName}`;
    }

    if (sliderImage1 && sliderImage1.name) {
      const bytes = await sliderImage1.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = Date.now() + '-slider1-' + sliderImage1.name.replace(/\s+/g, '-');
      const uploadPath = path.join(process.cwd(), "public", "uploads", uniqueName);
      await writeFile(uploadPath, buffer);
      sliderImage1Src = `/uploads/${uniqueName}`;
    }

    if (sliderImage2 && sliderImage2.name) {
      const bytes = await sliderImage2.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = Date.now() + '-slider2-' + sliderImage2.name.replace(/\s+/g, '-');
      const uploadPath = path.join(process.cwd(), "public", "uploads", uniqueName);
      await writeFile(uploadPath, buffer);
      sliderImage2Src = `/uploads/${uniqueName}`;
    }

    const generateSlug = (text: string) => {
      return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        
        .replace(/[^\w\-]+/g, '')   
        .replace(/\-\-+/g, '-');      
    };
    
    let baseSlug = generateSlug(title as string);
    let slug = baseSlug;
    
    let slugCounter = 1;
    while (await Chadhava.findOne({ slug })) {
      slug = `${baseSlug}-${slugCounter}`;
      slugCounter++;
    }

    const package1Title = formData.get("package1Title") as string || "Offer Peacock Feather on Gyaras-Baras";
    const package2Title = formData.get("package2Title") as string || "Special Combo Chadhava";
    const package3Title = formData.get("package3Title") as string || "Khatu Shyam Panch Mahabhent Sankalp";

    const indiaIndPrice = Number(formData.get("indiaIndividualPrice")) || 51;
    const indiaCouplePrice = Number(formData.get("indiaCouplePrice")) || 101;
    const indiaFamilyPrice = Number(formData.get("indiaFamilyPrice")) || 501;
    
    const nriIndPrice = Number(formData.get("nriIndividualPrice")) || 501;
    const nriCouplePrice = Number(formData.get("nriCouplePrice")) || 1100;
    const nriFamilyPrice = Number(formData.get("nriFamilyPrice")) || 2100;

    let pkg1ImageSrc = "";
    const p1Img = formData.get("package1Image") as File | null;
    if (p1Img && p1Img.size > 0) {
      const bytes = await p1Img.arrayBuffer();
      const uniqueName = Date.now() + '-p1-' + p1Img.name.replace(/\s+/g, '-');
      await writeFile(path.join(process.cwd(), "public", "uploads", uniqueName), Buffer.from(bytes));
      pkg1ImageSrc = `/uploads/${uniqueName}`;
    }

    let pkg2ImageSrc = "";
    const p2Img = formData.get("package2Image") as File | null;
    if (p2Img && p2Img.size > 0) {
      const bytes = await p2Img.arrayBuffer();
      const uniqueName = Date.now() + '-p2-' + p2Img.name.replace(/\s+/g, '-');
      await writeFile(path.join(process.cwd(), "public", "uploads", uniqueName), Buffer.from(bytes));
      pkg2ImageSrc = `/uploads/${uniqueName}`;
    }

    let pkg3ImageSrc = "";
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

    const item = await Chadhava.create({
      title,
      slug,
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
    });
    
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error: any) {
    console.error("Failed to add chadhava:", error);
    return NextResponse.json({ success: false, error: 'Failed to create chadhava' }, { status: 500 });
  }
}
