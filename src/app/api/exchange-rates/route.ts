import { NextResponse } from 'next/server';

let cachedRates: Record<string, number> | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function GET() {
  try {
    const now = Date.now();
    
    // Return cached rates if valid
    if (cachedRates && (now - lastFetchTime) < CACHE_DURATION) {
      return NextResponse.json({ success: true, rates: cachedRates });
    }

    // Fetch live rates (Base USD)
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }

    const data = await response.json();
    
    if (data && data.rates) {
      cachedRates = data.rates;
      lastFetchTime = now;
      return NextResponse.json({ success: true, rates: cachedRates });
    } else {
      throw new Error('Invalid exchange rate data');
    }
  } catch (error) {
    console.error('Exchange rate error:', error);
    
    // Fallback static rates if API fails
    const fallbackRates: Record<string, number> = {
      USD: 1,
      INR: 83.5,
      CAD: 1.36,
      GBP: 0.74,
      AUD: 1.53,
      SGD: 1.35,
      AED: 3.67,
      EUR: 0.91,
      SAR: 3.75,
      QAR: 3.64,
      BHD: 0.38,
      IRR: 42000,
      IQD: 1310,
      KWD: 0.31,
      OMR: 0.38,
      THB: 36.5,
    };
    
    return NextResponse.json({ 
      success: true, 
      rates: cachedRates || fallbackRates,
      isFallback: true 
    });
  }
}
