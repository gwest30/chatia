import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const GHL_BASE = 'https://services.leadconnectorhq.com';

// Step 1: Redirect user to GHL OAuth
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  // Callback: exchange code for token
  if (code) {
    const tokenRes = await fetch(`${GHL_BASE}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: process.env.GHL_CLIENT_ID!,
        client_secret: process.env.GHL_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/ghl/oauth`,
      }),
    });

    if (!tokenRes.ok) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard/settings?ghl_error=true`);
    }

    const tokens = await tokenRes.json();

    // Get location info
    const locRes = await fetch(`${GHL_BASE}/locations/${tokens.locationId}`, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        Version: '2021-07-28',
      },
    });
    const locData = locRes.ok ? await locRes.json() : {};

    await prisma.workspace.update({
      where: { userId: session.user.id },
      data: {
        ghlLocationId: tokens.locationId,
        ghlLocationName: locData.location?.name || 'My Location',
        ghlAccessToken: tokens.access_token,
        ghlRefreshToken: tokens.refresh_token,
        ghlTokenExpiry: new Date(Date.now() + tokens.expires_in * 1000),
      },
    });

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard/settings?ghl_connected=true`);
  }

  // Initial redirect to GHL
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.GHL_CLIENT_ID!,
    redirect_uri: `${process.env.NEXTAUTH_URL}/api/ghl/oauth`,
    scope: 'contacts.readonly contacts.write opportunities.readonly opportunities.write calendars.readonly calendars.write conversations.readonly conversations.write locations.readonly',
  });

  return NextResponse.redirect(
    `https://marketplace.gohighlevel.com/oauth/chooselocation?${params.toString()}`
  );
}
