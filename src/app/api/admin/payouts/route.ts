import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { PayoutRequest } from "@/models/PayoutRequest";
import { Affiliate } from "@/models/Affiliate";

export async function GET() {
  try {
    await dbConnect();
    const payouts = await PayoutRequest.find().populate('affiliateId', 'name email affiliateCode phone').sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: payouts });
  } catch (error) {
    console.error("Failed to fetch payouts", error);
    return NextResponse.json({ success: false, message: "Failed to fetch payouts" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const { id, status, adminNotes } = data;

    if (!id || !['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }

    const payout = await PayoutRequest.findById(id);
    if (!payout) {
      return NextResponse.json({ success: false, message: "Payout not found" }, { status: 404 });
    }

    if (payout.status !== 'PENDING') {
      return NextResponse.json({ success: false, message: "Payout already processed" }, { status: 400 });
    }

    payout.status = status;
    payout.adminNotes = adminNotes;
    payout.processedAt = new Date();

    // If rejected, refund the wallet balance
    if (status === 'REJECTED') {
      const affiliate = await Affiliate.findById(payout.affiliateId);
      if (affiliate) {
        affiliate.walletBalance += payout.amount;
        await affiliate.save();
      }
    }

    await payout.save();

    return NextResponse.json({ success: true, data: payout });
  } catch (error: any) {
    console.error("Failed to update payout", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
