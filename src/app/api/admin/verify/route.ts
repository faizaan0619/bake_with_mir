import { NextRequest, NextResponse } from 'next/server';
import { dbVerifyAdminPin } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { pin } = await req.json();
    const valid = dbVerifyAdminPin(pin);
    return NextResponse.json({ valid });
  } catch {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
