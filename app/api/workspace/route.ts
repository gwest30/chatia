import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const ws = await prisma.workspace.findUnique({ where: { userId: session.user.id } });
  if (!ws) return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });

  // Never return tokens to client
  return NextResponse.json({
    id: ws.id,
    name: ws.name,
    ghlConnected: !!ws.ghlAccessToken,
    ghlLocationName: ws.ghlLocationName,
    ghlLocationId: ws.ghlLocationId,
    vapiConnected: !!ws.vapiApiKey,
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const allowed: Record<string, unknown> = {};

  if (body.name) allowed.name = body.name;
  if (body.vapiApiKey !== undefined) allowed.vapiApiKey = body.vapiApiKey || null;
  if (body.vapiPhoneNumberId !== undefined) allowed.vapiPhoneNumberId = body.vapiPhoneNumberId || null;

  const ws = await prisma.workspace.update({
    where: { userId: session.user.id },
    data: allowed,
  });

  return NextResponse.json({ success: true, ghlConnected: !!ws.ghlAccessToken, vapiConnected: !!ws.vapiApiKey });
}
