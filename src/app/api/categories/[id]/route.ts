import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Category } from '@/models/Category';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if another category has the same name
    const existingCategory = await Category.findOne({
      name,
      _id: { $ne: params.id }
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: 'Another category with this name already exists' },
        { status: 400 }
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCategory);
  } catch (error: any) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: error.message || 'Failed to update category' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const deletedCategory = await Category.findByIdAndDelete(params.id);

    if (!deletedCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
