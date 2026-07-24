import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { AffiliateClick } from "@/models/AffiliateClick";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    const { ref, url, userAgent, ip } = data;

    if (!ref) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // Try to extract a puja slug if the URL matches /puja/something
    let pujaSlug = "";
    if (url && url.includes("/puja/")) {
      const parts = url.split("/puja/");
      if (parts.length > 1) {
        pujaSlug = parts[1].split("?")[0].split("/")[0];
      }
    }

    const click = new AffiliateClick({
      affiliateCode: ref,
      pujaSlug,
      ipAddress: ip,
      userAgent
    });

    await click.save();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to track affiliate click", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
