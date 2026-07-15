import { NextResponse } from 'next/server';
import { sendWhatsAppConfirmation } from '@/services/aisensy';

export async function GET() {
  const url = process.env.AISENSY_API_URL;
  const apiKey = process.env.AISENSY_API_KEY;
  const campaignName = process.env.AISENSY_CAMPAIGN_NAME;

  const envStatus = {
    AISENSY_API_URL: url ? '✅ Set' : '❌ MISSING',
    AISENSY_API_KEY: apiKey ? '✅ Set' : '❌ MISSING',
    AISENSY_CAMPAIGN_NAME: campaignName ? `✅ Set (${campaignName})` : '❌ MISSING',
  };

  if (!url || !apiKey || !campaignName) {
    return NextResponse.json({
      status: 'FAILED',
      message: 'AiSensy environment variables are missing on server!',
      envStatus,
      fix: 'Go to Hostinger hPanel → Environment Variables → Add the missing keys'
    }, { status: 500 });
  }

  // Try sending a real test WhatsApp message
  try {
    await sendWhatsAppConfirmation({
      customerName: 'Test User',
      customerPhone: '7018610136',
      pujaTitle: 'Live Server Diagnostic Test',
      paymentId: 'diag_test_' + Date.now(),
    });

    return NextResponse.json({
      status: 'SUCCESS',
      message: '✅ WhatsApp message sent to +91 7018610136! Check your phone.',
      envStatus,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'FAILED',
      message: 'AiSensy API call failed: ' + error.message,
      envStatus,
    }, { status: 500 });
  }
}
