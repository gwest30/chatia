import { prisma } from './prisma';

const VAPI_BASE = 'https://api.vapi.ai';

export async function getVapiKey(userId: string): Promise<string | null> {
  const ws = await prisma.workspace.findUnique({ where: { userId } });
  return ws?.vapiApiKey ?? null;
}

export async function vapiFetch(userId: string, path: string, options: RequestInit = {}) {
  const apiKey = await getVapiKey(userId);
  if (!apiKey) throw new Error('VAPI not connected');

  const res = await fetch(`${VAPI_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`VAPI error ${res.status}: ${err}`);
  }

  return res.json();
}
