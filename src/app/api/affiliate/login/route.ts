import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Affiliate } from "@/models/Affiliate";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    const { email, affiliateCode } = data;

    if (!email || !affiliateCode) {
      return NextResponse.json({ success: false, message: "Email and Affiliate Code are required" }, { status: 400 });
    }

    const affiliate = await Affiliate.findOne({ email, affiliateCode, status: 'Active' });

    if (!affiliate) {
      return NextResponse.json({ success: false, message: "Invalid credentials or inactive account" }, { status: 401 });
    }

    // Since we don't have a complex auth setup, we'll just return success and the affiliate data.
    // In the frontend, we can store this in localStorage/sessionStorage to act as a pseudo-login.
    return NextResponse.json({ 
      success: true, 
      data: {
        id: affiliate._id,
        name: affiliate.name,
        email: affiliate.email,
        affiliateCode: affiliate.affiliateCode
      } 
    });
  } catch (error: any) {
    console.error("Affiliate login failed", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
