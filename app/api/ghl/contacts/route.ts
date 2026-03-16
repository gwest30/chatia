import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ghlFetch } from '@/lib/ghl';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const ws = await prisma.workspace.findUnique({ where: { userId: session.user.id } });
  if (!ws?.ghlLocationId) return NextResponse.json({ error: 'GHL not connected' }, { status: 400 });

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const limit = searchParams.get('limit') || '25';
  const page = searchParams.get('page') || '1';

  const params = new URLSearchParams({ locationId: ws.ghlLocationId, limit, startAfter: page });
  if (query) params.set('query', query);

  const data = await ghlFetch(session.user.id, `/contacts/?${params.toString()}`);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const ws = await prisma.workspace.findUnique({ where: { userId: session.user.id } });
  if (!ws?.ghlLocationId) return NextResponse.json({ error: 'GHL not connected' }, { status: 400 });

  const body = await req.json();
  const data = await ghlFetch(session.user.id, `/contacts/`, {
    method: 'POST',
    body: JSON.stringify({ ...body, locationId: ws.ghlLocationId }),
  });
  return NextResponse.json(data);
}
