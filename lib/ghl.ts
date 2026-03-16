import { prisma } from './prisma';

const GHL_BASE = 'https://services.leadconnectorhq.com';

export async function getGHLToken(userId: string): Promise<string | null> {
  const ws = await prisma.workspace.findUnique({ where: { userId } });
  if (!ws?.ghlAccessToken) return null;

  // Refresh if expired
  if (ws.ghlTokenExpiry && new Date() > ws.ghlTokenExpiry) {
    return refreshGHLToken(userId, ws.ghlRefreshToken!);
  }
  return ws.ghlAccessToken;
}

export async function refreshGHLToken(userId: string, refreshToken: string): Promise<string | null> {
  const res = await fetch(`${GHL_BASE}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: process.env.GHL_CLIENT_ID!,
      client_secret: process.env.GHL_CLIENT_SECRET!,
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();

  await prisma.workspace.update({
    where: { userId },
    data: {
      ghlAccessToken: data.access_token,
      ghlRefreshToken: data.refresh_token,
      ghlTokenExpiry: new Date(Date.now() + data.expires_in * 1000),
    },
  });

  return data.access_token;
}

export async function ghlFetch(userId: string, path: string, options: RequestInit = {}) {
  const token = await getGHLToken(userId);
  if (!token) throw new Error('GHL not connected');

  const ws = await prisma.workspace.findUnique({ where: { userId } });
  const res = await fetch(`${GHL_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Version: '2021-07-28',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GHL API error ${res.status}: ${err}`);
  }

  return res.json();
}
