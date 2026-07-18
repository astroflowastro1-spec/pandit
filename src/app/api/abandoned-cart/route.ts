import { NextResponse } from 'next/server';
import { sendAbandonedCartWhatsApp } from '@/services/aisensy';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate required fields
    if (!data.customerPhone || !data.customerName) {
      return NextResponse.json(
        { success: false, error: 'Missing customerPhone or customerName' },
        { status: 400 }
      );
    }

    // Send the abandoned cart WhatsApp message
    await sendAbandonedCartWhatsApp({
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      pujaTitle: data.pujaTitle,
      packageTitle: data.packageTitle,
      packagePrice: data.packagePrice,
      productUrl: data.productUrl,
    });

    console.log('📱 Abandoned cart WhatsApp triggered for:', data.customerPhone);

    return NextResponse.json({ success: true, message: 'Abandoned cart notification sent' });
  } catch (error: any) {
    console.error('Error in abandoned-cart API:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
