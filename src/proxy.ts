import { NextRequest, NextResponse } from 'next/server';

const SESSION_SECRET = process.env.SESSION_SECRET || 'pndit_secret_key_2024';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // We need to return a response object so we can attach cookies if needed
  let response = NextResponse.next();

  // 1. Affiliate Tracking
  const ref = req.nextUrl.searchParams.get('ref');
  if (ref) {
    response.cookies.set({
      name: 'pndit_ref',
      value: ref,
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      httpOnly: true,
      sameSite: 'lax',
    });

    try {
      const proto = req.headers.get("x-forwarded-proto") || "http";
      const host = req.headers.get("host");
      if (host) {
        const apiUrl = `${proto}://${host}/api/track-click`;
        fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ref,
            url: pathname,
            userAgent: req.headers.get('user-agent') || '',
            ip: req.headers.get('x-forwarded-for') || ''
          })
        }).catch(e => console.error("Click tracking fetch error", e));
      }
    } catch (e) {
      console.error("Failed to track click in proxy", e);
    }
  }

  // 2. Protect Admin Routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = req.cookies.get('admin_session');
    if (!session || session.value !== SESSION_SECRET) {
      const loginUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  // Run on all paths except static files, api routes, Next internals
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|uploads).*)',
  ],
};
