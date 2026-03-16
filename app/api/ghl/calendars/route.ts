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
  const startTime = searchParams.get('startTime') || new Date().toISOString();
  const endTime = searchParams.get('endTime') || new Date(Date.now() + 7 * 86400000).toISOString();

  const data = await ghlFetch(
    session.user.id,
    `/calendars/events?locationId=${ws.ghlLocationId}&startTime=${startTime}&endTime=${endTime}`
  );
  return NextResponse.json(data);
}
