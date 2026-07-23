import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Chadhava } from '@/models/Chadhava';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const { isActive } = await request.json();

    const updatedChadhava = await Chadhava.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!updatedChadhava) {
      return NextResponse.json({ success: false, error: 'Chadhava not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updatedChadhava });
  } catch (error: any) {
    console.error("Failed to toggle chadhava status:", error);
    return NextResponse.json({ success: false, error: 'Failed to toggle chadhava status' }, { status: 500 });
  }
}
