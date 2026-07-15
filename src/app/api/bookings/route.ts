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

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: 'Booking ID is required' }, { status: 400 });
    }
    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error: any) {
    console.error("Failed to delete booking:", error);
    return NextResponse.json({ success: false, error: 'Failed to delete booking' }, { status: 500 });
  }
}
