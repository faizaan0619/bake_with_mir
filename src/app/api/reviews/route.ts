import { NextRequest, NextResponse } from 'next/server';
import { dbGetReviews, dbSaveReview } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const reviews = await dbGetReviews();
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const review = await dbSaveReview(body);
    return NextResponse.json(review);
  } catch {
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
  }
}
