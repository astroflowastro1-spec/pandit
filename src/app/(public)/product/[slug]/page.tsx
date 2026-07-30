import dbConnect from "@/lib/dbConnect";
import { Product } from "@/models/Product";
import { notFound } from "next/navigation";
import ProductDetailsClient from "@/components/product/ProductDetailsClient";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  await dbConnect();
  const { slug } = await params;
  const product = await Product.findOne({ slug });
  
  if (!product) {
    return { title: 'Product Not Found' };
  }
  
  return {
    title: `${product.title} - Authentic Spiritual Items | Mere Pandit Ji`,
    description: product.description,
  };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  await dbConnect();
  const { slug } = await params;
  
  const rawProduct = await Product.findOne({ slug }).lean();

  if (!rawProduct) {
    notFound();
  }

  const product = {
    _id: rawProduct._id.toString(),
    title: rawProduct.title,
    slug: rawProduct.slug,
    description: rawProduct.description,
    category: rawProduct.category,
    priceInr: rawProduct.priceInr,
    priceUsd: rawProduct.priceUsd,
    originalPriceInr: rawProduct.originalPriceInr,
    originalPriceUsd: rawProduct.originalPriceUsd,
    imageSrc: rawProduct.imageSrc,
    galleryImages: rawProduct.galleryImages || [],
    stock: rawProduct.stock,
  };

  return <ProductDetailsClient product={product} />;
}
