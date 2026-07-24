import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Affiliate } from "@/models/Affiliate";
// import { AffiliateClick } from "@/models/AffiliateClick";
// import { EarningRecord } from "@/models/EarningRecord";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Affiliate ID required" }, { status: 400 });
    }

    await dbConnect();
    const affiliate = await Affiliate.findById(id);

    if (!affiliate) {
      return NextResponse.json({ success: false, message: "Affiliate not found" }, { status: 404 });
    }

    // TODO: Query AffiliateClick and EarningRecord when models are ready
    const clicks = 0;
    const orders = 0;
    const revenue = 0;
    const commission = 0;

    return NextResponse.json({ 
      success: true, 
      data: {
        clicks,
        orders,
        revenue,
        commission,
        walletBalance: affiliate.walletBalance || 0
      } 
    });
  } catch (error: any) {
    console.error("Failed to fetch affiliate stats", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
