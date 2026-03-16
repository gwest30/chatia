import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.json');

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  useCase: string;
  crmUsed: string;
  joinedAt: string;
}

function readWaitlist(): WaitlistEntry[] {
  try {
    if (!fs.existsSync(WAITLIST_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(WAITLIST_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeWaitlist(entries: WaitlistEntry[]): void {
  const dir = path.dirname(WAITLIST_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify(entries, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, role, useCase, crmUsed } = body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const entries = readWaitlist();

    // Check for duplicate email
    const existing = entries.find(
      (e) => e.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (existing) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist! Check your inbox for confirmation.' },
        { status: 409 }
      );
    }

    const newEntry: WaitlistEntry = {
      id: `wl_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: (company || '').trim(),
      role: (role || '').trim(),
      useCase: (useCase || '').trim(),
      crmUsed: (crmUsed || '').trim(),
      joinedAt: new Date().toISOString(),
    };

    entries.push(newEntry);
    writeWaitlist(entries);

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      position: entries.length,
    });
  } catch (err) {
    console.error('Waitlist API error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return waitlist count (not emails) for public display
  const entries = readWaitlist();
  return NextResponse.json({ count: entries.length });
}
