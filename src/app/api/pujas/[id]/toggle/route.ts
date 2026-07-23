import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Puja } from '@/models/Puja';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const { isActive } = await request.json();

    const updatedPuja = await Puja.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!updatedPuja) {
      return NextResponse.json({ success: false, error: 'Puja not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updatedPuja });
  } catch (error: any) {
    console.error("Failed to toggle puja status:", error);
    return NextResponse.json({ success: false, error: 'Failed to toggle puja status' }, { status: 500 });
  }
}
