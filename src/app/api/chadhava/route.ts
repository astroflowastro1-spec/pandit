import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Chadhava } from '@/models/Chadhava';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET() {
  try {
    await dbConnect();
    const items = await Chadhava.find({}).sort({ order: 1, createdAt: 1 }).lean();
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
    const isActive = formData.get("isActive") !== "false";
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

    if (!image || !image.name) {
      return NextResponse.json({ success: false, error: 'Image is required' }, { status: 400 });
    }

    const uploadTasks: Promise<void>[] = [];

    const processUpload = async (file: File | null, assignUrl: (url: string) => void) => {
      if (file && file.name && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const url = await uploadToCloudinary(buffer);
        assignUrl(url);
      }
    };

    uploadTasks.push(processUpload(image, (url) => { imageSrc = url; }));
    uploadTasks.push(processUpload(templeImage, (url) => { templeImageSrc = url; }));
    uploadTasks.push(processUpload(sliderImage1, (url) => { sliderImage1Src = url; }));
    uploadTasks.push(processUpload(sliderImage2, (url) => { sliderImage2Src = url; }));

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
    uploadTasks.push(processUpload(p1Img, (url) => { pkg1ImageSrc = url; }));

    let pkg2ImageSrc = "";
    const p2Img = formData.get("package2Image") as File | null;
    uploadTasks.push(processUpload(p2Img, (url) => { pkg2ImageSrc = url; }));

    let pkg3ImageSrc = "";
    const p3Img = formData.get("package3Image") as File | null;
    uploadTasks.push(processUpload(p3Img, (url) => { pkg3ImageSrc = url; }));

    await Promise.all(uploadTasks);

    const buildPackageList = (indPrice: number, couplePrice: number, familyPrice: number) => ([
      {
        id: "package1",
        title: package1Title,
        price: indPrice,
        description: "",
        features: ["Sankalp with 1 Name & Gotra", "Video Clip via WhatsApp"],
        tag: "Popular",
        tagColor: "bg-blue-600",
        imageSrc: pkg1ImageSrc
      },
      {
        id: "package2",
        title: package2Title,
        price: couplePrice,
        description: "",
        features: ["Sankalp with 2 Names & Gotra", "Full Video Clip via WhatsApp"],
        tag: "Best Value",
        tagColor: "bg-[#FF7F3F]",
        imageSrc: pkg2ImageSrc
      },
      {
        id: "package3",
        title: package3Title,
        price: familyPrice,
        description: "",
        features: ["Maha Sankalp with up to 4 Names & Gotras", "Detailed Video & Live Photo"],
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
      isActive,
    });
    
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error: any) {
    console.error("Failed to add chadhava:", error);
    return NextResponse.json({ success: false, error: 'Failed to create chadhava' }, { status: 500 });
  }
}
