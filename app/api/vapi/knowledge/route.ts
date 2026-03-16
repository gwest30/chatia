import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { vapiFetch } from '@/lib/vapi';

// GET all knowledge bases
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await vapiFetch(session.user.id, '/knowledge-base');
  return NextResponse.json(data);
}

// POST create knowledge base
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const data = await vapiFetch(session.user.id, '/knowledge-base', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  return NextResponse.json(data);
}
