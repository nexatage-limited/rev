import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Check if it's admin subdomain
  if (hostname.startsWith('admin.')) {
    // If on admin subdomain but not on /admin path, redirect to /admin
    if (!url.pathname.startsWith('/admin')) {
      url.pathname = `/admin${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  } else {
    // If NOT on admin subdomain but trying to access /admin, redirect to main landing
    if (url.pathname.startsWith('/admin')) {
      url.pathname = '/landing';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
