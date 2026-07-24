import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Affiliate } from "@/models/Affiliate";

// Generate a random 6-character alphanumeric code
function generateAffiliateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function GET() {
  try {
    await dbConnect();
    const affiliates = await Affiliate.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: affiliates });
  } catch (error) {
    console.error("Failed to fetch affiliates", error);
    return NextResponse.json({ success: false, message: "Failed to fetch affiliates" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    // Check if email already exists
    const existing = await Affiliate.findOne({ email: data.email });
    if (existing) {
      return NextResponse.json({ success: false, message: "Email already registered" }, { status: 400 });
    }

    // Auto-generate affiliate code
    let affiliateCode = generateAffiliateCode();
    // Ensure uniqueness
    while (await Affiliate.findOne({ affiliateCode })) {
      affiliateCode = generateAffiliateCode();
    }

    const affiliate = new Affiliate({
      ...data,
      affiliateCode,
    });

    await affiliate.save();

    return NextResponse.json({ success: true, data: affiliate }, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create affiliate", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to create affiliate" }, { status: 500 });
  }
}
