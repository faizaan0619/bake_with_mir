import { NextRequest, NextResponse } from 'next/server';
import { dbUpdateStock } from '@/lib/db';
import { Product } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest) {
  try {
    const { id, stock } = await req.json() as { id: string; stock: Product['stock'] };
    await dbUpdateStock(id, stock);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update stock' }, { status: 500 });
  }
}
