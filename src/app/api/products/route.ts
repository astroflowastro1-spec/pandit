import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Product } from '@/models/Product';

export const dynamic = 'force-dynamic';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const formData = await request.formData();
    
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    
    const priceInr = Number(formData.get("priceInr"));
    const priceUsd = Number(formData.get("priceUsd"));
    const originalPriceInr = formData.get("originalPriceInr") ? Number(formData.get("originalPriceInr")) : undefined;
    const originalPriceUsd = formData.get("originalPriceUsd") ? Number(formData.get("originalPriceUsd")) : undefined;
    
    const image = formData.get("image") as File | null;
    let imageSrc = "";

    if (image && image.name && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      imageSrc = await uploadToCloudinary(buffer, 'products');
    } else {
      return NextResponse.json({ success: false, error: 'Image is required' }, { status: 400 });
    }

    const galleryFiles = formData.getAll("galleryImages") as File[];
    const galleryImages: string[] = [];
    
    for (const file of galleryFiles) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const url = await uploadToCloudinary(buffer, 'products/gallery');
        galleryImages.push(url);
      }
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
    while (await Product.findOne({ slug })) {
      slug = `${baseSlug}-${slugCounter}`;
      slugCounter++;
    }

    const product = await Product.create({
      title,
      slug,
      description,
      category,
      priceInr,
      priceUsd,
      originalPriceInr,
      originalPriceUsd,
      imageSrc,
      galleryImages,
    });
    
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    console.error("Failed to add product:", error);
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}
