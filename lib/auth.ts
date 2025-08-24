import { SignJWT, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const ADMIN_JWT_SECRET = (process.env.ADMIN_JWT_SECRET || 'change-me').replace(/^\s+|\s+$/g, '');

const encoder = new TextEncoder();

export async function issueAdminToken(): Promise<string> {
  return await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m') // Very short session - 5 minutes only
    .sign(encoder.encode(ADMIN_JWT_SECRET));
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, encoder.encode(ADMIN_JWT_SECRET));
    return payload?.role === 'admin';
  } catch {
    return false;
  }
}

export function requireAdminPassword(password: string) {
  if (!ADMIN_PASSWORD) return false;
  return password === ADMIN_PASSWORD;
}

export async function guardAdminApi(req: NextRequest) {
  const token = req.cookies.get('ErvinAdmin_token')?.value || req.cookies.get('admin_token')?.value;
  const ok = token ? await verifyAdminToken(token) : false;
  if (!ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

