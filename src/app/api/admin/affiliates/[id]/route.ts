import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Affiliate } from "@/models/Affiliate";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const affiliate = await Affiliate.findById(id);
    
    if (!affiliate) {
      return NextResponse.json({ success: false, message: "Affiliate not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: affiliate });
  } catch (error: any) {
    console.error("Failed to fetch affiliate", error);
    return NextResponse.json({ success: false, message: "Failed to fetch affiliate" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const data = await req.json();
    const { id } = await params;

    const updated = await Affiliate.findByIdAndUpdate(id, data, { new: true });
    
    if (!updated) {
      return NextResponse.json({ success: false, message: "Affiliate not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Failed to update affiliate", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to update affiliate" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await Affiliate.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Affiliate not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Affiliate deleted" });
  } catch (error: any) {
    console.error("Failed to delete affiliate", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to delete affiliate" }, { status: 500 });
  }
}
