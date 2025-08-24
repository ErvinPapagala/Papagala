import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';

const PROTECTED_PREFIXES = ['/ErvinAdmin', '/api/ErvinAdmin'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isLogin = pathname.startsWith('/ErvinAdmin/login') || pathname.startsWith('/api/ErvinAdmin/login');
  if (!isProtected || isLogin) return NextResponse.next();

  const token = req.cookies.get('ErvinAdmin_token')?.value || req.cookies.get('admin_token')?.value;
  const ok = token ? await verifyAdminToken(token) : false;
  if (!ok) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = '/ErvinAdmin/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/ErvinAdmin/:path*', '/api/ErvinAdmin/:path*'],
};

