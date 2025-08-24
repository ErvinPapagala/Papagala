import { NextResponse } from 'next/server';

export async function GET() {
  const res = NextResponse.redirect(new URL('/ErvinAdmin/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
  res.cookies.set('ErvinAdmin_token', '', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 0 });
  return res;
}

