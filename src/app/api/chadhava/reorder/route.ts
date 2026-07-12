import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Chadhava } from '@/models/Chadhava';

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const { orderedIds } = await request.json();

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ success: false, error: 'orderedIds must be an array' }, { status: 400 });
    }

    // Update each Chadhava's order based on its index in the array
    const updatePromises = orderedIds.map((id, index) => 
      Chadhava.findByIdAndUpdate(id, { order: index })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ success: true, message: 'Reordered successfully' });
  } catch (error) {
    console.error('Reorder error:', error);
    return NextResponse.json({ success: false, error: 'Failed to reorder' }, { status: 500 });
  }
}
