import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Booking } from '@/models/Booking';

export async function GET() {
  try {
    await dbConnect();
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: bookings });
  } catch (error: any) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
