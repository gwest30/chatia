import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

async function requireAdmin(session: { user?: { role?: string } } | null) {
  if (!session?.user || session.user.role !== 'ADMIN') return false;
  return true;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!await requireAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const clients = await prisma.user.findMany({
    where: { role: 'CLIENT' },
    include: { workspace: { select: { name: true, ghlLocationName: true, ghlLocationId: true, vapiApiKey: true, createdAt: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(clients.map(c => ({
    id: c.id,
    name: c.name,
    email: c.email,
    createdAt: c.createdAt,
    workspace: c.workspace ? {
      name: c.workspace.name,
      ghlConnected: !!c.workspace.ghlLocationId,
      ghlLocationName: c.workspace.ghlLocationName,
      vapiConnected: !!c.workspace.vapiApiKey,
    } : null,
  })));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!await requireAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { name, email, password, ghlLocationId } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'name, email, and password are required.' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (existing) return NextResponse.json({ error: 'Email already exists.' }, { status: 409 });

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashed,
      role: 'CLIENT',
      workspace: {
        create: {
          name: `${name}'s Workspace`,
          ghlLocationId: ghlLocationId || null,
        },
      },
    },
  });

  return NextResponse.json({ success: true, userId: user.id });
}
