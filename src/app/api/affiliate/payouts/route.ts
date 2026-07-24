import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { PayoutRequest } from "@/models/PayoutRequest";
import { Affiliate } from "@/models/Affiliate";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const { affiliateId, amount } = data;

    if (!affiliateId || !amount || amount <= 0) {
      return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }

    const affiliate = await Affiliate.findById(affiliateId);
    if (!affiliate) {
      return NextResponse.json({ success: false, message: "Affiliate not found" }, { status: 404 });
    }

    if (affiliate.walletBalance < amount) {
      return NextResponse.json({ success: false, message: "Insufficient wallet balance" }, { status: 400 });
    }

    // Deduct from wallet and create payout request
    affiliate.walletBalance -= amount;
    await affiliate.save();

    const payout = new PayoutRequest({
      affiliateId,
      amount,
      status: 'PENDING'
    });

    await payout.save();

    return NextResponse.json({ success: true, data: payout });
  } catch (error: any) {
    console.error("Payout request failed", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
