import { NextRequest, NextResponse } from 'next/server';
import { dbGetOrders, dbSaveOrder, dbUpdateOrderStatus } from '@/lib/db';
import { Order } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const orders = await dbGetOrders();
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const order = await dbSaveOrder(body);
    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, status } = await req.json() as { id: string; status: Order['status'] };
    await dbUpdateOrderStatus(id, status);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
