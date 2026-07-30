import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Product } from '@/models/Product';

export const dynamic = 'force-dynamic';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ order: 1, createdAt: 1 }).lean();
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
    let mainImagePromise: Promise<string> = Promise.resolve("");

    if (image && image.name && image.size > 0) {
      mainImagePromise = image.arrayBuffer().then(bytes => {
        return uploadToCloudinary(Buffer.from(bytes), 'products');
      });
    } else {
      return NextResponse.json({ success: false, error: 'Image is required' }, { status: 400 });
    }

    const galleryFiles = formData.getAll("galleryImages") as File[];
    const galleryPromises = galleryFiles.map(async (file) => {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        return uploadToCloudinary(Buffer.from(bytes), 'products/gallery');
      }
      return null;
    });

    // Await all uploads simultaneously to maximize speed
    const [imageSrc, ...galleryResults] = await Promise.all([mainImagePromise, ...galleryPromises]);
    const galleryImages = galleryResults.filter((url): url is string => url !== null);

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
