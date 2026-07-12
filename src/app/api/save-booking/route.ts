import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK;
    
    if (!WEBHOOK_URL) {
      console.warn("GOOGLE_SHEET_WEBHOOK is not defined in .env");
      // Return true anyway so it doesn't break the user journey
      return NextResponse.json({ success: true, warning: "Webhook URL missing" });
    }

    // Google Apps Script usually requires a URL encoded form or a plain JSON body
    // We send JSON and the Apps Script will parse it.
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
    console.error("Error saving booking to sheet:", error);
    // Don't fail the checkout if sheet saving fails
    return NextResponse.json({ success: true, error: error.message });
  }
}
