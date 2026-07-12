import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Product } from '@/models/Product';
import { parse } from 'csv-parse/sync';

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ success: false, error: 'CSV file is required' }, { status: 400 });
    }

    const text = await file.text();
    const records: any[] = parse(text, {
      columns: true,
      skip_empty_lines: true
    });

    const products = [];

    const generateSlug = async (text: string) => {
      const baseSlug = text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
      let slug = baseSlug;
      let slugCounter = 1;
      while (await Product.findOne({ slug })) {
        slug = `${baseSlug}-${slugCounter}`;
        slugCounter++;
      }
      return slug;
    };

    for (const record of records) {
      if (!record.title || !record.priceInr || !record.priceUsd) continue;

      const slug = await generateSlug(record.title);

      products.push({
        title: record.title,
        slug: slug,
        description: record.description || "",
        category: record.category || "General",
        priceInr: Number(record.priceInr),
        priceUsd: Number(record.priceUsd),
        originalPriceInr: record.originalPriceInr ? Number(record.originalPriceInr) : undefined,
        originalPriceUsd: record.originalPriceUsd ? Number(record.originalPriceUsd) : undefined,
        imageSrc: record.imageSrc || "/product-placeholder.jpg",
        stock: record.stock ? Number(record.stock) : 100,
        order: record.order ? Number(record.order) : 0,
      });
    }

    if (products.length > 0) {
      await Product.insertMany(products);
    }

    return NextResponse.json({ success: true, count: products.length }, { status: 201 });
  } catch (error: any) {
    console.error("Bulk upload error:", error);
    return NextResponse.json({ success: false, error: 'Failed to process CSV file' }, { status: 500 });
  }
}
