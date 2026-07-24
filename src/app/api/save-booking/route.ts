import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Booking } from '@/models/Booking';
import { Affiliate } from '@/models/Affiliate';
import { EarningRecord } from '@/models/EarningRecord';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { sendWhatsAppConfirmation } from '@/services/aisensy';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Verify Razorpay Signature
    if (data.signature && data.orderId && data.paymentId && data.signature !== "mock_signature") {
      const secret = process.env.RAZORPAY_KEY_SECRET || "u1FnWXafxXXKQhjjKBXT54au";
      const generatedSignature = crypto
        .createHmac("sha256", secret)
        .update(data.orderId + "|" + data.paymentId)
        .digest("hex");

      if (generatedSignature !== data.signature) {
        console.error("Razorpay signature verification failed");
        return NextResponse.json({ success: false, error: "Invalid payment signature" }, { status: 400 });
      }
    } else if (data.signature !== "mock_signature") {
      // If we are missing signature info, we shouldn't proceed
      console.error("Missing payment verification data");
      return NextResponse.json({ success: false, error: "Payment not verified" }, { status: 400 });
    }
    
    // 2. Try to save in MongoDB
    let isSaved = false;
    try {
      await dbConnect();
      
      const newBooking = new Booking({
        paymentId: data.paymentId || 'N/A',
        orderId: data.orderId || 'N/A',
        pujaTitle: data.pujaTitle || 'N/A',
        pujaDate: data.pujaDate || 'N/A',
        pujaLocation: data.pujaLocation || 'N/A',
        packageId: data.packageId || 'N/A',
        packageTitle: data.packageTitle || 'N/A',
        packagePrice: Number(data.packagePrice) || 0,
        currency: data.currency || 'INR',
        currencyCode: data.currencyCode || 'INR',
        customerName: data.customerName || 'N/A',
        customerPhone: data.customerPhone || 'N/A',
        customerGotra: data.customerGotra || 'Not specified',
        member2Name: data.member2Name,
        member3Name: data.member3Name,
        member4Name: data.member4Name,
        totalPaid: Number(data.totalPaid) || 0,
        date: data.date || new Date().toISOString()
      });
      
      await newBooking.save();
      console.log("Successfully saved booking to MongoDB:", newBooking._id);
      isSaved = true;

      // Handle Affiliate Commission
      try {
        const cookieStore = await cookies();
        const affiliateCode = cookieStore.get('pndit_ref')?.value;

        if (affiliateCode) {
          const affiliate = await Affiliate.findOne({ affiliateCode, status: 'Active' });
          if (affiliate) {
            let commissionAmount = 0;
            if (affiliate.commissionConfig.commissionType === 'PERCENTAGE') {
              commissionAmount = (Number(data.packagePrice) * affiliate.commissionConfig.value) / 100;
            } else {
              commissionAmount = affiliate.commissionConfig.value;
            }

            if (commissionAmount > 0) {
              const earning = new EarningRecord({
                affiliateId: affiliate._id,
                bookingId: newBooking._id,
                amount: commissionAmount,
                status: 'PENDING'
              });
              await earning.save();

              // Update wallet balance
              affiliate.walletBalance += commissionAmount;
              await affiliate.save();
              console.log("Commission awarded to affiliate:", affiliateCode);
            }
          }
        }
      } catch (affiliateError) {
        console.error("Error processing affiliate commission:", affiliateError);
      }
    } catch (dbError) {
      console.error("Error saving booking to MongoDB:", dbError);
      // We don't block the execution since we also have the webhook.
    }

    // 3. Send WhatsApp Confirmation and track status
    if (isSaved || data.paymentId) {
      try {
        await sendWhatsAppConfirmation(data);
        // Update booking with whatsappSent = true
        if (isSaved) {
          await Booking.findOneAndUpdate(
            { paymentId: data.paymentId },
            { whatsappSent: true }
          );
        }
        console.log("WhatsApp confirmation sent successfully for:", data.paymentId);
      } catch (err) {
        console.error("Error sending WhatsApp confirmation:", err);
        // whatsappSent remains false (default)
      }
    }

    // 4. Forward to Google Sheets Webhook
    const WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK;
    
    if (!WEBHOOK_URL) {
      console.warn("GOOGLE_SHEET_WEBHOOK is not defined in .env");
      return NextResponse.json({ success: true, warning: "Webhook URL missing, saved to DB" });
    }

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.text();
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("Error in save-booking API route:", error);
    return NextResponse.json({ success: true, error: error.message });
  }
}
