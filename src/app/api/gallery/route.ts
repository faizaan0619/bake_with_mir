import { NextRequest, NextResponse } from 'next/server';
import { dbGetGalleryItems, dbAddGalleryItem, dbDeleteGalleryItem } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const items = await dbGetGalleryItems();
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await dbAddGalleryItem(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to add gallery item' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await dbDeleteGalleryItem(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
