import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Product } from '@/models/Product';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const formData = await request.formData();
    
    const productData: any = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category') || 'General',
      priceInr: Number(formData.get('priceInr')),
      priceUsd: Number(formData.get('priceUsd')),
    };

    if (formData.get('originalPriceInr')) {
      productData.originalPriceInr = Number(formData.get('originalPriceInr'));
    }
    if (formData.get('originalPriceUsd')) {
      productData.originalPriceUsd = Number(formData.get('originalPriceUsd'));
    }

    const image = formData.get('image') as File;
    if (image && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const imageUrl = await uploadToCloudinary(buffer, 'products');
      productData.imageSrc = imageUrl;
    }

    // Handle Gallery Images
    let finalGalleryImages: string[] = [];
    
    // 1. Get existing images that user wants to keep
    const existingGalleryImagesStr = formData.get('existingGalleryImages');
    if (existingGalleryImagesStr) {
      try {
        finalGalleryImages = JSON.parse(existingGalleryImagesStr as string);
      } catch (e) {
        console.error("Failed to parse existing gallery images");
      }
    }

    // 2. Process newly uploaded gallery images
    const newGalleryFiles = formData.getAll('newGalleryImages') as File[];
    for (const file of newGalleryFiles) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const url = await uploadToCloudinary(buffer, 'products/gallery');
        finalGalleryImages.push(url);
      }
    }

    productData.galleryImages = finalGalleryImages;

    const product = await Product.findByIdAndUpdate(id, productData, { new: true });
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
}
