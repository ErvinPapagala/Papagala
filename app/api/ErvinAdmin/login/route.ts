import { NextResponse } from 'next/server';
import { issueAdminToken, requireAdminPassword } from '@/lib/auth';

export async function POST(req: Request) {
  const { password } = await req.json();
  if (!requireAdminPassword(password || '')) {
    return NextResponse.json({ error: 'Fjalëkalim i pasaktë' }, { status: 401 });
  }
  const token = await issueAdminToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set('ErvinAdmin_token', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 300 }); // 5 minutes only
  return res;
}

